export default class LayerManager {
    constructor(options) {
        this.layers = [];
        this.options = options;
        this.webglLayer = options.webglLayer;
    }

    addLayer(layer) {
        let flag = false;
        for (let i = 0; i < this.layers.length; i++) {
            if (this.layers[i] === layer) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            layer.map = this.webglLayer.map;
            if ("threeLayer" === layer.layerType) {
                layer.setWebglLayer(this.webglLayer);
                layer = layer.getThreeLayer();
                this.addLayer(layer);
                layer.initialize && layer.initialize(flag);
            } else {
                layer.setWebglLayer(this.webglLayer);
                layer.commonInitialize &&
                    layer.commonInitialize(this.webglLayer.gl);
                layer.initialize && layer.initialize(this.webglLayer.gl);
                layer.onOptionsChanged(layer.getOptions(), {});
                layer.onDataChanged(layer.getData());
                layer.onChanged(layer.getOptions(), layer.getData());
            }
            this.layers.push(layer);

            // 开启或者停止动画
            if (this.options.autoUpdate) {
                this.isRequestAnimation()
                    ? this.webglLayer.startAnimation()
                    : this.webglLayer.stopAnimation();
            }
        }

        this.webglLayer.render();
    }

    removeLayer(layer) {
        for (let i = 0; i < this.layers.length; i++) {
            if (this.layers[i] === layer) {
                layer.destroy && layer.destroy();
                this.layers.splice(i, 1);
            }
        }
        // 开启或者停止动画
        if (this.options.autoUpdate) {
            this.isRequestAnimation()
                ? this.webglLayer.startAnimation()
                : this.webglLayer.stopAnimation();
        }
        this.webglLayer.render();
    }

    removeAllLayers() {
        for (let i = 0; i < this.layers.length; i++) {
            const layer = this.layers[i];
            layer.destroy && layer.destroy();
            this.layers.splice(i, 1);
        }
        this.webglLayer.render();
    }

    getAllLayers() {
        return this.layers;
    }

    getAllThreeLayers() {
        const threeLayers = [];
        for (let i = 0; i < this.layers.length; i++) {
            const layer = this.layers[i];
            "ThreeLayer" === layer.layerType && threeLayers.push(layer);
        }
        return threeLayers;
    }

    isRequestAnimation() {
        let flag = false;
        for (let i = 0; i < this.layers.length; i++) {
            if (this.layers[i].isRequestAnimation()) {
                flag = true;
                break;
            }
        }
        return flag;
    }

    beforeRender(transferOptions) {
        transferOptions.gl && this.webglLayer.stateManager.save();
    }

    afterRender(transferOptions) {
        transferOptions.gl && this.webglLayer.stateManager.restore();
    }

    renderGLLayers(transferOptions) {
        this.webglLayer.stateManager.save();
        this.webglLayer.stateManager.setDefaultState();

        const gl = transferOptions.gl;
        for (let i = 0; i < this.layers.length; i++) {
            const layer = this.layers[i];
            if (
                "threeLayer" !== layer.layerType &&
                "ThreeLayer" !== layer.layerType
            ) {
                this.beforeRender(transferOptions);
                gl.enable(gl.DEPTH_TEST);
                gl.depthFunc(gl.LEQUAL);
                gl.enable(gl.POLYGON_OFFSET_FILL);
                gl.polygonOffset(1, 1);
                layer.render(transferOptions);
                this.afterRender(transferOptions);
            }
        }

        this.webglLayer.stateManager.restore();
    }

    renderThreeLayer(transferOptions) {
        for (let i = 0; i < this.layers.length; i++) {
            const layer = this.layers[i];
            "ThreeLayer" === layer.layerType && layer.render(transferOptions);
        }
    }

    renderThreeLayers(transferOptions) {
        for (let i = 0; i < this.layers.length; i++) {
            const layer = this.layers[i];
            if ("threeLayer" === layer.layerType) {
                this.beforeRender(transferOptions);
                layer.render(transferOptions);
                this.afterRender(transferOptions);
            }
        }
    }

    onClick(a) {
        // for (var b = 0; b < this.layers.length; b++) {
        //     var c = this.layers[b];
        //     if (
        //         "threeLayer" !== c.layerType &&
        //         "ThreeLayer" !== c.layerType &&
        //         c.options.enablePicked &&
        //         c.options.onClick &&
        //         c.pick
        //     ) {
        //         var e = c.pick(a.x, a.y);
        //         c.options.onClick(e, a);
        //     }
        // }
    }

    onDblClick(a) {
        // for (var b = 0; b < this.layers.length; b++) {
        //     var c = this.layers[b];
        //     if (
        //         "threeLayer" !== c.layerType &&
        //         "ThreeLayer" !== c.layerType &&
        //         c.options.enablePicked &&
        //         c.options.onDblClick &&
        //         c.pick
        //     ) {
        //         var e = c.pick(a.x, a.y);
        //         c.options.onDblClick(e, a);
        //     }
        // }
    }

    onRightClick(a) {
        // for (var b = 0; b < this.layers.length; b++) {
        //     var c = this.layers[b];
        //     if (
        //         "threeLayer" !== c.layerType &&
        //         "ThreeLayer" !== c.layerType &&
        //         c.options.enablePicked &&
        //         c.options.onRightClick &&
        //         c.pick
        //     ) {
        //         var e = c.pick(a.x, a.y);
        //         c.options.onRightClick(e, a);
        //     }
        // }
    }

    onMousemove(a) {
        // for (var b = false, c = 0; c < this.layers.length; c++) {
        //     var e = this.layers[c];
        //     if (
        //         "threeLayer" !== e.layerType &&
        //         "ThreeLayer" !== e.layerType &&
        //         e.options.enablePicked &&
        //         e.pick
        //     ) {
        //         var g = e.pick(a.x, a.y);
        //         this.webglLayer.map.map.platform.style.cursor =
        //             -1 === g.dataIndex ? "default" : "pointer";
        //         if (e.options.onMousemove) e.options.onMousemove(g, a);
        //         e.options.autoSelect && (b = true);
        //     }
        // }
        // b && (this.webglLayer.isAnimation || this.webglLayer.render());
    }
}
