attribute vec3 aPos;
attribute vec4 aColor;
attribute float aSize;

uniform mat4 uMatrix;
uniform float uTime;
uniform float duration;
uniform float zoomUnits;

varying vec4 vColor;

void main(void) {
    if (aColor.w >= 0.0 && aColor.w <= 1.0) {
        vColor = aColor;
    } else {
        vColor = vec4(aColor.xyz, 1.0);
    }

    float percent = mod(uTime, duration) / duration;
    vColor.a = 1.0 - percent;

    gl_Position = uMatrix * vec4(aPos.xyz, 1.0);
    gl_PointSize = aSize / zoomUnits * percent;
    
    #if defined(PICK)
    if (mapvIsPicked()) {
        vColor = uSelectedColor;
    }
    #endif
}