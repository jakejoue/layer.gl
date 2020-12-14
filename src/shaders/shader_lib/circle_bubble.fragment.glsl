varying vec4 vPosition;
varying float vSize;
varying vec4 vFragPosition;
varying vec4 vColor;
varying float vStartTime;
varying float vRadius;
varying float vWidth;

uniform mat4 uMatrix;
uniform float uTime;
uniform float duration;
uniform float trail;

void main() {
    float d = distance(vFragPosition.xy, vPosition.xy);
    if (d >= vRadius) {
        discard;
    }
    
    float time = vStartTime + uTime;
    float range = mod(time, (duration + trail));
    float percent = 0.0;
    if (range <= duration) {
        percent = range / duration;
    } else {
        percent = 1.0;
    }
    float center = vSize;
    float R = vRadius;
    float r = R * percent;
    vec4 color = vColor;

    if (d <= center) {
        if (d > 0.9 * center && d <= center) {
            color.a = 1.0 - smoothstep(0.9 * center, center, d);
        }
    } else {
        if (d < r) {
            color.a = smoothstep(0.1, 0.9, pow(d / r, 2.0) * 0.9);
            if (d >= 0.9 * r && d <= r) {
                color.a *= 1.0 - smoothstep(0.9, 1.0, d / r);
            } if (range > duration) {
                color.a *= 1.0 - (range - duration) / trail;
            }
        } else {
            color.a = 0.0;
        }
    }
    gl_FragColor = color;
}