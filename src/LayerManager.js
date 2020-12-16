import { translateTransferOptions } from "./helper/offset";

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
                const threeLayer = layer.getThreeLayer();
                this.addLayer(threeLayer);
                layer.initialize && layer.initialize(threeLayer);
            } else {
                layer.setWebglLayer(this.webglLayer);
                layer.commonInitialize && layer.commonInitialize(this.webglLayer.gl);
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
                layer.render(translateTransferOptions(transferOptions, layer));
                this.afterRender(transferOptions);
            }
        }

        gl.unbindVAO();
        this.webglLayer.stateManager.restore();
    }

    renderThreeLayer(transferOptions) {
        for (let i = 0; i < this.layers.length; i++) {
            const layer = this.layers[i];
            if ("ThreeLayer" === layer.layerType) {
                layer.render(transferOptions);
            }
        }
    }

    renderThreeLayers(transferOptions) {
        for (let i = 0; i < this.layers.length; i++) {
            const layer = this.layers[i];
            if ("threeLayer" === layer.layerType) {
                this.beforeRender(transferOptions);
                layer.render(transferOptions, layer);
                this.afterRender(transferOptions);
            }
        }
    }

    onClick(point) {
        for (let i = 0; i < this.layers.length; i++) {
            const layer = this.layers[i];
            if (
                "threeLayer" !== layer.layerType &&
                "ThreeLayer" !== layer.layerType &&
                layer.options.enablePicked &&
                layer.options.onClick &&
                layer.pick
            ) {
                const result = layer.pick(point.x, point.y);
                layer.options.onClick(result, point);
            }
        }
    }

    onDblClick(point) {
        for (let i = 0; i < this.layers.length; i++) {
            const layer = this.layers[i];
            if (
                "threeLayer" !== layer.layerType &&
                "ThreeLayer" !== layer.layerType &&
                layer.options.enablePicked &&
                layer.options.onDblClick &&
                layer.pick
            ) {
                const result = layer.pick(point.x, point.y);
                layer.options.onDblClick(result, point);
            }
        }
    }

    onRightClick(point) {
        for (let i = 0; i < this.layers.length; i++) {
            const layer = this.layers[i];
            if (
                "threeLayer" !== layer.layerType &&
                "ThreeLayer" !== layer.layerType &&
                layer.options.enablePicked &&
                layer.options.onRightClick &&
                layer.pick
            ) {
                const result = layer.pick(point.x, point.y);
                layer.options.onRightClick(result, point);
            }
        }
    }

    onMousemove(point) {
        let flag = false;
        for (let i = 0; i < this.layers.length; i++) {
            const layer = this.layers[i];
            if (
                "threeLayer" !== layer.layerType &&
                "ThreeLayer" !== layer.layerType &&
                layer.options.enablePicked &&
                layer.pick
            ) {
                const result = layer.pick(point.x, point.y);

                this.webglLayer.canvas.style.cursor =
                    -1 === result.dataIndex ? "default" : "pointer";
                this.webglLayer.canvas.style.pointerEvents =
                    -1 === result.dataIndex ? "none" : "auto";

                if (layer.options.onMousemove)
                    layer.options.onMousemove(result, result);
                layer.options.autoSelect && (flag = true);
            }
        }
        flag && (this.webglLayer.isAnimation || this.webglLayer.render());
    }
}
