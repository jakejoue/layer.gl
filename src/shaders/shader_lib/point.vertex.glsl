attribute vec3 aPos;
attribute vec4 aColor;
attribute float aSize;
uniform mat4 uMatrix;
varying vec4 vColor;
uniform vec4 uSelectedColor;

void main() {
    if(aColor.w >= 0.0 && aColor.w <= 1.0) {
        vColor = aColor;
    } else {
        vColor = vec4(aColor.xyz, 1.0);
    }
    gl_Position = uMatrix * vec4(aPos, 1.0);
    gl_PointSize = aSize;

    #if defined(PICK)
    if(mapvIsPicked()) {
        vColor = uSelectedColor;
    }
    #endif
}