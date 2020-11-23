import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

// 简单圆圈图层
class SimpleCircleLayer extends Layer {
    constructor(options) {
        super(options);
    }

    getDefaultOptions() {
        return {
            size: 10,
            unit: "px",
            color: "blue",
        };
    }

    initialize(gl) {
        this.gl = gl;

        this.program = new Program(
            this.gl,
            {
                shaderId: "circle_simple",
                defines: this.getOptions().enablePicked ? ["PICK"] : [],
            },
            this
        );

        this.buffer = Buffer.createVertexBuffer({
            gl: gl,
        });
        this.indexBuffer = Buffer.createIndexBuffer({
            gl: gl,
        });

        let attributes = [
            {
                name: "aPos",
                buffer: this.buffer,
                size: 3,
            },
            {
                name: "aSize",
                buffer: this.buffer,
                size: 1,
            },
            {
                name: "aIndex",
                buffer: this.buffer,
                size: 1,
            },
            {
                name: "aColor",
                buffer: this.buffer,
                size: 4,
            },
        ];
        attributes = attributes.concat(this.getCommonAttributes());
        this.vertexArray = new VertexArray({
            gl: gl,
            program: this.program,
            attributes: attributes,
            indexBuffer: this.indexBuffer,
        });
    }

    onChanged(options, data) {
        if (this.gl) {
            this.processData(data);
            options.enablePicked && this.parsePickData(data);
        }
    }

    processData(data) {
        const bufferData = [],
            indexData = [];

        data.forEach((point, index) => {
            const color = this.normizedColor(this.getValue("color", point));
            const size = this.getValue("size", point);

            const coords = this.normizedPoint(point.geometry.coordinates);
            for (let i = 0; 4 > i; i++) {
                bufferData.push(coords[0], coords[1], 0, size, i);
                bufferData.push(color[0], color[1], color[2], 1);
            }
            // 存入索引
            index = 4 * index;
            0 < index && indexData.push(index - 1, index);
            indexData.push(index, index + 1, index + 2, index + 3);
        });
        this.buffer.updateData(bufferData);
        this.indexBuffer.updateData(indexData);
    }

    parsePickData(data) {
        const pickData = [];
        if (this.getOptions().enablePicked) {
            for (let c = 0; c < data.length; c++) {
                const g = this.indexToRgb(c);
                pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
                pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
                pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
                pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
            }
            this.pickBuffer.updateData(pickData);
        }
    }

    render(transferOptions) {
        const program = this.program,
            gl = transferOptions.gl,
            matrix = transferOptions.matrix;

        if (this.indexBuffer.numberOfIndices === 0) return;

        program.use(gl);
        this.vertexArray.bind();

        const uniforms = Object.assign(
            this.getCommonUniforms(transferOptions),
            {
                uZoomUnits:
                    "px" === this.options.unit
                        ? this.map.getZoomUnits()
                        : this.normizedHeight(1, this.map.getCenter()),
                uMatrix: matrix,
            }
        );
        program.setUniforms(uniforms);

        gl.drawElements(
            gl.TRIANGLE_STRIP,
            this.indexBuffer.numberOfIndices,
            this.indexBuffer.indexDatatype,
            0
        );
    }
}

// 动画圆圈图层
class AnimateCircleLayer extends Layer {
    constructor(options) {
        super(options);
        this.autoUpdate = true;
        this.initializeTime = new Date();
    }

    getDefaultOptions() {
        return {
            type: "bubble",
            size: 10,
            duration: 1,
            trail: 1,
            unit: "px",
            random: true,
            color: "blue",
            radius: null,
        };
    }

    initialize(gl) {
        this.gl = gl;

        this.program = new Program(
            this.gl,
            {
                shaderId:
                    this.options.type === "wave"
                        ? "circle_wave"
                        : "circle_bubble",
                defines: this.options.enablePicked ? ["PICK"] : [],
            },
            this
        );

        this.buffer = Buffer.createVertexBuffer({
            gl: gl,
        });
        this.indexBuffer = Buffer.createIndexBuffer({
            gl: gl,
        });
        let attributes = [
            {
                name: "aPos",
                buffer: this.buffer,
                size: 3,
            },
            {
                name: "aSize",
                buffer: this.buffer,
                size: 1,
            },
            {
                name: "aIndex",
                buffer: this.buffer,
                size: 1,
            },
            {
                name: "aColor",
                buffer: this.buffer,
                size: 4,
            },
            {
                name: "aRadius",
                buffer: this.buffer,
                size: 1,
            },
            {
                name: "aStartTime",
                buffer: this.buffer,
                size: 1,
            },
        ];
        attributes = attributes.concat(this.getCommonAttributes());
        this.vertexArray = new VertexArray({
            gl: gl,
            program: this.program,
            attributes: attributes,
            indexBuffer: this.indexBuffer,
        });
    }

    onChanged(options, data) {
        if (this.gl) {
            this.uniforms = {
                duration: options.duration,
                trail: options.trail,
            };
            this.processData(data);
            options.enablePicked && this.parsePickData(data);
        }
    }

    processData(data) {
        const bufferData = [],
            indexData = [];
        let startTime =
            (this.options.duration + this.options.trail) / data.length;

        data.forEach((point, index) => {
            const size = this.getValue("size", point);
            const radius = this.getValue("radius", point) || 2 * size;
            const color = this.normizedColor(this.getValue("color", point));

            const coords = this.normizedPoint(point.geometry.coordinates);
            startTime = this.options.random
                ? startTime + startTime * Math.random()
                : 0;
            for (let n = 0; 4 > n; n++) {
                bufferData.push(coords[0], coords[1], 0, size, n);
                bufferData.push(color[0], color[1], color[2], 1);
                bufferData.push(radius);
                bufferData.push(index * startTime);
            }

            index = 4 * index;
            0 < index && indexData.push(index - 1, index);
            indexData.push(index, index + 1, index + 2, index + 3);
        });
        this.buffer.updateData(bufferData);
        this.indexBuffer.updateData(indexData);
    }

    parsePickData(data) {
        const pickData = [];
        if (this.getOptions().enablePicked) {
            for (let c = 0; c < data.length; c++) {
                const g = this.indexToRgb(c);
                pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
                pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
                pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
                pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
            }
            this.pickBuffer.updateData(pickData);
        }
    }

    render(transferOptions) {
        const program = this.program,
            gl = transferOptions.gl,
            matrix = transferOptions.matrix;

        if (this.indexBuffer.numberOfIndices === 0) return;

        program.use(gl);
        this.vertexArray.bind();

        const zoomUnit = this.map.getZoomUnits();
        Object.assign(this.uniforms, this.getCommonUniforms(transferOptions), {
            uTime: (new Date() - this.initializeTime) / 1e3,
            uZoomUnits:
                "m" === this.options.unit
                    ? this.normizedHeight(1, this.map.getCenter())
                    : zoomUnit,
            lineWidth: this.options.lineWidth * zoomUnit,
            uMatrix: matrix,
        });
        program.setUniforms(this.uniforms);

        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.drawElements(
            gl.TRIANGLE_STRIP,
            this.indexBuffer.numberOfIndices,
            this.indexBuffer.indexDatatype,
            0
        );
    }
}

export default class CircleLayer {
    constructor(options) {
        return ["wave", "bubble"].includes(options.type)
            ? new AnimateCircleLayer(options)
            : new SimpleCircleLayer(options);
    }
}
