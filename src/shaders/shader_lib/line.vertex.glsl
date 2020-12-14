uniform mat4 u_matrix;
uniform vec2 u_dash_array;
uniform float u_zoom_units;
uniform float u_offset;

attribute vec4 a_color;
attribute vec3 a_position;
attribute vec3 a_normal;
attribute float a_distance;
attribute float a_total_distance;
attribute float a_width;

#if defined(USE_TEXTURE)
attribute vec2 uv;
#endif

varying vec4 v_color;
varying vec2 v_normal;
varying vec2 v_uv;
varying vec2 v_dash_array;
varying float v_total_distance;
varying float v_counter;
varying float v_width;

void main() {
    v_width = a_width;
    v_color = a_color;
    v_counter = a_distance / a_total_distance;
    v_dash_array = u_zoom_units * u_dash_array / a_total_distance;
    v_total_distance = a_total_distance;
    v_normal = vec2(normalize(a_normal.xy) * sign(a_width));
    
    #if defined(USE_TEXTURE)
    v_uv = uv;
    #endif
    
    #if defined(PICK)
    if (mapvIsPicked()) {
        v_color = uSelectedColor;
    }
    #endif
    
    vec2 extrude = a_normal.xy * a_width / 2.0 * u_zoom_units;
    vec2 offsetXY = a_normal.xy * u_offset;
    float offsetZ = u_offset * u_zoom_units / 100.0;

    gl_Position = u_matrix * vec4(a_position.xy + extrude + offsetXY, a_position.z + offsetZ, 1.0);
}