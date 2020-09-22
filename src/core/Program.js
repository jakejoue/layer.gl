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

        // 查询可用统一变量
        const uniforms = {},
            uniformType = {},
            numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < numUniforms; i++) {
            const uniform = gl.getActiveUniform(program, i);
            uniforms[uniform.name] = gl.getUniformLocation(
                program,
                uniform.name
            );
            uniformType[uniform.name] = uniform.type;
        }

        this.parameter = {
            attributes: attributes,
            numAttributes: numAttributes,
            uniformsType: uniformType,
            uniforms: uniforms,
        };
        this.attributes = attributes;
        this.uniforms = uniforms;
    }

    getVertexShader(shaderStr) {
        let definedStr = "";
        // cesium
        if (this.map && "cesium" === this.map.type) {
            definedStr = "#define LOG_DEPTH\n";
        }
        definedStr += `// 相关defined的后处理函数
        // cesium支持（暂时保留）
        #ifdef LOG_DEPTH
        varying float v_depthFromNearPlusOne;
        #endif

        // 地图范围
        uniform vec2 MAPV_resolution;

        // pick支持（暂时屏蔽）
        #if defined(PICK)
        uniform bool uIsPickRender;
        attribute vec3 aPickColor;
        uniform vec3 uPickedColor;
        varying vec4 vPickColor;
        uniform bool uEnablePicked;
        bool mapvIsPicked() {
            return uEnablePicked && aPickColor == uPickedColor;
        }
        #endif

        void afterMain() {
            // cesium后处理
            #if defined(LOG_DEPTH)
            v_depthFromNearPlusOne = (gl_Position.w - 0.1) + 1.0;
            gl_Position.z = clamp(gl_Position.z / gl_Position.w, -1.0, 1.0) * gl_Position.w;
            #endif

            // pick后处理
            #if defined(PICK)
            vPickColor = vec4(aPickColor, 0.0);
            if (mapvIsPicked()) {
                vPickColor.a=1.0;
            }
            #endif
        }`;
        shaderStr = this.getDefines() + definedStr + shaderStr;
        shaderStr = shaderStr.replace("void main", "void originMain");
        return shaderStr + "void main() {originMain(); afterMain();}";
    }

    getFragmentShader(shaderStr) {
        let definedStr = "";
        // cesium
        if (this.map && "cesium" === this.map.type) {
            definedStr = "#define LOG_DEPTH\n";
        }
        definedStr += `// 相关后处理函数
        #if defined(LOG_DEPTH)
        #extension GL_EXT_frag_depth : enable
        #endif

        precision highp float;
        uniform vec2 MAPV_resolution;

        #if defined(PICK)
        uniform bool uIsPickRender;
        varying vec4 vPickColor;
        bool mapvIsPicked() {
            return vPickColor.a == 1.0;
        }
        #endif

        #if defined(LOG_DEPTH)
        uniform float oneOverLog2FarDepthFromNearPlusOne;
        uniform float farDepthFromNearPlusOne;
        varying float v_depthFromNearPlusOne;
        void writeLogDepth(float depth) {
            if(depth <= 0.9999999 || depth > farDepthFromNearPlusOne) {
                discard;
            }
            gl_FragDepthEXT = log2(depth) * oneOverLog2FarDepthFromNearPlusOne;
        }
        #endif

        void afterMain() {
            #if defined(PICK)
            if(uIsPickRender) {
                gl_FragColor = vec4(vPickColor.rgb, 1.0);
                return;
            }
            #endif
            #if defined(LOG_DEPTH)
            writeLogDepth(v_depthFromNearPlusOne);
            #endif
        }`;
        shaderStr = this.getDefines() + definedStr + shaderStr;
        shaderStr = shaderStr.replace("void main", "void originMain");
        return shaderStr + "void main() {originMain(); afterMain();}";
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

    use(gl, a) {
        this.gl = gl;
        gl.useProgram(this.program);

        // cesium支持
        if (this.map && "cesium" === this.map.type) {
            this.setUniforms({
                oneOverLog2FarDepthFromNearPlusOne: this.map.map.scene.context
                    ._us._oneOverLog2FarDepthFromNearPlusOne,
                farDepthFromNearPlusOne: this.map.map.scene.context._us
                    ._farDepthFromNearPlusOne,
            });
        }

        this.uniforms.MAPV_resolution &&
            this.setUniforms({
                MAPV_resolution: [gl.canvas.width, gl.canvas.height],
            });
    }

    setUniform(uniformName, data) {
        const gl = this.gl,
            uniformLocation = this.uniforms[uniformName];
        if (uniformLocation)
            switch (this.parameter.uniformsType[uniformName]) {
                case gl.FLOAT:
                    gl.uniform1f(uniformLocation, data);
                    break;
                case gl.FLOAT_VEC2:
                    gl.uniform2f(uniformLocation, data[0], data[1]);
                    break;
                case gl.FLOAT_VEC3:
                    gl.uniform3f(uniformLocation, data[0], data[1], data[2]);
                    break;
                case gl.FLOAT_VEC4:
                    gl.uniform4f(
                        uniformLocation,
                        data[0],
                        data[1],
                        data[2],
                        data[3]
                    );
                    break;
                case gl.SAMPLER_2D:
                case gl.SAMPLER_CUBE:
                    gl.activeTexture(gl["TEXTURE" + this.textureIndex]);
                    gl.uniform1i(uniformLocation, this.textureIndex);
                    gl.bindTexture(gl.TEXTURE_2D, data);
                    this.textureIndex++;
                    break;
                case gl.INT:
                case gl.BOOL:
                    gl.uniform1i(uniformLocation, data);
                    break;
                case gl.INT_VEC2:
                case gl.BOOL_VEC2:
                    gl.uniform2i(uniformLocation, data[0], data[1]);
                    break;
                case gl.INT_VEC3:
                case gl.BOOL_VEC3:
                    gl.uniform3i(uniformLocation, data[0], data[1], data[2]);
                    break;
                case gl.INT_VEC4:
                case gl.BOOL_VEC4:
                    gl.uniform4i(
                        uniformLocation,
                        data[0],
                        data[1],
                        data[2],
                        data[3]
                    );
                    break;
                case gl.FLOAT_MAT2:
                    gl.uniformMatrix2fv(uniformLocation, false, data);
                    break;
                case gl.FLOAT_MAT3:
                    gl.uniformMatrix3fv(uniformLocation, false, data);
                    break;
                case gl.FLOAT_MAT4:
                    gl.uniformMatrix4fv(uniformLocation, false, data);
                    break;
                default:
                    console.error("Unrecognized uniform type: " + uniformName);
            }
        else console.warn("Unrecognized uniform type: " + uniformName);
    }

    setUniforms(uniformObjs) {
        this.textureIndex = 0;
        for (const key in uniformObjs) this.setUniform(key, uniformObjs[key]);
    }
}
