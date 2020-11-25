import Layer from "./Layer";

import { VertexBuffer } from "../core/Buffer";
import VertexArrayObject from "../core/VertexArrayObject";
import Program from "../core/Program";

const PointShapeTypes = {
    circle: 1,
    square: 2,
};

export default class PointLayer extends Layer {
    constructor(options) {
        super(options);
    }

    getDefaultOptions() {
        return {
            color: "rgba(25, 25, 250, 1)",
            blend: "normal",
            shape: "circle",
            size: 5,
        };
    }

    initialize(gl) {
        // 构造program
        this.program = new Program(
            gl,
            {
                shaderId: "point",
                defines: this.getOptions().enablePicked ? ["PICK"] : [],
            },
            this
        );

        // 顶点相关数据
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

    onChanged(options, dataArray) {
        if (this.gl) {
            const arrayData = [];

            for (let i = 0; i < dataArray.length; i++) {
                const data = dataArray[i];
                const point = this.normizedPoint(data.geometry.coordinates);

                let color = this.getValue("color", data);
                color = this.normizedColor(color);
                const size = +this.getValue("size", data);

                const points = this.addMultipleCoords(point);
                for (let j = 0; j < points.length; j++) {
                    const p = points[j];
                    arrayData.push(p[0], p[1], +(p[2] || 0));
                    arrayData.push(color[0], color[1], color[2], color[3]);
                    arrayData.push(size * window.devicePixelRatio);
                }
            }

            this.vertexBuffer.setData(arrayData);
            this.vertexBuffers = this.getCommonBuffers({
                pickData: this.parsePickData(dataArray),
            });
        }
    }

    parsePickData(arrayData) {
        const options = this.getOptions(),
            dataArray = [];

        if (options.enablePicked) {
            for (let i = 0; i < arrayData.length; i++) {
                const k = this.indexToRgb(i);
                dataArray.push(k[0] / 255, k[1] / 255, k[2] / 255);

                if (options.repeat) {
                    dataArray.push(k[0] / 255, k[1] / 255, k[2] / 255);
                    dataArray.push(k[0] / 255, k[1] / 255, k[2] / 255);
                }
            }
        }
        return dataArray;
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix,
            isPickRender = transferOptions.isPickRender;

        if (this.vertexBuffer.numberOfVertices === 0) return;

        this.program.use(gl);

        this.vao.bind({
            gl,
            program: this.program,
            vertexBuffer: this.vertexBuffer,
            vertexBuffers: this.vertexBuffers,
        });

        const uniforms = Object.assign(
            this.getCommonUniforms(transferOptions),
            {
                uShape: PointShapeTypes[this.options.shape] || 1,
                uMatrix: matrix,
            }
        );
        this.program.setUniforms(uniforms);

        if (isPickRender) {
            gl.disable(gl.BLEND);
        } else {
            gl.enable(gl.BLEND);
            gl.blendEquation(gl.FUNC_ADD);

            const blend = this.options.blend;
            if (blend && "lighter" === blend) {
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            } else {
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            }
        }

        gl.drawArrays(gl.POINTS, 0, this.vertexBuffer.numberOfVertices);
    }
}
