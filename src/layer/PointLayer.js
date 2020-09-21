export default class PointLayer{
    constructor(){
        this.bufferData = []
    }
    
    getDefaultOptions() {
        return {
            color: [.1, .1, .9, 1],
            blend: "normal",
            shape: "circle",
            size: 5
        }
    }
    
    initialize(gl) {
        this.gl = gl;
        let b = this.getOptions();
        this.program = new V(this.gl, {
            vertexShader: "attribute vec3 aPos;attribute vec4 aColor;attribute float aSize;uniform mat4 uMatrix;varying vec4 vColor;uniform vec4 uSelectedColor;void main(void){if(aColor.w>=0.0&&aColor.w<=1.0){vColor=aColor;}else{vColor=vec4(aColor.xyz,1.0);}gl_Position=uMatrix*vec4(aPos.xyz,1.0);gl_PointSize=aSize;\n#if defined(PICK)\nif(mapvIsPicked()){vColor=uSelectedColor;}\n#endif\n}",
            fragmentShader: "varying vec4 vColor;uniform int uShape;void main(void){vec4 color=vColor;if(uShape==1){float d=distance(gl_PointCoord,vec2(0.5,0.5));if(d>0.5){discard;}float blur=1.0;blur=1.0-smoothstep(0.49,0.5,d);color.a*=blur;gl_FragColor=color;}else{gl_FragColor=color;}}",
            defines: []
        },
        this);
        this.buffer = new H({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW"
        });
        b = [{
            stride: 32,
            name: "aPos",
            buffer: this.buffer,
            size: 3,
            type: "FLOAT",
            offset: 0
        },
        {
            stride: 32,
            name: "aColor",
            buffer: this.buffer,
            size: 4,
            type: "FLOAT",
            offset: 12
        },
        {
            stride: 32,
            name: "aSize",
            buffer: this.buffer,
            size: 1,
            type: "FLOAT",
            offset: 28
        }];
        b = b.concat(this.getCommonAttributes());
        this.vertexArray = new va({
            gl: gl,
            program: this.program,
            attributes: b
        })
    }
    
    onChanged(a, c) {
        if (this.gl) {
            for (var b = [], d = a.color, k = a.size, h = 0; h < c.length; h++) {
                let l = this.normizedPoint(c[h].geometry.coordinates),
                n = c[h].color || d;
                "properties" in c[h] && "color" in c[h].properties && (n = c[h].properties.color);
                "[object Function]" === Object.prototype.toString.call(n) && (n = n(c[h]));
                n = this.normizedColor(n);
                let p = c[h].size || k;
                "properties" in c[h] && "size" in c[h].properties && (p = c[h].properties.size);
                p = "[object Function]" === Object.prototype.toString.call(p) ? p(c[h]) : Number(p);
                l = this.addMultipleCoords(l);
                for (let m = 0; m < l.length; m++) {
                    const q = l[m];
                    b.push(q[0], q[1], Number(q[2] || 0));
                    b.push(n[0], n[1], n[2], n[3]);
                    b.push(p * window.devicePixelRatio)
                }
            }
            this.bufferData = b;
            this.buffer.updateData(new Float32Array(b));
        }
    }
    
    destroy() {
        this.buffer = this.program = this.bufferData = null
    }
    
    render(a) {
        let b = a.gl,
        c = a.matrix,
        g = a.isPickRender;
        if (! (0 >= this.bufferData.length)) {
            this.getOptions();
            const k = this.program;
            k.use(b);
            this.vertexArray.bind();
            let h = 1;
            this.options.shape && If[this.options.shape] && (h = If[this.options.shape]);
            a = this.getCommonUniforms(a);
            a = T(a, {
                uShape: h,
                uMatrix: c
            });
            k.setUniforms(a);
            c = this.options.blend;
            g ? b.disable(b.BLEND) : (b.enable(b.BLEND), b.blendEquation(b.FUNC_ADD), c && "lighter" === c ? b.blendFunc(b.SRC_ALPHA, b.ONE) : b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA));
            b.drawArrays(b.POINTS, 0, this.bufferData.length / 8)
        }
    }
}
