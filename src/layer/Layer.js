import CommonLayer from "./CommonLayer";
import { VertexBuffer } from "../core/Buffer";
import Color from "color";

import { translateTransferOptions } from "../helper/offset";

/**
 * @classdesc
 *
 * 自定义图层基类，继承自 CommonLayer </br>
 * 实现了一些图层功能实现需要的公用接口和方法，包括pick功能，颜色转换，坐标转换等 <br/>
 * 具体是否支持相关功能要看继承的图层是否实现了相关参数的初始化 <br/>
 *
 * @extends CommonLayer
 *
 * @param {Object} options
 * @param {Boolean=} [options.repeat=false] 是否添加重复的坐标，为了实现小缩放下连续的地图效果
 * @param {Boolean=} [options.enablePicked=false] 是否开启拾取
 * @param {Boolean=} [options.autoSelect=false] 是否开启自动拾取
 * @param {Number=} [options.selectedIndex=-1] 当前选中元素的索引
 * @param {String=} [options.selectedColor='rgba(20, 20, 200, 1.0)'] 选中后的颜色
 * @param {Function=} options.onClick 点击事件回调函数，需要开启 enablePicked
 * @param {Function=} options.onMousemove 鼠标移动事件回调函数，需要开启 enablePicked
 */
class Layer extends CommonLayer {
    constructor(options) {
        super(options);
        this.pickedColor = [-1, -1, -1];
    }

    // 获取通用的配置（pick相关）
    getCommonDefaultOptions() {
        return {
            repeat: false,
            enablePicked: false,
            autoSelect: false,
            selectedIndex: -1,
            selectedColor: "rgba(20, 20, 200, 1.0)",
        };
    }

    // 通用初始化
    commonInitialize(gl) {
        this.gl = gl;
    }

    // 公共buffer
    getCommonBuffers(options) {
        const commonBuffers = [];

        // 初始化pick相关信息
        if (this.getOptions().enablePicked) {
            commonBuffers.push(
                new VertexBuffer({
                    gl: this.gl,
                    data: options.pickData,
                    attributes: [{ name: "aPickColor", size: 3 }],
                })
            );
        }

        return commonBuffers;
    }

    // pick相关顶点属性
    getCommonUniforms(transferOptions) {
        const isPickRender = transferOptions.isPickRender;
        const options = this.getOptions();
        let uniforms = {};

        if (options.enablePicked) {
            const pickedColor = options.autoSelect
                ? this.pickedColor
                : this.indexToRgb(
                      options.selectedIndex >= 0 ? options.selectedIndex : -1
                  );

            uniforms = Object.assign(uniforms, {
                uEnablePicked: options.enablePicked,
                uIsPickRender: !!isPickRender,
                uPickedColor: pickedColor.map(function (a) {
                    return a / 255;
                }),
                uSelectedColor: this.normizedColor(options.selectedColor),
            });
        }
        return uniforms;
    }

    // pick接口
    pick(x, y) {
        const gl = this.gl;
        this.webglLayer.saveFramebuffer();
        this.webglLayer.bindFramebuffer(this.webglLayer.pickFBO);
        this.webglLayer.clear();

        // 选择渲染
        this.render(
            Object.assign(
                { isPickRender: true },
                translateTransferOptions(this.webglLayer.transferOptions, this)
            )
        );
        // 颜色
        const color = new Uint8Array(4);
        // 读取指定区域颜色
        gl.readPixels(
            x * window.devicePixelRatio,
            gl.canvas.height - y * window.devicePixelRatio,
            1,
            1,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            color
        );

        // 颜色转为索引
        const index = this.rgbToIndex(color);
        this.pickedColor = [color[0], color[1], color[2]];
        this.webglLayer.restoreFramebuffer();
        return {
            dataIndex: index,
            dataItem: this.getData()[index],
        };
    }

    setGLState(state) {
        this.webglLayer.stateManager.setState(state);
    }

    getPointOffset() {
        if (!this.pointOffset) {
            // 如果参数中存在 pointOffset
            if (this.options.pointOffset) {
                this.pointOffset = this.map.normizedPoint(
                    this.options.pointOffset
                );
            }
            // 否则尝试从data中获取
            else if (this.data && this.data.length) {
                // 取靠近中心的数据
                let coords = this.data[
                    Math.max(0, Math.floor(this.data.length / 2))
                ].geometry.coordinates;

                while (Array.isArray(coords)) {
                    if (Array.isArray(coords[0])) {
                        coords = coords[0];
                    } else {
                        break;
                    }
                }
                this.pointOffset = this.map.normizedPoint(coords);
            }
        }
        if (this.pointOffset) {
            this.pointOffset[2] = 0;
            return this.pointOffset.slice();
        } else {
            return [0, 0, 0];
        }
    }

    /* ************** 通用方法接口 ************** */
    // 获取对象的方法
    getValue(key, data = {}) {
        const v = this.options[key];

        // 外部方法
        if (typeof v === "function") {
            return v(data);
        }

        return v;
    }

    // 格式化color方法
    normizedColor(color) {
        const colorArray = Array.isArray(color)
            ? color
            : Color(color).unitArray();

        if (colorArray[3] === undefined) {
            colorArray[3] = 1;
        }
        return colorArray;
    }

    normizedPoint(point) {
        if (!point || isNaN(+point[0]) || isNaN(+point[1])) return [0, 0, 0];
        const pointOffset = this.getPointOffset();
        const nPoint = this.map.normizedPoint(point);
        return [
            nPoint[0] - pointOffset[0],
            nPoint[1] - pointOffset[1],
            nPoint[2],
        ];
    }

    normizedHeight(height, point = [0, 0]) {
        if (!height || height <= 0) return 0;
        return this.map.normizedPoint([point[0], point[1], height])[2];
    }

    // 根据index生成color
    indexToRgb(index) {
        index++;
        const b = Math.floor(index / 65536);
        index -= 65536 * b;
        const c = Math.floor(index / 256);
        return [index - 256 * c, c, b];
    }

    // 根据color获取index
    rgbToIndex(rgb) {
        return rgb[0] + 256 * rgb[1] + 65536 * rgb[2] - 1;
    }

    // repeat模式添加相关点
    addMultipleCoords(data) {
        if (!this.options.repeat || !this.map || !this.map.worldSize)
            return [data];

        const worldSize = this.map.worldSize();

        const getRepeat = function (point) {
            return [
                [point[0] - worldSize, point[1], point[2] || 0],
                [point[0] + worldSize, point[1], point[2] || 0],
            ];
        };
        if (Array.isArray(data) && !Array.isArray(data[0])) {
            const points = getRepeat(data);
            return [data, points[0], points[1]];
        } else {
            const preData = [],
                afterData = [];
            for (let i = 0; i < data.length; i++) {
                const points = getRepeat(data[i]);
                preData.push(points[0]);
                afterData.push(points[1]);
            }
            return [data, preData, afterData];
        }
    }
}

export default Layer;
