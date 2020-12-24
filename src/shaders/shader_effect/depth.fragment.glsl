precision mediump float;

uniform sampler2D uSampler;
uniform vec2 canvasSize;

varying vec2 vTextureCoord;

void main() {
    float fStep = 1.0 / 312.0;
    vec4 sample11 = texture2D(uSampler, vec2(vTextureCoord.s - 1.0 * fStep, vTextureCoord.t + 1.0 * fStep));
    vec4 sample12 = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t + 1.0 * fStep));
    vec4 sample13 = texture2D(uSampler, vec2(vTextureCoord.s + 1.0 * fStep, vTextureCoord.t + 1.0 * fStep));
    vec4 sample21 = texture2D(uSampler, vec2(vTextureCoord.s - 1.0 * fStep, vTextureCoord.t));
    vec4 sample22 = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
    vec4 sample23 = texture2D(uSampler, vec2(vTextureCoord.s + 1.0 * fStep, vTextureCoord.t));
    vec4 sample31 = texture2D(uSampler, vec2(vTextureCoord.s - 1.0 * fStep, vTextureCoord.t - 1.0 * fStep));
    vec4 sample32 = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t - 1.0 * fStep));
    vec4 sample33 = texture2D(uSampler, vec2(vTextureCoord.s + 1.0 * fStep, vTextureCoord.t - 1.0 * fStep));
    vec4 blurSample = (sample11 + sample12 + sample13 + sample21 + 2.0 * sample22 + sample23 + sample31 + sample32 + sample33) / 10.0;
    float desX = abs((gl_FragCoord.x - canvasSize.x / 2.0) / (canvasSize.x / 2.0));
    float desY = abs((gl_FragCoord.y - canvasSize.y / 2.0) / (canvasSize.y / 2.0));
    float factor = max(desX, desY);
    
    gl_FragColor = (sample22 * (1.0 - factor) + blurSample * factor);
}