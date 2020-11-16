uniform vec3 uFragColor;
varying float vTime;

void main() {
    if(vTime > 1.0 || vTime < 0.0) {
        discard;
    }
    gl_FragColor = vec4(uFragColor, 1.0 * vTime);
}