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

uniform vec2 MAPV_resolution;

#if defined(PICK)
uniform bool uIsPickRender;
varying vec4 vPickColor;

bool mapvIsPicked() {
    return vPickColor.a == 1.0;
}
#endif

void afterMain() {
    #if defined(PICK)
    if(uIsPickRender) {
        gl_FragColor = vec4(vPickColor.rgb, 1.0);
        return;
    }
    #endif
}