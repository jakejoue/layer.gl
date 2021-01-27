import Layer from "./Layer";

import { IndexBuffer, VertexBuffer } from "../core/Buffer";
import VertexArrayObject from "../core/VertexArrayObject";
import Program from "../core/Program";
import TruncatedConeGeometry from "../geometies/TruncatedConeGeometry";

import { mat4 } from "gl-matrix";

/**
 * @classdesc
 * 
 * 动态圆柱体效果，继承自 Layer
 * 
 * @extends Layer
 * 
 * @param {Object} options
 * @param {String | Function=} [options.color='blue'] 颜色
 * @param {Number | Function=} [options.height=100] 圆柱高度
 * @param {Number | Function=} [options.topRadius=0.8] 顶部半径
 * @param {Number | Function=} [options.bottomRadius=8] 底部半径
 * @param {Number=} [options.duration=5] 动画效果周期
 */
class DynamicCylinderLayer extends Layer {
    constructor(options) {
        super(options);
        this.group = [];

        this.date = new Date();
        this.autoUpdate = true;
    }

    getDefaultOptions() {
        return {
            color: "rgba(25, 25, 250, 1)",
            duration: 5,
            height: 100,
            topRadius: 0.8,
            bottomRadius: 8,
        };
    }

    initialize(gl) {
        this.program = new Program(
            gl,
            {
                vertexShader: `
                attribute vec3 aPos;
                uniform mat4 uMatrix;
                uniform mat4 uObjMatrix;
                varying vec3 vPos;

                void main() {
                    gl_Position = uMatrix * uObjMatrix * vec4(aPos.xyz, 1.0);
                    vPos = aPos;
                }`,
                fragmentShader: `
                uniform vec4 glowColor;
                uniform float uPercent;
                varying vec3 vPos;

                void main() {
                    vec4 color = glowColor;
                    color.a *= 1.0 - pow(vPos.z, 0.5);

                    // 循环透明度效果
                    color.a *= clamp(sin(PI * uPercent), 0.1, 1.0);

                    gl_FragColor = color;
                }`,
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
                const topRadius = +this.getValue("topRadius", data);
                const bottomRadius = +this.getValue("bottomRadius", data);
                const height = +this.getValue("height", data);
                const color = this.normizedColor(this.getValue("color", data));

                const point = this.normizedPoint(coord);
                const _topRadius = this.normizedHeight(topRadius, coord);
                const _bottomRadius = this.normizedHeight(bottomRadius, coord);

                const _height = this.normizedHeight(height, coord);

                // 构建圆柱体
                const geometry = new TruncatedConeGeometry({
                    verticalAxis: "z",
                    translate: [0, 0, 0.5],
                    topRadius: _topRadius,
                    bottomRadius: _bottomRadius,
                    nradial: Math.floor(
                        Math.max(20, (topRadius + bottomRadius) / 2)
                    ),
                    nvertical: 20,
                });

                // obj mat4
                const m = mat4.create();
                mat4.translate(m, m, point);
                mat4.scale(m, m, [1, 1, _height]);

                // 存入多边形
                this.group.push({
                    indexData: geometry.indices.value,
                    bufferData: geometry.getAttribute("POSITION").value,
                    uniforms: {
                        uObjMatrix: m,
                        glowColor: color,
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

            this.program.setUniforms({
                uMatrix: matrix,
                uPercent: (time % duration) / duration,
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
}

export default DynamicCylinderLayer;
