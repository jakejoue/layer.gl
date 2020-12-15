
struct Defines {
    bool useLight;
    bool useTexture;
    bool useTopTexture;
    bool useTopColor;
};

uniform Defines defines;

// 基础参数
uniform mat4 u_matrix;
uniform float u_zoom_unit;

// 样式相关
uniform float u_style;
uniform float u_alpha;
uniform vec4 u_top_color;
uniform sampler2D u_sampler;
uniform sampler2D u_top_sampler;

// 光照
uniform vec3 u_side_light_dir;

// 时间
uniform float u_time;
uniform float u_dataTime;
uniform float u_riseTime;

// 变量
varying float v_height;
varying float v_height_percent;
varying vec4 v_color;
varying vec3 v_position;
varying vec2 v_texture_coord;