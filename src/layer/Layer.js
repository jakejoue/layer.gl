import CommonLayer from "./CommonLayer";
import Buffer from "../core/Buffer";
import Color from "color";

export default class Layer extends CommonLayer {
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
        if (this.getOptions().enablePicked) {
            this.pickBuffer = new Buffer({
                gl: gl,
                target: "ARRAY_BUFFER",
                usage: "STATIC_DRAW",
            });
        }
    }

    // pick相关顶点属性
    getCommonAttributes() {
        const commonAttris = [];
        if (this.getOptions().enablePicked) {
            commonAttris.push({
                name: "aPickColor",
                buffer: this.pickBuffer,
                size: 3,
                type: "FLOAT",
                stride: 12,
                offset: 0,
            });
        }
        return commonAttris;
    }

    // pick相关顶点属性
    getCommonUniforms(transferOptions) {
        const isPickRender = transferOptions.isPickRender;
        const options = this.getOptions();
        let uniforms = {};

        if (options.enablePicked) {
            const pickedColor = options.autoSelect
                ? this.pickedColor
                : this.indexToRgb(options.selectedIndex || -1);

            uniforms = Object.assign(uniforms, {
                uSelectedColor: this.normizedColor(options.selectedColor),
                uEnablePicked: options.enablePicked,
                uPickedColor: pickedColor.map(function (a) {
                    return a / 255;
                }),
                uIsPickRender: !!isPickRender,
            });
        }
        return uniforms;
    }

    // todo
    pick(a, c) {
        const gl = this.gl;
        this.webglLayer.saveFramebuffer();
        this.webglLayer.bindFramebuffer(this.webglLayer.pickFBO);
        this.webglLayer.clear();
        this.render({
            gl: gl,
            isPickRender: true,
            matrix: this.webglLayer.matrix,
            projectionMatrix: this.webglLayer.projectionMatrix,
            viewMatrix: this.webglLayer.viewMatrix,
            orthoMatrix: this.webglLayer.orthoMatrix,
        });
        const d = new Uint8Array(4);
        gl.readPixels(
            a * window.devicePixelRatio,
            gl.canvas.height - c * window.devicePixelRatio,
            1,
            1,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            d
        );
        a = this.rgbToIndex(d);
        this.pickedColor = [d[0], d[1], d[2]];
        this.webglLayer.restoreFramebuffer();
        return {
            dataIndex: a,
            dataItem: this.data[a],
        };
    }

    setGLState(state) {
        this.webglLayer.stateManager.setState(state);
    }

    /* ************** 通用方法接口 ************** */

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
        return this.map.normizedPoint(point);
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
    rgbToIndex(colorArray) {
        return colorArray[0] + 256 * colorArray[1] + 65536 * colorArray[2] - 1;
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
