// shader chunk

import common from "./shader_chunk/common.glsl";

import pick_pars_vert from "./shader_chunk/pick_pars.vertex.glsl";
import pick_pars_frag from "./shader_chunk/pick_pars.fragment.glsl";
import pick_vert from "./shader_chunk/pick.vertex.glsl";
import pick_frag from "./shader_chunk/pick.fragment.glsl";

import effects_pars from "./shader_chunk/effects_pars.glsl";
import effects_frag_end from "./shader_chunk/effects_frag_end.glsl";

// template

import _template_vert from "./shader_lib/_template.vertex.glsl";
import _template_frag from "./shader_lib/_template.fragment.glsl";

// sharder lib

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

import shape_defines from "./shader_lib/shape.defines.glsl";
import shape_vert from "./shader_lib/shape.vertex.glsl";
import shape_frag from "./shader_lib/shape.fragment.glsl";

import spark_vert from "./shader_lib/spark.vertex.glsl";
import spark_frag from "./shader_lib/spark.fragment.glsl";

import cylinder_spread_vert from "./shader_lib/cylinder_spread.vertex.glsl";
import cylinder_spread_frag from "./shader_lib/cylinder_spread.fragment.glsl";

import heatmap_offline_vert from "./shader_lib/heatmap_offline.vertex.glsl";
import heatmap_offline_frag from "./shader_lib/heatmap_offline.fragment.glsl";
import heatmap_vert from "./shader_lib/heatmap.vertex.glsl";
import heatmap_frag from "./shader_lib/heatmap.fragment.glsl";

const ShaderChunk = {
    common,
    pick_pars_vert,
    pick_pars_frag,
    pick_vert,
    pick_frag,
    effects_pars,
    effects_frag_end,

    _template_vert,
    _template_frag,

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
    shape_defines,
    shape_frag,
    spark_vert,
    spark_frag,
    cylinder_spread_vert,
    cylinder_spread_frag,
    heatmap_offline_vert,
    heatmap_offline_frag,
    heatmap_vert,
    heatmap_frag,
};

export default ShaderChunk;
