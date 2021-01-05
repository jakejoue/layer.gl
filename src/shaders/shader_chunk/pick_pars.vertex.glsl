// pick支持
#if defined(PICK)

    attribute vec3 aPickColor;
    varying vec4 vPickColor;

    // 是否支持选择
    uniform bool uEnablePicked;
    // 是否为pick模式
    uniform bool uIsPickRender;

    // 当前选中要素对应的颜色
    uniform vec3 uPickedColor;
    // 选中后修改的颜色
    uniform vec4 uSelectedColor;

    bool mapvIsPicked() {
        return uEnablePicked && aPickColor == uPickedColor;
    }

#endif