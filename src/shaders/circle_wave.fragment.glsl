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
    if(d >= vRadius) {
        discard;
    }
    vec4 color = vColor;
    float R = vRadius;
    float center = vSize;
    float time = vStartTime + uTime;
    float alpha = sin((R - d) / R * trail * 2.0 * 3.14 + time / duration);
    
    if(d <= center) {
        if(d > 0.9 * center && d <= center) {
            if(alpha >= 0.5) {
                color.a = 0.9;
            } else {
                color.a = 1.0 - smoothstep(0.9 * center, center, d);
            }
        }
    } else {
        if(alpha >= 0.5) {
            color.a = 0.9;
            if(alpha >= 0.5 && alpha <= 0.6) {
                color.a = smoothstep(0.0, 0.1, alpha - 0.5);
            }
            if(d >= center && d <= R) {
                color.a *= 1.0 - smoothstep(center, R, d);
            }
        } else {
            color.a = 0.0;
        }
    }
    gl_FragColor = color;
}