import _prelude_vert from "./shader_lib/_prelude.vertex.glsl";
import _prelude_frag from "./shader_lib/_prelude.fragment.glsl";

import point_vert from "./shader_lib/point.vertex.glsl";
import point_frag from "./shader_lib/point.fragment.glsl";

import ripple_vert from "./shader_lib/ripple.vertex.glsl";
import ripple_frag from "./shader_lib/ripple.fragment.glsl";

import circle_simple_vert from "./shader_lib/circle_simple.vertex.glsl";
import circle_simple_frag from "./shader_lib/circle_simple.fragment.glsl";
import circle_animate_vert from "./shader_lib/circle_animate.vertex.glsl";
import circle_wave_frag from "./shader_lib/circle_wave.fragment.glsl";
import circle_bubble_frag from "./shader_lib/circle_bubble.fragment.glsl";

import ground_ripple_vert from "./shader_lib/ground_ripple.vertex.glsl";
import ground_ripple_frag from "./shader_lib/ground_ripple.fragment.glsl";

import simple_line_vert from "./shader_lib/simple_line.vertex.glsl";
import simple_line_frag from "./shader_lib/simple_line.fragment.glsl";

import line_vert from "./shader_lib/line.vertex.glsl";
import line_frag from "./shader_lib/line.fragment.glsl";

import line_3d_vert from "./shader_lib/line_3d.vertex.glsl";
import line_3d_frag from "./shader_lib/line_3d.fragment.glsl";

import line_trip_vert from "./shader_lib/line_trip.vertex.glsl";
import line_trip_frag from "./shader_lib/line_trip.fragment.glsl";

import shape_vert from "./shader_lib/shape.vertex.glsl";
import shape_frag from "./shader_lib/shape.fragment.glsl";

import spark_vert from "./shader_lib/spark.vertex.glsl";
import spark_frag from "./shader_lib/spark.fragment.glsl";

const ShaderChunk = {
    _prelude_vert,
    _prelude_frag,

    point_vert,
    point_frag,
    ripple_vert,
    ripple_frag,
    circle_simple_vert,
    circle_simple_frag,
    circle_animate_vert,
    circle_wave_frag,
    circle_bubble_frag,
    ground_ripple_vert,
    ground_ripple_frag,
    simple_line_vert,
    simple_line_frag,
    line_vert,
    line_frag,
    line_3d_vert,
    line_3d_frag,
    line_trip_vert,
    line_trip_frag,
    shape_vert,
    shape_frag,
    spark_vert,
    spark_frag,
};

export default ShaderChunk;
