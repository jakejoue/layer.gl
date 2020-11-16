#ifdef GL_ES
precision highp float;
#else

#if !defined(lowp)
#define lowp
#endif

#if !defined(mediump)
#define mediump
#endif

#if !defined(highp)
#define highp
#endif

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
    // pick后处理
    #if defined(PICK)
    vPickColor = vec4(aPickColor, 0.0);
    if (mapvIsPicked()) {
        vPickColor.a = 1.0;
    }
    #endif
}