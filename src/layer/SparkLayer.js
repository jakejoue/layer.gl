import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

export default class SparkLayer extends Layer {
    constructor(options) {
        super(options);

        this.autoUpdate = true;
    }

    getDefaultOptions() {
        return {
            color: "rgba(250, 25, 25, 1)",
            trailLength: 3,
            height: 100,
            step: 0.1,
            segs: 10,
        };
    }

    setTime(time) {
        this.time = time;
    }

    initialize(gl) {
        this.gl = gl;
        this.program = new Program(
            this.gl,
            {
                shaderId: "spark",
            },
            this
        );

        // 顶点相关数据
        this.buffer = Buffer.createVertexBuffer({
            gl: gl,
        });
        const attributes = [
            {
                name: "aPos",
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

    onChanged(options, data) {
        const gl = this.gl;
        if (gl) {
            const arrayData = [],
                segs = +options.segs || 10;

            for (let i = 0; i < data.length; i++) {
                const coord = data[i].geometry.coordinates;
                // 点
                const point = this.normizedPoint(coord);
                // 高度
                const height = this.normizedPoint([
                    coord[0],
                    coord[1],
                    this.getValue("height", data[i]),
                ])[2];

                for (let h = 0, j = 0; j < segs; j++) {
                    arrayData.push(point[0], point[1], h);
                    0 === point[2]
                        ? arrayData.push(j)
                        : arrayData.push(+point[2]);

                    h += height / segs;

                    arrayData.push(point[0], point[1], h);
                    0 === point[2]
                        ? arrayData.push(j + 1)
                        : arrayData.push(+point[2]);
                }
            }

            this.startTime = +options.startTime || 0;
            this.endTime = +options.endTime || 10;
            this.time = this.startTime;

            this.buffer.updateData(arrayData);
        }
    }

    onDestroy() {
        this.gl = this.program = this.buffer = this.vertexArray = null;
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix;

        if (this.buffer.numberOfVertices === 0) return;

        this.program.use(gl);
        this.vertexArray.bind();

        const uniforms = {
            u_matrix: matrix,
            uFragColor: this.normizedColor(this.options.color),
            currentTime: this.time,
            trailLength: this.options.trailLength,
        };
        this.program.setUniforms(uniforms);

        gl.enable(gl.BLEND);
        gl.polygonOffset(2, 1);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.blendEquation(gl.FUNC_ADD);
        gl.drawArrays(gl.LINES, 0, this.buffer.numberOfVertices);

        this.time += +this.options.step;
        this.time > 1.5 * this.endTime && (this.time = this.startTime);
    }
}
