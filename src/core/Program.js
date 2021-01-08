import shaderChunk from "../shaders/shaderChunk";
import shaderLib from "../shaders/shaderLib";

import Uniforms from "./Uniforms";
import Textures from "./Textures";

import Effects from "./Effects";

function addLineNumbers(string) {
    const lines = string.split("\n");

    for (let i = 0; i < lines.length; i++) {
        lines[i] = i + 1 + ": " + lines[i];
    }

    return lines.join("\n");
}

function getParameters(options, layer) {
    const { shaderId, defines } = options;
    let { vertexShader, fragmentShader } = options;

    if (shaderId) {
        const shader = shaderLib[shaderId];

        vertexShader = shader.vertexShader;
        fragmentShader = shader.fragmentShader;
    }

    return {
        defines,
        vertexShader,
        fragmentShader,
        effects: new Effects(layer ? layer.options.effects : []),
    };
}

function generateDefines(defines) {
    if (!defines) return "";

    const chunks = [];

    for (const name in defines) {
        const value = defines[name];

        if (value === false) continue;

        // 如果是个数组类型
        if (Array.isArray(defines)) {
            chunks.push(`#define ${value}`);
        }
        // 如果是键值对
        else {
            chunks.push(`#define ${name} ${value}`);
        }
    }

    return chunks.join("\n");
}

// Resolve Includes

const includePattern = /^[ \t]*#include +<([\w\d./]+)>/gm;

function resolveIncludes(string) {
    return string.replace(includePattern, includeReplacer);
}

function includeReplacer(match, include) {
    const string = shaderChunk[include];

    if (string === undefined) {
        throw new Error("Can not resolve #include <" + include + ">");
    }

    return resolveIncludes(string);
}

// effects

function replaceEffectNums(string, effects) {
    const effectMap = effects.map;

    for (const key in effectMap) {
        string = string.replace(new RegExp(key, "g"), effectMap[key].size);
    }

    return string.replace(/NUM_([A-Z]|_)*S/g, 0);
}

// Unroll Loops

const deprecatedUnrollLoopPattern = /#pragma unroll_loop[\s]+?for \( int i = (\d+); i < (\d+); i \+\+ \) \{([\s\S]+?)(?=\})\}/g;
const unrollLoopPattern = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;

function unrollLoops(string) {
    return string
        .replace(unrollLoopPattern, loopReplacer)
        .replace(deprecatedUnrollLoopPattern, deprecatedLoopReplacer);
}

function deprecatedLoopReplacer(match, start, end, snippet) {
    console.warn(
        "WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."
    );
    return loopReplacer(match, start, end, snippet);
}

function loopReplacer(match, start, end, snippet) {
    let string = "";

    for (let i = parseInt(start); i < parseInt(end); i++) {
        string += snippet
            .replace(/\[\s*i\s*\]/g, "[ " + i + " ]")
            .replace(/UNROLLED_LOOP_INDEX/g, i);
    }

    return string;
}

// fetch attribute

function fetchAttributeLocations(gl, program) {
    const attributes = {};

    const n = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

    for (let i = 0; i < n; i++) {
        const info = gl.getActiveAttrib(program, i);
        const name = info.name;

        attributes[name] = gl.getAttribLocation(program, name);
    }

    return attributes;
}

// init shader

function createAndLinkProgram(gl, vertexShaderStr, fragmentShaderStr) {
    let program = false;

    // 顶点着色器
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);

    gl.shaderSource(vertexShader, vertexShaderStr);
    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        const error =
            "Vertex shader failed to compile.  The error log is:" +
            gl.getShaderInfoLog(vertexShader);

        console.error(error, addLineNumbers(vertexShaderStr));

        gl.deleteShader(vertexShader);
        return null;
    }

    // 栅格着色器
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(fragmentShader, fragmentShaderStr);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        const error =
            "Fragment shader failed to compile.  The error log is:" +
            gl.getShaderInfoLog(fragmentShader);

        console.error(error, addLineNumbers(fragmentShaderStr));

        gl.deleteShader(fragmentShader);
        return null;
    }

    // 创建webgl程序
    program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    gl.linkProgram(program);

    // 程序编译完成
    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
        return program;
    } else {
        const error =
            "Shader program failed to link.  The error log is:" +
            gl.getProgramInfoLog(program);

        console.error(error);

        gl.deleteProgram(program);
        return null;
    }
}

export default class Program {
    constructor(gl, options, layer) {
        this.gl = gl;

        this.parameters = getParameters(options, layer);
        this.effects = this.parameters.effects;

        if (layer) {
            this.layer = layer;
            this.map = layer.map;
        }

        // 取得着色器代码并进行预处理
        const { vertexShader, fragmentShader } = this.parameters;

        // 定义相关defines
        const customDefines = generateDefines(this.parameters.defines);

        // 预编译相关代码
        const vertexGlsl = [
            customDefines,
            this.getShader(vertexShader, "vert"),
        ].join("\n");

        const fragmentGlsl = [
            customDefines,
            this.getShader(fragmentShader, "frag"),
        ].join("\n");

        // 初始化program
        const program = (this.program = createAndLinkProgram(
            gl,
            vertexGlsl,
            fragmentGlsl
        ));

        this.textures = new Textures(gl);
        this.attributes = fetchAttributeLocations(gl, program);
        this.uniforms = new Uniforms(gl, program);
    }

    getShader(shaderStr, type) {
        // 替换 originMain
        shaderStr = shaderStr.replace("void main", "void originMain");
        shaderStr = shaderChunk["_template_" + type].replace(
            "#pragma ORIGIN_MAIN",
            shaderStr
        );

        // 没有effects相关时
        if (this.effects.isEmpty) {
            shaderStr = shaderStr.replace(
                new RegExp("#include <effects_[a-zA-Z_]*>", "g"),
                ""
            );
        }

        // 解析include相关
        shaderStr = resolveIncludes(shaderStr);
        shaderStr = replaceEffectNums(shaderStr, this.effects);
        shaderStr = unrollLoops(shaderStr);

        // 剔除无效的定义
        return shaderStr.replace(/#define GLSLIFY 1\n/g, "");
    }

    use(gl) {
        this.gl = gl;
        gl.useProgram(this.program);

        // 重置纹理索引
        this.textures.resetTextureUnits();

        // 窗口大小信息
        this.uniforms.setValue(
            gl,
            "MAPV_resolution",
            [gl.canvas.width, gl.canvas.height],
            this.textures
        );

        // 更新effect信息
        this.effects.update(this);
    }

    setUniform(uniformName, data) {
        this.uniforms.setValue(this.gl, uniformName, data, this.textures);
    }

    setUniforms(uniformObjs) {
        for (const key in uniformObjs) this.setUniform(key, uniformObjs[key]);
    }
}
