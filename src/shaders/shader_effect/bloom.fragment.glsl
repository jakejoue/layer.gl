precision mediump float;

uniform sampler2D uSampler;
uniform bool isVertical;
uniform vec2 canvasSize;
uniform float blurSize;
uniform float devicePixelRatio;

varying vec2 vTextureCoord;

void main() {
    float weight[10];
    weight[0] = 0.2270270270;
    weight[1] = 0.1945945946;
    weight[2] = 0.1216216216;
    weight[3] = 0.1135135135;
    weight[4] = 0.0972972973;
    weight[5] = 0.0608108108;
    weight[6] = 0.0540540541;
    weight[7] = 0.0270270270;
    weight[8] = 0.0162162162;
    weight[9] = 0.0081081081;
    
    vec2 offset = vec2(blurSize / canvasSize.x, blurSize / canvasSize.y) * devicePixelRatio;
    vec4 result = texture2D(uSampler, vTextureCoord) * weight[0];
    
    if (isVertical) {
        for (int i = 1; i < 10; ++i) {
            result += texture2D(uSampler, vTextureCoord + vec2(0.0, offset.y * float(i))) * weight[i];
            result += texture2D(uSampler, vTextureCoord - vec2(0.0, offset.y * float(i))) * weight[i];
        }
    } else {
        for(int i = 1; i < 10; ++i) {
            result += texture2D(uSampler, vTextureCoord + vec2(offset.x * float(i), 0.0)) * weight[i];
            result += texture2D(uSampler, vTextureCoord - vec2(offset.x * float(i), 0.0)) * weight[i];
        }
    }
    
    gl_FragColor = result;
}