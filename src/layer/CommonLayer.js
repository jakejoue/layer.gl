export default class CommonLayer {
    constructor(options) {
        this.options = Object.assign(
            this.getCommonDefaultOptions(),
            this.getDefaultOptions(),
            options
        );

        this.autoUpdate = false;

        // 状态管理器
        this._dataDirty = false;
        this._optionsDirty = false;

        if (this.options.data) {
            this.data = this.options.data;
            delete this.options.data;
        }
    }

    getCommonDefaultOptions() {
        return {};
    }

    getDefaultOptions() {
        return {};
    }

    initialize(gl) {}

    destroy() {
        this.map = this.webglLayer = null;
        this.onDestroy();
    }

    render() {}

    setData(data, options = {}) {
        this._dataDirty = true;

        delete this.pointOffset;

        this.data = data;
        this.onDataChanged(this.getData());
        this.onChanged(this.getOptions(), this.getData());

        this._dataDirty = false;

        if (false !== options.autoRender && this.webglLayer) {
            this.webglLayer.render();
        }
    }

    getData() {
        return this.data || [];
    }

    setOptions(options = {}) {
        this._optionsDirty = true;

        delete this.pointOffset;

        const preOptions = Object.assign({}, this.getOptions());
        Object.assign(this.options, options);
        this.onOptionsChanged(this.getOptions(), preOptions);
        this.onChanged(this.getOptions(), this.getData());

        this._optionsDirty = false;

        if (options.data) {
            this.setData(options.data);
            delete options.data;
        } else {
            this.webglLayer && this.webglLayer.render();
        }
    }

    getOptions() {
        return this.options || {};
    }

    onOptionsChanged(newOptions, preOptions) {}

    onDataChanged(data) {}

    onChanged(options, data) {}

    onDestroy() {}

    setWebglLayer(webglLayer) {
        this.webglLayer = webglLayer;
    }

    getWebglLayer() {
        return this.webglLayer;
    }

    isRequestAnimation() {
        return this.autoUpdate;
    }
}
