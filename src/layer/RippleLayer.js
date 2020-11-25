import Layer from "./Layer";

import { VertexBuffer } from "../core/Buffer";
import VertexArrayObject from "../core/VertexArrayObject";
import Program from "../core/Program";

export default class RippleLayer extends Layer {
    constructor(options) {
        super(options);

        this.date = new Date();
        this.autoUpdate = true;
    }

    getDefaultOptions() {
        return {
            color: [0.1, 0.1, 0.9, 1],
            blend: "normal",
            size: 20,
            unit: "px",
            duration: 2,
        };
    }

    initialize(gl) {
        this.program = new Program(
            gl,
            {
                shaderId: "ripple",
                defines: this.getOptions().enablePicked ? ["PICK"] : [],
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
                {
                    name: "aSize",
                    size: 1,
                },
            ],
        });

        this.vao = new VertexArrayObject();
    }

    onChanged(options, data) {
        if (this.gl) {
            const bufferData = [];
            for (let i = 0; i < data.length; i++) {
                let coords = data[i].geometry.coordinates;
                coords = this.normizedPoint(coords);

                const color = this.normizedColor(
                    this.getValue("color", data[i])
                );
                const size = +this.getValue("size", data[i]);

                bufferData.push(coords[0], coords[1], coords[2]);
                bufferData.push(color[0], color[1], color[2], color[3]);

                if (options.unit === "px") {
                    bufferData.push(size * window.devicePixelRatio);
                } else {
                    bufferData.push(this.normizedHeight(size, coords));
                }
            }

            this.vertexBuffer.setData(bufferData);
            this.vertexBuffers = this.getCommonBuffers({
                pickData: this.parsePickData(data),
            });
        }
    }

    parsePickData(data) {
        const options = this.getOptions(),
            pickData = [];

        if (options.enablePicked) {
            for (let g = 0; g < data.length; g++) {
                const h = this.indexToRgb(g);
                pickData.push(h[0] / 255, h[1] / 255, h[2] / 255);
            }
        }

        return pickData;
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix,
            isPickRender = transferOptions.isPickRender;

        if (this.vertexBuffer.numberOfVertices === 0) return;

        const program = this.program;

        program.use(gl);

        this.vao.bind({
            gl,
            program,
            vertexBuffer: this.vertexBuffer,
            vertexBuffers: this.vertexBuffers,
        });

        let uniforms = this.getCommonUniforms(transferOptions);
        uniforms = Object.assign(uniforms, {
            zoomUnits: "px" === this.options.unit ? 1 : this.map.getZoomUnits(),
            uTime: (new Date() - this.date) / 1e3,
            duration: this.options.duration,
            uMatrix: matrix,
        });
        program.setUniforms(uniforms);

        if (isPickRender) {
            gl.disable(gl.BLEND);
        } else {
            gl.enable(gl.BLEND);
            gl.blendEquation(gl.FUNC_ADD);
            "lighter" === this.options.blend
                ? gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
                : gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        }

        gl.drawArrays(gl.POINTS, 0, this.vertexBuffer.numberOfVertices);
    }
}
