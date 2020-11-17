attribute vec4 a_pos;
attribute vec3 a_normal;
attribute vec4 a_color;
attribute vec4 a_pre_color;
attribute float a_height;
attribute float a_pre_height;

#if defined(USE_TEXTURE)
attribute vec2 a_texture_coord;
#endif

uniform vec4 uSelectedColor;
uniform mat4 u_matrix;
uniform vec3 u_side_light_dir;
uniform bool u_use_lighting;
uniform bool u_use_texture;
uniform float u_alpha;
uniform float u_dataTime;
uniform float u_riseTime;
uniform float u_zoom_unit;

varying float v_height;
varying vec4 v_color;
varying vec3 v_position;
varying vec2 v_texture_coord;

// 上光源
const vec3 point_color = vec3(0.06, 0.06, 0.06);
// 侧部光源
const vec3 light_color = vec3(0.53, 0.53, 0.53);
// 底部光源
const vec3 light_color_2 = vec3(0.4, 0.4, 0.4);
// 贴图模式使用的散射光和直射光
const vec3 uAmbientColor = vec3(0.8, 0.8, 0.8);
const vec3 uDirectionalColor = vec3(1.0, 1.0, 1.0);

// 根据时间计算目标高度
float getTransitionValue(float pre_value, float to_value) {
    float result = 0.0;
    if(pre_value == to_value) {
        result = to_value;
    } else {
        if(u_riseTime > 0.0 && u_dataTime < u_riseTime) {
            result = (pre_value + (to_value - pre_value) * (u_dataTime / u_riseTime));
        } else {
            result = to_value;
        }
    }
    return result;
}

void main() {
    vec4 pos = a_pos;
    pos.z = pos.z + pos.w * getTransitionValue(a_pre_height, a_height);
    gl_Position = u_matrix * vec4(pos.xyz, 1.0);

    // varing变量赋值
    v_position = pos.xyz;
    v_height = a_pos.z + a_height;

    #if defined(USE_TEXTURE)
    if(u_use_texture) {
        v_texture_coord = a_texture_coord;
    }
    #endif

    // 后面开始颜色计算
    vec4 icolor = a_color;
    #if defined(PICK)
    if(mapvIsPicked()) {
        icolor = uSelectedColor;
    }
    #endif
    
    // 如果使用光照
    if(u_use_lighting) {
        vec3 N = normalize(a_normal);

        // 自上而下的点光源
        vec3 L_point = normalize(vec3(0, 1, 0));
        float lambert_point = max(0.0, dot(N, -L_point));

        // 外部光照
        vec3 L = normalize(u_side_light_dir);
        float lambert = max(0.0, dot(N, -L));

        float H = pos.z / u_zoom_unit;
        if(H < 5.0) {
            float deepGradientColor = (5.0 - H) / 8.0;
            lambert = lambert - deepGradientColor;
        }

        // 自下而上的光源
        vec3 L2 = vec3(0, 0, -1);
        float lambert_2 = max(0.0, dot(N, -L2));

        // 如果顶部颜色和初始颜色相同
        if(a_pre_color.r == a_color.r && a_pre_color.g == a_color.g && a_pre_color.b == a_color.b) {

        } else {
            if(u_riseTime > 0.0 && u_dataTime < u_riseTime) {
                icolor.r = a_pre_color.r + (a_color.r - a_pre_color.r) * (u_dataTime / u_riseTime);
                icolor.g = a_pre_color.g + (a_color.g - a_pre_color.g) * (u_dataTime / u_riseTime);
                icolor.b = a_pre_color.b + (a_color.b - a_pre_color.b) * (u_dataTime / u_riseTime);
            }
        }

        // 计算加入光照后的颜色
        v_color.rgb = icolor.rgb + 
            icolor.rgb * light_color * lambert + 
            icolor.rgb * light_color_2 * lambert_2 +
            icolor.rgb * point_color * lambert_point;
        v_color.a = icolor.a;

        // 如果是贴图模式
        if(u_use_texture) {
            float directionalLightWeighting = max(dot(N, normalize(vec3(0.0, -1.0, 2.0))), 0.0);
            v_color = vec4(uAmbientColor + uDirectionalColor * directionalLightWeighting, 1.0);
        }
    } else {
        v_color = icolor;
    }
    // 加入外部整体透明度
    v_color *= u_alpha;
}