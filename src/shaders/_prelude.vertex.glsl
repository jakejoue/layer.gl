// 相关defined的后处理函数
// - 外部拼接 -

// cesium 支持（暂时保留）
#ifdef LOG_DEPTH
varying float v_depthFromNearPlusOne;
#endif

// 地图范围
uniform vec2 MAPV_resolution;

// pick支持
#if defined(PICK)
attribute vec3 aPickColor;
uniform bool uEnablePicked;
uniform vec3 uPickedColor;
uniform bool uIsPickRender;
varying vec4 vPickColor;
bool mapvIsPicked() {
    return uEnablePicked && aPickColor == uPickedColor;
}
#endif

void afterMain() {
    // cesium 后处理
    #if defined(LOG_DEPTH)
    v_depthFromNearPlusOne = (gl_Position.w - 0.1) + 1.0;
    gl_Position.z = clamp(gl_Position.z / gl_Position.w, -1.0, 1.0) * gl_Position.w;
    #endif

    // pick后处理
    #if defined(PICK)
    vPickColor = vec4(aPickColor, 0.0);
    if (mapvIsPicked()) {
        vPickColor.a = 1.0;
    }
    #endif
}