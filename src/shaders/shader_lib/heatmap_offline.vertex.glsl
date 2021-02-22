uniform mat4 uMatrix;
uniform float uMax;
uniform float uMin;
uniform float uZoomUnits;

attribute vec3 aPos;
attribute vec2 aOffset;
attribute float aCount;
attribute float aSize;

varying vec2 vOffset;
varying float vCount;

void main() {
    vOffset = aOffset;
    vCount = (aCount - uMin) / (uMax - uMin);
    
    vec2 pos = aPos.xy + aOffset.xy * aSize * uZoomUnits / 2.0;
    gl_Position = uMatrix * vec4(pos, 0.0, 1.0);
}