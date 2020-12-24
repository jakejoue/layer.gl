precision mediump float;

uniform sampler2D originalTexture;
uniform sampler2D bloomTexture;
uniform float toneScale;

varying vec2 vTextureCoord;

void main() {
    vec4 color = texture2D(originalTexture, vTextureCoord) * toneScale;
    vec4 bloomColor = texture2D(bloomTexture, vTextureCoord);

    color += bloomColor;
    gl_FragColor = color;
}