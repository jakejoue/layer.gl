attribute vec2 aPos;

varying vec2 vPos;

uniform float uHeight;
uniform mat4 pixelToViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 inverseMatrix;
uniform sampler2D uSampler;

void main() {
    vPos = aPos;
    
    if (uHeight <= 0.0) {
        gl_Position = vec4(aPos, 0.0, 1.0);
    } else {
        vec4 gray = texture2D(uSampler, (aPos + 1.0) / 2.0);
        vec4 m0 = inverseMatrix * vec4(aPos.xy, 0.0, 1.0);
        vec4 m1 = inverseMatrix * vec4(aPos.xy, 1.0, 1.0);
        m0 /= m0.w;
        m1 /= m1.w;
        vec4 pixel = m0 + (-m0.z / (m1.z - m0.z)) * (m1 - m0);
        pixel.z = uHeight * gray.a;
        gl_Position = projectionMatrix * pixelToViewMatrix * vec4(pixel.xyz, 1.0);
    }
}