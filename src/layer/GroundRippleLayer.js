import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

export default class GroundRippleLayer extends Layer {
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
        this.gl = gl;
        this.program = new Program(
            this.gl,
            {
                shaderId: "ground_ripple",
            },
            this
        );

        this.indexBuffer = new Buffer({
            gl: gl,
            target: "ELEMENT_ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.buffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        const attributes = [
            {
                name: "aPos",
                buffer: this.buffer,
                size: 3,
                type: "FLOAT",
                offset: 0,
            },
        ];
        this.vertexArray = new VertexArray({
            gl: gl,
            program: this.program,
            attributes: attributes,
        });
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
                    indexData: new Uint16Array(indexData),
                    bufferData: new Float32Array(bufferData),
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

        if (!this.group.length) return;

        this.program.use(gl);

        const time = (new Date() - this.date) / 1e3,
            duration = this.options.duration;
        this.percent = (time % duration) / duration;

        this.program.setUniforms({
            u_matrix: matrix,
            u_percent: this.percent,
        });

        // blend
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
        gl.blendEquation(gl.FUNC_ADD);

        for (let i = 0; i < this.group.length; i++) {
            const obj = this.group[i];
            this.buffer.updateData(obj.bufferData);
            this.indexBuffer.updateData(obj.indexData);
            this.vertexArray.bind();

            this.program.setUniforms(obj.uniforms);

            gl.drawElements(
                gl.TRIANGLES,
                obj.indexData.length,
                gl.UNSIGNED_SHORT,
                0
            );
        }
    }

    // 获取当前effect的对象
    getEffectObjs() {
        return this.group.map((obj) => {
            const ripple = obj.uniforms.u_ripple;
            const radius = this.percent * ripple.radius;
            return Object.assign({}, ripple, { radius });
        });
    }
}
