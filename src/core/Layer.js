class Layer {
    constructor(options) {
        this.options = options || this.getDefaultOptions;
    }

    // 获取默认配置
    getDefaultOptions() {}

    // 设置数据
    setData() {}

    // 初始化数据（把数据转为可用的webgl数据）
    initData() {}

    // 渲染
    render() {}
}
