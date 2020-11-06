precision highp float;
attribute vec4 aPos;
attribute vec4 aColor;

uniform mat4 u_matrix;
uniform float currentTime;
uniform float trailLength;

varying float vTime;
varying vec4 vColor;

void main() {
    gl_Position = u_matrix * vec4(aPos.xyz, 1.0);
    vColor = aColor;
    vTime = 1.0 - ((currentTime - aPos.w) / trailLength);
}