import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

export default class RippleLayer extends Layer {
    constructor(options) {
        super(options);
        this.bufferData = [];
        this.date = new Date();
        this.autoUpdate = true;
    }

    getDefaultOptions() {
        return {
            color: [0.1, 0.1, 0.9, 1],
            blend: "normal",
            size: 20,
            unit: "px",
            duration: 2,
        };
    }

    initialize(gl) {
        this.gl = gl;

        this.program = new Program(
            this.gl,
            {
                vertexShader: `
                attribute vec3 aPos;
                attribute vec4 aColor;
                attribute float aSize;
                
                uniform mat4 uMatrix;
                uniform vec4 uSelectedColor;
                uniform float uTime;
                uniform float duration;
                uniform float zoomUnits;
                
                varying vec4 vColor;
                
                void main(void) {
                    if(aColor.w >= 0.0 && aColor.w <= 1.0) {
                        vColor = aColor;
                    } else {
                        vColor = vec4(aColor.xyz, 1.0);
                    }

                    float percent = mod(uTime, duration) / duration;
                    vColor.a = 1.0 - percent;

                    gl_Position = uMatrix * vec4(aPos.xyz, 1.0);
                    gl_PointSize = aSize * zoomUnits * percent;
                    
                    #if defined(PICK)
                    if(mapvIsPicked()) {
                        vColor = uSelectedColor;
                    }
                    #endif
                }`,
                fragmentShader: `
                varying vec4 vColor;
                
                void main(void) {
                    vec4 color = vColor;
                    float d = distance(gl_PointCoord, vec2(0.5, 0.5));
                    if(d > 0.5) {
                        discard;
                    }
                    float blur = 1.0;
                    blur = 1.0 - smoothstep(0.49, 0.5, d);
                    color.a *= blur;
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
        let attributes = [
            {
                stride: 32,
                name: "aPos",
                buffer: this.buffer,
                size: 3,
                type: "FLOAT",
                offset: 0,
            },
            {
                stride: 32,
                name: "aColor",
                buffer: this.buffer,
                size: 4,
                type: "FLOAT",
                offset: 12,
            },
            {
                stride: 32,
                name: "aSize",
                buffer: this.buffer,
                size: 1,
                type: "FLOAT",
                offset: 28,
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
            const bufferData = [];
            for (let i = 0; i < data.length; i++) {
                let coords = data[i].geometry.coordinates;
                coords = this.normizedPoint(coords);

                const color = this.normizedColor(
                    this.getValue("color", data[i])
                );
                const size = +this.getValue("size", data[i]);

                bufferData.push(coords[0], coords[1], coords[2]);
                bufferData.push(color[0], color[1], color[2], color[3]);
                bufferData.push(size * window.devicePixelRatio);
            }
            this.bufferData = bufferData;
            this.buffer.updateData(new Float32Array(bufferData));
            options.enablePicked && this.parsePickData(data);
        }
    }

    parsePickData(data) {
        const options = this.getOptions(),
            pickData = [];
        if (options.enablePicked)
            for (let g = 0; g < data.length; g++) {
                const h = this.indexToRgb(g);
                pickData.push(h[0] / 255, h[1] / 255, h[2] / 255);
            }
        options.enablePicked &&
            this.pickBuffer.updateData(new Float32Array(pickData));
    }

    onDestroy() {
        this.buffer = this.program = this.bufferData = null;
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix,
            isPickRender = transferOptions.isPickRender;

        if (this.bufferData.length > 0) {
            const program = this.program;

            program.use(gl);
            this.vertexArray.bind();

            let uniforms = this.getCommonUniforms(transferOptions);
            uniforms = Object.assign(uniforms, {
                zoomUnits:
                    "px" === this.options.unit ? 1 : this.map.getZoomUnits(),
                uTime: (new Date() - this.date) / 1e3,
                duration: this.options.duration,
                uMatrix: matrix,
            });
            program.setUniforms(uniforms);

            if (isPickRender) {
                gl.disable(gl.BLEND);
            } else {
                gl.enable(gl.BLEND);
                gl.blendEquation(gl.FUNC_ADD);
                "lighter" === this.options.blend
                    ? gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
                    : gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            }

            gl.drawArrays(gl.POINTS, 0, this.bufferData.length / 8);
        }
    }
}
