import shaderChunk from "../shaders/shaderChunk";
import shaderLib from "../shaders/shaderLib";

import Uniforms from "./Uniforms";
import Textures from "./Textures";

function addLineNumbers(string) {
    const lines = string.split("\n");

    for (let i = 0; i < lines.length; i++) {
        lines[i] = i + 1 + ": " + lines[i];
    }

    return lines.join("\n");
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

function initShaders(gl, vertexShaderStr, fragmentShaderStr) {
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
        this.options = options;

        layer && (this.map = layer.map);

        // 取得着色器代码并进行预处理
        const { vertexShader, fragmentShader } =
            shaderLib[options.shaderId] || options;

        // 定义相关defines
        const customDefines = generateDefines(options.defines);

        // 预编译相关代码
        const vertexShaderStr =
            customDefines + "\n" + this.getVertexShader(vertexShader);
        const fragmentShaderStr =
            customDefines + "\n" + this.getFragmentShader(fragmentShader);

        // 初始化program
        const program = (this.program = initShaders(
            gl,
            vertexShaderStr,
            fragmentShaderStr
        ));

        this.textures = new Textures(gl);
        this.attributes = fetchAttributeLocations(gl, program);
        this.uniforms = new Uniforms(gl, program);
    }

    getVertexShader(shaderStr) {
        shaderStr = resolveIncludes(shaderStr);
        shaderStr = shaderChunk._prelude_vert + "\n" + shaderStr;
        shaderStr = shaderStr.replace("void main", "void originMain");

        return shaderStr + "\nvoid main() {originMain(); afterMain();}";
    }

    getFragmentShader(shaderStr) {
        shaderStr = resolveIncludes(shaderStr);
        shaderStr = shaderChunk._prelude_frag + "\n" + shaderStr;
        shaderStr = shaderStr.replace("void main", "void originMain");

        return shaderStr + "\nvoid main() {originMain(); afterMain();}";
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
    }

    setUniform(uniformName, data) {
        this.uniforms.setValue(this.gl, uniformName, data, this.textures);
    }

    setUniforms(uniformObjs) {
        for (const key in uniformObjs) this.setUniform(key, uniformObjs[key]);
    }
}
