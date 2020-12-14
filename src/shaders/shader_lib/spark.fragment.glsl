uniform vec4 uFragColor;
varying float vTime;

void main() {
    if (vTime > 1.0 || vTime < 0.0) {
        discard;
    }
    gl_FragColor = uFragColor.a * vec4(uFragColor.rgb, 1.0 * vTime);
}