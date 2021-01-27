import Layer from "./Layer";

import { IndexBuffer, VertexBuffer } from "../core/Buffer";
import VertexArrayObject from "../core/VertexArrayObject";
import Program from "../core/Program";

import LineMgr from "../data_mgr/LineMgr";
import { road, arrow } from "../helper/cavans";

const LineStyles = {
    normal: null,
    road: road,
    arrow: arrow,
};

/**
 * @classdesc
 * 
 * WebGL 默认绘制线的模式 gl.LINES 只能画一像素的线，无法指定线的宽度，该图层用来展示可指定宽度的线图层，继承自 Layer。
 * 如果只需要绘制简单的一像素的线，可以使用 SimpleLineLayer。
 * 该图层可使用鼠标拾取 Pick。
 * 
 * @extends Layer
 * 
 * @param {Object} options
 * @param {String=} [options.style='normal']
 * 解释：设置该参数，可以在线上叠加一些图形来适用于一些场景。注意，该属性只在初始化时读取一次，实例化后不可通过setOptions方法来重置 </br>
 * 可选值： </br>
 * road，叠加路况箭头，可用于道路场景的展示 </br>
 * arrow，叠加尖箭头图形，可用于OD场景的展示 </br>
 * @param {Object=} [options.styleOptions={}] 控制贴图的样式，对象具有color和width属性
 * @param {String=} [options.color='rgba(25, 25, 250, 1)'] 颜色
 * @param {String=} [options.blend='normal'] 线叠加模式，可选lighter
 * @param {String=} [options.lineJoin='miter'] 线的连接拐角，可选 `miter` 尖角、`bevel` 平角、`round` 圆角
 * @param {String=} [options.lineCap='butt'] 线的端头，可选 `butt` 平头、`square` 方头、`round` 圆头
 * @param {Number=} [options.width=4] 线的宽度
 * @param {Number=} [options.offset=0] 沿法线方向的偏移，几乎很少使用到，设置该属性后只能用 `butt`端头和 `miter`连接，不然会出现问题
 * @param {Boolean=} [options.antialias=false] 抗锯齿，默认关闭为 `false`
 * @param {Array.<Number>=} [options.dashArray=[0, 0]] 定义虚线间隔的数组，数组长度为2。数组的两位分别表示实线和虚线的长度，单位像素，如[10, 20]表示实线10px，虚线20px
 * @param {Number=} [options.dashOffset=0] 虚线偏移量，单位像素，可以通过实时改变该值来实现动画
 * @param {Boolean=} [options.animation=false] 设置该参数来实现蝌蚪线动画，下面的属性生效依赖该值为 true。注意，该属性只在初始化时读取一次，实例化后不可通过setOptions方法来重置
 * @param {Number=} [options.interval=0.1] 该参数指定每条线段的长度，值为粒子长度占数据中最长的线整体长度的比例
 * @param {Number=} [options.duration=2] 动画的循环时间，单位为秒
 * @param {Number=} [options.trailLength=0.5] 拖尾长度占间隔的比例
 * @param {Number=} [options.minZoom=4] 地图视野大于等于一定级别时开启动画
 * @param {Number=} [options.maxZoom=21] 地图视野小于等于一定级别时开启动画
 */
class LineLayer extends Layer {
    constructor(options) {
        super(options);
    }

    getDefaultOptions() {
        return {
            style: "normal",
            styleOptions: {},
            color: "rgba(25, 25, 250, 1)",
            blend: "normal",
            lineJoin: "miter",
            lineCap: "butt",
            width: 4,
            offset: 0,
            antialias: false,
            dashArray: [0, 0],
            dashOffset: 0,
            animation: false,
            interval: 0.1,
            duration: 2,
            trailLength: 0.5,
            minZoom: 4,
            maxZoom: 21,
        };
    }

    initialize(gl) {
        const options = this.getOptions(),
            defines = [];

        // pick
        if (options.enablePicked) {
            defines.push("PICK");
        }

        // texture
        if (LineStyles[options.style]) {
            this.isUseTexture = true;
            defines.push("USE_TEXTURE");

            const texture = LineStyles[options.style](options.styleOptions);
            this.setOptions({ texture: texture });
            this.loadTexture();
        }

        // animate
        if (options.animation === true) {
            this.isAnimateLine = true;
            this.date = new Date();
            this.autoUpdate = true;
            defines.push("USE_LINE_ANIMATION");
        }

        this.program = new Program(
            gl,
            {
                shaderId: "line",
                defines: defines,
            },
            this
        );

        this.vao = new VertexArrayObject();
    }

