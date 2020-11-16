varying vec4 vPosition;
varying float vSize;
varying vec4 vFragPosition;
varying vec4 vColor;

uniform mat4 uMatrix;
uniform float uTime;
uniform float duration;
uniform float trail;
uniform float lineWidth;

void main() {
    float d = distance(vFragPosition.xy, vPosition.xy);
    if(d > vSize) {
        discard;
    }
    vec4 color = vColor;
    
    if(d > 0.9 * vSize && d <= vSize) {
        color.a = 1.0 - smoothstep(0.9 * vSize, vSize, d);
    }
    gl_FragColor = color;
}