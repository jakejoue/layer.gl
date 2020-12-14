struct Defines {
    bool useLight;
    bool useTexture;
    bool useTopTexture;
    bool useTopColor;
};

varying vec4 v_color;
varying vec3 v_position;
varying float v_height;
varying vec2 v_texture_coord;

// 相关变量定义
uniform Defines defines;

// 一些常规变量
uniform float u_style;
uniform float u_time;
uniform float u_zoom_unit;

// 顶部颜色等
uniform sampler2D u_sampler;
uniform vec4 u_top_color;

void main() {
    vec4 color = vec4(v_color);
    vec4 textureColor = vec4(1.0, 1.0, 1.0, 1.0);
    
    // 使用纹理
    if (defines.useTexture) {
        // water 特效
        if (u_style == 6.0) {
            float x = v_texture_coord.s;
            float y = v_texture_coord.t;
            vec2 cPos = -1.0 + 2.0 * gl_FragCoord.xy / MAPV_resolution;
            float cLength = length(cPos);
            vec2 uv = gl_FragCoord.xy / MAPV_resolution + (cPos / cLength) * cos(cLength * 12.0 - u_time / 1000.0 * 4.0) * 0.03;
            textureColor = texture2D(u_sampler, uv / 2.0 + vec2(x, y));
        } else {
            textureColor = texture2D(u_sampler, vec2(v_texture_coord.s, v_texture_coord.t));
        }

        // topColor顶部颜色
        if (v_position.z == v_height && defines.useTopColor) {
            textureColor = u_top_color;
        }

        // 光照
        if (defines.useLight) {
            color = vec4(textureColor * v_color * 1.1);
        } else {
            color = textureColor;
        }
    }
    // window 和 windowAnimation
    if (u_style == 1.0 || u_style == 2.0) {
        float t = u_time / 1000.0;
        float diffDistance = 5.0 * u_zoom_unit;
        float modX = mod(v_position.x, diffDistance * 2.0);
        float modZ = mod(v_position.z, diffDistance * 2.0);
        // 窗户判断
        if (modX < diffDistance && modZ < diffDistance && v_position.z < v_height) {
            color *= 1.05;
            // 动画特效
            if (u_time > 0.0 && u_style == 2.0) {
                float iX = ceil(v_position.x / diffDistance);
                float iZ = ceil(v_position.z / diffDistance);
                float timeDistance = 8.0;
                t += tan(sin(iZ));
                color *= (1.0 + mod(t, timeDistance) / timeDistance);
            }
        }
    }
    // 渐变色
    else if (u_style == 3.0) {
        color.a = 1.0 - pow(v_position.z / v_height, 0.3);
    }
    
    gl_FragColor = color;
}