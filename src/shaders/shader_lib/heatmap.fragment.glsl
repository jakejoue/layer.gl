uniform sampler2D uSampler;
uniform sampler2D uSamplerPalette;

varying vec2 vPos;

void main() {
    vec4 gray = texture2D(uSampler, (vPos + 1.0) / 2.0);
    float grayAlpha = gray.a;
    
    if (grayAlpha <= 0.0) {
        discard;
    }
    
    vec4 color = texture2D(uSamplerPalette, vec2(grayAlpha, 1.0));
    gl_FragColor = vec4(color.rgb, grayAlpha);
}