struct Ripple {
    vec2 center;
    float radius;
    float width;
    vec4 color;
};

uniform Ripple u_ripple;
uniform float u_time;
uniform float u_duration;

varying vec2 vPos;

void main() {
    vec4 color = u_ripple.color;

    // 当前百分比
    float percent = mod(u_time, u_duration) / u_duration;
    // 当前最小半径
    float radius = u_ripple.radius * percent;

    // 当前点半径
    float dis = distance(vPos, u_ripple.center);

    if(dis > radius && dis < radius + u_ripple.width) {
        color *= (1.0 - abs(dis - radius) / u_ripple.width) * 2.0 + 1.0;
    } else {
        discard;
    }

    gl_FragColor = color;
}