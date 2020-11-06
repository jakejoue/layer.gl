precision highp float;
varying vec4 v_color;
varying vec2 v_normal;
varying vec2 v_uv;
varying vec2 v_dash_array;
varying float v_counter;
varying float v_total_distance;

uniform bool u_antialias;
uniform float u_dash_offset;
uniform float u_zoom_units;

#if defined(USE_LINE_ANIMATION)
uniform bool u_animate;
uniform float u_time;
uniform float u_duration;
uniform float u_interval;
uniform float u_trail_length;
#endif

#if defined(USE_TEXTURE)
uniform float u_texture_width;
uniform float u_texture_margin;
uniform sampler2D u_sampler;
#endif

void main() {
    vec4 color = v_color;

    // 抗锯齿
    if(u_antialias) {
        float blur = 1.0;
        blur = 1.0 - smoothstep(0.9, 1.0, length(v_normal));
        color.a *= blur;
    }
    
    // 动画
    #if defined(USE_LINE_ANIMATION)
    if(u_animate) {
        float alpha = 1.0 - fract(mod(1.0 - v_counter, u_interval) * (1.0 / u_interval) + u_time / u_duration);
        alpha = (alpha + u_trail_length - 1.0) / u_trail_length;
        color.a *= alpha;
        gl_FragColor = color;
        return;
    }
    #endif
    
    // 贴图模式
    #if defined(USE_TEXTURE)
    float margin_width = u_texture_margin * u_zoom_units;
    float margin_width_half = margin_width / 2.0;
    float texture_width = u_texture_width * u_zoom_units;
    float delta = mod(v_uv.x, texture_width + margin_width);
    if(delta >= margin_width_half && delta <= margin_width_half + texture_width) {
        float uvx = (delta - margin_width_half) / texture_width;
        vec4 texture = texture2D(u_sampler, vec2(uvx, v_uv.y));
        color = texture.a >= 0.5 ? texture : color;
    }
    #endif
    
    // 虚线效果
    if(v_dash_array.y > 0.0) {
        float offset = u_dash_offset * u_zoom_units / v_total_distance;
        color.a *= (1.0 - step(v_dash_array.x, mod(v_counter + offset, v_dash_array.x + v_dash_array.y)));
    }
    gl_FragColor = color;
}