attribute vec4 aPos;

uniform mat4 u_matrix;
uniform float currentTime;
uniform float trailLength;

varying float vTime;

void main() {
    gl_Position = u_matrix * vec4(aPos.xyz, 1.0);
    vTime = 1.0 - ((currentTime - aPos.w) / trailLength);
}