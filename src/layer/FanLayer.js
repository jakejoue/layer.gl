import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

export default class FanLayer extends Layer {
    constructor(options) {
        super(options);
        this.bufferData = [];
        this.time = 0;
    }

    getDefaultOptions() {
        return {
            totalRadian: Math.PI,
            color: [1, 0.02, 0.02, 1],
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
            attribute vec3 aPos;
            uniform mat4 uMatrix;
            uniform float periodRatio;
            uniform vec3 glowColor;
            varying vec4 vFragColor;

            void main() {
                float radian = radians(360.0 * periodRatio);
                float s = sin(radian);
                float c = cos(radian);
                vec2 rotatedPostion = vec2(aPos.x*s + aPos.y*c, aPos.y*s - aPos.x*c);
                gl_Position = uMatrix * vec4(rotatedPostion, 0, 1.0);

                vFragColor = vec4(glowColor, pow(position.z, 1.3));
            }
            
            void main() {
            }`,
                fragmentShader: `
                varying vec4 vFragColor;

                void main() {
                    gl_FragColor = vFragColor;
                }
                `,
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
        if (this.gl) {
            const arrayData = [];

            for (let i = 0; i < dataArray.length; i++) {
                const data = dataArray[i];

                const coord = data.geometry.coordinates;
                const size = +this.getValue("size", data);
                const point = this.normizedPoint([coord[0], coord[1], size]);

                arrayData.push(
                    ...this.create3dCanvasRipple({
                        originalData: data,
                        normizedData: point,
                    })
                );
            }
            this.bufferData = arrayData;
            this.buffer.updateData(new Float32Array(arrayData));
        }
    }

    create3dCanvasRipple(data) {
        const { normizedData, originalData } = data;

        // 扇形范围
        const totalRadian = this.getValue("totalRadian", originalData);
        const size = normizedData[2];
        // 弧度和半径比
        const l = totalRadian / (size / 2);

        // 所有顶点
        const vertices = [];
        for (let m = l; m <= totalRadian; m += l) {
            const x = normizedData[0] + size * Math.cos(m),
                y = normizedData[1] + size * Math.sin(m);

            vertices.push([0, 0, m / totalRadian]);
            vertices.push([x, y, m / totalRadian]);
        }

        // 构建三角形
        const geometry = [];
        for (let i = 0; i < vertices.length - 2; i++) {
            geometry.push(vertices[i], vertices[i + 1], vertices[i + 3]);
        }
        return geometry;
    }

    destroy() {
        this.gl = this.program = this.buffer = this.vertexArray = this.bufferData = null;
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix;

        if (this.bufferData.length <= 0) return;

        this.program.use(gl);
        this.vertexArray.bind();

        const uniforms = {
            uMatrix: matrix,
            periodRatio: this.time,
            glowColor: this.normizedColor(this.options.color),
        };
        this.program.setUniforms(uniforms);

        gl.drawArrays(gl.POINTS, 0, this.bufferData.length / 8);

        this.time += this.options.step / 10;
        1 < this.time && (this.time = 0);
    }
}
