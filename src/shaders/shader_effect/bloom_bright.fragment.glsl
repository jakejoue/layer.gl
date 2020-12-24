precision mediump float;

uniform sampler2D uSampler;
uniform float threshold;

varying vec2 vTextureCoord;

void main() {
    vec4 color = texture2D(uSampler, vTextureCoord);
    vec4 lightColor = max(vec4(0.0), (color - (1.0 - threshold) / 5.0));
    float brightness = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
    
    if (brightness > threshold) {
        color = lightColor;
    } else {
        color = vec4(0.0);
    }
    gl_FragColor = color;
}