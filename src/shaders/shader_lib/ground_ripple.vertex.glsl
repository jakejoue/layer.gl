uniform mat4 u_matrix;
attribute vec3 aPos;
varying vec2 vPos;

void main() {
    vPos = aPos.xy;
    
    gl_Position = u_matrix * vec4(aPos, 1.0);
}