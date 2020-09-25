import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

export default class IconLayer extends Layer {
    constructor(options) {
        super(options);
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.textAlign = "start";
        this.ctx.textBaseline = "top";
    }

    getDefaultOptions() {
        return {
            padding: [0, 0],
        };
    }

    initialize(gl) {
        this.gl = gl;
        this.texture = null;
        this.program = new Program(
            this.gl,
            {
                vertexShader: `precision highp float;
                attribute vec3 a_pos;
                attribute float a_corner;
                attribute vec2 a_size;
                attribute vec2 a_offset;
                attribute vec2 a_texture_coord;
                uniform mat4 u_matrix;
                uniform vec2 u_size;
                uniform vec2 u_offset;
                uniform float devicePixelRatio;
                varying vec2 v_texture_coord;
                vec3 transformCoord(vec3 coord,vec2 size,float corner) {
                    float x = coord.x;
                    float y = coord.y;
                    if(corner == 1.0) {
                        x -= size[0];
                        y += size[1];
                    } else if(corner == 2.0) {
                        x += size[0];
                        y += size[1];
                    } else if(corner == 3.0) {
                        x += size[0];
                        y -= size[1];
                    } else {
                        x -= size[0];
                        y -= size[1];
                    }
                    return vec3(x,y,coord.z);
                }

                void main() {
                    v_texture_coord = a_texture_coord;
                    vec4 position = u_matrix * vec4(a_pos, 1.0);
                    vec3 screen = position.xyz / position.w;
                    vec2 halfSize = a_size / MAPV_resolution * devicePixelRatio;
                    vec3 current = transformCoord(screen, halfSize, a_corner);
                    current.xy = current.xy - a_offset * 2.0 / MAPV_resolution * devicePixelRatio;
                    gl_Position = vec4(current, 1.0);
                }`,
                fragmentShader: `precision highp float;
                varying vec2 v_texture_coord;
                uniform sampler2D u_icon;
                uniform vec4 uSelectedColor;
                void main() {
                    vec4 textureColor = texture2D(u_icon, vec2(v_texture_coord.x, 1.0 - v_texture_coord.y));
                    if(textureColor.a == 0.0) {
                        discard;
                    }
                    gl_FragColor = textureColor;

                    #if defined(PICK)
                    if(mapvIsPicked()) {
                        gl_FragColor = vec4(uSelectedColor.rgb, gl_FragColor.a);
                    }
                    #endif
                }`,
                defines: this.getOptions().enablePicked ? ["PICK"] : [],
            },
            this
        );

        // 顶点
        this.vertexBuffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        // uv贴图
        this.uvBuffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        // 索引
        this.indexBuffer = new Buffer({
            gl: gl,
            target: "ELEMENT_ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });

        const attributes = [
            {
                name: "a_pos",
                buffer: this.vertexBuffer,
                size: 3,
                stride: 32,
                type: "FLOAT",
                offset: 0,
            },
            {
                name: "a_corner",
                buffer: this.vertexBuffer,
                size: 1,
                stride: 32,
                type: "FLOAT",
                offset: 12,
            },
            {
                name: "a_size",
                buffer: this.vertexBuffer,
                size: 2,
                stride: 32,
                type: "FLOAT",
                offset: 16,
            },
            {
                name: "a_offset",
                buffer: this.vertexBuffer,
                size: 2,
                stride: 32,
                type: "FLOAT",
                offset: 24,
            },
            {
                name: "a_texture_coord",
                buffer: this.uvBuffer,
                size: 2,
                stride: 8,
                type: "FLOAT",
                offset: 0,
            },
        ];
        attributes = attributes.concat(this.getCommonAttributes());
        this.vertexArray = new VertexArray({
            gl: gl,
            program: this.program,
            attributes: attributes,
        });
    }

    onChanged(options, data) {
        if (this.gl) {
            this.loadTextureTime && clearTimeout(this.loadTextureTime);

            this.loadTextureTime = setTimeout(() => {
                this.processCache(options, data);
            }, 0);
        }
    }

    processCache(options, data) {
        const b = this;
        this.cachedData = [];
        this.iconHash = new Map();
        for (
            let d = options.icon,
                k = options.width,
                h = options.height,
                l = options.offset,
                n = 0;
            n < data.length;
            n++
        ) {
            let point = this.normizedPoint(data[n].geometry.coordinates),
                icon = data[n].icon || d;
            "properties" in data[n] &&
                "icon" in data[n].properties &&
                (icon = data[n].properties.icon);
            let q = data[n].width || k;
            "properties" in data[n] &&
                "width" in data[n].properties &&
                (q = data[n].properties.width);
            let r = data[n].height || h;
            "properties" in data[n] &&
                "height" in data[n].properties &&
                (r = data[n].properties.height);
            let u = data[n].offset || l;
            "properties" in data[n] &&
                "offset" in data[n].properties &&
                (u = data[n].properties.offset);
            point &&
                icon &&
                (this.cachedData.push({
                    point: point,
                    icon: icon,
                    width: q,
                    height: r,
                    offset: u,
                }),
                (point = new Image()),
                this.iconHash.get(icon) || this.iconHash.set(icon, point));
        }
        data = Array.from(this.iconHash.keys()).map(function (a) {
            return new Promise((resolve, reject) => {
                b.url2canvas(a, function (d) {
                    b.iconHash.set(a, d);
                    resolve();
                });
            });
        });
        Promise.all(data).then(function (c) {
            b.buildSprite(options);
            b.webglLayer.render();
        });
    }

    buildSprite(a) {
        let b = a.padding,
            c = this.canvas,
            g = this.ctx,
            k = [],
            h = new Map(),
            l = !0,
            n = !1,
            p = void 0;
        try {
            for (
                var m = gd(this.iconHash), q;
                !(l = (q = m.next()).done);
                l = !0
            ) {
                const r = db(q.value, 2),
                    u = r[1],
                    w = u.width,
                    t = u.height;
                k.push({
                    w: w + b[0],
                    h: t + b[0],
                    width: w,
                    height: t,
                    key: r[0],
                    icon: u,
                });
            }
        } catch (z) {
            (n = !0), (p = z);
        } finally {
            try {
                !l && m.return && m.return();
            } finally {
                if (n) throw p;
            }
        }
        n = Ee(k);
        for (l = 0; l < k.length; l++)
            (p = k[l]), h.get(p.key) || h.set(p.key, p);
        l = Kb(n.w);
        n = Kb(n.h);
        c.width = l;
        c.height = n;
        g.save();
        for (c = 0; c < k.length; c++)
            (p = k[c]),
                g.drawImage(p.icon, p.x + b[0], p.y + b[1], p.width, p.height);
        g.restore();
        this.loadTexture();
        this.buildVertex(a, h, l, n);
    }

    buildVertex(a, c, e, g) {
        a = a.enablePicked;
        const b = [],
            d = [],
            l = [],
            n = [];
        for (let p = 0; p < this.cachedData.length; p++) {
            let m = this.cachedData[p],
                q = m.point,
                r = m.width,
                u = m.height,
                w = m.offset;
            m = c.get(m.icon);
            r = r || m.icon.width;
            u = u || m.icon.height;
            w = w || [0, -u / 2];
            let t = db(q, 3);
            q = t[0];
            const x = t[1];
            t = t[2];
            for (let v = 0; 4 > v; v++)
                b.push(q, x, t), b.push(v), b.push(r, u), b.push.apply(b, W(w));
            r = m.x / e;
            u = (m.x + m.w) / e;
            w = (m.y + m.h) / g;
            m = m.y / g;
            d.push(r, w, r, m, u, m, u, w);
            m = 4 * p;
            l.push(m, m + 2, m + 1, m, m + 3, m + 2);
            a &&
                ((m = this.indexToRgb(p)),
                n.push(m[0] / 255, m[1] / 255, m[2] / 255),
                n.push(m[0] / 255, m[1] / 255, m[2] / 255),
                n.push(m[0] / 255, m[1] / 255, m[2] / 255),
                n.push(m[0] / 255, m[1] / 255, m[2] / 255));
        }
        this.index = l;
        this.vertexBuffer.updateData(new Float32Array(b));
        this.uvBuffer.updateData(new Float32Array(d));
        this.indexBuffer.updateData(new Uint32Array(l));
        a && this.pickBuffer.updateData(new Float32Array(n));
    }
    render(a) {
        if (
            this.cachedData &&
            this.cachedData.length &&
            this.iconHash &&
            this.texture
        ) {
            const b = a.gl,
                c = a.matrix,
                g = this.program;
            g.use(b);
            b.enable(b.BLEND);
            b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
            g.setUniforms(
                Object.assign(this.getCommonUniforms(a), {
                    u_icon: this.texture,
                    u_matrix: c,
                    devicePixelRatio: window.devicePixelRatio,
                })
            );
            0 < this.index.length &&
                (this.indexBuffer.bind(),
                this.vertexArray.bind(),
                b.drawElements(
                    b.TRIANGLES,
                    this.index.length,
                    b.UNSIGNED_INT,
                    0
                ));
            b.useProgram(null);
        }
    }

    url2canvas(url, callback) {
        if ("object" === ("undefined" === typeof url ? "undefined" : qb(url)))
            callback(url);
        else {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = function () {
                const a = img.width,
                    d = img.height,
                    e = document.createElement("canvas");
                e.width = a;
                e.height = d;
                e.getContext("2d").drawImage(img, 0, 0, a, d);
                callback(e);
            };
            img.src = url;
        }
    }

    loadTexture() {
        const a = this;
        this.canvas
            ? Ka(this.gl, this.canvas, function (b) {
                  a.texture = b;
              })
            : (this.texture = null);
    }
}
