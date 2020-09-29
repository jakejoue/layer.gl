import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

const PointShapeTypes = {
    circle: 1,
    square: 2,
};

export default class PointLayer extends Layer {
    constructor(options) {
        super(options);
        this.bufferData = [];
    }

    getDefaultOptions() {
        return {
            color: "rgba(25, 25, 250, 1)",
            blend: "normal",
            shape: "circle",
            size: 5,
        };
    }

    initialize(gl) {
        this.gl = gl;
        // 构造program
        this.program = new Program(
            this.gl,
            {
                vertexShader: `
            attribute vec3 aPos;
            attribute vec4 aColor;
            attribute float aSize;
            uniform mat4 uMatrix;
            varying vec4 vColor;
            uniform vec4 uSelectedColor;

            void main() {
                if(aColor.w >= 0.0 && aColor.w <= 1.0) {
                    vColor = aColor;
                } else {
                    vColor = vec4(aColor.xyz, 1.0);
                }
                gl_Position = uMatrix * vec4(aPos, 1.0);
                gl_PointSize = aSize;

                #if defined(PICK)
                if(mapvIsPicked()) {
                    vColor = uSelectedColor;
                }
                #endif
            }`,
                fragmentShader: `
                varying vec4 vColor;
                uniform int uShape;

                void main() {
                    vec4 color = vColor;
                    if(uShape == 1) {
                        float d = distance(gl_PointCoord, vec2(0.5, 0.5));
                        if(d > 0.5) {
                            discard;
                        }
                        float blur = 1.0;
                        blur = 1.0 - smoothstep(0.49, 0.5, d);
                        color.a *= blur;
                        gl_FragColor = color;
                    } else {
                        gl_FragColor = color;
                    }
                }
                `,
                defines: this.getOptions().enablePicked ? ["PICK"] : [],
            },
            this
        );
        // 顶点相关数据
        this.buffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        const attributes = [
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
        this.vertexArray = new VertexArray({
            gl: gl,
            program: this.program,
            attributes: [...attributes, ...this.getCommonAttributes()],
        });
    }

    onChanged(options, dataArray) {
        if (this.gl) {
            const arrayData = [];

            for (let i = 0; i < dataArray.length; i++) {
                const data = dataArray[i];
                const point = this.normizedPoint(data.geometry.coordinates);

                let color = this.getValue("color", data);
                color = this.normizedColor(color);
                const size = +this.getValue("size", data);

                const points = this.addMultipleCoords(point);
                for (let j = 0; j < points.length; j++) {
                    const p = points[j];
                    arrayData.push(p[0], p[1], +(p[2] || 0));
                    arrayData.push(color[0], color[1], color[2], color[3]);
                    arrayData.push(size * window.devicePixelRatio);
                }
            }
            this.bufferData = arrayData;
            this.buffer.updateData(new Float32Array(arrayData));

            options.enablePicked && this.parsePickData(dataArray);
        }
    }

    parsePickData(arrayData) {
        const options = this.getOptions(),
            dataArray = [];
        if (options.enablePicked) {
            for (let i = 0; i < arrayData.length; i++) {
                const k = this.indexToRgb(i);
                dataArray.push(k[0] / 255, k[1] / 255, k[2] / 255);

                if (options.repeat) {
                    dataArray.push(k[0] / 255, k[1] / 255, k[2] / 255);
                    dataArray.push(k[0] / 255, k[1] / 255, k[2] / 255);
                }
            }
        }
        if (options.enablePicked) {
            this.pickBuffer.updateData(new Float32Array(dataArray));
        }
    }

    destroy() {
        this.gl = this.program = this.buffer = this.vertexArray = this.bufferData = null;
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix,
            isPickRender = transferOptions.isPickRender;

        if (this.bufferData.length <= 0) return;

        this.program.use(gl);
        this.vertexArray.bind();

        const uniforms = Object.assign(
            this.getCommonUniforms(transferOptions),
            {
                uShape: PointShapeTypes[this.options.shape] || 1,
                uMatrix: matrix,
            }
        );
        this.program.setUniforms(uniforms);

        if (isPickRender) {
            gl.disable(gl.BLEND);
        } else {
            gl.enable(gl.BLEND);
            gl.blendEquation(gl.FUNC_ADD);

            const blend = this.options.blend;
            if (blend && "lighter" === blend) {
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            } else {
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            }
        }
        gl.depthMask(false);
        gl.drawArrays(gl.POINTS, 0, this.bufferData.length / 8);
    }
}
