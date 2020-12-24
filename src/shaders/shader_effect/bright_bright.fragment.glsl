precision mediump float;

uniform sampler2D uSampler;
uniform float threshold;

varying vec2 vTextureCoord;

void main() {
    vec4 color = texture2D(uSampler, vTextureCoord);
    vec4 lightColor = max(vec4(0.0), (color - threshold));

    gl_FragColor = lightColor;
}