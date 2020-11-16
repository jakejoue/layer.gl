varying vec4 vColor;
varying vec2 vNormal;
varying vec2 vUV;
varying vec2 vDashArray;
varying float vCounter;
varying float vTotalDistance;
uniform bool uAntialias;
uniform float uDashOffset;
uniform float zoomUnits;
uniform float thickness;

#if defined(USE_TEXTURE)
uniform float uTextureMargin;
uniform sampler2D textureImage;
#endif

void main() {
    vec4 color = vColor;
    if(uAntialias) {
        float blur = 1.0;
        blur = 1.0 - smoothstep(0.8, 1.0, length(vNormal));
        color.a *= blur;
    }
    
    #if defined(USE_TEXTURE)
    float segLen = uTextureMargin * zoomUnits;
    float textureLen = thickness * zoomUnits;
    float deltaX = mod(vUV.x, segLen);
    float middle = segLen / 2.0;
    if(deltaX >= middle && deltaX <= middle + textureLen) {
        float uvx = (deltaX - middle) / textureLen;
        vec4 texture = texture2D(textureImage, vec2(uvx, vUV.y));
        color = texture.a >= 0.5 ? texture : color;
    }
    #endif
    
    if(vDashArray.y > 0.0) {
        float offset = uDashOffset * zoomUnits / vTotalDistance;
        color.a *= (1.0 - step(vDashArray.x, mod(vCounter + offset, vDashArray.x + vDashArray.y)));
    }
    gl_FragColor = color;
}