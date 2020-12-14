
uniform vec4 glowColor;
uniform float uPercent;
varying vec3 vPos;

void main() {
    vec4 blend = glowColor;
    
    float hPercent = 1.0 - vPos.z;

    blend.rgb *= hPercent * 2.0 + 1.0;
    blend.a *= 1.0 - pow(1.0 - hPercent, 0.3);

    if ( uPercent > 0.7 ) {
        blend.a *= (1.0 - uPercent) / 0.3;
    }

    gl_FragColor = blend;
}