/**
 * @typedef {Object} Feature
 * @property {Object} geometry 多边形
 * @property {String} geometry.type 类型
 * @property {Array} geometry.coordinates 坐标
 * @property {Object} properties 属性
 */

/**
 * 图层基类，定义一些标准化的接口
 *
 * @interface
 */
class CommonLayer {
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

    /**
     * 获取公共默认配置信息，需要继承实现
     * @abstract
     * @returns {Object} 键值对对象
     */
    getCommonDefaultOptions() {
        return {};
    }

    /**
     * 获取默认配置信息，需要继承实现
     * @abstract
     * @returns {Object} 键值对对象
     */
    getDefaultOptions() {
        return {};
    }

    /**
     * 初始化接口
     * @abstract
     * @param {WebGLRenderingContext | WebGL2RenderingContext} gl
     */
    initialize(gl) {}

    destroy() {
        this.map = this.webglLayer = null;
        this.onDestroy();
    }

    /**
     * 渲染接口
     * @abstract
     * @param {Object} transferOptions
     */
    render(transferOptions) {}

    /**
     * 设置和更新数据的接口
     *
     * @api
     * @param {Array.<Feature>} data
     * @param {Object=} options
     * @param {Boolean=} [options.autoRender=true] 是否自动更新图层渲染
     */
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

    /**
     * 设置更新配置信息，options内容由相关图层定义
     * @abstract
     * @param {Object} options
     * @param {Array.<Feature>=} options.data 存在该信息会自动调用 setData 接口
     */
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

export default CommonLayer;
