precision mediump float;

uniform sampler2D originalTexture;
uniform sampler2D bloomTexture;

varying vec2 vTextureCoord;

void main() { 
    vec4 color = texture2D(originalTexture, vTextureCoord);
    vec4 bloomColor = texture2D(bloomTexture, vTextureCoord);

    color += bloomColor;
    gl_FragColor = color;
}