varying vec4 v_color;
varying vec3 v_position;
varying float v_height;
varying vec2 v_texture_coord;

uniform float u_style;

uniform vec3 u_ripple_center;
uniform float u_radius;

uniform bool u_use_texture;
uniform vec4 u_top_color;
uniform sampler2D u_sampler;

uniform float u_time;
uniform float u_zoom_unit;
uniform bool u_use_lighting;

void main() {
    vec4 color = vec4(v_color);
    vec4 textureColor = vec4(1.0, 1.0, 1.0, 1.0);
    
    // 使用纹理
    if(u_use_texture) {
        // water 特效
        if(u_style == 6.0) {
            float x = v_texture_coord.s;
            float y = v_texture_coord.t;
            vec2 cPos = -1.0 + 2.0 * gl_FragCoord.xy / MAPV_resolution;
            float cLength = length(cPos);
            vec2 uv = gl_FragCoord.xy / MAPV_resolution + (cPos / cLength) * cos(cLength * 12.0 - u_time / 1000.0 * 4.0) * 0.03;
            textureColor = texture2D(u_sampler, uv / 2.0 + vec2(x, y));
        } else {
            textureColor = texture2D(u_sampler, vec2(v_texture_coord.s, v_texture_coord.t));
        }
        // 光照
        if(u_use_lighting) {
            color = vec4(textureColor * v_color * 1.1);
        } else {
            color = textureColor;
        }
    }
    // window 和 windowAnimation
    if(u_style == 1.0 || u_style == 2.0) {
        float t = u_time / 1000.0;
        float diffDistance = 5.0 * u_zoom_unit;
        float modX = mod(v_position.x, diffDistance * 2.0);
        float modZ = mod(v_position.z, diffDistance * 2.0);
        // 窗户判断
        if (modX < diffDistance && modZ < diffDistance && v_position.z < v_height) {
            color *= 1.05;
            // 动画特效
            if(u_time > 0.0 && u_style == 2.0) {
                float iX = ceil(v_position.x / diffDistance);
                float iZ = ceil(v_position.z / diffDistance);
                float timeDistance = 8.0;
                t += tan(sin(iZ));
                color *= (1.0 + mod(t, timeDistance) / timeDistance);
            }
        }
    }
    // 渐变色
    else if(u_style == 3.0) {
        color.a = 1.0 - pow(v_position.z / v_height, 0.3);
    }
    // 波纹
    else if(u_style == 4.0) {
        float dis = distance(u_ripple_center, v_position);
        float rSize = 400.0;
        if(v_position.z >= v_height) {
            color = u_top_color;
        }
        if(dis > u_radius - rSize && dis < u_radius + rSize) {
            color *= (1.0 - abs(dis - u_radius) / rSize) * 2.0 + 1.0;
        }
    }
    // 未知
    else if(u_style == 5.0) {
        float t = u_time / 1000.0;
        float diffDistance = 10.0;
        float modZ = mod(v_position.z - t * 40.0, diffDistance * 2.0);
        color.a = 1.0 - pow(v_position.z / v_height, 0.5);
        if(v_position.z / v_height < 0.3) {
            color.r += 0.2;
            color.g += 0.2;
            color.b += 0.2;
        }
        if(modZ < diffDistance * 2.0 - 4.0) {
            discard;
        }
    } else if(u_style == 6.0) {

    }
    gl_FragColor = color;
}