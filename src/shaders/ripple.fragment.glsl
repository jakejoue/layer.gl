
varying vec4 vColor;

void main(void) {
    vec4 color = vColor;
    float d = distance(gl_PointCoord, vec2(0.5, 0.5));
    if(d > 0.5) {
        discard;
    }
    float blur = 1.0;
    blur = 1.0 - smoothstep(0.49, 0.5, d);
    color.a *= blur;
    gl_FragColor = color;
}