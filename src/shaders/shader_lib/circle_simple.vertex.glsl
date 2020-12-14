attribute vec3 aPos;
attribute float aSize;
attribute float aIndex;
attribute vec4 aColor;

varying vec4 vColor;
varying vec4 vPosition;
varying vec4 vFragPosition;
varying float vSize;

uniform mat4 uMatrix;
uniform float uZoomUnits;

void main() {
    vColor = aColor;
    
    float x = aPos.x;
    float y = aPos.y;
    vSize = aSize * uZoomUnits;
    
    if (aIndex == 1.0) {
        x -= vSize;
        y += vSize;
    } else if (aIndex == 2.0) {
        x += vSize;
        y -= vSize;
    } else if (aIndex == 3.0) {
        x += vSize;
        y += vSize;
    } else {
        x -= vSize;
        y -= vSize;
    }
    
    vPosition = vec4(aPos.xyz, 1.0);
    vFragPosition = vec4(x, y, aPos.z, 1.0);
    
    gl_Position = uMatrix * vFragPosition;
    
    #if defined(PICK)
    if (mapvIsPicked()) {
        vColor = uSelectedColor;
    }
    #endif
}