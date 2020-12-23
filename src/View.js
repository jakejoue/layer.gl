import WebglLayer from "./WebglLayer";
import LayerManager from "./LayerManager";
import EffectManager from "./core/EffectManager";

export default class View {
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
            this.effectManager.setEffects([this.webglRender].concat(this.options.effects));
        }

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
     * @private
     * 渲染图层内容
     * @param {*} transferOptions
     */
    renderCanvas(transferOptions) {
        this.layerManager.renderThreeLayers(transferOptions);
        this.layerManager.renderThreeLayer(transferOptions);
        this.layerManager.renderGLLayers(transferOptions);
    }

    /**
     * 派发 webglLayer render 事件
     */
    render() {
        this.webglLayer.render();
    }

    /**
     * 渲染事件，包括增强器
     * @param {*} transferOptions
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

    onRender(func) {
        this.webglLayer.onRender(func);
    }

    destroy() {
        this.stopAnimation();
        this.layerManager.removeAllLayers();
        this.webglLayer.destroy();
    }

    isRequestAnimation() {
        return this.layerManager.isRequestAnimation();
    }

    startAnimation() {
        this.webglLayer.startAnimation();
    }

    stopAnimation() {
        this.webglLayer.stopAnimation();
    }

    addLayer(layer) {
        this.layerManager.addLayer(layer);
    }

    removeLayer(layer) {
        this.layerManager.removeLayer(layer);
    }

    getAllLayers() {
        return this.layerManager.getAllLayers();
    }

    getAllThreeLayers() {
        return this.layerManager.getAllThreeLayers();
    }
}
