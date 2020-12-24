// effects
import common_vert from "./shader_effect/common.vertex.glsl";

import bloom_bright_frag from "./shader_effect/bloom_bright.fragment.glsl";
import bloom_bloom_frag from "./shader_effect/bloom_bloom.fragment.glsl";
import bloom_result_frag from "./shader_effect/bloom_result.fragment.glsl";

import blur_frag from "./shader_effect/blur.fragment.glsl";

const ShaderEffect = {
    common_vert,

    bloom_bright_frag,
    bloom_bloom_frag,
    bloom_result_frag,

    blur_frag,
};

export default ShaderEffect;
