import Layer from "./Layer";

import { VertexBuffer } from "../core/Buffer";
import VertexArrayObject from "../core/VertexArrayObject";
import Program from "../core/Program";

class SimpleLineLayer extends Layer {
    constructor(options) {
        super(options);
    }

    initialize(gl) {
        this.program = new Program(
            gl,
            {
                shaderId: "simple_line",
                defines: this.getOptions().useDash ? ["DASH"] : "",
            },
            this
        );

        this.vertexBuffer = new VertexBuffer({
            gl: gl,
            attributes: [
                {
                    name: "aPos",
                    size: 3,
                },
                {
                    name: "aColor",
                    size: 4,
                },
            ],
        });

        this.vao = new VertexArrayObject();
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

            this.vertexBuffer.setData(arrayData);
        }
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix;

        if (this.vertexBuffer.numberOfVertices === 0) return;

        const program = this.program;
        program.use(gl);

        this.vao.bind({
            gl,
            program,
            vertexBuffer: this.vertexBuffer,
        });

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

        gl.drawArrays(gl.LINES, 0, this.vertexBuffer.numberOfVertices);
        gl.disable(gl.BLEND);
    }
}

export default SimpleLineLayer;
