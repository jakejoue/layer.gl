import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

export default class LineLayer extends Layer {
    constructor(options) {
        super(options);
    }
    
    getDefaultOptions() {
        return {
            style: "normal",
            styleOptions: {},
            color: "rgba(25, 25, 250, 1)",
            blend: "normal",
            lineJoin: "miter",
            lineCap: "butt",
            width: 4,
            offset: 0,
            antialias: false,
            dashArray: [0, 0],
            dashOffset: 0,
            animation: false,
            interval: 0.1,
            duration: 2,
            trailLength: 0.5,
            minZoom: 4,
            maxZoom: 21,
        };
    }

    initialize(a) {
        this.gl = a;
        let b = this.getOptions(),
            c = [];
        b.enablePicked && c.push("PICK");
        Lf[b.style] && ((this.isUseTexture = true), c.push("USE_TEXTURE"));
        !0 === b.animation &&
            ((this.isAnimateLine = true),
            (this.date = new Date()),
            (this.autoUpdate = true),
            c.push("USE_LINE_ANIMATION"));
        this.program = new Program(
            this.gl,
            {
                vertexShader:
                    "precision highp float;uniform vec4 uSelectedColor;uniform mat4 u_matrix;uniform vec2 u_dash_array;uniform float u_zoom_units;uniform float u_offset;attribute vec4 a_color;attribute vec3 a_position;attribute vec3 a_normal;attribute float a_distance;attribute float a_total_distance;attribute float a_width;\n#if defined(USE_TEXTURE)\nattribute vec2 uv;\n#endif\nvarying vec4 v_color;varying vec2 v_normal;varying vec2 v_uv;varying vec2 v_dash_array;varying float v_total_distance;varying float v_counter;varying float v_width;void main(){v_width=a_width;v_color=a_color;v_counter=a_distance/a_total_distance;v_dash_array=u_zoom_units*u_dash_array/a_total_distance;v_total_distance=a_total_distance;v_normal=vec2(normalize(a_normal.xy)*sign(a_width));\n#if defined(USE_TEXTURE)\nv_uv=uv;\n#endif\n#if defined(PICK)\nif(mapvIsPicked()){v_color=uSelectedColor;}\n#endif\nvec2 extrude=a_normal.xy*a_width/2.0*u_zoom_units;vec2 offsetXY=a_normal.xy*u_offset;float offsetZ=u_offset*u_zoom_units/100.0;gl_Position=u_matrix*vec4(a_position.xy+extrude+offsetXY,a_position.z+offsetZ,1.0);}",
                fragmentShader:
                    "precision highp float;varying vec4 v_color;varying vec2 v_normal;varying vec2 v_uv;varying vec2 v_dash_array;varying float v_counter;varying float v_total_distance;varying float v_width;uniform bool u_antialias;uniform float u_dash_offset;uniform float u_zoom_units;\n#if defined(USE_LINE_ANIMATION)\nuniform bool u_animate;uniform float u_time;uniform float u_duration;uniform float u_interval;uniform float u_trail_length;\n#endif\n#if defined(USE_TEXTURE)\nuniform float u_texture_width;uniform float u_texture_margin;uniform sampler2D u_sampler;\n#endif\nvoid main(){vec4 color=v_color;if(u_antialias){float blur=1.0;blur=1.0-smoothstep(0.9,1.0,length(v_normal));color.a*=blur;}\n#if defined(USE_LINE_ANIMATION)\nif(u_animate){float alpha=1.0-fract(mod(1.0-v_counter,u_interval)*(1.0/u_interval)+u_time/u_duration);alpha=(alpha+u_trail_length-1.0)/u_trail_length;color.a*=alpha;gl_FragColor=color;return;}\n#endif\n#if defined(USE_TEXTURE)\nfloat margin_width=u_texture_margin*u_zoom_units;float margin_width_half=margin_width/2.0;float texture_width=u_texture_width*u_zoom_units;float delta=mod(v_uv.x,texture_width+margin_width);if(delta>=margin_width_half&&delta<=margin_width_half+texture_width){float uvx=(delta-margin_width_half)/texture_width;vec4 texture=texture2D(u_sampler,vec2(uvx,v_uv.y));color=texture.a>=0.5 ? texture : color;}\n#endif\nif(v_dash_array.y>0.0){float offset=u_dash_offset*u_zoom_units/v_total_distance;color.a*=(1.0-step(v_dash_array.x,mod(v_counter+offset,v_dash_array.x+v_dash_array.y)));}gl_FragColor=color;}",
                defines: c,
            },
            this
        );
        this.positionBuffer = new Buffer({
            gl: a,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.colorBuffer = new Buffer({
            gl: a,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.normalBuffer = new Buffer({
            gl: a,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.indexBuffer = new Buffer({
            gl: a,
            target: "ELEMENT_ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        c = [
            {
                stride: 24,
                name: "a_position",
                buffer: this.positionBuffer,
                size: 3,
                type: "FLOAT",
                offset: 0,
            },
            {
                stride: 24,
                name: "a_distance",
                buffer: this.positionBuffer,
                size: 1,
                type: "FLOAT",
                offset: 12,
            },
            {
                stride: 24,
                name: "a_width",
                buffer: this.positionBuffer,
                size: 1,
                type: "FLOAT",
                offset: 16,
            },
            {
                stride: 24,
                name: "a_total_distance",
                buffer: this.positionBuffer,
                size: 1,
                type: "FLOAT",
                offset: 20,
            },
            {
                stride: 12,
                name: "a_normal",
                buffer: this.normalBuffer,
                size: 3,
                type: "FLOAT",
                offset: 0,
            },
            {
                stride: 16,
                name: "a_color",
                buffer: this.colorBuffer,
                size: 4,
                type: "FLOAT",
                offset: 0,
            },
        ];
        c = c.concat(this.getCommonAttributes());
        this.isUseTexture &&
            ((this.uvBuffer = new Buffer({
                gl: a,
                target: "ARRAY_BUFFER",
                usage: "STATIC_DRAW",
            })),
            c.push({
                stride: 8,
                name: "uv",
                buffer: this.uvBuffer,
                size: 2,
                type: "FLOAT",
                offset: 0,
            }),
            (b = (0, Lf[b.style])(b.styleOptions)),
            this.setOptions({
                texture: b,
            }),
            this.loadTexture());
        this.vertexArray = new VertexArray({
            gl: a,
            program: this.program,
            attributes: c,
        });
    }

    onChanged(a, c) {
        const b = this;
        if (this.gl) {
            let d = a.dashArray,
                h = a.color;
            d = !!this.isUseTexture || !!d[1] || !!this.isAnimateLine;
            let k = new zi({
                    dash: d,
                    cap: a.lineCap,
                    join: a.lineJoin,
                    miterLimit: a.miterLimit,
                    thickness: a.width,
                }),
                l = [],
                m = function (d) {
                    let e = c[d].geometry.coordinates;
                    e &&
                        0 < e.length &&
                        ("Polygon" !== c[d].geometry.type &&
                            "MultiLineString" !== c[d].geometry.type &&
                            (e = [e]),
                        (e = e.map(function (a) {
                            return a.map(function (a) {
                                return b.normizedPoint(a);
                            });
                        })));
                    let g = c[d].color || h;
                    "properties" in c[d] &&
                        "color" in c[d].properties &&
                        (g = c[d].properties.color);
                    "[object Function]" === Object.prototype.toString.call(g) &&
                        (g = g(c[d]));
                    g = b.normizedColor(g);
                    let n = k.complex.startIndex;
                    e = b.addMultipleCoords(e);
                    for (let m = 0; m < e.length; m++)
                        e[m].forEach(function (a) {
                            k.extrude(a, g);
                        });
                    if (a.enablePicked)
                        for (
                            d = b.indexToRgb(d), e = k.complex.startIndex;
                            n < e;
                            n++
                        )
                            l.push(d[0] / 255, d[1] / 255, d[2] / 255),
                                a.repeat &&
                                    (l.push(d[0] / 255, d[1] / 255, d[2] / 255),
                                    l.push(d[0] / 255, d[1] / 255, d[2] / 255));
                },
                p = 0;
            for (; p < c.length; p++) m(p);
            m = k.complex;
            if (d)
                for (p = 0; p < m.positions.length / 6; p++)
                    m.positions[6 * p + 5] = m.maxDistance;
            this.lineData = m;
            this.positionBuffer.updateData(new Float32Array(m.positions));
            this.normalBuffer.updateData(new Float32Array(m.normals));
            this.colorBuffer.updateData(new Float32Array(m.colors));
            this.indexBuffer.updateData(new Uint32Array(m.indices));
            this.isUseTexture &&
                this.uvBuffer.updateData(new Float32Array(m.uvs));
            a.enablePicked && this.pickBuffer.updateData(new Float32Array(l));
        }
    }

    render(a) {
        let b = a.gl,
            c = a.matrix,
            g = this.lineData;
        if (g && !(0 >= g.indices.length) && this.map) {
            const h = this.getOptions(),
                k = this.program;
            k.use(b);
            a = U(this.getCommonUniforms(a), {
                u_matrix: c,
                u_zoom_units: this.map.getZoomUnits(),
                u_dash_array: h.dashArray,
                u_dash_offset: h.dashOffset,
                u_antialias: h.antialias,
                u_offset: h.offset,
            });
            this.isUseTexture &&
                (a = U(a, {
                    u_texture_width: h.width,
                    u_texture_margin: 140,
                    u_sampler: this.texture,
                }));
            this.isAnimateLine &&
                ((c = this.map.getZoom()),
                (a = U(a, {
                    u_time: (new Date() - this.date) / 1e3,
                    u_animate:
                        c >= h.minZoom && c <= h.maxZoom && this.autoUpdate
                            ? true
                            : false,
                    u_duration: h.duration,
                    u_interval: h.interval,
                    u_trail_length: h.trailLength,
                })));
            k.setUniforms(a);
            b.enable(b.BLEND);
            b.blendEquation(b.FUNC_ADD);
            h.blend && "lighter" === h.blend
                ? b.blendFunc(b.SRC_ALPHA, b.ONE)
                : b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
            this.indexBuffer.bind();
            this.vertexArray.bind();
            b.drawElements(b.TRIANGLES, g.indices.length, b.UNSIGNED_INT, 0);
            b.bindBuffer(b.ARRAY_BUFFER, null);
            b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, null);
            b.disable(b.BLEND);
        }
    }

    loadTexture(a) {
        const b = this,
            c = this.getOptions();
        c.texture
            ? Ma(this.gl, c.texture, function (c, d) {
                  b.image = d;
                  b.texture = c;
                  a && a();
                  b.webglLayer.render();
              })
            : ((this.image = this.texture = null), a && a());
    }
}
