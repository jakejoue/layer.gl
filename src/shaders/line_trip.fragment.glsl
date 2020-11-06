precision highp float;
varying vec4 vColor;
varying float vTime;

void main() {
    if(vTime > 1.0 || vTime < 0.0) {
        discard;
    }
    gl_FragColor = vec4(vColor.rgb, 1.0 * vTime);
}