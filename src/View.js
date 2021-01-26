import WebglLayer from "./WebglLayer";
import LayerManager from "./LayerManager";
import EffectManager from "./core/EffectManager";

/**
 * @classdesc
 * View是用于生成和map同步的cavans对象类，它是所有的图层增减的入口
 *
 * @param {Object} options
 * @param {Object} options.map 同步用的地图对象
 * @param {Boolean=} [options.autoUpdate=true] 是否开启自动更新
 * @param {Array=} options.effects 后处理特效
 *
 * @example
 * var view = new layergl.View({
 *     map: layergl.map.getMapBoxGLMap(map),
 *     autoUpdate: true,
 *     effects: [new layergl.BloomEffect()]
 * });
 */
class View {
    constructor(options) {
        const self = this;

        this.options = {
            autoUpdate: true,
            ...options,
        };

        // 联合渲染对象（外部map）
        this.webglLayer = new WebglLayer(options.map, this.options);
        this.effectManager = new EffectManager(this.webglLayer.gl);

        // 图层管理器
        this.layerManager = new LayerManager({
            autoUpdate: this.options.autoUpdate,
            webglLayer: this.webglLayer,
        });

        this.webglRender = {
            render: function () {},
        };

        if (this.options.effects) {
            this.effectManager.setEffects(
                [this.webglRender].concat(this.options.effects)
            );
        }
        // effect resize
        this.webglLayer.map.onResize(function () {
            self.effectManager.onResize();
        });

        // 同步相关事件
        this.webglLayer.onRender(function (evt) {
            self._render(evt);
        });
        this.webglLayer.onClick = function (evt) {
            self.layerManager.onClick(evt);
        };
        this.webglLayer.onDblClick = function (evt) {
            self.layerManager.onDblClick(evt);
        };
        this.webglLayer.onRightClick = function (evt) {
            self.layerManager.onRightClick(evt);
        };
        this.webglLayer.onMousemove = function (evt) {
            self.layerManager.onMousemove(evt);
        };
    }

    /**
     * 渲染图层内容
     * @private
     * @param {*} transferOptions
     */
    renderCanvas(transferOptions) {
        this.layerManager.renderThreeLayers(transferOptions);
        this.layerManager.renderThreeLayer(transferOptions);
        this.layerManager.renderGLLayers(transferOptions);
    }

    /**
     * 主动调用的 render 接口
     */
    render() {
        this.webglLayer.render();
    }

    /**
     * 渲染事件，包括增强器
     * @private
     * @param {Object} transferOptions
     */
    _render(transferOptions) {
        const self = this,
            effects = this.options.effects;

        if (effects && effects.length > 0) {
            this.webglRender.render = function () {
                self.renderCanvas(transferOptions);
            };
            this.effectManager.render();
        } else {
            this.webglLayer.saveFramebuffer();
            this.renderCanvas(transferOptions);
            this.webglLayer.restoreFramebuffer();
        }
    }

    /**
     * 自定义渲染后事件
     * @param {Function} func
     */
    onRender(func) {
        this.webglLayer.onRender(func);
    }

    /**
     * 销毁 view 对象
     */
    destroy() {
        this.stopAnimation();
        this.layerManager.removeAllLayers();
        this.webglLayer.destroy();
    }

    /**
     * 当前是否开启了动画模式
     * @returns {Boolean}
     */
    isRequestAnimation() {
        return this.layerManager.isRequestAnimation();
    }

    /**
     * 开启动画模式
     */
    startAnimation() {
        this.webglLayer.startAnimation();
    }

    /**
     * 关闭动画模式
     */
    stopAnimation() {
        this.webglLayer.stopAnimation();
    }

    /**
     * 添加图层
     * @param {CommonLayer} layer
     */
    addLayer(layer) {
        this.layerManager.addLayer(layer);
    }

    /**
     * 移除图层
     * @param {CommonLayer} layer
     */
    removeLayer(layer) {
        this.layerManager.removeLayer(layer);
    }

    /**
     * 获取所有图层
     * @returns {Array.<CommonLayer>}
     */
    getAllLayers() {
        return this.layerManager.getAllLayers();
    }

    /**
     * 获取所有使用Threejs实现的图层
     * @returns {Array.<ThreeLayer>}
     */
    getAllThreeLayers() {
        return this.layerManager.getAllThreeLayers();
    }
}

export default View;
