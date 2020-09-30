import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

import { mat4 } from "gl-matrix";

export default class FanLayer extends Layer {
    constructor(options) {
        super(options);

        this.autoUpdate = true;
        this.group = [];
        this.time = 0;
    }

    getDefaultOptions() {
        return {
            totalRadian: Math.PI,
            color: "rgba(255, 5, 5, 1)",
            radius: 50,
            step: 0.1,
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
                uniform vec3 glowColor;
                varying vec4 vFragColor;

                void main() {
                    gl_Position = uMatrix * uObjMatrix * vec4(aPos.xy, 0, 1.0);
                    vFragColor = vec4(glowColor, pow(aPos.z, 1.3));
                }`,
                fragmentShader: `
                varying vec4 vFragColor;

                void main() {
                    gl_FragColor = vFragColor;
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

                const bufferData = this.create3dCanvasRipple({
                    // 扇形角度值
                    totalRadian: this.getValue("totalRadian", data),
                    // 半径
                    radius: radius,
                });
                // 存入多边形
                this.group.push({
                    bufferData,
                    color: this.normizedColor(this.getValue("color", data)),
                    point: [point[0], point[1], 0],
                    scale: point[2],
                });
            }
        }
    }

    create3dCanvasRipple(data) {
        const { totalRadian, radius } = data;

        // 弧度和半径比
        const l = totalRadian / Math.max(radius, 20);

        // 所有顶点
        const vertices = [];
        for (let m = l; m <= totalRadian; m += l) {
            const x = Math.cos(m),
                y = Math.sin(m);

            vertices.push([0, 0, m / totalRadian]);
            vertices.push([x, y, m / totalRadian]);
        }

        const arrayData = [];
        // 构建三角形
        for (let i = 0; i < vertices.length - 3; i++) {
            arrayData.push(
                ...vertices[i],
                ...vertices[i + 1],
                ...vertices[i + 3]
            );
        }
        return arrayData;
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
            const { bufferData, point, scale, color } = this.group[i];
            this.buffer.updateData(new Float32Array(bufferData));
            this.vertexArray.bind();

            const m = mat4.create();
            mat4.translate(m, m, point);
            mat4.scale(m, m, [-scale, scale, 1]);
            mat4.rotateZ(m, m, 2 * Math.PI * this.time);

            const uniforms = {
                uMatrix: matrix,
                uObjMatrix: m,
                glowColor: color,
            };
            this.program.setUniforms(uniforms);

            gl.depthMask(false);
            gl.enable(gl.BLEND);
            gl.blendEquation(gl.FUNC_ADD);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.drawArrays(gl.TRIANGLES, 0, bufferData.length / 3);
        }

        this.time += this.options.step / 10;
        1 < this.time && (this.time = 0);
    }
}
