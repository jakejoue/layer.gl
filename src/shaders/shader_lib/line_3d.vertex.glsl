uniform mat4 uMatrix;
uniform bool uFlat;
uniform vec2 uDashArray;
uniform float thickness;
uniform float zoomUnits;
uniform float devicePixelRatio;
uniform int miter;

attribute vec3 position;
attribute vec3 next;
attribute vec3 previous;
attribute float direction;
attribute vec4 aColor;
attribute float aDistance;
attribute float aTotalDistance;

#if defined(USE_TEXTURE)
attribute vec2 uv;
#endif

varying vec4 vColor;
varying vec2 vNormal;
varying vec2 vUV;
varying vec2 vDashArray;
varying float vTotalDistance;
varying float vCounter;

vec2 project(vec4 coord) {
    vec3 screen = coord.xyz / coord.w;
    vec2 clip = (screen.xy + 1.0) / 2.0;
    return clip * MAPV_resolution;
}
vec4 unproject(vec2 projected, float z, float w) {
    vec2 clip = projected / MAPV_resolution;
    vec2 screen = clip * 2.0 - 1.0;
    return vec4(screen * w, z, w);
}
vec3 getNormalAndWidth(vec2 currentScreen, vec2 previousScreen, vec2 nextScreen, float thickness) {
    vec2 dir = vec2(0.0);
    if (currentScreen == previousScreen) {
        dir = normalize(nextScreen - currentScreen);
    } else if(currentScreen == nextScreen) {
        dir = normalize(currentScreen - previousScreen);
    } else {
        vec2 dirA = normalize(currentScreen - previousScreen);
        if (miter == 1) {
            vec2 dirB = normalize(nextScreen - currentScreen);
            vec2 tangent = normalize(dirA + dirB);
            vec2 perp = vec2(-dirA.y, dirA.x);
            vec2 miter = vec2(-tangent.y, tangent.x);
            dir = tangent;
            float angle = 40.0;
            if (dot(dirA, dirB) > cos(radians(angle))) {
                thickness = thickness / dot(miter, perp);
            }
        } else {
            dir = dirA;
        }
    }
    vec2 normal = vec2(-dir.y, dir.x);
    return vec3(normal, thickness);
}

void main() {
    vColor = aColor;
    vCounter = aDistance / aTotalDistance;
    vDashArray = zoomUnits * uDashArray / aTotalDistance;
    vTotalDistance = aTotalDistance;
    
    #if defined(USE_TEXTURE)
    vUV = uv;
    #endif
    
    #if defined(PICK)
    if(mapvIsPicked()) {
        vColor = uSelectedColor;
    }
    #endif
    
    if(uFlat) {
        float width = thickness * zoomUnits;
        vec3 nw = getNormalAndWidth(position.xy, previous.xy, next.xy, width);
        width = nw.z;
        vec2 normal = nw.xy;
        vNormal = normal * direction;
        normal *= width / 2.0;

        gl_Position = uMatrix * vec4(position.xy + normal * direction, position.z, 1.0);
    } else {
        vec4 previousProjected = uMatrix * vec4(previous, 1.0);
        vec4 currentProjected = uMatrix * vec4(position, 1.0);
        vec4 nextProjected = uMatrix * vec4(next, 1.0);
        vec2 currentScreen = project(currentProjected);
        vec2 previousScreen = project(previousProjected);
        vec2 nextScreen = project(nextProjected);
        float width = thickness * devicePixelRatio;
        vec3 nw = getNormalAndWidth(currentScreen, previousScreen, nextScreen, width);
        width = nw.z;
        vec2 normal = nw.xy;
        vNormal = normal * direction;
        normal *= width / 2.0;
        vec2 pos = currentScreen + normal * direction;
        vec4 finalPos = unproject(pos, currentProjected.z, currentProjected.w);
        gl_Position = finalPos;
    }
}