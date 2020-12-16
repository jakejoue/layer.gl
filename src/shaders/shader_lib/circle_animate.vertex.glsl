attribute vec3 aPos;
attribute float aSize;
attribute float aIndex;
attribute vec4 aColor;
attribute float aStartTime;
attribute float aRadius;

varying vec4 vColor;
varying vec4 vPosition;
varying vec4 vFragPosition;
varying float vSize;
varying float vStartTime;
varying float vRadius;

uniform mat4 uMatrix;
uniform float uZoomUnits;

void main() {
    vColor = aColor;
    vStartTime = aStartTime;
    vSize = aSize * uZoomUnits;
    vRadius = aRadius * uZoomUnits;

    float x = aPos.x;
    float y = aPos.y;
    float R = vRadius;
    if (aIndex == 1.0) {
        x -= R;
        y += R;
    } else if (aIndex == 2.0) {
        x += R;
        y -= R;
    } else if (aIndex == 3.0) {
        x += R;
        y += R;
    } else {
        x -= R;
        y -= R;
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