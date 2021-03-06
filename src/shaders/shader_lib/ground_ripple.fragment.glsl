struct GroundRipple {
    vec3 center;
    float radius;
    float width;
    vec4 color;
};

uniform GroundRipple u_ripple;
uniform float u_percent;

varying vec2 vPos;

void main() {
    vec4 blend = u_ripple.color;

    // 当前最小半径
    float radius = u_ripple.radius * u_percent;

    // 当前点半径
    float dis = distance(vPos, u_ripple.center.xy);

    if ( dis > radius && dis < radius + u_ripple.width ) {

        float percent = (1.0 - abs(dis - radius) / u_ripple.width);

        blend.rgb *= percent * 2.0 + 1.0;
        blend.a *= 1.0 - pow(1.0 - percent, 0.3);

        if ( u_percent > 0.7 ) {
            blend.a *= (1.0 - u_percent) / 0.3;
        }

    } else {
        discard;
    }

    gl_FragColor = blend;
}