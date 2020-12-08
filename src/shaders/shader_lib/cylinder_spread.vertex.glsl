attribute vec3 aPos;

uniform mat4 uMatrix;
uniform mat4 uObjMatrix;
uniform float uPercent;

varying vec3 vPos;

void main() {
    vec4 pos = vec4(aPos, 1.0);
    pos.xy *= uPercent;

    if( uPercent < 0.7 ) {
        pos.z *= pow(uPercent / 0.7, 1.3);
    }

    gl_Position = uMatrix * uObjMatrix * pos;

    vPos = aPos;
}