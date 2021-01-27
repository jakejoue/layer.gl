import Layer from "./Layer";

import { IndexBuffer, VertexBuffer } from "../core/Buffer";
import VertexArrayObject from "../core/VertexArrayObject";
import Program from "../core/Program";
import CylinderGeometry from "../geometies/CylinderGeometry";

import { mat4 } from "gl-matrix";

/**
 * @classdesc
 *
 * 圆柱扩散效果，继承自 Layer，该图层支持作为后处理灯光效果影响 ShapeLayer
 * 
 * @extends Layer
 *
 * @param {Object} options
 * @param {String | Function=} [options.color='rgba(25, 25, 250, 1)'] 颜色
 * @param {Number | Function=} [options.height=5] 圆柱高度
 * @param {Number | Function=} [options.radius=50] 扩散效果的半径大小
 * @param {Number=} [options.duration=2] 扩散效果周期
 */
class CylinderSpreadLayer extends Layer {
    constructor(options) {
        super(options);
        this.group = [];

        // 表示该图层是个effect图层
        this.effectType = "NUM_CYLINDER_SPREADS";
        this.effectUniformName = "cylinderSpreads";

        this.percent = 0;
        this.date = new Date();
        this.autoUpdate = true;
    }

    getDefaultOptions() {
        return {
            color: "rgba(25, 25, 250, 1)",
            height: 5,
            duration: 2,
            radius: 50,
        };
    }

    initialize(gl) {
        this.program = new Program(
            gl,
            {
                shaderId: "cylinder_spread",
            },
            this
        );

        // 顶点相关数据
        this.vertexBuffer = new VertexBuffer({
            gl: gl,
            dynamicDraw: true,
            attributes: [
                {
                    name: "aPos",
                    size: 3,
                },
            ],
        });

        // 顶点索引
        this.indexBuffer = new IndexBuffer({
            gl: gl,
            dynamicDraw: true,
        });

        this.vao = new VertexArrayObject();
    }

    onChanged(options, dataArray) {
        this.group = [];

        if (this.gl) {
            for (let i = 0; i < dataArray.length; i++) {
                const data = dataArray[i];

                const coord = data.geometry.coordinates;
                const radius = +this.getValue("radius", data);
                const height = +this.getValue("height", data);
                const color = this.normizedColor(this.getValue("color", data));

                const point = this.normizedPoint(coord);
                const scale = this.normizedHeight(radius, coord);
                const _height = this.normizedHeight(height, coord);

                // 构建半圆球
                const geometry = new CylinderGeometry({
                    translate: [0, 0, 0.5],
                    verticalAxis: "z",
                    nradial: Math.floor(Math.max(20, radius)),
                });

                // obj mat4
                const m = mat4.create();
                mat4.translate(m, m, point);
                mat4.scale(m, m, [scale, scale, _height]);

                // 存入多边形
                this.group.push({
                    indexData: geometry.indices.value,
                    bufferData: geometry.getAttribute("POSITION").value,
                    uniforms: {
                        uObjMatrix: m,
                        glowColor: color,
                    },
                    effectUniforms: {
                        center: point,
                        radius: scale,
                        height: _height,
                        color,
                    },
                });
            }
        }
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix;

        if (this.group.length === 0) return;

        this.program.use(gl);

        for (let i = 0; i < this.group.length; i++) {
            // 绑定顶点数据
            const { indexData, bufferData, uniforms } = this.group[i];

            this.vertexBuffer.setData(bufferData);
            this.indexBuffer.setData(indexData);

            this.vao.bind({
                gl,
                program: this.program,
                vertexBuffer: this.vertexBuffer,
                indexBuffer: this.indexBuffer,
            });

            // time uniforms
            const time = (new Date() - this.date) / 1e3,
                duration = this.options.duration;
            this.percent = (time % duration) / duration;

            this.program.setUniforms({
                uMatrix: matrix,
                uPercent: this.percent,
                ...uniforms,
            });

            gl.depthMask(false);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

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
            const effObj = obj.effectUniforms;
            const center = transform(effObj.center);

            return {
                ...effObj,
                center,
                percent: this.percent,
            };
        });
    }
}

export default CylinderSpreadLayer;
