import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
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
        this.gl = gl;

        this.program = new Program(
            this.gl,
            {
                shaderId: "ripple",
                defines: this.getOptions().enablePicked ? ["PICK"] : [],
            },
            this
        );

        this.buffer = Buffer.createVertexBuffer({
            gl: gl,
        });
        let attributes = [
            {
                name: "aPos",
                buffer: this.buffer,
                size: 3,
            },
            {
                name: "aColor",
                buffer: this.buffer,
                size: 4,
            },
            {
                name: "aSize",
                buffer: this.buffer,
                size: 1,
            },
        ];
        attributes = attributes.concat(this.getCommonAttributes());
        this.vertexArray = new VertexArray({
            gl: gl,
            program: this.program,
            attributes: attributes,
        });
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
            this.buffer.updateData(bufferData);
            options.enablePicked && this.parsePickData(data);
        }
    }

    parsePickData(data) {
        const options = this.getOptions(),
            pickData = [];

        if (options.enablePicked)
            for (let g = 0; g < data.length; g++) {
                const h = this.indexToRgb(g);
                pickData.push(h[0] / 255, h[1] / 255, h[2] / 255);
            }
        options.enablePicked && this.pickBuffer.updateData(pickData);
    }

    onDestroy() {
        this.buffer = this.program = null;
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix,
            isPickRender = transferOptions.isPickRender;

        if (this.buffer.numberOfVertices === 0) return;

        const program = this.program;

        program.use(gl);
        this.vertexArray.bind();

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

        gl.drawArrays(gl.POINTS, 0, this.buffer.numberOfVertices);
    }
}
