import preludeVert from "../shaders/_prelude.vertex.glsl";
import preludeFrag from "../shaders/_prelude.fragment.glsl";

import Uniforms from "./Uniforms";
import Textures from "./Textures";

export default class Program {
    constructor(gl, options, layer) {
        this.gl = gl;
        this.options = options;

        layer && (this.map = layer.map);

        let program = false;
        const vertexShaderStr = this.getVertexShader(options.vertexShader);
        const fragmentShaderStr = this.getFragmentShader(
            options.fragmentShader
        );

        // 顶点着色器
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexShaderStr);
        gl.compileShader(vertexShader);
        // 顶点着色器编译完成
        if (gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            // 栅格着色器
            const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fragmentShader, fragmentShaderStr);
            gl.compileShader(fragmentShader);
            // 栅格着色器编译完成
            if (gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
                // 创建webgl程序
                program = gl.createProgram();
                gl.attachShader(program, vertexShader);
                gl.attachShader(program, fragmentShader);
                gl.deleteShader(vertexShader);
                gl.deleteShader(fragmentShader);
                gl.linkProgram(program);

                // 程序编译完成
                if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
                    this.program = program;
                } else {
                    const error =
                        "Shader program failed to link.  The error log is:" +
                        gl.getProgramInfoLog(program);
                    console.error(error);
                }
            } else {
                const error =
                    "Fragment shader failed to compile.  The error log is:" +
                    gl.getShaderInfoLog(fragmentShader);
                console.error(error);
            }
        } else {
            const error =
                "Vertex shader failed to compile.  The error log is:" +
                gl.getShaderInfoLog(vertexShader);
            console.error(error);
        }

        // 查询可用属性
        const attributes = {},
            numAttributes = gl.getProgramParameter(
                program,
                gl.ACTIVE_ATTRIBUTES
            );
        for (let i = 0; i < numAttributes; i++) {
            const attribute = gl.getActiveAttrib(program, i);
            attributes[attribute.name] = gl.getAttribLocation(
                program,
                attribute.name
            );
        }

        this.attributes = attributes;

        this.textures = new Textures(gl);
        this.uniforms = new Uniforms(gl, program);
    }

    getVertexShader(shaderStr) {
        const definedStr = preludeVert + "\n";
        shaderStr = this.getDefines() + definedStr + shaderStr;
        shaderStr = shaderStr.replace("void main", "void originMain");
        return shaderStr + "\nvoid main() {originMain(); afterMain();}";
    }

    getFragmentShader(shaderStr) {
        const definedStr = preludeFrag + "\n";
        shaderStr = this.getDefines() + definedStr + shaderStr;
        shaderStr = shaderStr.replace("void main", "void originMain");
        return shaderStr + "\nvoid main() {originMain(); afterMain();}";
    }

    getDefines() {
        let str = "";
        const defines = this.options.defines;
        if (defines) {
            for (let index = 0; index < defines.length; index++) {
                str += `#define ${defines[index]} \n`;
            }
        }
        return str;
    }

    use(gl) {
        this.gl = gl;
        gl.useProgram(this.program);

        // 重置纹理索引
        this.textures.resetTextureUnits();

        // cesium支持
        if (this.map && "cesium" === this.map.type) {
            this.setUniforms({
                oneOverLog2FarDepthFromNearPlusOne: this.map.map.scene.context
                    ._us._oneOverLog2FarDepthFromNearPlusOne,
                farDepthFromNearPlusOne: this.map.map.scene.context._us
                    ._farDepthFromNearPlusOne,
            });
        }

        // 窗口坐标
        if (this.uniforms.MAPV_resolution) {
            this.setUniforms({
                MAPV_resolution: [gl.canvas.width, gl.canvas.height],
            });
        }
    }

    setUniform(uniformName, data) {
        this.uniforms.setValue(this.gl, uniformName, data, this.textures);
    }

    setUniforms(uniformObjs) {
        for (const key in uniformObjs) this.setUniform(key, uniformObjs[key]);
    }
}
