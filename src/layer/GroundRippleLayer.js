import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

import { mat4 } from "gl-matrix";

export default class GroundRippleLayer extends Layer {
    constructor(options) {
        super(options);

        this.group = [];
        this.date = new Date();
        this.autoUpdate = true;
    }

    getDefaultOptions() {
        return {
            color: [0.1, 0.1, 0.9, 1],
            size: 5,
            segs: 90,
            duration: 2,
            width: 400,
        };
    }

    initialize(gl) {
        this.gl = gl;
        this.program = new Program(this.gl, {
            vertexShader: `
            uniform mat4 u_matrix;
            uniform mat4 u_modelMatrix;

            attribute vec3 aPos;
            attribute vec4 aColor;

            varying vec4 vColor;
            varying vec2 vPos;
            
            void main() {
                vec4 pos = u_modelMatrix * vec4(aPos, 1.0);
                gl_Position = u_matrix * pos;

                vColor = aColor;
                vPos = aPos.xy;
            }`,
            fragmentShader: `
            precision highp float;

            uniform vec2 u_center;
            uniform float u_radius;
            uniform float u_width;
            uniform float u_time;
            uniform float u_duration;

            varying vec4 vColor;
            varying vec2 vPos;

            void main() {
                vec4 color = vColor;

                // 当前百分比
                float percent = mod(u_time, u_duration) / u_duration;
                // 当前最小半径
                float radius = u_radius * percent;

                // 当前点半径
                float dis = distance(vPos, u_center);

                if(dis > radius && dis < radius + u_width) {
                    color *= (1.0 - abs(dis - radius) / u_width) * 2.0 + 1.0;
                } else {
                    discard;
                }

                gl_FragColor = color;
            }`,
        });

        this.indexBuffer = new Buffer({
            gl: gl,
            target: "ELEMENT_ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.buffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        const attributes = [
            {
                name: "aPos",
                buffer: this.buffer,
                size: 3,
                type: "FLOAT",
                offset: 0,
            },
            {
                name: "aColor",
                buffer: this.buffer,
                size: 4,
                type: "FLOAT",
                offset: 12,
            },
        ];
        this.vertexArray = new VertexArray({
            gl: gl,
            program: this.program,
            attributes: attributes,
        });
    }

    onChanged(options, dataArray) {
        const gl = this.gl;
        this.group = [];

        if (gl) {
            for (let i = 0; i < dataArray.length; i++) {
                const data = dataArray[i];

                // 尺寸 和 颜色
                const segs = this.getValue("segs", data),
                    size = +this.getValue("size", data),
                    width = +this.getValue("width", data),
                    color = this.normizedColor(this.getValue("color", data));

                // 每份儿的角度
                const perSegAngle = 360 / segs;
                const bufferData = [],
                    indexData = [];

                const coord = this.normizedPoint(data.geometry.coordinates);
                // 内半径 和 环半径
                const _size = this.normizedHeight(
                    size,
                    data.geometry.coordinates
                );
                const _width = this.normizedHeight(
                    width,
                    data.geometry.coordinates
                );

                // 中心点
                bufferData.push(0, 0, 0);
                bufferData.push(color[0], color[1], color[2], color[3]);

                // 周边点
                for (
                    let v = 1, angle = 0;
                    v <= segs;
                    v++, angle += perSegAngle
                ) {
                    // point & color
                    bufferData.push(
                        Math.cos((Math.PI / 180) * angle) * (_size + _width),
                        Math.sin((Math.PI / 180) * angle) * (_size + _width),
                        0
                    );
                    bufferData.push(color[0], color[1], color[2], color[3]);

                    // index
                    v === segs
                        ? indexData.push(0, 0 + v, 1)
                        : indexData.push(0, 0 + v, 0 + v + 1);
                }

                // 存入group
                this.group[i] = {
                    position: coord,
                    indexData: new Uint16Array(indexData),
                    bufferData: new Float32Array(bufferData),
                    uniforms: {
                        // u_center: coord,
                        u_radius: _size,
                        u_width: _width,
                    },
                };
            }
        }
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix;

        if (!this.group.length) return;

        this.program.use(gl);
        this.program.setUniforms({
            u_matrix: matrix,
            u_time: (new Date() - this.date) / 1e3,
            u_duration: this.options.duration,
        });

        // blend
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
        gl.blendEquation(gl.FUNC_ADD);

        for (let i = 0; i < this.group.length; i++) {
            const obj = this.group[i];
            this.buffer.updateData(obj.bufferData);
            this.indexBuffer.updateData(obj.indexData);
            this.vertexArray.bind();

            const modelMatrix = mat4.create();
            mat4.translate(modelMatrix, modelMatrix, obj.position);
            this.program.setUniforms(
                Object.assign(
                    {
                        u_modelMatrix: modelMatrix,
                    },
                    obj.uniforms
                )
            );

            gl.drawElements(
                gl.TRIANGLES,
                obj.indexData.length,
                gl.UNSIGNED_SHORT,
                0
            );
        }
    }
}
