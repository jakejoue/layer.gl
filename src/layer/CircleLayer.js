import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

// 简单圆圈图层
class SimpleCircleLayer extends Layer {
    constructor(options) {
        super(options);
        this.bufferData = [];
    }

    getDefaultOptions() {
        return {
            size: 10,
            unit: "px",
            color: "blue",
        };
    }

    initialize(gl) {
        this.gl = gl;

        this.program = new Program(
            this.gl,
            {
                vertexShader: `
                attribute vec3 aPos;
                attribute float aSize;
                attribute float aIndex;
                attribute vec4 aColor;
                
                varying vec4 vColor;
                varying vec4 vPosition;
                varying vec4 vFragPosition;
                varying float vSize;
                
                uniform mat4 uMatrix;
                uniform float uZoomUnits;
                uniform vec4 uSelectedColor;
                
                void main() {
                    vColor = aColor;
                    
                    float x = aPos.x;
                    float y = aPos.y;
                    vSize = aSize * uZoomUnits;
                    
                    if(aIndex == 1.0) {
                        x -= vSize;
                        y += vSize;
                    } else if(aIndex == 2.0) {
                        x += vSize;
                        y -= vSize;
                    } else if(aIndex == 3.0) {
                        x += vSize;
                        y += vSize;
                    } else {
                        x -= vSize;
                        y -= vSize;
                    }
                    
                    vPosition = vec4(aPos.xyz, 1.0);
                    vFragPosition = vec4(x, y, aPos.z, 1.0);
                    
                    gl_Position = uMatrix * vFragPosition;
                    
                    #if defined(PICK)
                    if(mapvIsPicked()) {
                        vColor = uSelectedColor;
                    }
                    #endif
                }`,
                fragmentShader: `
                varying vec4 vPosition;
                varying float vSize;
                varying vec4 vFragPosition;
                varying vec4 vColor;
                
                uniform mat4 uMatrix;
                uniform float uTime;
                uniform float duration;
                uniform float trail;
                uniform float lineWidth;
                
                void main() {
                    float d = distance(vFragPosition.xy, vPosition.xy);
                    if(d > vSize) {
                        discard;
                    }
                    vec4 color = vColor;
                    
                    if(d > 0.9 * vSize && d <= vSize) {
                        color.a = 1.0 - smoothstep(0.9 * vSize, vSize, d);
                    }
                    gl_FragColor = color;
                }`,
                defines: this.getOptions().enablePicked ? ["PICK"] : [],
            },
            this
        );

        this.buffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.indexBuffer = new Buffer({
            gl: gl,
            target: "ELEMENT_ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });

        let attributes = [
            {
                stride: 36,
                name: "aPos",
                buffer: this.buffer,
                size: 3,
                type: "FLOAT",
                offset: 0,
            },
            {
                stride: 36,
                name: "aSize",
                buffer: this.buffer,
                size: 1,
                type: "FLOAT",
                offset: 12,
            },
            {
                stride: 36,
                name: "aIndex",
                buffer: this.buffer,
                size: 1,
                type: "FLOAT",
                offset: 16,
            },
            {
                stride: 36,
                name: "aColor",
                buffer: this.buffer,
                size: 4,
                type: "FLOAT",
                offset: 20,
            },
        ];
        attributes = attributes.concat(this.getCommonAttributes());
        this.vertexArray = new VertexArray({
            gl: gl,
            program: this.program,
            attributes: attributes,
        });
    }

    onChanged(options, data) {
        if (this.gl) {
            this.processData(data);
            options.enablePicked && this.parsePickData(data);
        }
    }

    processData(data) {
        const bufferData = [],
            indexData = [];

        data.forEach((point, index) => {
            const color = this.normizedColor(this.getValue("color", point));
            const size = this.getValue("size", point);

            const coords = this.normizedPoint(point.geometry.coordinates);
            for (let i = 0; 4 > i; i++) {
                bufferData.push(coords[0], coords[1], 0, size, i);
                bufferData.push(color[0], color[1], color[2], 1);
            }
            // 存入索引
            index = 4 * index;
            0 < index && indexData.push(index - 1, index);
            indexData.push(index, index + 1, index + 2, index + 3);
        });
        this.bufferData = bufferData;
        this.indexData = indexData;
        this.buffer.updateData(new Float32Array(bufferData));
        this.indexBuffer.updateData(new Uint32Array(indexData));
    }

    parsePickData(data) {
        const pickData = [];
        if (this.getOptions().enablePicked) {
            for (let c = 0; c < data.length; c++) {
                const g = this.indexToRgb(c);
                pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
                pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
                pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
                pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
            }
            this.pickBuffer.updateData(new Float32Array(pickData));
        }
    }

    render(transferOptions) {
        const program = this.program,
            gl = transferOptions.gl,
            matrix = transferOptions.matrix;

        if (this.bufferData.length === 0) return;

        program.use(gl);
        this.vertexArray.bind();
        this.indexBuffer.bind();

        const uniforms = Object.assign(
            this.getCommonUniforms(transferOptions),
            {
                uZoomUnits:
                    "px" === this.options.unit
                        ? this.map.getZoomUnits()
                        : this.normizedHeight(1),
                uMatrix: matrix,
            }
        );
        program.setUniforms(uniforms);

        gl.drawElements(
            gl.TRIANGLE_STRIP,
            this.indexData.length,
            gl.UNSIGNED_INT,
            0
        );
    }
}

// 动画圆圈的 shader
const fragmentShaders = {
    wave: `
    varying vec4 vPosition;
    varying float vSize;
    varying vec4 vFragPosition;
    varying vec4 vColor;
    varying float vStartTime;
    varying float vRadius;
    varying float vWidth;

    uniform mat4 uMatrix;
    uniform float uTime;
    uniform float duration;
    uniform float trail;

    void main() {
        float d = distance(vFragPosition.xy, vPosition.xy);
        if(d >= vRadius) {
            discard;
        }
        vec4 color = vColor;
        float R = vRadius;
        float center = vSize;
        float time = vStartTime + uTime;
        float alpha = sin((R - d) / R * trail * 2.0 * 3.14 + time / duration);
        
        if(d <= center) {
            if(d > 0.9 * center && d <= center) {
                if(alpha >= 0.5) {
                    color.a = 0.9;
                } else {
                    color.a = 1.0 - smoothstep(0.9 * center, center, d);
                }
            }
        } else {
            if(alpha >= 0.5) {
                color.a = 0.9;
                if(alpha >= 0.5 && alpha <= 0.6) {
                    color.a = smoothstep(0.0, 0.1, alpha - 0.5);
                }
                if(d >= center && d <= R) {
                    color.a *= 1.0 - smoothstep(center, R, d);
                }
            } else {
                color.a = 0.0;
            }
        }
        gl_FragColor = color;
    }`,
    bubble: `
    varying vec4 vPosition;
    varying float vSize;
    varying vec4 vFragPosition;
    varying vec4 vColor;
    varying float vStartTime;
    varying float vRadius;
    varying float vWidth;
    
    uniform mat4 uMatrix;
    uniform float uTime;
    uniform float duration;
    uniform float trail;
    
    void main() {
        float d = distance(vFragPosition.xy, vPosition.xy);
        if(d >= vRadius) {
            discard;
        }
        
        float time = vStartTime + uTime;
        float range = mod(time, (duration + trail));
        float percent = 0.0;
        if(range <= duration) {
            percent = range / duration;
        } else {
            percent = 1.0;
        }
        float center = vSize;
        float R = vRadius;
        float r = R * percent;
        vec4 color = vColor;

        if(d <= center) {
            if(d > 0.9 * center && d <= center) {
                color.a = 1.0 - smoothstep(0.9 * center, center, d);
            }
        } else {
            if(d < r) {
                color.a = smoothstep(0.1, 0.9, pow(d / r, 2.0) * 0.9);
                if(d >= 0.9 * r && d <= r) {
                    color.a *= 1.0 - smoothstep(0.9, 1.0, d / r);
                } if(range > duration) {
                    color.a *= 1.0 - (range - duration) / trail;
                }
            } else {
                color.a = 0.0;
            }
        }
        gl_FragColor = color;
    }`,
};

// 动画圆圈图层
class AnimateCircleLayer extends Layer {
    constructor(options) {
        super(options);
        this.autoUpdate = true;
        this.bufferData = [];
        this.initializeTime = new Date();
    }

    getDefaultOptions() {
        return {
            type: "bubble",
            size: 10,
            duration: 1,
            trail: 1,
            unit: "px",
            random: true,
            color: "blue",
            radius: null,
        };
    }

    initialize(gl) {
        this.gl = gl;

        this.program = new Program(
            this.gl,
            {
                vertexShader: `
                attribute vec3 aPos;
                attribute float aSize;
                attribute float aIndex;
                attribute vec4 aColor;
                attribute float aStartTime;
                attribute float aRadius;
                
                varying vec4 vColor;
                varying vec4 vPosition;
                varying vec4 vFragPosition;
                varying float vSize;
                varying float vWidth;
                varying float vStartTime;
                varying float vRadius;
                
                uniform mat4 uMatrix;
                uniform float uZoomUnits;
                uniform float lineWidth;
                uniform vec4 uSelectedColor;
                
                void main() {
                    vColor = aColor;
                    vWidth = lineWidth;
                    vStartTime = aStartTime;
                    vSize = aSize * uZoomUnits;
                    vRadius = aRadius * uZoomUnits;

                    float x = aPos.x;
                    float y = aPos.y;
                    float R = vRadius;
                    if(aIndex == 1.0) {
                        x -= R;
                        y += R;
                    } else if(aIndex == 2.0) {
                        x += R;
                        y -= R;
                    } else if(aIndex == 3.0) {
                        x += R;
                        y += R;
                    } else {
                        x -= R;
                        y -= R;
                    }
                    vPosition = vec4(aPos.xyz, 1.0);
                    vFragPosition = vec4(x, y, aPos.z, 1.0);
                    gl_Position = uMatrix * vFragPosition;
                    
                    #if defined(PICK)
                    if(mapvIsPicked()) {
                        vColor = uSelectedColor;
                    }
                    #endif
                }`,
                fragmentShader:
                    fragmentShaders[this.options.type] ||
                    fragmentShaders["bubble"],
                defines: this.options.enablePicked ? ["PICK"] : [],
            },
            this
        );

        this.buffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.indexBuffer = new Buffer({
            gl: gl,
            target: "ELEMENT_ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        let attributes = [
            {
                stride: 44,
                name: "aPos",
                buffer: this.buffer,
                size: 3,
                type: "FLOAT",
                offset: 0,
            },
            {
                stride: 44,
                name: "aSize",
                buffer: this.buffer,
                size: 1,
                type: "FLOAT",
                offset: 12,
            },
            {
                stride: 44,
                name: "aIndex",
                buffer: this.buffer,
                size: 1,
                type: "FLOAT",
                offset: 16,
            },
            {
                stride: 44,
                name: "aColor",
                buffer: this.buffer,
                size: 4,
                type: "FLOAT",
                offset: 20,
            },
            {
                stride: 44,
                name: "aRadius",
                buffer: this.buffer,
                size: 1,
                type: "FLOAT",
                offset: 36,
            },
            {
                stride: 44,
                name: "aStartTime",
                buffer: this.buffer,
                size: 1,
                type: "FLOAT",
                offset: 40,
            },
        ];
        attributes = attributes.concat(this.getCommonAttributes());
        this.vertexArray = new VertexArray({
            gl: gl,
            program: this.program,
            attributes: attributes,
        });
    }

    onChanged(options, data) {
        if (this.gl) {
            this.uniforms = {
                duration: options.duration,
                trail: options.trail,
            };
            this.processData(data);
            options.enablePicked && this.parsePickData(data);
        }
    }

    processData(data) {
        const bufferData = [],
            indexData = [];
        let startTime =
            (this.options.duration + this.options.trail) / data.length;

        data.forEach((point, index) => {
            const size = this.getValue("size", point);
            const radius = this.getValue("radius", point) || 2 * size;
            const color = this.normizedColor(this.getValue("color", point));

            const coords = this.normizedPoint(point.geometry.coordinates);
            startTime = this.options.random
                ? startTime + startTime * Math.random()
                : 0;
            for (let n = 0; 4 > n; n++) {
                bufferData.push(coords[0], coords[1], 0, size, n);
                bufferData.push(color[0], color[1], color[2], 1);
                bufferData.push(radius);
                bufferData.push(index * startTime);
            }

            index = 4 * index;
            0 < index && indexData.push(index - 1, index);
            indexData.push(index, index + 1, index + 2, index + 3);
        });
        this.bufferData = bufferData;
        this.indexData = indexData;
        this.buffer.updateData(new Float32Array(bufferData));
        this.indexBuffer.updateData(new Uint32Array(indexData));
    }

    parsePickData(data) {
        const pickData = [];
        if (this.getOptions().enablePicked) {
            for (let c = 0; c < data.length; c++) {
                const g = this.indexToRgb(c);
                pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
                pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
                pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
                pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
            }
            this.pickBuffer.updateData(new Float32Array(pickData));
        }
    }

    render(transferOptions) {
        const program = this.program,
            gl = transferOptions.gl,
            matrix = transferOptions.matrix;

        if (this.bufferData.length === 0) return;

        program.use(gl);
        this.vertexArray.bind();
        this.indexBuffer.bind();

        const zoomUnit = this.map.getZoomUnits();
        Object.assign(this.uniforms, this.getCommonUniforms(transferOptions), {
            uTime: (new Date() - this.initializeTime) / 1e3,
            uZoomUnits:
                "m" === this.options.unit ? this.normizedHeight(1) : zoomUnit,
            lineWidth: this.options.lineWidth * zoomUnit,
            uMatrix: matrix,
        });
        program.setUniforms(this.uniforms);

        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.drawElements(
            gl.TRIANGLE_STRIP,
            this.indexData.length,
            gl.UNSIGNED_INT,
            0
        );
    }
}

export default class CircleLayer {
    constructor(options) {
        return fragmentShaders[options.type]
            ? new AnimateCircleLayer(options)
            : new SimpleCircleLayer(options);
    }
}
