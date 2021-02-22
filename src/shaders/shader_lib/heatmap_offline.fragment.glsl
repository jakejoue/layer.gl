varying vec2 vOffset;
varying float vCount;

uniform sampler2D uCircle;

void main() {
    vec4 circle = texture2D(uCircle, (vOffset + 1.0) / 2.0);
    float intensity = circle.a * vCount;

    if (intensity <= 0.0) {
        discard;
    }

    gl_FragColor = vec4(.0, .0, .0, intensity);
}