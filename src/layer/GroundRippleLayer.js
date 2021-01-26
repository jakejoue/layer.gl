import Layer from "./Layer";

import { IndexBuffer, VertexBuffer } from "../core/Buffer";
import VertexArrayObject from "../core/VertexArrayObject";
import Program from "../core/Program";

class GroundRippleLayer extends Layer {
    constructor(options) {
        super(options);

        // 表示该图层是个effect图层
        this.effectType = "NUM_GROUND_RIPPLES";
        this.effectUniformName = "groundRipples";

        this.group = [];

        this.percent = 0;
        this.date = new Date();
        this.autoUpdate = true;
    }

    getDefaultOptions() {
        return {
            color: [0.1, 0.1, 0.9, 1],
            size: 1000,
            segs: 90,
            duration: 2,
            width: 400,
        };
    }

    initialize(gl) {
        this.program = new Program(
            gl,
            {
                shaderId: "ground_ripple",
            },
            this
        );

        this.vertexBuffer = new VertexBuffer({
            gl,
            dynamicDraw: true,
            attributes: [
                {
                    name: "aPos",
                    size: 3,
                },
            ],
        });
        this.indexBuffer = new IndexBuffer({
            gl,
            dynamicDraw: true,
        });
        this.vao = new VertexArrayObject();
    }

    onChanged(options, dataArray) {
        const gl = this.gl;
        this.group = [];

        if (gl) {
            for (let i = 0; i < dataArray.length; i++) {
                const data = dataArray[i];

                // 尺寸 和 颜色
                const segs = this.getValue("segs", data),
                    size = +this.getValue("size", data),
                    width = +this.getValue("width", data),
                    color = this.normizedColor(this.getValue("color", data));

                // 每份儿的角度
                const perSegAngle = 360 / segs;
                const bufferData = [],
                    indexData = [];

                const coord = this.normizedPoint(data.geometry.coordinates);
                // 内半径 和 环半径
                const _size = this.normizedHeight(
                    size,
                    data.geometry.coordinates
                );
                const _width = this.normizedHeight(
                    width,
                    data.geometry.coordinates
                );

                // 中心点
                bufferData.push(coord[0], coord[1], coord[2]);

                // 周边点
                for (
                    let v = 1, angle = 0;
                    v <= segs;
                    v++, angle += perSegAngle
                ) {
                    // point
                    const x =
                        Math.cos((Math.PI / 180) * angle) * (_size + _width);
                    const y =
                        Math.sin((Math.PI / 180) * angle) * (_size + _width);

                    bufferData.push(coord[0] + x, coord[1] + y, coord[2]);

                    // index
                    v === segs
                        ? indexData.push(0, 0 + v, 1)
                        : indexData.push(0, 0 + v, 0 + v + 1);
                }

                // 存入group
                this.group[i] = {
                    indexData,
                    bufferData,
                    uniforms: {
                        u_ripple: {
                            center: coord,
                            radius: _size,
                            width: _width,
                            color: color,
                        },
                    },
                };
            }
        }
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix;

        if (this.group.length === 0) return;

        const program = this.program;
        program.use(gl);

        // time uniforms
        const time = (new Date() - this.date) / 1e3,
            duration = this.options.duration;
        this.percent = (time % duration) / duration;
        program.setUniforms({
            u_matrix: matrix,
            u_percent: this.percent,
        });

        // blend
        gl.depthMask(false);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        for (let i = 0; i < this.group.length; i++) {
            const { indexData, bufferData, uniforms } = this.group[i];
            this.program.setUniforms(uniforms);

            this.indexBuffer.setData(indexData);
            this.vertexBuffer.setData(bufferData);

            this.vao.bind({
                gl,
                program,
                vertexBuffer: this.vertexBuffer,
                indexBuffer: this.indexBuffer,
            });

            gl.drawElements(
                gl.TRIANGLES,
                this.indexBuffer.numberOfIndices,
                this.indexBuffer.indexDatatype,
                0
            );
        }
    }

    // 获取当前effect的对象
    getEffectObjs(transform) {
        return this.group.map((obj) => {
            const ripple = obj.uniforms.u_ripple;
            const center = transform(ripple.center);

            return {
                ...ripple,
                center,
                percent: this.percent,
            };
        });
    }
}

export default GroundRippleLayer;
