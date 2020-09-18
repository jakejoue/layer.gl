class View {
    constructor(options) {
        var self = this;

        this.options = {
            autoUpdate: false,
        };
        Object.assign(this.options, options);

        // 联合渲染对象（外部map）
        this.webglLayer = new Hf(options.map, this.options);

        // 图层管理器
        this.layerManager = new yj({
            autoUpdate: this.options.autoUpdate,
            webglLayer: this.webglLayer,
        });

        // 增强渲染器
        this.effectManager = new sf(this.webglLayer.gl);
        if (this.options.effects) {
            this.effectManager.setEffects([
                // 本地渲染
                {
                    render: function (a) {
                        self.renderCanvas(a);
                    },
                },
                ...this.options.effects,
            ]);
        }

        // 同步相关事件
        this.webglLayer.onRender(function (a) {
            self._render(a);
        });
        this.webglLayer.onClick = function (a) {
            self.layerManager.onClick(a);
        };
        this.webglLayer.onDblClick = function (a) {
            self.layerManager.onDblClick(a);
        };
        this.webglLayer.onRightClick = function (a) {
            self.layerManager.onRightClick(a);
        };
        this.webglLayer.onMousemove = function (a) {
            self.layerManager.onMousemove(a);
        };
        this.webglLayer.map.onResize(function () {
            self.effectManager.onResize();
        });
    }

    /**
     * @private
     * 渲染图层内容
     * @param {*} a
     */
    renderCanvas(a) {
        this.layerManager.renderThreeLayers(a);
        this.layerManager.renderThreeLayer(a);
        this.layerManager.renderGLLayers(a);
    }

    /**
     * 派发 webglLayer render 事件
     */
    render() {
        this.webglLayer.render();
    }

    /**
     * 渲染事件，包括增强器
     * @param {*} a
     */
    _render(a) {
        const effects = this.options.effects;
        if (effects && effects.length > 0) {
            this.effectManager.render();
        } else {
            this.webglLayer.saveFramebuffer();
            this.renderCanvas(a);
            this.webglLayer.restoreFramebuffer();
        }
    }

    onRender(a) {
        this.webglLayer.onRender(a);
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
