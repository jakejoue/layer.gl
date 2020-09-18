export default class CommonLayer {
    constructor(options) {
        this.options = this.getCommonDefaultOptions();
        Object.assign(this.options, this.getDefaultOptions(), options);

        this.autoUpdate = false;

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

    initialize(options) {}

    destroy() {
        this.onDestroy();
    }

    render() {}

    setData(data, options = {}) {
        this.data = data;
        this.onDataChanged(this.getData());
        this.onChanged(this.getOptions(), this.getData());

        if (false !== options.autoRender && this.webglLayer) {
            this.webglLayer.render();
        }
    }

    getData() {
        return this.data || [];
    }

    setOptions(options = {}) {
        const preOptions = Object.assign({}, this.getOptions());
        Object.assign(this.options, options);
        this.onOptionsChanged(this.getOptions(), preOptions);
        this.onChanged(this.getOptions(), this.getData());

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
