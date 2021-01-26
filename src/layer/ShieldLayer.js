import Layer from "./Layer";

import { IndexBuffer, VertexBuffer } from "../core/Buffer";
import VertexArrayObject from "../core/VertexArrayObject";
import Program from "../core/Program";
import SphereGeometry from "../geometies/SphereGeometry";

import { mat4 } from "gl-matrix";

class ShieldLayer extends Layer {
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
        // 构造program
        this.program = new Program(
            gl,
            {
                vertexShader: `
                attribute vec3 aPos;
                uniform mat4 uMatrix;
                uniform mat4 uObjMatrix;
                varying vec3 vPos;

                void main() {
                    gl_Position = uMatrix * uObjMatrix * vec4(aPos.xyz, 1.0);
                    vPos = aPos;
                }`,
                fragmentShader: `
                uniform vec4 glowColor;
                varying vec3 vPos;

                void main() {
                    vec4 color = glowColor;
                    color.a *= pow(1.0 - vPos.z, 1.3);

                    gl_FragColor = color;
                }`,
            },
            this
        );

        // 顶点相关数据
        this.vertexBuffer = new VertexBuffer({
            gl: gl,
            dynamicDraw: true,
            attributes: [
                {
                    name: "aPos",
                    size: 3,
                },
            ],
        });

        // 顶点索引
        this.indexBuffer = new IndexBuffer({
            gl: gl,
            dynamicDraw: true,
        });

        this.vao = new VertexArrayObject();
    }

    onChanged(options, dataArray) {
        this.group = [];

        if (this.gl) {
            for (let i = 0; i < dataArray.length; i++) {
                const data = dataArray[i];

                const coord = data.geometry.coordinates;
                const radius = +this.getValue("radius", data);

                const point = this.normizedPoint(coord);
                const scale = this.normizedHeight(radius, coord);

                // 构建半圆球
                const geometry = new SphereGeometry({
                    nlat: Math.floor(Math.max(radius, 20)),
                    nlong: Math.floor(Math.max(radius, 20) * 2),
                    endLong: Math.PI,
                });

                // obj mat4
                const m = mat4.create();
                mat4.translate(m, m, point);
                mat4.scale(m, m, [scale, scale, scale]);

                // 存入多边形
                this.group.push({
                    indexData: geometry.indices.value,
                    bufferData: geometry.getAttribute("POSITION").value,
                    uniforms: {
                        uObjMatrix: m,
                        glowColor: this.normizedColor(
                            this.getValue("color", data)
                        ),
                    },
                });
            }
        }
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix;

        if (this.group.length === 0) return;

        this.program.use(gl);

        for (let i = 0; i < this.group.length; i++) {
            // 绑定顶点数据
            const { indexData, bufferData, uniforms } = this.group[i];

            this.vertexBuffer.setData(bufferData);
            this.indexBuffer.setData(indexData);

            this.vao.bind({
                gl,
                program: this.program,
                vertexBuffer: this.vertexBuffer,
                indexBuffer: this.indexBuffer,
            });

            this.program.setUniforms({
                uMatrix: matrix,
                ...uniforms,
            });

            gl.depthMask(false);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

            gl.drawElements(
                gl.TRIANGLES,
                this.indexBuffer.numberOfIndices,
                this.indexBuffer.indexDatatype,
                0
            );
        }
    }
}

export default ShieldLayer;
