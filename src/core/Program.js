export default class Program {
    constructor(gl, options, layer) {
        this.gl = gl;
        this.options = options;
        
        layer && (this.map = layer.map);
        layer = this.getVertexShader(options.vertexShader);
        let d = this.getFragmentShader(options.fragmentShader);
        options = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(options, layer);
        gl.compileShader(options);
        gl.getShaderParameter(options, gl.COMPILE_STATUS) ? (layer = gl.createShader(gl.FRAGMENT_SHADER), gl.shaderSource(layer, d), gl.compileShader(layer), gl.getShaderParameter(layer, gl.COMPILE_STATUS) ? (d = gl.createProgram(), gl.attachShader(d, options), gl.attachShader(d, layer), gl.deleteShader(options), gl.deleteShader(layer), gl.linkProgram(d), gl.getProgramParameter(d, gl.LINK_STATUS) ? options = d: (options = "Shader program failed to link.  The error log is:" + gl.getProgramInfoLog(d), console.error(options), options = -1)) : (options = "Fragment shader failed to compile.  The error log is:" + gl.getShaderInfoLog(layer), console.error(options), options = -1)) : (options = "Vertex shader failed to compile.  The error log is:" + gl.getShaderInfoLog(options), console.error(options), options = -1);
        options = this.program = options;
        layer = {};
        d = gl.getProgramParameter(options, gl.ACTIVE_ATTRIBUTES);
        for (let e = 0; e < d; e++) {
            const g = gl.getActiveAttrib(options, e);
            layer[g.name] = gl.getAttribLocation(options, g.name)
        }
        e = {};
        g = {};
        for (let k = gl.getProgramParameter(options, gl.ACTIVE_UNIFORMS), h = 0; h < k; h++) {
            const l = gl.getActiveUniform(options, h);
            e[l.name] = gl.getUniformLocation(options, l.name);
            g[l.name] = l.type
        }
        this.parameter = gl = {
            attributes: layer,
            numAttributes: d,
            uniformsType: g,
            uniforms: e
        };
        this.attributes = gl.attributes;
        this.uniforms = gl.uniforms;
        this.parameter = gl
    }

    getVertexShader(c) {
        let a = "";
        this.map && "cesium" === this.map.type && (a = "#define LOG_DEPTH\n");
        a += "#ifdef LOG_DEPTH\nvarying float v_depthFromNearPlusOne;\n#endif\nuniform vec2 MAPV_resolution;\n#if defined(PICK)\nuniform bool uIsPickRender;attribute vec3 aPickColor;uniform vec3 uPickedColor;varying vec4 vPickColor;uniform bool uEnablePicked;bool mapvIsPicked(){return uEnablePicked&&aPickColor==uPickedColor;}\n#endif\nvoid afterMain(){\n#if defined(LOG_DEPTH)\nv_depthFromNearPlusOne=(gl_Position.w-0.1)+1.0;gl_Position.z=clamp(gl_Position.z/gl_Position.w,-1.0,1.0)*gl_Position.w;\n#endif\n#if defined(PICK)\nvPickColor=vec4(aPickColor,0.0);if(mapvIsPicked()){vPickColor.a=1.0;}\n#endif\n}";
        c = this.getDefines() + a + c;
        c = c.replace("void main", "void originMain");
        return c + "void main() {originMain(); afterMain();}"
    }

    getFragmentShader(c) {
        let a = "";
        this.map && "cesium" === this.map.type && (a = "#define LOG_DEPTH\n");
        a += "#if defined(LOG_DEPTH)\n#extension GL_EXT_frag_depth : enable\n#endif\nprecision highp float;uniform vec2 MAPV_resolution;\n#if defined(PICK)\nuniform bool uIsPickRender;varying vec4 vPickColor;bool mapvIsPicked(){return vPickColor.a==1.0;}\n#endif\n#if defined(LOG_DEPTH)\nuniform float oneOverLog2FarDepthFromNearPlusOne;uniform float farDepthFromNearPlusOne;varying float v_depthFromNearPlusOne;void writeLogDepth(float depth){if(depth<=0.9999999||depth>farDepthFromNearPlusOne){discard;}gl_FragDepthEXT=log2(depth)*oneOverLog2FarDepthFromNearPlusOne;}\n#endif\nvoid afterMain(){\n#if defined(PICK)\nif(uIsPickRender){gl_FragColor=vec4(vPickColor.rgb,1.0);return;}\n#endif\n#if defined(LOG_DEPTH)\nwriteLogDepth(v_depthFromNearPlusOne);\n#endif\n}";
        c = this.getDefines() + a + c;
        c = c.replace("void main", "void originMain");
        return c + "void main() {originMain(); afterMain();}"
    }

    getDefines() {
        let c = "",
        a = this.options.defines;
        if (a) for (let b = 0; b < a.length; b++) c += "#define " + a[b] + "\n";
        return c
    }

    use(c, a) {
        this.gl = c;
        c.useProgram(this.program);
        this.map && "cesium" === this.map.type && this.setUniforms({
            oneOverLog2FarDepthFromNearPlusOne: this.map.map.scene.context._us._oneOverLog2FarDepthFromNearPlusOne,
            farDepthFromNearPlusOne: this.map.map.scene.context._us._farDepthFromNearPlusOne
        });
        this.uniforms.MAPV_resolution && this.setUniforms({
            MAPV_resolution: [c.canvas.width, c.canvas.height]
        })
    }

    setUniform(c, a) {
        const b = this.gl,
        d = this.uniforms[c];
        if (d) switch (this.parameter.uniformsType[c]) {
        case b.FLOAT:
            b.uniform1f(d, a);
            break;
        case b.FLOAT_VEC2:
            b.uniform2f(d, a[0], a[1]);
            break;
        case b.FLOAT_VEC3:
            b.uniform3f(d, a[0], a[1], a[2]);
            break;
        case b.FLOAT_VEC4:
            b.uniform4f(d, a[0], a[1], a[2], a[3]);
            break;
        case b.SAMPLER_2D:
        case b.SAMPLER_CUBE:
            b.activeTexture(b["TEXTURE" + this.textureIndex]);
            b.uniform1i(d, this.textureIndex);
            b.bindTexture(b.TEXTURE_2D, a);
            this.textureIndex++;
            break;
        case b.INT:
        case b.BOOL:
            b.uniform1i(d, a);
            break;
        case b.INT_VEC2:
        case b.BOOL_VEC2:
            b.uniform2i(d, a[0], a[1]);
            break;
        case b.INT_VEC3:
        case b.BOOL_VEC3:
            b.uniform3i(d, a[0], a[1], a[2]);
            break;
        case b.INT_VEC4:
        case b.BOOL_VEC4:
            b.uniform4i(d, a[0], a[1], a[2], a[3]);
            break;
        case b.FLOAT_MAT2:
            b.uniformMatrix2fv(d, !1, a);
            break;
        case b.FLOAT_MAT3:
            b.uniformMatrix3fv(d, !1, a);
            break;
        case b.FLOAT_MAT4:
            b.uniformMatrix4fv(d, !1, a);
            break;
        default:
            console.error("Unrecognized uniform type: " + c)
        } else console.warn("Unrecognized uniform type: " + c)
    }

    setUniforms(c) {
        this.textureIndex = 0;
        for (const a in c) this.setUniform(a, c[a])
    }
}