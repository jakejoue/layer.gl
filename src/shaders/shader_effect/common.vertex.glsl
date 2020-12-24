attribute vec3 aPos;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;

void main() { 
    vTextureCoord = aTextureCoord;
    gl_Position = vec4(aPos, 1.0);
}