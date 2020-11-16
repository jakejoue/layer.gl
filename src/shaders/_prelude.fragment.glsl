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

// 相关后处理函数
#if defined(LOG_DEPTH)
#extension GL_EXT_frag_depth : enable
#endif

uniform vec2 MAPV_resolution;

#if defined(PICK)
uniform bool uIsPickRender;
varying vec4 vPickColor;

bool mapvIsPicked() {
    return vPickColor.a == 1.0;
}
#endif

#if defined(LOG_DEPTH)
uniform float oneOverLog2FarDepthFromNearPlusOne;
uniform float farDepthFromNearPlusOne;
varying float v_depthFromNearPlusOne;

void writeLogDepth(float depth) {
    if(depth <= 0.9999999 || depth > farDepthFromNearPlusOne) {
        discard;
    }
    gl_FragDepthEXT = log2(depth) * oneOverLog2FarDepthFromNearPlusOne;
}
#endif

void afterMain() {
    #if defined(PICK)
    if(uIsPickRender) {
        gl_FragColor = vec4(vPickColor.rgb, 1.0);
        return;
    }
    #endif

    #if defined(LOG_DEPTH)
    writeLogDepth(v_depthFromNearPlusOne);
    #endif
}