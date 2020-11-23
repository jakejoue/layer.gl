import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

export default class LineTripLayer extends Layer {
    constructor(options) {
        super(options);
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
                shaderId: "line_trip",
            },
            this
        );

        this.buffer = Buffer.createVertexBuffer({
            gl: gl,
        });
        const attributes = [
            {
                name: "aPos",
                buffer: this.buffer,
                size: 4,
            },
            {
                name: "aColor",
                buffer: this.buffer,
                size: 4,
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

            this.buffer.updateData(bufferData);
        }
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix;

        if (this.buffer.numberOfVertices === 0) return;

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

        gl.drawArrays(gl.LINES, 0, this.buffer.numberOfVertices);

        this.time += this.options.step;
        this.time > this.endTime && (this.time = this.startTime);
    }
}
