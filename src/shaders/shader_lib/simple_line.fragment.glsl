
varying vec4 vColor;
varying vec3 vPos;
void main() {
    #if defined(DASH)
    if(mod(vPos.x, 3.0) < 1.5) {
        discard;
    }
    #endif
    
    gl_FragColor = vColor;
}