    onChanged(options, data) {
        const self = this;
        if (this.gl) {
            let dashArray = options.dashArray;
            dashArray =
                !!this.isUseTexture || !!dashArray[1] || !!this.isAnimateLine;

            const dataMgr = new LineMgr({
                    dash: dashArray,
                    cap: options.lineCap,
                    join: options.lineJoin,
                    miterLimit: options.miterLimit,
                    thickness: options.width,
                }),
                pickColors = [];

            for (let i = 0; i < data.length; i++) {
                let coords = data[i].geometry.coordinates;
                if (coords && 0 < coords.length) {
                    if (
                        "Polygon" !== data[i].geometry.type &&
                        "MultiLineString" !== data[i].geometry.type
                    ) {
                        coords = [coords];
                    }
                    coords = coords.map((a) =>
                        a.map((point) => this.normizedPoint(point))
                    );
                }

                // 起点位置
                const preStartIndex = dataMgr.complex.startIndex;

                const color = this.normizedColor(
                    this.getValue("color", data[i])
                );
                coords = this.addMultipleCoords(coords);
                for (let j = 0; j < coords.length; j++) {
                    coords[j].forEach(function (line) {
                        dataMgr.extrude(line, color);
                    });
                }

                // pick
                if (options.enablePicked) {
                    const pColor = self.indexToRgb(i);
                    for (
                        let j = preStartIndex;
                        j < dataMgr.complex.startIndex;
                        j++
                    ) {
                        pickColors.push(
                            pColor[0] / 255,
                            pColor[1] / 255,
                            pColor[2] / 255
                        );
                        if (options.repeat) {
                            pickColors.push(
                                pColor[0] / 255,
                                pColor[1] / 255,
                                pColor[2] / 255
                            );
                            pickColors.push(
                                pColor[0] / 255,
                                pColor[1] / 255,
                                pColor[2] / 255
                            );
                        }
                    }
                }
            }

            const complexData = dataMgr.complex;
            if (dashArray) {
                for (let p = 0; p < complexData.positions.length / 6; p++) {
                    complexData.positions[6 * p + 5] = complexData.maxDistance;
                }
            }

            this.updateBuffer(complexData, pickColors);
        }
    }

    updateBuffer(complexData, pickColors) {
        const gl = this.gl;

        const { positions, normals, colors, uvs, indices } = complexData;

        this.vertexBuffers = [
            // positions
            new VertexBuffer({
                gl: gl,
                data: positions,
                attributes: [
                    {
                        name: "a_position",
                        size: 3,
                    },
                    {
                        name: "a_distance",
                        size: 1,
                    },
                    {
                        name: "a_width",
                        size: 1,
                    },
                    {
                        name: "a_total_distance",
                        size: 1,
                    },
                ],
            }),
            // normals
            new VertexBuffer({
                gl: gl,
                data: normals,
                attributes: [
                    {
                        name: "a_normal",
                        size: 3,
                    },
                ],
            }),
            // colors
            new VertexBuffer({
                gl: gl,
                data: colors,
                attributes: [
                    {
                        name: "a_color",
                        size: 4,
                    },
                ],
            }),
            // pick
            ...this.getCommonBuffers({ pickData: pickColors }),
        ];

        // uva
        if (this.isUseTexture) {
            this.vertexBuffers.push(
                new VertexBuffer({
                    gl: gl,
                    data: uvs,
                    attributes: [
                        {
                            name: "uv",
                            size: 2,
                        },
                    ],
                })
            );
        }

        this.indexBuffer = new IndexBuffer({
            gl: gl,
            data: indices,
        });
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix;

        if (this.indexBuffer.numberOfIndices === 0) return;

        const options = this.getOptions(),
            program = this.program;

        program.use(gl);

        let uniforms = Object.assign(this.getCommonUniforms(transferOptions), {
            u_matrix: matrix,
            u_zoom_units: this.map.getZoomUnits(),
            u_dash_array: options.dashArray,
            u_dash_offset: options.dashOffset,
            u_antialias: options.antialias,
            u_offset: options.offset,
        });

        // 纹理模式
        if (this.isUseTexture) {
            uniforms = Object.assign(uniforms, {
                u_texture_width: options.width,
                u_texture_margin: 140,
                u_sampler: this.texture,
            });
        }

        // 动画模式
        if (this.isAnimateLine) {
            const zoom = this.map.getZoom();
            uniforms = Object.assign(uniforms, {
                u_time: (new Date() - this.date) / 1e3,
                u_animate:
                    zoom >= options.minZoom &&
                    zoom <= options.maxZoom &&
                    this.autoUpdate
                        ? true
                        : false,
                u_duration: options.duration,
                u_interval: options.interval,
                u_trail_length: options.trailLength,
            });
        }
        program.setUniforms(uniforms);

        // 混合模式
        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        if (options.blend && "lighter" === options.blend) {
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        } else {
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        }

        // 绑定顶点并绘制
        this.vao.bind({
            gl,
            program,
            vertexBuffers: this.vertexBuffers,
            indexBuffer: this.indexBuffer,
        });

        gl.drawElements(
            gl.TRIANGLES,
            this.indexBuffer.numberOfIndices,
            this.indexBuffer.indexDatatype,
            0
        );
    }

    loadTexture(callback) {
        const options = this.getOptions();
        options.texture
            ? this.gl.textureManager.load(options.texture, (texture) => {
                  this.texture = texture;
                  callback && callback();
                  this.webglLayer.render();
              })
            : ((this.texture = null), callback && callback());
    }
}

export default LineLayer;
