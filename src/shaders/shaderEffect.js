// effects
import common_vert from "./shader_effect/common.vertex.glsl";
import bloom_frag from "./shader_effect/bloom.fragment.glsl";
import result_frag from "./shader_effect/result.fragment.glsl";

import bloom_bright_frag from "./shader_effect/bloom_bright.fragment.glsl";
import bright_bright_frag from "./shader_effect/bright_bright.fragment.glsl";

import blur_frag from "./shader_effect/blur.fragment.glsl";
import depth_frag from "./shader_effect/depth.fragment.glsl";

const ShaderEffect = {
    common_vert,

    bloom_frag,
    result_frag,

    bloom_bright_frag,
    bright_bright_frag,
    blur_frag,
    depth_frag,
};

export default ShaderEffect;
