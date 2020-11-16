
uniform mat4 u_matrix;
attribute vec3 aPos;
attribute vec4 aColor;
varying vec4 vColor;

#if defined(DASH)
varying vec3 vPos;
#endif

void main() {
    if(aColor.w >= 0.0 && aColor.w <= 1.0) {
        vColor = aColor;
    } else {
        vColor = vec4(aColor.xyz, 1.0);
    }
    gl_Position = u_matrix * vec4(aPos, 1.0);
    
    #if defined(DASH)
    vPos = aPos;
    #endif
}