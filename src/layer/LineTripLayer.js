import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

export default class LineTripLayer extends Layer {
    constructor(options) {
        super(options);

        this.bufferData = [];
        this.autoUpdate = true;
    }

    getDefaultOptions() {
        return {
            color: [1, 0.05, 0.05, 1],
            trailLength: 3,
            step: 0.1,
        };
    }

    initialize(gl) {
        this.gl = gl;
        this.program = new Program(
            this.gl,
            {
                vertexShader: `precision highp float;
                attribute vec4 aPos;
                attribute vec4 aColor;

                uniform mat4 u_matrix;
                uniform float currentTime;
                uniform float trailLength;
                
                varying float vTime;
                varying vec4 vColor;
                
                void main() {
                    gl_Position = u_matrix * vec4(aPos.xyz, 1.0);
                    vColor = aColor;
                    vTime = 1.0 - ((currentTime - aPos.w) / trailLength);
                }`,
                fragmentShader: `precision highp float;
                varying vec4 vColor;
                varying float vTime;
                
                void main() {
                    if(vTime > 1.0 || vTime < 0.0) {
                        discard;
                    }
                    gl_FragColor = vec4(vColor.rgb, 1.0 * vTime);
                }`,
            },
            this
        );

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
                size: 4,
                type: "FLOAT",
                offset: 0,
            },
            {
                stride: 32,
                name: "aColor",
                buffer: this.buffer,
                size: 4,
                type: "FLOAT",
                offset: 16,
            },
        ];
        this.vertexArray = new VertexArray({
            gl: gl,
            program: this.program,
            attributes: attributes,
        });
    }

    setTime(time) {
        this.time = time;
    }

    onChanged(options, data) {
        const gl = this.gl;
        if (gl) {
            const bufferData = [];
            let endTime = 0;

            for (let i = 0; i < data.length; i++) {
                // 坐标
                const coords = data[i].geometry.coordinates;

                // 颜色
                const color = this.normizedColor(
                    this.getValue("color", data[i])
                );

                // 结束时间
                if (coords.length > endTime) {
                    endTime = coords.length;
                }

                for (let j = 0; j < coords.length - 1; j++) {
                    let point = this.normizedPoint(coords[j]);
                    bufferData.push(point[0]);
                    bufferData.push(point[1]);
                    bufferData.push(point[2]);
                    undefined === coords[j][3]
                        ? bufferData.push(j)
                        : bufferData.push(Number(coords[j][3]));

                    bufferData.push(color[0]);
                    bufferData.push(color[1]);
                    bufferData.push(color[2]);
                    bufferData.push(color[3]);

                    point = this.normizedPoint(coords[j + 1]);
                    bufferData.push(point[0]);
                    bufferData.push(point[1]);
                    bufferData.push(point[2]);
                    undefined === coords[j + 1][3]
                        ? bufferData.push(j + 1)
                        : bufferData.push(Number(coords[j + 1][3]));

                    bufferData.push(color[0]);
                    bufferData.push(color[1]);
                    bufferData.push(color[2]);
                    bufferData.push(color[3]);
                }
            }

            this.startTime = +options.startTime || 0;
            this.endTime = +options.endTime || endTime;
            this.time = this.startTime;

            this.bufferData = bufferData;
            this.buffer.updateData(new Float32Array(bufferData));
        }
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix;

        if (this.bufferData.length <= 0) return;

        this.program.use(gl);
        this.vertexArray.bind();

        const uniforms = {
            u_matrix: matrix,
            currentTime: this.time,
            trailLength: this.options.trailLength,
        };
        this.program.setUniforms(uniforms);

        gl.enable(gl.BLEND);
        gl.polygonOffset(2, 1);
        "lighter" === this.options.blend
            ? gl.blendFunc(gl.ONE, gl.ONE)
            : gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.blendEquation(gl.FUNC_ADD);
        gl.drawArrays(gl.LINES, 0, this.bufferData.length / 8);

        this.time += this.options.step;
        this.time > this.endTime && (this.time = this.startTime);
    }
}
