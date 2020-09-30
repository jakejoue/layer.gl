import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";
import tesselateSphere from "../geometry/sphere";

import { mat4 } from "gl-matrix";

export default class ShieldLayer extends Layer {
    constructor(options) {
        super(options);
        this.group = [];
    }

    getDefaultOptions() {
        return {
            color: "rgba(25, 25, 250, 1)",
            radius: 50,
        };
    }

    initialize(gl) {
        this.gl = gl;
        // 构造program
        this.program = new Program(
            this.gl,
            {
                vertexShader: `
                precision highp float;
                attribute vec3 aPos;
                uniform mat4 uMatrix;
                uniform mat4 uObjMatrix;
                varying vec3 vPos;

                void main() {
                    gl_Position = uMatrix * uObjMatrix * vec4(aPos.xyz, 1.0);
                    vPos = aPos;
                }`,
                fragmentShader: `
                uniform vec3 glowColor;
                varying vec3 vPos;

                void main() {
                    gl_FragColor = vec4(glowColor, pow(1.0 - vPos.z, 1.3));
                }`,
            },
            this
        );
        // 顶点相关数据
        this.buffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        // 顶点索引
        this.indexBuffer = new Buffer({
            gl: gl,
            target: "ELEMENT_ARRAY_BUFFER",
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
        ];

        this.vertexArray = new VertexArray({
            gl: gl,
            program: this.program,
            attributes: attributes,
        });
    }

    onChanged(options, dataArray) {
        this.group = [];

        if (this.gl) {
            for (let i = 0; i < dataArray.length; i++) {
                const data = dataArray[i];

                const coord = data.geometry.coordinates;
                const radius = +this.getValue("radius", data);
                const point = this.normizedPoint([coord[0], coord[1], radius]);

                // 构建半圆球
                const {
                    attributes: { POSITION },
                    indices,
                } = tesselateSphere({
                    nlat: Math.floor(Math.max(radius, 20)),
                    nlong: Math.floor(Math.max(radius, 20) * 2),
                    endLong: Math.PI,
                });

                // 存入多边形
                this.group.push({
                    indexData: indices.value,
                    bufferData: POSITION.value,
                    color: this.normizedColor(this.getValue("color", data)),
                    point: [point[0], point[1], 0],
                    scale: point[2],
                });
            }
        }
    }

    onDestroy() {
        this.gl = this.program = this.buffer = this.vertexArray = this.group = null;
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix;

        if (this.group.length <= 0) return;

        this.program.use(gl);

        for (let i = 0; i < this.group.length; i++) {
            // 绑定顶点数据
            const { indexData, bufferData, point, scale, color } = this.group[
                i
            ];
            this.buffer.updateData(new Float32Array(bufferData));
            this.vertexArray.bind();
            this.indexBuffer.updateData(indexData);

            const m = mat4.create();
            mat4.translate(m, m, point);
            mat4.scale(m, m, [scale, scale, scale]);

            const uniforms = {
                uMatrix: matrix,
                uObjMatrix: m,
                glowColor: color,
            };
            this.program.setUniforms(uniforms);

            gl.depthMask(false);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

            gl.drawElements(
                gl.TRIANGLES,
                indexData.length,
                indexData instanceof Uint16Array
                    ? gl.UNSIGNED_SHORT
                    : gl.UNSIGNED_INT,
                0
            );
        }
    }
}
