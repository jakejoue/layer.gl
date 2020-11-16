import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

export default class SimpleLineLayer extends Layer {
    constructor(options) {
        super(options);
        this.bufferData = [];
    }

    initialize(gl) {
        this.gl = gl;
        this.program = new Program(
            this.gl,
            {
                shaderId: "simple_line",
                defines: this.getOptions().useDash ? ["DASH"] : "",
            },
            this
        );

        this.buffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.vertexArray = new VertexArray({
            gl: gl,
            program: this.program,
            attributes: [
                {
                    stride: 28,
                    name: "aPos",
                    buffer: this.buffer,
                    size: 3,
                    type: "FLOAT",
                    offset: 0,
                },
                {
                    stride: 28,
                    name: "aColor",
                    buffer: this.buffer,
                    size: 4,
                    type: "FLOAT",
                    offset: 12,
                },
            ],
        });
    }

    onChanged(options, data) {
        const self = this;
        if (this.gl) {
            const arrayData = [],
                func = function (point, color) {
                    if (point)
                        for (let e = 0; e < point.length - 1; e++) {
                            let g = self.normizedPoint(point[e]);
                            arrayData.push(g[0]);
                            arrayData.push(g[1]);
                            arrayData.push(g[2]);
                            arrayData.push(
                                color[0],
                                color[1],
                                color[2],
                                color[3]
                            );
                            g = self.normizedPoint(point[e + 1]);
                            arrayData.push(g[0]);
                            arrayData.push(g[1]);
                            arrayData.push(g[2]);
                            arrayData.push(
                                color[0],
                                color[1],
                                color[2],
                                color[3]
                            );
                        }
                };

            for (let h = 0; h < data.length; h++) {
                const color = this.normizedColor(
                    this.getValue("color", data[h])
                );

                const geometry = data[h].geometry,
                    coords = geometry.coordinates;

                if ("MultiPolygon" === geometry.type) {
                    if (coords) {
                        for (let i = 0; i < coords.length; i++) {
                            func(coords[i][0], color);
                        }
                    }
                } else if ("Polygon" === geometry.type) {
                    coords && func(coords[0], color);
                } else if ("MultiLineString" === geometry.type) {
                    if (coords) {
                        for (let i = 0; i < coords.length; i++) {
                            func(coords[i], color);
                        }
                    }
                } else func(coords, color);
            }

            this.bufferData = arrayData;
            this.buffer.updateData(new Float32Array(arrayData));
        }
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix;

        if (this.bufferData && !(0 >= this.bufferData.length)) {
            const program = this.program;
            program.use(gl);

            this.vertexArray.bind();
            program.setUniforms({
                u_matrix: matrix,
            });

            gl.enable(gl.BLEND);
            gl.blendEquation(gl.FUNC_ADD);

            const blend = this.getOptions().blend;
            if (blend && "lighter" === blend) {
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            } else {
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            }

            gl.drawArrays(gl.LINES, 0, this.bufferData.length / 7);
            gl.disable(gl.BLEND);
        }
    }
}
