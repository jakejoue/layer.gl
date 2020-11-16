import shaderChunk from "./shaderChunk";

const shaderLibs = {
    point: {
        vertexShader: shaderChunk.point_vert,
        fragmentShader: shaderChunk.point_frag,
    },

    ripple: {
        vertexShader: shaderChunk.ripple_vert,
        fragmentShader: shaderChunk.ripple_frag,
    },

    circle_simple: {
        vertexShader: shaderChunk.circle_simple_vert,
        fragmentShader: shaderChunk.circle_simple_frag,
    },

    circle_wave: {
        vertexShader: shaderChunk.circle_animate_vert,
        fragmentShader: shaderChunk.circle_wave_frag,
    },

    circle_bubble: {
        vertexShader: shaderChunk.circle_animate_vert,
        fragmentShader: shaderChunk.circle_bubble_frag,
    },

    ground_ripple: {
        vertexShader: shaderChunk.ground_ripple_vert,
        fragmentShader: shaderChunk.ground_ripple_frag,
    },

    simple_line: {
        vertexShader: shaderChunk.simple_line_vert,
        fragmentShader: shaderChunk.simple_line_frag,
    },

    line: {
        vertexShader: shaderChunk.line_vert,
        fragmentShader: shaderChunk.line_frag,
    },

    line_3d: {
        vertexShader: shaderChunk.line_3d_vert,
        fragmentShader: shaderChunk.line_3d_frag,
    },

    line_trip: {
        vertexShader: shaderChunk.line_trip_vert,
        fragmentShader: shaderChunk.line_trip_frag,
    },

    shape: {
        vertexShader: shaderChunk.shape_vert,
        fragmentShader: shaderChunk.shape_frag,
    },

    spark: {
        vertexShader: shaderChunk.spark_vert,
        fragmentShader: shaderChunk.spark_frag,
    },
};

export default shaderLibs;
