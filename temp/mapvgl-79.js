(function(z, T) {
    "object" === typeof exports && "undefined" !== typeof module ? T(exports) : "function" === typeof define && define.amd ? define(["exports"], T) : (z = z || self, T(z.mapvgl = {}))
})(this,
function(z) {
    function T(f) {
        return f && f.__esModule && Object.prototype.hasOwnProperty.call(f, "default") ? f["default"] : f
    }
    function O(f, c) {
        return c = {
            exports: {}
        },
        f(c, c.exports),
        c.exports
    }
    function xg(f, c) {
        return function(a) {
            return c(f(a))
        }
    }
    function yg(f) {
        var c = function(a) {
            if (undefined === a || null === a) return a;
            1 < arguments.length && (a = Array.prototype.slice.call(arguments));
            return f(a)
        };
        "conversion" in f && (c.conversion = f.conversion);
        return c
    }
    function zg(f) {
        var c = function(a) {
            if (undefined === a || null === a) return a;
            1 < arguments.length && (a = Array.prototype.slice.call(arguments));
            var b = f(a);
            if ("object" === ("undefined" === typeof b ? "undefined": sb(b))) for (var d = b.length,
            c = 0; c < d; c++) b[c] = Math.round(b[c]);
            return b
        };
        "conversion" in f && (c.conversion = f.conversion);
        return c
    }
    function ha(f, c) {
        if (! (this instanceof ha)) return new ha(f, c);
        c && c in de && (c = null);
        if (c && !(c in ya)) throw Error("Unknown model: " + c);
        if ("undefined" === typeof f) this.model = "rgb",
        this.color = [0, 0, 0],
        this.valpha = 1;
        else if (f instanceof ha) this.model = f.model,
        this.color = f.color.slice(),
        this.valpha = f.valpha;
        else if ("string" === typeof f) {
            c = Jb.get(f);
            if (null === c) throw Error("Unable to parse color from string: " + f);
            this.model = c.model;
            var a = ya[this.model].channels;
            this.color = c.value.slice(0, a);
            this.valpha = "number" === typeof c.value[a] ? c.value[a] : 1
        } else if (f.length) this.model = c || "rgb",
        a = ya[this.model].channels,
        c = Tc.call(f, 0, a),
        this.color = Uc(c, a),
        this.valpha = "number" === typeof f[a] ? f[a] : 1;
        else if ("number" === typeof f) f &= 16777215,
        this.model = "rgb",
        this.color = [f >> 16 & 255, f >> 8 & 255, f & 255],
        this.valpha = 1;
        else {
            this.valpha = 1;
            c = Ba(f);
            "alpha" in f && (c.splice(c.indexOf("alpha"), 1), this.valpha = "number" === typeof f.alpha ? f.alpha: 0);
            c = c.sort().join("");
            if (! (c in Vc)) throw Error("Unable to parse color from object: " + Ag(f));
            this.model = Vc[c];
            a = ya[this.model].labels;
            var b = [];
            for (c = 0; c < a.length; c++) b.push(f[a[c]]);
            this.color = Uc(b)
        }
        if (lc[this.model]) for (a = ya[this.model].channels, c = 0; c < a; c++)(f = lc[this.model][c]) && (this.color[c] = f(this.color[c]));
        this.valpha = Math.max(0, Math.min(1, this.valpha));
        ee && ee(this)
    }
    function Bg(f) {
        return function(c) {
            return Number(c.toFixed(f))
        }
    }
    function ca(f, c, a) {
        f = Array.isArray(f) ? f: [f];
        f.forEach(function(b) { (lc[b] || (lc[b] = []))[c] = a
        });
        f = f[0];
        return function(b) {
            if (arguments.length) {
                a && (b = a(b));
                var d = this[f]();
                d.color[c] = b;
                return d
            }
            d = this[f]().color[c];
            a && (d = a(d));
            return d
        }
    }
    function ia(f) {
        return function(c) {
            return Math.max(0, Math.min(f, c))
        }
    }
    function Uc(f, c) {
        for (var a = 0; a < c; a++)"number" !== typeof f[a] && (f[a] = 0);
        return f
    }
    function toRadian(f) {
        return f * Math.PI / 180
    }
    function toAngle(f) {
        return f / Math.PI * 180
    }
    function Kb(f) {
        return Math.pow(2, Math.ceil(Math.log(f) / Math.LN2))
    }
    function Xc(f) {
        return Math.pow(2, Math.floor(Math.log(f) / Math.LN2))
    }
    function Yc(f, c) {
        return 1E-8 > Math.abs(f - c)
    }
    function MercatorProjection() {}
    function Zc(f, c) {
        for (var a in c) f[a] = c[a]
    }
    function LngLat(f, c) {
        this.lng = f;
        this.lat = c
    }
    function fe(f, c) {
        this.x = f;
        this.y = c
    }
    function $c(f, c) {
        var a = document.createElement("canvas");
        f && (a.width = f);
        c && (a.height = c);
        return a
    }
    function oa(f) {
        f = f || {};
        this.gradient = f.gradient || {
            "0.25": "rgba(0, 0, 255, 1)",
            "0.55": "rgba(0, 255, 0, 1)",
            "0.85": "rgba(255, 255, 0, 1)",
            1 : "rgba(255, 0, 0, 1)"
        };
        this.maxSize = undefined === f.maxSize ? 35 : f.maxSize;
        this.minSize = f.minSize || 0;
        this.max = f.max || 100;
        this.min = f.min || 0;
        this.initPalette()
    }
    function BezierCurve(f) {
        this.options = f || {};
        this._initialize()
    }
    function ad(f, c, a, b, d) {
        var e = 1 - f,
        g = 1 - f;
        return e * e * e * c + 3 * g * g * f * a + 3 * (1 - f) * f * f * b + f * f * f * d
    }
    function GeodesicCurve(f) {
        this.WORLD_SIZE_MC_HALF = 2.0037726372307256E7;
        this.WORLD_SIZE_MC = 2 * this.WORLD_SIZE_MC_HALF;
        this.options = f || {};
        this._initialize()
    }
    function ge(f, c) {
        return f && c ? Math.round(Math.sqrt(Math.pow(f.lng - c.lng, 2) + Math.pow(f.lat - c.lat, 2))) : 0
    }
    function mc(f) {
        f = f.split("|");
        f[0] = f[0].split(",");
        return {
            lng: parseFloat(f[0][0]),
            lat: parseFloat(f[0][1])
        }
    }
    function he(f) {
        for (var c = ["webgl2", "experimental-webgl2", "webgl", "experimental-webgl"], a, b = 0; b < c.length; b++) try {
            if (a = f.getContext(c[b], {
                premultipliedAlpha: false
            })) break
        } catch(d) {}
        return a
    }
    function tb(f, c, a) {
        a = Object.assign({
            TEXTURE_MAG_FILTER: "LINEAR",
            TEXTURE_MIN_FILTER: "LINEAR",
            TEXTURE_WRAP_S: "REPEAT",
            TEXTURE_WRAP_T: "REPEAT"
        },
        a);
        var b = f.createTexture();
        f.bindTexture(f.TEXTURE_2D, b);
        f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL, true);
        f.texImage2D(f.TEXTURE_2D, 0, f.RGBA, f.RGBA, f.UNSIGNED_BYTE, c);
        for (var d in a) f.texParameteri(f.TEXTURE_2D, f[d], f[a[d]]);
        f.bindTexture(f.TEXTURE_2D, null);
        return b
    }
    function Ma(f, c, a, b) {
        if ("object" === ("undefined" === typeof c ? "undefined": sb(c))) c = tb(f, c, b),
        a(c, null);
        else {
            var d = new Image;
            d.crossOrigin = "anonymous";
            d.onload = function() {
                var c = Xc(d.width),
                g = Xc(d.height),
                h = document.createElement("canvas");
                h.width = c;
                h.height = g;
                h.getContext("2d").drawImage(d, 0, 0, c, g);
                d = h;
                c = tb(f, d, b);
                a(c, d)
            };
            d.src = c
        }
    }
    function Lb(f, c, a) {
        a = a || 2;
        var b = c && c.length,
        d = b ? c[0] * a: f.length,
        e = ie(f, 0, d, a, true),
        g = [];
        if (!e || e.next === e.prev) return g;
        var h;
        if (b) {
            var k = a;
            b = [];
            var l;
            var m = 0;
            for (l = c.length; m < l; m++) {
                var p = c[m] * k;
                var n = m < l - 1 ? c[m + 1] * k: f.length;
                p = ie(f, p, n, k, false);
                p === p.next && (p.steiner = true);
                b.push(Cg(p))
            }
            b.sort(Dg);
            for (m = 0; m < b.length; m++) {
                c = b[m];
                k = e;
                if (k = Eg(c, k)) c = je(k, c),
                Mb(c, c.next);
                e = Mb(e, e.next)
            }
        }
        if (f.length > 80 * a) {
            var r = h = f[0];
            var q = b = f[1];
            for (k = a; k < d; k += a) m = f[k],
            c = f[k + 1],
            m < r && (r = m),
            c < q && (q = c),
            m > h && (h = m),
            c > b && (b = c);
            h = Math.max(h - r, b - q);
            h = 0 !== h ? 1 / h: 0
        }
        Nb(e, g, a, r, q, h);
        return g
    }
    function ie(f, c, a, b, d) {
        if (d === 0 < bd(f, c, a, b)) for (d = c; d < a; d += b) var e = ke(d, f[d], f[d + 1], e);
        else for (d = a - b; d >= c; d -= b) e = ke(d, f[d], f[d + 1], e);
        e && gb(e, e.next) && (Ob(e), e = e.next);
        return e
    }
    function Mb(f, c) {
        if (!f) return f;
        c || (c = f);
        do {
            var a = false;
            if (f.steiner || !gb(f, f.next) && 0 !== na(f.prev, f, f.next)) f = f.next;
            else {
                Ob(f);
                f = c = f.prev;
                if (f === f.next) break;
                a = true
            }
        } while ( a || f !== c );
        return c
    }
    function Nb(f, c, a, b, d, e, g) {
        if (f) {
            if (!g && e) {
                var h = f,
                k = h;
                do null === k.z && (k.z = cd(k.x, k.y, b, d, e)),
                k.prevZ = k.prev,
                k = k.nextZ = k.next;
                while (k !== h);
                k.prevZ.nextZ = null;
                k.prevZ = null;
                h = k;
                var l, m, p, n, r = 1;
                do {
                    k = h;
                    var q = h = null;
                    for (m = 0; k;) {
                        m++;
                        var t = k;
                        for (l = p = 0; l < r && (p++, t = t.nextZ, t); l++);
                        for (n = r; 0 < p || 0 < n && t;) 0 !== p && (0 === n || !t || k.z <= t.z) ? (l = k, k = k.nextZ, p--) : (l = t, t = t.nextZ, n--),
                        q ? q.nextZ = l: h = l,
                        l.prevZ = q,
                        q = l;
                        k = t
                    }
                    q.nextZ = null;
                    r *= 2
                } while ( 1 < m )
            }
            for (h = f; f.prev !== f.next;) {
                k = f.prev;
                t = f.next;
                if (e) q = Fg(f, b, d, e);
                else a: if (q = f, m = q.prev, p = q, r = q.next, 0 <= na(m, p, r)) q = false;
                else {
                    for (l = q.next.next; l !== q.prev;) {
                        if (ub(m.x, m.y, p.x, p.y, r.x, r.y, l.x, l.y) && 0 <= na(l.prev, l, l.next)) {
                            q = false;
                            break a
                        }
                        l = l.next
                    }
                    q = true
                }
                if (q) c.push(k.i / a),
                c.push(f.i / a),
                c.push(t.i / a),
                Ob(f),
                h = f = t.next;
                else if (f = t, f === h) {
                    if (!g) Nb(Mb(f), c, a, b, d, e, 1);
                    else if (1 === g) {
                        g = c;
                        h = a;
                        k = f;
                        do t = k.prev,
                        q = k.next.next,
                        !gb(t, q) && le(t, k, k.next, q) && Pb(t, q) && Pb(q, t) && (g.push(t.i / h), g.push(k.i / h), g.push(q.i / h), Ob(k), Ob(k.next), k = f = q),
                        k = k.next;
                        while (k !== f);
                        f = k;
                        Nb(f, c, a, b, d, e, 2)
                    } else if (2 === g) a: {
                        g = f;
                        do {
                            for (h = g.next.next; h !== g.prev;) {
                                if (k = g.i !== h.i) {
                                    k = g;
                                    t = h;
                                    if (q = k.next.i !== t.i && k.prev.i !== t.i) {
                                        b: {
                                            q = k;
                                            do {
                                                if (q.i !== k.i && q.next.i !== k.i && q.i !== t.i && q.next.i !== t.i && le(q, q.next, k, t)) {
                                                    q = true;
                                                    break b
                                                }
                                                q = q.next
                                            } while ( q !== k );
                                            q = false
                                        }
                                        q = !q
                                    }
                                    if (q = q && Pb(k, t) && Pb(t, k)) {
                                        q = k;
                                        m = false;
                                        p = (k.x + t.x) / 2;
                                        t = (k.y + t.y) / 2;
                                        do q.y > t !== q.next.y > t && q.next.y !== q.y && p < (q.next.x - q.x) * (t - q.y) / (q.next.y - q.y) + q.x && (m = !m),
                                        q = q.next;
                                        while (q !== k);
                                        q = m
                                    }
                                    k = q
                                }
                                if (k) {
                                    f = je(g, h);
                                    g = Mb(g, g.next);
                                    f = Mb(f, f.next);
                                    Nb(g, c, a, b, d, e);
                                    Nb(f, c, a, b, d, e);
                                    break a
                                }
                                h = h.next
                            }
                            g = g.next
                        } while ( g !== f )
                    }
                    break
                }
            }
        }
    }
    function Fg(f, c, a, b) {
        var d = f.prev,
        e = f.next;
        if (0 <= na(d, f, e)) return ! 1;
        var g = d.x > f.x ? d.x > e.x ? d.x: e.x: f.x > e.x ? f.x: e.x,
        h = d.y > f.y ? d.y > e.y ? d.y: e.y: f.y > e.y ? f.y: e.y,
        k = cd(d.x < f.x ? d.x < e.x ? d.x: e.x: f.x < e.x ? f.x: e.x, d.y < f.y ? d.y < e.y ? d.y: e.y: f.y < e.y ? f.y: e.y, c, a, b);
        c = cd(g, h, c, a, b);
        a = f.prevZ;
        for (b = f.nextZ; a && a.z >= k && b && b.z <= c;) {
            if (a !== f.prev && a !== f.next && ub(d.x, d.y, f.x, f.y, e.x, e.y, a.x, a.y) && 0 <= na(a.prev, a, a.next)) return ! 1;
            a = a.prevZ;
            if (b !== f.prev && b !== f.next && ub(d.x, d.y, f.x, f.y, e.x, e.y, b.x, b.y) && 0 <= na(b.prev, b, b.next)) return ! 1;
            b = b.nextZ
        }
        for (; a && a.z >= k;) {
            if (a !== f.prev && a !== f.next && ub(d.x, d.y, f.x, f.y, e.x, e.y, a.x, a.y) && 0 <= na(a.prev, a, a.next)) return ! 1;
            a = a.prevZ
        }
        for (; b && b.z <= c;) {
            if (b !== f.prev && b !== f.next && ub(d.x, d.y, f.x, f.y, e.x, e.y, b.x, b.y) && 0 <= na(b.prev, b, b.next)) return ! 1;
            b = b.nextZ
        }
        return ! 0
    }
    function Dg(f, c) {
        return f.x - c.x
    }
    function Eg(f, c) {
        var a = c,
        b = f.x,
        d = f.y,
        e = -Infinity;
        do {
            if (d <= a.y && d >= a.next.y && a.next.y !== a.y) {
                var g = a.x + (d - a.y) * (a.next.x - a.x) / (a.next.y - a.y);
                if (g <= b && g > e) {
                    e = g;
                    if (g === b) {
                        if (d === a.y) return a;
                        if (d === a.next.y) return a.next
                    }
                    var h = a.x < a.next.x ? a: a.next
                }
            }
            a = a.next
        } while ( a !== c );
        if (!h) return null;
        if (b === e) return h.prev;
        c = h;
        g = h.x;
        var k = h.y,
        l = Infinity;
        for (a = h.next; a !== c;) {
            if (b >= a.x && a.x >= g && b !== a.x && ub(d < k ? b: e, d, g, k, d < k ? e: b, d, a.x, a.y)) {
                var m = Math.abs(d - a.y) / (b - a.x); (m < l || m === l && a.x > h.x) && Pb(a, f) && (h = a, l = m)
            }
            a = a.next
        }
        return h
    }
    function cd(f, c, a, b, d) {
        f = 32767 * (f - a) * d;
        c = 32767 * (c - b) * d;
        f = (f | f << 8) & 16711935;
        f = (f | f << 4) & 252645135;
        f = (f | f << 2) & 858993459;
        c = (c | c << 8) & 16711935;
        c = (c | c << 4) & 252645135;
        c = (c | c << 2) & 858993459;
        return (f | f << 1) & 1431655765 | ((c | c << 1) & 1431655765) << 1
    }
    function Cg(f) {
        var c = f,
        a = f;
        do {
            if (c.x < a.x || c.x === a.x && c.y < a.y) a = c;
            c = c.next
        } while ( c !== f );
        return a
    }
    function ub(f, c, a, b, d, e, g, h) {
        return 0 <= (d - g) * (c - h) - (f - g) * (e - h) && 0 <= (f - g) * (b - h) - (a - g) * (c - h) && 0 <= (a - g) * (e - h) - (d - g) * (b - h)
    }
    function na(f, c, a) {
        return (c.y - f.y) * (a.x - c.x) - (c.x - f.x) * (a.y - c.y)
    }
    function gb(f, c) {
        return f.x === c.x && f.y === c.y
    }
    function le(f, c, a, b) {
        return gb(f, c) && gb(a, b) || gb(f, b) && gb(a, c) ? true : 0 < na(f, c, a) !== 0 < na(f, c, b) && 0 < na(a, b, f) !== 0 < na(a, b, c)
    }
    function Pb(f, c) {
        return 0 > na(f.prev, f, f.next) ? 0 <= na(f, c, f.next) && 0 <= na(f, f.prev, c) : 0 > na(f, c, f.prev) || 0 > na(f, f.next, c)
    }
    function je(f, c) {
        var a = new dd(f.i, f.x, f.y),
        b = new dd(c.i, c.x, c.y),
        d = f.next,
        e = c.prev;
        f.next = c;
        c.prev = f;
        a.next = d;
        d.prev = a;
        b.next = a;
        a.prev = b;
        e.next = b;
        b.prev = e;
        return b
    }
    function ke(f, c, a, b) {
        f = new dd(f, c, a);
        b ? (f.next = b.next, f.prev = b, b.next.prev = f, b.next = f) : (f.prev = f, f.next = f);
        return f
    }
    function Ob(f) {
        f.next.prev = f.prev;
        f.prev.next = f.next;
        f.prevZ && (f.prevZ.nextZ = f.nextZ);
        f.nextZ && (f.nextZ.prevZ = f.prevZ)
    }
    function dd(f, c, a) {
        this.i = f;
        this.x = c;
        this.y = a;
        this.nextZ = this.prevZ = this.z = this.next = this.prev = null;
        this.steiner = false
    }
    function bd(f, c, a, b) {
        for (var d = 0,
        e = a - b; c < a; c += b) d += (f[e] - f[c]) * (f[c + 1] + f[e + 1]),
        e = c;
        return d
    }
    function me(f) {
        try {
            return nc.createObjectURL(new Blob([f], {
                type: "application/javascript"
            }))
        } catch(a) {
            var c = new Gg;
            c.append(f);
            return nc.createObjectURL(c.getBlob(type))
        }
    }
    function hb(f, c) {
        this.shapeLayer = f;
        this.gl = c;
        this.initData()
    }
    function ne() {
        ed = true;
        for (var f = 0; 64 > f; ++f) Na[f] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [f],
        Ca["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(f)] = f;
        Ca[45] = 62;
        Ca[95] = 63
    }
    function Hg(f, c, a) {
        for (var b = [], d = c; d < a; d += 3) c = (f[d] << 16) + (f[d + 1] << 8) + f[d + 2],
        b.push(Na[c >> 18 & 63] + Na[c >> 12 & 63] + Na[c >> 6 & 63] + Na[c & 63]);
        return b.join("")
    }
    function oe(f) {
        ed || ne();
        for (var c = f.length,
        a = c % 3,
        b = "",
        d = [], e = 0, g = c - a; e < g; e += 16383) d.push(Hg(f, e, e + 16383 > g ? g: e + 16383));
        1 === a ? (f = f[c - 1], b += Na[f >> 2], b += Na[f << 4 & 63], b += "==") : 2 === a && (f = (f[c - 2] << 8) + f[c - 1], b += Na[f >> 10], b += Na[f >> 4 & 63], b += Na[f << 2 & 63], b += "=");
        d.push(b);
        return d.join("")
    }
    function oc(f, c, a, b, d) {
        var e = 8 * d - b - 1;
        var g = (1 << e) - 1,
        h = g >> 1,
        k = -7;
        d = a ? d - 1 : 0;
        var l = a ? -1 : 1,
        m = f[c + d];
        d += l;
        a = m & (1 << -k) - 1;
        m >>= -k;
        for (k += e; 0 < k; a = 256 * a + f[c + d], d += l, k -= 8);
        e = a & (1 << -k) - 1;
        a >>= -k;
        for (k += b; 0 < k; e = 256 * e + f[c + d], d += l, k -= 8);
        if (0 === a) a = 1 - h;
        else {
            if (a === g) return e ? NaN: Infinity * (m ? -1 : 1);
            e += Math.pow(2, b);
            a -= h
        }
        return (m ? -1 : 1) * e * Math.pow(2, a - b)
    }
    function pe(f, c, a, b, d, e) {
        var g, h = 8 * e - d - 1,
        k = (1 << h) - 1,
        l = k >> 1,
        m = 23 === d ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        e = b ? 0 : e - 1;
        var p = b ? 1 : -1,
        n = 0 > c || 0 === c && 0 > 1 / c ? 1 : 0;
        c = Math.abs(c);
        isNaN(c) || Infinity === c ? (c = isNaN(c) ? 1 : 0, b = k) : (b = Math.floor(Math.log(c) / Math.LN2), 1 > c * (g = Math.pow(2, -b)) && (b--, g *= 2), c = 1 <= b + l ? c + m / g: c + m * Math.pow(2, 1 - l), 2 <= c * g && (b++, g /= 2), b + l >= k ? (c = 0, b = k) : 1 <= b + l ? (c = (c * g - 1) * Math.pow(2, d), b += l) : (c = c * Math.pow(2, l - 1) * Math.pow(2, d), b = 0));
        for (; 8 <= d; f[a + e] = c & 255, e += p, c /= 256, d -= 8);
        b = b << d | c;
        for (h += d; 0 < h; f[a + e] = b & 255, e += p, b /= 256, h -= 8);
        f[a + e - p] |= 128 * n
    }
    function Ua(f, c) {
        if ((w.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823) < c) throw new RangeError("Invalid typed array length");
        w.TYPED_ARRAY_SUPPORT ? (f = new Uint8Array(c), f.__proto__ = w.prototype) : (null === f && (f = new w(c)), f.length = c);
        return f
    }
    function w(f, c, a) {
        if (! (w.TYPED_ARRAY_SUPPORT || this instanceof w)) return new w(f, c, a);
        if ("number" === typeof f) {
            if ("string" === typeof c) throw Error("If encoding is specified then the first argument must be a string");
            return fd(this, f)
        }
        return qe(this, f, c, a)
    }
    function qe(f, c, a, b) {
        if ("number" === typeof c) throw new TypeError('"value" argument must not be a number');
        if ("undefined" !== typeof ArrayBuffer && c instanceof ArrayBuffer) {
            c.byteLength;
            if (0 > a || c.byteLength < a) throw new RangeError("'offset' is out of bounds");
            if (c.byteLength < a + (b || 0)) throw new RangeError("'length' is out of bounds");
            c = undefined === a && undefined === b ? new Uint8Array(c) : undefined === b ? new Uint8Array(c, a) : new Uint8Array(c, a, b);
            w.TYPED_ARRAY_SUPPORT ? (f = c, f.__proto__ = w.prototype) : f = gd(f, c);
            return f
        }
        if ("string" === typeof c) {
            b = f;
            f = a;
            if ("string" !== typeof f || "" === f) f = "utf8";
            if (!w.isEncoding(f)) throw new TypeError('"encoding" must be a valid string encoding');
            a = re(c, f) | 0;
            b = Ua(b, a);
            c = b.write(c, f);
            c !== a && (b = b.slice(0, c));
            return b
        }
        return Ig(f, c)
    }
    function se(f) {
        if ("number" !== typeof f) throw new TypeError('"size" argument must be a number');
        if (0 > f) throw new RangeError('"size" argument must not be negative');
    }
    function fd(f, c) {
        se(c);
        f = Ua(f, 0 > c ? 0 : hd(c) | 0);
        if (!w.TYPED_ARRAY_SUPPORT) for (var a = 0; a < c; ++a) f[a] = 0;
        return f
    }
    function gd(f, c) {
        var a = 0 > c.length ? 0 : hd(c.length) | 0;
        f = Ua(f, a);
        for (var b = 0; b < a; b += 1) f[b] = c[b] & 255;
        return f
    }
    function Ig(f, c) {
        if (Oa(c)) {
            var a = hd(c.length) | 0;
            f = Ua(f, a);
            if (0 === f.length) return f;
            c.copy(f, 0, 0, a);
            return f
        }
        if (c) {
            if ("undefined" !== typeof ArrayBuffer && c.buffer instanceof ArrayBuffer || "length" in c) return (a = "number" !== typeof c.length) || (a = c.length, a = a !== a),
            a ? Ua(f, 0) : gd(f, c);
            if ("Buffer" === c.type && te(c.data)) return gd(f, c.data)
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
    }
    function hd(f) {
        if (f >= (w.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823)) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + (w.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823).toString(16) + " bytes");
        return f | 0
    }
    function Oa(f) {
        return ! (null == f || !f._isBuffer)
    }
    function re(f, c) {
        if (Oa(f)) return f.length;
        if ("undefined" !== typeof ArrayBuffer && "function" === typeof ArrayBuffer.isView && (ArrayBuffer.isView(f) || f instanceof ArrayBuffer)) return f.byteLength;
        "string" !== typeof f && (f = "" + f);
        var a = f.length;
        if (0 === a) return 0;
        for (var b = false;;) switch (c) {
        case "ascii":
        case "latin1":
        case "binary":
            return a;
        case "utf8":
        case "utf-8":
        case undefined:
            return pc(f).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return 2 * a;
        case "hex":
            return a >>> 1;
        case "base64":
            return ue(f).length;
        default:
            if (b) return pc(f).length;
            c = ("" + c).toLowerCase();
            b = true
        }
    }
    function Jg(f, c, a) {
        var b = false;
        if (undefined === c || 0 > c) c = 0;
        if (c > this.length) return "";
        if (undefined === a || a > this.length) a = this.length;
        if (0 >= a) return "";
        a >>>= 0;
        c >>>= 0;
        if (a <= c) return "";
        for (f || (f = "utf8");;) switch (f) {
        case "hex":
            f = c;
            c = a;
            a = this.length;
            if (!f || 0 > f) f = 0;
            if (!c || 0 > c || c > a) c = a;
            b = "";
            for (a = f; a < c; ++a) f = b,
            b = this[a],
            b = 16 > b ? "0" + b.toString(16) : b.toString(16),
            b = f + b;
            return b;
        case "utf8":
        case "utf-8":
            return ve(this, c, a);
        case "ascii":
            f = "";
            for (a = Math.min(this.length, a); c < a; ++c) f += String.fromCharCode(this[c] & 127);
            return f;
        case "latin1":
        case "binary":
            f = "";
            for (a = Math.min(this.length, a); c < a; ++c) f += String.fromCharCode(this[c]);
            return f;
        case "base64":
            return c = 0 === c && a === this.length ? oe(this) : oe(this.slice(c, a)),
            c;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            c = this.slice(c, a);
            a = "";
            for (f = 0; f < c.length; f += 2) a += String.fromCharCode(c[f] + 256 * c[f + 1]);
            return a;
        default:
            if (b) throw new TypeError("Unknown encoding: " + f);
            f = (f + "").toLowerCase();
            b = true
        }
    }
    function ib(f, c, a) {
        var b = f[c];
        f[c] = f[a];
        f[a] = b
    }
    function we(f, c, a, b, d) {
        if (0 === f.length) return - 1;
        "string" === typeof a ? (b = a, a = 0) : 2147483647 < a ? a = 2147483647 : -2147483648 > a && (a = -2147483648);
        a = +a;
        isNaN(a) && (a = d ? 0 : f.length - 1);
        0 > a && (a = f.length + a);
        if (a >= f.length) {
            if (d) return - 1;
            a = f.length - 1
        } else if (0 > a) if (d) a = 0;
        else return - 1;
        "string" === typeof c && (c = w.from(c, b));
        if (Oa(c)) return 0 === c.length ? -1 : xe(f, c, a, b, d);
        if ("number" === typeof c) return c &= 255,
        w.TYPED_ARRAY_SUPPORT && "function" === typeof Uint8Array.prototype.indexOf ? d ? Uint8Array.prototype.indexOf.call(f, c, a) : Uint8Array.prototype.lastIndexOf.call(f, c, a) : xe(f, [c], a, b, d);
        throw new TypeError("val must be string, number or Buffer");
    }
    function xe(f, c, a, b, d) {
        function e(a, b) {
            return 1 === g ? a[b] : a.readUInt16BE(b * g)
        }
        var g = 1,
        h = f.length,
        k = c.length;
        if (undefined !== b && (b = String(b).toLowerCase(), "ucs2" === b || "ucs-2" === b || "utf16le" === b || "utf-16le" === b)) {
            if (2 > f.length || 2 > c.length) return - 1;
            g = 2;
            h /= 2;
            k /= 2;
            a /= 2
        }
        if (d) for (b = -1; a < h; a++) if (e(f, a) === e(c, -1 === b ? 0 : a - b)) {
            if ( - 1 === b && (b = a), a - b + 1 === k) return b * g
        } else - 1 !== b && (a -= a - b),
        b = -1;
        else for (a + k > h && (a = h - k); 0 <= a; a--) {
            h = true;
            for (b = 0; b < k; b++) if (e(f, a + b) !== e(c, b)) {
                h = false;
                break
            }
            if (h) return a
        }
        return - 1
    }
    function ve(f, c, a) {
        a = Math.min(f.length, a);
        for (var b = []; c < a;) {
            var d = f[c],
            e = null,
            g = 239 < d ? 4 : 223 < d ? 3 : 191 < d ? 2 : 1;
            if (c + g <= a) switch (g) {
            case 1:
                128 > d && (e = d);
                break;
            case 2:
                var h = f[c + 1];
                128 === (h & 192) && (d = (d & 31) << 6 | h & 63, 127 < d && (e = d));
                break;
            case 3:
                h = f[c + 1];
                var k = f[c + 2];
                128 === (h & 192) && 128 === (k & 192) && (d = (d & 15) << 12 | (h & 63) << 6 | k & 63, 2047 < d && (55296 > d || 57343 < d) && (e = d));
                break;
            case 4:
                h = f[c + 1];
                k = f[c + 2];
                var l = f[c + 3];
                128 === (h & 192) && 128 === (k & 192) && 128 === (l & 192) && (d = (d & 15) << 18 | (h & 63) << 12 | (k & 63) << 6 | l & 63, 65535 < d && 1114112 > d && (e = d))
            }
            null === e ? (e = 65533, g = 1) : 65535 < e && (e -= 65536, b.push(e >>> 10 & 1023 | 55296), e = 56320 | e & 1023);
            b.push(e);
            c += g
        }
        f = b.length;
        if (f <= ye) b = String.fromCharCode.apply(String, b);
        else {
            a = "";
            for (c = 0; c < f;) a += String.fromCharCode.apply(String, b.slice(c, c += ye));
            b = a
        }
        return b
    }
    function ka(f, c, a) {
        if (0 !== f % 1 || 0 > f) throw new RangeError("offset is not uint");
        if (f + c > a) throw new RangeError("Trying to access beyond buffer length");
    }
    function ua(f, c, a, b, d, e) {
        if (!Oa(f)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (c > d || c < e) throw new RangeError('"value" argument is out of bounds');
        if (a + b > f.length) throw new RangeError("Index out of range");
    }
    function qc(f, c, a, b) {
        0 > c && (c = 65535 + c + 1);
        for (var d = 0,
        e = Math.min(f.length - a, 2); d < e; ++d) f[a + d] = (c & 255 << 8 * (b ? d: 1 - d)) >>> 8 * (b ? d: 1 - d)
    }
    function rc(f, c, a, b) {
        0 > c && (c = 4294967295 + c + 1);
        for (var d = 0,
        e = Math.min(f.length - a, 4); d < e; ++d) f[a + d] = c >>> 8 * (b ? d: 3 - d) & 255
    }
    function ze(f, c, a, b, d, e) {
        if (a + b > f.length) throw new RangeError("Index out of range");
        if (0 > a) throw new RangeError("Index out of range");
    }
    function Ae(f, c, a, b, d) {
        d || ze(f, c, a, 4, 3.4028234663852886E38, -3.4028234663852886E38);
        pe(f, c, a, b, 23, 4);
        return a + 4
    }
    function Be(f, c, a, b, d) {
        d || ze(f, c, a, 8, 1.7976931348623157E308, -1.7976931348623157E308);
        pe(f, c, a, b, 52, 8);
        return a + 8
    }
    function pc(f, c) {
        c = c || Infinity;
        for (var a, b = f.length,
        d = null,
        e = [], g = 0; g < b; ++g) {
            a = f.charCodeAt(g);
            if (55295 < a && 57344 > a) {
                if (!d) {
                    if (56319 < a) { - 1 < (c -= 3) && e.push(239, 191, 189);
                        continue
                    } else if (g + 1 === b) { - 1 < (c -= 3) && e.push(239, 191, 189);
                        continue
                    }
                    d = a;
                    continue
                }
                if (56320 > a) { - 1 < (c -= 3) && e.push(239, 191, 189);
                    d = a;
                    continue
                }
                a = (d - 55296 << 10 | a - 56320) + 65536
            } else d && -1 < (c -= 3) && e.push(239, 191, 189);
            d = null;
            if (128 > a) {
                if (0 > --c) break;
                e.push(a)
            } else if (2048 > a) {
                if (0 > (c -= 2)) break;
                e.push(a >> 6 | 192, a & 63 | 128)
            } else if (65536 > a) {
                if (0 > (c -= 3)) break;
                e.push(a >> 12 | 224, a >> 6 & 63 | 128, a & 63 | 128)
            } else if (1114112 > a) {
                if (0 > (c -= 4)) break;
                e.push(a >> 18 | 240, a >> 12 & 63 | 128, a >> 6 & 63 | 128, a & 63 | 128)
            } else throw Error("Invalid code point");
        }
        return e
    }
    function Ce(f) {
        for (var c = [], a = 0; a < f.length; ++a) c.push(f.charCodeAt(a) & 255);
        return c
    }
    function ue(f) {
        f = (f.trim ? f.trim() : f.replace(/^\s+|\s+$/g, "")).replace(Kg, "");
        if (2 > f.length) f = "";
        else for (; 0 !== f.length % 4;) f += "=";
        ed || ne();
        var c = f.length;
        if (0 < c % 4) throw Error("Invalid string. Length must be a multiple of 4");
        var a = "=" === f[c - 2] ? 2 : "=" === f[c - 1] ? 1 : 0;
        var b = new Lg(3 * c / 4 - a);
        var d = 0 < a ? c - 4 : c;
        var e = 0;
        for (c = 0; c < d; c += 4) {
            var g = Ca[f.charCodeAt(c)] << 18 | Ca[f.charCodeAt(c + 1)] << 12 | Ca[f.charCodeAt(c + 2)] << 6 | Ca[f.charCodeAt(c + 3)];
            b[e++] = g >> 16 & 255;
            b[e++] = g >> 8 & 255;
            b[e++] = g & 255
        }
        2 === a ? (g = Ca[f.charCodeAt(c)] << 2 | Ca[f.charCodeAt(c + 1)] >> 4, b[e++] = g & 255) : 1 === a && (g = Ca[f.charCodeAt(c)] << 10 | Ca[f.charCodeAt(c + 1)] << 4 | Ca[f.charCodeAt(c + 2)] >> 2, b[e++] = g >> 8 & 255, b[e++] = g & 255);
        return b
    }
    function Qb(f, c, a, b) {
        for (var d = 0; d < b && !(d + a >= c.length || d >= f.length); ++d) c[d + a] = f[d];
        return d
    }
    function De(f) {
        return !! f.constructor && "function" === typeof f.constructor.isBuffer && f.constructor.isBuffer(f)
    }
    function Da(f, c) {
        var a = [];
        f.forEach(function(b) {
            a.push(c ? -b: b, b)
        });
        return a
    }
    function Ee(f) {
        for (var c = 1 < arguments.length && undefined !== arguments[1] ? arguments[1] : 0, a = [], b = 0; b < f - 1; b++) {
            var d = 2 * (b + c);
            a.push(d, d + 1, d + 2);
            a.push(d + 2, d + 1, d + 3)
        }
        return a
    }
    function sc(f) {
        return function(c, a, b) {
            c = a + f;
            a = b.length - 1;
            return b[0 < a ? 0 > c ? 0 : c > a ? a: c: c < a ? a: 0 < c ? 0 : c]
        }
    }
    function Pa(f) {
        if (!f[0] || !f[0].length) return f;
        for (var c = f[0].length, a = [], b = 0, d = 0; d < f.length; d++) for (var e = 0; e < c; e++) a[b++] = f[d][e];
        return a
    }
    function Fe() {
        for (var f = 0 < arguments.length && undefined !== arguments[0] ? arguments[0] : [], c = [], a = 0, b = 0; b < f.length; b++) {
            var d = f[b];
            if (0 < b) {
                var e = f[b - 1];
                a += Math.sqrt(Math.pow(d[0] - e[0], 2) + Math.pow(d[1] - e[1], 2))
            }
            c.push(a)
        }
        return {
            arr: c,
            total: a
        }
    }
    function Ge() {
        var f = document.createElement("canvas");
        f.width = f.height = 32;
        var c = f.getContext("2d");
        return {
            canvas: f,
            ctx: c
        }
    }
    function He() {
        var f = (0 < arguments.length && undefined !== arguments[0] ? arguments[0] : {}).color,
        c = Ge(),
        a = c.canvas;
        c = c.ctx;
        c.save();
        c.moveTo(0, 0);
        c.lineTo(20, 0);
        c.lineTo(32, 16);
        c.lineTo(20, 32);
        c.lineTo(0, 32);
        c.lineTo(10, 16);
        c.fillStyle = f || "#fff";
        c.fill();
        c.restore();
        return a
    }
    function tc(f, c) {
        return P.set(f, -c[1], c[0])
    }
    function Ie(f, c, a) {
        P.sub(f, c, a);
        P.normalize(f, f);
        return f
    }
    function Je(f) {
        var c = 0,
        a = 0,
        b = true,
        d = false,
        e = undefined;
        try {
            for (var g = id(f), h; ! (b = (h = g.next()).done); b = true) {
                var k = h.value;
                c += k.w * k.h;
                a = Math.max(a, k.w)
            }
        } catch(t) {
            d = true,
            e = t
        } finally {
            try { ! b && g.
                return && g.
                return ()
            } finally {
                if (d) throw e;
            }
        }
        f.sort(function(a, b) {
            return b.h - a.h
        });
        a = [{
            x: 0,
            y: 0,
            w: Math.max(Math.ceil(Math.sqrt(c / .95)), a),
            h: Infinity
        }];
        d = b = 0;
        e = true;
        g = false;
        h = undefined;
        try {
            for (var l = id(f), m; ! (e = (m = l.next()).done); e = true) for (var p = m.value,
            n = a.length - 1; 0 <= n; n--) {
                var r = a[n];
                if (! (p.w > r.w || p.h > r.h)) {
                    p.x = r.x;
                    p.y = r.y;
                    d = Math.max(d, p.y + p.h);
                    b = Math.max(b, p.x + p.w);
                    if (p.w === r.w && p.h === r.h) {
                        var q = a.pop();
                        n < a.length && (a[n] = q)
                    } else p.h === r.h ? (r.x += p.w, r.w -= p.w) : (p.w !== r.w && a.push({
                        x: r.x + p.w,
                        y: r.y,
                        w: r.w - p.w,
                        h: p.h
                    }), r.y += p.h, r.h -= p.h);
                    break
                }
            }
        } catch(t) {
            g = true,
            h = t
        } finally {
            try { ! e && l.
                return && l.
                return ()
            } finally {
                if (g) throw h;
            }
        }
        return {
            w: b,
            h: d,
            fill: c / (b * d) || 0
        }
    }
    function Mg(f, c, a) {
        a = Math.PI / 180 * (60 * a + 30);
        return [f.x + c * Math.cos(a), f.y + c * Math.sin(a)]
    }
    function Ng(f, c, a) {
        for (var b = {},
        d = [], e = f.length, g = c / 2 / Math.sin(Math.PI / 3), h = 1.5 * g, k = 1, l = 0; l < e; ++l) {
            var m = f[l].geometry.coordinates;
            a && (m = a(m));
            var p = +m[0],
            n = +m[1];
            if (!isNaN(p) && !isNaN(n)) {
                m = Math.round(n /= h);
                var r = Math.round(p = p / c - (m & 1) / 2),
                q = n - m;
                if (1 < 3 * Math.abs(q)) {
                    var t = p - r,
                    y = r + (p < r ? -1 : 1) / 2,
                    v = m + (n < m ? -1 : 1);
                    p -= y;
                    n -= v;
                    t * t + q * q > p * p + n * n && (r = y + (m & 1 ? 1 : -1) / 2, m = v)
                }
                q = r + "-" + m; (t = b[q]) ? (t.count += f[l].count || 1, k = Math.max(k, t.count)) : (b[q] = {
                    center: {
                        x: (r + (m & 1) / 2) * c,
                        y: m * h
                    },
                    count: f[l].count || 1
                },
                d.push(b[q]))
            }
        }
        d.max = k;
        d.r = g;
        return d
    }
    function Og(f) {
        var c, a;
        this.promise = new f(function(b, d) {
            if (undefined !== c || undefined !== a) throw TypeError("Bad Promise constructor");
            c = b;
            a = d
        });
        this.resolve = jb(c);
        this.reject = jb(a)
    }
    function Pg(f, c, a, b) {
        switch (b) {
        case 5122:
            return new Int16Array(f, c, a);
        case 5123:
            return new Uint16Array(f, c, a);
        case 5124:
            return new Int32Array(f, c, a);
        case 5125:
            return new Uint32Array(f, c, a);
        case 5126:
            return new Float32Array(f, c, a);
        default:
            return null
        }
    }
    function uc(f) {
        return Pg(f.bufferView.data, f.byteOffset, f.count * jd[f.type], f.componentType)
    }
    function Qg(f) {
        var c = "",
        a = f.lastIndexOf("/"); - 1 !== a && (c = f.substring(0, a + 1));
        return c
    }
    function Rg(f, c) {
        var a = new XMLHttpRequest;
        a.overrideMimeType("application/json");
        a.open("GET", f, true);
        a.onreadystatechange = function() {
            4 == a.readyState && "200" == a.status && c(a.responseText, this)
        };
        a.send(null)
    }
    function Sg(f, c) {
        var a = new XMLHttpRequest;
        a.responseType = "arraybuffer";
        a.open("GET", f, true);
        a.onreadystatechange = function() {
            if (4 == a.readyState && "200" == a.status) {
                var b = a.response;
                b && c && c(b)
            }
        };
        a.send(null)
    }
    function Tg(f, c, a) {
        var b = new Image;
        b.crossOrigin = "Anonymous";
        b.src = f;
        b.onload = function() {
            a(b, c)
        }
    }
    function Ug(f) {
        function c(b, d) {
            a.uniform1i(b, d.index);
            a.activeTexture(a.TEXTURE0 + d.index);
            b = D.glTF.textures[d.index];
            a.bindTexture(a.TEXTURE_2D, b.texture);
            a.bindSampler(d.index, b.sampler ? b.sampler.sampler: g)
        }
        var a = f.gl,
        b = 0,
        d = [];
        f = a.canvas;
        var e = function(a, b, d) {
            this.glTFScene = a;
            this.glTF = b;
            this.id = d;
            this.rootTransform = E.create();
            this.nodeMatrix = Array(b.nodes.length);
            a = 0;
            for (b = this.nodeMatrix.length; a < b; a++) this.nodeMatrix[a] = E.create()
        },
        g = a.createSampler();
        a.samplerParameteri(g, a.TEXTURE_MIN_FILTER, a.NEAREST_MIPMAP_LINEAR);
        a.samplerParameteri(g, a.TEXTURE_MAG_FILTER, a.LINEAR);
        a.samplerParameteri(g, a.TEXTURE_WRAP_S, a.REPEAT);
        a.samplerParameteri(g, a.TEXTURE_WRAP_T, a.REPEAT);
        a.bindVertexArray(null);
        a.bindVertexArray(null);
        var h = {
            HAS_SKIN: 1,
            SKIN_VEC8: 2,
            HAS_BASECOLORMAP: 4,
            HAS_NORMALMAP: 8,
            HAS_METALROUGHNESSMAP: 16,
            HAS_OCCLUSIONMAP: 32,
            HAS_EMISSIVEMAP: 64
        },
        k = {},
        l = function() {
            this.flags = 0;
            this.programObject = null
        };
        l.prototype.hasSkin = function() {
            return this.flags & h.HAS_SKIN
        };
        l.prototype.hasBaseColorMap = function() {
            return this.flags & h.HAS_BASECOLORMAP
        };
        l.prototype.hasNormalMap = function() {
            return this.flags & h.HAS_NORMALMAP
        };
        l.prototype.hasMetalRoughnessMap = function() {
            return this.flags & h.HAS_METALROUGHNESSMAP
        };
        l.prototype.hasOcclusionMap = function() {
            return this.flags & h.HAS_OCCLUSIONMAP
        };
        l.prototype.hasEmissiveMap = function() {
            return this.flags & h.HAS_EMISSIVEMAP
        };
        l.prototype.defineMacro = function(a) {
            undefined !== h[a] && (this.flags |= h[a])
        };
        l.prototype.compile = function() {
            var b = k[this.flags];
            if (b) this.programObject = b;
            else {
                var d = b = "";
                this.flags & h.HAS_SKIN && (b += "#define HAS_SKIN\n");
                this.flags & h.SKIN_VEC8 && (b += "#define SKIN_VEC8\n");
                this.flags & h.HAS_BASECOLORMAP && (d += "#define HAS_BASECOLORMAP\n");
                this.flags & h.HAS_NORMALMAP && (d += "#define HAS_NORMALMAP\n");
                this.flags & h.HAS_METALROUGHNESSMAP && (d += "#define HAS_METALROUGHNESSMAP\n");
                this.flags & h.HAS_OCCLUSIONMAP && (d += "#define HAS_OCCLUSIONMAP\n");
                this.flags & h.HAS_EMISSIVEMAP && (d += "#define HAS_EMISSIVEMAP\n");
                b = vb.createProgram(a, "#version 300 es\n" + b + "#define POSITION_LOCATION 0\n#define NORMAL_LOCATION 1\n#define TEXCOORD_0_LOCATION 2\n#define JOINTS_0_LOCATION 3\n#define JOINTS_1_LOCATION 5\n#define WEIGHTS_0_LOCATION 4\n#define WEIGHTS_1_LOCATION 6\n#define TANGENT_LOCATION 7\nprecision highp float;precision highp int;uniform mat4 u_MVP;uniform mat4 u_MV;uniform mat4 u_MVNormal;\n#ifdef HAS_SKIN\nuniform JointMatrix{mat4 matrix[65];}u_jointMatrix;\n#endif\nlayout(location=POSITION_LOCATION)in vec3 position;layout(location=NORMAL_LOCATION)in vec3 normal;layout(location=TEXCOORD_0_LOCATION)in vec2 uv;\n#ifdef HAS_SKIN\nlayout(location=JOINTS_0_LOCATION)in vec4 joint0;layout(location=WEIGHTS_0_LOCATION)in vec4 weight0;\n#ifdef SKIN_VEC8\nlayout(location=JOINTS_1_LOCATION)in vec4 joint1;layout(location=WEIGHTS_1_LOCATION)in vec4 weight1;\n#endif\n#endif\nout vec3 v_position;out vec3 v_normal;out vec2 v_uv;void main(){\n#ifdef HAS_SKIN\nmat4 skinMatrix=weight0.x*u_jointMatrix.matrix[int(joint0.x)]+weight0.y*u_jointMatrix.matrix[int(joint0.y)]+weight0.z*u_jointMatrix.matrix[int(joint0.z)]+weight0.w*u_jointMatrix.matrix[int(joint0.w)];\n#ifdef SKIN_VEC8\nskinMatrix+=weight1.x*u_jointMatrix.matrix[int(joint1.x)]+weight1.y*u_jointMatrix.matrix[int(joint1.y)]+weight1.z*u_jointMatrix.matrix[int(joint1.z)]+weight1.w*u_jointMatrix.matrix[int(joint1.w)];\n#endif\n#endif\nv_uv=uv;\n#ifdef HAS_SKIN\nv_normal=normalize((u_MVNormal*transpose(inverse(skinMatrix))*vec4(normal,0)).xyz);vec4 pos=u_MV*skinMatrix*vec4(position,1.0);gl_Position=u_MVP*skinMatrix*vec4(position,1.0);\n#else\nv_normal=normalize((u_MVNormal*vec4(normal,0)).xyz);vec4 pos=u_MV*vec4(position,1.0);gl_Position=u_MVP*vec4(position,1.0);\n#endif\nv_position=vec3(pos.xyz)/pos.w;}", "#version 300 es\n" + d + "#define FRAG_COLOR_LOCATION 0\nprecision highp float;precision highp int;uniform sampler2D u_brdfLUT;uniform vec4 u_baseColorFactor;\n#ifdef HAS_BASECOLORMAP\nuniform sampler2D u_baseColorTexture;\n#endif\n#ifdef HAS_NORMALMAP\nuniform sampler2D u_normalTexture;uniform float u_normalTextureScale;\n#endif\n#ifdef HAS_EMISSIVEMAP\nuniform sampler2D u_emissiveTexture;uniform vec3 u_emissiveFactor;\n#endif\n#ifdef HAS_METALROUGHNESSMAP\nuniform sampler2D u_metallicRoughnessTexture;\n#endif\nuniform float u_metallicFactor;uniform float u_roughnessFactor;\n#ifdef HAS_OCCLUSIONMAP\nuniform sampler2D u_occlusionTexture;uniform float u_occlusionStrength;\n#endif\nin vec3 v_position;in vec3 v_normal;in vec2 v_uv;layout(location=FRAG_COLOR_LOCATION)out vec4 frag_color;struct PBRInfo{float NdotL;float NdotV;float NdotH;float LdotH;float VdotH;float perceptualRoughness;float metalness;vec3 reflectance0;vec3 reflectance90;float alphaRoughness;vec3 diffuseColor;vec3 specularColor;};const float M_PI=3.141592653589793;const float c_MinRoughness=0.04;vec3 getNormal(){vec3 pos_dx=dFdx(v_position);vec3 pos_dy=dFdy(v_position);vec3 tex_dx=dFdx(vec3(v_uv,0.0));vec3 tex_dy=dFdy(vec3(v_uv,0.0));vec3 t=(tex_dy.t*pos_dx-tex_dx.t*pos_dy)/(tex_dx.s*tex_dy.t-tex_dy.s*tex_dx.t);vec3 ng=v_normal;t=normalize(t-ng*dot(ng,t));vec3 b=normalize(cross(ng,t));mat3 tbn=mat3(t,b,ng);\n#ifdef HAS_NORMALMAP\nvec3 n=texture(u_normalTexture,v_uv).rgb;n=normalize(tbn*((2.0*n-1.0)*vec3(u_normalTextureScale,u_normalTextureScale,1.0)));\n#else\nvec3 n=tbn[2].xyz;\n#endif\nreturn n;}vec3 getIBLContribution(PBRInfo pbrInputs,vec3 n,vec3 reflection){float mipCount=10.0;float lod=(pbrInputs.perceptualRoughness*mipCount);vec3 brdf=texture(u_brdfLUT,vec2(pbrInputs.NdotV,1.0-pbrInputs.perceptualRoughness)).rgb;vec3 diffuseLight=vec3(0.6,0.6,0.6);vec3 specularLight=vec3(0.6,0.6,0.6);vec3 diffuse=diffuseLight*pbrInputs.diffuseColor;vec3 specular=specularLight*(pbrInputs.specularColor*brdf.x+brdf.y);return diffuse+specular;}vec3 diffuse(PBRInfo pbrInputs){return pbrInputs.diffuseColor/M_PI;}vec3 specularReflection(PBRInfo pbrInputs){return pbrInputs.reflectance0+(pbrInputs.reflectance90-pbrInputs.reflectance0)*pow(clamp(1.0-pbrInputs.VdotH,0.0,1.0),5.0);}float geometricOcclusion(PBRInfo pbrInputs){float NdotL=pbrInputs.NdotL;float NdotV=pbrInputs.NdotV;float r=pbrInputs.alphaRoughness;float attenuationL=2.0*NdotL/(NdotL+sqrt(r*r+(1.0-r*r)*(NdotL*NdotL)));float attenuationV=2.0*NdotV/(NdotV+sqrt(r*r+(1.0-r*r)*(NdotV*NdotV)));return attenuationL*attenuationV;}float microfacetDistribution(PBRInfo pbrInputs){float roughnessSq=pbrInputs.alphaRoughness*pbrInputs.alphaRoughness;float f=(pbrInputs.NdotH*roughnessSq-pbrInputs.NdotH)*pbrInputs.NdotH+1.0;return roughnessSq/(M_PI*f*f);}void main(){float perceptualRoughness=u_roughnessFactor;float metallic=u_metallicFactor;\n#ifdef HAS_METALROUGHNESSMAP\nvec4 mrSample=texture(u_metallicRoughnessTexture,v_uv);perceptualRoughness=mrSample.g*perceptualRoughness;metallic=mrSample.b*metallic;\n#endif\nperceptualRoughness=clamp(perceptualRoughness,c_MinRoughness,1.0);metallic=clamp(metallic,0.0,1.0);float alphaRoughness=perceptualRoughness*perceptualRoughness;\n#ifdef HAS_BASECOLORMAP\nvec4 baseColor=texture(u_baseColorTexture,v_uv)*u_baseColorFactor;\n#else\nvec4 baseColor=u_baseColorFactor;\n#endif\nvec3 f0=vec3(0.04);vec3 diffuseColor=baseColor.rgb*(vec3(1.0)-f0);diffuseColor*=1.0-metallic;vec3 specularColor=mix(f0,baseColor.rgb,metallic);float reflectance=max(max(specularColor.r,specularColor.g),specularColor.b);float reflectance90=clamp(reflectance*25.0,0.0,1.0);vec3 specularEnvironmentR0=specularColor.rgb;vec3 specularEnvironmentR90=vec3(1.0,1.0,1.0)*reflectance90;vec3 n=getNormal();vec3 v=normalize(-v_position);vec3 l=normalize(vec3(1.0,1.0,1.0));vec3 h=normalize(l+v);vec3 reflection=-normalize(reflect(v,n));float NdotL=clamp(dot(n,l),0.001,1.0);float NdotV=abs(dot(n,v))+0.001;float NdotH=clamp(dot(n,h),0.0,1.0);float LdotH=clamp(dot(l,h),0.0,1.0);float VdotH=clamp(dot(v,h),0.0,1.0);PBRInfo pbrInputs=PBRInfo(NdotL,NdotV,NdotH,LdotH,VdotH,perceptualRoughness,metallic,specularEnvironmentR0,specularEnvironmentR90,alphaRoughness,diffuseColor,specularColor);vec3 F=specularReflection(pbrInputs);float G=geometricOcclusion(pbrInputs);float D=microfacetDistribution(pbrInputs);vec3 diffuseContrib=(1.0-F)*diffuse(pbrInputs);vec3 specContrib=max(vec3(0.0),F*G*D/(4.0*NdotL*NdotV));vec3 color=NdotL*(diffuseContrib+specContrib);color+=getIBLContribution(pbrInputs,n,reflection);\n#ifdef HAS_OCCLUSIONMAP\nfloat ao=texture(u_occlusionTexture,v_uv).r;color=mix(color,color*ao,u_occlusionStrength);\n#endif\n#ifdef HAS_EMISSIVEMAP\nvec3 emissive=texture(u_emissiveTexture,v_uv).rgb*u_emissiveFactor;color+=emissive;\n#endif\nfrag_color=vec4(color,baseColor.a);}");
                this.programObject = {
                    program: b,
                    uniformLocations: {},
                    uniformBlockIndices: {}
                };
                this.flags & h.HAS_SKIN && (this.programObject.uniformBlockIndices.JointMatrix = a.getUniformBlockIndex(b, "JointMatrix"));
                d = this.programObject.uniformLocations;
                d.MVP = a.getUniformLocation(b, "u_MVP");
                d.MVNormal = a.getUniformLocation(b, "u_MVNormal");
                d.MV = a.getUniformLocation(b, "u_MV");
                d.baseColorFactor = a.getUniformLocation(b, "u_baseColorFactor");
                d.metallicFactor = a.getUniformLocation(b, "u_metallicFactor");
                d.roughnessFactor = a.getUniformLocation(b, "u_roughnessFactor");
                this.flags & h.HAS_BASECOLORMAP && (d.baseColorTexture = a.getUniformLocation(b, "u_baseColorTexture"));
                this.flags & h.HAS_NORMALMAP && (d.normalTexture = a.getUniformLocation(b, "u_normalTexture"), d.normalTextureScale = a.getUniformLocation(b, "u_normalTextureScale"));
                this.flags & h.HAS_METALROUGHNESSMAP && (d.metallicRoughnessTexture = a.getUniformLocation(b, "u_metallicRoughnessTexture"));
                this.flags & h.HAS_OCCLUSIONMAP && (d.occlusionTexture = a.getUniformLocation(b, "u_occlusionTexture"), d.occlusionStrength = a.getUniformLocation(b, "u_occlusionStrength"));
                this.flags & h.HAS_EMISSIVEMAP && (d.emissiveTexture = a.getUniformLocation(b, "u_emissiveTexture"), d.emissiveFactor = a.getUniformLocation(b, "u_emissiveFactor"));
                a.useProgram(null);
                k[this.flags] = this.programObject
            }
        };
        var m = 1,
        p = L.create(),
        n = E.create();
        vc.create();
        var r = [];
        a.enable(a.CULL_FACE);
        a.cullFace(a.BACK);
        a.frontFace(a.CCW);
        var q = true;
        a.enable(a.DEPTH_TEST);
        a.depthFunc(a.LEQUAL);
        var t = t || {},
        y = null;
        L.create();
        var v = E.create();
        E.perspective(v, .785, f.width / f.height, .01, 100);
        E.create();
        var x = E.create(),
        u = E.create(),
        B = E.create();
        E.create();
        var A, D, C = [1, 1, 1, 1],
        G = t.drawPrimitive = function(b, d) {
            if (F) {
                u = x = F.matrix;
                E.invert(B, x);
                E.transpose(B, B);
                d = C;
                var k = b.shader,
                g = b.material;
                if (null !== g) {
                    var e = g.pbrMetallicRoughness;
                    d = e.baseColorFactor;
                    b.material.doubleSided === q && ((q = !b.material.doubleSided) ? a.enable(a.CULL_FACE) : a.disable(a.CULL_FACE))
                }
                y != b.shader.programObject && (y = b.shader.programObject, a.useProgram(y.program));
                g && (k.hasBaseColorMap() && c(y.uniformLocations.baseColorTexture, e.baseColorTexture), k.hasNormalMap() && (c(y.uniformLocations.normalTexture, g.normalTexture), a.uniform1f(y.uniformLocations.normalTextureScale, g.normalTexture.scale)), k.hasMetalRoughnessMap() && c(y.uniformLocations.metallicRoughnessTexture, e.metallicRoughnessTexture), a.uniform1f(y.uniformLocations.metallicFactor, e.metallicFactor), a.uniform1f(y.uniformLocations.roughnessFactor, e.roughnessFactor), k.hasOcclusionMap() && (c(y.uniformLocations.occlusionTexture, g.occlusionTexture), a.uniform1f(y.uniformLocations.occlusionStrength, g.occlusionTexture.strength)), k.hasEmissiveMap() && (c(y.uniformLocations.emissiveTexture, g.emissiveTexture), a.uniform3fv(y.uniformLocations.emissiveFactor, g.emissiveFactor)));
                k.hasSkin() && a.uniformBlockBinding(y.program, y.uniformBlockIndices.JointMatrix, A);
                a.activeTexture(a.TEXTURE0 + 29);
                a.bindTexture(a.TEXTURE_2D, null);
                a.uniform4fv(y.uniformLocations.baseColorFactor, d);
                a.uniformMatrix4fv(y.uniformLocations.MV, false, x);
                a.uniformMatrix4fv(y.uniformLocations.MVP, false, u);
                a.uniformMatrix4fv(y.uniformLocations.MVNormal, false, B);
                a.bindVertexArray(b.vertexArray);
                null !== b.indices ? a.drawElements(b.mode, b.indicesLength, b.indicesComponentType, b.indicesOffset) : a.drawArrays(b.mode, b.drawArraysOffset, b.drawArraysCount);
                a.bindVertexArray(null)
            }
        },
        H = E.create(),
        J = E.create(),
        w = t.drawNode = function(b, d, c, k) {
            d = c[d];
            undefined !== k ? E.mul(d, k, b.matrix) : E.copy(d, b.matrix);
            if (null !== b.skin) {
                var g = b.skin;
                A = g.uniformBlockID;
                var e = b.skin.joints;
                E.invert(J, d);
                k = 0;
                for (f = e.length; k < f; k++) {
                    var h = e[k];
                    E.mul(H, c[h.nodeID], g.inverseBindMatrix[k]);
                    E.mul(H, J, H);
                    g.jointMatrixUnidormBufferData.set(H, 16 * k)
                }
                a.bindBuffer(a.UNIFORM_BUFFER, g.jointMatrixUniformBuffer);
                a.bufferSubData(a.UNIFORM_BUFFER, 0, g.jointMatrixUnidormBufferData, 0, g.jointMatrixUnidormBufferData.length)
            }
            var f;
            if (null !== b.mesh) for (g = b.mesh, k = 0, f = g.primitives.length; k < f; k++) G(g.primitives[k], d);
            null !== b.skin && a.bindBuffer(a.UNIFORM_BUFFER, null);
            k = 0;
            for (f = b.children.length; k < f; k++) w(b.children[k], b.children[k].nodeID, c, d)
        },
        W = t.drawScene = function(a) {
            var d = a.glTF;
            if (d.animations) {
                var c = d.animations[b];
                var k;
                var g = 0;
                for (k = c.samplers.length; g < k; g++) c.samplers[g].getValue(I);
                g = 0;
                for (k = c.channels.length; g < k; g++) {
                    var e = c.channels[g];
                    var h = e.sampler;
                    var f = d.nodes[e.target.nodeID];
                    switch (e.target.path) {
                    case "rotation":
                        Ga.copy(f.rotation, h.curValue);
                        break;
                    case "translation":
                        L.copy(f.translation, h.curValue);
                        break;
                    case "scale":
                        L.copy(f.scale, h.curValue)
                    }
                    f.updateMatrixFromTRS()
                }
            }
            c = 0;
            for (d = a.glTFScene.nodes.length; c < d; c++) w(a.glTFScene.nodes[c], a.glTFScene.nodes[c].nodeID, a.nodeMatrix, a.rootTransform)
        },
        z = performance.now(),
        I = 0,
        F;
        return {
            setupScene: function(c, k) {
                function g(b, d) {
                    if (undefined !== b) {
                        var c = b.bufferView;
                        null === c.target ? (a.bindBuffer(a.ARRAY_BUFFER, c.buffer), a.bufferData(a.ARRAY_BUFFER, c.data, a.STATIC_DRAW)) : a.bindBuffer(c.target, c.buffer);
                        b.prepareVertexAttrib(d, a);
                        return ! 0
                    }
                    return ! 1
                }
                var h;
                if (c.animations) {
                    var f = 0;
                    for (h = c.animations.length; f < h; f++) d.add(c.animations[f].name || f)
                }
                b = 0;
                f = c.scenes[c.defaultScene];
                L.fromValues(1.2 * f.boundingBox.transform[0], 0, 0);
                L.create();
                k ? k = r[k.id] = new e(f, c, k.id) : (k = new e(f, c, r.length), r.push(k));
                1 === r.length && (E.identity(n), m = 1 / Math.max(f.boundingBox.transform[0], Math.max(f.boundingBox.transform[5], f.boundingBox.transform[10])), E.getTranslation(p, f.boundingBox.transform), L.scale(p, p, -1), p[0] += -.5 * f.boundingBox.transform[0], p[1] += -.5 * f.boundingBox.transform[5], p[2] += -.5 * f.boundingBox.transform[10], m *= .5, n[0] = m, n[5] = m, n[10] = m, E.translate(n, n, p), L.set(p, 0, 0, -1.5), m = 1);
                var t;
                f = 0;
                for (h = c.bufferViews.length; f < h; f++) {
                    var q = c.bufferViews[f];
                    q.createBuffer(a);
                    q.bindData(a)
                }
                if (c.textures) for (f = 0, h = c.textures.length; f < h; f++) {
                    var y = c.textures[f];
                    y.createTexture(a)
                }
                if (c.samplers) for (f = 0, h = c.samplers.length; f < h; f++) y = c.samplers[f],
                y.createSampler(a);
                if (c.skins) for (f = 0, h = c.skins.length; f < h; f++) y = c.skins[f],
                y.jointMatrixUniformBuffer = a.createBuffer(),
                a.bindBufferBase(a.UNIFORM_BUFFER, y.uniformBlockID, y.jointMatrixUniformBuffer),
                a.bindBuffer(a.UNIFORM_BUFFER, y.jointMatrixUniformBuffer),
                a.bufferData(a.UNIFORM_BUFFER, y.jointMatrixUnidormBufferData, a.DYNAMIC_DRAW),
                a.bufferSubData(a.UNIFORM_BUFFER, 0, y.jointMatrixUnidormBufferData),
                a.bindBuffer(a.UNIFORM_BUFFER, null);
                var u = 0;
                for (t = c.meshes.length; u < t; u++) for (y = c.meshes[u], f = 0, h = y.primitives.length; f < h; ++f) {
                    var v = y.primitives[f];
                    v.shader = new l;
                    v.vertexArray = q = a.createVertexArray();
                    a.bindVertexArray(q);
                    g(v.attributes.POSITION, 0);
                    g(v.attributes.NORMAL, 1);
                    g(v.attributes.TEXCOORD_0, 2);
                    g(v.attributes.JOINTS_0, 3) && g(v.attributes.WEIGHTS_0, 4) && v.shader.defineMacro("HAS_SKIN");
                    g(v.attributes.JOINTS_1, 5) && g(v.attributes.WEIGHTS_1, 6) && v.shader.defineMacro("SKIN_VEC8");
                    null !== v.indices && (q = c.accessors[v.indices], q = q.bufferView, null === q.target ? (a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, q.buffer), a.bufferData(a.ELEMENT_ARRAY_BUFFER, q.data, a.STATIC_DRAW)) : a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, q.buffer));
                    a.bindVertexArray(null);
                    a.bindBuffer(a.ARRAY_BUFFER, null);
                    a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, null);
                    if (q = v.material) q.pbrMetallicRoughness.baseColorTexture && v.shader.defineMacro("HAS_BASECOLORMAP"),
                    q.pbrMetallicRoughness.metallicRoughnessTexture && v.shader.defineMacro("HAS_METALROUGHNESSMAP"),
                    q.normalTexture && v.shader.defineMacro("HAS_NORMALMAP"),
                    q.occlusionTexture && v.shader.defineMacro("HAS_OCCLUSIONMAP"),
                    q.emissiveTexture && v.shader.defineMacro("HAS_EMISSIVEMAP");
                    v.shader.compile()
                }
                return k
            },
            render: t.render = function(b) {
                F = b;
                b = (new Date).getTime();
                var a;
                var d = 0;
                for (a = r.length; d < a; d++) D = r[d],
                W(r[d]);
                y = null;
                I = .001 * (b - z)
            }
        }
    }
    function da(f) {
        this.options = f = f || {};
        f.colors = f.colors || ["rgba(0,192,73,0.99609375)", "rgba(242,48,48,0.99609375)", "rgba(255,159,25,0.99609375)"];
        var c = f.colors;
        this.drawTogether = true;
        this.parseColors(c);
        this.tileSize = 256;
        this.ratio = window.devicePixelRatio;
        this.cache = {};
        f.getTileUrl && (this.getTileUrl = f.getTileUrl);
        this._loadCount = {}
    }
    function Vg(f) {
        var c = f / 2,
        a = f + c,
        b = new $c(2 * a, 2 * a),
        d = b.getContext("2d");
        d.shadowBlur = c;
        d.shadowColor = "black";
        d.shadowOffsetX = d.shadowOffsetY = 1E4;
        d.beginPath();
        d.arc(a - 1E4, a - 1E4, f, 0, 2 * Math.PI, true);
        d.closePath();
        d.fill();
        return b
    }
    var Ke = "undefined" !== typeof globalThis ? globalThis: "undefined" !== typeof window ? window: "undefined" !== typeof global ? global: "undefined" !== typeof self ? self: {},
    Wg = O(function(f, c) {
        c.__esModule = true;
        c.
    default = function(a, b) {
            if (! (a instanceof b)) throw new TypeError("Cannot call a class as a function");
        }
    }),
    I = T(Wg),
    ab = function(f) {
        if (undefined == f) throw TypeError("Can't call method on  " + f);
        return f
    },
    Xg = {}.hasOwnProperty,
    Z = function(f, c) {
        return Xg.call(f, c)
    },
    Yg = {}.toString,
    kb = function(f) {
        return Yg.call(f).slice(8, -1)
    },
    kd = Object("z").propertyIsEnumerable(0) ? Object: function(f) {
        return "String" == kb(f) ? f.split("") : Object(f)
    },
    Qa = function(f) {
        return kd(ab(f))
    },
    Zg = Math.ceil,
    $g = Math.floor,
    ld = function(f) {
        return isNaN(f = +f) ? 0 : (0 < f ? $g: Zg)(f)
    },
    ah = Math.min,
    wc = function(f) {
        return 0 < f ? ah(ld(f), 9007199254740991) : 0
    },
    bh = Math.max,
    ch = Math.min,
    X = O(function(f) {
        f = f.exports = {
            version: "2.6.5"
        };
        "number" == typeof __e && (__e = f)
    }),
    S = O(function(f) {
        f = f.exports = "undefined" != typeof window && Math == Math ? window: "undefined" != typeof self && self.Math == Math ? self: Function("return this")();
        "number" == typeof __g && (__g = f)
    }),
    Rb = O(function(f) {
        var c = S["__core-js_shared__"] || (S["__core-js_shared__"] = {}); (f.exports = function(a, b) {
            return c[a] || (c[a] = undefined !== b ? b: {})
        })("versions", []).push({
            version: X.version,
            mode: "pure",
            copyright: "\u00a9 2019 Denis Pushkarev (zloirock.ru)"
        })
    }),
    dh = 0,
    eh = Math.random(),
    xc = function(f) {
        return "Symbol(".concat(undefined === f ? "": f, ")_", (++dh + eh).toString(36))
    },
    Le = Rb("keys"),
    md = function(f) {
        return Le[f] || (Le[f] = xc(f))
    },
    fh = function(f) {
        return function(c, a, b) {
            c = Qa(c);
            var d = wc(c.length);
            b = ld(b);
            b = 0 > b ? bh(b + d, 0) : ch(b, d);
            if (f && a != a) for (; d > b;) {
                if (a = c[b++], a != a) return ! 0
            } else for (; d > b; b++) if ((f || b in c) && c[b] === a) return f || b || 0;
            return ! f && -1
        }
    } (false),
    gh = md("IE_PROTO"),
    Me = function(f, c) {
        f = Qa(f);
        var a = 0,
        b = [],
        d;
        for (d in f) d != gh && Z(f, d) && b.push(d);
        for (; c.length > a;) Z(f, d = c[a++]) && (~fh(b, d) || b.push(d));
        return b
    },
    yc = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
    wb = Object.keys ||
    function(f) {
        return Me(f, yc)
    },
    jb = function(f) {
        if ("function" != typeof f) throw TypeError(f + " is not a function!");
        return f
    },
    la = function(f, c, a) {
        jb(f);
        if (undefined === c) return f;
        switch (a) {
        case 1:
            return function(b) {
                return f.call(c, b)
            };
        case 2:
            return function(b, a) {
                return f.call(c, b, a)
            };
        case 3:
            return function(b, a, e) {
                return f.call(c, b, a, e)
            }
        }
        return function() {
            return f.apply(c, arguments)
        }
    },
    pa = function(f) {
        return "object" === typeof f ? null !== f: "function" === typeof f
    },
    sa = function(f) {
        if (!pa(f)) throw TypeError(f + " is not an object!");
        return f
    },
    bb = function(f) {
        try {
            return !! f()
        } catch(c) {
            return ! 0
        }
    },
    Ea = !bb(function() {
        return 7 != Object.defineProperty({},
        "a", {
            get: function() {
                return 7
            }
        }).a
    }),
    xb = S.document,
    zc = pa(xb) && pa(xb.createElement),
    Ne = !Ea && !bb(function() {
        return 7 != Object.defineProperty(zc ? xb.createElement("div") : {},
        "a", {
            get: function() {
                return 7
            }
        }).a
    }),
    Sb = function(f, c) {
        if (!pa(f)) return f;
        var a, b;
        if (c && "function" == typeof(a = f.toString) && !pa(b = a.call(f)) || "function" == typeof(a = f.valueOf) && !pa(b = a.call(f)) || !c && "function" == typeof(a = f.toString) && !pa(b = a.call(f))) return b;
        throw TypeError("Can't convert object to primitive value");
    },
    hh = Object.defineProperty,
    Aa = {
        f: Ea ? Object.defineProperty: function(f, c, a) {
            sa(f);
            c = Sb(c, true);
            sa(a);
            if (Ne) try {
                return hh(f, c, a)
            } catch(b) {}
            if ("get" in a || "set" in a) throw TypeError("Accessors not supported!");
            "value" in a && (f[c] = a.value);
            return f
        }
    },
    cb = function(f, c) {
        return {
            enumerable: !(f & 1),
            configurable: !(f & 2),
            writable: !(f & 4),
            value: c
        }
    },
    Va = Ea ?
    function(f, c, a) {
        return Aa.f(f, c, cb(1, a))
    }: function(f, c, a) {
        f[c] = a;
        return f
    },
    qa = function(f, c, a) {
        var b = f & qa.F,
        d = f & qa.G,
        e = f & qa.S,
        g = f & qa.P,
        h = f & qa.B,
        k = f & qa.W,
        l = d ? X: X[c] || (X[c] = {}),
        m = l.prototype;
        e = d ? S: e ? S[c] : (S[c] || {}).prototype;
        var p;
        d && (a = c);
        for (p in a) if (c = !b && e && undefined !== e[p], !c || !Z(l, p)) {
            var n = c ? e[p] : a[p];
            l[p] = d && "function" != typeof e[p] ? a[p] : h && c ? la(n, S) : k && e[p] == n ?
            function(b) {
                var a = function(a, d, c) {
                    if (this instanceof b) {
                        switch (arguments.length) {
                        case 0:
                            return new b;
                        case 1:
                            return new b(a);
                        case 2:
                            return new b(a, d)
                        }
                        return new b(a, d, c)
                    }
                    return b.apply(this, arguments)
                };
                a.prototype = b.prototype;
                return a
            } (n) : g && "function" == typeof n ? la(Function.call, n) : n;
            g && ((l.virtual || (l.virtual = {}))[p] = n, f & qa.R && m && !m[p] && Va(m, p, n))
        }
    };
    qa.F = 1;
    qa.G = 2;
    qa.S = 4;
    qa.P = 8;
    qa.B = 16;
    qa.W = 32;
    qa.Object.assign = 64;
    qa.R = 128;
    var F = qa,
    Ac = function(f, c) {
        var a = (X.Object || {})[f] || Object[f],
        b = {};
        b[f] = c(a);
        F(F.S + F.F * bb(function() {
            a(1)
        }), "Object", b)
    };
    Ac("keys",
    function() {
        return function(f) {
            return wb(Object(ab(f)))
        }
    });
    var ih = X.Object.keys,
    jh = O(function(f) {
        f.exports = {
            "default": ih,
            __esModule: true
        }
    }),
    Ba = T(jh),
    nd = Object.getOwnPropertySymbols,
    Bc = {}.propertyIsEnumerable,
    Cc = Object.assign,
    kh = !Cc || bb(function() {
        var f = {},
        c = {},
        a = Symbol();
        f[a] = 7;
        "abcdefghijklmnopqrst".split("").forEach(function(b) {
            c[b] = b
        });
        return 7 != Cc({},
        f)[a] || "abcdefghijklmnopqrst" != Object.keys(Cc({},
        c)).join("")
    }) ?
    function(f, c) {
        for (var a = Object(ab(f)), b = arguments.length, d = 1, e = nd, g = Bc; b > d;) for (var h = kd(arguments[d++]), k = e ? wb(h).concat(e(h)) : wb(h), l = k.length, m = 0, p; l > m;) g.call(h, p = k[m++]) && (a[p] = h[p]);
        return a
    }: Cc;
    F(F.S + F.F, "Object", {
        assign: kh
    });
    var lh = X.Object.assign,
    mh = O(function(f) {
        f.exports = {
            "default": lh,
            __esModule: true
        }
    }),
    Oe = md("IE_PROTO"),
    nh = Object.prototype,
    Pe = Object.getPrototypeOf ||
    function(f) {
        f = Object(ab(f));
        return Z(f, Oe) ? f[Oe] : "function" == typeof f.constructor && f instanceof f.constructor ? f.constructor.prototype: f instanceof Object ? nh: null
    };
    Ac("getPrototypeOf",
    function() {
        return function(f) {
            return Pe(Object(ab(f)))
        }
    });
    var oh = X.Object.getPrototypeOf,
    Tb = O(function(f) {
        f.exports = {
            "default": oh,
            __esModule: true
        }
    }),
    N = T(Tb);
    F(F.S + F.F * !Ea, "Object", {
        defineProperty: Aa.f
    });
    var ph = X.Object,
    qh = function(f, c, a) {
        return ph.defineProperty(f, c, a)
    },
    Wa = O(function(f) {
        f.exports = {
            "default": qh,
            __esModule: true
        }
    }),
    fa = T(Wa),
    rh = O(function(f, c) {
        c.__esModule = true;
        var a = Wa && Wa.__esModule ? Wa: {
        default:
            Wa
        };
        c.
    default = function() {
            function b(b, c) {
                for (var d = 0; d < c.length; d++) {
                    var e = c[d];
                    e.enumerable = e.enumerable || false;
                    e.configurable = true;
                    "value" in e && (e.writable = true); (0, a.
                default)(b, e.key, e)
                }
            }
            return function(a, c, g) {
                c && b(a.prototype, c);
                g && b(a, g);
                return a
            }
        } ()
    }),
    M = T(rh),
    Ra = {},
    sh = Ea ? Object.defineProperties: function(f, c) {
        sa(f);
        for (var a = wb(c), b = a.length, d = 0, e; b > d;) Aa.f(f, e = a[d++], c[e]);
        return f
    },
    Qe = S.document,
    od = Qe && Qe.documentElement,
    th = md("IE_PROTO"),
    pd = function() {},
    Dc = function() {
        var f = zc ? xb.createElement("iframe") : {},
        c = yc.length;
        f.style.display = "none";
        od.appendChild(f);
        f.src = "javascript:";
        f = f.contentWindow.document;
        f.open();
        f.write("<script>document.F=Object\x3c/script>");
        f.close();
        for (Dc = f.F; c--;) delete Dc.prototype[yc[c]];
        return Dc()
    },
    db = Object.create ||
    function(f, c) {
        if (null !== f) {
            pd.prototype = sa(f);
            var a = new pd;
            pd.prototype = null;
            a[th] = f
        } else a = Dc();
        return undefined === c ? a: sh(a, c)
    },
    ja = O(function(f) {
        var c = Rb("wks"),
        a = S.Symbol,
        b = "function" == typeof a; (f.exports = function(d) {
            return c[d] || (c[d] = b && a[d] || (b ? a: xc)("Symbol." + d))
        }).store = c
    }),
    uh = Aa.f,
    Re = ja("toStringTag"),
    lb = function(f, c, a) {
        f && !Z(f = a ? f: f.prototype, Re) && uh(f, Re, {
            configurable: true,
            value: c
        })
    },
    Se = {};
    Va(Se, ja("iterator"),
    function() {
        return this
    });
    var vh = function(f, c, a) {
        f.prototype = db(Se, {
            next: cb(1, a)
        });
        lb(f, c + " Iterator")
    },
    qd = ja("iterator"),
    rd = !([].keys && "next" in [].keys()),
    wh = function() {
        return this
    },
    sd = function(f, c, a, b, d, e, g) {
        vh(a, c, b);
        b = function(b) {
            return ! rd && b in m ? m[b] : function() {
                return new a(this, b)
            }
        };
        var h = c + " Iterator",
        k = "values" == d,
        l = false,
        m = f.prototype,
        p = m[qd] || m["@@iterator"] || d && m[d],
        n = p || b(d),
        r = d ? k ? b("entries") : n: undefined,
        q = "Array" == c ? m.entries || p: p,
        t;
        q && (f = Pe(q.call(new f)), f !== Object.prototype && f.next && lb(f, h, true));
        k && p && "values" !== p.name && (l = true, n = function() {
            return p.call(this)
        });
        g && (rd || l || !m[qd]) && Va(m, qd, n);
        Ra[c] = n;
        Ra[h] = wh;
        if (d) {
            var y = {
                values: k ? n: b("values"),
                keys: e ? n: b("keys"),
                entries: r
            };
            if (g) for (t in y) t in m || Va(m, t, y[t]);
            else F(F.P + F.F * (rd || l), c, y)
        }
        return y
    },
    xh = function(f) {
        return function(c, a) {
            c = String(ab(c));
            a = ld(a);
            var b = c.length,
            d;
            if (0 > a || a >= b) return f ? "": undefined;
            var e = c.charCodeAt(a);
            return 55296 > e || 56319 < e || a + 1 === b || 56320 > (d = c.charCodeAt(a + 1)) || 57343 < d ? f ? c.charAt(a) : e: f ? c.slice(a, a + 2) : (e - 55296 << 10) + (d - 56320) + 65536
        }
    } (true);
    sd(String, "String",
    function(f) {
        this._t = String(f);
        this._i = 0
    },
    function() {
        var f = this._t,
        c = this._i;
        if (c >= f.length) return {
            value: undefined,
            done: true
        };
        f = xh(f, c);
        this._i += f.length;
        return {
            value: f,
            done: false
        }
    });
    var eb = function(f, c) {
        return {
            value: c,
            done: !!f
        }
    };
    sd(Array, "Array",
    function(f, c) {
        this._t = Qa(f);
        this._i = 0;
        this._k = c
    },
    function() {
        var f = this._t,
        c = this._k,
        a = this._i++;
        return ! f || a >= f.length ? (this._t = undefined, eb(1)) : "keys" == c ? eb(0, a) : "values" == c ? eb(0, f[a]) : eb(0, [a, f[a]])
    },
    "values");
    Ra.Arguments = Ra.Array;
    for (var Te = ja("toStringTag"), Ue = "CSSRuleList CSSStyleDeclaration CSSValueList ClientRectList DOMRectList DOMStringList DOMTokenList DataTransferItemList FileList HTMLAllCollection HTMLCollection HTMLFormElement HTMLSelectElement MediaList MimeTypeArray NamedNodeMap NodeList PaintRequestList Plugin PluginArray SVGLengthList SVGNumberList SVGPathSegList SVGPointList SVGStringList SVGTransformList SourceBufferList StyleSheetList TextTrackCueList TextTrackList TouchList".split(" "), td = 0; td < Ue.length; td++) {
        var ud = Ue[td],
        Ve = S[ud],
        vd = Ve && Ve.prototype;
        vd && !vd[Te] && Va(vd, Te, ud);
        Ra[ud] = Ra.Array
    }
    var Ec = {
        f: ja
    },
    yh = Ec.f("iterator"),
    Ub = O(function(f) {
        f.exports = {
            "default": yh,
            __esModule: true
        }
    });
    T(Ub);
    var Fc = O(function(f) {
        var c = xc("meta"),
        a = Aa.f,
        b = 0,
        d = Object.isExtensible ||
        function() {
            return ! 0
        },
        e = !bb(function() {
            return d(Object.preventExtensions({}))
        }),
        g = function(d) {
            a(d, c, {
                value: {
                    i: "O" + ++b,
                    w: {}
                }
            })
        },
        h = f.exports = {
            KEY: c,
            NEED: false,
            fastKey: function(b, a) {
                if (!pa(b)) return "symbol" == typeof b ? b: ("string" == typeof b ? "S": "P") + b;
                if (!Z(b, c)) {
                    if (!d(b)) return "F";
                    if (!a) return "E";
                    g(b)
                }
                return b[c].i
            },
            getWeak: function(b, a) {
                if (!Z(b, c)) {
                    if (!d(b)) return ! 0;
                    if (!a) return ! 1;
                    g(b)
                }
                return b[c].w
            },
            onFreeze: function(b) {
                e && h.NEED && d(b) && !Z(b, c) && g(b);
                return b
            }
        }
    }),
    zh = Aa.f,
    wd = function(f) {
        var c = X.Symbol || (X.Symbol = {});
        "_" == f.charAt(0) || f in c || zh(c, f, {
            value: Ec.f(f)
        })
    },
    xd = Array.isArray ||
    function(f) {
        return "Array" == kb(f)
    },
    Ah = yc.concat("length", "prototype"),
    We = Object.getOwnPropertyNames ||
    function(f) {
        return Me(f, Ah)
    },
    Xe = We,
    Bh = {}.toString,
    Ye = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
    Ze = function(f) {
        if (Ye && "[object Window]" == Bh.call(f)) try {
            var c = Xe(f)
        } catch(a) {
            c = Ye.slice()
        } else c = Xe(Qa(f));
        return c
    },
    $e = Object.getOwnPropertyDescriptor,
    Gc = {
        f: Ea ? $e: function(f, c) {
            f = Qa(f);
            c = Sb(c, true);
            if (Ne) try {
                return $e(f, c)
            } catch(a) {}
            if (Z(f, c)) return cb(!Bc.call(f, c), f[c])
        }
    },
    Ch = Fc.KEY,
    af = Gc.f,
    mb = Aa.f,
    bf = Ze,
    va = S.Symbol,
    Hc = S.JSON,
    Ic = Hc && Hc.stringify,
    wa = ja("_hidden"),
    cf = ja("toPrimitive"),
    Dh = {}.propertyIsEnumerable,
    Vb = Rb("symbol-registry"),
    Xa = Rb("symbols"),
    Wb = Rb("op-symbols"),
    Ha = Object.prototype,
    yb = "function" == typeof va,
    yd = S.QObject,
    zd = !yd || !yd.prototype || !yd.prototype.findChild,
    Ad = Ea && bb(function() {
        return 7 != db(mb({},
        "a", {
            get: function() {
                return mb(this, "a", {
                    value: 7
                }).a
            }
        })).a
    }) ?
    function(f, c, a) {
        var b = af(Ha, c);
        b && delete Ha[c];
        mb(f, c, a);
        b && f !== Ha && mb(Ha, c, b)
    }: mb,
    df = function(f) {
        var c = Xa[f] = db(va.prototype);
        c._k = f;
        return c
    },
    Bd = yb && "symbol" == typeof va.iterator ?
    function(f) {
        return "symbol" == typeof f
    }: function(f) {
        return f instanceof va
    },
    Jc = function(f, c, a) {
        f === Ha && Jc(Wb, c, a);
        sa(f);
        c = Sb(c, true);
        sa(a);
        return Z(Xa, c) ? (a.enumerable ? (Z(f, wa) && f[wa][c] && (f[wa][c] = false), a = db(a, {
            enumerable: cb(0, false)
        })) : (Z(f, wa) || mb(f, wa, cb(1, {})), f[wa][c] = true), Ad(f, c, a)) : mb(f, c, a)
    },
    ef = function(f, c) {
        sa(f);
        var a = c = Qa(c),
        b = wb(a),
        d = nd;
        if (d) {
            d = d(a);
            for (var e = Bc,
            g = 0,
            h; d.length > g;) e.call(a, h = d[g++]) && b.push(h)
        }
        a = 0;
        h = b.length;
        for (var k; h > a;) Jc(f, k = b[a++], c[k]);
        return f
    },
    Eh = function(f) {
        var c = Dh.call(this, f = Sb(f, true));
        return this === Ha && Z(Xa, f) && !Z(Wb, f) ? false : c || !Z(this, f) || !Z(Xa, f) || Z(this, wa) && this[wa][f] ? c: true
    },
    ff = function(f, c) {
        f = Qa(f);
        c = Sb(c, true);
        if (f !== Ha || !Z(Xa, c) || Z(Wb, c)) {
            var a = af(f, c); ! a || !Z(Xa, c) || Z(f, wa) && f[wa][c] || (a.enumerable = true);
            return a
        }
    },
    gf = function(f) {
        f = bf(Qa(f));
        for (var c = [], a = 0, b; f.length > a;) Z(Xa, b = f[a++]) || b == wa || b == Ch || c.push(b);
        return c
    },
    hf = function(f) {
        var c = f === Ha;
        f = bf(c ? Wb: Qa(f));
        for (var a = [], b = 0, d; f.length > b;) Z(Xa, d = f[b++]) && (c ? Z(Ha, d) : 1) && a.push(Xa[d]);
        return a
    };
    yb || (va = function() {
        if (this instanceof va) throw TypeError("Symbol is not a constructor!");
        var f = xc(0 < arguments.length ? arguments[0] : undefined),
        c = function(a) {
            this === Ha && c.call(Wb, a);
            Z(this, wa) && Z(this[wa], f) && (this[wa][f] = false);
            Ad(this, f, cb(1, a))
        };
        Ea && zd && Ad(Ha, f, {
            configurable: true,
            set: c
        });
        return df(f)
    },
    Va(va.prototype, "toString",
    function() {
        return this._k
    }), Gc.f = ff, Aa.f = Jc, We = Ze = gf, Bc = Eh, nd = hf, Ec.f = function(f) {
        return df(ja(f))
    });
    F(F.G + F.W + F.F * !yb, {
        Symbol: va
    });
    for (var jf = "hasInstance isConcatSpreadable iterator match replace search species split toPrimitive toStringTag unscopables".split(" "), kf = 0; jf.length > kf;) ja(jf[kf++]);
    for (var lf = wb(ja.store), mf = 0; lf.length > mf;) wd(lf[mf++]);
    F(F.S + F.F * !yb, "Symbol", {
        "for": function(f) {
            return Z(Vb, f += "") ? Vb[f] : Vb[f] = va(f)
        },
        keyFor: function(f) {
            if (!Bd(f)) throw TypeError(f + " is not a symbol!");
            for (var c in Vb) if (Vb[c] === f) return c
        },
        useSetter: function() {
            zd = true
        },
        useSimple: function() {
            zd = false
        }
    });
    F(F.S + F.F * !yb, "Object", {
        create: function(f, c) {
            return undefined === c ? db(f) : ef(db(f), c)
        },
        defineProperty: Jc,
        defineProperties: ef,
        getOwnPropertyDescriptor: ff,
        getOwnPropertyNames: gf,
        getOwnPropertySymbols: hf
    });
    Hc && F(F.S + F.F * (!yb || bb(function() {
        var f = va();
        return "[null]" != Ic([f]) || "{}" != Ic({
            a: f
        }) || "{}" != Ic(Object(f))
    })), "JSON", {
        stringify: function(f) {
            for (var c = [f], a = 1, b; arguments.length > a;) c.push(arguments[a++]);
            b = a = c[1];
            if ((pa(a) || undefined !== f) && !Bd(f)) return xd(a) || (a = function(a, c) {
                "function" == typeof b && (c = b.call(this, a, c));
                if (!Bd(c)) return c
            }),
            c[1] = a,
            Ic.apply(Hc, c)
        }
    });
    va.prototype[cf] || Va(va.prototype, cf, va.prototype.valueOf);
    lb(va, "Symbol");
    lb(Math, "Math", true);
    lb(S.JSON, "JSON", true);
    wd("asyncIterator");
    wd("observable");
    var Fh = X.Symbol,
    Xb = O(function(f) {
        f.exports = {
            "default": Fh,
            __esModule: true
        }
    }),
    nf = T(Xb),
    zb = O(function(f, c) {
        c.__esModule = true;
        f = Ub && Ub.__esModule ? Ub: {
        default:
            Ub
        };
        var a = Xb && Xb.__esModule ? Xb: {
        default:
            Xb
        },
        b = "function" === typeof a.
    default && "symbol" === typeof f.
    default ?
        function(b) {
            return typeof b
        }: function(b) {
            return b && "function" === typeof a.
        default && b.constructor === a.
        default && b !== a.
        default.prototype ? "symbol": typeof b
        };
        c.
    default = "function" === typeof a.
    default && "symbol" === b(f.
    default) ?
        function(a) {
            return "undefined" === typeof a ? "undefined": b(a)
        }: function(d) {
            return d && "function" === typeof a.
        default && d.constructor === a.
        default && d !== a.
        default.prototype ? "symbol": "undefined" === typeof d ? "undefined": b(d)
        }
    }),
    sb = T(zb),
    Gh = O(function(f, c) {
        c.__esModule = true;
        var a = zb && zb.__esModule ? zb: {
        default:
            zb
        };
        c.
    default = function(b, d) {
            if (!b) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! d || "object" !== ("undefined" === typeof d ? "undefined": (0, a.
        default)(d)) && "function" !== typeof d ? b: d
        }
    }),
    Q = T(Gh),
    Hh = Object.setPrototypeOf || ("__proto__" in {} ?
    function(f, c, a) {
        try {
            a = la(Function.call, Gc.f(Object.prototype, "__proto__").set, 2),
            a(f, []),
            c = !(f instanceof Array)
        } catch(b) {
            c = true
        }
        return function(b, d) {
            sa(b);
            if (!pa(d) && null !== d) throw TypeError(d + ": can't set as prototype!");
            c ? b.__proto__ = d: a(b, d);
            return b
        }
    } ({},
    false) : undefined);
    F(F.S, "Object", {
        setPrototypeOf: Hh
    });
    var Ih = X.Object.setPrototypeOf,
    of = O(function(f) {
        f.exports = {
            "default": Ih,
            __esModule: true
        }
    });
    T(of);
    F(F.S, "Object", {
        create: db
    });
    var Jh = X.Object,
    Kh = function(f, c) {
        return Jh.create(f, c)
    },
    pf = O(function(f) {
        f.exports = {
            "default": Kh,
            __esModule: true
        }
    }),
    Lh = T(pf),
    Mh = O(function(f, c) {
        function a(b) {
            return b && b.__esModule ? b: {
            default:
                b
            }
        }
        c.__esModule = true;
        var b = a(of),
        d = a(pf),
        e = a(zb);
        c.
    default = function(a, c) {
            if ("function" !== typeof c && null !== c) throw new TypeError("Super expression must either be null or a function, not " + ("undefined" === typeof c ? "undefined": (0, e.
        default)(c)));
            a.prototype = (0, d.
        default)(c && c.prototype, {
                constructor: {
                    value: a,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            c && (b.
        default ? (0, b.
        default)(a, c) : a.__proto__ = c)
        }
    }),
    R = T(Mh),
    Nh = ja("toStringTag"),
    Oh = "Arguments" == kb(function() {
        return arguments
    } ()),
    Kc = function(f) {
        var c;
        if (undefined === f) var a = "Undefined";
        else {
            if (null === f) var b = "Null";
            else {
                a: {
                    var d = f = Object(f);
                    try {
                        b = d[Nh];
                        break a
                    } catch(e) {}
                    b = undefined
                }
                b = "string" == typeof(a = b) ? a: Oh ? kb(f) : "Object" == (c = kb(f)) && "function" == typeof f.callee ? "Arguments": c
            }
            a = b
        }
        return a
    },
    Ph = ja("iterator"),
    Qh = X.isIterable = function(f) {
        f = Object(f);
        return undefined !== f[Ph] || "@@iterator" in f || Ra.hasOwnProperty(Kc(f))
    },
    Yb = O(function(f) {
        f.exports = {
            "default": Qh,
            __esModule: true
        }
    });
    T(Yb);
    var Rh = ja("iterator"),
    Cd = X.getIteratorMethod = function(f) {
        if (undefined != f) return f[Rh] || f["@@iterator"] || Ra[Kc(f)]
    },
    Sh = X.getIterator = function(f) {
        var c = Cd(f);
        if ("function" != typeof c) throw TypeError(f + " is not iterable!");
        return sa(c.call(f))
    },
    Zb = O(function(f) {
        f.exports = {
            "default": Sh,
            __esModule: true
        }
    }),
    id = T(Zb),
    Th = O(function(f, c) {
        c.__esModule = true;
        var a = Yb && Yb.__esModule ? Yb: {
        default:
            Yb
        },
        b = Zb && Zb.__esModule ? Zb: {
        default:
            Zb
        };
        c.
    default = function() {
            return function(d, c) {
                if (Array.isArray(d)) return d;
                if ((0, a.
            default)(Object(d))) {
                    var g = [],
                    e = true,
                    k = false,
                    f = undefined;
                    try {
                        for (var m = (0, b.
                    default)(d), p; ! (e = (p = m.next()).done) && (g.push(p.value), !c || g.length !== c); e = true);
                    } catch(n) {
                        k = true,
                        f = n
                    } finally {
                        try {
                            if (!e && m["return"]) m["return"]()
                        } finally {
                            if (k) throw f;
                        }
                    }
                    return g
                }
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        } ()
    }),
    Ia = T(Th),
    qf = function(f, c, a, b) {
        try {
            return b ? c(sa(a)[0], a[1]) : c(a)
        } catch(d) {
            throw c = f["return"],
            undefined !== c && sa(c.call(f)),
            d;
        }
    },
    rf = ja("iterator"),
    sf = Array.prototype,
    Dd = ja("iterator"),
    tf = false;
    try { [7][Dd]()["return"] = function() {
            tf = true
        }
    } catch(f) {}
    var uf = function(f, c) {
        if (!c && !tf) return ! 1;
        var a = false;
        try {
            c = [7];
            var b = c[Dd]();
            b.next = function() {
                return {
                    done: a = true
                }
            };
            c[Dd] = function() {
                return b
            };
            f(c)
        } catch(d) {}
        return a
    };
    F(F.S + F.F * !uf(function(f) {}), "Array", {
        from: function(f) {
            var c = Object(ab(f)),
            a = "function" == typeof this ? this: Array,
            b = arguments.length,
            d = 1 < b ? arguments[1] : undefined,
            e = undefined !== d,
            g = 0,
            h = Cd(c),
            k;
            e && (d = la(d, 2 < b ? arguments[2] : undefined, 2));
            if (undefined != h && (a != Array || undefined === h || Ra.Array !== h && sf[rf] !== h)) for (c = h.call(c), a = new a; ! (k = c.next()).done; g++) b = a,
            h = g,
            k = e ? qf(c, d, [k.value, g], true) : k.value,
            h in b ? Aa.f(b, h, cb(0, k)) : b[h] = k;
            else for (b = wc(c.length), a = new a(b); b > g; g++) {
                h = a;
                k = g;
                var l = e ? d(c[g], g) : c[g];
                k in h ? Aa.f(h, k, cb(0, l)) : h[k] = l
            }
            a.length = g;
            return a
        }
    });
    var Uh = X.Array.from,
    $b = O(function(f) {
        f.exports = {
            "default": Uh,
            __esModule: true
        }
    }),
    Vh = T($b),
    Wh = O(function(f, c) {
        c.__esModule = true;
        var a = $b && $b.__esModule ? $b: {
        default:
            $b
        };
        c.
    default = function(b) {
            if (Array.isArray(b)) {
                for (var d = 0,
                c = Array(b.length); d < b.length; d++) c[d] = b[d];
                return c
            }
            return (0, a.
        default)(b)
        }
    }),
    Y = T(Wh),
    Xh = Fc.onFreeze;
    Ac("freeze",
    function(f) {
        return function(c) {
            return f && pa(c) ? f(Xh(c)) : c
        }
    });
    var Yh = X.Object.freeze,
    Zh = O(function(f) {
        f.exports = {
            "default": Yh,
            __esModule: true
        }
    }),
    ee = T(Zh),
    vf = X.JSON || (X.JSON = {
        stringify: JSON.stringify
    }),
    $h = function(f) {
        return vf.stringify.apply(vf, arguments)
    },
    ai = O(function(f) {
        f.exports = {
            "default": $h,
            __esModule: true
        }
    }),
    Ag = T(ai),
    Ja = {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 134, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 250, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 221],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        rebeccapurple: [102, 51, 153],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [112, 128, 144],
        slategrey: [112, 128, 144],
        snow: [255, 250, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 50]
    },
    bi = Gc.f;
    Ac("getOwnPropertyDescriptor",
    function() {
        return function(f, c) {
            return bi(Qa(f), c)
        }
    });
    var ci = X.Object,
    di = function(f, c) {
        return ci.getOwnPropertyDescriptor(f, c)
    },
    ac = O(function(f) {
        f.exports = {
            "default": di,
            __esModule: true
        }
    }),
    ea = T(ac),
    bc = O(function(f) {
        var c = Array.prototype.concat,
        a = Array.prototype.slice,
        b = f.exports = function(b) {
            for (var d = [], g = 0, h = b.length; g < h; g++) {
                var k = b[g];
                var f = (f = k) && "string" !== typeof f ? f instanceof Array || Array.isArray(f) || 0 <= f.length && (f.splice instanceof Function || ea(f, f.length - 1) && "String" !== f.constructor.name) : false;
                f ? d = c.call(d, a.call(k)) : d.push(k)
            }
            return d
        };
        b.wrap = function(a) {
            return function() {
                return a(b(arguments))
            }
        }
    }),
    Jb = O(function(f) {
        function c(b, a, d) {
            return Math.min(Math.max(a, b), d)
        }
        function a(b) {
            b = b.toString(16).toUpperCase();
            return 2 > b.length ? "0" + b: b
        }
        var b = {},
        d;
        for (d in Ja) Ja.hasOwnProperty(d) && (b[Ja[d]] = d);
        var e = f.exports = {
            to: {},
            get: {}
        };
        e.get = function(b) {
            switch (b.substring(0, 3).toLowerCase()) {
            case "hsl":
                b = e.get.hsl(b);
                var a = "hsl";
                break;
            case "hwb":
                b = e.get.hwb(b);
                a = "hwb";
                break;
            default:
                b = e.get.rgb(b),
                a = "rgb"
            }
            return b ? {
                model: a,
                value: b
            }: null
        };
        e.get.rgb = function(b) {
            if (!b) return null;
            var a = /^#([a-f0-9]{3,4})$/i,
            d = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
            g = /^rgba?\(\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
            e = /(\D+)/,
            f = [0, 0, 0, 1],
            n;
            if (n = b.match(/^#([a-f0-9]{6})([a-f0-9]{2})?$/i)) {
                a = n[2];
                n = n[1];
                for (b = 0; 3 > b; b++) d = 2 * b,
                f[b] = parseInt(n.slice(d, d + 2), 16);
                a && (f[3] = Math.round(parseInt(a, 16) / 255 * 100) / 100)
            } else if (n = b.match(a)) {
                n = n[1];
                a = n[3];
                for (b = 0; 3 > b; b++) f[b] = parseInt(n[b] + n[b], 16);
                a && (f[3] = Math.round(parseInt(a + a, 16) / 255 * 100) / 100)
            } else if (n = b.match(d)) {
                for (b = 0; 3 > b; b++) f[b] = parseInt(n[b + 1], 0);
                n[4] && (f[3] = parseFloat(n[4]))
            } else if (n = b.match(g)) {
                for (b = 0; 3 > b; b++) f[b] = Math.round(2.55 * parseFloat(n[b + 1]));
                n[4] && (f[3] = parseFloat(n[4]))
            } else {
                if (n = b.match(e)) {
                    if ("transparent" === n[1]) return [0, 0, 0, 0];
                    f = Ja[n[1]];
                    if (!f) return null;
                    f[3] = 1;
                    return f
                }
                return null
            }
            for (b = 0; 3 > b; b++) f[b] = c(f[b], 0, 255);
            f[3] = c(f[3], 0, 1);
            return f
        };
        e.get.hsl = function(b) {
            if (!b) return null;
            var a = b.match(/^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/);
            if (a) {
                var d = parseFloat(a[4]);
                b = (parseFloat(a[1]) + 360) % 360;
                var g = c(parseFloat(a[2]), 0, 100);
                a = c(parseFloat(a[3]), 0, 100);
                d = c(isNaN(d) ? 1 : d, 0, 1);
                return [b, g, a, d]
            }
            return null
        };
        e.get.hwb = function(b) {
            if (!b) return null;
            var a = b.match(/^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/);
            if (a) {
                var d = parseFloat(a[4]);
                b = (parseFloat(a[1]) % 360 + 360) % 360;
                var g = c(parseFloat(a[2]), 0, 100);
                a = c(parseFloat(a[3]), 0, 100);
                d = c(isNaN(d) ? 1 : d, 0, 1);
                return [b, g, a, d]
            }
            return null
        };
        e.to.hex = function() {
            var b = bc(arguments);
            return "#" + a(b[0]) + a(b[1]) + a(b[2]) + (1 > b[3] ? a(Math.round(255 * b[3])) : "")
        };
        e.to.rgb = function() {
            var b = bc(arguments);
            return 4 > b.length || 1 === b[3] ? "rgb(" + Math.round(b[0]) + ", " + Math.round(b[1]) + ", " + Math.round(b[2]) + ")": "rgba(" + Math.round(b[0]) + ", " + Math.round(b[1]) + ", " + Math.round(b[2]) + ", " + b[3] + ")"
        };
        e.to.rgb.percent = function() {
            var b = bc(arguments),
            a = Math.round(b[0] / 255 * 100),
            d = Math.round(b[1] / 255 * 100),
            c = Math.round(b[2] / 255 * 100);
            return 4 > b.length || 1 === b[3] ? "rgb(" + a + "%, " + d + "%, " + c + "%)": "rgba(" + a + "%, " + d + "%, " + c + "%, " + b[3] + ")"
        };
        e.to.hsl = function() {
            var b = bc(arguments);
            return 4 > b.length || 1 === b[3] ? "hsl(" + b[0] + ", " + b[1] + "%, " + b[2] + "%)": "hsla(" + b[0] + ", " + b[1] + "%, " + b[2] + "%, " + b[3] + ")"
        };
        e.to.hwb = function() {
            var b = bc(arguments),
            a = "";
            4 <= b.length && 1 !== b[3] && (a = ", " + b[3]);
            return "hwb(" + b[0] + ", " + b[1] + "%, " + b[2] + "%" + a + ")"
        };
        e.to.keyword = function(a) {
            return b[a.slice(0, 3)]
        }
    }),
    nb = O(function(f) {
        var c = {};
        for (d in Ja) Ja.hasOwnProperty(d) && (c[Ja[d]] = d);
        var a = f.exports = {
            rgb: {
                channels: 3,
                labels: "rgb"
            },
            hsl: {
                channels: 3,
                labels: "hsl"
            },
            hsv: {
                channels: 3,
                labels: "hsv"
            },
            hwb: {
                channels: 3,
                labels: "hwb"
            },
            cmyk: {
                channels: 4,
                labels: "cmyk"
            },
            xyz: {
                channels: 3,
                labels: "xyz"
            },
            lab: {
                channels: 3,
                labels: "lab"
            },
            lch: {
                channels: 3,
                labels: "lch"
            },
            hex: {
                channels: 1,
                labels: ["hex"]
            },
            keyword: {
                channels: 1,
                labels: ["keyword"]
            },
            ansi16: {
                channels: 1,
                labels: ["ansi16"]
            },
            ansi256: {
                channels: 1,
                labels: ["ansi256"]
            },
            hcg: {
                channels: 3,
                labels: ["h", "c", "g"]
            },
            apple: {
                channels: 3,
                labels: ["r16", "g16", "b16"]
            },
            gray: {
                channels: 1,
                labels: ["gray"]
            }
        },
        b;
        for (b in a) if (a.hasOwnProperty(b)) {
            if (! ("channels" in a[b])) throw Error("missing channels property: " + b);
            if (! ("labels" in a[b])) throw Error("missing channel labels property: " + b);
            if (a[b].labels.length !== a[b].channels) throw Error("channel and label counts mismatch: " + b);
            f = a[b].channels;
            var d = a[b].labels;
            delete a[b].channels;
            delete a[b].labels;
            Object.defineProperty(a[b], "channels", {
                value: f
            });
            Object.defineProperty(a[b], "labels", {
                value: d
            })
        }
        a.rgb.hsl = function(b) {
            var a = b[0] / 255,
            d = b[1] / 255,
            c = b[2] / 255;
            b = Math.min(a, d, c);
            var e = Math.max(a, d, c),
            f = e - b,
            p;
            e === b ? p = 0 : a === e ? p = (d - c) / f: d === e ? p = 2 + (c - a) / f: c === e && (p = 4 + (a - d) / f);
            p = Math.min(60 * p, 360);
            0 > p && (p += 360);
            a = (b + e) / 2;
            return [p, 100 * (e === b ? 0 : .5 >= a ? f / (e + b) : f / (2 - e - b)), 100 * a]
        };
        a.rgb.hsv = function(b) {
            var a, d = b[0] / 255,
            c = b[1] / 255,
            e = b[2] / 255,
            f = Math.max(d, c, e);
            var p = f - Math.min(d, c, e);
            if (0 === p) var n = a = 0;
            else {
                a = p / f;
                b = (f - d) / 6 / p + .5;
                var r = (f - c) / 6 / p + .5;
                p = (f - e) / 6 / p + .5;
                d === f ? n = p - r: c === f ? n = 1 / 3 + b - p: e === f && (n = 2 / 3 + r - b);
                0 > n ? n += 1 : 1 < n && --n
            }
            return [360 * n, 100 * a, 100 * f]
        };
        a.rgb.hwb = function(b) {
            var d = b[0],
            c = b[1],
            k = b[2];
            b = a.rgb.hsl(b)[0];
            var e = 1 / 255 * Math.min(d, Math.min(c, k));
            k = 1 - 1 / 255 * Math.max(d, Math.max(c, k));
            return [b, 100 * e, 100 * k]
        };
        a.rgb.cmyk = function(b) {
            var a = b[0] / 255,
            d = b[1] / 255;
            b = b[2] / 255;
            var c = Math.min(1 - a, 1 - d, 1 - b);
            return [100 * ((1 - a - c) / (1 - c) || 0), 100 * ((1 - d - c) / (1 - c) || 0), 100 * ((1 - b - c) / (1 - c) || 0), 100 * c]
        };
        a.rgb.keyword = function(b) {
            var a = c[b];
            if (a) return a;
            a = Infinity;
            var d;
            for (d in Ja) if (Ja.hasOwnProperty(d)) {
                var k = Ja[d];
                k = Math.pow(b[0] - k[0], 2) + Math.pow(b[1] - k[1], 2) + Math.pow(b[2] - k[2], 2);
                if (k < a) {
                    a = k;
                    var e = d
                }
            }
            return e
        };
        a.keyword.rgb = function(b) {
            return Ja[b]
        };
        a.rgb.xyz = function(b) {
            var a = b[0] / 255,
            d = b[1] / 255;
            b = b[2] / 255;
            a = .04045 < a ? Math.pow((a + .055) / 1.055, 2.4) : a / 12.92;
            d = .04045 < d ? Math.pow((d + .055) / 1.055, 2.4) : d / 12.92;
            b = .04045 < b ? Math.pow((b + .055) / 1.055, 2.4) : b / 12.92;
            return [100 * (.4124 * a + .3576 * d + .1805 * b), 100 * (.2126 * a + .7152 * d + .0722 * b), 100 * (.0193 * a + .1192 * d + .9505 * b)]
        };
        a.rgb.lab = function(b) {
            var d = a.rgb.xyz(b);
            b = d[0];
            var c = d[1];
            d = d[2];
            b /= 95.047;
            c /= 100;
            d /= 108.883;
            b = .008856 < b ? Math.pow(b, 1 / 3) : 7.787 * b + 16 / 116;
            c = .008856 < c ? Math.pow(c, 1 / 3) : 7.787 * c + 16 / 116;
            d = .008856 < d ? Math.pow(d, 1 / 3) : 7.787 * d + 16 / 116;
            return [116 * c - 16, 500 * (b - c), 200 * (c - d)]
        };
        a.hsl.rgb = function(b) {
            var a = b[0] / 360,
            d = b[1] / 100;
            b = b[2] / 100;
            if (0 === d) {
                var c = 255 * b;
                return [c, c, c]
            }
            d = .5 > b ? b * (1 + d) : b + d - b * d;
            b = 2 * b - d;
            var e = [0, 0, 0];
            for (var f = 0; 3 > f; f++) c = a + 1 / 3 * -(f - 1),
            0 > c && c++,
            1 < c && c--,
            c = 1 > 6 * c ? b + 6 * (d - b) * c: 1 > 2 * c ? d: 2 > 3 * c ? b + (d - b) * (2 / 3 - c) * 6 : b,
            e[f] = 255 * c;
            return e
        };
        a.hsl.hsv = function(b) {
            var a = b[0],
            d = b[1] / 100;
            b = b[2] / 100;
            var c = d,
            e = Math.max(b, .01);
            b *= 2;
            d *= 1 >= b ? b: 2 - b;
            c *= 1 >= e ? e: 2 - e;
            return [a, 100 * (0 === b ? 2 * c / (e + c) : 2 * d / (b + d)), (b + d) / 2 * 100]
        };
        a.hsv.rgb = function(b) {
            var a = b[0] / 60,
            d = b[1] / 100;
            b = b[2] / 100;
            var c = Math.floor(a) % 6,
            e = a - Math.floor(a);
            a = 255 * b * (1 - d);
            var f = 255 * b * (1 - d * e);
            d = 255 * b * (1 - d * (1 - e));
            b *= 255;
            switch (c) {
            case 0:
                return [b, d, a];
            case 1:
                return [f, b, a];
            case 2:
                return [a, b, d];
            case 3:
                return [a, f, b];
            case 4:
                return [d, a, b];
            case 5:
                return [b, a, f]
            }
        };
        a.hsv.hsl = function(b) {
            var a = b[0],
            d = b[1] / 100;
            b = b[2] / 100;
            var c = Math.max(b, .01);
            var e = (2 - d) * c;
            c = d * c / (1 >= e ? e: 2 - e) || 0;
            return [a, 100 * c, (2 - d) * b / 2 * 100]
        };
        a.hwb.rgb = function(b) {
            var a = b[0] / 360,
            d = b[1] / 100;
            b = b[2] / 100;
            var c = d + b;
            1 < c && (d /= c, b /= c);
            c = Math.floor(6 * a);
            b = 1 - b;
            a = 6 * a - c;
            0 !== (c & 1) && (a = 1 - a);
            a = d + a * (b - d);
            switch (c) {
            default:
            case 6:
            case 0:
                c = b;
                var e = a;
                break;
            case 1:
                c = a;
                e = b;
                break;
            case 2:
                c = d;
                e = b;
                d = a;
                break;
            case 3:
                c = d;
                e = a;
                d = b;
                break;
            case 4:
                c = a;
                e = d;
                d = b;
                break;
            case 5:
                c = b,
                e = d,
                d = a
            }
            return [255 * c, 255 * e, 255 * d]
        };
        a.cmyk.rgb = function(b) {
            var a = b[3] / 100;
            return [255 * (1 - Math.min(1, b[0] / 100 * (1 - a) + a)), 255 * (1 - Math.min(1, b[1] / 100 * (1 - a) + a)), 255 * (1 - Math.min(1, b[2] / 100 * (1 - a) + a))]
        };
        a.xyz.rgb = function(b) {
            var a = b[0] / 100,
            d = b[1] / 100,
            c = b[2] / 100;
            b = 3.2406 * a + -1.5372 * d + -.4986 * c;
            var e = -.9689 * a + 1.8758 * d + .0415 * c;
            a = .0557 * a + -.204 * d + 1.057 * c;
            b = .0031308 < b ? 1.055 * Math.pow(b, 1 / 2.4) - .055 : 12.92 * b;
            e = .0031308 < e ? 1.055 * Math.pow(e, 1 / 2.4) - .055 : 12.92 * e;
            a = .0031308 < a ? 1.055 * Math.pow(a, 1 / 2.4) - .055 : 12.92 * a;
            b = Math.min(Math.max(0, b), 1);
            e = Math.min(Math.max(0, e), 1);
            a = Math.min(Math.max(0, a), 1);
            return [255 * b, 255 * e, 255 * a]
        };
        a.xyz.lab = function(b) {
            var a = b[0],
            d = b[1];
            b = b[2];
            a /= 95.047;
            d /= 100;
            b /= 108.883;
            a = .008856 < a ? Math.pow(a, 1 / 3) : 7.787 * a + 16 / 116;
            d = .008856 < d ? Math.pow(d, 1 / 3) : 7.787 * d + 16 / 116;
            b = .008856 < b ? Math.pow(b, 1 / 3) : 7.787 * b + 16 / 116;
            return [116 * d - 16, 500 * (a - d), 200 * (d - b)]
        };
        a.lab.xyz = function(b) {
            var a = b[1],
            d = b[2];
            b = (b[0] + 16) / 116;
            a = a / 500 + b;
            d = b - d / 200;
            var c = Math.pow(b, 3),
            e = Math.pow(a, 3),
            f = Math.pow(d, 3);
            return [95.047 * (.008856 < e ? e: (a - 16 / 116) / 7.787), 100 * (.008856 < c ? c: (b - 16 / 116) / 7.787), 108.883 * (.008856 < f ? f: (d - 16 / 116) / 7.787)]
        };
        a.lab.lch = function(b) {
            var a = b[0],
            d = b[1];
            b = b[2];
            var c = 360 * Math.atan2(b, d) / 2 / Math.PI;
            0 > c && (c += 360);
            return [a, Math.sqrt(d * d + b * b), c]
        };
        a.lch.lab = function(b) {
            var a = b[0],
            d = b[1];
            b = b[2] / 360 * 2 * Math.PI;
            return [a, d * Math.cos(b), d * Math.sin(b)]
        };
        a.rgb.ansi16 = function(b) {
            var d = b[0],
            c = b[1],
            k = b[2],
            e = 1 in arguments ? arguments[1] : a.rgb.hsv(b)[2];
            e = Math.round(e / 50);
            if (0 === e) return 30;
            d = 30 + (Math.round(k / 255) << 2 | Math.round(c / 255) << 1 | Math.round(d / 255));
            2 === e && (d += 60);
            return d
        };
        a.hsv.ansi16 = function(b) {
            return a.rgb.ansi16(a.hsv.rgb(b), b[2])
        };
        a.rgb.ansi256 = function(b) {
            var a = b[0],
            d = b[1];
            b = b[2];
            return a === d && d === b ? 8 > a ? 16 : 248 < a ? 231 : Math.round((a - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(a / 255 * 5) + 6 * Math.round(d / 255 * 5) + Math.round(b / 255 * 5)
        };
        a.ansi16.rgb = function(b) {
            var a = b % 10;
            if (0 === a || 7 === a) return 50 < b && (a += 3.5),
            a = a / 10.5 * 255,
            [a, a, a];
            b = .5 * (~~ (50 < b) + 1);
            return [(a & 1) * b * 255, (a >> 1 & 1) * b * 255, (a >> 2 & 1) * b * 255]
        };
        a.ansi256.rgb = function(b) {
            if (232 <= b) {
                var a = 10 * (b - 232) + 8;
                return [a, a, a]
            }
            b -= 16;
            a = Math.floor(b / 36) / 5 * 255;
            var d = Math.floor((b %= 36) / 6) / 5 * 255;
            return [a, d, b % 6 / 5 * 255]
        };
        a.rgb.hex = function(b) {
            b = (((Math.round(b[0]) & 255) << 16) + ((Math.round(b[1]) & 255) << 8) + (Math.round(b[2]) & 255)).toString(16).toUpperCase();
            return "000000".substring(b.length) + b
        };
        a.hex.rgb = function(b) {
            b = b.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
            if (!b) return [0, 0, 0];
            var a = b[0];
            3 === b[0].length && (a = a.split("").map(function(b) {
                return b + b
            }).join(""));
            b = parseInt(a, 16);
            return [b >> 16 & 255, b >> 8 & 255, b & 255]
        };
        a.rgb.hcg = function(b) {
            var a = b[0] / 255,
            d = b[1] / 255;
            b = b[2] / 255;
            var c = Math.max(Math.max(a, d), b),
            e = Math.min(Math.min(a, d), b),
            f = c - e;
            return [(0 >= f ? 0 : c === a ? (d - b) / f % 6 : c === d ? 2 + (b - a) / f: (a - d) / f + 8) / 6 % 1 * 360, 100 * f, 100 * (1 > f ? e / (1 - f) : 0)]
        };
        a.hsl.hcg = function(b) {
            var a = b[1] / 100,
            d = b[2] / 100,
            c = 0;
            a = .5 > d ? 2 * a * d: 2 * a * (1 - d);
            1 > a && (c = (d - .5 * a) / (1 - a));
            return [b[0], 100 * a, 100 * c]
        };
        a.hsv.hcg = function(b) {
            var a = b[2] / 100,
            d = b[1] / 100 * a,
            c = 0;
            1 > d && (c = (a - d) / (1 - d));
            return [b[0], 100 * d, 100 * c]
        };
        a.hcg.rgb = function(b) {
            var a = b[1] / 100,
            d = b[2] / 100;
            if (0 === a) return [255 * d, 255 * d, 255 * d];
            var c = [0, 0, 0];
            b = b[0] / 360 % 1 * 6;
            var e = b % 1,
            f = 1 - e;
            switch (Math.floor(b)) {
            case 0:
                c[0] = 1;
                c[1] = e;
                c[2] = 0;
                break;
            case 1:
                c[0] = f;
                c[1] = 1;
                c[2] = 0;
                break;
            case 2:
                c[0] = 0;
                c[1] = 1;
                c[2] = e;
                break;
            case 3:
                c[0] = 0;
                c[1] = f;
                c[2] = 1;
                break;
            case 4:
                c[0] = e;
                c[1] = 0;
                c[2] = 1;
                break;
            default:
                c[0] = 1,
                c[1] = 0,
                c[2] = f
            }
            d *= 1 - a;
            return [255 * (a * c[0] + d), 255 * (a * c[1] + d), 255 * (a * c[2] + d)]
        };
        a.hcg.hsv = function(b) {
            var a = b[1] / 100,
            d = a + b[2] / 100 * (1 - a),
            c = 0;
            0 < d && (c = a / d);
            return [b[0], 100 * c, 100 * d]
        };
        a.hcg.hsl = function(b) {
            var a = b[1] / 100,
            d = b[2] / 100 * (1 - a) + .5 * a,
            c = 0;
            0 < d && .5 > d ? c = a / (2 * d) : .5 <= d && 1 > d && (c = a / (2 * (1 - d)));
            return [b[0], 100 * c, 100 * d]
        };
        a.hcg.hwb = function(b) {
            var a = b[1] / 100,
            d = a + b[2] / 100 * (1 - a);
            return [b[0], 100 * (d - a), 100 * (1 - d)]
        };
        a.hwb.hcg = function(b) {
            var a = 1 - b[2] / 100,
            d = a - b[1] / 100,
            c = 0;
            1 > d && (c = (a - d) / (1 - d));
            return [b[0], 100 * d, 100 * c]
        };
        a.apple.rgb = function(b) {
            return [b[0] / 65535 * 255, b[1] / 65535 * 255, b[2] / 65535 * 255]
        };
        a.rgb.apple = function(b) {
            return [b[0] / 255 * 65535, b[1] / 255 * 65535, b[2] / 255 * 65535]
        };
        a.gray.rgb = function(b) {
            return [b[0] / 100 * 255, b[0] / 100 * 255, b[0] / 100 * 255]
        };
        a.gray.hsl = a.gray.hsv = function(b) {
            return [0, 0, b[0]]
        };
        a.gray.hwb = function(b) {
            return [0, 100, b[0]]
        };
        a.gray.cmyk = function(b) {
            return [0, 0, 0, b[0]]
        };
        a.gray.lab = function(b) {
            return [b[0], 0, 0]
        };
        a.gray.hex = function(b) {
            b = Math.round(b[0] / 100 * 255) & 255;
            b = ((b << 16) + (b << 8) + b).toString(16).toUpperCase();
            return "000000".substring(b.length) + b
        };
        a.rgb.gray = function(b) {
            return [(b[0] + b[1] + b[2]) / 3 / 255 * 100]
        }
    }),
    ei = function(f) {
        for (var c = {},
        a = Ba(nb), b = a.length, d = 0; d < b; d++) c[a[d]] = {
            distance: -1,
            parent: null
        };
        a = [f];
        for (c[f].distance = 0; a.length;) {
            f = a.pop();
            b = Ba(nb[f]);
            d = b.length;
            for (var e = 0; e < d; e++) {
                var g = b[e],
                h = c[g]; - 1 === h.distance && (h.distance = c[f].distance + 1, h.parent = f, a.unshift(g))
            }
        }
        a = {};
        f = Ba(c);
        b = f.length;
        for (d = 0; d < b; d++) {
            var k = f[d];
            if (null !== c[k].parent) {
                e = k;
                g = c;
                h = [g[k].parent, k];
                var l = nb[g[k].parent][k];
                for (k = g[k].parent; g[k].parent;) h.unshift(g[k].parent),
                l = xg(nb[g[k].parent][k], l),
                k = g[k].parent;
                l.conversion = h;
                a[e] = l
            }
        }
        return a
    },
    Ab = {};
    Ba(nb).forEach(function(f) {
        Ab[f] = {};
        Object.defineProperty(Ab[f], "channels", {
            value: nb[f].channels
        });
        Object.defineProperty(Ab[f], "labels", {
            value: nb[f].labels
        });
        var c = ei(f);
        Ba(c).forEach(function(a) {
            var b = c[a];
            Ab[f][a] = zg(b);
            Ab[f][a].raw = yg(b)
        })
    });
    var ya = Ab,
    Tc = [].slice,
    de = ["keyword", "gray", "hex"],
    Vc = {};
    Ba(ya).forEach(function(f) {
        Vc[Tc.call(ya[f].labels).sort().join("")] = f
    });
    var lc = {};
    ha.prototype = {
        toString: function() {
            return this.string()
        },
        toJSON: function() {
            return this[this.model]()
        },
        string: function(f) {
            var c = this.model in Jb.to ? this: this.rgb();
            c = c.round("number" === typeof f ? f: 1);
            f = 1 === c.valpha ? c.color: c.color.concat(this.valpha);
            return Jb.to[c.model](f)
        },
        percentString: function(f) {
            f = this.rgb().round("number" === typeof f ? f: 1);
            f = 1 === f.valpha ? f.color: f.color.concat(this.valpha);
            return Jb.to.rgb.percent(f)
        },
        array: function() {
            return 1 === this.valpha ? this.color.slice() : this.color.concat(this.valpha)
        },
        object: function() {
            for (var f = {},
            c = ya[this.model].channels, a = ya[this.model].labels, b = 0; b < c; b++) f[a[b]] = this.color[b];
            1 !== this.valpha && (f.alpha = this.valpha);
            return f
        },
        unitArray: function() {
            var f = this.rgb().color;
            f[0] /= 255;
            f[1] /= 255;
            f[2] /= 255;
            1 !== this.valpha && f.push(this.valpha);
            return f
        },
        unitObject: function() {
            var f = this.rgb().object();
            f.r /= 255;
            f.g /= 255;
            f.b /= 255;
            1 !== this.valpha && (f.alpha = this.valpha);
            return f
        },
        round: function(f) {
            f = Math.max(f || 0, 0);
            return new ha(this.color.map(Bg(f)).concat(this.valpha), this.model)
        },
        alpha: function(f) {
            return arguments.length ? new ha(this.color.concat(Math.max(0, Math.min(1, f))), this.model) : this.valpha
        },
        red: ca("rgb", 0, ia(255)),
        green: ca("rgb", 1, ia(255)),
        blue: ca("rgb", 2, ia(255)),
        hue: ca(["hsl", "hsv", "hsl", "hwb", "hcg"], 0,
        function(f) {
            return (f % 360 + 360) % 360
        }),
        saturationl: ca("hsl", 1, ia(100)),
        lightness: ca("hsl", 2, ia(100)),
        saturationv: ca("hsv", 1, ia(100)),
        value: ca("hsv", 2, ia(100)),
        chroma: ca("hcg", 1, ia(100)),
        gray: ca("hcg", 2, ia(100)),
        white: ca("hwb", 1, ia(100)),
        wblack: ca("hwb", 2, ia(100)),
        cyan: ca("cmyk", 0, ia(100)),
        magenta: ca("cmyk", 1, ia(100)),
        yellow: ca("cmyk", 2, ia(100)),
        black: ca("cmyk", 3, ia(100)),
        x: ca("xyz", 0, ia(100)),
        y: ca("xyz", 1, ia(100)),
        z: ca("xyz", 2, ia(100)),
        l: ca("lab", 0, ia(100)),
        a: ca("lab", 1),
        b: ca("lab", 2),
        keyword: function(f) {
            return arguments.length ? new ha(f) : ya[this.model].keyword(this.color)
        },
        hex: function(f) {
            return arguments.length ? new ha(f) : Jb.to.hex(this.rgb().round().color)
        },
        rgbNumber: function() {
            var f = this.rgb().color;
            return (f[0] & 255) << 16 | (f[1] & 255) << 8 | f[2] & 255
        },
        luminosity: function() {
            for (var f = this.rgb().color, c = [], a = 0; a < f.length; a++) {
                var b = f[a] / 255;
                c[a] = .03928 >= b ? b / 12.92 : Math.pow((b + .055) / 1.055, 2.4)
            }
            return.2126 * c[0] + .7152 * c[1] + .0722 * c[2]
        },
        contrast: function(f) {
            var c = this.luminosity();
            f = f.luminosity();
            return c > f ? (c + .05) / (f + .05) : (f + .05) / (c + .05)
        },
        level: function(f) {
            f = this.contrast(f);
            return 7.1 <= f ? "AAA": 4.5 <= f ? "AA": ""
        },
        isDark: function() {
            var f = this.rgb().color;
            return 128 > (299 * f[0] + 587 * f[1] + 114 * f[2]) / 1E3
        },
        isLight: function() {
            return ! this.isDark()
        },
        negate: function() {
            for (var f = this.rgb(), c = 0; 3 > c; c++) f.color[c] = 255 - f.color[c];
            return f
        },
        lighten: function(f) {
            var c = this.hsl();
            c.color[2] += c.color[2] * f;
            return c
        },
        darken: function(f) {
            var c = this.hsl();
            c.color[2] -= c.color[2] * f;
            return c
        },
        saturate: function(f) {
            var c = this.hsl();
            c.color[1] += c.color[1] * f;
            return c
        },
        desaturate: function(f) {
            var c = this.hsl();
            c.color[1] -= c.color[1] * f;
            return c
        },
        whiten: function(f) {
            var c = this.hwb();
            c.color[1] += c.color[1] * f;
            return c
        },
        blacken: function(f) {
            var c = this.hwb();
            c.color[2] += c.color[2] * f;
            return c
        },
        grayscale: function() {
            var f = this.rgb().color;
            f = .3 * f[0] + .59 * f[1] + .11 * f[2];
            return ha.rgb(f, f, f)
        },
        fade: function(f) {
            return this.alpha(this.valpha - this.valpha * f)
        },
        opaquer: function(f) {
            return this.alpha(this.valpha + this.valpha * f)
        },
        rotate: function(f) {
            var c = this.hsl(),
            a = c.color[0];
            a = (a + f) % 360;
            c.color[0] = 0 > a ? 360 + a: a;
            return c
        },
        mix: function(f, c) {
            if (!f || !f.rgb) throw Error('Argument to "mix" was not a Color instance, but rather an instance of ' + ("undefined" === typeof f ? "undefined": sb(f)));
            f = f.rgb();
            var a = this.rgb();
            c = undefined === c ? .5 : c;
            var b = 2 * c - 1,
            d = f.alpha() - a.alpha();
            b = (( - 1 === b * d ? b: (b + d) / (1 + b * d)) + 1) / 2;
            d = 1 - b;
            return ha.rgb(b * f.red() + d * a.red(), b * f.green() + d * a.green(), b * f.blue() + d * a.blue(), f.alpha() * c + a.alpha() * (1 - c))
        }
    };
    Ba(ya).forEach(function(f) {
        if ( - 1 === de.indexOf(f)) {
            var c = ya[f].channels;
            ha.prototype[f] = function() {
                if (this.model === f) return new ha(this);
                if (arguments.length) return new ha(arguments, f);
                var a = "number" === typeof arguments[c] ? c: this.valpha;
                var b = ya[this.model][f].raw(this.color);
                b = Array.isArray(b) ? b: [b];
                return new ha(b.concat(a), f)
            };
            ha[f] = function(a) {
                "number" === typeof a && (a = Uc(Tc.call(arguments), c));
                return new ha(a, f)
            }
        }
    });
    Zc(LngLat.prototype, {
        equals: function(f) {
            return this.lat === f.lat && this.lng === f.lng
        },
        clone: function() {
            return new LngLat(this.lat, this.lng)
        },
        getLngSpan: function(f) {
            f = Math.abs(f - this.lng);
            180 < f && (f = 360 - f);
            return f
        },
        sub: function(f) {
            return new LngLat(this.lat - f.lat, this.lng - f.lng)
        },
        toString: function() {
            return "Point"
        }
    });
    Zc(MercatorProjection, {
        EARTHRADIUS: 6370996.81,
        MCBAND: [1.289059486E7, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],
        LLBAND: [75, 60, 45, 30, 15, 0],
        MC2LL: [[1.410526172116255E-8, 8.98305509648872E-6, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -.03801003308653, 1.73379812E7], [ - 7.435856389565537E-9, 8.983055097726239E-6, -.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 1.026014486E7], [ - 3.030883460898826E-8, 8.98305509983578E-6, .30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, .32710905363475, 6856817.37], [ - 1.981981304930552E-8, 8.983055099779535E-6, .03278182852591, 40.31678527705744, .65659298677277, -4.44255534477492, .85341911805263, .12923347998204, -.04625736007561, 4482777.06], [3.09191371068437E-9, 8.983055096812155E-6, 6.995724062E-5, 23.10934304144901, -2.3663490511E-4, -.6321817810242, -.00663494467273, .03430082397953, -.00466043876332, 2555164.4], [2.890871144776878E-9, 8.983055095805407E-6, -3.068298E-8, 7.47137025468032, -3.53937994E-6, -.02145144861037, -1.234426596E-5, 1.0322952773E-4, -3.23890364E-6, 826088.5]],
        LL2MC: [[ - .0015702102444, 111320.7020616939, 0x60e374c3105a3, -0x24bb4115e2e164, 0x5cc55543bb0ae8, -0x7ce070193f3784, 0x5e7ca61ddf8150, -0x261a578d8b24d0, 0x665d60f3742ca, 82.5], [8.277824516172526E-4, 111320.7020463578, 6.477955746671607E8, -4.082003173641316E9, 1.077490566351142E10, -1.517187553151559E10, 1.205306533862167E10, -5.124939663577472E9, 9.133119359512032E8, 67.5], [.00337398766765, 111320.7020202162, 4481351.045890365, -2.339375119931662E7, 7.968221547186455E7, -1.159649932797253E8, 9.723671115602145E7, -4.366194633752821E7, 8477230.501135234, 52.5], [.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5], [ - 3.441963504368392E-4, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5], [ - 3.218135878613132E-4, 111320.7020701615, .00369383431289, 823725.6402795718, .46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, .37238884252424, 7.45]],
        getDistanceByMC: function(f, c) {
            if (!f || !c) return 0;
            f = this.convertMC2LL(f);
            if (!f) return 0;
            var a = this.toRadians(f.lng);
            f = this.toRadians(f.lat);
            c = this.convertMC2LL(c);
            if (!c) return 0;
            var b = this.toRadians(c.lng);
            c = this.toRadians(c.lat);
            return this.getDistance(a, b, f, c)
        },
        getDistanceByLL: function(f, c) {
            if (!f || !c) return 0;
            f.lng = this.getLoop(f.lng, -180, 180);
            f.lat = this.getRange(f.lat, -74, 74);
            c.lng = this.getLoop(c.lng, -180, 180);
            c.lat = this.getRange(c.lat, -74, 74);
            var a = this.toRadians(f.lng);
            var b = this.toRadians(f.lat);
            f = this.toRadians(c.lng);
            c = this.toRadians(c.lat);
            return this.getDistance(a, f, b, c)
        },
        convertMC2LL: function(f) {
            if (null === f || undefined === f) return new LngLat(0, 0);
            if (180 > f.lng && -180 < f.lng && 90 > f.lat && -90 < f.lat) return f;
            var c = new LngLat(Math.abs(f.lng), Math.abs(f.lat));
            for (var a = 0; a < this.MCBAND.length; a++) if (c.lat >= this.MCBAND[a]) {
                var b = this.MC2LL[a];
                break
            }
            f = this.convertor(f, b);
            return f = new LngLat(f.lng.toFixed(6), f.lat.toFixed(6))
        },
        convertLL2MC: function(f) {
            if (null === f || undefined === f) return new LngLat(0, 0);
            if (180 < f.lng || -180 > f.lng || 90 < f.lat || -90 > f.lat) return f;
            f.lng = this.getLoop(f.lng, -180, 180);
            f.lat = this.getRange(f.lat, -74, 74);
            var c = new LngLat(f.lng, f.lat);
            for (var a = 0; a < this.LLBAND.length; a++) if (c.lat >= this.LLBAND[a]) {
                var b = this.LL2MC[a];
                break
            }
            if (!b) for (a = 0; a < this.LLBAND.length; a++) if (c.lat <= -this.LLBAND[a]) {
                b = this.LL2MC[a];
                break
            }
            f = this.convertor(f, b);
            return f = new LngLat(Number(f.lng.toFixed(2)), Number(f.lat.toFixed(2)))
        },
        convertor: function(f, c) {
            if (f && c) {
                var a = c[0] + c[1] * Math.abs(f.lng),
                b = Math.abs(f.lat) / c[9];
                c = c[2] + c[3] * b + c[4] * b * b + c[5] * b * b * b + c[6] * b * b * b * b + c[7] * b * b * b * b * b + c[8] * b * b * b * b * b * b;
                a *= 0 > f.lng ? -1 : 1;
                c *= 0 > f.lat ? -1 : 1;
                return new LngLat(a, c)
            }
        },
        getDistance: function(f, c, a, b) {
            return this.EARTHRADIUS * Math.acos(Math.sin(a) * Math.sin(b) + Math.cos(a) * Math.cos(b) * Math.cos(c - f))
        },
        toRadians: function(f) {
            return Math.PI * f / 180
        },
        toDegrees: function(f) {
            return 180 * f / Math.PI
        },
        getRange: function(f, c, a) {
            null != c && (f = Math.max(f, c));
            null != a && (f = Math.min(f, a));
            return f
        },
        getLoop: function(f, c, a) {
            for (; f > a;) f -= a - c;
            for (; f < c;) f += a - c;
            return f
        }
    });
    Zc(MercatorProjection.prototype, {
        lngLatToMercator: function(f) {
            return MercatorProjection.convertLL2MC(f)
        },
        lngLatToPoint: function(f) {
            f = MercatorProjection.convertLL2MC(f);
            return new fe(f.lng, f.lat)
        },
        mercatorToLngLat: function(f) {
            return MercatorProjection.convertMC2LL(f)
        },
        pointToLngLat: function(f) {
            f = new LngLat(f.x, f.y);
            return MercatorProjection.convertMC2LL(f)
        },
        pointToPixel: function(f, c, a, b, d) {
            if (f) return f = this.lngLatToMercator(f, d),
            c = this.getZoomUnits(c),
            new fe(Math.round((f.lng - a.lng) / c + b.width / 2), Math.round((a.lat - f.lat) / c + b.height / 2))
        },
        pixelToPoint: function(f, c, a, b, d) {
            if (f) return c = this.getZoomUnits(c),
            f = new LngLat(a.lng + c * (f.x - b.width / 2), a.lat - c * (f.y - b.height / 2)),
            this.mercatorToLngLat(f, d)
        },
        getZoomUnits: function(f) {
            return Math.pow(2, 18 - f)
        }
    });
    oa.prototype.setMax = function(f) {
        this.max = f || 100
    };
    oa.prototype.setMin = function(f) {
        this.min = f || 0
    };
    oa.prototype.setMaxSize = function(f) {
        this.maxSize = f || 35
    };
    oa.prototype.setMinSize = function(f) {
        this.minSize = f || 0
    };
    oa.prototype.initPalette = function() {
        var f = this.gradient,
        c = this.paletteCtx = (new $c(256, 1)).getContext("2d"),
        a = c.createLinearGradient(0, 0, 256, 1);
        Ba(f).forEach(function(b) {
            a.addColorStop(parseFloat(b), f[b])
        });
        c.fillStyle = a;
        c.fillRect(0, 0, 256, 1);
        c.imageData = c.getImageData(0, 0, 256, 1).data
    };
    oa.prototype.getColor = function(f) {
        f = this.getImageData(f);
        return "rgba(" + f[0] + ", " + f[1] + ", " + f[2] + ", " + f[3] / 256 + ")"
    };
    oa.prototype.getImageData = function(f) {
        var c = this.paletteCtx.imageData;
        if (undefined === f) return c;
        var a = this.max,
        b = this.min;
        f > a && (f = a);
        f < b && (f = b);
        f = 4 * Math.floor((f - b) / (a - b) * 255);
        return [c[f], c[f + 1], c[f + 2], c[f + 3]]
    };
    oa.prototype.getSize = function(f) {
        var c = this.max,
        a = this.min,
        b = this.maxSize,
        d = this.minSize;
        f > c && (f = c);
        f < a && (f = a);
        return d + (f - a) / (c - a) * (b - d)
    };
    BezierCurve.prototype._initialize = function() {
        this.v0 = this._normalizaCoord(this.options.start);
        this.v3 = this._normalizaCoord(this.options.end);
        this.v1 = this._getControlPoint(this.v0, this.v3, 4);
        this.v2 = this._getControlPoint(this.v3, this.v0, 5);
        this.v0[2] || (this.v0[2] = 0);
        this.v3[2] || (this.v3[2] = 0)
    };
    BezierCurve.prototype.setOptions = function(f) {
        this.options = f || {};
        this._initialize()
    };
    BezierCurve.prototype.getPoints = function(f) {
        undefined === f && (f = 20);
        for (var c = [], a = 0; a <= f; a++) c.push(this._getPoint(a / f));
        return c
    };
    BezierCurve.prototype._normalizaCoord = function(f) {
        if (!f) return [];
        f = MercatorProjection.convertLL2MC({
            lng: Number(f[0]),
            lat: Number(f[1])
        });
        return [f.lng, f.lat]
    };
    BezierCurve.prototype._getControlPoint = function(f, c) {
        var a = 2 < arguments.length && undefined !== arguments[2] ? arguments[2] : 1;
        return [].concat(Y(this._getQuarter(f, c)), [this._getDistance(f, c) / a])
    };
    BezierCurve.prototype._getQuarter = function(f, c) {
        return [(3 * f[0] + c[0]) / 4, (3 * f[1] + c[1]) / 4]
    };
    BezierCurve.prototype._getDistance = function(f, c) {
        return Math.sqrt(Math.pow(f[0] - c[0], 2) + Math.pow(f[1] - c[1], 2))
    };
    BezierCurve.prototype._getPoint = function(f) {
        var c = [],
        a = this.v0,
        b = this.v1,
        d = this.v2,
        e = this.v3;
        c.push(ad(f, a[0], b[0], d[0], e[0]), ad(f, a[1], b[1], d[1], e[1]), ad(f, a[2], b[2], d[2], e[2]));
        return c
    };
    GeodesicCurve.prototype._initialize = function() {
        this.points = this.options.points || this.options.point || [];
        this.greatCirclePoints = [];
        for (var f = [], c = 0; c < this.points.length; c++) {
            var a = this._normalizaCoord(this.points[c]);
            a && f.push(a)
        }
        this.points = f
    };
    GeodesicCurve.prototype.setOptions = function(f) {
        this.options = f || {};
        this._initialize()
    };
    GeodesicCurve.prototype.getPoints = function() {
        if (0 === this.greatCirclePoints.length) for (var f = 0; f < this.points.length - 1; f++) this._calcGreatCirclePoints(this.points[f], this.points[f + 1]);
        return this.greatCirclePoints
    };
    GeodesicCurve.prototype._normalizaCoord = function(f) {
        if (!f) return null;
        f instanceof Array && (f = {
            lng: Number(f[0]),
            lat: Number(f[1])
        });
        var c = MercatorProjection.convertLL2MC(f);
        f = MercatorProjection.convertMC2LL(f);
        c.latLng = f;
        return c
    };
    GeodesicCurve.prototype._calcGreatCirclePoints = function(f, c) {
        var a = f.latLng,
        b = c.latLng;
        if (!Yc(a.lng, b.lng) || !Yc(a.lat, b.lat)) {
            var d = MercatorProjection.getDistance(toRadian(a.lng), toRadian(a.lat), toRadian(b.lng), toRadian(b.lat));
            if (! (25E4 > d)) {
                d = Math.round(d / 15E4);
                var e = this._calcAngularDistance(a, b);
                this.greatCirclePoints.push([f.lng, f.lat]);
                for (var g = 0; g < d; g++) {
                    var h = this._calcMiddlePoint(a, b, g / d, e);
                    h = MercatorProjection.convertLL2MC(h);
                    var k = ge(h, f);
                    30037726 < k && (h.lng = h.lng < f.lng ? h.lng + this.WORLD_SIZE_MC: h.lng - this.WORLD_SIZE_MC);
                    this.greatCirclePoints.push([h.lng, h.lat]);
                    f = h
                }
                k = ge(c, f);
                30037726 < k && (c.lng = c.lng < f.lng ? c.lng + this.WORLD_SIZE_MC: c.lng - this.WORLD_SIZE_MC);
                this.greatCirclePoints.push([c.lng, c.lat])
            }
        }
    };
    GeodesicCurve.prototype._calcAngularDistance = function(f, c) {
        var a = toRadian(f.lat),
        b = toRadian(c.lat);
        f = toRadian(f.lng);
        c = toRadian(c.lng);
        return Math.acos(Math.sin(a) * Math.sin(b) + Math.cos(a) * Math.cos(b) * Math.cos(Math.abs(c - f)))
    };
    GeodesicCurve.prototype._calcMiddlePoint = function(f, c, a, b) {
        var d = c.lat,
        e = f.lng;
        c = c.lng;
        f = toRadian(f.lat);
        d = toRadian(d);
        e = toRadian(e);
        var g = toRadian(c);
        c = Math.sin((1 - a) * b) / Math.sin(b);
        b = Math.sin(a * b) / Math.sin(b);
        a = c * Math.cos(f) * Math.cos(e) + b * Math.cos(d) * Math.cos(g);
        e = c * Math.cos(f) * Math.sin(e) + b * Math.cos(d) * Math.sin(g);
        f = Math.atan2(c * Math.sin(f) + b * Math.sin(d), Math.sqrt(Math.pow(a, 2) + Math.pow(e, 2)));
        return new LngLat(toAngle(Math.atan2(e, a)), toAngle(f))
    };
    var OdCurve = function() {
        function f() {
            var c = 0 < arguments.length && undefined !== arguments[0] ? arguments[0] : {};
            I(this, f);
            this.options = c;
            this._initialize()
        }
        M(f, [{
            key: "_initialize",
            value: function() {
                this.points = this.options.points
            }
        },
        {
            key: "_normalizaCoord",
            value: function(c) {
                if (!c) return null;
                c instanceof Array && (c = {
                    lng: Number(c[0]),
                    lat: Number(c[1])
                });
                return MercatorProjection.convertLL2MC(c)
            }
        },
        {
            key: "setOptions",
            value: function() {
                this.options = 0 < arguments.length && undefined !== arguments[0] ? arguments[0] : {};
                this._initialize()
            }
        },
        {
            key: "getPoints",
            value: function(c) {
                for (var a = [], b = this.points, d = 0; d < b.length - 1; d++) {
                    var f = this.getCurveByTwoPoints(this._normalizaCoord(b[d]), this._normalizaCoord(b[d + 1]), c);
                    f && 0 < f.length && (a = a.concat(f))
                }
                return a
            }
        },
        {
            key: "getCurveByTwoPoints",
            value: function(c, a) {
                var b = 2 < arguments.length && undefined !== arguments[2] ? arguments[2] : 20;
                if (!c || !a) return null;
                var d = [],
                f = 0;
                if (undefined === ("undefined" === typeof a ? "undefined": sb(a)))"undefined" === typeof d || sb(d);
                else {
                    var g = parseFloat(c.lat),
                    h = parseFloat(a.lat),
                    k = parseFloat(c.lng),
                    l = parseFloat(a.lng);
                    l > k && 180 < parseFloat(l - k) && 0 > k && (k = parseFloat(360 + k), l = parseFloat(360 + l));
                    var m = 0;
                    if (h === g) {
                        var p = 0;
                        var n = k - l
                    } else l === k ? (p = Math.PI / 2, n = g - h) : (p = Math.atan((h - g) / (l - k)), n = (h - g) / Math.sin(p));
                    0 === m && (m = p + Math.PI / 5);
                    n /= 2;
                    p = n * Math.cos(m) + k;
                    m = n * Math.sin(m) + g;
                    for (n = 0; n < b + 1; n++) {
                        var r = k * (1 - 2 * f + f * f) + p * (2 * f - 2 * f * f) + l * f * f,
                        q = a.lng;
                        d.push([0 > c.lng && 0 < q ? r - 360 : r, g * (1 - 2 * f + f * f) + m * (2 * f - 2 * f * f) + h * f * f]);
                        f += 1 / b
                    }
                    return d
                }
            }
        }]);
        return f
    } (),
    Ed = [{
        n: "\u5317\u4eac",
        g: "116.395645,39.929986|12"
    },
    {
        n: "\u4e0a\u6d77",
        g: "121.487899,31.249162|12"
    },
    {
        n: "\u5929\u6d25",
        g: "117.210813,39.14393|12"
    },
    {
        n: "\u91cd\u5e86",
        g: "106.530635,29.544606|12"
    }],
    ob = [{
        n: "\u5b89\u5fbd",
        g: "117.216005,31.859252|8",
        cities: [{
            n: "\u5408\u80a5",
            g: "117.282699,31.866942|12"
        },
        {
            n: "\u5b89\u5e86",
            g: "117.058739,30.537898|13"
        },
        {
            n: "\u868c\u57e0",
            g: "117.35708,32.929499|13"
        },
        {
            n: "\u4eb3\u5dde",
            g: "115.787928,33.871211|13"
        },
        {
            n: "\u5de2\u6e56",
            g: "117.88049,31.608733|13"
        },
        {
            n: "\u6c60\u5dde",
            g: "117.494477,30.660019|14"
        },
        {
            n: "\u6ec1\u5dde",
            g: "118.32457,32.317351|13"
        },
        {
            n: "\u961c\u9633",
            g: "115.820932,32.901211|13"
        },
        {
            n: "\u6dee\u5317",
            g: "116.791447,33.960023|13"
        },
        {
            n: "\u6dee\u5357",
            g: "117.018639,32.642812|13"
        },
        {
            n: "\u9ec4\u5c71",
            g: "118.29357,29.734435|13"
        },
        {
            n: "\u516d\u5b89",
            g: "116.505253,31.755558|13"
        },
        {
            n: "\u9a6c\u978d\u5c71",
            g: "118.515882,31.688528|13"
        },
        {
            n: "\u5bbf\u5dde",
            g: "116.988692,33.636772|13"
        },
        {
            n: "\u94dc\u9675",
            g: "117.819429,30.94093|14"
        },
        {
            n: "\u829c\u6e56",
            g: "118.384108,31.36602|12"
        },
        {
            n: "\u5ba3\u57ce",
            g: "118.752096,30.951642|13"
        }]
    },
    {
        n: "\u798f\u5efa",
        g: "117.984943,26.050118|8",
        cities: [{
            n: "\u798f\u5dde",
            g: "119.330221,26.047125|12"
        },
        {
            n: "\u9f99\u5ca9",
            g: "117.017997,25.078685|13"
        },
        {
            n: "\u5357\u5e73",
            g: "118.181883,26.643626|13"
        },
        {
            n: "\u5b81\u5fb7",
            g: "119.542082,26.656527|14"
        },
        {
            n: "\u8386\u7530",
            g: "119.077731,25.44845|13"
        },
        {
            n: "\u6cc9\u5dde",
            g: "118.600362,24.901652|12"
        },
        {
            n: "\u4e09\u660e",
            g: "117.642194,26.270835|14"
        },
        {
            n: "\u53a6\u95e8",
            g: "118.103886,24.489231|12"
        },
        {
            n: "\u6f33\u5dde",
            g: "117.676205,24.517065|12"
        }]
    },
    {
        n: "\u7518\u8083",
        g: "102.457625,38.103267|6",
        cities: [{
            n: "\u5170\u5dde",
            g: "103.823305,36.064226|12"
        },
        {
            n: "\u767d\u94f6",
            g: "104.171241,36.546682|13"
        },
        {
            n: "\u5b9a\u897f",
            g: "104.626638,35.586056|13"
        },
        {
            n: "\u7518\u5357\u5dde",
            g: "102.917442,34.992211|14"
        },
        {
            n: "\u5609\u5cea\u5173",
            g: "98.281635,39.802397|13"
        },
        {
            n: "\u91d1\u660c",
            g: "102.208126,38.516072|13"
        },
        {
            n: "\u9152\u6cc9",
            g: "98.508415,39.741474|13"
        },
        {
            n: "\u4e34\u590f\u5dde",
            g: "103.215249,35.598514|13"
        },
        {
            n: "\u9647\u5357",
            g: "104.934573,33.39448|14"
        },
        {
            n: "\u5e73\u51c9",
            g: "106.688911,35.55011|13"
        },
        {
            n: "\u5e86\u9633",
            g: "107.644227,35.726801|13"
        },
        {
            n: "\u5929\u6c34",
            g: "105.736932,34.584319|13"
        },
        {
            n: "\u6b66\u5a01",
            g: "102.640147,37.933172|13"
        },
        {
            n: "\u5f20\u6396",
            g: "100.459892,38.93932|13"
        }]
    },
    {
        n: "\u5e7f\u4e1c",
        g: "113.394818,23.408004|8",
        cities: [{
            n: "\u5e7f\u5dde",
            g: "113.30765,23.120049|12"
        },
        {
            n: "\u6f6e\u5dde",
            g: "116.630076,23.661812|13"
        },
        {
            n: "\u4e1c\u839e",
            g: "113.763434,23.043024|12"
        },
        {
            n: "\u4f5b\u5c71",
            g: "113.134026,23.035095|13"
        },
        {
            n: "\u6cb3\u6e90",
            g: "114.713721,23.757251|12"
        },
        {
            n: "\u60e0\u5dde",
            g: "114.410658,23.11354|12"
        },
        {
            n: "\u6c5f\u95e8",
            g: "113.078125,22.575117|13"
        },
        {
            n: "\u63ed\u9633",
            g: "116.379501,23.547999|13"
        },
        {
            n: "\u8302\u540d",
            g: "110.931245,21.668226|13"
        },
        {
            n: "\u6885\u5dde",
            g: "116.126403,24.304571|13"
        },
        {
            n: "\u6e05\u8fdc",
            g: "113.040773,23.698469|13"
        },
        {
            n: "\u6c55\u5934",
            g: "116.72865,23.383908|13"
        },
        {
            n: "\u6c55\u5c3e",
            g: "115.372924,22.778731|14"
        },
        {
            n: "\u97f6\u5173",
            g: "113.594461,24.80296|13"
        },
        {
            n: "\u6df1\u5733",
            g: "114.025974,22.546054|12"
        },
        {
            n: "\u9633\u6c5f",
            g: "111.97701,21.871517|14"
        },
        {
            n: "\u4e91\u6d6e",
            g: "112.050946,22.937976|13"
        },
        {
            n: "\u6e5b\u6c5f",
            g: "110.365067,21.257463|13"
        },
        {
            n: "\u8087\u5e86",
            g: "112.479653,23.078663|13"
        },
        {
            n: "\u4e2d\u5c71",
            g: "113.42206,22.545178|12"
        },
        {
            n: "\u73e0\u6d77",
            g: "113.562447,22.256915|13"
        }]
    },
    {
        n: "\u5e7f\u897f",
        g: "108.924274,23.552255|7",
        cities: [{
            n: "\u5357\u5b81",
            g: "108.297234,22.806493|12"
        },
        {
            n: "\u767e\u8272",
            g: "106.631821,23.901512|13"
        },
        {
            n: "\u5317\u6d77",
            g: "109.122628,21.472718|13"
        },
        {
            n: "\u5d07\u5de6",
            g: "107.357322,22.415455|14"
        },
        {
            n: "\u9632\u57ce\u6e2f",
            g: "108.351791,21.617398|15"
        },
        {
            n: "\u6842\u6797",
            g: "110.26092,25.262901|12"
        },
        {
            n: "\u8d35\u6e2f",
            g: "109.613708,23.103373|13"
        },
        {
            n: "\u6cb3\u6c60",
            g: "108.069948,24.699521|14"
        },
        {
            n: "\u8d3a\u5dde",
            g: "111.552594,24.411054|14"
        },
        {
            n: "\u6765\u5bbe",
            g: "109.231817,23.741166|14"
        },
        {
            n: "\u67f3\u5dde",
            g: "109.422402,24.329053|12"
        },
        {
            n: "\u94a6\u5dde",
            g: "108.638798,21.97335|13"
        },
        {
            n: "\u68a7\u5dde",
            g: "111.305472,23.485395|13"
        },
        {
            n: "\u7389\u6797",
            g: "110.151676,22.643974|14"
        }]
    },
    {
        n: "\u8d35\u5dde",
        g: "106.734996,26.902826|8",
        cities: [{
            n: "\u8d35\u9633",
            g: "106.709177,26.629907|12"
        },
        {
            n: "\u5b89\u987a",
            g: "105.92827,26.228595|13"
        },
        {
            n: "\u6bd5\u8282\u5730\u533a",
            g: "105.300492,27.302612|14"
        },
        {
            n: "\u516d\u76d8\u6c34",
            g: "104.852087,26.591866|13"
        },
        {
            n: "\u94dc\u4ec1\u5730\u533a",
            g: "109.196161,27.726271|14"
        },
        {
            n: "\u9075\u4e49",
            g: "106.93126,27.699961|13"
        },
        {
            n: "\u9ed4\u897f\u5357\u5dde",
            g: "104.900558,25.095148|11"
        },
        {
            n: "\u9ed4\u4e1c\u5357\u5dde",
            g: "107.985353,26.583992|11"
        },
        {
            n: "\u9ed4\u5357\u5dde",
            g: "107.523205,26.264536|11"
        }]
    },
    {
        n: "\u6d77\u5357",
        g: "109.733755,19.180501|9",
        cities: [{
            n: "\u6d77\u53e3",
            g: "110.330802,20.022071|13"
        },
        {
            n: "\u767d\u6c99",
            g: "109.358586,19.216056|12"
        },
        {
            n: "\u4fdd\u4ead",
            g: "109.656113,18.597592|12"
        },
        {
            n: "\u660c\u6c5f",
            g: "109.0113,19.222483|12"
        },
        {
            n: "\u510b\u5dde",
            g: "109.413973,19.571153|13"
        },
        {
            n: "\u6f84\u8fc8",
            g: "109.996736,19.693135|13"
        },
        {
            n: "\u4e1c\u65b9",
            g: "108.85101,18.998161|13"
        },
        {
            n: "\u5b9a\u5b89",
            g: "110.32009,19.490991|13"
        },
        {
            n: "\u743c\u6d77",
            g: "110.414359,19.21483|13"
        },
        {
            n: "\u743c\u4e2d",
            g: "109.861849,19.039771|12"
        },
        {
            n: "\u4e50\u4e1c",
            g: "109.062698,18.658614|12"
        },
        {
            n: "\u4e34\u9ad8",
            g: "109.724101,19.805922|13"
        },
        {
            n: "\u9675\u6c34",
            g: "109.948661,18.575985|12"
        },
        {
            n: "\u4e09\u4e9a",
            g: "109.522771,18.257776|12"
        },
        {
            n: "\u5c6f\u660c",
            g: "110.063364,19.347749|13"
        },
        {
            n: "\u4e07\u5b81",
            g: "110.292505,18.839886|13"
        },
        {
            n: "\u6587\u660c",
            g: "110.780909,19.750947|13"
        },
        {
            n: "\u4e94\u6307\u5c71",
            g: "109.51775,18.831306|13"
        }]
    },
    {
        n: "\u6cb3\u5317",
        g: "115.661434,38.61384|7",
        cities: [{
            n: "\u77f3\u5bb6\u5e84",
            g: "114.522082,38.048958|12"
        },
        {
            n: "\u4fdd\u5b9a",
            g: "115.49481,38.886565|13"
        },
        {
            n: "\u6ca7\u5dde",
            g: "116.863806,38.297615|13"
        },
        {
            n: "\u627f\u5fb7",
            g: "117.933822,40.992521|14"
        },
        {
            n: "\u90af\u90f8",
            g: "114.482694,36.609308|13"
        },
        {
            n: "\u8861\u6c34",
            g: "115.686229,37.746929|13"
        },
        {
            n: "\u5eca\u574a",
            g: "116.703602,39.518611|13"
        },
        {
            n: "\u79e6\u7687\u5c9b",
            g: "119.604368,39.945462|12"
        },
        {
            n: "\u5510\u5c71",
            g: "118.183451,39.650531|13"
        },
        {
            n: "\u90a2\u53f0",
            g: "114.520487,37.069531|13"
        },
        {
            n: "\u5f20\u5bb6\u53e3",
            g: "114.893782,40.811188|13"
        }]
    },
    {
        n: "\u6cb3\u5357",
        g: "113.486804,34.157184|7",
        cities: [{
            n: "\u90d1\u5dde",
            g: "113.649644,34.75661|12"
        },
        {
            n: "\u5b89\u9633",
            g: "114.351807,36.110267|12"
        },
        {
            n: "\u9e64\u58c1",
            g: "114.29777,35.755426|13"
        },
        {
            n: "\u7126\u4f5c",
            g: "113.211836,35.234608|13"
        },
        {
            n: "\u5f00\u5c01",
            g: "114.351642,34.801854|13"
        },
        {
            n: "\u6d1b\u9633",
            g: "112.447525,34.657368|12"
        },
        {
            n: "\u6f2f\u6cb3",
            g: "114.046061,33.576279|13"
        },
        {
            n: "\u5357\u9633",
            g: "112.542842,33.01142|13"
        },
        {
            n: "\u5e73\u9876\u5c71",
            g: "113.300849,33.745301|13"
        },
        {
            n: "\u6fee\u9633",
            g: "115.026627,35.753298|12"
        },
        {
            n: "\u4e09\u95e8\u5ce1",
            g: "111.181262,34.78332|13"
        },
        {
            n: "\u5546\u4e18",
            g: "115.641886,34.438589|13"
        },
        {
            n: "\u65b0\u4e61",
            g: "113.91269,35.307258|13"
        },
        {
            n: "\u4fe1\u9633",
            g: "114.085491,32.128582|13"
        },
        {
            n: "\u8bb8\u660c",
            g: "113.835312,34.02674|13"
        },
        {
            n: "\u5468\u53e3",
            g: "114.654102,33.623741|13"
        },
        {
            n: "\u9a7b\u9a6c\u5e97",
            g: "114.049154,32.983158|13"
        }]
    },
    {
        n: "\u9ed1\u9f99\u6c5f",
        g: "128.047414,47.356592|6",
        cities: [{
            n: "\u54c8\u5c14\u6ee8",
            g: "126.657717,45.773225|12"
        },
        {
            n: "\u5927\u5e86",
            g: "125.02184,46.596709|12"
        },
        {
            n: "\u5927\u5174\u5b89\u5cad\u5730\u533a",
            g: "124.196104,51.991789|10"
        },
        {
            n: "\u9e64\u5c97",
            g: "130.292472,47.338666|13"
        },
        {
            n: "\u9ed1\u6cb3",
            g: "127.50083,50.25069|14"
        },
        {
            n: "\u9e21\u897f",
            g: "130.941767,45.32154|13"
        },
        {
            n: "\u4f73\u6728\u65af",
            g: "130.284735,46.81378|12"
        },
        {
            n: "\u7261\u4e39\u6c5f",
            g: "129.608035,44.588521|13"
        },
        {
            n: "\u4e03\u53f0\u6cb3",
            g: "131.019048,45.775005|14"
        },
        {
            n: "\u9f50\u9f50\u54c8\u5c14",
            g: "123.987289,47.3477|13"
        },
        {
            n: "\u53cc\u9e2d\u5c71",
            g: "131.171402,46.655102|13"
        },
        {
            n: "\u7ee5\u5316",
            g: "126.989095,46.646064|13"
        },
        {
            n: "\u4f0a\u6625",
            g: "128.910766,47.734685|14"
        }]
    },
    {
        n: "\u6e56\u5317",
        g: "112.410562,31.209316|8",
        cities: [{
            n: "\u6b66\u6c49",
            g: "114.3162,30.581084|12"
        },
        {
            n: "\u9102\u5dde",
            g: "114.895594,30.384439|14"
        },
        {
            n: "\u6069\u65bd",
            g: "109.517433,30.308978|14"
        },
        {
            n: "\u9ec4\u5188",
            g: "114.906618,30.446109|14"
        },
        {
            n: "\u9ec4\u77f3",
            g: "115.050683,30.216127|13"
        },
        {
            n: "\u8346\u95e8",
            g: "112.21733,31.042611|13"
        },
        {
            n: "\u8346\u5dde",
            g: "112.241866,30.332591|12"
        },
        {
            n: "\u6f5c\u6c5f",
            g: "112.768768,30.343116|13"
        },
        {
            n: "\u795e\u519c\u67b6\u6797\u533a",
            g: "110.487231,31.595768|13"
        },
        {
            n: "\u5341\u5830",
            g: "110.801229,32.636994|13"
        },
        {
            n: "\u968f\u5dde",
            g: "113.379358,31.717858|13"
        },
        {
            n: "\u5929\u95e8",
            g: "113.12623,30.649047|13"
        },
        {
            n: "\u4ed9\u6843",
            g: "113.387448,30.293966|13"
        },
        {
            n: "\u54b8\u5b81",
            g: "114.300061,29.880657|13"
        },
        {
            n: "\u8944\u9633",
            g: "112.176326,32.094934|12"
        },
        {
            n: "\u5b5d\u611f",
            g: "113.935734,30.927955|13"
        },
        {
            n: "\u5b9c\u660c",
            g: "111.310981,30.732758|13"
        }]
    },
    {
        n: "\u6e56\u5357",
        g: "111.720664,27.695864|7",
        cities: [{
            n: "\u957f\u6c99",
            g: "112.979353,28.213478|12"
        },
        {
            n: "\u5e38\u5fb7",
            g: "111.653718,29.012149|12"
        },
        {
            n: "\u90f4\u5dde",
            g: "113.037704,25.782264|13"
        },
        {
            n: "\u8861\u9633",
            g: "112.583819,26.898164|13"
        },
        {
            n: "\u6000\u5316",
            g: "109.986959,27.557483|13"
        },
        {
            n: "\u5a04\u5e95",
            g: "111.996396,27.741073|13"
        },
        {
            n: "\u90b5\u9633",
            g: "111.461525,27.236811|13"
        },
        {
            n: "\u6e58\u6f6d",
            g: "112.935556,27.835095|13"
        },
        {
            n: "\u6e58\u897f\u5dde",
            g: "109.745746,28.317951|14"
        },
        {
            n: "\u76ca\u9633",
            g: "112.366547,28.588088|13"
        },
        {
            n: "\u6c38\u5dde",
            g: "111.614648,26.435972|13"
        },
        {
            n: "\u5cb3\u9633",
            g: "113.146196,29.378007|13"
        },
        {
            n: "\u5f20\u5bb6\u754c",
            g: "110.48162,29.124889|13"
        },
        {
            n: "\u682a\u6d32",
            g: "113.131695,27.827433|13"
        }]
    },
    {
        n: "\u6c5f\u82cf",
        g: "119.368489,33.013797|8",
        cities: [{
            n: "\u5357\u4eac",
            g: "118.778074,32.057236|12"
        },
        {
            n: "\u5e38\u5dde",
            g: "119.981861,31.771397|12"
        },
        {
            n: "\u6dee\u5b89",
            g: "119.030186,33.606513|12"
        },
        {
            n: "\u8fde\u4e91\u6e2f",
            g: "119.173872,34.601549|12"
        },
        {
            n: "\u5357\u901a",
            g: "120.873801,32.014665|12"
        },
        {
            n: "\u82cf\u5dde",
            g: "120.619907,31.317987|12"
        },
        {
            n: "\u5bbf\u8fc1",
            g: "118.296893,33.95205|13"
        },
        {
            n: "\u6cf0\u5dde",
            g: "119.919606,32.476053|13"
        },
        {
            n: "\u65e0\u9521",
            g: "120.305456,31.570037|12"
        },
        {
            n: "\u5f90\u5dde",
            g: "117.188107,34.271553|12"
        },
        {
            n: "\u76d0\u57ce",
            g: "120.148872,33.379862|12"
        },
        {
            n: "\u626c\u5dde",
            g: "119.427778,32.408505|13"
        },
        {
            n: "\u9547\u6c5f",
            g: "119.455835,32.204409|13"
        }]
    },
    {
        n: "\u6c5f\u897f",
        g: "115.676082,27.757258|7",
        cities: [{
            n: "\u5357\u660c",
            g: "115.893528,28.689578|12"
        },
        {
            n: "\u629a\u5dde",
            g: "116.360919,27.954545|13"
        },
        {
            n: "\u8d63\u5dde",
            g: "114.935909,25.845296|13"
        },
        {
            n: "\u5409\u5b89",
            g: "114.992039,27.113848|13"
        },
        {
            n: "\u666f\u5fb7\u9547",
            g: "117.186523,29.303563|12"
        },
        {
            n: "\u4e5d\u6c5f",
            g: "115.999848,29.71964|13"
        },
        {
            n: "\u840d\u4e61",
            g: "113.859917,27.639544|13"
        },
        {
            n: "\u4e0a\u9976",
            g: "117.955464,28.457623|13"
        },
        {
            n: "\u65b0\u4f59",
            g: "114.947117,27.822322|13"
        },
        {
            n: "\u5b9c\u6625",
            g: "114.400039,27.81113|13"
        },
        {
            n: "\u9e70\u6f6d",
            g: "117.03545,28.24131|13"
        }]
    },
    {
        n: "\u5409\u6797",
        g: "126.262876,43.678846|7",
        cities: [{
            n: "\u957f\u6625",
            g: "125.313642,43.898338|12"
        },
        {
            n: "\u767d\u57ce",
            g: "122.840777,45.621086|13"
        },
        {
            n: "\u767d\u5c71",
            g: "126.435798,41.945859|13"
        },
        {
            n: "\u5409\u6797",
            g: "126.564544,43.871988|12"
        },
        {
            n: "\u8fbd\u6e90",
            g: "125.133686,42.923303|13"
        },
        {
            n: "\u56db\u5e73",
            g: "124.391382,43.175525|12"
        },
        {
            n: "\u677e\u539f",
            g: "124.832995,45.136049|13"
        },
        {
            n: "\u901a\u5316",
            g: "125.94265,41.736397|13"
        },
        {
            n: "\u5ef6\u8fb9",
            g: "129.485902,42.896414|13"
        }]
    },
    {
        n: "\u8fbd\u5b81",
        g: "122.753592,41.6216|8",
        cities: [{
            n: "\u6c88\u9633",
            g: "123.432791,41.808645|12"
        },
        {
            n: "\u978d\u5c71",
            g: "123.007763,41.118744|13"
        },
        {
            n: "\u672c\u6eaa",
            g: "123.778062,41.325838|12"
        },
        {
            n: "\u671d\u9633",
            g: "120.446163,41.571828|13"
        },
        {
            n: "\u5927\u8fde",
            g: "121.593478,38.94871|12"
        },
        {
            n: "\u4e39\u4e1c",
            g: "124.338543,40.129023|12"
        },
        {
            n: "\u629a\u987a",
            g: "123.92982,41.877304|12"
        },
        {
            n: "\u961c\u65b0",
            g: "121.660822,42.01925|14"
        },
        {
            n: "\u846b\u82a6\u5c9b",
            g: "120.860758,40.74303|13"
        },
        {
            n: "\u9526\u5dde",
            g: "121.147749,41.130879|13"
        },
        {
            n: "\u8fbd\u9633",
            g: "123.172451,41.273339|14"
        },
        {
            n: "\u76d8\u9526",
            g: "122.073228,41.141248|13"
        },
        {
            n: "\u94c1\u5cad",
            g: "123.85485,42.299757|13"
        },
        {
            n: "\u8425\u53e3",
            g: "122.233391,40.668651|13"
        }]
    },
    {
        n: "\u5185\u8499\u53e4",
        g: "114.415868,43.468238|5",
        cities: [{
            n: "\u547c\u548c\u6d69\u7279",
            g: "111.660351,40.828319|12"
        },
        {
            n: "\u963f\u62c9\u5584\u76df",
            g: "105.695683,38.843075|14"
        },
        {
            n: "\u5305\u5934",
            g: "109.846239,40.647119|12"
        },
        {
            n: "\u5df4\u5f66\u6dd6\u5c14",
            g: "107.423807,40.76918|12"
        },
        {
            n: "\u8d64\u5cf0",
            g: "118.930761,42.297112|12"
        },
        {
            n: "\u9102\u5c14\u591a\u65af",
            g: "109.993706,39.81649|12"
        },
        {
            n: "\u547c\u4f26\u8d1d\u5c14",
            g: "119.760822,49.201636|12"
        },
        {
            n: "\u901a\u8fbd",
            g: "122.260363,43.633756|12"
        },
        {
            n: "\u4e4c\u6d77",
            g: "106.831999,39.683177|13"
        },
        {
            n: "\u4e4c\u5170\u5bdf\u5e03",
            g: "113.112846,41.022363|12"
        },
        {
            n: "\u9521\u6797\u90ed\u52d2\u76df",
            g: "116.02734,43.939705|11"
        },
        {
            n: "\u5174\u5b89\u76df",
            g: "122.048167,46.083757|11"
        }]
    },
    {
        n: "\u5b81\u590f",
        g: "106.155481,37.321323|8",
        cities: [{
            n: "\u94f6\u5ddd",
            g: "106.206479,38.502621|12"
        },
        {
            n: "\u56fa\u539f",
            g: "106.285268,36.021523|13"
        },
        {
            n: "\u77f3\u5634\u5c71",
            g: "106.379337,39.020223|13"
        },
        {
            n: "\u5434\u5fe0",
            g: "106.208254,37.993561|14"
        },
        {
            n: "\u4e2d\u536b",
            g: "105.196754,37.521124|14"
        }]
    },
    {
        n: "\u9752\u6d77",
        g: "96.202544,35.499761|7",
        cities: [{
            n: "\u897f\u5b81",
            g: "101.767921,36.640739|12"
        },
        {
            n: "\u679c\u6d1b\u5dde",
            g: "100.223723,34.480485|11"
        },
        {
            n: "\u6d77\u4e1c\u5730\u533a",
            g: "102.085207,36.51761|11"
        },
        {
            n: "\u6d77\u5317\u5dde",
            g: "100.879802,36.960654|11"
        },
        {
            n: "\u6d77\u5357\u5dde",
            g: "100.624066,36.284364|11"
        },
        {
            n: "\u6d77\u897f\u5dde",
            g: "97.342625,37.373799|11"
        },
        {
            n: "\u9ec4\u5357\u5dde",
            g: "102.0076,35.522852|11"
        },
        {
            n: "\u7389\u6811\u5dde",
            g: "97.013316,33.00624|14"
        }]
    },
    {
        n: "\u5c71\u4e1c",
        g: "118.527663,36.09929|8",
        cities: [{
            n: "\u6d4e\u5357",
            g: "117.024967,36.682785|12"
        },
        {
            n: "\u6ee8\u5dde",
            g: "117.968292,37.405314|12"
        },
        {
            n: "\u4e1c\u8425",
            g: "118.583926,37.487121|12"
        },
        {
            n: "\u5fb7\u5dde",
            g: "116.328161,37.460826|12"
        },
        {
            n: "\u83cf\u6cfd",
            g: "115.46336,35.26244|13"
        },
        {
            n: "\u6d4e\u5b81",
            g: "116.600798,35.402122|13"
        },
        {
            n: "\u83b1\u829c",
            g: "117.684667,36.233654|13"
        },
        {
            n: "\u804a\u57ce",
            g: "115.986869,36.455829|12"
        },
        {
            n: "\u4e34\u6c82",
            g: "118.340768,35.072409|12"
        },
        {
            n: "\u9752\u5c9b",
            g: "120.384428,36.105215|12"
        },
        {
            n: "\u65e5\u7167",
            g: "119.50718,35.420225|12"
        },
        {
            n: "\u6cf0\u5b89",
            g: "117.089415,36.188078|13"
        },
        {
            n: "\u5a01\u6d77",
            g: "122.093958,37.528787|13"
        },
        {
            n: "\u6f4d\u574a",
            g: "119.142634,36.716115|12"
        },
        {
            n: "\u70df\u53f0",
            g: "121.309555,37.536562|12"
        },
        {
            n: "\u67a3\u5e84",
            g: "117.279305,34.807883|13"
        },
        {
            n: "\u6dc4\u535a",
            g: "118.059134,36.804685|12"
        }]
    },
    {
        n: "\u5c71\u897f",
        g: "112.515496,37.866566|7",
        cities: [{
            n: "\u592a\u539f",
            g: "112.550864,37.890277|12"
        },
        {
            n: "\u957f\u6cbb",
            g: "113.120292,36.201664|12"
        },
        {
            n: "\u5927\u540c",
            g: "113.290509,40.113744|12"
        },
        {
            n: "\u664b\u57ce",
            g: "112.867333,35.499834|13"
        },
        {
            n: "\u664b\u4e2d",
            g: "112.738514,37.693362|13"
        },
        {
            n: "\u4e34\u6c7e",
            g: "111.538788,36.099745|13"
        },
        {
            n: "\u5415\u6881",
            g: "111.143157,37.527316|14"
        },
        {
            n: "\u6714\u5dde",
            g: "112.479928,39.337672|13"
        },
        {
            n: "\u5ffb\u5dde",
            g: "112.727939,38.461031|12"
        },
        {
            n: "\u9633\u6cc9",
            g: "113.569238,37.869529|13"
        },
        {
            n: "\u8fd0\u57ce",
            g: "111.006854,35.038859|13"
        }]
    },
    {
        n: "\u9655\u897f",
        g: "109.503789,35.860026|7",
        cities: [{
            n: "\u897f\u5b89",
            g: "108.953098,34.2778|12"
        },
        {
            n: "\u5b89\u5eb7",
            g: "109.038045,32.70437|13"
        },
        {
            n: "\u5b9d\u9e21",
            g: "107.170645,34.364081|12"
        },
        {
            n: "\u6c49\u4e2d",
            g: "107.045478,33.081569|13"
        },
        {
            n: "\u5546\u6d1b",
            g: "109.934208,33.873907|13"
        },
        {
            n: "\u94dc\u5ddd",
            g: "108.968067,34.908368|13"
        },
        {
            n: "\u6e2d\u5357",
            g: "109.483933,34.502358|13"
        },
        {
            n: "\u54b8\u9633",
            g: "108.707509,34.345373|13"
        },
        {
            n: "\u5ef6\u5b89",
            g: "109.50051,36.60332|13"
        },
        {
            n: "\u6986\u6797",
            g: "109.745926,38.279439|12"
        }]
    },
    {
        n: "\u56db\u5ddd",
        g: "102.89916,30.367481|7",
        cities: [{
            n: "\u6210\u90fd",
            g: "104.067923,30.679943|12"
        },
        {
            n: "\u963f\u575d\u5dde",
            g: "102.228565,31.905763|15"
        },
        {
            n: "\u5df4\u4e2d",
            g: "106.757916,31.869189|14"
        },
        {
            n: "\u8fbe\u5dde",
            g: "107.494973,31.214199|14"
        },
        {
            n: "\u5fb7\u9633",
            g: "104.402398,31.13114|13"
        },
        {
            n: "\u7518\u5b5c\u5dde",
            g: "101.969232,30.055144|15"
        },
        {
            n: "\u5e7f\u5b89",
            g: "106.63572,30.463984|13"
        },
        {
            n: "\u5e7f\u5143",
            g: "105.819687,32.44104|13"
        },
        {
            n: "\u4e50\u5c71",
            g: "103.760824,29.600958|13"
        },
        {
            n: "\u51c9\u5c71\u5dde",
            g: "102.259591,27.892393|14"
        },
        {
            n: "\u6cf8\u5dde",
            g: "105.44397,28.89593|14"
        },
        {
            n: "\u5357\u5145",
            g: "106.105554,30.800965|13"
        },
        {
            n: "\u7709\u5c71",
            g: "103.84143,30.061115|13"
        },
        {
            n: "\u7ef5\u9633",
            g: "104.705519,31.504701|12"
        },
        {
            n: "\u5185\u6c5f",
            g: "105.073056,29.599462|13"
        },
        {
            n: "\u6500\u679d\u82b1",
            g: "101.722423,26.587571|14"
        },
        {
            n: "\u9042\u5b81",
            g: "105.564888,30.557491|12"
        },
        {
            n: "\u96c5\u5b89",
            g: "103.009356,29.999716|13"
        },
        {
            n: "\u5b9c\u5bbe",
            g: "104.633019,28.769675|13"
        },
        {
            n: "\u8d44\u9633",
            g: "104.63593,30.132191|13"
        },
        {
            n: "\u81ea\u8d21",
            g: "104.776071,29.359157|13"
        }]
    },
    {
        n: "\u897f\u85cf",
        g: "89.137982,31.367315|6",
        cities: [{
            n: "\u62c9\u8428",
            g: "91.111891,29.662557|13"
        },
        {
            n: "\u963f\u91cc\u5730\u533a",
            g: "81.107669,30.404557|11"
        },
        {
            n: "\u660c\u90fd\u5730\u533a",
            g: "97.185582,31.140576|15"
        },
        {
            n: "\u6797\u829d\u5730\u533a",
            g: "94.349985,29.666941|11"
        },
        {
            n: "\u90a3\u66f2\u5730\u533a",
            g: "92.067018,31.48068|14"
        },
        {
            n: "\u65e5\u5580\u5219\u5730\u533a",
            g: "88.891486,29.269023|14"
        },
        {
            n: "\u5c71\u5357\u5730\u533a",
            g: "91.750644,29.229027|11"
        }]
    },
    {
        n: "\u65b0\u7586",
        g: "85.614899,42.127001|6",
        cities: [{
            n: "\u4e4c\u9c81\u6728\u9f50",
            g: "87.564988,43.84038|12"
        },
        {
            n: "\u963f\u62c9\u5c14",
            g: "81.291737,40.61568|13"
        },
        {
            n: "\u963f\u514b\u82cf\u5730\u533a",
            g: "80.269846,41.171731|12"
        },
        {
            n: "\u963f\u52d2\u6cf0\u5730\u533a",
            g: "88.137915,47.839744|13"
        },
        {
            n: "\u5df4\u97f3\u90ed\u695e",
            g: "86.121688,41.771362|12"
        },
        {
            n: "\u535a\u5c14\u5854\u62c9\u5dde",
            g: "82.052436,44.913651|11"
        },
        {
            n: "\u660c\u5409\u5dde",
            g: "87.296038,44.007058|13"
        },
        {
            n: "\u54c8\u5bc6\u5730\u533a",
            g: "93.528355,42.858596|13"
        },
        {
            n: "\u548c\u7530\u5730\u533a",
            g: "79.930239,37.116774|13"
        },
        {
            n: "\u5580\u4ec0\u5730\u533a",
            g: "75.992973,39.470627|12"
        },
        {
            n: "\u514b\u62c9\u739b\u4f9d",
            g: "84.88118,45.594331|13"
        },
        {
            n: "\u514b\u5b5c\u52d2\u82cf\u5dde",
            g: "76.137564,39.750346|11"
        },
        {
            n: "\u77f3\u6cb3\u5b50",
            g: "86.041865,44.308259|13"
        },
        {
            n: "\u5854\u57ce\u5730\u533a",
            g: "82.974881,46.758684|12"
        },
        {
            n: "\u56fe\u6728\u8212\u514b",
            g: "79.198155,39.889223|13"
        },
        {
            n: "\u5410\u9c81\u756a\u5730\u533a",
            g: "89.181595,42.96047|13"
        },
        {
            n: "\u4e94\u5bb6\u6e20",
            g: "87.565449,44.368899|13"
        },
        {
            n: "\u4f0a\u7281\u5dde",
            g: "81.297854,43.922248|11"
        }]
    },
    {
        n: "\u4e91\u5357",
        g: "101.592952,24.864213|7",
        cities: [{
            n: "\u6606\u660e",
            g: "102.714601,25.049153|12"
        },
        {
            n: "\u4fdd\u5c71",
            g: "99.177996,25.120489|13"
        },
        {
            n: "\u695a\u96c4\u5dde",
            g: "101.529382,25.066356|13"
        },
        {
            n: "\u5927\u7406\u5dde",
            g: "100.223675,25.5969|14"
        },
        {
            n: "\u5fb7\u5b8f\u5dde",
            g: "98.589434,24.44124|14"
        },
        {
            n: "\u8fea\u5e86\u5dde",
            g: "99.713682,27.831029|14"
        },
        {
            n: "\u7ea2\u6cb3\u5dde",
            g: "103.384065,23.367718|11"
        },
        {
            n: "\u4e3d\u6c5f",
            g: "100.229628,26.875351|13"
        },
        {
            n: "\u4e34\u6ca7",
            g: "100.092613,23.887806|14"
        },
        {
            n: "\u6012\u6c5f\u5dde",
            g: "98.859932,25.860677|14"
        },
        {
            n: "\u666e\u6d31",
            g: "100.980058,22.788778|14"
        },
        {
            n: "\u66f2\u9756",
            g: "103.782539,25.520758|12"
        },
        {
            n: "\u662d\u901a",
            g: "103.725021,27.340633|13"
        },
        {
            n: "\u6587\u5c71",
            g: "104.089112,23.401781|14"
        },
        {
            n: "\u897f\u53cc\u7248\u7eb3",
            g: "100.803038,22.009433|13"
        },
        {
            n: "\u7389\u6eaa",
            g: "102.545068,24.370447|13"
        }]
    },
    {
        n: "\u6d59\u6c5f",
        g: "119.957202,29.159494|8",
        cities: [{
            n: "\u676d\u5dde",
            g: "120.219375,30.259244|12"
        },
        {
            n: "\u6e56\u5dde",
            g: "120.137243,30.877925|12"
        },
        {
            n: "\u5609\u5174",
            g: "120.760428,30.773992|13"
        },
        {
            n: "\u91d1\u534e",
            g: "119.652576,29.102899|12"
        },
        {
            n: "\u4e3d\u6c34",
            g: "119.929576,28.4563|13"
        },
        {
            n: "\u5b81\u6ce2",
            g: "121.579006,29.885259|12"
        },
        {
            n: "\u8862\u5dde",
            g: "118.875842,28.95691|12"
        },
        {
            n: "\u7ecd\u5174",
            g: "120.592467,30.002365|13"
        },
        {
            n: "\u53f0\u5dde",
            g: "121.440613,28.668283|13"
        },
        {
            n: "\u6e29\u5dde",
            g: "120.690635,28.002838|12"
        },
        {
            n: "\u821f\u5c71",
            g: "122.169872,30.03601|13"
        }]
    }],
    Fd = [{
        n: "\u9999\u6e2f",
        g: "114.186124,22.293586|11"
    },
    {
        n: "\u6fb3\u95e8",
        g: "113.557519,22.204118|13"
    },
    {
        n: "\u53f0\u6e7e",
        g: "120.961454,23.80406|8"
    }],
    CommonLayer = function() {
        function f(c) {
            I(this, f);
            this.options = this.getCommonDefaultOptions();
            this.options = Object.assign(this.options, this.getDefaultOptions());
            this.autoUpdate = false;
            this.options = Object.assign(this.options, c);
            this.options.data && (this.data = this.options.data, delete this.options.data)
        }
        M(f, [{
            key: "getCommonDefaultOptions",
            value: function() {
                return {}
            }
        },
        {
            key: "getDefaultOptions",
            value: function() {
                return {}
            }
        },
        {
            key: "initialize",
            value: function(c) {}
        },
        {
            key: "destroy",
            value: function() {
                this.onDestroy && this.onDestroy()
            }
        },
        {
            key: "render",
            value: function() {}
        },
        {
            key: "setData",
            value: function(c, a) {
                a = a || {};
                this.data = c;
                this.onDataChanged && this.onDataChanged(this.getData());
                this.onChanged && this.onChanged(this.getOptions(), this.getData()); ! 1 !== a.autoRender && this.webglLayer && this.webglLayer.render()
            }
        },
        {
            key: "getData",
            value: function() {
                return this.data || []
            }
        },
        {
            key: "setOptions",
            value: function(c) {
                c = c || {};
                var a = Object.assign({},
                this.getOptions());
                Object.assign(this.options, c);
                this.onOptionsChanged && this.onOptionsChanged(this.getOptions(), a);
                this.onChanged && this.onChanged(this.getOptions(), this.getData());
                c.data ? (this.setData(c.data), delete c.data) : this.webglLayer && this.webglLayer.render()
            }
        },
        {
            key: "getOptions",
            value: function() {
                return this.options || {}
            }
        },
        {
            key: "onOptionsChanged",
            value: function(c, a) {}
        },
        {
            key: "onDataChanged",
            value: function(c) {}
        },
        {
            key: "onChanged",
            value: function(c, a) {}
        },
        {
            key: "onDestroy",
            value: function() {}
        },
        {
            key: "lnglatToMercator",
            value: function(c, a) {}
        },
        {
            key: "setWebglLayer",
            value: function(c) {
                this.webglLayer = c
            }
        },
        {
            key: "getWebglLayer",
            value: function() {
                return this.webglLayer
            }
        },
        {
            key: "isRequestAnimation",
            value: function() {
                return this.autoUpdate
            }
        }]);
        return f
    } (),
    Program = function() {
        function f(c, a, b) {
            I(this, f);
            this.options = a;
            this.gl = c;
            b && (this.map = b.map);
            b = this.getVertexShader(a.vertexShader);
            var d = this.getFragmentShader(a.fragmentShader);
            a = c.createShader(c.VERTEX_SHADER);
            c.shaderSource(a, b);
            c.compileShader(a);
            c.getShaderParameter(a, c.COMPILE_STATUS) ? (b = c.createShader(c.FRAGMENT_SHADER), c.shaderSource(b, d), c.compileShader(b), c.getShaderParameter(b, c.COMPILE_STATUS) ? (d = c.createProgram(), c.attachShader(d, a), c.attachShader(d, b), c.deleteShader(a), c.deleteShader(b), c.linkProgram(d), c.getProgramParameter(d, c.LINK_STATUS) ? a = d: (a = "Shader program failed to link.  The error log is:" + c.getProgramInfoLog(d), console.error(a), a = -1)) : (a = "Fragment shader failed to compile.  The error log is:" + c.getShaderInfoLog(b), console.error(a), a = -1)) : (a = "Vertex shader failed to compile.  The error log is:" + c.getShaderInfoLog(a), console.error(a), a = -1);
            a = this.program = a;
            b = {};
            d = c.getProgramParameter(a, c.ACTIVE_ATTRIBUTES);
            for (var e = 0; e < d; e++) {
                var g = c.getActiveAttrib(a, e);
                b[g.name] = c.getAttribLocation(a, g.name)
            }
            e = {};
            g = {};
            for (var h = c.getProgramParameter(a, c.ACTIVE_UNIFORMS), k = 0; k < h; k++) {
                var l = c.getActiveUniform(a, k);
                e[l.name] = c.getUniformLocation(a, l.name);
                g[l.name] = l.type
            }
            this.parameter = c = {
                attributes: b,
                numAttributes: d,
                uniformsType: g,
                uniforms: e
            };
            this.attributes = c.attributes;
            this.uniforms = c.uniforms;
            this.parameter = c
        }
        M(f, [{
            key: "getVertexShader",
            value: function(c) {
                var a = "";
                this.map && "cesium" === this.map.type && (a = "#define LOG_DEPTH\n");
                a += "#ifdef LOG_DEPTH\nvarying float v_depthFromNearPlusOne;\n#endif\nuniform vec2 MAPV_resolution;\n#if defined(PICK)\nuniform bool uIsPickRender;attribute vec3 aPickColor;uniform vec3 uPickedColor;varying vec4 vPickColor;uniform bool uEnablePicked;bool mapvIsPicked(){return uEnablePicked&&aPickColor==uPickedColor;}\n#endif\nvoid afterMain(){\n#if defined(LOG_DEPTH)\nv_depthFromNearPlusOne=(gl_Position.w-0.1)+1.0;gl_Position.z=clamp(gl_Position.z/gl_Position.w,-1.0,1.0)*gl_Position.w;\n#endif\n#if defined(PICK)\nvPickColor=vec4(aPickColor,0.0);if(mapvIsPicked()){vPickColor.a=1.0;}\n#endif\n}";
                c = this.getDefines() + a + c;
                c = c.replace("void main", "void originMain");
                return c + "void main() {originMain(); afterMain();}"
            }
        },
        {
            key: "getFragmentShader",
            value: function(c) {
                var a = "";
                this.map && "cesium" === this.map.type && (a = "#define LOG_DEPTH\n");
                a += "#if defined(LOG_DEPTH)\n#extension GL_EXT_frag_depth : enable\n#endif\nprecision highp float;uniform vec2 MAPV_resolution;\n#if defined(PICK)\nuniform bool uIsPickRender;varying vec4 vPickColor;bool mapvIsPicked(){return vPickColor.a==1.0;}\n#endif\n#if defined(LOG_DEPTH)\nuniform float oneOverLog2FarDepthFromNearPlusOne;uniform float farDepthFromNearPlusOne;varying float v_depthFromNearPlusOne;void writeLogDepth(float depth){if(depth<=0.9999999||depth>farDepthFromNearPlusOne){discard;}gl_FragDepthEXT=log2(depth)*oneOverLog2FarDepthFromNearPlusOne;}\n#endif\nvoid afterMain(){\n#if defined(PICK)\nif(uIsPickRender){gl_FragColor=vec4(vPickColor.rgb,1.0);return;}\n#endif\n#if defined(LOG_DEPTH)\nwriteLogDepth(v_depthFromNearPlusOne);\n#endif\n}";
                c = this.getDefines() + a + c;
                c = c.replace("void main", "void originMain");
                return c + "void main() {originMain(); afterMain();}"
            }
        },
        {
            key: "getDefines",
            value: function() {
                var c = "",
                a = this.options.defines;
                if (a) for (var b = 0; b < a.length; b++) c += "#define " + a[b] + "\n";
                return c
            }
        },
        {
            key: "use",
            value: function(c, a) {
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
        },
        {
            key: "setUniform",
            value: function(c, a) {
                var b = this.gl,
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
                    b.uniformMatrix2fv(d, false, a);
                    break;
                case b.FLOAT_MAT3:
                    b.uniformMatrix3fv(d, false, a);
                    break;
                case b.FLOAT_MAT4:
                    b.uniformMatrix4fv(d, false, a);
                    break;
                default:
                    console.error("Unrecognized uniform type: " + c)
                } else console.warn("Unrecognized uniform type: " + c)
            }
        },
        {
            key: "setUniforms",
            value: function(c) {
                this.textureIndex = 0;
                for (var a in c) this.setUniform(a, c[a])
            }
        }]);
        return f
    } (),
    wf = function() {
        function f(c) {
            I(this, f);
            this.options = c;
            this.gl = c.gl;
            this.savedState = [];
            this.currentState = this.getCurrentState()
        }
        M(f, [{
            key: "setDefaultState",
            value: function() {
                this.setState()
            }
        },
        {
            key: "getDefaultState",
            value: function() {
                return {
                    blend: false,
                    depthTest: false,
                    cullFace: false,
                    depthMask: true,
                    stencilTest: false
                }
            }
        },
        {
            key: "getCurrentState",
            value: function() {
                var c = this.gl;
                return {
                    blend: c.getParameter(c.BLEND),
                    stencilTest: c.getParameter(c.STENCIL_TEST),
                    depthTest: c.getParameter(c.DEPTH_TEST),
                    cullFace: c.getParameter(c.CULL_FACE),
                    depthMask: c.getParameter(c.DEPTH_WRITEMASK)
                }
            }
        },
        {
            key: "save",
            value: function() {
                this.savedState.push(this.getCurrentState())
            }
        },
        {
            key: "restore",
            value: function() {
                var c = this.savedState.pop();
                this.setState(c)
            }
        },
        {
            key: "setState",
            value: function(c) {
                var a = this.gl,
                b = this.getCurrentState();
                c = Object.assign(this.getDefaultState(), c);
                c.blend !== b.blend && (c.blend ? a.enable(a.BLEND) : a.disable(a.BLEND));
                c.depthTest !== b.depthTest && (c.depthTest ? a.enable(a.DEPTH_TEST) : a.disable(a.DEPTH_TEST));
                c.cullFace !== b.cullFace && (c.cullFace ? a.enable(a.CULL_FACE) : a.disable(a.CULL_FACE));
                c.depthMask !== b.depthMask && (c.depthMask ? a.depthMask(true) : a.depthMask(false));
                this.currentState = c
            }
        }]);
        return f
    } (),
    Buffer = function() {
        function f(c) {
            I(this, f);
            this.options = c;
            this.gl = c.gl;
            this.buffer = this.gl.createBuffer();
            c.data && this.updateData(c.data)
        }
        M(f, [{
            key: "updateData",
            value: function(c) {
                var a = this.options,
                b = this.gl;
                this.bind();
                b.bufferData(b[a.target], c, b[a.usage])
            }
        },
        {
            key: "bind",
            value: function(c) {
                c = c || this.gl;
                c.bindBuffer(c[this.options.target], this.buffer)
            }
        },
        {
            key: "unBind",
            value: function(c) {
                c = c || this.gl;
                c.bindBuffer(c[this.options.target], null)
            }
        },
        {
            key: "destroy",
            value: function() {
                this.buffer = null
            }
        }]);
        return f
    } (),
    gi = {
        BYTE: 1,
        UNSIGNED_BYTE: 1,
        SHORT: 2,
        UNSIGNED_SHORT: 2,
        FLOAT: 4
    },
    VertexArray = function() {
        function f(c) {
            I(this, f);
            this.options = c;
            this.attributes = c.attributes;
            this.gl = c.gl;
            this.program = c.program;
            for (c = this.stride = 0; c < this.attributes.length; c++) this.stride += gi[this.attributes[c].type] * this.attributes[c].size
        }
        M(f, [{
            key: "setVertexAttribPointers",
            value: function() {
                for (var c = this.gl,
                a = this.program,
                b = 0; b < this.attributes.length; b++) {
                    var d = this.attributes[b],
                    f = a.attributes[d.name];
                    undefined !== f && (d.buffer.bind(c), c.vertexAttribPointer(f, d.size, c[d.type], d.normalize || false, undefined !== d.stride ? d.stride: this.stride, d.offset), c.enableVertexAttribArray(f))
                }
            }
        },
        {
            key: "bind",
            value: function() {
                this.setVertexAttribPointers()
            }
        },
        {
            key: "destroy",
            value: function() {}
        }]);
        return f
    } (),
    FrameBufferObject = function d(c, a, b) {
        I(this, d);
        a = a || c.canvas.width;
        b = b || c.canvas.height;
        var e = c.createFramebuffer(),
        g = c.createTexture();
        c.bindTexture(c.TEXTURE_2D, g);
        c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, a, b, 0, c.RGBA, c.UNSIGNED_BYTE, null);
        c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.LINEAR);
        c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, c.LINEAR);
        c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_S, c.CLAMP_TO_EDGE);
        c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, c.CLAMP_TO_EDGE);
        e.texture = g;
        var h = c.createRenderbuffer();
        c.bindRenderbuffer(c.RENDERBUFFER, h);
        c.renderbufferStorage(c.RENDERBUFFER, c.DEPTH_COMPONENT16, a, b);
        e.depthBuffer = h;
        c.bindFramebuffer(c.FRAMEBUFFER, e);
        c.framebufferTexture2D(c.FRAMEBUFFER, c.COLOR_ATTACHMENT0, c.TEXTURE_2D, g, 0);
        c.framebufferRenderbuffer(c.FRAMEBUFFER, c.DEPTH_ATTACHMENT, c.RENDERBUFFER, h);
        a = c.checkFramebufferStatus(c.FRAMEBUFFER);
        c.FRAMEBUFFER_COMPLETE === a && (c.bindFramebuffer(c.FRAMEBUFFER, null), c.bindTexture(c.TEXTURE_2D, null), c.bindRenderbuffer(c.RENDERBUFFER, null), this.framebuffer = e)
    },
    Effect = function() {
        function c(a) {
            I(this, c);
            this.options = {};
            Object.assign(this.options, a);
            this.vertex = [ - 1, 1, 0, -1, -1, 0, 1, 1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0];
            this.sampleCoord = [0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0]
        }
        M(c, [{
            key: "getOptions",
            value: function() {
                return this.options
            }
        },
        {
            key: "onResize",
            value: function(a) {}
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl;
                a = a.texture;
                var d = this.programSample;
                b.useProgram(d.program);
                var c = b.createBuffer();
                b.bindBuffer(b.ARRAY_BUFFER, c);
                var g = [ - 1, -1, 0, -1, 1, 0, 1, 1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0];
                b.bufferData(b.ARRAY_BUFFER, new Float32Array(g), b.STATIC_DRAW);
                b.enableVertexAttribArray(d.attributes.aPos);
                b.vertexAttribPointer(d.attributes.aPos, 3, b.FLOAT, false, 0, 0);
                c = b.createBuffer();
                b.bindBuffer(b.ARRAY_BUFFER, c);
                b.bufferData(b.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0]), b.STATIC_DRAW);
                b.enableVertexAttribArray(d.attributes.aTextureCoord);
                b.vertexAttribPointer(d.attributes.aTextureCoord, 2, b.FLOAT, false, 0, 0);
                b.activeTexture(b.TEXTURE0);
                b.bindTexture(b.TEXTURE_2D, a);
                b.uniform1i(d.uniforms.uSampler, 0);
                b.drawArrays(b.TRIANGLES, 0, g.length / 3)
            }
        }]);
        return c
    } (),
    hi = function(c) {
        function a(b) {
            I(this, a);
            return Q(this, (a.__proto__ || N(a)).call(this, b))
        }
        R(a, c);
        M(a, [{
            key: "getProgram",
            value: function(b) {
                this.programSample || (this.programSample = new Program(b, {
                    vertexShader: "attribute vec3 aPos;attribute vec2 aTextureCoord;varying vec2 vTextureCoord;void main(){vTextureCoord=aTextureCoord;gl_Position=vec4(aPos,1.0);}",
                    fragmentShader: "precision mediump float;uniform sampler2D uSampler;varying vec2 vTextureCoord;void main(){float fStep=1.0/512.0;vec4 sample11=texture2D(uSampler,vec2(vTextureCoord.s-1.0*fStep,vTextureCoord.t+1.0*fStep));vec4 sample12=texture2D(uSampler,vec2(vTextureCoord.s,vTextureCoord.t+1.0*fStep));vec4 sample13=texture2D(uSampler,vec2(vTextureCoord.s+1.0*fStep,vTextureCoord.t+1.0*fStep));vec4 sample21=texture2D(uSampler,vec2(vTextureCoord.s-1.0*fStep,vTextureCoord.t));vec4 sample22=texture2D(uSampler,vec2(vTextureCoord.s,vTextureCoord.t));vec4 sample23=texture2D(uSampler,vec2(vTextureCoord.s+1.0*fStep,vTextureCoord.t));vec4 sample31=texture2D(uSampler,vec2(vTextureCoord.s-1.0*fStep,vTextureCoord.t-1.0*fStep));vec4 sample32=texture2D(uSampler,vec2(vTextureCoord.s,vTextureCoord.t-1.0*fStep));vec4 sample33=texture2D(uSampler,vec2(vTextureCoord.s+1.0*fStep,vTextureCoord.t-1.0*fStep));vec4 blurSample=(sample11+sample12+sample13+sample21+2.0*sample22+sample23+sample31+sample32+sample33)/10.0;gl_FragColor=blurSample;}"
                }), this.vertexBuffer = new Buffer({
                    gl: b,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                }), this.sampleBuffer = new Buffer({
                    gl: b,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                }), this.vertexBuffer.updateData(new Float32Array(this.vertex)), this.sampleBuffer.updateData(new Float32Array(this.sampleCoord)), this.vertexArray = new VertexArray({
                    gl: b,
                    program: this.programSample,
                    attributes: [{
                        stride: 12,
                        name: "aPos",
                        buffer: this.vertexBuffer,
                        size: 3,
                        type: "FLOAT",
                        offset: 0
                    },
                    {
                        stride: 8,
                        name: "aTextureCoord",
                        buffer: this.sampleBuffer,
                        size: 2,
                        type: "FLOAT",
                        offset: 0
                    }]
                }));
                return this.programSample
            }
        },
        {
            key: "render",
            value: function(b) {
                var a = b.gl;
                b = b.texture;
                a.clearColor(0, 0, 0, 0);
                a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                var c = this.getProgram(a);
                c.use(a);
                this.vertexArray.bind();
                a.activeTexture(a.TEXTURE1);
                a.bindTexture(a.TEXTURE_2D, b);
                a.uniform1i(c.uniforms.uSampler, 1);
                a.drawArrays(a.TRIANGLES, 0, this.vertex.length / 3)
            }
        }]);
        return a
    } (Effect),
    BloomEffect = function(c) {
        function a(b) {
            I(this, a);
            return Q(this, (a.__proto__ || N(a)).call(this, b))
        }
        R(a, c);
        M(a, [{
            key: "getProgram",
            value: function(b) {
                this.programBright || (this.programBright = new Program(b, {
                    vertexShader: "attribute vec3 aPos;attribute vec2 aTextureCoord;varying vec2 vTextureCoord;void main(){vTextureCoord=aTextureCoord;gl_Position=vec4(aPos,1.0);}",
                    fragmentShader: "precision mediump float;uniform sampler2D uSampler;uniform float threshold;varying vec2 vTextureCoord;void main(){vec4 color=texture2D(uSampler,vTextureCoord);vec4 lightColor=max(vec4(0.0),(color-(1.0-threshold)/5.0));float brightness=dot(color.rgb,vec3(0.2126,0.7152,0.0722));if(brightness>threshold){color=lightColor;}else{color=vec4(0.0);}gl_FragColor=color;}"
                }));
                this.programBloom || (this.programBloom = new Program(b, {
                    vertexShader: "attribute vec3 aPos;attribute vec2 aTextureCoord;varying vec2 vTextureCoord;void main(){vTextureCoord=aTextureCoord;gl_Position=vec4(aPos,1.0);}",
                    fragmentShader: "precision mediump float;uniform sampler2D uSampler;uniform bool isVertical;uniform vec2 canvasSize;uniform float blurSize;uniform float devicePixelRatio;varying vec2 vTextureCoord;void main(){float weight[10];weight[0]=0.2270270270;weight[1]=0.1945945946;weight[2]=0.1216216216;weight[3]=0.1135135135;weight[4]=0.0972972973;weight[5]=0.0608108108;weight[6]=0.0540540541;weight[7]=0.0270270270;weight[8]=0.0162162162;weight[9]=0.0081081081;vec2 offset=vec2(blurSize/canvasSize.x,blurSize/canvasSize.y)*devicePixelRatio;vec4 result=texture2D(uSampler,vTextureCoord)*weight[0];if(isVertical){for(int i=1;i<10;++i){result+=texture2D(uSampler,vTextureCoord+vec2(0.0,offset.y*float(i)))*weight[i];result+=texture2D(uSampler,vTextureCoord-vec2(0.0,offset.y*float(i)))*weight[i];}}else{for(int i=1;i<10;++i){result+=texture2D(uSampler,vTextureCoord+vec2(offset.x*float(i),0.0))*weight[i];result+=texture2D(uSampler,vTextureCoord-vec2(offset.x*float(i),0.0))*weight[i];}}gl_FragColor=result;}"
                }));
                this.programResult || (this.programResult = new Program(b, {
                    vertexShader: "attribute vec3 aPos;attribute vec2 aTextureCoord;varying vec2 vTextureCoord;void main(){vTextureCoord=aTextureCoord;gl_Position=vec4(aPos,1.0);}",
                    fragmentShader: "precision mediump float;uniform sampler2D originalTexture;uniform sampler2D bloomTexture;varying vec2 vTextureCoord;void main(){vec4 color=texture2D(originalTexture,vTextureCoord);vec4 bloomColor=texture2D(bloomTexture,vTextureCoord);color+=bloomColor;gl_FragColor=color;}"
                }));
                return {
                    programBright: this.programBright,
                    programBloom: this.programBloom,
                    programResult: this.programResult
                }
            }
        },
        {
            key: "onResize",
            value: function(b) {
                this.collectBrightBuffer = new FrameBufferObject(b);
                this.bloomBuffer = new FrameBufferObject(b)
            }
        },
        {
            key: "getExtraFbo",
            value: function(b) {
                this.collectBrightBuffer || (this.collectBrightBuffer = new FrameBufferObject(b));
                this.bloomBuffer || (this.bloomBuffer = new FrameBufferObject(b));
                return {
                    collectBrightBuffer: this.collectBrightBuffer.framebuffer,
                    bloomBuffer: this.bloomBuffer.framebuffer
                }
            }
        },
        {
            key: "render",
            value: function(b) {
                var a = b.gl,
                c = b.texture;
                b = b.fbo;
                var g = this.getOptions();
                a.clearColor(0, 0, 0, 0);
                a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                var h = this.getProgram(a),
                k = h.programBright,
                l = h.programBloom;
                h = h.programResult;
                var m = this.getExtraFbo(a),
                p = m.collectBrightBuffer;
                m = m.bloomBuffer;
                var n = a.createBuffer();
                a.bindBuffer(a.ARRAY_BUFFER, n);
                a.bufferData(a.ARRAY_BUFFER, new Float32Array(this.vertex), a.STATIC_DRAW);
                a.enableVertexAttribArray(k.attributes.aPos);
                a.vertexAttribPointer(k.attributes.aPos, 3, a.FLOAT, false, 0, 0);
                a.enableVertexAttribArray(l.attributes.aPos);
                a.vertexAttribPointer(l.attributes.aPos, 3, a.FLOAT, false, 0, 0);
                a.enableVertexAttribArray(h.attributes.aPos);
                a.vertexAttribPointer(h.attributes.aPos, 3, a.FLOAT, false, 0, 0);
                n = a.createBuffer();
                a.bindBuffer(a.ARRAY_BUFFER, n);
                a.bufferData(a.ARRAY_BUFFER, new Float32Array(this.sampleCoord), a.STATIC_DRAW);
                a.enableVertexAttribArray(k.attributes.aTextureCoord);
                a.vertexAttribPointer(k.attributes.aTextureCoord, 2, a.FLOAT, false, 0, 0);
                a.enableVertexAttribArray(l.attributes.aTextureCoord);
                a.vertexAttribPointer(l.attributes.aTextureCoord, 2, a.FLOAT, false, 0, 0);
                a.enableVertexAttribArray(h.attributes.aTextureCoord);
                a.vertexAttribPointer(h.attributes.aTextureCoord, 2, a.FLOAT, false, 0, 0);
                a.useProgram(k.program);
                a.bindFramebuffer(a.FRAMEBUFFER, p);
                a.clearColor(0, 0, 0, 0);
                a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                a.activeTexture(a.TEXTURE1);
                a.bindTexture(a.TEXTURE_2D, c);
                a.uniform1i(k.uniforms.uSampler, 1);
                a.uniform1f(k.uniforms.threshold, g.threshold || 0);
                a.drawArrays(a.TRIANGLES, 0, this.vertex.length / 3);
                a.useProgram(l.program);
                a.bindFramebuffer(a.FRAMEBUFFER, m);
                a.clearColor(0, 0, 0, 0);
                a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                a.activeTexture(a.TEXTURE1);
                a.bindTexture(a.TEXTURE_2D, p.texture);
                a.uniform1i(l.uniforms.uSampler, 1);
                a.uniform1i(l.uniforms.isVertical, true);
                a.uniform1f(l.uniforms.blurSize, g.blurSize || 2);
                a.uniform1f(l.uniforms.devicePixelRatio, window.devicePixelRatio);
                a.uniform2fv(l.uniforms.canvasSize, [a.canvas.width, a.canvas.height]);
                a.drawArrays(a.TRIANGLES, 0, this.vertex.length / 3);
                a.useProgram(l.program);
                a.bindFramebuffer(a.FRAMEBUFFER, p);
                a.clearColor(0, 0, 0, 0);
                a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                a.activeTexture(a.TEXTURE1);
                a.bindTexture(a.TEXTURE_2D, m.texture);
                a.uniform1i(l.uniforms.uSampler, 1);
                a.uniform1i(l.uniforms.isVertical, false);
                a.uniform1f(l.uniforms.blurSize, g.blurSize || 2);
                a.uniform1f(l.uniforms.devicePixelRatio, window.devicePixelRatio);
                a.uniform2fv(l.uniforms.canvasSize, [a.canvas.width, a.canvas.height]);
                a.drawArrays(a.TRIANGLES, 0, this.vertex.length / 3);
                a.useProgram(h.program);
                a.bindFramebuffer(a.FRAMEBUFFER, b);
                a.clearColor(0, 0, 0, 0);
                a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                a.activeTexture(a.TEXTURE1);
                a.bindTexture(a.TEXTURE_2D, c);
                a.uniform1i(h.uniforms.originalTexture, 1);
                a.activeTexture(a.TEXTURE0);
                a.bindTexture(a.TEXTURE_2D, p.texture);
                a.uniform1i(h.uniforms.bloomTexture, 0);
                a.drawArrays(a.TRIANGLES, 0, this.vertex.length / 3);
                a.bindBuffer(a.ARRAY_BUFFER, null);
                a.useProgram(null)
            }
        }]);
        return a
    } (Effect),
    ji = function(c) {
        function a(b) {
            I(this, a);
            return Q(this, (a.__proto__ || N(a)).call(this, b))
        }
        R(a, c);
        M(a, [{
            key: "getProgram",
            value: function(b) {
                this.programBright || (this.programBright = new Program(b, {
                    vertexShader: "attribute vec3 aPos;attribute vec2 aTextureCoord;varying vec2 vTextureCoord;void main(){vTextureCoord=aTextureCoord;gl_Position=vec4(aPos,1.0);}",
                    fragmentShader: "precision mediump float;uniform sampler2D uSampler;uniform float threshold;varying vec2 vTextureCoord;void main(){vec4 color=texture2D(uSampler,vTextureCoord);vec4 lightColor=max(vec4(0.0),(color-threshold));gl_FragColor=lightColor;}"
                }));
                this.programBloom || (this.programBloom = new Program(b, {
                    vertexShader: "attribute vec3 aPos;attribute vec2 aTextureCoord;varying vec2 vTextureCoord;void main(){vTextureCoord=aTextureCoord;gl_Position=vec4(aPos,1.0);}",
                    fragmentShader: "precision mediump float;uniform sampler2D uSampler;uniform bool isVertical;uniform vec2 canvasSize;uniform float blurSize;uniform float devicePixelRatio;varying vec2 vTextureCoord;void main(){float weight[10];weight[0]=0.2270270270;weight[1]=0.1945945946;weight[2]=0.1216216216;weight[3]=0.1135135135;weight[4]=0.0972972973;weight[5]=0.0608108108;weight[6]=0.0540540541;weight[7]=0.0270270270;weight[8]=0.0162162162;weight[9]=0.0081081081;vec2 offset=vec2(blurSize/canvasSize.x,blurSize/canvasSize.y)*devicePixelRatio;vec4 result=texture2D(uSampler,vTextureCoord)*weight[0];if(isVertical){for(int i=1;i<10;++i){result+=texture2D(uSampler,vTextureCoord+vec2(0.0,offset.y*float(i)))*weight[i];result+=texture2D(uSampler,vTextureCoord-vec2(0.0,offset.y*float(i)))*weight[i];}}else{for(int i=1;i<10;++i){result+=texture2D(uSampler,vTextureCoord+vec2(offset.x*float(i),0.0))*weight[i];result+=texture2D(uSampler,vTextureCoord-vec2(offset.x*float(i),0.0))*weight[i];}}gl_FragColor=result;}"
                }));
                this.programResult || (this.programResult = new Program(b, {
                    vertexShader: "attribute vec3 aPos;attribute vec2 aTextureCoord;varying vec2 vTextureCoord;void main(){vTextureCoord=aTextureCoord;gl_Position=vec4(aPos,1.0);}",
                    fragmentShader: "precision mediump float;uniform sampler2D originalTexture;uniform sampler2D bloomTexture;uniform float toneScale;varying vec2 vTextureCoord;void main(){vec4 color=texture2D(originalTexture,vTextureCoord)*toneScale;vec4 bloomColor=texture2D(bloomTexture,vTextureCoord);color+=bloomColor;gl_FragColor=color;}"
                }));
                return {
                    programBright: this.programBright,
                    programBloom: this.programBloom,
                    programResult: this.programResult
                }
            }
        },
        {
            key: "onResize",
            value: function(b) {
                this.collectBrightBuffer = new FrameBufferObject(b);
                this.bloomBuffer = new FrameBufferObject(b)
            }
        },
        {
            key: "getExtraFbo",
            value: function(b) {
                this.collectBrightBuffer || (this.collectBrightBuffer = new FrameBufferObject(b));
                this.bloomBuffer || (this.bloomBuffer = new FrameBufferObject(b));
                return {
                    collectBrightBuffer: this.collectBrightBuffer.framebuffer,
                    bloomBuffer: this.bloomBuffer.framebuffer
                }
            }
        },
        {
            key: "render",
            value: function(b) {
                var a = b.gl,
                c = b.texture;
                b = b.fbo;
                var g = this.getOptions(),
                h = "clarity" in g ? g.clarity: 1;
                h = Math.max(0, h);
                h = Math.min(1, h);
                a.clearColor(0, 0, 0, 0);
                a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                var k = this.getProgram(a),
                l = k.programBright,
                m = k.programBloom;
                k = k.programResult;
                var p = this.getExtraFbo(a),
                n = p.collectBrightBuffer;
                p = p.bloomBuffer;
                var r = a.createBuffer();
                a.bindBuffer(a.ARRAY_BUFFER, r);
                a.bufferData(a.ARRAY_BUFFER, new Float32Array(this.vertex), a.STATIC_DRAW);
                a.enableVertexAttribArray(l.attributes.aPos);
                a.vertexAttribPointer(l.attributes.aPos, 3, a.FLOAT, false, 0, 0);
                a.enableVertexAttribArray(m.attributes.aPos);
                a.vertexAttribPointer(m.attributes.aPos, 3, a.FLOAT, false, 0, 0);
                a.enableVertexAttribArray(k.attributes.aPos);
                a.vertexAttribPointer(k.attributes.aPos, 3, a.FLOAT, false, 0, 0);
                r = a.createBuffer();
                a.bindBuffer(a.ARRAY_BUFFER, r);
                a.bufferData(a.ARRAY_BUFFER, new Float32Array(this.sampleCoord), a.STATIC_DRAW);
                a.enableVertexAttribArray(l.attributes.aTextureCoord);
                a.vertexAttribPointer(l.attributes.aTextureCoord, 2, a.FLOAT, false, 0, 0);
                a.enableVertexAttribArray(m.attributes.aTextureCoord);
                a.vertexAttribPointer(m.attributes.aTextureCoord, 2, a.FLOAT, false, 0, 0);
                a.enableVertexAttribArray(k.attributes.aTextureCoord);
                a.vertexAttribPointer(k.attributes.aTextureCoord, 2, a.FLOAT, false, 0, 0);
                a.useProgram(l.program);
                a.bindFramebuffer(a.FRAMEBUFFER, n);
                a.clearColor(0, 0, 0, 0);
                a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                a.activeTexture(a.TEXTURE1);
                a.bindTexture(a.TEXTURE_2D, c);
                a.uniform1i(l.uniforms.uSampler, 1);
                a.uniform1f(l.uniforms.threshold, g.threshold || 0);
                a.drawArrays(a.TRIANGLES, 0, this.vertex.length / 3);
                a.useProgram(m.program);
                a.bindFramebuffer(a.FRAMEBUFFER, p);
                a.clearColor(0, 0, 0, 0);
                a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                a.activeTexture(a.TEXTURE1);
                a.bindTexture(a.TEXTURE_2D, n.texture);
                a.uniform1i(m.uniforms.uSampler, 1);
                a.uniform1i(m.uniforms.isVertical, true);
                a.uniform1f(m.uniforms.blurSize, g.blurSize || 2);
                a.uniform1f(m.uniforms.devicePixelRatio, window.devicePixelRatio);
                a.uniform2fv(m.uniforms.canvasSize, [a.canvas.width, a.canvas.height]);
                a.drawArrays(a.TRIANGLES, 0, this.vertex.length / 3);
                a.useProgram(m.program);
                a.bindFramebuffer(a.FRAMEBUFFER, n);
                a.clearColor(0, 0, 0, 0);
                a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                a.activeTexture(a.TEXTURE1);
                a.bindTexture(a.TEXTURE_2D, p.texture);
                a.uniform1i(m.uniforms.uSampler, 1);
                a.uniform1i(m.uniforms.isVertical, false);
                a.uniform1f(m.uniforms.blurSize, g.blurSize || 2);
                a.uniform1f(m.uniforms.devicePixelRatio, window.devicePixelRatio);
                a.uniform2fv(m.uniforms.canvasSize, [a.canvas.width, a.canvas.height]);
                a.drawArrays(a.TRIANGLES, 0, this.vertex.length / 3);
                a.useProgram(k.program);
                a.bindFramebuffer(a.FRAMEBUFFER, b);
                a.clearColor(0, 0, 0, 0);
                a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                a.activeTexture(a.TEXTURE1);
                a.bindTexture(a.TEXTURE_2D, c);
                a.uniform1i(k.uniforms.originalTexture, 1);
                a.uniform1f(k.uniforms.toneScale, h);
                a.activeTexture(a.TEXTURE0);
                a.bindTexture(a.TEXTURE_2D, n.texture);
                a.uniform1i(k.uniforms.bloomTexture, 0);
                a.drawArrays(a.TRIANGLES, 0, this.vertex.length / 3);
                a.bindBuffer(a.ARRAY_BUFFER, null);
                a.useProgram(null)
            }
        }]);
        return a
    } (Effect),
    ki = function(c) {
        function a(b) {
            I(this, a);
            return Q(this, (a.__proto__ || N(a)).call(this, b))
        }
        R(a, c);
        M(a, [{
            key: "getProgram",
            value: function(a) {
                this.programSample || (this.programSample = new Program(a, {
                    vertexShader: "attribute vec3 aPos;attribute vec2 aTextureCoord;varying vec2 vTextureCoord;void main(){vTextureCoord=aTextureCoord;gl_Position=vec4(aPos,1.0);}",
                    fragmentShader: "precision mediump float;uniform sampler2D uSampler;uniform vec2 canvasSize;varying vec2 vTextureCoord;void main(){float fStep=1.0/312.0;vec4 sample11=texture2D(uSampler,vec2(vTextureCoord.s-1.0*fStep,vTextureCoord.t+1.0*fStep));vec4 sample12=texture2D(uSampler,vec2(vTextureCoord.s,vTextureCoord.t+1.0*fStep));vec4 sample13=texture2D(uSampler,vec2(vTextureCoord.s+1.0*fStep,vTextureCoord.t+1.0*fStep));vec4 sample21=texture2D(uSampler,vec2(vTextureCoord.s-1.0*fStep,vTextureCoord.t));vec4 sample22=texture2D(uSampler,vec2(vTextureCoord.s,vTextureCoord.t));vec4 sample23=texture2D(uSampler,vec2(vTextureCoord.s+1.0*fStep,vTextureCoord.t));vec4 sample31=texture2D(uSampler,vec2(vTextureCoord.s-1.0*fStep,vTextureCoord.t-1.0*fStep));vec4 sample32=texture2D(uSampler,vec2(vTextureCoord.s,vTextureCoord.t-1.0*fStep));vec4 sample33=texture2D(uSampler,vec2(vTextureCoord.s+1.0*fStep,vTextureCoord.t-1.0*fStep));vec4 blurSample=(sample11+sample12+sample13+sample21+2.0*sample22+sample23+sample31+sample32+sample33)/10.0;float desX=abs((gl_FragCoord.x-canvasSize.x/2.0)/(canvasSize.x/2.0));float desY=abs((gl_FragCoord.y-canvasSize.y/2.0)/(canvasSize.y/2.0));float factor=max(desX,desY);gl_FragColor=(sample22*(1.0-factor)+blurSample*factor);}"
                }));
                return this.programSample
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl;
                a = a.texture;
                var c = this.getProgram(b);
                b.useProgram(c.program);
                var g = b.createBuffer();
                b.bindBuffer(b.ARRAY_BUFFER, g);
                b.bufferData(b.ARRAY_BUFFER, new Float32Array(this.vertex), b.STATIC_DRAW);
                b.enableVertexAttribArray(c.attributes.aPos);
                b.vertexAttribPointer(c.attributes.aPos, 3, b.FLOAT, false, 0, 0);
                g = b.createBuffer();
                b.bindBuffer(b.ARRAY_BUFFER, g);
                b.bufferData(b.ARRAY_BUFFER, new Float32Array(this.sampleCoord), b.STATIC_DRAW);
                b.enableVertexAttribArray(c.attributes.aTextureCoord);
                b.vertexAttribPointer(c.attributes.aTextureCoord, 2, b.FLOAT, false, 0, 0);
                b.activeTexture(b.TEXTURE1);
                b.bindTexture(b.TEXTURE_2D, a);
                b.uniform1i(c.uniforms.uSampler, 1);
                b.uniform2fv(c.uniforms.canvasSize, [b.canvas.width, b.canvas.height]);
                b.drawArrays(b.TRIANGLES, 0, this.vertex.length / 3)
            }
        }]);
        return a
    } (Effect),
    EffectManager = function() {
        function c(a) {
            I(this, c);
            this.gl = a;
            this.effects = [];
            this.initFbo()
        }
        M(c, [{
            key: "addEffect",
            value: function(a) {
                this.effects.push(a)
            }
        },
        {
            key: "removeEffect",
            value: function(a) {}
        },
        {
            key: "setEffects",
            value: function(a) {
                this.effects = a
            }
        },
        {
            key: "onResize",
            value: function() {
                this.initFbo();
                var a = this.gl,
                b = this.effects;
                if (b && 1 < b.length) for (var c = 1; c < b.length; c++) {
                    var e = b[c];
                    e.onResize && e.onResize(a)
                }
            }
        },
        {
            key: "initFbo",
            value: function() {
                var a = this.gl;
                this.fbo = [new FrameBufferObject(a), new FrameBufferObject(a)]
            }
        },
        {
            key: "render",
            value: function() {
                var a = this.gl,
                b = this.effects;
                if (b && 0 < b.length) for (var c = {},
                e = 0; e < b.length; e++) {
                    var g = this.fbo[e % 2].framebuffer;
                    e === b.length - 1 && (g = null);
                    a.bindFramebuffer(a.FRAMEBUFFER, g);
                    var h = [0, 0, 0, 0];
                    a.clearColor(h[0], h[1], h[2], h[3]);
                    a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                    b[e].render({
                        isPickRender: false,
                        gl: a,
                        texture: c.texture,
                        fbo: g
                    });
                    c = g
                }
            }
        }]);
        return c
    } (),
    Layer = function(c) {
        function a(b) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b));
            b.pickedColor = [ - 1, -1, -1];
            return b
        }
        R(a, c);
        M(a, [{
            key: "getCommonDefaultOptions",
            value: function() {
                return {
                    repeat: false,
                    enablePicked: false,
                    autoSelect: false,
                    selectedIndex: -1,
                    selectedColor: "rgba(20, 20, 200, 1.0)"
                }
            }
        },
        {
            key: "commonInitialize",
            value: function(b) {
                var a = this.getOptions();
                this.gl = b;
                a.enablePicked && (this.pickBuffer = new Buffer({
                    gl: b,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                }))
            }
        },
        {
            key: "getCommonAttributes",
            value: function() {
                var b = [];
                this.getOptions().enablePicked && b.push({
                    name: "aPickColor",
                    buffer: this.pickBuffer,
                    size: 3,
                    type: "FLOAT",
                    stride: 12,
                    offset: 0
                });
                return b
            }
        },
        {
            key: "normizedColor",
            value: function(b) {
                var a = b;
                b instanceof Array || (a = ha(b).unitArray());
                undefined === a[3] && (a[3] = 1);
                return a
            }
        },
        {
            key: "normizedPoint",
            value: function(a) {
                if (!a || !a[0] || !a[1]) return [0, 0, 0];
                var b = this.getPointOffset(),
                c = Number(a[0]),
                g = Number(a[1]); - 180 <= c && 180 >= c && -90 <= g && 90 >= g && (g = this.webglLayer.map.lnglatToMercator(c, g), c = g[0], g = g[1]);
                var h = Number(a[2]) || 0;
                this.webglLayer && "cesium" === this.webglLayer.options.mapType && window.Cesium ? (c = this.convertLngLat([c, g]), h = window.Cesium.Cartesian3.fromDegrees(c[0], c[1], h), c = h.x, g = h.y, h = h.z) : this.webglLayer && "bmapgl" === this.webglLayer.options.mapType && "B_EARTH_MAP" === this.webglLayer.map.map.mapType && (c = this.convertLngLat([c, g]), h = this.webglLayer.map.map.getEarth().scene.fromLatLngToXYZ({
                    lng: c[0],
                    lat: c[1]
                }), c = h.x, g = h.y, h = h.z);
                return 3 < a.length ? [c - b[0], g - b[1], h].concat(Y(a.slice(3))) : [c - b[0], g - b[1], h]
            }
        },
        {
            key: "convertLngLat",
            value: function(a) {
                return [a[0] / 2.003750834E7 * 180, 180 / Math.PI * (2 * Math.atan(Math.exp(a[1] / 2.003750834E7 * 180 * Math.PI / 180)) - Math.PI / 2)]
            }
        },
        {
            key: "getPointOffset",
            value: function() {
                var a = [0, 0],
                c = this.getOptions();
                this.webglLayer && this.webglLayer.options.pointOffset ? a = this.webglLayer.options.pointOffset: c.pointOffset && (a = c.pointOffset);
                return a
            }
        },
        {
            key: "indexToRgb",
            value: function(a) {
                a++;
                var b = Math.floor(a / 65536);
                a -= 65536 * b;
                var c = Math.floor(a / 256);
                return [a - 256 * c, c, b]
            }
        },
        {
            key: "rgbToIndex",
            value: function(a) {
                return a[0] + 256 * a[1] + 65536 * a[2] - 1
            }
        },
        {
            key: "getCommonUniforms",
            value: function(a) {
                a = a.isPickRender;
                var b = this.getOptions(),
                c = {};
                if (b.enablePicked) {
                    var g = 0 <= b.selectedIndex ? b.selectedIndex: -1;
                    g = b.autoSelect ? this.pickedColor: this.indexToRgb(g);
                    c = Object.assign(c, {
                        uSelectedColor: this.normizedColor(b.selectedColor),
                        uEnablePicked: b.enablePicked,
                        uPickedColor: g.map(function(a) {
                            return a / 255
                        }),
                        uIsPickRender: !!a
                    })
                }
                return c
            }
        },
        {
            key: "pick",
            value: function(a, c) {
                var b = this.gl;
                this.webglLayer.saveFramebuffer();
                this.webglLayer.bindFramebuffer(this.webglLayer.pickFBO);
                this.webglLayer.clear();
                this.render({
                    gl: b,
                    isPickRender: true,
                    matrix: this.webglLayer.matrix,
                    projectionMatrix: this.webglLayer.projectionMatrix,
                    viewMatrix: this.webglLayer.viewMatrix,
                    orthoMatrix: this.webglLayer.orthoMatrix
                });
                var d = new Uint8Array(4);
                b.readPixels(a * window.devicePixelRatio, b.canvas.height - c * window.devicePixelRatio, 1, 1, b.RGBA, b.UNSIGNED_BYTE, d);
                a = this.rgbToIndex(d);
                this.pickedColor = [d[0], d[1], d[2]];
                this.webglLayer.restoreFramebuffer();
                return {
                    dataIndex: a,
                    dataItem: this.data[a]
                }
            }
        },
        {
            key: "setGLState",
            value: function(a) {
                this.webglLayer.stateManager.setState(a)
            }
        },
        {
            key: "addMultipleCoords",
            value: function(a, c, e) {
                if (!this.options.repeat || !this.webglLayer || "bmapgl" !== this.webglLayer.options.mapType || "B_EARTH_MAP" === this.webglLayer.map.map.mapType) return [a];
                var b = this.webglLayer.map.map;
                c = c || b.getZoom();
                var d = e ? b.worldSize(c) : 4.007545274461451E7;
                c = function(a) {
                    return [[a[0] - d, a[1], a[2] || 0], [a[0] + d, a[1], a[2] || 0]]
                };
                if (a instanceof Array && !(a[0] instanceof Array)) return c = c(a),
                c = Ia(c, 2),
                [a, c[0], c[1]];
                if (a instanceof Array && a[0] instanceof Array && !(a[0][0] instanceof Array)) {
                    e = [];
                    b = [];
                    for (var k = 0; k < a.length; k++) {
                        var l = c(a[k]);
                        l = Ia(l, 2);
                        var m = l[1];
                        e.push(l[0]);
                        b.push(m)
                    }
                    return [a, e, b]
                }
                e = [];
                b = [];
                for (k = 0; k < a.length; k++) {
                    l = [];
                    m = [];
                    for (var p = 0; p < a[k].length; p++) {
                        var n = c(a[k][p]);
                        n = Ia(n, 2);
                        var r = n[1];
                        l.push(n[0]);
                        m.push(r)
                    }
                    e.push(l);
                    b.push(m)
                }
                return [a, e, b]
            }
        }]);
        return a
    } (CommonLayer),
    li = function(c) {
        function a(b) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b));
            b.bufferData = [];
            b.initializeTime = new Date;
            return b
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    size: 10,
                    unit: "px",
                    color: "blue"
                }
            }
        },
        {
            key: "initialize",
            value: function(a) {
                this.gl = a;
                var b = this.getOptions();
                this.program = new Program(this.gl, {
                    vertexShader: "attribute vec3 aPos;attribute float aSize;attribute float aIndex;attribute vec4 aColor;varying vec4 vColor;varying vec4 vPosition;varying vec4 vFragPosition;varying float vSize;uniform mat4 uMatrix;uniform float uZoomUnits;uniform vec4 uSelectedColor;void main(){vColor=aColor;float x=aPos.x;float y=aPos.y;vSize=aSize*uZoomUnits;if(aIndex==1.0){x-=vSize;y+=vSize;}else if(aIndex==2.0){x+=vSize;y-=vSize;}else if(aIndex==3.0){x+=vSize;y+=vSize;}else{x-=vSize;y-=vSize;}vPosition=vec4(aPos.xyz,1.0);vFragPosition=vec4(x,y,aPos.z,1.0);gl_Position=uMatrix*vFragPosition;\n#if defined(PICK)\nif(mapvIsPicked()){vColor=uSelectedColor;}\n#endif\n}",
                    fragmentShader: "varying vec4 vPosition;varying float vSize;varying vec4 vFragPosition;varying vec4 vColor;uniform mat4 uMatrix;uniform float uTime;uniform float duration;uniform float trail;uniform float lineWidth;void main(){float d=distance(vFragPosition.xy,vPosition.xy);if(d>vSize){discard;}vec4 color=vColor;if(d>0.9*vSize&&d<=vSize){color.a=1.0-smoothstep(0.9*vSize,vSize,d);}gl_FragColor=color;}",
                    defines: b.enablePicked ? ["PICK"] : []
                },
                this);
                this.buffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.indexBuffer = new Buffer({
                    gl: a,
                    target: "ELEMENT_ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                b = [{
                    stride: 36,
                    name: "aPos",
                    buffer: this.buffer,
                    size: 3,
                    type: "FLOAT",
                    offset: 0
                },
                {
                    stride: 36,
                    name: "aSize",
                    buffer: this.buffer,
                    size: 1,
                    type: "FLOAT",
                    offset: 12
                },
                {
                    stride: 36,
                    name: "aIndex",
                    buffer: this.buffer,
                    size: 1,
                    type: "FLOAT",
                    offset: 16
                },
                {
                    stride: 36,
                    name: "aColor",
                    buffer: this.buffer,
                    size: 4,
                    type: "FLOAT",
                    offset: 20
                }];
                b = b.concat(this.getCommonAttributes());
                this.vertexArray = new VertexArray({
                    gl: a,
                    program: this.program,
                    attributes: b
                })
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                this.gl && c && (this.uniforms = {},
                this.data = c, this.processData(), a.enablePicked && this.parsePickData(c))
            }
        },
        {
            key: "processData",
            value: function() {
                var a = this,
                c = [],
                e = [];
                this.data.forEach(function(b, d) {
                    var k = b.color || a.options.color,
                    g = b.size || a.options.size;
                    k = a.normizedColor(k);
                    b = a.normizedPoint(b.geometry.coordinates);
                    for (var h = 0; 4 > h; h++) c.push(b[0], b[1], 0, g, h),
                    c.push(k[0], k[1], k[2], 1);
                    k = 4 * d;
                    0 < d && e.push(k - 1, k);
                    e.push(k, k + 1, k + 2, k + 3)
                });
                this.bufferData = c;
                this.indexData = e;
                this.buffer.updateData(new Float32Array(c));
                this.indexBuffer.updateData(new Uint32Array(e))
            }
        },
        {
            key: "parsePickData",
            value: function(a) {
                var b = [];
                if (this.getOptions().enablePicked) {
                    for (var c = 0; c < a.length; c++) {
                        var g = this.indexToRgb(c);
                        b.push(g[0] / 255, g[1] / 255, g[2] / 255);
                        b.push(g[0] / 255, g[1] / 255, g[2] / 255);
                        b.push(g[0] / 255, g[1] / 255, g[2] / 255);
                        b.push(g[0] / 255, g[1] / 255, g[2] / 255)
                    }
                    this.pickBuffer.updateData(new Float32Array(b))
                }
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = this.program,
                c = a.gl,
                g = a.matrix;
                b.use(c);
                this.vertexArray.bind();
                this.indexBuffer.bind();
                var h = this.map.getZoomUnits();
                Object.assign(this.uniforms, this.getCommonUniforms(a), {
                    uZoomUnits: "px" === this.options.unit ? h: 1,
                    uMatrix: g
                });
                b.setUniforms(this.uniforms);
                c.drawElements(c.TRIANGLE_STRIP, this.indexData.length, c.UNSIGNED_INT, 0)
            }
        }]);
        return a
    } (Layer),
    yf = {
        wave: "varying vec4 vPosition;varying float vSize;varying vec4 vFragPosition;varying vec4 vColor;varying float vStartTime;varying float vRadius;uniform mat4 uMatrix;uniform float uTime;uniform float duration;uniform float trail;varying float vWidth;void main(){float d=distance(vFragPosition.xy,vPosition.xy);if(d>=vRadius){discard;}vec4 color=vColor;float R=vRadius;float center=vSize;float time=vStartTime+uTime;float alpha=sin((R-d)/R*trail*2.0*3.14+time/duration);if(d<=center){if(d>0.9*center&&d<=center){if(alpha>=0.5){color.a=0.9;}else{color.a=1.0-smoothstep(0.9*center,center,d);}}}else{if(alpha>=0.5){color.a=0.9;if(alpha>=0.5&&alpha<=0.6){color.a=smoothstep(0.0,0.1,alpha-0.5);}if(d>=0.98*R&&d<=R){color.a*=1.0-smoothstep(0.98,1.0,d/R);}}else{color.a=0.0;}}gl_FragColor=color;}",
        bubble: "varying vec4 vPosition;varying float vSize;varying vec4 vFragPosition;varying vec4 vColor;varying float vStartTime;varying float vRadius;uniform mat4 uMatrix;uniform float uTime;uniform float duration;uniform float trail;varying float vWidth;void main(){float d=distance(vFragPosition.xy,vPosition.xy);if(d>=vRadius){discard;}float time=vStartTime+uTime;float range=mod(time,(duration+trail));float percent=0.0;if(range<=duration){percent=range/duration;}else{percent=1.0;}float center=vSize;float R=vRadius;float r=R*percent;vec4 color=vColor;if(d<=center){if(d>0.9*center&&d<=center){color.a=1.0-smoothstep(0.9*center,center,d);}}else{if(d<r){color.a=smoothstep(0.1,0.9,pow(d/r,2.0)*0.9);if(d>=0.9*r&&d<=r){color.a*=1.0-smoothstep(0.9,1.0,d/r);}if(range>duration){color.a*=1.0-(range-duration)/trail;}}else{color.a=0.0;}}gl_FragColor=color;}"
    },
    mi = function(c) {
        function a(b) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b));
            b.autoUpdate = true;
            b.bufferData = [];
            b.initializeTime = new Date;
            return b
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    type: "bubble",
                    size: 10,
                    duration: 1,
                    trail: 1,
                    unit: "px",
                    random: true,
                    color: "blue",
                    radius: function(a) {
                        return 2 * a
                    }
                }
            }
        },
        {
            key: "initialize",
            value: function(a) {
                this.gl = a;
                this.program = new Program(this.gl, {
                    vertexShader: "attribute vec3 aPos;attribute float aSize;attribute float aIndex;attribute vec4 aColor;attribute float aStartTime;attribute float aRadius;varying vec4 vColor;varying vec4 vPosition;varying vec4 vFragPosition;varying float vSize;varying float vWidth;varying float vStartTime;varying float vRadius;uniform mat4 uMatrix;uniform float uZoomUnits;uniform float lineWidth;uniform vec4 uSelectedColor;void main(){vColor=aColor;vWidth=lineWidth;vStartTime=aStartTime;vSize=aSize*uZoomUnits;vRadius=aRadius*uZoomUnits;float x=aPos.x;float y=aPos.y;float R=vRadius;if(aIndex==1.0){x-=R;y+=R;}else if(aIndex==2.0){x+=R;y-=R;}else if(aIndex==3.0){x+=R;y+=R;}else{x-=R;y-=R;}vPosition=vec4(aPos.xyz,1.0);vFragPosition=vec4(x,y,aPos.z,1.0);gl_Position=uMatrix*vFragPosition;\n#if defined(PICK)\nif(mapvIsPicked()){vColor=uSelectedColor;}\n#endif\n}",
                    fragmentShader: yf[this.options.type] || "bubble",
                    defines: this.options.enablePicked ? ["PICK"] : []
                },
                this);
                this.buffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.indexBuffer = new Buffer({
                    gl: a,
                    target: "ELEMENT_ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                var b = [{
                    stride: 44,
                    name: "aPos",
                    buffer: this.buffer,
                    size: 3,
                    type: "FLOAT",
                    offset: 0
                },
                {
                    stride: 44,
                    name: "aSize",
                    buffer: this.buffer,
                    size: 1,
                    type: "FLOAT",
                    offset: 12
                },
                {
                    stride: 44,
                    name: "aIndex",
                    buffer: this.buffer,
                    size: 1,
                    type: "FLOAT",
                    offset: 16
                },
                {
                    stride: 44,
                    name: "aColor",
                    buffer: this.buffer,
                    size: 4,
                    type: "FLOAT",
                    offset: 20
                },
                {
                    stride: 44,
                    name: "aRadius",
                    buffer: this.buffer,
                    size: 1,
                    type: "FLOAT",
                    offset: 36
                },
                {
                    stride: 44,
                    name: "aStartTime",
                    buffer: this.buffer,
                    size: 1,
                    type: "FLOAT",
                    offset: 40
                }];
                b = b.concat(this.getCommonAttributes());
                this.vertexArray = new VertexArray({
                    gl: a,
                    program: this.program,
                    attributes: b
                })
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                this.gl && c && (this.uniforms = {
                    duration: a.duration,
                    trail: a.trail
                },
                this.data = c, this.processData(), a.enablePicked && this.parsePickData(c))
            }
        },
        {
            key: "processData",
            value: function() {
                var a = this,
                c = [],
                e = [],
                g = (this.options.duration + this.options.trail) / this.data.length;
                this.data.forEach(function(b, d) {
                    var k = b.size || a.options.size,
                    h = b.radius || a.options.radius || 1.618 * k;
                    "function" === typeof h && (h = h(k));
                    var p = b.color || a.options.color;
                    p = a.normizedColor(p);
                    b = a.normizedPoint(b.geometry.coordinates);
                    g = a.options.random ? g + g * Math.random() : 0;
                    for (var n = 0; 4 > n; n++) c.push(b[0], b[1], 0, k, n),
                    c.push(p[0], p[1], p[2], 1),
                    c.push(h),
                    c.push(d * g);
                    k = 4 * d;
                    0 < d && e.push(k - 1, k);
                    e.push(k, k + 1, k + 2, k + 3)
                });
                this.bufferData = c;
                this.indexData = e;
                this.buffer.updateData(new Float32Array(c));
                this.indexBuffer.updateData(new Uint32Array(e))
            }
        },
        {
            key: "parsePickData",
            value: function(a) {
                var b = [];
                if (this.getOptions().enablePicked) {
                    for (var c = 0; c < a.length; c++) {
                        var g = this.indexToRgb(c);
                        b.push(g[0] / 255, g[1] / 255, g[2] / 255);
                        b.push(g[0] / 255, g[1] / 255, g[2] / 255);
                        b.push(g[0] / 255, g[1] / 255, g[2] / 255);
                        b.push(g[0] / 255, g[1] / 255, g[2] / 255)
                    }
                    this.pickBuffer.updateData(new Float32Array(b))
                }
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = this.program,
                c = a.gl;
                a = a.matrix;
                b.use(c);
                this.vertexArray.bind();
                this.indexBuffer.bind();
                var g = this.map.getZoomUnits();
                Object.assign(this.uniforms, {
                    uTime: (new Date - this.initializeTime) / 1E3,
                    uZoomUnits: "m" === this.options.unit ? 1 : g,
                    lineWidth: this.options.lineWidth * g,
                    uMatrix: a
                });
                b.setUniforms(this.uniforms);
                c.enable(c.BLEND);
                c.blendEquation(c.FUNC_ADD);
                c.blendFunc(c.SRC_ALPHA, c.ONE_MINUS_SRC_ALPHA);
                c.drawElements(c.TRIANGLE_STRIP, this.indexData.length, c.UNSIGNED_INT, 0)
            }
        }]);
        return a
    } (Layer),
    ni = Ba(yf),
    oi = O(function(c, a) {
        a.__esModule = true;
        var b = Tb && Tb.__esModule ? Tb: {
        default:
            Tb
        },
        d = ac && ac.__esModule ? ac: {
        default:
            ac
        };
        a.
    default = function l(a, c, k) {
            null === a && (a = Function.prototype);
            var g = (0, d.
        default)(a, c);
            if (undefined === g) {
                if (a = (0, b.
            default)(a), null !== a) return l(a, c, k)
            } else {
                if ("value" in g) return g.value;
                c = g.get;
                return undefined === c ? undefined : c.call(k)
            }
        }
    }),
    Ya = T(oi),
    Ka = O(function(c, a) {
        Object.defineProperty(a, "__esModule", {
            value: true
        });
        a.setMatrixArrayType = function(b) {
            a.ARRAY_TYPE = d = b
        };
        a.toRadian = function(a) {
            return a * e
        };
        a.equals = function(a, c) {
            return Math.abs(a - c) <= b * Math.max(1, Math.abs(a), Math.abs(c))
        };
        a.RANDOM = a.ARRAY_TYPE = a.EPSILON = undefined;
        var b = 1E-6;
        a.EPSILON = b;
        var d = "undefined" !== typeof Float32Array ? Float32Array: Array;
        a.ARRAY_TYPE = d;
        a.RANDOM = Math.random;
        var e = Math.PI / 180
    });
    T(Ka);
    var zf = O(function(c, a) {
        function b(a, b, c) {
            var d = b[0],
            k = b[1],
            g = b[2];
            b = b[3];
            var h = c[0],
            e = c[1],
            q = c[2];
            c = c[3];
            a[0] = d * h + g * e;
            a[1] = k * h + b * e;
            a[2] = d * q + g * c;
            a[3] = k * q + b * c;
            return a
        }
        function d(a, b, c) {
            a[0] = b[0] - c[0];
            a[1] = b[1] - c[1];
            a[2] = b[2] - c[2];
            a[3] = b[3] - c[3];
            return a
        }
        Object.defineProperty(a, "__esModule", {
            value: true
        });
        a.create = function() {
            var a = new e.ARRAY_TYPE(4);
            e.ARRAY_TYPE != Float32Array && (a[1] = 0, a[2] = 0);
            a[0] = 1;
            a[3] = 1;
            return a
        };
        a.clone = function(a) {
            var b = new e.ARRAY_TYPE(4);
            b[0] = a[0];
            b[1] = a[1];
            b[2] = a[2];
            b[3] = a[3];
            return b
        };
        a.copy = function(a, b) {
            a[0] = b[0];
            a[1] = b[1];
            a[2] = b[2];
            a[3] = b[3];
            return a
        };
        a.identity = function(a) {
            a[0] = 1;
            a[1] = 0;
            a[2] = 0;
            a[3] = 1;
            return a
        };
        a.fromValues = function(a, b, c, d) {
            var k = new e.ARRAY_TYPE(4);
            k[0] = a;
            k[1] = b;
            k[2] = c;
            k[3] = d;
            return k
        };
        a.set = function(a, b, c, d, e) {
            a[0] = b;
            a[1] = c;
            a[2] = d;
            a[3] = e;
            return a
        };
        a.transpose = function(a, b) {
            if (a === b) {
                var c = b[1];
                a[1] = b[2];
                a[2] = c
            } else a[0] = b[0],
            a[1] = b[2],
            a[2] = b[1],
            a[3] = b[3];
            return a
        };
        a.invert = function(a, b) {
            var c = b[0],
            d = b[1],
            g = b[2];
            b = b[3];
            var h = c * b - g * d;
            if (!h) return null;
            h = 1 / h;
            a[0] = b * h;
            a[1] = -d * h;
            a[2] = -g * h;
            a[3] = c * h;
            return a
        };
        a.adjoint = function(a, b) {
            var c = b[0];
            a[0] = b[3];
            a[1] = -b[1];
            a[2] = -b[2];
            a[3] = c;
            return a
        };
        a.determinant = function(a) {
            return a[0] * a[3] - a[2] * a[1]
        };
        a.multiply = b;
        a.rotate = function(a, b, c) {
            var d = b[0],
            k = b[1],
            g = b[2];
            b = b[3];
            var h = Math.sin(c);
            c = Math.cos(c);
            a[0] = d * c + g * h;
            a[1] = k * c + b * h;
            a[2] = d * -h + g * c;
            a[3] = k * -h + b * c;
            return a
        };
        a.scale = function(a, b, c) {
            var d = b[1],
            k = b[2],
            g = b[3],
            h = c[0];
            c = c[1];
            a[0] = b[0] * h;
            a[1] = d * h;
            a[2] = k * c;
            a[3] = g * c;
            return a
        };
        a.fromRotation = function(a, b) {
            var c = Math.sin(b);
            b = Math.cos(b);
            a[0] = b;
            a[1] = c;
            a[2] = -c;
            a[3] = b;
            return a
        };
        a.fromScaling = function(a, b) {
            a[0] = b[0];
            a[1] = 0;
            a[2] = 0;
            a[3] = b[1];
            return a
        };
        a.str = function(a) {
            return "mat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")"
        };
        a.frob = function(a) {
            return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2))
        };
        a.LDU = function(a, b, c, d) {
            a[2] = d[2] / d[0];
            c[0] = d[0];
            c[1] = d[1];
            c[3] = d[3] - a[2] * c[1];
            return [a, b, c]
        };
        a.add = function(a, b, c) {
            a[0] = b[0] + c[0];
            a[1] = b[1] + c[1];
            a[2] = b[2] + c[2];
            a[3] = b[3] + c[3];
            return a
        };
        a.subtract = d;
        a.exactEquals = function(a, b) {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3]
        };
        a.equals = function(a, b) {
            var c = a[0],
            d = a[1],
            g = a[2];
            a = a[3];
            var h = b[0],
            n = b[1],
            r = b[2];
            b = b[3];
            return Math.abs(c - h) <= e.EPSILON * Math.max(1, Math.abs(c), Math.abs(h)) && Math.abs(d - n) <= e.EPSILON * Math.max(1, Math.abs(d), Math.abs(n)) && Math.abs(g - r) <= e.EPSILON * Math.max(1, Math.abs(g), Math.abs(r)) && Math.abs(a - b) <= e.EPSILON * Math.max(1, Math.abs(a), Math.abs(b))
        };
        a.multiplyScalar = function(a, b, c) {
            a[0] = b[0] * c;
            a[1] = b[1] * c;
            a[2] = b[2] * c;
            a[3] = b[3] * c;
            return a
        };
        a.multiplyScalarAndAdd = function(a, b, c, d) {
            a[0] = b[0] + c[0] * d;
            a[1] = b[1] + c[1] * d;
            a[2] = b[2] + c[2] * d;
            a[3] = b[3] + c[3] * d;
            return a
        };
        a.sub = a.mul = undefined;
        var e = function(a) {
            if (a && a.__esModule) return a;
            var b = {};
            if (null != a) for (var c in a) if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = fa && ea ? ea(a, c) : {};
                d.get || d.set ? fa(b, c, d) : b[c] = a[c]
            }
            b.
        default = a;
            return b
        } (Ka);
        a.mul = b;
        a.sub = d
    });
    T(zf);
    var Af = O(function(c, a) {
        function b(a, b, c) {
            var d = b[0],
            k = b[1],
            g = b[2],
            e = b[3],
            h = b[4];
            b = b[5];
            var q = c[0],
            t = c[1],
            y = c[2],
            v = c[3],
            x = c[4];
            c = c[5];
            a[0] = d * q + g * t;
            a[1] = k * q + e * t;
            a[2] = d * y + g * v;
            a[3] = k * y + e * v;
            a[4] = d * x + g * c + h;
            a[5] = k * x + e * c + b;
            return a
        }
        function d(a, b, c) {
            a[0] = b[0] - c[0];
            a[1] = b[1] - c[1];
            a[2] = b[2] - c[2];
            a[3] = b[3] - c[3];
            a[4] = b[4] - c[4];
            a[5] = b[5] - c[5];
            return a
        }
        Object.defineProperty(a, "__esModule", {
            value: true
        });
        a.create = function() {
            var a = new e.ARRAY_TYPE(6);
            e.ARRAY_TYPE != Float32Array && (a[1] = 0, a[2] = 0, a[4] = 0, a[5] = 0);
            a[0] = 1;
            a[3] = 1;
            return a
        };
        a.clone = function(a) {
            var b = new e.ARRAY_TYPE(6);
            b[0] = a[0];
            b[1] = a[1];
            b[2] = a[2];
            b[3] = a[3];
            b[4] = a[4];
            b[5] = a[5];
            return b
        };
        a.copy = function(a, b) {
            a[0] = b[0];
            a[1] = b[1];
            a[2] = b[2];
            a[3] = b[3];
            a[4] = b[4];
            a[5] = b[5];
            return a
        };
        a.identity = function(a) {
            a[0] = 1;
            a[1] = 0;
            a[2] = 0;
            a[3] = 1;
            a[4] = 0;
            a[5] = 0;
            return a
        };
        a.fromValues = function(a, b, c, d, m, p) {
            var k = new e.ARRAY_TYPE(6);
            k[0] = a;
            k[1] = b;
            k[2] = c;
            k[3] = d;
            k[4] = m;
            k[5] = p;
            return k
        };
        a.set = function(a, b, c, d, e, p, n) {
            a[0] = b;
            a[1] = c;
            a[2] = d;
            a[3] = e;
            a[4] = p;
            a[5] = n;
            return a
        };
        a.invert = function(a, b) {
            var c = b[0],
            d = b[1],
            g = b[2],
            e = b[3],
            n = b[4];
            b = b[5];
            var h = c * e - d * g;
            if (!h) return null;
            h = 1 / h;
            a[0] = e * h;
            a[1] = -d * h;
            a[2] = -g * h;
            a[3] = c * h;
            a[4] = (g * b - e * n) * h;
            a[5] = (d * n - c * b) * h;
            return a
        };
        a.determinant = function(a) {
            return a[0] * a[3] - a[1] * a[2]
        };
        a.multiply = b;
        a.rotate = function(a, b, c) {
            var d = b[0],
            k = b[1],
            g = b[2],
            e = b[3],
            h = b[4];
            b = b[5];
            var q = Math.sin(c);
            c = Math.cos(c);
            a[0] = d * c + g * q;
            a[1] = k * c + e * q;
            a[2] = d * -q + g * c;
            a[3] = k * -q + e * c;
            a[4] = h;
            a[5] = b;
            return a
        };
        a.scale = function(a, b, c) {
            var d = b[1],
            k = b[2],
            g = b[3],
            e = b[4],
            h = b[5],
            q = c[0];
            c = c[1];
            a[0] = b[0] * q;
            a[1] = d * q;
            a[2] = k * c;
            a[3] = g * c;
            a[4] = e;
            a[5] = h;
            return a
        };
        a.translate = function(a, b, c) {
            var d = b[0],
            k = b[1],
            g = b[2],
            e = b[3],
            h = b[4];
            b = b[5];
            var q = c[0];
            c = c[1];
            a[0] = d;
            a[1] = k;
            a[2] = g;
            a[3] = e;
            a[4] = d * q + g * c + h;
            a[5] = k * q + e * c + b;
            return a
        };
        a.fromRotation = function(a, b) {
            var c = Math.sin(b);
            b = Math.cos(b);
            a[0] = b;
            a[1] = c;
            a[2] = -c;
            a[3] = b;
            a[4] = 0;
            a[5] = 0;
            return a
        };
        a.fromScaling = function(a, b) {
            a[0] = b[0];
            a[1] = 0;
            a[2] = 0;
            a[3] = b[1];
            a[4] = 0;
            a[5] = 0;
            return a
        };
        a.fromTranslation = function(a, b) {
            a[0] = 1;
            a[1] = 0;
            a[2] = 0;
            a[3] = 1;
            a[4] = b[0];
            a[5] = b[1];
            return a
        };
        a.str = function(a) {
            return "mat2d(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ")"
        };
        a.frob = function(a) {
            return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1)
        };
        a.add = function(a, b, c) {
            a[0] = b[0] + c[0];
            a[1] = b[1] + c[1];
            a[2] = b[2] + c[2];
            a[3] = b[3] + c[3];
            a[4] = b[4] + c[4];
            a[5] = b[5] + c[5];
            return a
        };
        a.subtract = d;
        a.multiplyScalar = function(a, b, c) {
            a[0] = b[0] * c;
            a[1] = b[1] * c;
            a[2] = b[2] * c;
            a[3] = b[3] * c;
            a[4] = b[4] * c;
            a[5] = b[5] * c;
            return a
        };
        a.multiplyScalarAndAdd = function(a, b, c, d) {
            a[0] = b[0] + c[0] * d;
            a[1] = b[1] + c[1] * d;
            a[2] = b[2] + c[2] * d;
            a[3] = b[3] + c[3] * d;
            a[4] = b[4] + c[4] * d;
            a[5] = b[5] + c[5] * d;
            return a
        };
        a.exactEquals = function(a, b) {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5]
        };
        a.equals = function(a, b) {
            var c = a[0],
            d = a[1],
            g = a[2],
            h = a[3],
            n = a[4];
            a = a[5];
            var r = b[0],
            q = b[1],
            t = b[2],
            y = b[3],
            v = b[4];
            b = b[5];
            return Math.abs(c - r) <= e.EPSILON * Math.max(1, Math.abs(c), Math.abs(r)) && Math.abs(d - q) <= e.EPSILON * Math.max(1, Math.abs(d), Math.abs(q)) && Math.abs(g - t) <= e.EPSILON * Math.max(1, Math.abs(g), Math.abs(t)) && Math.abs(h - y) <= e.EPSILON * Math.max(1, Math.abs(h), Math.abs(y)) && Math.abs(n - v) <= e.EPSILON * Math.max(1, Math.abs(n), Math.abs(v)) && Math.abs(a - b) <= e.EPSILON * Math.max(1, Math.abs(a), Math.abs(b))
        };
        a.sub = a.mul = undefined;
        var e = function(a) {
            if (a && a.__esModule) return a;
            var b = {};
            if (null != a) for (var c in a) if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = fa && ea ? ea(a, c) : {};
                d.get || d.set ? fa(b, c, d) : b[c] = a[c]
            }
            b.
        default = a;
            return b
        } (Ka);
        a.mul = b;
        a.sub = d
    });
    T(Af);
    var Hd = O(function(c, a) {
        function b(a, b, c) {
            var d = b[0],
            k = b[1],
            e = b[2],
            g = b[3],
            h = b[4],
            q = b[5],
            t = b[6],
            y = b[7];
            b = b[8];
            var v = c[0],
            x = c[1],
            u = c[2],
            B = c[3],
            A = c[4],
            D = c[5],
            C = c[6],
            G = c[7];
            c = c[8];
            a[0] = v * d + x * g + u * t;
            a[1] = v * k + x * h + u * y;
            a[2] = v * e + x * q + u * b;
            a[3] = B * d + A * g + D * t;
            a[4] = B * k + A * h + D * y;
            a[5] = B * e + A * q + D * b;
            a[6] = C * d + G * g + c * t;
            a[7] = C * k + G * h + c * y;
            a[8] = C * e + G * q + c * b;
            return a
        }
        function d(a, b, c) {
            a[0] = b[0] - c[0];
            a[1] = b[1] - c[1];
            a[2] = b[2] - c[2];
            a[3] = b[3] - c[3];
            a[4] = b[4] - c[4];
            a[5] = b[5] - c[5];
            a[6] = b[6] - c[6];
            a[7] = b[7] - c[7];
            a[8] = b[8] - c[8];
            return a
        }
        Object.defineProperty(a, "__esModule", {
            value: true
        });
        a.create = function() {
            var a = new e.ARRAY_TYPE(9);
            e.ARRAY_TYPE != Float32Array && (a[1] = 0, a[2] = 0, a[3] = 0, a[5] = 0, a[6] = 0, a[7] = 0);
            a[0] = 1;
            a[4] = 1;
            a[8] = 1;
            return a
        };
        a.fromMat4 = function(a, b) {
            a[0] = b[0];
            a[1] = b[1];
            a[2] = b[2];
            a[3] = b[4];
            a[4] = b[5];
            a[5] = b[6];
            a[6] = b[8];
            a[7] = b[9];
            a[8] = b[10];
            return a
        };
        a.clone = function(a) {
            var b = new e.ARRAY_TYPE(9);
            b[0] = a[0];
            b[1] = a[1];
            b[2] = a[2];
            b[3] = a[3];
            b[4] = a[4];
            b[5] = a[5];
            b[6] = a[6];
            b[7] = a[7];
            b[8] = a[8];
            return b
        };
        a.copy = function(a, b) {
            a[0] = b[0];
            a[1] = b[1];
            a[2] = b[2];
            a[3] = b[3];
            a[4] = b[4];
            a[5] = b[5];
            a[6] = b[6];
            a[7] = b[7];
            a[8] = b[8];
            return a
        };
        a.fromValues = function(a, b, c, d, m, p, n, r, q) {
            var k = new e.ARRAY_TYPE(9);
            k[0] = a;
            k[1] = b;
            k[2] = c;
            k[3] = d;
            k[4] = m;
            k[5] = p;
            k[6] = n;
            k[7] = r;
            k[8] = q;
            return k
        };
        a.set = function(a, b, c, d, e, p, n, r, q, t) {
            a[0] = b;
            a[1] = c;
            a[2] = d;
            a[3] = e;
            a[4] = p;
            a[5] = n;
            a[6] = r;
            a[7] = q;
            a[8] = t;
            return a
        };
        a.identity = function(a) {
            a[0] = 1;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = 1;
            a[5] = 0;
            a[6] = 0;
            a[7] = 0;
            a[8] = 1;
            return a
        };
        a.transpose = function(a, b) {
            if (a === b) {
                var c = b[1],
                d = b[2],
                e = b[5];
                a[1] = b[3];
                a[2] = b[6];
                a[3] = c;
                a[5] = b[7];
                a[6] = d;
                a[7] = e
            } else a[0] = b[0],
            a[1] = b[3],
            a[2] = b[6],
            a[3] = b[1],
            a[4] = b[4],
            a[5] = b[7],
            a[6] = b[2],
            a[7] = b[5],
            a[8] = b[8];
            return a
        };
        a.invert = function(a, b) {
            var c = b[0],
            d = b[1],
            e = b[2],
            g = b[3],
            n = b[4],
            h = b[5],
            q = b[6],
            t = b[7];
            b = b[8];
            var y = b * n - h * t,
            v = -b * g + h * q,
            x = t * g - n * q,
            u = c * y + d * v + e * x;
            if (!u) return null;
            u = 1 / u;
            a[0] = y * u;
            a[1] = ( - b * d + e * t) * u;
            a[2] = (h * d - e * n) * u;
            a[3] = v * u;
            a[4] = (b * c - e * q) * u;
            a[5] = ( - h * c + e * g) * u;
            a[6] = x * u;
            a[7] = ( - t * c + d * q) * u;
            a[8] = (n * c - d * g) * u;
            return a
        };
        a.adjoint = function(a, b) {
            var c = b[0],
            d = b[1],
            e = b[2],
            g = b[3],
            n = b[4],
            h = b[5],
            q = b[6],
            t = b[7];
            b = b[8];
            a[0] = n * b - h * t;
            a[1] = e * t - d * b;
            a[2] = d * h - e * n;
            a[3] = h * q - g * b;
            a[4] = c * b - e * q;
            a[5] = e * g - c * h;
            a[6] = g * t - n * q;
            a[7] = d * q - c * t;
            a[8] = c * n - d * g;
            return a
        };
        a.determinant = function(a) {
            var b = a[3],
            c = a[4],
            d = a[5],
            e = a[6],
            g = a[7],
            n = a[8];
            return a[0] * (n * c - d * g) + a[1] * ( - n * b + d * e) + a[2] * (g * b - c * e)
        };
        a.multiply = b;
        a.translate = function(a, b, c) {
            var d = b[0],
            k = b[1],
            e = b[2],
            n = b[3],
            g = b[4],
            h = b[5],
            t = b[6],
            y = b[7];
            b = b[8];
            var v = c[0];
            c = c[1];
            a[0] = d;
            a[1] = k;
            a[2] = e;
            a[3] = n;
            a[4] = g;
            a[5] = h;
            a[6] = v * d + c * n + t;
            a[7] = v * k + c * g + y;
            a[8] = v * e + c * h + b;
            return a
        };
        a.rotate = function(a, b, c) {
            var d = b[0],
            k = b[1],
            e = b[2],
            n = b[3],
            g = b[4],
            h = b[5],
            t = b[6],
            y = b[7];
            b = b[8];
            var v = Math.sin(c);
            c = Math.cos(c);
            a[0] = c * d + v * n;
            a[1] = c * k + v * g;
            a[2] = c * e + v * h;
            a[3] = c * n - v * d;
            a[4] = c * g - v * k;
            a[5] = c * h - v * e;
            a[6] = t;
            a[7] = y;
            a[8] = b;
            return a
        };
        a.scale = function(a, b, c) {
            var d = c[0];
            c = c[1];
            a[0] = d * b[0];
            a[1] = d * b[1];
            a[2] = d * b[2];
            a[3] = c * b[3];
            a[4] = c * b[4];
            a[5] = c * b[5];
            a[6] = b[6];
            a[7] = b[7];
            a[8] = b[8];
            return a
        };
        a.fromTranslation = function(a, b) {
            a[0] = 1;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = 1;
            a[5] = 0;
            a[6] = b[0];
            a[7] = b[1];
            a[8] = 1;
            return a
        };
        a.fromRotation = function(a, b) {
            var c = Math.sin(b);
            b = Math.cos(b);
            a[0] = b;
            a[1] = c;
            a[2] = 0;
            a[3] = -c;
            a[4] = b;
            a[5] = 0;
            a[6] = 0;
            a[7] = 0;
            a[8] = 1;
            return a
        };
        a.fromScaling = function(a, b) {
            a[0] = b[0];
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = b[1];
            a[5] = 0;
            a[6] = 0;
            a[7] = 0;
            a[8] = 1;
            return a
        };
        a.fromMat2d = function(a, b) {
            a[0] = b[0];
            a[1] = b[1];
            a[2] = 0;
            a[3] = b[2];
            a[4] = b[3];
            a[5] = 0;
            a[6] = b[4];
            a[7] = b[5];
            a[8] = 1;
            return a
        };
        a.fromQuat = function(a, b) {
            var c = b[0],
            d = b[1],
            e = b[2];
            b = b[3];
            var g = c + c,
            n = d + d,
            h = e + e;
            c *= g;
            var q = d * g;
            d *= n;
            var t = e * g,
            y = e * n;
            e *= h;
            g *= b;
            n *= b;
            b *= h;
            a[0] = 1 - d - e;
            a[3] = q - b;
            a[6] = t + n;
            a[1] = q + b;
            a[4] = 1 - c - e;
            a[7] = y - g;
            a[2] = t - n;
            a[5] = y + g;
            a[8] = 1 - c - d;
            return a
        };
        a.normalFromMat4 = function(a, b) {
            var c = b[0],
            d = b[1],
            e = b[2],
            g = b[3],
            n = b[4],
            h = b[5],
            q = b[6],
            t = b[7],
            y = b[8],
            v = b[9],
            x = b[10],
            u = b[11],
            B = b[12],
            A = b[13],
            D = b[14];
            b = b[15];
            var C = c * h - d * n,
            G = c * q - e * n,
            H = c * t - g * n,
            J = d * q - e * h,
            w = d * t - g * h,
            W = e * t - g * q,
            z = y * A - v * B,
            E = y * D - x * B;
            y = y * b - u * B;
            var F = v * D - x * A;
            v = v * b - u * A;
            x = x * b - u * D;
            u = C * x - G * v + H * F + J * y - w * E + W * z;
            if (!u) return null;
            u = 1 / u;
            a[0] = (h * x - q * v + t * F) * u;
            a[1] = (q * y - n * x - t * E) * u;
            a[2] = (n * v - h * y + t * z) * u;
            a[3] = (e * v - d * x - g * F) * u;
            a[4] = (c * x - e * y + g * E) * u;
            a[5] = (d * y - c * v - g * z) * u;
            a[6] = (A * W - D * w + b * J) * u;
            a[7] = (D * H - B * W - b * G) * u;
            a[8] = (B * w - A * H + b * C) * u;
            return a
        };
        a.projection = function(a, b, c) {
            a[0] = 2 / b;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = -2 / c;
            a[5] = 0;
            a[6] = -1;
            a[7] = 1;
            a[8] = 1;
            return a
        };
        a.str = function(a) {
            return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")"
        };
        a.frob = function(a) {
            return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2))
        };
        a.add = function(a, b, c) {
            a[0] = b[0] + c[0];
            a[1] = b[1] + c[1];
            a[2] = b[2] + c[2];
            a[3] = b[3] + c[3];
            a[4] = b[4] + c[4];
            a[5] = b[5] + c[5];
            a[6] = b[6] + c[6];
            a[7] = b[7] + c[7];
            a[8] = b[8] + c[8];
            return a
        };
        a.subtract = d;
        a.multiplyScalar = function(a, b, c) {
            a[0] = b[0] * c;
            a[1] = b[1] * c;
            a[2] = b[2] * c;
            a[3] = b[3] * c;
            a[4] = b[4] * c;
            a[5] = b[5] * c;
            a[6] = b[6] * c;
            a[7] = b[7] * c;
            a[8] = b[8] * c;
            return a
        };
        a.multiplyScalarAndAdd = function(a, b, c, d) {
            a[0] = b[0] + c[0] * d;
            a[1] = b[1] + c[1] * d;
            a[2] = b[2] + c[2] * d;
            a[3] = b[3] + c[3] * d;
            a[4] = b[4] + c[4] * d;
            a[5] = b[5] + c[5] * d;
            a[6] = b[6] + c[6] * d;
            a[7] = b[7] + c[7] * d;
            a[8] = b[8] + c[8] * d;
            return a
        };
        a.exactEquals = function(a, b) {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8]
        };
        a.equals = function(a, b) {
            var c = a[0],
            d = a[1],
            g = a[2],
            h = a[3],
            n = a[4],
            r = a[5],
            q = a[6],
            t = a[7];
            a = a[8];
            var y = b[0],
            v = b[1],
            x = b[2],
            u = b[3],
            B = b[4],
            A = b[5],
            D = b[6],
            C = b[7];
            b = b[8];
            return Math.abs(c - y) <= e.EPSILON * Math.max(1, Math.abs(c), Math.abs(y)) && Math.abs(d - v) <= e.EPSILON * Math.max(1, Math.abs(d), Math.abs(v)) && Math.abs(g - x) <= e.EPSILON * Math.max(1, Math.abs(g), Math.abs(x)) && Math.abs(h - u) <= e.EPSILON * Math.max(1, Math.abs(h), Math.abs(u)) && Math.abs(n - B) <= e.EPSILON * Math.max(1, Math.abs(n), Math.abs(B)) && Math.abs(r - A) <= e.EPSILON * Math.max(1, Math.abs(r), Math.abs(A)) && Math.abs(q - D) <= e.EPSILON * Math.max(1, Math.abs(q), Math.abs(D)) && Math.abs(t - C) <= e.EPSILON * Math.max(1, Math.abs(t), Math.abs(C)) && Math.abs(a - b) <= e.EPSILON * Math.max(1, Math.abs(a), Math.abs(b))
        };
        a.sub = a.mul = undefined;
        var e = function(a) {
            if (a && a.__esModule) return a;
            var b = {};
            if (null != a) for (var c in a) if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = fa && ea ? ea(a, c) : {};
                d.get || d.set ? fa(b, c, d) : b[c] = a[c]
            }
            b.
        default = a;
            return b
        } (Ka);
        a.mul = b;
        a.sub = d
    });
    T(Hd);
    var Id = O(function(c, a) {
        function b(a) {
            a[0] = 1;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = 0;
            a[5] = 1;
            a[6] = 0;
            a[7] = 0;
            a[8] = 0;
            a[9] = 0;
            a[10] = 1;
            a[11] = 0;
            a[12] = 0;
            a[13] = 0;
            a[14] = 0;
            a[15] = 1;
            return a
        }
        function d(a, b, c) {
            var d = b[0],
            k = b[1],
            e = b[2],
            g = b[3],
            l = b[4],
            h = b[5],
            m = b[6],
            x = b[7],
            u = b[8],
            B = b[9],
            A = b[10],
            D = b[11],
            C = b[12],
            G = b[13],
            H = b[14];
            b = b[15];
            var J = c[0],
            w = c[1],
            W = c[2],
            z = c[3];
            a[0] = J * d + w * l + W * u + z * C;
            a[1] = J * k + w * h + W * B + z * G;
            a[2] = J * e + w * m + W * A + z * H;
            a[3] = J * g + w * x + W * D + z * b;
            J = c[4];
            w = c[5];
            W = c[6];
            z = c[7];
            a[4] = J * d + w * l + W * u + z * C;
            a[5] = J * k + w * h + W * B + z * G;
            a[6] = J * e + w * m + W * A + z * H;
            a[7] = J * g + w * x + W * D + z * b;
            J = c[8];
            w = c[9];
            W = c[10];
            z = c[11];
            a[8] = J * d + w * l + W * u + z * C;
            a[9] = J * k + w * h + W * B + z * G;
            a[10] = J * e + w * m + W * A + z * H;
            a[11] = J * g + w * x + W * D + z * b;
            J = c[12];
            w = c[13];
            W = c[14];
            z = c[15];
            a[12] = J * d + w * l + W * u + z * C;
            a[13] = J * k + w * h + W * B + z * G;
            a[14] = J * e + w * m + W * A + z * H;
            a[15] = J * g + w * x + W * D + z * b;
            return a
        }
        function e(a, b, c) {
            var d = b[0],
            k = b[1],
            e = b[2],
            g = b[3],
            l = d + d,
            h = k + k,
            m = e + e;
            b = d * l;
            var x = d * h;
            d *= m;
            var u = k * h;
            k *= m;
            e *= m;
            l *= g;
            h *= g;
            g *= m;
            a[0] = 1 - (u + e);
            a[1] = x + g;
            a[2] = d - h;
            a[3] = 0;
            a[4] = x - g;
            a[5] = 1 - (b + e);
            a[6] = k + l;
            a[7] = 0;
            a[8] = d + h;
            a[9] = k - l;
            a[10] = 1 - (b + u);
            a[11] = 0;
            a[12] = c[0];
            a[13] = c[1];
            a[14] = c[2];
            a[15] = 1;
            return a
        }
        function g(a, b, c) {
            a[0] = b[0] - c[0];
            a[1] = b[1] - c[1];
            a[2] = b[2] - c[2];
            a[3] = b[3] - c[3];
            a[4] = b[4] - c[4];
            a[5] = b[5] - c[5];
            a[6] = b[6] - c[6];
            a[7] = b[7] - c[7];
            a[8] = b[8] - c[8];
            a[9] = b[9] - c[9];
            a[10] = b[10] - c[10];
            a[11] = b[11] - c[11];
            a[12] = b[12] - c[12];
            a[13] = b[13] - c[13];
            a[14] = b[14] - c[14];
            a[15] = b[15] - c[15];
            return a
        }
        Object.defineProperty(a, "__esModule", {
            value: true
        });
        a.create = function() {
            var a = new h.ARRAY_TYPE(16);
            h.ARRAY_TYPE != Float32Array && (a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0);
            a[0] = 1;
            a[5] = 1;
            a[10] = 1;
            a[15] = 1;
            return a
        };
        a.clone = function(a) {
            var b = new h.ARRAY_TYPE(16);
            b[0] = a[0];
            b[1] = a[1];
            b[2] = a[2];
            b[3] = a[3];
            b[4] = a[4];
            b[5] = a[5];
            b[6] = a[6];
            b[7] = a[7];
            b[8] = a[8];
            b[9] = a[9];
            b[10] = a[10];
            b[11] = a[11];
            b[12] = a[12];
            b[13] = a[13];
            b[14] = a[14];
            b[15] = a[15];
            return b
        };
        a.copy = function(a, b) {
            a[0] = b[0];
            a[1] = b[1];
            a[2] = b[2];
            a[3] = b[3];
            a[4] = b[4];
            a[5] = b[5];
            a[6] = b[6];
            a[7] = b[7];
            a[8] = b[8];
            a[9] = b[9];
            a[10] = b[10];
            a[11] = b[11];
            a[12] = b[12];
            a[13] = b[13];
            a[14] = b[14];
            a[15] = b[15];
            return a
        };
        a.fromValues = function(a, b, c, d, e, g, q, t, y, v, x, u, B, A, D, C) {
            var k = new h.ARRAY_TYPE(16);
            k[0] = a;
            k[1] = b;
            k[2] = c;
            k[3] = d;
            k[4] = e;
            k[5] = g;
            k[6] = q;
            k[7] = t;
            k[8] = y;
            k[9] = v;
            k[10] = x;
            k[11] = u;
            k[12] = B;
            k[13] = A;
            k[14] = D;
            k[15] = C;
            return k
        };
        a.set = function(a, b, c, d, e, g, h, t, y, v, x, u, B, A, D, C, G) {
            a[0] = b;
            a[1] = c;
            a[2] = d;
            a[3] = e;
            a[4] = g;
            a[5] = h;
            a[6] = t;
            a[7] = y;
            a[8] = v;
            a[9] = x;
            a[10] = u;
            a[11] = B;
            a[12] = A;
            a[13] = D;
            a[14] = C;
            a[15] = G;
            return a
        };
        a.identity = b;
        a.transpose = function(a, b) {
            if (a === b) {
                var c = b[1],
                d = b[2],
                k = b[3],
                e = b[6],
                g = b[7],
                h = b[11];
                a[1] = b[4];
                a[2] = b[8];
                a[3] = b[12];
                a[4] = c;
                a[6] = b[9];
                a[7] = b[13];
                a[8] = d;
                a[9] = e;
                a[11] = b[14];
                a[12] = k;
                a[13] = g;
                a[14] = h
            } else a[0] = b[0],
            a[1] = b[4],
            a[2] = b[8],
            a[3] = b[12],
            a[4] = b[1],
            a[5] = b[5],
            a[6] = b[9],
            a[7] = b[13],
            a[8] = b[2],
            a[9] = b[6],
            a[10] = b[10],
            a[11] = b[14],
            a[12] = b[3],
            a[13] = b[7],
            a[14] = b[11],
            a[15] = b[15];
            return a
        };
        a.invert = function(a, b) {
            var c = b[0],
            d = b[1],
            k = b[2],
            e = b[3],
            g = b[4],
            h = b[5],
            l = b[6],
            v = b[7],
            x = b[8],
            u = b[9],
            B = b[10],
            A = b[11],
            D = b[12],
            C = b[13],
            G = b[14];
            b = b[15];
            var H = c * h - d * g,
            J = c * l - k * g,
            w = c * v - e * g,
            W = d * l - k * h,
            z = d * v - e * h,
            E = k * v - e * l,
            F = x * C - u * D,
            I = x * G - B * D,
            L = x * b - A * D,
            M = u * G - B * C,
            N = u * b - A * C,
            O = B * b - A * G,
            K = H * O - J * N + w * M + W * L - z * I + E * F;
            if (!K) return null;
            K = 1 / K;
            a[0] = (h * O - l * N + v * M) * K;
            a[1] = (k * N - d * O - e * M) * K;
            a[2] = (C * E - G * z + b * W) * K;
            a[3] = (B * z - u * E - A * W) * K;
            a[4] = (l * L - g * O - v * I) * K;
            a[5] = (c * O - k * L + e * I) * K;
            a[6] = (G * w - D * E - b * J) * K;
            a[7] = (x * E - B * w + A * J) * K;
            a[8] = (g * N - h * L + v * F) * K;
            a[9] = (d * L - c * N - e * F) * K;
            a[10] = (D * z - C * w + b * H) * K;
            a[11] = (u * w - x * z - A * H) * K;
            a[12] = (h * I - g * M - l * F) * K;
            a[13] = (c * M - d * I + k * F) * K;
            a[14] = (C * J - D * W - G * H) * K;
            a[15] = (x * W - u * J + B * H) * K;
            return a
        };
        a.adjoint = function(a, b) {
            var c = b[0],
            d = b[1],
            k = b[2],
            e = b[3],
            g = b[4],
            h = b[5],
            l = b[6],
            v = b[7],
            x = b[8],
            u = b[9],
            B = b[10],
            A = b[11],
            D = b[12],
            C = b[13],
            G = b[14];
            b = b[15];
            a[0] = h * (B * b - A * G) - u * (l * b - v * G) + C * (l * A - v * B);
            a[1] = -(d * (B * b - A * G) - u * (k * b - e * G) + C * (k * A - e * B));
            a[2] = d * (l * b - v * G) - h * (k * b - e * G) + C * (k * v - e * l);
            a[3] = -(d * (l * A - v * B) - h * (k * A - e * B) + u * (k * v - e * l));
            a[4] = -(g * (B * b - A * G) - x * (l * b - v * G) + D * (l * A - v * B));
            a[5] = c * (B * b - A * G) - x * (k * b - e * G) + D * (k * A - e * B);
            a[6] = -(c * (l * b - v * G) - g * (k * b - e * G) + D * (k * v - e * l));
            a[7] = c * (l * A - v * B) - g * (k * A - e * B) + x * (k * v - e * l);
            a[8] = g * (u * b - A * C) - x * (h * b - v * C) + D * (h * A - v * u);
            a[9] = -(c * (u * b - A * C) - x * (d * b - e * C) + D * (d * A - e * u));
            a[10] = c * (h * b - v * C) - g * (d * b - e * C) + D * (d * v - e * h);
            a[11] = -(c * (h * A - v * u) - g * (d * A - e * u) + x * (d * v - e * h));
            a[12] = -(g * (u * G - B * C) - x * (h * G - l * C) + D * (h * B - l * u));
            a[13] = c * (u * G - B * C) - x * (d * G - k * C) + D * (d * B - k * u);
            a[14] = -(c * (h * G - l * C) - g * (d * G - k * C) + D * (d * l - k * h));
            a[15] = c * (h * B - l * u) - g * (d * B - k * u) + x * (d * l - k * h);
            return a
        };
        a.determinant = function(a) {
            var b = a[0],
            c = a[1],
            d = a[2],
            k = a[3],
            e = a[4],
            g = a[5],
            h = a[6],
            y = a[7],
            v = a[8],
            x = a[9],
            u = a[10],
            B = a[11],
            A = a[12],
            D = a[13],
            C = a[14];
            a = a[15];
            return (b * g - c * e) * (u * a - B * C) - (b * h - d * e) * (x * a - B * D) + (b * y - k * e) * (x * C - u * D) + (c * h - d * g) * (v * a - B * A) - (c * y - k * g) * (v * C - u * A) + (d * y - k * h) * (v * D - x * A)
        };
        a.multiply = d;
        a.translate = function(a, b, c) {
            var d = c[0],
            e = c[1];
            c = c[2];
            if (b === a) a[12] = b[0] * d + b[4] * e + b[8] * c + b[12],
            a[13] = b[1] * d + b[5] * e + b[9] * c + b[13],
            a[14] = b[2] * d + b[6] * e + b[10] * c + b[14],
            a[15] = b[3] * d + b[7] * e + b[11] * c + b[15];
            else {
                var k = b[0];
                var g = b[1];
                var h = b[2];
                var l = b[3];
                var m = b[4];
                var x = b[5];
                var u = b[6];
                var B = b[7];
                var A = b[8];
                var D = b[9];
                var C = b[10];
                var G = b[11];
                a[0] = k;
                a[1] = g;
                a[2] = h;
                a[3] = l;
                a[4] = m;
                a[5] = x;
                a[6] = u;
                a[7] = B;
                a[8] = A;
                a[9] = D;
                a[10] = C;
                a[11] = G;
                a[12] = k * d + m * e + A * c + b[12];
                a[13] = g * d + x * e + D * c + b[13];
                a[14] = h * d + u * e + C * c + b[14];
                a[15] = l * d + B * e + G * c + b[15]
            }
            return a
        };
        a.scale = function(a, b, c) {
            var d = c[0],
            e = c[1];
            c = c[2];
            a[0] = b[0] * d;
            a[1] = b[1] * d;
            a[2] = b[2] * d;
            a[3] = b[3] * d;
            a[4] = b[4] * e;
            a[5] = b[5] * e;
            a[6] = b[6] * e;
            a[7] = b[7] * e;
            a[8] = b[8] * c;
            a[9] = b[9] * c;
            a[10] = b[10] * c;
            a[11] = b[11] * c;
            a[12] = b[12];
            a[13] = b[13];
            a[14] = b[14];
            a[15] = b[15];
            return a
        };
        a.rotate = function(a, b, c, d) {
            var e = d[0],
            k = d[1];
            d = d[2];
            var g = Math.sqrt(e * e + k * k + d * d);
            if (g < h.EPSILON) return null;
            g = 1 / g;
            e *= g;
            k *= g;
            d *= g;
            var t = Math.sin(c);
            var l = Math.cos(c);
            var m = 1 - l;
            c = b[0];
            g = b[1];
            var p = b[2];
            var u = b[3];
            var B = b[4];
            var A = b[5];
            var D = b[6];
            var C = b[7];
            var G = b[8];
            var H = b[9];
            var J = b[10];
            var w = b[11];
            var z = e * e * m + l;
            var E = k * e * m + d * t;
            var F = d * e * m - k * t;
            var I = e * k * m - d * t;
            var K = k * k * m + l;
            var L = d * k * m + e * t;
            var M = e * d * m + k * t;
            e = k * d * m - e * t;
            k = d * d * m + l;
            a[0] = c * z + B * E + G * F;
            a[1] = g * z + A * E + H * F;
            a[2] = p * z + D * E + J * F;
            a[3] = u * z + C * E + w * F;
            a[4] = c * I + B * K + G * L;
            a[5] = g * I + A * K + H * L;
            a[6] = p * I + D * K + J * L;
            a[7] = u * I + C * K + w * L;
            a[8] = c * M + B * e + G * k;
            a[9] = g * M + A * e + H * k;
            a[10] = p * M + D * e + J * k;
            a[11] = u * M + C * e + w * k;
            b !== a && (a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]);
            return a
        };
        a.rotateX = function(a, b, c) {
            var d = Math.sin(c);
            c = Math.cos(c);
            var e = b[4],
            k = b[5],
            g = b[6],
            h = b[7],
            l = b[8],
            m = b[9],
            x = b[10],
            u = b[11];
            b !== a && (a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]);
            a[4] = e * c + l * d;
            a[5] = k * c + m * d;
            a[6] = g * c + x * d;
            a[7] = h * c + u * d;
            a[8] = l * c - e * d;
            a[9] = m * c - k * d;
            a[10] = x * c - g * d;
            a[11] = u * c - h * d;
            return a
        };
        a.rotateY = function(a, b, c) {
            var d = Math.sin(c);
            c = Math.cos(c);
            var e = b[0],
            k = b[1],
            g = b[2],
            h = b[3],
            l = b[8],
            m = b[9],
            x = b[10],
            u = b[11];
            b !== a && (a[4] = b[4], a[5] = b[5], a[6] = b[6], a[7] = b[7], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]);
            a[0] = e * c - l * d;
            a[1] = k * c - m * d;
            a[2] = g * c - x * d;
            a[3] = h * c - u * d;
            a[8] = e * d + l * c;
            a[9] = k * d + m * c;
            a[10] = g * d + x * c;
            a[11] = h * d + u * c;
            return a
        };
        a.rotateZ = function(a, b, c) {
            var d = Math.sin(c);
            c = Math.cos(c);
            var e = b[0],
            k = b[1],
            g = b[2],
            h = b[3],
            l = b[4],
            m = b[5],
            x = b[6],
            u = b[7];
            b !== a && (a[8] = b[8], a[9] = b[9], a[10] = b[10], a[11] = b[11], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]);
            a[0] = e * c + l * d;
            a[1] = k * c + m * d;
            a[2] = g * c + x * d;
            a[3] = h * c + u * d;
            a[4] = l * c - e * d;
            a[5] = m * c - k * d;
            a[6] = x * c - g * d;
            a[7] = u * c - h * d;
            return a
        };
        a.fromTranslation = function(a, b) {
            a[0] = 1;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = 0;
            a[5] = 1;
            a[6] = 0;
            a[7] = 0;
            a[8] = 0;
            a[9] = 0;
            a[10] = 1;
            a[11] = 0;
            a[12] = b[0];
            a[13] = b[1];
            a[14] = b[2];
            a[15] = 1;
            return a
        };
        a.fromScaling = function(a, b) {
            a[0] = b[0];
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = 0;
            a[5] = b[1];
            a[6] = 0;
            a[7] = 0;
            a[8] = 0;
            a[9] = 0;
            a[10] = b[2];
            a[11] = 0;
            a[12] = 0;
            a[13] = 0;
            a[14] = 0;
            a[15] = 1;
            return a
        };
        a.fromRotation = function(a, b, c) {
            var d = c[0],
            e = c[1];
            c = c[2];
            var k = Math.sqrt(d * d + e * e + c * c);
            if (k < h.EPSILON) return null;
            k = 1 / k;
            d *= k;
            e *= k;
            c *= k;
            k = Math.sin(b);
            b = Math.cos(b);
            var g = 1 - b;
            a[0] = d * d * g + b;
            a[1] = e * d * g + c * k;
            a[2] = c * d * g - e * k;
            a[3] = 0;
            a[4] = d * e * g - c * k;
            a[5] = e * e * g + b;
            a[6] = c * e * g + d * k;
            a[7] = 0;
            a[8] = d * c * g + e * k;
            a[9] = e * c * g - d * k;
            a[10] = c * c * g + b;
            a[11] = 0;
            a[12] = 0;
            a[13] = 0;
            a[14] = 0;
            a[15] = 1;
            return a
        };
        a.fromXRotation = function(a, b) {
            var c = Math.sin(b);
            b = Math.cos(b);
            a[0] = 1;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = 0;
            a[5] = b;
            a[6] = c;
            a[7] = 0;
            a[8] = 0;
            a[9] = -c;
            a[10] = b;
            a[11] = 0;
            a[12] = 0;
            a[13] = 0;
            a[14] = 0;
            a[15] = 1;
            return a
        };
        a.fromYRotation = function(a, b) {
            var c = Math.sin(b);
            b = Math.cos(b);
            a[0] = b;
            a[1] = 0;
            a[2] = -c;
            a[3] = 0;
            a[4] = 0;
            a[5] = 1;
            a[6] = 0;
            a[7] = 0;
            a[8] = c;
            a[9] = 0;
            a[10] = b;
            a[11] = 0;
            a[12] = 0;
            a[13] = 0;
            a[14] = 0;
            a[15] = 1;
            return a
        };
        a.fromZRotation = function(a, b) {
            var c = Math.sin(b);
            b = Math.cos(b);
            a[0] = b;
            a[1] = c;
            a[2] = 0;
            a[3] = 0;
            a[4] = -c;
            a[5] = b;
            a[6] = 0;
            a[7] = 0;
            a[8] = 0;
            a[9] = 0;
            a[10] = 1;
            a[11] = 0;
            a[12] = 0;
            a[13] = 0;
            a[14] = 0;
            a[15] = 1;
            return a
        };
        a.fromRotationTranslation = e;
        a.fromQuat2 = function(a, b) {
            var c = new h.ARRAY_TYPE(3),
            d = -b[0],
            k = -b[1],
            g = -b[2],
            q = b[3],
            t = b[4],
            l = b[5],
            v = b[6],
            x = b[7],
            u = d * d + k * k + g * g + q * q;
            0 < u ? (c[0] = 2 * (t * q + x * d + l * g - v * k) / u, c[1] = 2 * (l * q + x * k + v * d - t * g) / u, c[2] = 2 * (v * q + x * g + t * k - l * d) / u) : (c[0] = 2 * (t * q + x * d + l * g - v * k), c[1] = 2 * (l * q + x * k + v * d - t * g), c[2] = 2 * (v * q + x * g + t * k - l * d));
            e(a, b, c);
            return a
        };
        a.getTranslation = function(a, b) {
            a[0] = b[12];
            a[1] = b[13];
            a[2] = b[14];
            return a
        };
        a.getScaling = function(a, b) {
            var c = b[0],
            d = b[1],
            e = b[2],
            k = b[4],
            g = b[5],
            h = b[6],
            l = b[8],
            v = b[9];
            b = b[10];
            a[0] = Math.sqrt(c * c + d * d + e * e);
            a[1] = Math.sqrt(k * k + g * g + h * h);
            a[2] = Math.sqrt(l * l + v * v + b * b);
            return a
        };
        a.getRotation = function(a, b) {
            var c = b[0] + b[5] + b[10];
            0 < c ? (c = 2 * Math.sqrt(c + 1), a[3] = .25 * c, a[0] = (b[6] - b[9]) / c, a[1] = (b[8] - b[2]) / c, a[2] = (b[1] - b[4]) / c) : b[0] > b[5] && b[0] > b[10] ? (c = 2 * Math.sqrt(1 + b[0] - b[5] - b[10]), a[3] = (b[6] - b[9]) / c, a[0] = .25 * c, a[1] = (b[1] + b[4]) / c, a[2] = (b[8] + b[2]) / c) : b[5] > b[10] ? (c = 2 * Math.sqrt(1 + b[5] - b[0] - b[10]), a[3] = (b[8] - b[2]) / c, a[0] = (b[1] + b[4]) / c, a[1] = .25 * c, a[2] = (b[6] + b[9]) / c) : (c = 2 * Math.sqrt(1 + b[10] - b[0] - b[5]), a[3] = (b[1] - b[4]) / c, a[0] = (b[8] + b[2]) / c, a[1] = (b[6] + b[9]) / c, a[2] = .25 * c);
            return a
        };
        a.fromRotationTranslationScale = function(a, b, c, d) {
            var e = b[0],
            k = b[1],
            g = b[2],
            h = b[3],
            l = e + e,
            m = k + k,
            x = g + g;
            b = e * l;
            var u = e * m;
            e *= x;
            var p = k * m;
            k *= x;
            g *= x;
            l *= h;
            m *= h;
            h *= x;
            x = d[0];
            var A = d[1];
            d = d[2];
            a[0] = (1 - (p + g)) * x;
            a[1] = (u + h) * x;
            a[2] = (e - m) * x;
            a[3] = 0;
            a[4] = (u - h) * A;
            a[5] = (1 - (b + g)) * A;
            a[6] = (k + l) * A;
            a[7] = 0;
            a[8] = (e + m) * d;
            a[9] = (k - l) * d;
            a[10] = (1 - (b + p)) * d;
            a[11] = 0;
            a[12] = c[0];
            a[13] = c[1];
            a[14] = c[2];
            a[15] = 1;
            return a
        };
        a.fromRotationTranslationScaleOrigin = function(a, b, c, d, e) {
            var k = b[0],
            n = b[1],
            g = b[2],
            h = b[3],
            l = k + k,
            m = n + n,
            u = g + g;
            b = k * l;
            var p = k * m,
            A = k * u;
            k = n * m;
            n *= u;
            var D = g * u;
            g = h * l;
            m *= h;
            var C = h * u,
            G = d[0],
            H = d[1];
            u = d[2];
            d = e[0];
            h = e[1];
            e = e[2];
            l = (1 - (k + D)) * G;
            var J = (p + C) * G;
            G *= A - m;
            p = (p - C) * H;
            D = (1 - (b + D)) * H;
            H *= n + g;
            A = (A + m) * u;
            n = (n - g) * u;
            b = (1 - (b + k)) * u;
            a[0] = l;
            a[1] = J;
            a[2] = G;
            a[3] = 0;
            a[4] = p;
            a[5] = D;
            a[6] = H;
            a[7] = 0;
            a[8] = A;
            a[9] = n;
            a[10] = b;
            a[11] = 0;
            a[12] = c[0] + d - (l * d + p * h + A * e);
            a[13] = c[1] + h - (J * d + D * h + n * e);
            a[14] = c[2] + e - (G * d + H * h + b * e);
            a[15] = 1;
            return a
        };
        a.fromQuat = function(a, b) {
            var c = b[0],
            d = b[1],
            e = b[2];
            b = b[3];
            var k = c + c,
            g = d + d,
            h = e + e;
            c *= k;
            var l = d * k;
            d *= g;
            var v = e * k,
            x = e * g;
            e *= h;
            k *= b;
            g *= b;
            b *= h;
            a[0] = 1 - d - e;
            a[1] = l + b;
            a[2] = v - g;
            a[3] = 0;
            a[4] = l - b;
            a[5] = 1 - c - e;
            a[6] = x + k;
            a[7] = 0;
            a[8] = v + g;
            a[9] = x - k;
            a[10] = 1 - c - d;
            a[11] = 0;
            a[12] = 0;
            a[13] = 0;
            a[14] = 0;
            a[15] = 1;
            return a
        };
        a.frustum = function(a, b, c, d, e, g, h) {
            var k = 1 / (c - b),
            n = 1 / (e - d),
            r = 1 / (g - h);
            a[0] = 2 * g * k;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = 0;
            a[5] = 2 * g * n;
            a[6] = 0;
            a[7] = 0;
            a[8] = (c + b) * k;
            a[9] = (e + d) * n;
            a[10] = (h + g) * r;
            a[11] = -1;
            a[12] = 0;
            a[13] = 0;
            a[14] = h * g * 2 * r;
            a[15] = 0;
            return a
        };
        a.perspective = function(a, b, c, d, e) {
            b = 1 / Math.tan(b / 2);
            a[0] = b / c;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = 0;
            a[5] = b;
            a[6] = 0;
            a[7] = 0;
            a[8] = 0;
            a[9] = 0;
            a[11] = -1;
            a[12] = 0;
            a[13] = 0;
            a[15] = 0;
            null != e && Infinity !== e ? (c = 1 / (d - e), a[10] = (e + d) * c, a[14] = 2 * e * d * c) : (a[10] = -1, a[14] = -2 * d);
            return a
        };
        a.perspectiveFromFieldOfView = function(a, b, c, d) {
            var e = Math.tan(b.upDegrees * Math.PI / 180),
            k = Math.tan(b.downDegrees * Math.PI / 180),
            g = Math.tan(b.leftDegrees * Math.PI / 180);
            b = Math.tan(b.rightDegrees * Math.PI / 180);
            var h = 2 / (g + b),
            l = 2 / (e + k);
            a[0] = h;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = 0;
            a[5] = l;
            a[6] = 0;
            a[7] = 0;
            a[8] = -((g - b) * h * .5);
            a[9] = (e - k) * l * .5;
            a[10] = d / (c - d);
            a[11] = -1;
            a[12] = 0;
            a[13] = 0;
            a[14] = d * c / (c - d);
            a[15] = 0;
            return a
        };
        a.ortho = function(a, b, c, d, e, g, h) {
            var k = 1 / (b - c),
            n = 1 / (d - e),
            r = 1 / (g - h);
            a[0] = -2 * k;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = 0;
            a[5] = -2 * n;
            a[6] = 0;
            a[7] = 0;
            a[8] = 0;
            a[9] = 0;
            a[10] = 2 * r;
            a[11] = 0;
            a[12] = (b + c) * k;
            a[13] = (e + d) * n;
            a[14] = (h + g) * r;
            a[15] = 1;
            return a
        };
        a.lookAt = function(a, c, d, e) {
            var k = c[0],
            g = c[1];
            c = c[2];
            var q = e[0];
            var t = e[1];
            var l = e[2];
            var m = d[0];
            e = d[1];
            var x = d[2];
            if (Math.abs(k - m) < h.EPSILON && Math.abs(g - e) < h.EPSILON && Math.abs(c - x) < h.EPSILON) return b(a);
            d = k - m;
            e = g - e;
            m = c - x;
            var u = 1 / Math.sqrt(d * d + e * e + m * m);
            d *= u;
            e *= u;
            m *= u;
            x = t * m - l * e;
            l = l * d - q * m;
            q = q * e - t * d; (u = Math.sqrt(x * x + l * l + q * q)) ? (u = 1 / u, x *= u, l *= u, q *= u) : q = l = x = 0;
            t = e * q - m * l;
            var p = m * x - d * q;
            var A = d * l - e * x; (u = Math.sqrt(t * t + p * p + A * A)) ? (u = 1 / u, t *= u, p *= u, A *= u) : A = p = t = 0;
            a[0] = x;
            a[1] = t;
            a[2] = d;
            a[3] = 0;
            a[4] = l;
            a[5] = p;
            a[6] = e;
            a[7] = 0;
            a[8] = q;
            a[9] = A;
            a[10] = m;
            a[11] = 0;
            a[12] = -(x * k + l * g + q * c);
            a[13] = -(t * k + p * g + A * c);
            a[14] = -(d * k + e * g + m * c);
            a[15] = 1;
            return a
        };
        a.targetTo = function(a, b, c, d) {
            var e = b[0],
            k = b[1];
            b = b[2];
            var g = d[0],
            h = d[1],
            l = d[2];
            d = e - c[0];
            var m = k - c[1];
            c = b - c[2];
            var x = d * d + m * m + c * c;
            0 < x && (x = 1 / Math.sqrt(x), d *= x, m *= x, c *= x);
            var u = h * c - l * m;
            l = l * d - g * c;
            g = g * m - h * d;
            x = u * u + l * l + g * g;
            0 < x && (x = 1 / Math.sqrt(x), u *= x, l *= x, g *= x);
            a[0] = u;
            a[1] = l;
            a[2] = g;
            a[3] = 0;
            a[4] = m * g - c * l;
            a[5] = c * u - d * g;
            a[6] = d * l - m * u;
            a[7] = 0;
            a[8] = d;
            a[9] = m;
            a[10] = c;
            a[11] = 0;
            a[12] = e;
            a[13] = k;
            a[14] = b;
            a[15] = 1;
            return a
        };
        a.str = function(a) {
            return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")"
        };
        a.frob = function(a) {
            return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2))
        };
        a.add = function(a, b, c) {
            a[0] = b[0] + c[0];
            a[1] = b[1] + c[1];
            a[2] = b[2] + c[2];
            a[3] = b[3] + c[3];
            a[4] = b[4] + c[4];
            a[5] = b[5] + c[5];
            a[6] = b[6] + c[6];
            a[7] = b[7] + c[7];
            a[8] = b[8] + c[8];
            a[9] = b[9] + c[9];
            a[10] = b[10] + c[10];
            a[11] = b[11] + c[11];
            a[12] = b[12] + c[12];
            a[13] = b[13] + c[13];
            a[14] = b[14] + c[14];
            a[15] = b[15] + c[15];
            return a
        };
        a.subtract = g;
        a.multiplyScalar = function(a, b, c) {
            a[0] = b[0] * c;
            a[1] = b[1] * c;
            a[2] = b[2] * c;
            a[3] = b[3] * c;
            a[4] = b[4] * c;
            a[5] = b[5] * c;
            a[6] = b[6] * c;
            a[7] = b[7] * c;
            a[8] = b[8] * c;
            a[9] = b[9] * c;
            a[10] = b[10] * c;
            a[11] = b[11] * c;
            a[12] = b[12] * c;
            a[13] = b[13] * c;
            a[14] = b[14] * c;
            a[15] = b[15] * c;
            return a
        };
        a.multiplyScalarAndAdd = function(a, b, c, d) {
            a[0] = b[0] + c[0] * d;
            a[1] = b[1] + c[1] * d;
            a[2] = b[2] + c[2] * d;
            a[3] = b[3] + c[3] * d;
            a[4] = b[4] + c[4] * d;
            a[5] = b[5] + c[5] * d;
            a[6] = b[6] + c[6] * d;
            a[7] = b[7] + c[7] * d;
            a[8] = b[8] + c[8] * d;
            a[9] = b[9] + c[9] * d;
            a[10] = b[10] + c[10] * d;
            a[11] = b[11] + c[11] * d;
            a[12] = b[12] + c[12] * d;
            a[13] = b[13] + c[13] * d;
            a[14] = b[14] + c[14] * d;
            a[15] = b[15] + c[15] * d;
            return a
        };
        a.exactEquals = function(a, b) {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15]
        };
        a.equals = function(a, b) {
            var c = a[0],
            d = a[1],
            e = a[2],
            g = a[3],
            k = a[4],
            t = a[5],
            y = a[6],
            l = a[7],
            x = a[8],
            u = a[9],
            B = a[10],
            A = a[11],
            D = a[12],
            C = a[13],
            G = a[14];
            a = a[15];
            var H = b[0],
            J = b[1],
            w = b[2],
            z = b[3],
            E = b[4],
            F = b[5],
            I = b[6],
            K = b[7],
            L = b[8],
            M = b[9],
            N = b[10],
            O = b[11],
            P = b[12],
            Q = b[13],
            R = b[14];
            b = b[15];
            return Math.abs(c - H) <= h.EPSILON * Math.max(1, Math.abs(c), Math.abs(H)) && Math.abs(d - J) <= h.EPSILON * Math.max(1, Math.abs(d), Math.abs(J)) && Math.abs(e - w) <= h.EPSILON * Math.max(1, Math.abs(e), Math.abs(w)) && Math.abs(g - z) <= h.EPSILON * Math.max(1, Math.abs(g), Math.abs(z)) && Math.abs(k - E) <= h.EPSILON * Math.max(1, Math.abs(k), Math.abs(E)) && Math.abs(t - F) <= h.EPSILON * Math.max(1, Math.abs(t), Math.abs(F)) && Math.abs(y - I) <= h.EPSILON * Math.max(1, Math.abs(y), Math.abs(I)) && Math.abs(l - K) <= h.EPSILON * Math.max(1, Math.abs(l), Math.abs(K)) && Math.abs(x - L) <= h.EPSILON * Math.max(1, Math.abs(x), Math.abs(L)) && Math.abs(u - M) <= h.EPSILON * Math.max(1, Math.abs(u), Math.abs(M)) && Math.abs(B - N) <= h.EPSILON * Math.max(1, Math.abs(B), Math.abs(N)) && Math.abs(A - O) <= h.EPSILON * Math.max(1, Math.abs(A), Math.abs(O)) && Math.abs(D - P) <= h.EPSILON * Math.max(1, Math.abs(D), Math.abs(P)) && Math.abs(C - Q) <= h.EPSILON * Math.max(1, Math.abs(C), Math.abs(Q)) && Math.abs(G - R) <= h.EPSILON * Math.max(1, Math.abs(G), Math.abs(R)) && Math.abs(a - b) <= h.EPSILON * Math.max(1, Math.abs(a), Math.abs(b))
        };
        a.sub = a.mul = undefined;
        var h = function(a) {
            if (a && a.__esModule) return a;
            var b = {};
            if (null != a) for (var c in a) if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = fa && ea ? ea(a, c) : {};
                d.get || d.set ? fa(b, c, d) : b[c] = a[c]
            }
            b.
        default = a;
            return b
        } (Ka);
        a.mul = d;
        a.sub = g
    });
    T(Id);
    var Jd = O(function(c, a) {
        function b() {
            var a = new q.ARRAY_TYPE(3);
            q.ARRAY_TYPE != Float32Array && (a[0] = 0, a[1] = 0, a[2] = 0);
            return a
        }
        function d(a) {
            var b = a[0],
            c = a[1];
            a = a[2];
            return Math.sqrt(b * b + c * c + a * a)
        }
        function e(a, b, c) {
            var d = new q.ARRAY_TYPE(3);
            d[0] = a;
            d[1] = b;
            d[2] = c;
            return d
        }
        function g(a, b, c) {
            a[0] = b[0] - c[0];
            a[1] = b[1] - c[1];
            a[2] = b[2] - c[2];
            return a
        }
        function h(a, b, c) {
            a[0] = b[0] * c[0];
            a[1] = b[1] * c[1];
            a[2] = b[2] * c[2];
            return a
        }
        function k(a, b, c) {
            a[0] = b[0] / c[0];
            a[1] = b[1] / c[1];
            a[2] = b[2] / c[2];
            return a
        }
        function l(a, b) {
            var c = b[0] - a[0],
            d = b[1] - a[1];
            a = b[2] - a[2];
            return Math.sqrt(c * c + d * d + a * a)
        }
        function m(a, b) {
            var c = b[0] - a[0],
            d = b[1] - a[1];
            a = b[2] - a[2];
            return c * c + d * d + a * a
        }
        function p(a) {
            var b = a[0],
            c = a[1];
            a = a[2];
            return b * b + c * c + a * a
        }
        function n(a, b) {
            var c = b[0],
            d = b[1],
            e = b[2];
            c = c * c + d * d + e * e;
            0 < c && (c = 1 / Math.sqrt(c));
            a[0] = b[0] * c;
            a[1] = b[1] * c;
            a[2] = b[2] * c;
            return a
        }
        function r(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
        }
        Object.defineProperty(a, "__esModule", {
            value: true
        });
        a.create = b;
        a.clone = function(a) {
            var b = new q.ARRAY_TYPE(3);
            b[0] = a[0];
            b[1] = a[1];
            b[2] = a[2];
            return b
        };
        a.length = d;
        a.fromValues = e;
        a.copy = function(a, b) {
            a[0] = b[0];
            a[1] = b[1];
            a[2] = b[2];
            return a
        };
        a.set = function(a, b, c, d) {
            a[0] = b;
            a[1] = c;
            a[2] = d;
            return a
        };
        a.add = function(a, b, c) {
            a[0] = b[0] + c[0];
            a[1] = b[1] + c[1];
            a[2] = b[2] + c[2];
            return a
        };
        a.subtract = g;
        a.multiply = h;
        a.divide = k;
        a.ceil = function(a, b) {
            a[0] = Math.ceil(b[0]);
            a[1] = Math.ceil(b[1]);
            a[2] = Math.ceil(b[2]);
            return a
        };
        a.floor = function(a, b) {
            a[0] = Math.floor(b[0]);
            a[1] = Math.floor(b[1]);
            a[2] = Math.floor(b[2]);
            return a
        };
        a.min = function(a, b, c) {
            a[0] = Math.min(b[0], c[0]);
            a[1] = Math.min(b[1], c[1]);
            a[2] = Math.min(b[2], c[2]);
            return a
        };
        a.max = function(a, b, c) {
            a[0] = Math.max(b[0], c[0]);
            a[1] = Math.max(b[1], c[1]);
            a[2] = Math.max(b[2], c[2]);
            return a
        };
        a.round = function(a, b) {
            a[0] = Math.round(b[0]);
            a[1] = Math.round(b[1]);
            a[2] = Math.round(b[2]);
            return a
        };
        a.scale = function(a, b, c) {
            a[0] = b[0] * c;
            a[1] = b[1] * c;
            a[2] = b[2] * c;
            return a
        };
        a.scaleAndAdd = function(a, b, c, d) {
            a[0] = b[0] + c[0] * d;
            a[1] = b[1] + c[1] * d;
            a[2] = b[2] + c[2] * d;
            return a
        };
        a.distance = l;
        a.squaredDistance = m;
        a.squaredLength = p;
        a.negate = function(a, b) {
            a[0] = -b[0];
            a[1] = -b[1];
            a[2] = -b[2];
            return a
        };
        a.inverse = function(a, b) {
            a[0] = 1 / b[0];
            a[1] = 1 / b[1];
            a[2] = 1 / b[2];
            return a
        };
        a.normalize = n;
        a.dot = r;
        a.cross = function(a, b, c) {
            var d = b[0],
            e = b[1];
            b = b[2];
            var g = c[0],
            n = c[1];
            c = c[2];
            a[0] = e * c - b * n;
            a[1] = b * g - d * c;
            a[2] = d * n - e * g;
            return a
        };
        a.lerp = function(a, b, c, d) {
            var e = b[0],
            g = b[1];
            b = b[2];
            a[0] = e + d * (c[0] - e);
            a[1] = g + d * (c[1] - g);
            a[2] = b + d * (c[2] - b);
            return a
        };
        a.hermite = function(a, b, c, d, e, g) {
            var n = g * g,
            h = n * (2 * g - 3) + 1,
            k = n * (g - 2) + g,
            r = n * (g - 1);
            g = n * (3 - 2 * g);
            a[0] = b[0] * h + c[0] * k + d[0] * r + e[0] * g;
            a[1] = b[1] * h + c[1] * k + d[1] * r + e[1] * g;
            a[2] = b[2] * h + c[2] * k + d[2] * r + e[2] * g;
            return a
        };
        a.bezier = function(a, b, c, d, e, g) {
            var n = 1 - g,
            h = n * n,
            k = g * g,
            r = h * n;
            h *= 3 * g;
            n *= 3 * k;
            g *= k;
            a[0] = b[0] * r + c[0] * h + d[0] * n + e[0] * g;
            a[1] = b[1] * r + c[1] * h + d[1] * n + e[1] * g;
            a[2] = b[2] * r + c[2] * h + d[2] * n + e[2] * g;
            return a
        };
        a.random = function(a, b) {
            b = b || 1;
            var c = 2 * q.RANDOM() * Math.PI,
            d = 2 * q.RANDOM() - 1,
            e = Math.sqrt(1 - d * d) * b;
            a[0] = Math.cos(c) * e;
            a[1] = Math.sin(c) * e;
            a[2] = d * b;
            return a
        };
        a.transformMat4 = function(a, b, c) {
            var d = b[0],
            e = b[1];
            b = b[2];
            var g = c[3] * d + c[7] * e + c[11] * b + c[15];
            g = g || 1;
            a[0] = (c[0] * d + c[4] * e + c[8] * b + c[12]) / g;
            a[1] = (c[1] * d + c[5] * e + c[9] * b + c[13]) / g;
            a[2] = (c[2] * d + c[6] * e + c[10] * b + c[14]) / g;
            return a
        };
        a.transformMat3 = function(a, b, c) {
            var d = b[0],
            e = b[1];
            b = b[2];
            a[0] = d * c[0] + e * c[3] + b * c[6];
            a[1] = d * c[1] + e * c[4] + b * c[7];
            a[2] = d * c[2] + e * c[5] + b * c[8];
            return a
        };
        a.transformQuat = function(a, b, c) {
            var d = c[0],
            e = c[1],
            g = c[2],
            n = b[0],
            h = b[1];
            b = b[2];
            var k = e * b - g * h,
            r = g * n - d * b,
            q = d * h - e * n;
            c = 2 * c[3];
            a[0] = n + k * c + 2 * (e * q - g * r);
            a[1] = h + r * c + 2 * (g * k - d * q);
            a[2] = b + q * c + 2 * (d * r - e * k);
            return a
        };
        a.rotateX = function(a, b, c, d) {
            var e = [],
            g = [];
            e[0] = b[0] - c[0];
            e[1] = b[1] - c[1];
            e[2] = b[2] - c[2];
            g[0] = e[0];
            g[1] = e[1] * Math.cos(d) - e[2] * Math.sin(d);
            g[2] = e[1] * Math.sin(d) + e[2] * Math.cos(d);
            a[0] = g[0] + c[0];
            a[1] = g[1] + c[1];
            a[2] = g[2] + c[2];
            return a
        };
        a.rotateY = function(a, b, c, d) {
            var e = [],
            g = [];
            e[0] = b[0] - c[0];
            e[1] = b[1] - c[1];
            e[2] = b[2] - c[2];
            g[0] = e[2] * Math.sin(d) + e[0] * Math.cos(d);
            g[1] = e[1];
            g[2] = e[2] * Math.cos(d) - e[0] * Math.sin(d);
            a[0] = g[0] + c[0];
            a[1] = g[1] + c[1];
            a[2] = g[2] + c[2];
            return a
        };
        a.rotateZ = function(a, b, c, d) {
            var e = [],
            g = [];
            e[0] = b[0] - c[0];
            e[1] = b[1] - c[1];
            e[2] = b[2] - c[2];
            g[0] = e[0] * Math.cos(d) - e[1] * Math.sin(d);
            g[1] = e[0] * Math.sin(d) + e[1] * Math.cos(d);
            g[2] = e[2];
            a[0] = g[0] + c[0];
            a[1] = g[1] + c[1];
            a[2] = g[2] + c[2];
            return a
        };
        a.angle = function(a, b) {
            a = e(a[0], a[1], a[2]);
            b = e(b[0], b[1], b[2]);
            n(a, a);
            n(b, b);
            b = r(a, b);
            return 1 < b ? 0 : -1 > b ? Math.PI: Math.acos(b)
        };
        a.zero = function(a) {
            a[0] = 0;
            a[1] = 0;
            a[2] = 0;
            return a
        };
        a.str = function(a) {
            return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")"
        };
        a.exactEquals = function(a, b) {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2]
        };
        a.equals = function(a, b) {
            var c = a[0],
            d = a[1];
            a = a[2];
            var e = b[0],
            g = b[1];
            b = b[2];
            return Math.abs(c - e) <= q.EPSILON * Math.max(1, Math.abs(c), Math.abs(e)) && Math.abs(d - g) <= q.EPSILON * Math.max(1, Math.abs(d), Math.abs(g)) && Math.abs(a - b) <= q.EPSILON * Math.max(1, Math.abs(a), Math.abs(b))
        };
        a.forEach = a.sqrLen = a.len = a.sqrDist = a.dist = a.div = a.mul = a.sub = undefined;
        var q = function(a) {
            if (a && a.__esModule) return a;
            var b = {};
            if (null != a) for (var c in a) if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = fa && ea ? ea(a, c) : {};
                d.get || d.set ? fa(b, c, d) : b[c] = a[c]
            }
            b.
        default = a;
            return b
        } (Ka);
        a.sub = g;
        a.mul = h;
        a.div = k;
        a.dist = l;
        a.sqrDist = m;
        a.len = d;
        a.sqrLen = p;
        c = function() {
            var a = b();
            return function(b, c, d, e, g, n) {
                c || (c = 3);
                d || (d = 0);
                for (e = e ? Math.min(e * c + d, b.length) : b.length; d < e; d += c) a[0] = b[d],
                a[1] = b[d + 1],
                a[2] = b[d + 2],
                g(a, a, n),
                b[d] = a[0],
                b[d + 1] = a[1],
                b[d + 2] = a[2];
                return b
            }
        } ();
        a.forEach = c
    });
    T(Jd);
    var Kd = O(function(c, a) {
        function b() {
            var a = new p.ARRAY_TYPE(4);
            p.ARRAY_TYPE != Float32Array && (a[0] = 0, a[1] = 0, a[2] = 0, a[3] = 0);
            return a
        }
        function d(a, b, c) {
            a[0] = b[0] - c[0];
            a[1] = b[1] - c[1];
            a[2] = b[2] - c[2];
            a[3] = b[3] - c[3];
            return a
        }
        function e(a, b, c) {
            a[0] = b[0] * c[0];
            a[1] = b[1] * c[1];
            a[2] = b[2] * c[2];
            a[3] = b[3] * c[3];
            return a
        }
        function g(a, b, c) {
            a[0] = b[0] / c[0];
            a[1] = b[1] / c[1];
            a[2] = b[2] / c[2];
            a[3] = b[3] / c[3];
            return a
        }
        function h(a, b) {
            var c = b[0] - a[0],
            d = b[1] - a[1],
            e = b[2] - a[2];
            a = b[3] - a[3];
            return Math.sqrt(c * c + d * d + e * e + a * a)
        }
        function k(a, b) {
            var c = b[0] - a[0],
            d = b[1] - a[1],
            e = b[2] - a[2];
            a = b[3] - a[3];
            return c * c + d * d + e * e + a * a
        }
        function l(a) {
            var b = a[0],
            c = a[1],
            d = a[2];
            a = a[3];
            return Math.sqrt(b * b + c * c + d * d + a * a)
        }
        function m(a) {
            var b = a[0],
            c = a[1],
            d = a[2];
            a = a[3];
            return b * b + c * c + d * d + a * a
        }
        Object.defineProperty(a, "__esModule", {
            value: true
        });
        a.create = b;
        a.clone = function(a) {
            var b = new p.ARRAY_TYPE(4);
            b[0] = a[0];
            b[1] = a[1];
            b[2] = a[2];
            b[3] = a[3];
            return b
        };
        a.fromValues = function(a, b, c, d) {
            var e = new p.ARRAY_TYPE(4);
            e[0] = a;
            e[1] = b;
            e[2] = c;
            e[3] = d;
            return e
        };
        a.copy = function(a, b) {
            a[0] = b[0];
            a[1] = b[1];
            a[2] = b[2];
            a[3] = b[3];
            return a
        };
        a.set = function(a, b, c, d, e) {
            a[0] = b;
            a[1] = c;
            a[2] = d;
            a[3] = e;
            return a
        };
        a.add = function(a, b, c) {
            a[0] = b[0] + c[0];
            a[1] = b[1] + c[1];
            a[2] = b[2] + c[2];
            a[3] = b[3] + c[3];
            return a
        };
        a.subtract = d;
        a.multiply = e;
        a.divide = g;
        a.ceil = function(a, b) {
            a[0] = Math.ceil(b[0]);
            a[1] = Math.ceil(b[1]);
            a[2] = Math.ceil(b[2]);
            a[3] = Math.ceil(b[3]);
            return a
        };
        a.floor = function(a, b) {
            a[0] = Math.floor(b[0]);
            a[1] = Math.floor(b[1]);
            a[2] = Math.floor(b[2]);
            a[3] = Math.floor(b[3]);
            return a
        };
        a.min = function(a, b, c) {
            a[0] = Math.min(b[0], c[0]);
            a[1] = Math.min(b[1], c[1]);
            a[2] = Math.min(b[2], c[2]);
            a[3] = Math.min(b[3], c[3]);
            return a
        };
        a.max = function(a, b, c) {
            a[0] = Math.max(b[0], c[0]);
            a[1] = Math.max(b[1], c[1]);
            a[2] = Math.max(b[2], c[2]);
            a[3] = Math.max(b[3], c[3]);
            return a
        };
        a.round = function(a, b) {
            a[0] = Math.round(b[0]);
            a[1] = Math.round(b[1]);
            a[2] = Math.round(b[2]);
            a[3] = Math.round(b[3]);
            return a
        };
        a.scale = function(a, b, c) {
            a[0] = b[0] * c;
            a[1] = b[1] * c;
            a[2] = b[2] * c;
            a[3] = b[3] * c;
            return a
        };
        a.scaleAndAdd = function(a, b, c, d) {
            a[0] = b[0] + c[0] * d;
            a[1] = b[1] + c[1] * d;
            a[2] = b[2] + c[2] * d;
            a[3] = b[3] + c[3] * d;
            return a
        };
        a.distance = h;
        a.squaredDistance = k;
        a.length = l;
        a.squaredLength = m;
        a.negate = function(a, b) {
            a[0] = -b[0];
            a[1] = -b[1];
            a[2] = -b[2];
            a[3] = -b[3];
            return a
        };
        a.inverse = function(a, b) {
            a[0] = 1 / b[0];
            a[1] = 1 / b[1];
            a[2] = 1 / b[2];
            a[3] = 1 / b[3];
            return a
        };
        a.normalize = function(a, b) {
            var c = b[0],
            d = b[1],
            e = b[2];
            b = b[3];
            var g = c * c + d * d + e * e + b * b;
            0 < g && (g = 1 / Math.sqrt(g));
            a[0] = c * g;
            a[1] = d * g;
            a[2] = e * g;
            a[3] = b * g;
            return a
        };
        a.dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
        };
        a.cross = function(a, b, c, d) {
            var e = c[0] * d[1] - c[1] * d[0],
            g = c[0] * d[2] - c[2] * d[0],
            h = c[0] * d[3] - c[3] * d[0],
            k = c[1] * d[2] - c[2] * d[1],
            n = c[1] * d[3] - c[3] * d[1];
            c = c[2] * d[3] - c[3] * d[2];
            d = b[0];
            var r = b[1],
            q = b[2];
            b = b[3];
            a[0] = r * c - q * n + b * k;
            a[1] = -(d * c) + q * h - b * g;
            a[2] = d * n - r * h + b * e;
            a[3] = -(d * k) + r * g - q * e;
            return a
        };
        a.lerp = function(a, b, c, d) {
            var e = b[0],
            g = b[1],
            h = b[2];
            b = b[3];
            a[0] = e + d * (c[0] - e);
            a[1] = g + d * (c[1] - g);
            a[2] = h + d * (c[2] - h);
            a[3] = b + d * (c[3] - b);
            return a
        };
        a.random = function(a, b) {
            b = b || 1;
            do {
                var c = 2 * p.RANDOM() - 1;
                var d = 2 * p.RANDOM() - 1;
                var e = c * c + d * d
            } while ( 1 <= e );
            do {
                var g = 2 * p.RANDOM() - 1;
                var h = 2 * p.RANDOM() - 1;
                var k = g * g + h * h
            } while ( 1 <= k );
            e = Math.sqrt((1 - e) / k);
            a[0] = b * c;
            a[1] = b * d;
            a[2] = b * g * e;
            a[3] = b * h * e;
            return a
        };
        a.transformMat4 = function(a, b, c) {
            var d = b[0],
            e = b[1],
            g = b[2];
            b = b[3];
            a[0] = c[0] * d + c[4] * e + c[8] * g + c[12] * b;
            a[1] = c[1] * d + c[5] * e + c[9] * g + c[13] * b;
            a[2] = c[2] * d + c[6] * e + c[10] * g + c[14] * b;
            a[3] = c[3] * d + c[7] * e + c[11] * g + c[15] * b;
            return a
        };
        a.transformQuat = function(a, b, c) {
            var d = b[0],
            e = b[1],
            g = b[2],
            h = c[0],
            k = c[1],
            n = c[2];
            c = c[3];
            var r = c * d + k * g - n * e,
            q = c * e + n * d - h * g,
            l = c * g + h * e - k * d;
            d = -h * d - k * e - n * g;
            a[0] = r * c + d * -h + q * -n - l * -k;
            a[1] = q * c + d * -k + l * -h - r * -n;
            a[2] = l * c + d * -n + r * -k - q * -h;
            a[3] = b[3];
            return a
        };
        a.zero = function(a) {
            a[0] = 0;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            return a
        };
        a.str = function(a) {
            return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")"
        };
        a.exactEquals = function(a, b) {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3]
        };
        a.equals = function(a, b) {
            var c = a[0],
            d = a[1],
            e = a[2];
            a = a[3];
            var g = b[0],
            h = b[1],
            k = b[2];
            b = b[3];
            return Math.abs(c - g) <= p.EPSILON * Math.max(1, Math.abs(c), Math.abs(g)) && Math.abs(d - h) <= p.EPSILON * Math.max(1, Math.abs(d), Math.abs(h)) && Math.abs(e - k) <= p.EPSILON * Math.max(1, Math.abs(e), Math.abs(k)) && Math.abs(a - b) <= p.EPSILON * Math.max(1, Math.abs(a), Math.abs(b))
        };
        a.forEach = a.sqrLen = a.len = a.sqrDist = a.dist = a.div = a.mul = a.sub = undefined;
        var p = function(a) {
            if (a && a.__esModule) return a;
            var b = {};
            if (null != a) for (var c in a) if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = fa && ea ? ea(a, c) : {};
                d.get || d.set ? fa(b, c, d) : b[c] = a[c]
            }
            b.
        default = a;
            return b
        } (Ka);
        a.sub = d;
        a.mul = e;
        a.div = g;
        a.dist = h;
        a.sqrDist = k;
        a.len = l;
        a.sqrLen = m;
        c = function() {
            var a = b();
            return function(b, c, d, e, g, h) {
                c || (c = 4);
                d || (d = 0);
                for (e = e ? Math.min(e * c + d, b.length) : b.length; d < e; d += c) a[0] = b[d],
                a[1] = b[d + 1],
                a[2] = b[d + 2],
                a[3] = b[d + 3],
                g(a, a, h),
                b[d] = a[0],
                b[d + 1] = a[1],
                b[d + 2] = a[2],
                b[d + 3] = a[3];
                return b
            }
        } ();
        a.forEach = c
    });
    T(Kd);
    var Ld = O(function(c, a) {
        function b(a) {
            if (a && a.__esModule) return a;
            var b = {};
            if (null != a) for (var c in a) if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = fa && ea ? ea(a, c) : {};
                d.get || d.set ? fa(b, c, d) : b[c] = a[c]
            }
            b.
        default = a;
            return b
        }
        function d() {
            var a = new l.ARRAY_TYPE(4);
            l.ARRAY_TYPE != Float32Array && (a[0] = 0, a[1] = 0, a[2] = 0);
            a[3] = 1;
            return a
        }
        function e(a, b, c) {
            c *= .5;
            var d = Math.sin(c);
            a[0] = d * b[0];
            a[1] = d * b[1];
            a[2] = d * b[2];
            a[3] = Math.cos(c);
            return a
        }
        function g(a, b, c) {
            var d = b[0],
            e = b[1],
            g = b[2];
            b = b[3];
            var h = c[0],
            k = c[1],
            n = c[2];
            c = c[3];
            a[0] = d * c + b * h + e * n - g * k;
            a[1] = e * c + b * k + g * h - d * n;
            a[2] = g * c + b * n + d * k - e * h;
            a[3] = b * c - d * h - e * k - g * n;
            return a
        }
        function h(a, b, c, d) {
            var e = b[0],
            g = b[1],
            h = b[2];
            b = b[3];
            var k = c[0],
            n = c[1],
            r = c[2];
            c = c[3];
            var q = e * k + g * n + h * r + b * c;
            0 > q && (q = -q, k = -k, n = -n, r = -r, c = -c);
            if (1 - q > l.EPSILON) {
                var m = Math.acos(q);
                var t = Math.sin(m);
                q = Math.sin((1 - d) * m) / t;
                d = Math.sin(d * m) / t
            } else q = 1 - d;
            a[0] = q * e + d * k;
            a[1] = q * g + d * n;
            a[2] = q * h + d * r;
            a[3] = q * b + d * c;
            return a
        }
        function k(a, b) {
            var c = b[0] + b[4] + b[8];
            if (0 < c) c = Math.sqrt(c + 1),
            a[3] = .5 * c,
            c = .5 / c,
            a[0] = (b[5] - b[7]) * c,
            a[1] = (b[6] - b[2]) * c,
            a[2] = (b[1] - b[3]) * c;
            else {
                var d = 0;
                b[4] > b[0] && (d = 1);
                b[8] > b[3 * d + d] && (d = 2);
                var e = (d + 1) % 3,
                g = (d + 2) % 3;
                c = Math.sqrt(b[3 * d + d] - b[3 * e + e] - b[3 * g + g] + 1);
                a[d] = .5 * c;
                c = .5 / c;
                a[3] = (b[3 * e + g] - b[3 * g + e]) * c;
                a[e] = (b[3 * e + d] + b[3 * d + e]) * c;
                a[g] = (b[3 * g + d] + b[3 * d + g]) * c
            }
            return a
        }
        Object.defineProperty(a, "__esModule", {
            value: true
        });
        a.create = d;
        a.identity = function(a) {
            a[0] = 0;
            a[1] = 0;
            a[2] = 0;
            a[3] = 1;
            return a
        };
        a.setAxisAngle = e;
        a.getAxisAngle = function(a, b) {
            var c = 2 * Math.acos(b[3]),
            d = Math.sin(c / 2);
            d > l.EPSILON ? (a[0] = b[0] / d, a[1] = b[1] / d, a[2] = b[2] / d) : (a[0] = 1, a[1] = 0, a[2] = 0);
            return c
        };
        a.multiply = g;
        a.rotateX = function(a, b, c) {
            c *= .5;
            var d = b[0],
            e = b[1],
            g = b[2];
            b = b[3];
            var h = Math.sin(c);
            c = Math.cos(c);
            a[0] = d * c + b * h;
            a[1] = e * c + g * h;
            a[2] = g * c - e * h;
            a[3] = b * c - d * h;
            return a
        };
        a.rotateY = function(a, b, c) {
            c *= .5;
            var d = b[0],
            e = b[1],
            g = b[2];
            b = b[3];
            var h = Math.sin(c);
            c = Math.cos(c);
            a[0] = d * c - g * h;
            a[1] = e * c + b * h;
            a[2] = g * c + d * h;
            a[3] = b * c - e * h;
            return a
        };
        a.rotateZ = function(a, b, c) {
            c *= .5;
            var d = b[0],
            e = b[1],
            g = b[2];
            b = b[3];
            var h = Math.sin(c);
            c = Math.cos(c);
            a[0] = d * c + e * h;
            a[1] = e * c - d * h;
            a[2] = g * c + b * h;
            a[3] = b * c - g * h;
            return a
        };
        a.calculateW = function(a, b) {
            var c = b[0],
            d = b[1];
            b = b[2];
            a[0] = c;
            a[1] = d;
            a[2] = b;
            a[3] = Math.sqrt(Math.abs(1 - c * c - d * d - b * b));
            return a
        };
        a.slerp = h;
        a.random = function(a) {
            var b = l.RANDOM(),
            c = l.RANDOM(),
            d = l.RANDOM(),
            e = Math.sqrt(1 - b);
            b = Math.sqrt(b);
            a[0] = e * Math.sin(2 * Math.PI * c);
            a[1] = e * Math.cos(2 * Math.PI * c);
            a[2] = b * Math.sin(2 * Math.PI * d);
            a[3] = b * Math.cos(2 * Math.PI * d);
            return a
        };
        a.invert = function(a, b) {
            var c = b[0],
            d = b[1],
            e = b[2];
            b = b[3];
            var g = c * c + d * d + e * e + b * b;
            g = g ? 1 / g: 0;
            a[0] = -c * g;
            a[1] = -d * g;
            a[2] = -e * g;
            a[3] = b * g;
            return a
        };
        a.conjugate = function(a, b) {
            a[0] = -b[0];
            a[1] = -b[1];
            a[2] = -b[2];
            a[3] = b[3];
            return a
        };
        a.fromMat3 = k;
        a.fromEuler = function(a, b, c, d) {
            var e = .5 * Math.PI / 180;
            b *= e;
            c *= e;
            d *= e;
            e = Math.sin(b);
            b = Math.cos(b);
            var g = Math.sin(c);
            c = Math.cos(c);
            var h = Math.sin(d);
            d = Math.cos(d);
            a[0] = e * c * d - b * g * h;
            a[1] = b * g * d + e * c * h;
            a[2] = b * c * h - e * g * d;
            a[3] = b * c * d + e * g * h;
            return a
        };
        a.str = function(a) {
            return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")"
        };
        a.setAxes = a.sqlerp = a.rotationTo = a.equals = a.exactEquals = a.normalize = a.sqrLen = a.squaredLength = a.len = a.length = a.lerp = a.dot = a.scale = a.mul = a.add = a.set = a.copy = a.fromValues = a.clone = undefined;
        var l = b(Ka),
        m = b(Hd),
        p = b(Jd);
        c = b(Kd);
        a.clone = c.clone;
        a.fromValues = c.fromValues;
        a.copy = c.copy;
        a.set = c.set;
        a.add = c.add;
        a.mul = g;
        a.scale = c.scale;
        a.dot = c.dot;
        a.lerp = c.lerp;
        var n = c.length;
        a.length = n;
        a.len = n;
        n = c.squaredLength;
        a.squaredLength = n;
        a.sqrLen = n;
        var r = c.normalize;
        a.normalize = r;
        a.exactEquals = c.exactEquals;
        a.equals = c.equals;
        c = function() {
            var a = p.create(),
            b = p.fromValues(1, 0, 0),
            c = p.fromValues(0, 1, 0);
            return function(d, g, h) {
                var k = p.dot(g, h);
                if ( - .999999 > k) return p.cross(a, b, g),
                1E-6 > p.len(a) && p.cross(a, c, g),
                p.normalize(a, a),
                e(d, a, Math.PI),
                d;
                if (.999999 < k) return d[0] = 0,
                d[1] = 0,
                d[2] = 0,
                d[3] = 1,
                d;
                p.cross(a, g, h);
                d[0] = a[0];
                d[1] = a[1];
                d[2] = a[2];
                d[3] = 1 + k;
                return r(d, d)
            }
        } ();
        a.rotationTo = c;
        c = function() {
            var a = d(),
            b = d();
            return function(c, d, e, g, k, n) {
                h(a, d, k, n);
                h(b, e, g, n);
                h(c, a, b, 2 * n * (1 - n));
                return c
            }
        } ();
        a.sqlerp = c;
        c = function() {
            var a = m.create();
            return function(b, c, d, e) {
                a[0] = d[0];
                a[3] = d[1];
                a[6] = d[2];
                a[1] = e[0];
                a[4] = e[1];
                a[7] = e[2];
                a[2] = -c[0];
                a[5] = -c[1];
                a[8] = -c[2];
                return r(b, k(b, a))
            }
        } ();
        a.setAxes = c
    });
    T(Ld);
    var Bf = O(function(c, a) {
        function b(a) {
            if (a && a.__esModule) return a;
            var b = {};
            if (null != a) for (var c in a) if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = fa && ea ? ea(a, c) : {};
                d.get || d.set ? fa(b, c, d) : b[c] = a[c]
            }
            b.
        default = a;
            return b
        }
        function d(a, b, c) {
            var d = .5 * c[0],
            e = .5 * c[1];
            c = .5 * c[2];
            var g = b[0],
            h = b[1],
            k = b[2];
            b = b[3];
            a[0] = g;
            a[1] = h;
            a[2] = k;
            a[3] = b;
            a[4] = d * b + e * k - c * h;
            a[5] = e * b + c * g - d * k;
            a[6] = c * b + d * h - e * g;
            a[7] = -d * g - e * h - c * k;
            return a
        }
        function e(a, b) {
            a[0] = b[0];
            a[1] = b[1];
            a[2] = b[2];
            a[3] = b[3];
            a[4] = b[4];
            a[5] = b[5];
            a[6] = b[6];
            a[7] = b[7];
            return a
        }
        function g(a, b, c) {
            var d = b[0],
            e = b[1],
            g = b[2],
            h = b[3],
            k = c[4],
            n = c[5],
            r = c[6],
            l = c[7],
            q = b[4],
            m = b[5],
            p = b[6];
            b = b[7];
            var J = c[0],
            w = c[1],
            z = c[2];
            c = c[3];
            a[0] = d * c + h * J + e * z - g * w;
            a[1] = e * c + h * w + g * J - d * z;
            a[2] = g * c + h * z + d * w - e * J;
            a[3] = h * c - d * J - e * w - g * z;
            a[4] = d * l + h * k + e * r - g * n + q * c + b * J + m * z - p * w;
            a[5] = e * l + h * n + g * k - d * r + m * c + b * w + p * J - q * z;
            a[6] = g * l + h * r + d * n - e * k + p * c + b * z + q * w - m * J;
            a[7] = h * l - d * k - e * n - g * r + b * c - q * J - m * w - p * z;
            return a
        }
        Object.defineProperty(a, "__esModule", {
            value: true
        });
        a.create = function() {
            var a = new h.ARRAY_TYPE(8);
            h.ARRAY_TYPE != Float32Array && (a[0] = 0, a[1] = 0, a[2] = 0, a[4] = 0, a[5] = 0, a[6] = 0, a[7] = 0);
            a[3] = 1;
            return a
        };
        a.clone = function(a) {
            var b = new h.ARRAY_TYPE(8);
            b[0] = a[0];
            b[1] = a[1];
            b[2] = a[2];
            b[3] = a[3];
            b[4] = a[4];
            b[5] = a[5];
            b[6] = a[6];
            b[7] = a[7];
            return b
        };
        a.fromValues = function(a, b, c, d, e, g, k, l) {
            var n = new h.ARRAY_TYPE(8);
            n[0] = a;
            n[1] = b;
            n[2] = c;
            n[3] = d;
            n[4] = e;
            n[5] = g;
            n[6] = k;
            n[7] = l;
            return n
        };
        a.fromRotationTranslationValues = function(a, b, c, d, e, g, k) {
            var n = new h.ARRAY_TYPE(8);
            n[0] = a;
            n[1] = b;
            n[2] = c;
            n[3] = d;
            e *= .5;
            g *= .5;
            k *= .5;
            n[4] = e * d + g * c - k * b;
            n[5] = g * d + k * a - e * c;
            n[6] = k * d + e * b - g * a;
            n[7] = -e * a - g * b - k * c;
            return n
        };
        a.fromRotationTranslation = d;
        a.fromTranslation = function(a, b) {
            a[0] = 0;
            a[1] = 0;
            a[2] = 0;
            a[3] = 1;
            a[4] = .5 * b[0];
            a[5] = .5 * b[1];
            a[6] = .5 * b[2];
            a[7] = 0;
            return a
        };
        a.fromRotation = function(a, b) {
            a[0] = b[0];
            a[1] = b[1];
            a[2] = b[2];
            a[3] = b[3];
            a[4] = 0;
            a[5] = 0;
            a[6] = 0;
            a[7] = 0;
            return a
        };
        a.fromMat4 = function(a, b) {
            var c = k.create();
            l.getRotation(c, b);
            var e = new h.ARRAY_TYPE(3);
            l.getTranslation(e, b);
            d(a, c, e);
            return a
        };
        a.copy = e;
        a.identity = function(a) {
            a[0] = 0;
            a[1] = 0;
            a[2] = 0;
            a[3] = 1;
            a[4] = 0;
            a[5] = 0;
            a[6] = 0;
            a[7] = 0;
            return a
        };
        a.set = function(a, b, c, d, e, g, h, k, l) {
            a[0] = b;
            a[1] = c;
            a[2] = d;
            a[3] = e;
            a[4] = g;
            a[5] = h;
            a[6] = k;
            a[7] = l;
            return a
        };
        a.getDual = function(a, b) {
            a[0] = b[4];
            a[1] = b[5];
            a[2] = b[6];
            a[3] = b[7];
            return a
        };
        a.setDual = function(a, b) {
            a[4] = b[0];
            a[5] = b[1];
            a[6] = b[2];
            a[7] = b[3];
            return a
        };
        a.getTranslation = function(a, b) {
            var c = b[4],
            d = b[5],
            e = b[6],
            g = b[7],
            h = -b[0],
            k = -b[1],
            n = -b[2];
            b = b[3];
            a[0] = 2 * (c * b + g * h + d * n - e * k);
            a[1] = 2 * (d * b + g * k + e * h - c * n);
            a[2] = 2 * (e * b + g * n + c * k - d * h);
            return a
        };
        a.translate = function(a, b, c) {
            var d = b[0],
            e = b[1],
            g = b[2],
            h = b[3],
            k = .5 * c[0],
            n = .5 * c[1];
            c = .5 * c[2];
            var r = b[4],
            l = b[5],
            m = b[6];
            b = b[7];
            a[0] = d;
            a[1] = e;
            a[2] = g;
            a[3] = h;
            a[4] = h * k + e * c - g * n + r;
            a[5] = h * n + g * k - d * c + l;
            a[6] = h * c + d * n - e * k + m;
            a[7] = -d * k - e * n - g * c + b;
            return a
        };
        a.rotateX = function(a, b, c) {
            var d = -b[0],
            e = -b[1],
            g = -b[2],
            h = b[3],
            n = b[4],
            l = b[5],
            r = b[6],
            m = b[7],
            q = n * h + m * d + l * g - r * e,
            p = l * h + m * e + r * d - n * g,
            H = r * h + m * g + n * e - l * d;
            n = m * h - n * d - l * e - r * g;
            k.rotateX(a, b, c);
            d = a[0];
            e = a[1];
            g = a[2];
            h = a[3];
            a[4] = q * h + n * d + p * g - H * e;
            a[5] = p * h + n * e + H * d - q * g;
            a[6] = H * h + n * g + q * e - p * d;
            a[7] = n * h - q * d - p * e - H * g;
            return a
        };
        a.rotateY = function(a, b, c) {
            var d = -b[0],
            e = -b[1],
            g = -b[2],
            h = b[3],
            n = b[4],
            l = b[5],
            r = b[6],
            m = b[7],
            q = n * h + m * d + l * g - r * e,
            p = l * h + m * e + r * d - n * g,
            H = r * h + m * g + n * e - l * d;
            n = m * h - n * d - l * e - r * g;
            k.rotateY(a, b, c);
            d = a[0];
            e = a[1];
            g = a[2];
            h = a[3];
            a[4] = q * h + n * d + p * g - H * e;
            a[5] = p * h + n * e + H * d - q * g;
            a[6] = H * h + n * g + q * e - p * d;
            a[7] = n * h - q * d - p * e - H * g;
            return a
        };
        a.rotateZ = function(a, b, c) {
            var d = -b[0],
            e = -b[1],
            g = -b[2],
            h = b[3],
            n = b[4],
            l = b[5],
            r = b[6],
            m = b[7],
            q = n * h + m * d + l * g - r * e,
            p = l * h + m * e + r * d - n * g,
            H = r * h + m * g + n * e - l * d;
            n = m * h - n * d - l * e - r * g;
            k.rotateZ(a, b, c);
            d = a[0];
            e = a[1];
            g = a[2];
            h = a[3];
            a[4] = q * h + n * d + p * g - H * e;
            a[5] = p * h + n * e + H * d - q * g;
            a[6] = H * h + n * g + q * e - p * d;
            a[7] = n * h - q * d - p * e - H * g;
            return a
        };
        a.rotateByQuatAppend = function(a, b, c) {
            var d = c[0],
            e = c[1],
            g = c[2];
            c = c[3];
            var h = b[0],
            k = b[1],
            n = b[2],
            l = b[3];
            a[0] = h * c + l * d + k * g - n * e;
            a[1] = k * c + l * e + n * d - h * g;
            a[2] = n * c + l * g + h * e - k * d;
            a[3] = l * c - h * d - k * e - n * g;
            h = b[4];
            k = b[5];
            n = b[6];
            l = b[7];
            a[4] = h * c + l * d + k * g - n * e;
            a[5] = k * c + l * e + n * d - h * g;
            a[6] = n * c + l * g + h * e - k * d;
            a[7] = l * c - h * d - k * e - n * g;
            return a
        };
        a.rotateByQuatPrepend = function(a, b, c) {
            var d = b[0],
            e = b[1],
            g = b[2];
            b = b[3];
            var h = c[0],
            k = c[1],
            n = c[2],
            l = c[3];
            a[0] = d * l + b * h + e * n - g * k;
            a[1] = e * l + b * k + g * h - d * n;
            a[2] = g * l + b * n + d * k - e * h;
            a[3] = b * l - d * h - e * k - g * n;
            h = c[4];
            k = c[5];
            n = c[6];
            l = c[7];
            a[4] = d * l + b * h + e * n - g * k;
            a[5] = e * l + b * k + g * h - d * n;
            a[6] = g * l + b * n + d * k - e * h;
            a[7] = b * l - d * h - e * k - g * n;
            return a
        };
        a.rotateAroundAxis = function(a, b, c, d) {
            if (Math.abs(d) < h.EPSILON) return e(a, b);
            var g = Math.sqrt(c[0] * c[0] + c[1] * c[1] + c[2] * c[2]);
            d *= .5;
            var k = Math.sin(d),
            n = k * c[0] / g,
            l = k * c[1] / g;
            c = k * c[2] / g;
            d = Math.cos(d);
            g = b[0];
            k = b[1];
            var m = b[2],
            r = b[3];
            a[0] = g * d + r * n + k * c - m * l;
            a[1] = k * d + r * l + m * n - g * c;
            a[2] = m * d + r * c + g * l - k * n;
            a[3] = r * d - g * n - k * l - m * c;
            g = b[4];
            k = b[5];
            m = b[6];
            b = b[7];
            a[4] = g * d + b * n + k * c - m * l;
            a[5] = k * d + b * l + m * n - g * c;
            a[6] = m * d + b * c + g * l - k * n;
            a[7] = b * d - g * n - k * l - m * c;
            return a
        };
        a.add = function(a, b, c) {
            a[0] = b[0] + c[0];
            a[1] = b[1] + c[1];
            a[2] = b[2] + c[2];
            a[3] = b[3] + c[3];
            a[4] = b[4] + c[4];
            a[5] = b[5] + c[5];
            a[6] = b[6] + c[6];
            a[7] = b[7] + c[7];
            return a
        };
        a.multiply = g;
        a.scale = function(a, b, c) {
            a[0] = b[0] * c;
            a[1] = b[1] * c;
            a[2] = b[2] * c;
            a[3] = b[3] * c;
            a[4] = b[4] * c;
            a[5] = b[5] * c;
            a[6] = b[6] * c;
            a[7] = b[7] * c;
            return a
        };
        a.lerp = function(a, b, c, d) {
            var e = 1 - d;
            0 > m(b, c) && (d = -d);
            a[0] = b[0] * e + c[0] * d;
            a[1] = b[1] * e + c[1] * d;
            a[2] = b[2] * e + c[2] * d;
            a[3] = b[3] * e + c[3] * d;
            a[4] = b[4] * e + c[4] * d;
            a[5] = b[5] * e + c[5] * d;
            a[6] = b[6] * e + c[6] * d;
            a[7] = b[7] * e + c[7] * d;
            return a
        };
        a.invert = function(a, b) {
            var c = p(b);
            a[0] = -b[0] / c;
            a[1] = -b[1] / c;
            a[2] = -b[2] / c;
            a[3] = b[3] / c;
            a[4] = -b[4] / c;
            a[5] = -b[5] / c;
            a[6] = -b[6] / c;
            a[7] = b[7] / c;
            return a
        };
        a.conjugate = function(a, b) {
            a[0] = -b[0];
            a[1] = -b[1];
            a[2] = -b[2];
            a[3] = b[3];
            a[4] = -b[4];
            a[5] = -b[5];
            a[6] = -b[6];
            a[7] = b[7];
            return a
        };
        a.normalize = function(a, b) {
            var c = p(b);
            if (0 < c) {
                c = Math.sqrt(c);
                var d = b[0] / c,
                e = b[1] / c,
                g = b[2] / c,
                h = b[3] / c,
                k = b[4],
                n = b[5],
                l = b[6];
                b = b[7];
                var m = d * k + e * n + g * l + h * b;
                a[0] = d;
                a[1] = e;
                a[2] = g;
                a[3] = h;
                a[4] = (k - d * m) / c;
                a[5] = (n - e * m) / c;
                a[6] = (l - g * m) / c;
                a[7] = (b - h * m) / c
            }
            return a
        };
        a.str = function(a) {
            return "quat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ")"
        };
        a.exactEquals = function(a, b) {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7]
        };
        a.equals = function(a, b) {
            var c = a[0],
            d = a[1],
            e = a[2],
            g = a[3],
            k = a[4],
            n = a[5],
            l = a[6];
            a = a[7];
            var m = b[0],
            r = b[1],
            p = b[2],
            G = b[3],
            H = b[4],
            J = b[5],
            w = b[6];
            b = b[7];
            return Math.abs(c - m) <= h.EPSILON * Math.max(1, Math.abs(c), Math.abs(m)) && Math.abs(d - r) <= h.EPSILON * Math.max(1, Math.abs(d), Math.abs(r)) && Math.abs(e - p) <= h.EPSILON * Math.max(1, Math.abs(e), Math.abs(p)) && Math.abs(g - G) <= h.EPSILON * Math.max(1, Math.abs(g), Math.abs(G)) && Math.abs(k - H) <= h.EPSILON * Math.max(1, Math.abs(k), Math.abs(H)) && Math.abs(n - J) <= h.EPSILON * Math.max(1, Math.abs(n), Math.abs(J)) && Math.abs(l - w) <= h.EPSILON * Math.max(1, Math.abs(l), Math.abs(w)) && Math.abs(a - b) <= h.EPSILON * Math.max(1, Math.abs(a), Math.abs(b))
        };
        a.sqrLen = a.squaredLength = a.len = a.length = a.dot = a.mul = a.setReal = a.getReal = undefined;
        var h = b(Ka),
        k = b(Ld),
        l = b(Id);
        a.getReal = k.copy;
        a.setReal = k.copy;
        a.mul = g;
        var m = k.dot;
        a.dot = m;
        c = k.length;
        a.length = c;
        a.len = c;
        var p = k.squaredLength;
        a.squaredLength = p;
        a.sqrLen = p
    });
    T(Bf);
    var Cf = O(function(c, a) {
        function b() {
            var a = new p.ARRAY_TYPE(2);
            p.ARRAY_TYPE != Float32Array && (a[0] = 0, a[1] = 0);
            return a
        }
        function d(a, b, c) {
            a[0] = b[0] - c[0];
            a[1] = b[1] - c[1];
            return a
        }
        function e(a, b, c) {
            a[0] = b[0] * c[0];
            a[1] = b[1] * c[1];
            return a
        }
        function g(a, b, c) {
            a[0] = b[0] / c[0];
            a[1] = b[1] / c[1];
            return a
        }
        function h(a, b) {
            var c = b[0] - a[0];
            a = b[1] - a[1];
            return Math.sqrt(c * c + a * a)
        }
        function k(a, b) {
            var c = b[0] - a[0];
            a = b[1] - a[1];
            return c * c + a * a
        }
        function l(a) {
            var b = a[0];
            a = a[1];
            return Math.sqrt(b * b + a * a)
        }
        function m(a) {
            var b = a[0];
            a = a[1];
            return b * b + a * a
        }
        Object.defineProperty(a, "__esModule", {
            value: true
        });
        a.create = b;
        a.clone = function(a) {
            var b = new p.ARRAY_TYPE(2);
            b[0] = a[0];
            b[1] = a[1];
            return b
        };
        a.fromValues = function(a, b) {
            var c = new p.ARRAY_TYPE(2);
            c[0] = a;
            c[1] = b;
            return c
        };
        a.copy = function(a, b) {
            a[0] = b[0];
            a[1] = b[1];
            return a
        };
        a.set = function(a, b, c) {
            a[0] = b;
            a[1] = c;
            return a
        };
        a.add = function(a, b, c) {
            a[0] = b[0] + c[0];
            a[1] = b[1] + c[1];
            return a
        };
        a.subtract = d;
        a.multiply = e;
        a.divide = g;
        a.ceil = function(a, b) {
            a[0] = Math.ceil(b[0]);
            a[1] = Math.ceil(b[1]);
            return a
        };
        a.floor = function(a, b) {
            a[0] = Math.floor(b[0]);
            a[1] = Math.floor(b[1]);
            return a
        };
        a.min = function(a, b, c) {
            a[0] = Math.min(b[0], c[0]);
            a[1] = Math.min(b[1], c[1]);
            return a
        };
        a.max = function(a, b, c) {
            a[0] = Math.max(b[0], c[0]);
            a[1] = Math.max(b[1], c[1]);
            return a
        };
        a.round = function(a, b) {
            a[0] = Math.round(b[0]);
            a[1] = Math.round(b[1]);
            return a
        };
        a.scale = function(a, b, c) {
            a[0] = b[0] * c;
            a[1] = b[1] * c;
            return a
        };
        a.scaleAndAdd = function(a, b, c, d) {
            a[0] = b[0] + c[0] * d;
            a[1] = b[1] + c[1] * d;
            return a
        };
        a.distance = h;
        a.squaredDistance = k;
        a.length = l;
        a.squaredLength = m;
        a.negate = function(a, b) {
            a[0] = -b[0];
            a[1] = -b[1];
            return a
        };
        a.inverse = function(a, b) {
            a[0] = 1 / b[0];
            a[1] = 1 / b[1];
            return a
        };
        a.normalize = function(a, b) {
            var c = b[0],
            d = b[1];
            c = c * c + d * d;
            0 < c && (c = 1 / Math.sqrt(c));
            a[0] = b[0] * c;
            a[1] = b[1] * c;
            return a
        };
        a.dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1]
        };
        a.cross = function(a, b, c) {
            b = b[0] * c[1] - b[1] * c[0];
            a[0] = a[1] = 0;
            a[2] = b;
            return a
        };
        a.lerp = function(a, b, c, d) {
            var e = b[0];
            b = b[1];
            a[0] = e + d * (c[0] - e);
            a[1] = b + d * (c[1] - b);
            return a
        };
        a.random = function(a, b) {
            b = b || 1;
            var c = 2 * p.RANDOM() * Math.PI;
            a[0] = Math.cos(c) * b;
            a[1] = Math.sin(c) * b;
            return a
        };
        a.transformMat2 = function(a, b, c) {
            var d = b[0];
            b = b[1];
            a[0] = c[0] * d + c[2] * b;
            a[1] = c[1] * d + c[3] * b;
            return a
        };
        a.transformMat2d = function(a, b, c) {
            var d = b[0];
            b = b[1];
            a[0] = c[0] * d + c[2] * b + c[4];
            a[1] = c[1] * d + c[3] * b + c[5];
            return a
        };
        a.transformMat3 = function(a, b, c) {
            var d = b[0];
            b = b[1];
            a[0] = c[0] * d + c[3] * b + c[6];
            a[1] = c[1] * d + c[4] * b + c[7];
            return a
        };
        a.transformMat4 = function(a, b, c) {
            var d = b[0];
            b = b[1];
            a[0] = c[0] * d + c[4] * b + c[12];
            a[1] = c[1] * d + c[5] * b + c[13];
            return a
        };
        a.rotate = function(a, b, c, d) {
            var e = b[0] - c[0];
            b = b[1] - c[1];
            var g = Math.sin(d);
            d = Math.cos(d);
            a[0] = e * d - b * g + c[0];
            a[1] = e * g + b * d + c[1];
            return a
        };
        a.angle = function(a, b) {
            var c = a[0];
            a = a[1];
            var d = b[0];
            b = b[1];
            var e = c * c + a * a;
            0 < e && (e = 1 / Math.sqrt(e));
            var g = d * d + b * b;
            0 < g && (g = 1 / Math.sqrt(g));
            c = (c * d + a * b) * e * g;
            return 1 < c ? 0 : -1 > c ? Math.PI: Math.acos(c)
        };
        a.zero = function(a) {
            a[0] = 0;
            a[1] = 0;
            return a
        };
        a.str = function(a) {
            return "vec2(" + a[0] + ", " + a[1] + ")"
        };
        a.exactEquals = function(a, b) {
            return a[0] === b[0] && a[1] === b[1]
        };
        a.equals = function(a, b) {
            var c = a[0];
            a = a[1];
            var d = b[0];
            b = b[1];
            return Math.abs(c - d) <= p.EPSILON * Math.max(1, Math.abs(c), Math.abs(d)) && Math.abs(a - b) <= p.EPSILON * Math.max(1, Math.abs(a), Math.abs(b))
        };
        a.forEach = a.sqrLen = a.sqrDist = a.dist = a.div = a.mul = a.sub = a.len = undefined;
        var p = function(a) {
            if (a && a.__esModule) return a;
            var b = {};
            if (null != a) for (var c in a) if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = fa && ea ? ea(a, c) : {};
                d.get || d.set ? fa(b, c, d) : b[c] = a[c]
            }
            b.
        default = a;
            return b
        } (Ka);
        a.len = l;
        a.sub = d;
        a.mul = e;
        a.div = g;
        a.dist = h;
        a.sqrDist = k;
        a.sqrLen = m;
        c = function() {
            var a = b();
            return function(b, c, d, e, g, h) {
                c || (c = 2);
                d || (d = 0);
                for (e = e ? Math.min(e * c + d, b.length) : b.length; d < e; d += c) a[0] = b[d],
                a[1] = b[d + 1],
                g(a, a, h),
                b[d] = a[0],
                b[d + 1] = a[1];
                return b
            }
        } ();
        a.forEach = c
    });
    T(Cf);
    var Fa = O(function(c, a) {
        function b(a) {
            if (a && a.__esModule) return a;
            var b = {};
            if (null != a) for (var c in a) if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = fa && ea ? ea(a, c) : {};
                d.get || d.set ? fa(b, c, d) : b[c] = a[c]
            }
            b.
        default = a;
            return b
        }
        Object.defineProperty(a, "__esModule", {
            value: true
        });
        a.vec4 = a.vec3 = a.vec2 = a.quat2 = a.quat = a.mat4 = a.mat3 = a.mat2d = a.mat2 = a.glMatrix = undefined;
        c = b(Ka);
        a.glMatrix = c;
        c = b(zf);
        a.mat2 = c;
        c = b(Af);
        a.mat2d = c;
        c = b(Hd);
        a.mat3 = c;
        c = b(Id);
        a.mat4 = c;
        c = b(Ld);
        a.quat = c;
        c = b(Bf);
        a.quat2 = c;
        c = b(Cf);
        a.vec2 = c;
        c = b(Jd);
        a.vec3 = c;
        c = b(Kd);
        a.vec4 = c
    });
    T(Fa);
    var Ga = Fa.vec4,
    L = Fa.vec3,
    P = Fa.vec2,
    pi = Fa.quat2,
    vc = Fa.quat,
    E = Fa.mat4,
    qi = Fa.mat3,
    ri = Fa.mat2d,
    si = Fa.mat2,
    ti = Fa.glMatrix;
    Lb.deviation = function(c, a, b, d) {
        var e = a && a.length,
        g = Math.abs(bd(c, 0, e ? a[0] * b: c.length, b));
        if (e) {
            e = 0;
            for (var h = a.length; e < h; e++) g -= Math.abs(bd(c, a[e] * b, e < h - 1 ? a[e + 1] * b: c.length, b))
        }
        for (e = a = 0; e < d.length; e += 3) {
            h = d[e] * b;
            var k = d[e + 1] * b,
            l = d[e + 2] * b;
            a += Math.abs((c[h] - c[l]) * (c[k + 1] - c[h + 1]) - (c[h] - c[k]) * (c[l + 1] - c[h + 1]))
        }
        return 0 === g && 0 === a ? 0 : Math.abs((a - g) / g)
    };
    Lb.flatten = function(c) {
        for (var a = c[0][0].length, b = {
            vertices: [],
            holes: [],
            dimensions: a
        },
        d = 0, e = 0; e < c.length; e++) {
            for (var g = 0; g < c[e].length; g++) for (var h = 0; h < a; h++) b.vertices.push(c[e][g][h]);
            0 < e && (d += c[e - 1].length, b.holes.push(d))
        }
        return b
    };
    Lb.
default = Lb;
    var Df = "undefined" === typeof nf ? "__target": nf(),
    Gg = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
    nc = window.URL || window.webkitURL,
    Bb = window.Worker;
    if (Bb) {
        var Ef = me("self.onmessage = function () {}"),
        Ff = new Uint8Array(1);
        try {
            if (/(?:Trident|Edge)\/(?:[567]|12)/i.test(navigator.userAgent)) throw Error("Not available");
            var Md = new Bb(Ef);
            Md.postMessage(Ff, [Ff.buffer])
        } catch(c) {
            Bb = null
        } finally {
            nc.revokeObjectURL(Ef),
            Md && Md.terminate()
        }
    }
    var ui = new
    function(c, a) {
        return function(b) {
            var d = this;
            if (a) {
                if (Bb && !b) return b = ("" + a).replace(/^function.+?{/, "").slice(0, -1),
                b = me(b),
                this[Df] = new Bb(b),
                nc.revokeObjectURL(b),
                this[Df];
                var e = {
                    postMessage: function(a) {
                        d.onmessage && setTimeout(function() {
                            return d.onmessage({
                                data: a,
                                target: e
                            })
                        })
                    }
                };
                a.call(e);
                this.postMessage = function(a) {
                    setTimeout(function() {
                        return e.onmessage({
                            data: a,
                            target: d
                        })
                    })
                };
                this.isThisThread = true
            } else return new Bb(c)
        }
    } ("./worker.js",
    function(c, a) {}),
    Gf = {
        window: 1,
        windowAnimation: 2,
        gradual: 3,
        ripple: 4,
        water: 6
    },
    ShapeLayer = function(c) {
        function a(b, c) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b, c));
            b._isShow = true;
            c = b.getOptions();
            if ("windowAnimation" === c.style || "ripple" === c.style || 0 < c.riseTime) b.autoUpdate = true;
            b.selectedColor = [ - 1, -1, -1];
            b.textureCache = {};
            return b
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    color: "rgba(50, 50, 230, 1.0)",
                    opacity: .8,
                    isTextureFull: false,
                    topColor: "rgba(76, 76, 76, 76)",
                    textureScale: 1,
                    useLight: true,
                    riseTime: 0
                }
            }
        },
        {
            key: "initialize",
            value: function(a) {
                this.gl = a;
                var b = this.getOptions();
                this.dataMgr = new hb(this, this.gl);
                this.texture = null;
                this.isUseTexture = false;
                var c = [];
                b.enablePicked && c.push("PICK");
                b.texture && c.push("USE_TEXTURE");
                this.program = new Program(this.gl, {
                    vertexShader: "precision highp float;uniform vec4 uSelectedColor;attribute vec4 a_pos;attribute vec3 a_normal;attribute vec4 a_color;attribute vec4 a_pre_color;attribute float a_height;attribute float a_pre_height;\n#if defined(USE_TEXTURE)\nattribute vec2 a_texture_coord;\n#endif\nuniform mat4 u_proj_matrix;uniform mat4 u_mv_matrix;uniform mat4 u_normal_matrix;uniform vec3 u_side_light_dir;uniform bool u_use_lighting;uniform bool u_use_texture;uniform vec3 u_ripple_center;uniform float u_radius;uniform float style;uniform float alpha;uniform float time;uniform float dataTime;uniform float riseTime;uniform vec2 uMapCenter;uniform float uMapZoom;varying float v_height;varying vec4 v_color;varying vec3 v_position;varying vec2 v_texture_coord;const vec3 point_color=vec3(0.06,0.06,0.06);const vec3 light_color=vec3(0.53,0.53,0.53);const vec3 light_color_2=vec3(0.4,0.4,0.4);const vec3 uAmbientColor=vec3(0.8,0.8,0.8);const vec3 uLightingDirection=vec3(0.0,1.0,1.0);const vec3 uDirectionalColor=vec3(1.0,1.0,1.0);float getTransitionValue(float pre_value,float to_value,float dataTime,float riseTime){float result=0.0;if(pre_value==to_value){result=to_value;}else{if(riseTime>0.0&&dataTime<riseTime){result=(pre_value+(to_value-pre_value)*(dataTime/riseTime));}else{result=to_value;}}return result;}void main(){vec4 pos=a_pos;pos.z=pos.z+pos.w*getTransitionValue(a_pre_height,a_height,dataTime,riseTime);v_position=pos.xyz;v_height=a_height;\n#if defined(USE_TEXTURE)\nif(u_use_texture){v_texture_coord=a_texture_coord;}\n#endif\nvec4 position=u_proj_matrix*u_mv_matrix*vec4(pos.xyz,1.0);gl_Position=position;vec4 icolor=a_color;\n#if defined(PICK)\nif(mapvIsPicked()){icolor=uSelectedColor;}\n#endif\nif(u_use_lighting){vec3 N=normalize(vec3(u_normal_matrix*vec4(a_normal,1.0)));vec4 point_dir=u_mv_matrix*vec4(0,1,0,0);vec3 L_point=normalize(point_dir.xyz);float lambert_point=max(0.0,dot(N,-L_point));vec4 light_dir=u_mv_matrix*vec4(u_side_light_dir,0);vec3 L=normalize(light_dir.xyz);float lambert=max(0.0,dot(N,-L));if(pos.z<5.0){float deepGradientColor=(5.0-pos.z)/8.0;lambert=lambert-deepGradientColor;}vec4 light_dir_2=u_mv_matrix*vec4(0,0,-1,0);vec3 L2=normalize(light_dir_2.xyz);float lambert_2=max(0.0,dot(N,-L2));if(a_pre_color.r==a_color.r&&a_pre_color.g==a_color.g&&a_pre_color.b==a_color.b){}else{if(riseTime>0.0&&dataTime<riseTime){icolor.r=a_pre_color.r+(a_color.r-a_pre_color.r)*(dataTime/riseTime);icolor.g=a_pre_color.g+(a_color.g-a_pre_color.g)*(dataTime/riseTime);icolor.b=a_pre_color.b+(a_color.b-a_pre_color.b)*(dataTime/riseTime);}}v_color.rgb=icolor.rgb+icolor.rgb*light_color*lambert+icolor.rgb*light_color_2*lambert_2+icolor.rgb*point_color*lambert_point;v_color.a=icolor.a;if(u_use_texture){mat3 normalMatrix=mat3(u_normal_matrix);vec3 transformedNormal=normalMatrix*a_normal;vec3 dir=uLightingDirection;dir=vec3(normalMatrix*vec3(0.0,-1.0,2.0));float directionalLightWeighting=max(dot(normalize(transformedNormal),normalize(dir)),0.0);vec4 vLightWeighting;vLightWeighting=vec4(uAmbientColor+uDirectionalColor*directionalLightWeighting,1.0);v_color=vLightWeighting;}}else{v_color=icolor;}}",
                    fragmentShader: "precision highp float;varying vec4 v_color;varying vec3 v_position;varying float v_height;varying vec2 v_texture_coord;uniform vec3 u_ripple_center;uniform vec4 top_color;uniform float u_radius;uniform float style;uniform float alpha;uniform float time;uniform sampler2D u_sampler;uniform bool u_use_lighting;uniform bool u_use_texture;void main(){vec4 color=vec4(v_color);vec4 textureColor=vec4(1.0,1.0,1.0,1.0);if(u_use_texture){if(style==6.0){float x=v_texture_coord.s;float y=v_texture_coord.t;vec2 cPos=-1.0+2.0*gl_FragCoord.xy/MAPV_resolution;float cLength=length(cPos);vec2 uv=gl_FragCoord.xy/MAPV_resolution+(cPos/cLength)*cos(cLength*12.0-time/1000.0*4.0)*0.03;textureColor=texture2D(u_sampler,uv/2.0+vec2(x,y));}else{textureColor=texture2D(u_sampler,vec2(v_texture_coord.s,v_texture_coord.t));}if(u_use_lighting){color=vec4(textureColor*v_color*1.1);}else{color=textureColor;}}if(style==1.0||style==2.0){float t=time/1000.0;float diffDistance=5.0;float modX=mod(v_position.x,diffDistance*2.0);float modZ=mod(v_position.z,diffDistance*2.0);if(modX<diffDistance&&modZ<diffDistance&&v_position.z<v_height){color*=1.05;if(time>0.0&&style==2.0){float iX=ceil(v_position.x/diffDistance);float iZ=ceil(v_position.z/diffDistance);float timeDistance=8.0;t+=tan(sin(iZ));color*=(1.0+mod(t,timeDistance)/timeDistance);}}color.a=alpha;}else if(style==5.0){float t=time/1000.0;float diffDistance=10.0;float modZ=mod(v_position.z-t*40.0,diffDistance*2.0);color.a=1.0-pow(v_position.z/v_height,0.5);if(v_position.z/v_height<0.3){color.r+=0.2;color.g+=0.2;color.b+=0.2;}if(modZ<diffDistance*2.0-4.0){discard;}}else if(style==3.0){float diffDistance=10.0;float modX=mod(v_position.x,diffDistance*2.0);color.a=1.0-pow(v_position.z/v_height,0.3);}else if(style==4.0){float dis=distance(u_ripple_center,v_position);float rSize=400.0;if(v_position.z>=v_height){color=top_color;}if(dis>u_radius-rSize&&dis<u_radius+rSize){color*=(1.0-abs(dis-u_radius)/rSize)*2.0+1.0;}}else if(style==6.0){}gl_FragColor=color;}",
                    defines: c
                },
                this);
                this.vertexBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.colorBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.heightBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.textureBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.indexBuffer = new Buffer({
                    gl: a,
                    target: "ELEMENT_ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                c = [{
                    name: "a_pos",
                    buffer: this.vertexBuffer,
                    stride: 28,
                    size: 4,
                    type: "FLOAT",
                    offset: 0
                },
                {
                    name: "a_normal",
                    buffer: this.vertexBuffer,
                    size: 3,
                    stride: 28,
                    type: "FLOAT",
                    offset: 16
                },
                {
                    name: "a_color",
                    buffer: this.colorBuffer,
                    size: 4,
                    stride: 32,
                    type: "FLOAT",
                    offset: 0
                },
                {
                    name: "a_pre_color",
                    buffer: this.colorBuffer,
                    size: 4,
                    stride: 32,
                    type: "FLOAT",
                    offset: 16
                },
                {
                    name: "a_height",
                    buffer: this.heightBuffer,
                    size: 1,
                    stride: 8,
                    type: "FLOAT",
                    offset: 0
                },
                {
                    name: "a_pre_height",
                    buffer: this.heightBuffer,
                    size: 1,
                    stride: 8,
                    type: "FLOAT",
                    offset: 4
                }];
                b.texture && c.push({
                    name: "a_texture_coord",
                    buffer: this.textureBuffer,
                    size: 2,
                    stride: 8,
                    type: "FLOAT",
                    offset: 0
                });
                c = c.concat(this.getCommonAttributes());
                this.vertexArray = new VertexArray({
                    gl: a,
                    program: this.program,
                    attributes: c
                });
                this.initializeTime = new Date;
                this.normalMatrix = E.create()
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                var b = this;
                this.gl && (this.loadTextureTime && clearTimeout(this.loadTextureTime), this.loadTextureTime = setTimeout(function() {
                    b.loadTexture(function() {
                        b.dataMgr.parseData(c);
                        b.dataTime = new Date;
                        b.webglLayer.render()
                    })
                },
                0))
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl,
                c = a.projectionMatrix,
                g = a.viewMatrix;
                if (this._isShow) {
                    var h = this.getData();
                    if (h && !(0 >= h.length)) {
                        h = this.getOptions();
                        var k = this.program;
                        k.use(b);
                        if (!h.texture || this.texture) {
                            b.disable(b.CULL_FACE);
                            h.blend && (b.enable(b.BLEND), b.blendFunc(b.ONE, b.ONE), b.blendEquation(b.FUNC_ADD));
                            0 === h.height && (b.enable(b.BLEND), b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA));
                            var l = 0;
                            h.style && Gf[h.style] && (l = Gf[h.style]);
                            "gradual" === h.style ? (b.depthMask(false), b.enable(b.BLEND), b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA)) : b.depthMask(true);
                            var m = this.normizedColor(h.topColor);
                            if ("ripple" === h.style && h.rippleLayer && h.rippleLayer.data && h.rippleLayer.data[0]) {
                                var p = this.normizedPoint(h.rippleLayer.data[0].geometry.coordinates);
                                k.setUniforms({
                                    u_ripple_center: [p[0], p[1], 0],
                                    u_radius: h.rippleLayer.options.size * h.rippleLayer.currentScale
                                })
                            }
                            p = L.fromValues(0, -1, 2);
                            h.lightDir && (p = L.fromValues(h.lightDir[0], h.lightDir[1], h.lightDir[2]));
                            var n = this.normalMatrix;
                            E.invert(n, g);
                            E.transpose(n, n);
                            k.setUniforms(Object.assign(this.getCommonUniforms(a), {
                                u_normal_matrix: n,
                                u_sampler: this.texture,
                                u_proj_matrix: c,
                                u_mv_matrix: g,
                                style: l,
                                top_color: m,
                                u_use_lighting: h.useLight,
                                u_use_texture: this.isUseTexture,
                                alpha: undefined === h.opacity ? .8 : parseFloat(h.opacity),
                                time: new Date - this.initializeTime,
                                dataTime: new Date - this.dataTime,
                                riseTime: h.riseTime,
                                u_side_light_dir: p
                            }));
                            a = this.dataMgr.getData();
                            0 < a.vertex.length && (this.vertexArray.bind(), this.indexBuffer.bind(), b.drawElements(b.TRIANGLES, a.index.length, b.UNSIGNED_INT, 0))
                        }
                    }
                } else this.webglLayer.clear()
            }
        },
        {
            key: "loadTexture",
            value: function(a) {
                var b = this,
                c = this.getOptions();
                c.texture ? (this.isUseTexture = true, Ma(this.gl, c.texture,
                function(c, d) {
                    b.image = d;
                    b.texture = c;
                    a && a();
                    b.webglLayer.render()
                })) : (this.isUseTexture = false, this.image = this.texture = null, a && a())
            }
        }]);
        return a
    } (Layer);
    hb.prototype.initData = function() {
        this.outBuilding3d = {
            pickColorVertex: [],
            vertex: [],
            texture: [],
            color: [],
            height: [],
            index: []
        }
    };
    hb.prototype.getData = function() {
        return this.outBuilding3d
    };
    hb.prototype.initWorker = function() {
        this.worker = new ui;
        this.worker.onmessage = function(c) {}
    };
    hb.prototype.parseData = function(c) {
        var a = this;
        this.initData();
        for (var b = this.shapeLayer.getOptions(), d = 0; d < c.length; d++) {
            var e = c[d],
            g = e.height || 0;
            "properties" in e && "height" in e.properties && (g = e.properties.height);
            g *= 1;
            var h = e.color || b.color;
            "properties" in e && "color" in e.properties && (h = e.properties.color);
            "[object Function]" === Object.prototype.toString.call(h) && (h = h(e));
            h = this.shapeLayer.normizedColor(h);
            var k = undefined;
            b.enablePicked && (k = this.shapeLayer.indexToRgb(d));
            var l = undefined,
            m = undefined;
            b.riseTime && (m = e.preColor, "properties" in e && "preColor" in e.properties && (m = e.properties.preColor), l = e.preHeight, "properties" in e && "preHeight" in e.properties && (l = e.properties.preHeight), undefined === l && (l = 0));
            if (e.geometry.coordinates) if ("MultiPolygon" === e.geometry.type) for (var p = e.geometry.coordinates,
            n = function(b) {
                var c = [],
                d = [];
                e.geometry.coordinates[b][0].forEach(function(b) {
                    b = a.shapeLayer.normizedPoint(b);
                    c.push(b[0], b[1]);
                    d.push(b[2])
                });
                a.parseBuilding3d(c, d, l, g, m, h, k, a.outBuilding3d)
            },
            r = 0; r < p.length; r++) n(r);
            else(function() {
                var b = [],
                c = [];
                e.geometry.coordinates[0].forEach(function(d) {
                    d = a.shapeLayer.normizedPoint(d);
                    b.push(d[0], d[1]);
                    c.push(d[2])
                });
                a.parseBuilding3d(b, c, l, g, m, h, k, a.outBuilding3d)
            })()
        }
        this.shapeLayer.vertexBuffer.updateData(new Float32Array(this.outBuilding3d.vertex));
        this.shapeLayer.colorBuffer.updateData(new Float32Array(this.outBuilding3d.color));
        this.shapeLayer.heightBuffer.updateData(new Float32Array(this.outBuilding3d.height));
        this.shapeLayer.textureBuffer.updateData(new Float32Array(this.outBuilding3d.texture));
        this.shapeLayer.indexBuffer.updateData(new Uint32Array(this.outBuilding3d.index));
        b.enablePicked && this.shapeLayer.pickBuffer.updateData(new Float32Array(this.outBuilding3d.pickColorVertex))
    };
    hb.prototype.getBounds = function(c) {
        for (var a = c[0], b = c[1], d = c[0], e = c[1], g = 0; g < c.length; g += 2) a = Math.min(c[g], a),
        b = Math.min(c[g + 1], b),
        d = Math.max(c[g], d),
        e = Math.max(c[g + 1], e);
        return {
            minX: a,
            minY: b,
            maxX: d,
            maxY: e,
            width: d - a,
            height: e - b
        }
    };
    hb.prototype.parseBuilding3d = function(c, a, b, d, e, g, h, k) {
        undefined === b && (b = d);
        var l = this.shapeLayer.options,
        m = k.vertex,
        p = k.texture,
        n = k.color,
        r = k.height,
        q = k.pickColorVertex;
        k = k.index;
        undefined === e && (e = g);
        var t = 0,
        y = 0;
        this.shapeLayer.image && (t = this.shapeLayer.image.width * l.textureScale, y = this.shapeLayer.image.height * l.textureScale);
        if ("gradual" != l.style) {
            var v = Lb(c),
            x = v[0],
            u = v[1],
            B = v[2];
            x = [c[2 * x], c[2 * x + 1], 1];
            u = [c[2 * u], c[2 * u + 1], 1];
            var A = [c[2 * B], c[2 * B + 1], 1];
            B = [];
            L.cross(B, [A[0] - u[0], A[1] - u[1], A[2] - u[2]], [x[0] - u[0], x[1] - u[1], x[2] - u[2]]);
            u = m.length / 7;
            if (l.texture) var D = this.getBounds(c);
            x = l.isTextureFull;
            A = 0;
            for (var C = c.length; A < C; A += 2) m.push(c[A], c[A + 1], a[A / 2], 1, B[0], B[1], B[2]),
            n.push(g[0], g[1], g[2], g[3], e[0], e[1], e[2], e[3]),
            r.push(d, b),
            l.texture && (x ? (p.push((c[A] - D.minX) / D.width), p.push((c[A + 1] - D.minY) / D.height)) : (p.push((c[A] - D.minX) / t), p.push((c[A + 1] - D.minY) / y))),
            h && q.push(h[0] / 255, h[1] / 255, h[2] / 255);
            D = 0;
            for (B = v.length; D < B; D++) k.push(v[D] + u)
        }
        if (! (d === b && 0 >= d)) for (v = 0, D = c.length; v < D; v += 2) {
            B = m.length / 7;
            var G = c[v],
            H = c[v + 1];
            u = [G, H, a[v / 2], 0];
            A = [G, H, a[v / 2], 1];
            C = v + 2;
            var J = v + 3;
            v === D - 2 && (C = 0, J = 1);
            C = c[C];
            J = c[J];
            G = Math.sqrt(Math.pow(C - G, 2), Math.pow(J - H, 2));
            H = [C, J, a[v / 2], 0];
            C = [C, J, a[v / 2], 1];
            J = [];
            L.cross(J, [H[0] - u[0], H[1] - u[1], H[2] - u[2]], [A[0] - u[0], A[1] - u[1], A[2] - u[2]]);
            m.push(u[0], u[1], u[2], u[3]);
            m.push(J[0], J[1], J[2]);
            m.push(A[0], A[1], A[2], A[3]);
            m.push(J[0], J[1], J[2]);
            m.push(H[0], H[1], H[2], H[3]);
            m.push(J[0], J[1], J[2]);
            m.push(C[0], C[1], C[2], C[3]);
            m.push(J[0], J[1], J[2]);
            n.push(g[0], g[1], g[2], g[3]);
            n.push(e[0], e[1], e[2], e[3]);
            n.push(g[0], g[1], g[2], g[3]);
            n.push(e[0], e[1], e[2], e[3]);
            n.push(g[0], g[1], g[2], g[3]);
            n.push(e[0], e[1], e[2], e[3]);
            n.push(g[0], g[1], g[2], g[3]);
            n.push(e[0], e[1], e[2], e[3]);
            r.push(d);
            r.push(b);
            r.push(d);
            r.push(b);
            r.push(d);
            r.push(b);
            r.push(d);
            r.push(b);
            l.texture && (x ? (p.push(0, 0), p.push(0, 1), p.push(1, 0), p.push(1, 1)) : (p.push(0, 0), p.push(0, d / y), p.push(G / t, 0), p.push(G / t, d / y)));
            h && (q.push(h[0] / 255, h[1] / 255, h[2] / 255), q.push(h[0] / 255, h[1] / 255, h[2] / 255), q.push(h[0] / 255, h[1] / 255, h[2] / 255), q.push(h[0] / 255, h[1] / 255, h[2] / 255));
            k.push(B, B + 2, B + 3, B, B + 3, B + 1)
        }
    };
    var GridLayer = function(c) {
        function a(b, c) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b, c));
            b.preHeightMapper = {};
            b.preColorMapper = {};
            return b
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return Object.assign(Ya(a.prototype.__proto__ || N(a.prototype), "getDefaultOptions", this).call(this), {
                    style: "grid",
                    gridSize: 500,
                    height: function() {
                        return 1E3
                    },
                    color: function() {
                        return "rgb(200, 200, 20)"
                    }
                })
            }
        },
        {
            key: "generateGrid",
            value: function(a, c) {
                var b = c.gridSize,
                d = [],
                h = {};
                c = a.length;
                for (var k = this.getPointOffset(), l = 0; l < c; l++) {
                    var m = this.normizedPoint(a[l].geometry.coordinates);
                    m = ~~ ((m[0] + k[0]) / b) + "_" + ~~ ((m[1] + k[1]) / b);
                    undefined === h[m] && (h[m] = 0);
                    var p = ~~a[l].count || 1;
                    "properties" in a[l] && "count" in a[l].properties && (p = ~~a[l].properties.count);
                    h[m] += p
                }
                Ba(h).forEach(function(a) {
                    var c = a.split("_");
                    d.push([c[0] * b + b / 2, c[1] * b + b / 2, h[a]])
                });
                return d
            }
        },
        {
            key: "onChanged",
            value: function(b, c) {
                c = this.processData(c);
                Ya(a.prototype.__proto__ || N(a.prototype), "onChanged", this).call(this, b, c)
            }
        },
        {
            key: "getGridDataRange",
            value: function() {
                var a = this.gridData,
                c = undefined,
                e = undefined;
                a[0] && (c = a[0][2], e = a[0][2]);
                for (var g = a.length,
                h = 0; h < g; h++) {
                    var k = a[h];
                    c = Math.max(k[2], c);
                    e = Math.min(k[2], e)
                }
                return {
                    max: c / 2,
                    min: e
                }
            }
        },
        {
            key: "processData",
            value: function(a) {
                var b = this.getOptions(),
                c = b.style,
                g = b.gridSize,
                h = [];
                this.gridData = h;
                if ("normal" === c) {
                    c = this.getPointOffset();
                    for (var k = 0; k < a.length; k++) {
                        var l = this.normizedPoint(a[k].geometry.coordinates),
                        m = l[0] + c[0];
                        l = l[1] + c[1];
                        var p = ~~a[k].count || 1;
                        "properties" in a[k] && "count" in a[k].properties && (p = ~~a[k].properties.count);
                        var n = a[k].color;
                        "properties" in a[k] && "color" in a[k].properties && (n = ~~a[k].properties.color);
                        h.push([m, l, p, n])
                    }
                } else h = this.generateGrid(a, b);
                a = [];
                this._preHeightMapper = {};
                this._preColorMapper = {};
                for (c = 0; c < h.length; c++) k = h[c],
                k[0] = k[0],
                k[1] = k[1],
                m = k[2],
                b.height && (m = "function" === typeof b.height ? b.height({
                    count: k[2]
                }) : b.height),
                l = g / 2 - 5,
                p = k[3],
                b.color && (p = "function" === typeof b.color ? b.color({
                    count: k[2],
                    color: k[3]
                }) : ha(p).unitArray()),
                n = "p" + k[0] + k[1],
                a.push({
                    geometry: {
                        type: "Polygon",
                        coordinates: [[[k[0] - l, k[1] - l], [k[0] - l, k[1] + l], [k[0] + l, k[1] + l], [k[0] + l, k[1] - l]]]
                    },
                    color: p,
                    preHeight: this.preHeightMapper[n],
                    preColor: this.preColorMapper[n],
                    height: m
                }),
                this._preHeightMapper[n] = m,
                this._preColorMapper[n] = p;
                this.preHeightMapper = this._preHeightMapper;
                this.preColorMapper = this._preColorMapper;
                return a
            }
        }]);
        return a
    } (ShapeLayer),
    pb = function(c) {
        function a(b) {
            I(this, a);
            return Q(this, (a.__proto__ || N(a)).call(this, b))
        }
        R(a, c);
        M(a, [{
            key: "initialize",
            value: function(a) {
                var b = this;
                this.children && this.children.forEach(function(c) {
                    c.map = b.map;
                    c.setWebglLayer(b.getWebglLayer());
                    c.commonInitialize && c.commonInitialize(a);
                    c.initialize && c.initialize(a);
                    c.onOptionsChanged(c.getOptions());
                    c.onDataChanged(c.getData());
                    c.onChanged(c.getOptions(), c.getData())
                })
            }
        },
        {
            key: "isRequestAnimation",
            value: function() {
                if (undefined !== this.autoUpdate) return Ya(a.prototype.__proto__ || N(a.prototype), "isRequestAnimation", this).call(this);
                for (var b = false,
                c = 0; c < this.children.length; c++) if (this.children[c].isRequestAnimation()) {
                    b = true;
                    break
                }
                return b
            }
        },
        {
            key: "render",
            value: function(a) {
                this.children && this.children.forEach(function(b) {
                    b.render(a)
                })
            }
        }]);
        return a
    } (CommonLayer),
    HeatGridLayer = function(c) {
        function a(b, c) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b, c));
            b.gridLayer = new GridLayer(b.getGridOptions());
            b.children = [b.gridLayer];
            b.options.riseTime && (b.autoUpdate = true);
            return b
        }
        R(a, c);
        M(a, [{
            key: "onDataChanged",
            value: function(a) {
                this.gridLayer.setData(a)
            }
        },
        {
            key: "getGridOptions",
            value: function() {
                var a = this.getOptions(),
                c = a.max,
                e = a.min;
                undefined === c && (e = this.gridLayer.getGridDataRange(), c = e.max, e = e.min);
                var g = new oa({
                    max: c,
                    min: e,
                    gradient: a.gradient,
                    maxSize: a.maxHeight,
                    minSize: a.minHeight
                });
                a.height = function(a) {
                    var b = g.getSize(a.count);
                    "properties" in a && "count" in a.properties && (b = g.getSize(a.properties.count));
                    return b
                };
                a.color = function(a) {
                    var b = g.getImageData(a.count);
                    "properties" in a && "count" in a.properties && (b = g.getImageData(a.properties.count));
                    return [b[0] / 255, b[1] / 255, b[2] / 255]
                };
                return a
            }
        },
        {
            key: "onOptionsChanged",
            value: function(a) {
                this.gridLayer.setOptions(this.getGridOptions())
            }
        },
        {
            key: "getDefaultOptions",
            value: function() {
                return {
                    style: "grid",
                    gridSize: 500,
                    maxHeight: 8E3,
                    minHeight: 200,
                    gradient: {
                        0 : "rgb(50, 50, 256)",
                        "0.1": "rgb(50, 250, 56)",
                        "0.5": "rgb(250, 250, 56)",
                        1 : "rgb(250, 50, 56)"
                    }
                }
            }
        }]);
        return a
    } (pb),
    If = function(c) {
        function a(b, c) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b, c));
            b.bufferData = [];
            return b
        }
        R(a, c);
        M(a, [{
            key: "initialize",
            value: function(a) {
                this.gl = a;
                var b = this.getOptions();
                this.program = new Program(this.gl, {
                    vertexShader: "uniform mat4 u_matrix;attribute vec3 aPos;attribute vec4 aColor;varying vec4 vColor;\n#if defined(DASH)\nvarying vec3 vPos;\n#endif\nvoid main(){if(aColor.w>=0.0&&aColor.w<=1.0){vColor=aColor;}else{vColor=vec4(aColor.xyz,1.0);}gl_Position=u_matrix*vec4(aPos,1.0);\n#if defined(DASH)\nvPos=aPos;\n#endif\n}",
                    fragmentShader: "precision highp float;varying vec4 vColor;varying vec3 vPos;void main(){\n#if defined(DASH)\nif(mod(vPos.x,3.0)<1.5){discard;}\n#endif\ngl_FragColor=vColor;}",
                    defines: b.useDash ? ["DASH"] : ""
                },
                this);
                this.buffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.vertexArray = new VertexArray({
                    gl: a,
                    program: this.program,
                    attributes: [{
                        stride: 28,
                        name: "aPos",
                        buffer: this.buffer,
                        size: 3,
                        type: "FLOAT",
                        offset: 0
                    },
                    {
                        stride: 28,
                        name: "aColor",
                        buffer: this.buffer,
                        size: 4,
                        type: "FLOAT",
                        offset: 12
                    }]
                })
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                var b = this;
                if (this.gl) {
                    var d = [],
                    h = function(a, c) {
                        if (a) for (var e = 0; e < a.length - 1; e++) {
                            var g = b.normizedPoint(a[e]);
                            d.push(g[0]);
                            d.push(g[1]);
                            d.push(g[2]);
                            d.push(c[0], c[1], c[2], c[3]);
                            g = b.normizedPoint(a[e + 1]);
                            d.push(g[0]);
                            d.push(g[1]);
                            d.push(g[2]);
                            d.push(c[0], c[1], c[2], c[3])
                        }
                    };
                    a = a.color;
                    for (var k = 0; k < c.length; k++) {
                        var l = c[k].color || a;
                        "properties" in c[k] && "color" in c[k].properties && (l = c[k].properties.color);
                        "[object Function]" === Object.prototype.toString.call(l) && (l = l(c[k]));
                        l = this.normizedColor(l);
                        var m = c[k].geometry,
                        p = m.coordinates;
                        if ("MultiPolygon" === m.type) {
                            if (p) for (m = 0; m < p.length; m++) h(p[m][0], l)
                        } else if ("Polygon" === m.type) p && h(p[0], l);
                        else if ("MultiLineString" === m.type) {
                            if (p) for (m = 0; m < p.length; m++) h(p[m], l)
                        } else h(p, l)
                    }
                    this.bufferData = d;
                    this.buffer.updateData(new Float32Array(d))
                }
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl;
                a = a.matrix;
                if (this.bufferData && !(0 >= this.bufferData.length)) {
                    var c = this.program;
                    c.use(b);
                    this.vertexArray.bind();
                    c.setUniforms({
                        u_matrix: a
                    });
                    a = this.getOptions().blend;
                    b.enable(b.BLEND);
                    b.blendEquation(b.FUNC_ADD);
                    a && "lighter" === a ? b.blendFunc(b.SRC_ALPHA, b.ONE) : b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
                    b.drawArrays(b.LINES, 0, this.bufferData.length / 7);
                    b.disable(b.BLEND)
                }
            }
        }]);
        return a
    } (Layer),
    wi = Ec.f("species"),
    xi = O(function(c) {
        c.exports = {
            "default": wi,
            __esModule: true
        }
    });
    T(xi);
    var Jf = "undefined" !== typeof global ? global: "undefined" !== typeof self ? self: "undefined" !== typeof window ? window: {},
    Na = [],
    Ca = [],
    Lg = "undefined" !== typeof Uint8Array ? Uint8Array: Array,
    ed = false,
    yi = {}.toString,
    te = Array.isArray ||
    function(c) {
        return "[object Array]" == yi.call(c)
    };
    w.TYPED_ARRAY_SUPPORT = undefined !== Jf.TYPED_ARRAY_SUPPORT ? Jf.TYPED_ARRAY_SUPPORT: true;
    w.poolSize = 8192;
    w._augment = function(c) {
        c.__proto__ = w.prototype;
        return c
    };
    w.from = function(c, a, b) {
        return qe(null, c, a, b)
    };
    w.TYPED_ARRAY_SUPPORT && (w.prototype.__proto__ = Uint8Array.prototype, w.__proto__ = Uint8Array);
    w.alloc = function(c, a, b) {
        se(c);
        c = 0 >= c ? Ua(null, c) : undefined !== a ? "string" === typeof b ? Ua(null, c).fill(a, b) : Ua(null, c).fill(a) : Ua(null, c);
        return c
    };
    w.allocUnsafe = function(c) {
        return fd(null, c)
    };
    w.allocUnsafeSlow = function(c) {
        return fd(null, c)
    };
    w.isBuffer = function(c) {
        return null != c && ( !! c._isBuffer || De(c) || "function" === typeof c.readFloatLE && "function" === typeof c.slice && De(c.slice(0, 0)))
    };
    w.compare = function(c, a) {
        if (!Oa(c) || !Oa(a)) throw new TypeError("Arguments must be Buffers");
        if (c === a) return 0;
        for (var b = c.length,
        d = a.length,
        e = 0,
        g = Math.min(b, d); e < g; ++e) if (c[e] !== a[e]) {
            b = c[e];
            d = a[e];
            break
        }
        return b < d ? -1 : d < b ? 1 : 0
    };
    w.isEncoding = function(c) {
        switch (String(c).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return ! 0;
        default:
            return ! 1
        }
    };
    w.concat = function(c, a) {
        if (!te(c)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === c.length) return w.alloc(0);
        var b;
        if (undefined === a) for (b = a = 0; b < c.length; ++b) a += c[b].length;
        a = w.allocUnsafe(a);
        var d = 0;
        for (b = 0; b < c.length; ++b) {
            var e = c[b];
            if (!Oa(e)) throw new TypeError('"list" argument must be an Array of Buffers');
            e.copy(a, d);
            d += e.length
        }
        return a
    };
    w.byteLength = re;
    w.prototype._isBuffer = true;
    w.prototype.swap16 = function() {
        var c = this.length;
        if (0 !== c % 2) throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var a = 0; a < c; a += 2) ib(this, a, a + 1);
        return this
    };
    w.prototype.swap32 = function() {
        var c = this.length;
        if (0 !== c % 4) throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var a = 0; a < c; a += 4) ib(this, a, a + 3),
        ib(this, a + 1, a + 2);
        return this
    };
    w.prototype.swap64 = function() {
        var c = this.length;
        if (0 !== c % 8) throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var a = 0; a < c; a += 8) ib(this, a, a + 7),
        ib(this, a + 1, a + 6),
        ib(this, a + 2, a + 5),
        ib(this, a + 3, a + 4);
        return this
    };
    w.prototype.toString = function() {
        var c = this.length | 0;
        return 0 === c ? "": 0 === arguments.length ? ve(this, 0, c) : Jg.apply(this, arguments)
    };
    w.prototype.equals = function(c) {
        if (!Oa(c)) throw new TypeError("Argument must be a Buffer");
        return this === c ? true : 0 === w.compare(this, c)
    };
    w.prototype.inspect = function() {
        var c = "";
        0 < this.length && (c = this.toString("hex", 0, 50).match(/.{2}/g).join(" "), 50 < this.length && (c += " ... "));
        return "<Buffer " + c + ">"
    };
    w.prototype.compare = function(c, a, b, d, e) {
        if (!Oa(c)) throw new TypeError("Argument must be a Buffer");
        undefined === a && (a = 0);
        undefined === b && (b = c ? c.length: 0);
        undefined === d && (d = 0);
        undefined === e && (e = this.length);
        if (0 > a || b > c.length || 0 > d || e > this.length) throw new RangeError("out of range index");
        if (d >= e && a >= b) return 0;
        if (d >= e) return - 1;
        if (a >= b) return 1;
        a >>>= 0;
        b >>>= 0;
        d >>>= 0;
        e >>>= 0;
        if (this === c) return 0;
        var g = e - d,
        h = b - a,
        k = Math.min(g, h);
        d = this.slice(d, e);
        c = c.slice(a, b);
        for (a = 0; a < k; ++a) if (d[a] !== c[a]) {
            g = d[a];
            h = c[a];
            break
        }
        return g < h ? -1 : h < g ? 1 : 0
    };
    w.prototype.includes = function(c, a, b) {
        return - 1 !== this.indexOf(c, a, b)
    };
    w.prototype.indexOf = function(c, a, b) {
        return we(this, c, a, b, true)
    };
    w.prototype.lastIndexOf = function(c, a, b) {
        return we(this, c, a, b, false)
    };
    w.prototype.write = function(c, a, b, d) {
        if (undefined === a) d = "utf8",
        b = this.length,
        a = 0;
        else if (undefined === b && "string" === typeof a) d = a,
        b = this.length,
        a = 0;
        else if (isFinite(a)) a |= 0,
        isFinite(b) ? (b |= 0, undefined === d && (d = "utf8")) : (d = b, b = undefined);
        else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        var e = this.length - a;
        if (undefined === b || b > e) b = e;
        if (0 < c.length && (0 > b || 0 > a) || a > this.length) throw new RangeError("Attempt to write outside buffer bounds");
        d || (d = "utf8");
        for (e = false;;) switch (d) {
        case "hex":
            a:
            {
                a = Number(a) || 0;
                d = this.length - a;
                b ? (b = Number(b), b > d && (b = d)) : b = d;
                d = c.length;
                if (0 !== d % 2) throw new TypeError("Invalid hex string");
                b > d / 2 && (b = d / 2);
                for (d = 0; d < b; ++d) {
                    e = parseInt(c.substr(2 * d, 2), 16);
                    if (isNaN(e)) {
                        c = d;
                        break a
                    }
                    this[a + d] = e
                }
                c = d
            }
            return c;
        case "utf8":
        case "utf-8":
            return Qb(pc(c, this.length - a), this, a, b);
        case "ascii":
            return Qb(Ce(c), this, a, b);
        case "latin1":
        case "binary":
            return Qb(Ce(c), this, a, b);
        case "base64":
            return Qb(ue(c), this, a, b);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            d = c;
            e = this.length - a;
            for (var g = [], h = 0; h < d.length && !(0 > (e -= 2)); ++h) {
                var k = d.charCodeAt(h);
                c = k >> 8;
                k %= 256;
                g.push(k);
                g.push(c)
            }
            return Qb(g, this, a, b);
        default:
            if (e) throw new TypeError("Unknown encoding: " + d);
            d = ("" + d).toLowerCase();
            e = true
        }
    };
    w.prototype.toJSON = function() {
        return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
        }
    };
    var ye = 4096;
    w.prototype.slice = function(c, a) {
        var b = this.length;
        c = ~~c;
        a = undefined === a ? b: ~~a;
        0 > c ? (c += b, 0 > c && (c = 0)) : c > b && (c = b);
        0 > a ? (a += b, 0 > a && (a = 0)) : a > b && (a = b);
        a < c && (a = c);
        if (w.TYPED_ARRAY_SUPPORT) a = this.subarray(c, a),
        a.__proto__ = w.prototype;
        else {
            b = a - c;
            a = new w(b, undefined);
            for (var d = 0; d < b; ++d) a[d] = this[d + c]
        }
        return a
    };
    w.prototype.readUIntLE = function(c, a, b) {
        c |= 0;
        a |= 0;
        b || ka(c, a, this.length);
        b = this[c];
        for (var d = 1,
        e = 0; ++e < a && (d *= 256);) b += this[c + e] * d;
        return b
    };
    w.prototype.readUIntBE = function(c, a, b) {
        c |= 0;
        a |= 0;
        b || ka(c, a, this.length);
        b = this[c + --a];
        for (var d = 1; 0 < a && (d *= 256);) b += this[c + --a] * d;
        return b
    };
    w.prototype.readUInt8 = function(c, a) {
        a || ka(c, 1, this.length);
        return this[c]
    };
    w.prototype.readUInt16LE = function(c, a) {
        a || ka(c, 2, this.length);
        return this[c] | this[c + 1] << 8
    };
    w.prototype.readUInt16BE = function(c, a) {
        a || ka(c, 2, this.length);
        return this[c] << 8 | this[c + 1]
    };
    w.prototype.readUInt32LE = function(c, a) {
        a || ka(c, 4, this.length);
        return (this[c] | this[c + 1] << 8 | this[c + 2] << 16) + 16777216 * this[c + 3]
    };
    w.prototype.readUInt32BE = function(c, a) {
        a || ka(c, 4, this.length);
        return 16777216 * this[c] + (this[c + 1] << 16 | this[c + 2] << 8 | this[c + 3])
    };
    w.prototype.readIntLE = function(c, a, b) {
        c |= 0;
        a |= 0;
        b || ka(c, a, this.length);
        b = this[c];
        for (var d = 1,
        e = 0; ++e < a && (d *= 256);) b += this[c + e] * d;
        b >= 128 * d && (b -= Math.pow(2, 8 * a));
        return b
    };
    w.prototype.readIntBE = function(c, a, b) {
        c |= 0;
        a |= 0;
        b || ka(c, a, this.length);
        b = a;
        for (var d = 1,
        e = this[c + --b]; 0 < b && (d *= 256);) e += this[c + --b] * d;
        e >= 128 * d && (e -= Math.pow(2, 8 * a));
        return e
    };
    w.prototype.readInt8 = function(c, a) {
        a || ka(c, 1, this.length);
        return this[c] & 128 ? -1 * (255 - this[c] + 1) : this[c]
    };
    w.prototype.readInt16LE = function(c, a) {
        a || ka(c, 2, this.length);
        c = this[c] | this[c + 1] << 8;
        return c & 32768 ? c | 4294901760 : c
    };
    w.prototype.readInt16BE = function(c, a) {
        a || ka(c, 2, this.length);
        c = this[c + 1] | this[c] << 8;
        return c & 32768 ? c | 4294901760 : c
    };
    w.prototype.readInt32LE = function(c, a) {
        a || ka(c, 4, this.length);
        return this[c] | this[c + 1] << 8 | this[c + 2] << 16 | this[c + 3] << 24
    };
    w.prototype.readInt32BE = function(c, a) {
        a || ka(c, 4, this.length);
        return this[c] << 24 | this[c + 1] << 16 | this[c + 2] << 8 | this[c + 3]
    };
    w.prototype.readFloatLE = function(c, a) {
        a || ka(c, 4, this.length);
        return oc(this, c, true, 23, 4)
    };
    w.prototype.readFloatBE = function(c, a) {
        a || ka(c, 4, this.length);
        return oc(this, c, false, 23, 4)
    };
    w.prototype.readDoubleLE = function(c, a) {
        a || ka(c, 8, this.length);
        return oc(this, c, true, 52, 8)
    };
    w.prototype.readDoubleBE = function(c, a) {
        a || ka(c, 8, this.length);
        return oc(this, c, false, 52, 8)
    };
    w.prototype.writeUIntLE = function(c, a, b, d) {
        c = +c;
        a |= 0;
        b |= 0;
        d || ua(this, c, a, b, Math.pow(2, 8 * b) - 1, 0);
        d = 1;
        var e = 0;
        for (this[a] = c & 255; ++e < b && (d *= 256);) this[a + e] = c / d & 255;
        return a + b
    };
    w.prototype.writeUIntBE = function(c, a, b, d) {
        c = +c;
        a |= 0;
        b |= 0;
        d || ua(this, c, a, b, Math.pow(2, 8 * b) - 1, 0);
        d = b - 1;
        var e = 1;
        for (this[a + d] = c & 255; 0 <= --d && (e *= 256);) this[a + d] = c / e & 255;
        return a + b
    };
    w.prototype.writeUInt8 = function(c, a, b) {
        c = +c;
        a |= 0;
        b || ua(this, c, a, 1, 255, 0);
        w.TYPED_ARRAY_SUPPORT || (c = Math.floor(c));
        this[a] = c & 255;
        return a + 1
    };
    w.prototype.writeUInt16LE = function(c, a, b) {
        c = +c;
        a |= 0;
        b || ua(this, c, a, 2, 65535, 0);
        w.TYPED_ARRAY_SUPPORT ? (this[a] = c & 255, this[a + 1] = c >>> 8) : qc(this, c, a, true);
        return a + 2
    };
    w.prototype.writeUInt16BE = function(c, a, b) {
        c = +c;
        a |= 0;
        b || ua(this, c, a, 2, 65535, 0);
        w.TYPED_ARRAY_SUPPORT ? (this[a] = c >>> 8, this[a + 1] = c & 255) : qc(this, c, a, false);
        return a + 2
    };
    w.prototype.writeUInt32LE = function(c, a, b) {
        c = +c;
        a |= 0;
        b || ua(this, c, a, 4, 4294967295, 0);
        w.TYPED_ARRAY_SUPPORT ? (this[a + 3] = c >>> 24, this[a + 2] = c >>> 16, this[a + 1] = c >>> 8, this[a] = c & 255) : rc(this, c, a, true);
        return a + 4
    };
    w.prototype.writeUInt32BE = function(c, a, b) {
        c = +c;
        a |= 0;
        b || ua(this, c, a, 4, 4294967295, 0);
        w.TYPED_ARRAY_SUPPORT ? (this[a] = c >>> 24, this[a + 1] = c >>> 16, this[a + 2] = c >>> 8, this[a + 3] = c & 255) : rc(this, c, a, false);
        return a + 4
    };
    w.prototype.writeIntLE = function(c, a, b, d) {
        c = +c;
        a |= 0;
        d || (d = Math.pow(2, 8 * b - 1), ua(this, c, a, b, d - 1, -d));
        d = 0;
        var e = 1,
        g = 0;
        for (this[a] = c & 255; ++d < b && (e *= 256);) 0 > c && 0 === g && 0 !== this[a + d - 1] && (g = 1),
        this[a + d] = (c / e >> 0) - g & 255;
        return a + b
    };
    w.prototype.writeIntBE = function(c, a, b, d) {
        c = +c;
        a |= 0;
        d || (d = Math.pow(2, 8 * b - 1), ua(this, c, a, b, d - 1, -d));
        d = b - 1;
        var e = 1,
        g = 0;
        for (this[a + d] = c & 255; 0 <= --d && (e *= 256);) 0 > c && 0 === g && 0 !== this[a + d + 1] && (g = 1),
        this[a + d] = (c / e >> 0) - g & 255;
        return a + b
    };
    w.prototype.writeInt8 = function(c, a, b) {
        c = +c;
        a |= 0;
        b || ua(this, c, a, 1, 127, -128);
        w.TYPED_ARRAY_SUPPORT || (c = Math.floor(c));
        0 > c && (c = 255 + c + 1);
        this[a] = c & 255;
        return a + 1
    };
    w.prototype.writeInt16LE = function(c, a, b) {
        c = +c;
        a |= 0;
        b || ua(this, c, a, 2, 32767, -32768);
        w.TYPED_ARRAY_SUPPORT ? (this[a] = c & 255, this[a + 1] = c >>> 8) : qc(this, c, a, true);
        return a + 2
    };
    w.prototype.writeInt16BE = function(c, a, b) {
        c = +c;
        a |= 0;
        b || ua(this, c, a, 2, 32767, -32768);
        w.TYPED_ARRAY_SUPPORT ? (this[a] = c >>> 8, this[a + 1] = c & 255) : qc(this, c, a, false);
        return a + 2
    };
    w.prototype.writeInt32LE = function(c, a, b) {
        c = +c;
        a |= 0;
        b || ua(this, c, a, 4, 2147483647, -2147483648);
        w.TYPED_ARRAY_SUPPORT ? (this[a] = c & 255, this[a + 1] = c >>> 8, this[a + 2] = c >>> 16, this[a + 3] = c >>> 24) : rc(this, c, a, true);
        return a + 4
    };
    w.prototype.writeInt32BE = function(c, a, b) {
        c = +c;
        a |= 0;
        b || ua(this, c, a, 4, 2147483647, -2147483648);
        0 > c && (c = 4294967295 + c + 1);
        w.TYPED_ARRAY_SUPPORT ? (this[a] = c >>> 24, this[a + 1] = c >>> 16, this[a + 2] = c >>> 8, this[a + 3] = c & 255) : rc(this, c, a, false);
        return a + 4
    };
    w.prototype.writeFloatLE = function(c, a, b) {
        return Ae(this, c, a, true, b)
    };
    w.prototype.writeFloatBE = function(c, a, b) {
        return Ae(this, c, a, false, b)
    };
    w.prototype.writeDoubleLE = function(c, a, b) {
        return Be(this, c, a, true, b)
    };
    w.prototype.writeDoubleBE = function(c, a, b) {
        return Be(this, c, a, false, b)
    };
    w.prototype.copy = function(c, a, b, d) {
        b || (b = 0);
        d || 0 === d || (d = this.length);
        a >= c.length && (a = c.length);
        a || (a = 0);
        0 < d && d < b && (d = b);
        if (d === b || 0 === c.length || 0 === this.length) return 0;
        if (0 > a) throw new RangeError("targetStart out of bounds");
        if (0 > b || b >= this.length) throw new RangeError("sourceStart out of bounds");
        if (0 > d) throw new RangeError("sourceEnd out of bounds");
        d > this.length && (d = this.length);
        c.length - a < d - b && (d = c.length - a + b);
        var e = d - b;
        if (this === c && b < a && a < d) for (d = e - 1; 0 <= d; --d) c[d + a] = this[d + b];
        else if (1E3 > e || !w.TYPED_ARRAY_SUPPORT) for (d = 0; d < e; ++d) c[d + a] = this[d + b];
        else Uint8Array.prototype.set.call(c, this.subarray(b, b + e), a);
        return e
    };
    w.prototype.fill = function(c, a, b, d) {
        if ("string" === typeof c) {
            "string" === typeof a ? (d = a, a = 0, b = this.length) : "string" === typeof b && (d = b, b = this.length);
            if (1 === c.length) {
                var e = c.charCodeAt(0);
                256 > e && (c = e)
            }
            if (undefined !== d && "string" !== typeof d) throw new TypeError("encoding must be a string");
            if ("string" === typeof d && !w.isEncoding(d)) throw new TypeError("Unknown encoding: " + d);
        } else "number" === typeof c && (c &= 255);
        if (0 > a || this.length < a || this.length < b) throw new RangeError("Out of range index");
        if (b <= a) return this;
        a >>>= 0;
        b = undefined === b ? this.length: b >>> 0;
        c || (c = 0);
        if ("number" === typeof c) for (d = a; d < b; ++d) this[d] = c;
        else for (c = Oa(c) ? c: pc((new w(c, d)).toString()), e = c.length, d = 0; d < b - a; ++d) this[d + a] = c[d % e];
        return this
    };
    var Kg = /[^+\/0-9A-Za-z-_]/g,
    Nd = {
        normal: null,
        road: He()
    },
    LineLayer3D = function(c) {
        function a(b, c) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b, c));
            b.initData();
            return b
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    color: "rgba(25, 25, 250, 1)",
                    offset: 0,
                    blend: "normal",
                    width: 4,
                    flat: false,
                    antialias: false,
                    style: "normal",
                    dashArray: [0, 0],
                    dashOffset: 0
                }
            }
        },
        {
            key: "initData",
            value: function() {
                this.dataMgr = {
                    position: [],
                    prev: [],
                    next: [],
                    direction: [],
                    color: [],
                    index: [],
                    counter: [],
                    uv: []
                }
            }
        },
        {
            key: "initialize",
            value: function(a) {
                this.gl = a;
                var b = this.getOptions(),
                c = [];
                b.enablePicked && c.push("PICK");
                Nd[b.style] && (this.isUseTexture = true, c.push("USE_TEXTURE"));
                this.program = new Program(this.gl, {
                    vertexShader: "precision highp float;uniform vec4 uSelectedColor;uniform mat4 uMatrix;uniform bool uFlat;uniform vec2 uDashArray;uniform float thickness;uniform float zoomUnits;uniform float devicePixelRatio;uniform float uOffset;attribute vec3 position;attribute vec3 next;attribute vec3 previous;attribute float direction;attribute vec4 aColor;attribute float aDistance;attribute float aTotalDistance;\n#if defined(USE_TEXTURE)\nattribute vec2 uv;\n#endif\nvarying vec4 vColor;varying vec2 vNormal;varying vec2 vUV;varying vec2 vDashArray;varying float vTotalDistance;varying float vCounter;vec2 project(vec4 coord){vec3 screen=coord.xyz/coord.w;vec2 clip=(screen.xy+1.0)/2.0;return clip*MAPV_resolution;}vec4 unproject(vec2 projected,float z,float w){vec2 clip=projected/MAPV_resolution;vec2 screen=clip*2.0-1.0;return vec4(screen*w,z,w);}vec3 getNormalAndWidth(vec2 currentScreen,vec2 previousScreen,vec2 nextScreen,float thickness){vec2 dir=vec2(0.0);if(currentScreen==previousScreen){dir=normalize(nextScreen-currentScreen);}else if(currentScreen==nextScreen){dir=normalize(currentScreen-previousScreen);}else{vec2 dirA=normalize((currentScreen-previousScreen));vec2 dirB=normalize((nextScreen-currentScreen));vec2 tangent=normalize(dirA+dirB);vec2 perp=vec2(-dirA.y,dirA.x);vec2 miter=vec2(-tangent.y,tangent.x);dir=tangent;float angle=40.0;if(dot(dirA,dirB)>cos(radians(angle))){thickness=thickness/dot(miter,perp);}}vec2 normal=vec2(-dir.y,dir.x);return vec3(normal,thickness);}void main(){vColor=aColor;vCounter=aDistance/aTotalDistance;vDashArray=zoomUnits*uDashArray/aTotalDistance;vTotalDistance=aTotalDistance;\n#if defined(USE_TEXTURE)\nvUV=uv;\n#endif\n#if defined(PICK)\nif(mapvIsPicked()){vColor=uSelectedColor;}\n#endif\nif(uFlat){float width=thickness*zoomUnits;vec3 nw=getNormalAndWidth(position.xy,previous.xy,next.xy,width);width=nw.z;vec2 normal=nw.xy;vNormal=normal*direction;normal*=width/2.0;float offsetXy=uOffset/zoomUnits;float offsetHeight=uOffset*zoomUnits/100.0;gl_Position=uMatrix*vec4(position.xy+normal*(direction+offsetXy),position.z+offsetHeight,1.0);}else{vec4 previousProjected=uMatrix*vec4(previous,1.0);vec4 currentProjected=uMatrix*vec4(position,1.0);vec4 nextProjected=uMatrix*vec4(next,1.0);vec2 currentScreen=project(currentProjected);vec2 previousScreen=project(previousProjected);vec2 nextScreen=project(nextProjected);float width=thickness*devicePixelRatio;vec3 nw=getNormalAndWidth(currentScreen,previousScreen,nextScreen,width);width=nw.z;vec2 normal=nw.xy;vNormal=normal*direction;normal*=width/2.0;vec2 pos=currentScreen+normal*direction;vec4 finalPos=unproject(pos,currentProjected.z,currentProjected.w);gl_Position=finalPos;}}",
                    fragmentShader: "precision highp float;varying vec4 vColor;varying vec2 vNormal;varying vec2 vUV;varying vec2 vDashArray;varying float vCounter;varying float vTotalDistance;uniform bool uAntialias;uniform float uDashOffset;uniform float zoomUnits;uniform float thickness;\n#if defined(USE_TEXTURE)\nuniform float uTextureMargin;uniform sampler2D textureImage;\n#endif\nvoid main(){vec4 color=vColor;if(uAntialias){float blur=1.0;blur=1.0-smoothstep(0.8,1.0,length(vNormal));color.a*=blur;}\n#if defined(USE_TEXTURE)\nfloat segLen=uTextureMargin*zoomUnits;float textureLen=thickness*zoomUnits;float deltaX=mod(vUV.x,segLen);float middle=segLen/2.0;if(deltaX>=middle&&deltaX<=middle+textureLen){float uvx=(deltaX-middle)/textureLen;vec4 texture=texture2D(textureImage,vec2(uvx,vUV.y));color=texture.a>=0.5 ? texture : color;}\n#endif\nif(vDashArray.y>0.0){float offset=uDashOffset*zoomUnits/vTotalDistance;color.a*=(1.0-step(vDashArray.x,mod(vCounter+offset,vDashArray.x+vDashArray.y)));}gl_FragColor=color;}",
                    defines: c
                },
                this);
                this.prevBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.currentBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.nextBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.directionBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.colorBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.counterBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.uvBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.indexBuffer = new Buffer({
                    gl: a,
                    target: "ELEMENT_ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                c = [{
                    stride: 12,
                    name: "previous",
                    buffer: this.prevBuffer,
                    size: 3,
                    type: "FLOAT",
                    offset: 0
                },
                {
                    stride: 12,
                    name: "position",
                    buffer: this.currentBuffer,
                    size: 3,
                    type: "FLOAT",
                    offset: 0
                },
                {
                    stride: 12,
                    name: "next",
                    buffer: this.nextBuffer,
                    size: 3,
                    type: "FLOAT",
                    offset: 0
                },
                {
                    stride: 4,
                    name: "direction",
                    buffer: this.directionBuffer,
                    size: 1,
                    type: "FLOAT",
                    offset: 0
                },
                {
                    stride: 16,
                    name: "aColor",
                    buffer: this.colorBuffer,
                    size: 4,
                    type: "FLOAT",
                    offset: 0
                },
                {
                    stride: 8,
                    name: "aDistance",
                    buffer: this.counterBuffer,
                    size: 1,
                    type: "FLOAT",
                    offset: 0
                },
                {
                    stride: 8,
                    name: "aTotalDistance",
                    buffer: this.counterBuffer,
                    size: 1,
                    type: "FLOAT",
                    offset: 4
                }];
                c = c.concat(this.getCommonAttributes());
                Nd[b.style] && (c.push({
                    stride: 8,
                    name: "uv",
                    buffer: this.uvBuffer,
                    size: 2,
                    type: "FLOAT",
                    offset: 0
                }), this.setOptions({
                    texture: Nd[b.style]
                }), this.loadTexture());
                this.vertexArray = new VertexArray({
                    gl: a,
                    program: this.program,
                    attributes: c
                })
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                var b = this;
                if (this.gl) {
                    this.initData();
                    for (var d = a.color,
                    h = [], k = 0; k < c.length; k++) {
                        var l = [],
                        m = c[k].geometry.coordinates;
                        m && 0 < m.length && (l = "Polygon" === c[k].geometry.type ? m[0].map(function(a) {
                            return b.normizedPoint(a)
                        }) : m.map(function(a) {
                            return b.normizedPoint(a)
                        }));
                        m = c[k].color || d;
                        "properties" in c[k] && "color" in c[k].properties && (m = c[k].properties.color);
                        "[object Function]" === Object.prototype.toString.call(m) && (m = m(c[k]));
                        m = this.normizedColor(m);
                        for (var p = this.addMultipleCoords(l), n = 0; n < p.length; n++) this.processData(this.dataMgr, p[n], m);
                        if (a.enablePicked) for (m = this.indexToRgb(k), p = 0; p < l.length; p++) h.push(m[0] / 255, m[1] / 255, m[2] / 255),
                        h.push(m[0] / 255, m[1] / 255, m[2] / 255),
                        a.repeat && (h.push(m[0] / 255, m[1] / 255, m[2] / 255), h.push(m[0] / 255, m[1] / 255, m[2] / 255), h.push(m[0] / 255, m[1] / 255, m[2] / 255), h.push(m[0] / 255, m[1] / 255, m[2] / 255))
                    }
                    this.counterBuffer.updateData(new Float32Array(this.dataMgr.counter));
                    this.currentBuffer.updateData(new Float32Array(this.dataMgr.position));
                    this.prevBuffer.updateData(new Float32Array(this.dataMgr.prev));
                    this.nextBuffer.updateData(new Float32Array(this.dataMgr.next));
                    this.directionBuffer.updateData(new Float32Array(this.dataMgr.direction));
                    this.colorBuffer.updateData(new Float32Array(this.dataMgr.color));
                    this.indexBuffer.updateData(new Uint32Array(this.dataMgr.index));
                    this.isUseTexture && this.uvBuffer.updateData(new Float32Array(this.dataMgr.uv));
                    a.enablePicked && this.pickBuffer.updateData(new Float32Array(h))
                }
            }
        },
        {
            key: "processData",
            value: function(a, c, e) {
                var b, d, k, l, m, p, n, r, q = c.length,
                t = a.position.length / 6,
                y = Fe(c),
                v = y.arr,
                x = y.total;
                y = Da(v.map(function(a) {
                    return [a, x]
                }));
                v = v.map(function(a) {
                    return [a, 0, a, 1]
                });
                var u = Da(c.map(function(a) {
                    return - 1
                }), true),
                B = Da(c),
                A = Da(c.map(sc( - 1))),
                D = Da(c.map(sc(1)));
                c = Da(c.map(function(a) {
                    return e
                }));
                q = Ee(q, t); (b = a.uv).push.apply(b, Y(Pa(v))); (d = a.counter).push.apply(d, Y(Pa(y))); (k = a.position).push.apply(k, Y(Pa(B))); (l = a.prev).push.apply(l, Y(Pa(A))); (m = a.next).push.apply(m, Y(Pa(D))); (p = a.direction).push.apply(p, Y(u)); (n = a.color).push.apply(n, Y(Pa(c))); (r = a.index).push.apply(r, Y(q))
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl,
                c = a.matrix,
                g = this.dataMgr;
                if (g && !(0 >= g.index.length) && this.map) {
                    var h = this.getOptions(),
                    k = this.program;
                    k.use(b);
                    a = Object.assign(this.getCommonUniforms(a), {
                        uMatrix: c,
                        uFlat: h.flat,
                        zoomUnits: this.map.getZoomUnits(),
                        devicePixelRatio: window.devicePixelRatio,
                        thickness: h.width,
                        uDashArray: h.dashArray,
                        uDashOffset: h.dashOffset,
                        uAntialias: h.antialias,
                        uOffset: h.offset
                    });
                    this.isUseTexture && (a = Object.assign(a, {
                        uTextureMargin: 140,
                        textureImage: this.texture
                    }));
                    k.setUniforms(a);
                    b.enable(b.BLEND);
                    b.blendEquation(b.FUNC_ADD);
                    h.blend && "lighter" === h.blend ? b.blendFunc(b.SRC_ALPHA, b.ONE) : b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
                    this.indexBuffer.bind();
                    this.vertexArray.bind();
                    b.drawElements(b.TRIANGLES, g.index.length, b.UNSIGNED_INT, 0);
                    b.bindBuffer(b.ARRAY_BUFFER, null);
                    b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, null);
                    b.disable(b.BLEND)
                }
            }
        },
        {
            key: "loadTexture",
            value: function(a) {
                var b = this,
                c = this.getOptions();
                c.texture ? Ma(this.gl, c.texture,
                function(c, d) {
                    b.image = d;
                    b.texture = c;
                    a && a();
                    b.webglLayer.render()
                }) : (this.image = this.texture = null, a && a())
            }
        }]);
        return a
    } (Layer),
    zi = function() {
        function c(a) {
            I(this, c);
            this.join = a.join || "miter";
            this.cap = a.cap || "butt";
            this.thickness = a.thickness || 4;
            this.miterLimit = a.miterLimit || 2 * this.thickness;
            this.dash = a.dash || false;
            this.complex = {
                positions: [],
                indices: [],
                normals: [],
                colors: [],
                uvs: [],
                startIndex: 0,
                maxDistance: 0
            };
            this._lastFlip = -1;
            this._started = false;
            this._normal = null;
            this._totalDistance = 0
        }
        M(c, [{
            key: "extrude",
            value: function(a, b) {
                var c = this.complex;
                if (1 >= a.length) return c;
                this._lastFlip = -1;
                this._started = false;
                this._normal = null;
                this._totalDistance = 0;
                for (var e = a.length,
                g = c.startIndex,
                h = 1; h < e; h++) {
                    var k = this._segment(c, g, a[h - 1], a[h], h < e - 1 ? a[h + 1] : null, b); - 1 !== k && (g += k)
                }
                this.dash && (c.maxDistance = Math.max(this._totalDistance, c.maxDistance));
                c.startIndex = c.positions.length / 6;
                return c
            }
        },
        {
            key: "_segment",
            value: function(a, b, c, e, g, h) {
                var d = 0,
                l = P.create(),
                m = P.create(),
                p = P.create(),
                n = P.create(),
                r = a.indices,
                q = a.positions,
                t = a.normals,
                y = a.colors;
                a = a.uvs;
                var v = "square" === this.cap,
                x = "round" === this.cap,
                u = "bevel" === this.join,
                B = "round" === this.join,
                A = [e[0], e[1]],
                D = [c[0], c[1]];
                Ie(m, A, D);
                var C = 0;
                this.dash && (C = this._calcDistance(A, D), this._totalDistance += C);
                this._normal || (this._normal = P.create(), tc(this._normal, m));
                if (!this._started) if (this._started = true, v) {
                    D = P.create();
                    var G = P.create();
                    P.add(D, this._normal, m);
                    P.sub(G, this._normal, m);
                    t.push(G[0], G[1], 0);
                    t.push(D[0], D[1], 0);
                    q.push(c[0], c[1], c[2], this._totalDistance - C, this.thickness, 0);
                    q.push(c[0], c[1], c[2], this._totalDistance - C, -this.thickness, 0);
                    a.push(this._totalDistance - C, 0, this._totalDistance - C, 1);
                    y.push(h[0], h[1], h[2], h[3]);
                    y.push(h[0], h[1], h[2], h[3])
                } else if (x) {
                    D = P.fromValues( - m[0], -m[1]);
                    G = P.create();
                    P.sub(G, this._normal, m);
                    P.normalize(G, G);
                    var H = P.create();
                    P.add(H, this._normal, m);
                    P.normalize(H, H);
                    var J = P.fromValues(this._normal[0], this._normal[1]),
                    w = P.fromValues( - this._normal[0], -this._normal[1]);
                    t.push(D[0], D[1], 0);
                    t.push(G[0], G[1], 0);
                    t.push( - H[0], -H[1], 0);
                    t.push(J[0], J[1], 0);
                    t.push(w[0], w[1], 0);
                    for (D = 0; 5 > D; D++) q.push(c[0], c[1], c[2], this._totalDistance - C, this.thickness, 0),
                    a.push(this._totalDistance - C, 0),
                    y.push(h[0], h[1], h[2], h[3]);
                    r.push(b + 0, b + 2, b + 1, b + 1, b + 2, b + 3, b + 3, b + 2, b + 4);
                    d += 3;
                    b += 3
                } else this._extrusions(q, t, a, y, c, this._normal, this.thickness, this._totalDistance - C, h);
                r.push.apply(r, Y( - 1 === this._lastFlip ? [b + 0, b + 1, b + 2] : [b + 1, b + 0, b + 2]));
                if (g) {
                    if (e[0] === g[0] && e[1] === g[1] && e[2] === g[2]) return - 1;
                    Ie(p, [g[0], g[1]], A);
                    P.create();
                    x = this.thickness;
                    P.add(n, m, p);
                    P.normalize(n, n);
                    C = P.fromValues( - n[1], n[0]);
                    m = P.fromValues( - m[1], m[0]);
                    m = [x / P.dot(C, m), C];
                    m = Ia(m, 2);
                    C = m[0];
                    m = m[1];
                    n = 0 < P.dot(n, this._normal) ? -1 : 1;
                    u || "miter" !== this.join || Math.abs(C) > this.miterLimit && (u = true);
                    u ? (B = Math.min(2 * this.thickness, Math.abs(C)), t.push(this._normal[0], this._normal[1], 0), t.push(m[0], m[1], 0), q.push(e[0], e[1], e[2], this._totalDistance, this.thickness * n, 0), q.push(e[0], e[1], e[2], this._totalDistance, -B * n, 0), r.push.apply(r, Y(this._lastFlip === -n ? [b + 2, b + 1, b + 3] : [b + 0, b + 2, b + 3])), tc(l, p), P.copy(this._normal, l), t.push(this._normal[0], this._normal[1], 0), q.push(e[0], e[1], e[2], this._totalDistance, this.thickness * n, 0), r.push.apply(r, Y(1 === n ? [b + 2, b + 3, b + 4] : [b + 3, b + 2, b + 4])), this._flipedUV(a, this._totalDistance, n, true), y.push(h[0], h[1], h[2], h[3]), y.push(h[0], h[1], h[2], h[3]), y.push(h[0], h[1], h[2], h[3]), d += 3) : B ? (B = Math.min(2 * this.thickness, Math.abs(C)), t.push(this._normal[0], this._normal[1], 0), t.push(m[0], m[1], 0), t.push(m[0], m[1], 0), q.push(e[0], e[1], e[2], this._totalDistance, this.thickness * n, 0), q.push(e[0], e[1], e[2], this._totalDistance, this.thickness * n, 0), q.push(e[0], e[1], e[2], this._totalDistance, -B * n, 0), r.push.apply(r, Y(this._lastFlip === -n ? [b + 2, b + 1, b + 4, b + 2, b + 4, b + 3] : [b + 0, b + 2, b + 4, b + 2, b + 3, b + 4])), tc(l, p), P.copy(this._normal, l), t.push(this._normal[0], this._normal[1], 0), q.push(e[0], e[1], e[2], this._totalDistance, this.thickness * n, 0), r.push.apply(r, Y(1 === n ? [b + 4, b + 3, b + 5] : [b + 3, b + 4, b + 5])), this._flipedUV(a, this._totalDistance, n, false), y.push(h[0], h[1], h[2], h[3]), y.push(h[0], h[1], h[2], h[3]), y.push(h[0], h[1], h[2], h[3]), y.push(h[0], h[1], h[2], h[3]), d += 4) : (this._extrusions(q, t, a, y, e, m, C, this._totalDistance, h), r.push.apply(r, Y( - 1 === this._lastFlip ? [b + 2, b + 1, b + 3] : [b + 2, b + 0, b + 3])), n = -1, P.copy(this._normal, m), d += 2);
                    this._lastFlip = n
                } else if (tc(this._normal, m), v ? (l = P.create(), p = P.create(), P.add(l, m, this._normal), P.sub(p, m, this._normal), t.push(l[0], l[1], 0), t.push(p[0], p[1], 0), q.push(e[0], e[1], e[2], this._totalDistance, this.thickness, 0), q.push(e[0], e[1], e[2], this._totalDistance, this.thickness, 0), a.push(this._totalDistance, 0, this._totalDistance, 1), y.push(h[0], h[1], h[2], h[3]), y.push(h[0], h[1], h[2], h[3])) : this._extrusions(q, t, a, y, e, this._normal, this.thickness, this._totalDistance, h), r.push.apply(r, Y( - 1 === this._lastFlip ? [b + 2, b + 1, b + 3] : [b + 2, b + 0, b + 3])), d += 2, x) {
                    l = P.create();
                    P.add(l, m, this._normal);
                    P.normalize(l, l);
                    p = P.create();
                    P.sub(p, m, this._normal);
                    P.normalize(p, p);
                    B = P.fromValues(m[0], m[1]);
                    t.push(l[0], l[1], 0);
                    t.push(p[0], p[1], 0);
                    t.push(B[0], B[1], 0);
                    for (t = 0; 3 > t; t++) q.push(e[0], e[1], e[2], this._totalDistance - C, this.thickness, 0),
                    a.push(this._totalDistance - C, 0),
                    y.push(h[0], h[1], h[2], h[3]);
                    r.push(b + 2, b + 3, b + 4, b + 4, b + 3, b + 5, b + 4, b + 5, b + 6);
                    d += 3
                }
                return d
            }
        },
        {
            key: "_extrusions",
            value: function(a, b, c, e, g, h, k, l, m) {
                b.push(h[0], h[1], 0);
                b.push(h[0], h[1], 0);
                a.push(g[0], g[1], g[2], l, k, 0);
                a.push(g[0], g[1], g[2], l, -k, 0);
                c.push(l, 0, l, 1);
                e.push(m[0], m[1], m[2], m[3]);
                e.push(m[0], m[1], m[2], m[3])
            }
        },
        {
            key: "_calcDistance",
            value: function(a, b) {
                return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2))
            }
        },
        {
            key: "_flipedUV",
            value: function(a, b, c, e) {
                e ? -1 === c ? a.push(b, 0, b, 1, b, 0) : a.push(b, 1, b, 0, b, 1) : -1 === c ? a.push(b, 0, b, 0, b, 1, b, 0) : a.push(b, 1, b, 1, b, 0, b, 1)
            }
        }]);
        return c
    } (),
    Lf = {
        normal: null,
        road: He,
        arrow: function() {
            var c = 0 < arguments.length && undefined !== arguments[0] ? arguments[0] : {},
            a = c.width;
            c = c.color;
            var b = Ge(),
            d = b.canvas;
            b = b.ctx;
            b.save();
            b.moveTo(5, 0);
            b.lineTo(32, 16);
            b.lineTo(5, 32);
            b.strokeStyle = c || "#f00";
            b.lineWidth = a || 8;
            b.stroke();
            b.restore();
            return d
        }
    },
    LineLayer = function(c) {
        function a(b, c) {
            I(this, a);
            return Q(this, (a.__proto__ || N(a)).call(this, b, c))
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
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
                    interval: .1,
                    duration: 2,
                    trailLength: .5,
                    minZoom: 4,
                    maxZoom: 21
                }
            }
        },
        {
            key: "initialize",
            value: function(a) {
                this.gl = a;
                var b = this.getOptions(),
                c = [];
                b.enablePicked && c.push("PICK");
                Lf[b.style] && (this.isUseTexture = true, c.push("USE_TEXTURE")); ! 0 === b.animation && (this.isAnimateLine = true, this.date = new Date, this.autoUpdate = true, c.push("USE_LINE_ANIMATION"));
                this.program = new Program(this.gl, {
                    vertexShader: "precision highp float;uniform vec4 uSelectedColor;uniform mat4 u_matrix;uniform vec2 u_dash_array;uniform float u_zoom_units;uniform float u_offset;attribute vec4 a_color;attribute vec3 a_position;attribute vec3 a_normal;attribute float a_distance;attribute float a_total_distance;attribute float a_width;\n#if defined(USE_TEXTURE)\nattribute vec2 uv;\n#endif\nvarying vec4 v_color;varying vec2 v_normal;varying vec2 v_uv;varying vec2 v_dash_array;varying float v_total_distance;varying float v_counter;varying float v_width;void main(){v_width=a_width;v_color=a_color;v_counter=a_distance/a_total_distance;v_dash_array=u_zoom_units*u_dash_array/a_total_distance;v_total_distance=a_total_distance;v_normal=vec2(normalize(a_normal.xy)*sign(a_width));\n#if defined(USE_TEXTURE)\nv_uv=uv;\n#endif\n#if defined(PICK)\nif(mapvIsPicked()){v_color=uSelectedColor;}\n#endif\nvec2 extrude=a_normal.xy*a_width/2.0*u_zoom_units;vec2 offsetXY=a_normal.xy*u_offset;float offsetZ=u_offset*u_zoom_units/100.0;gl_Position=u_matrix*vec4(a_position.xy+extrude+offsetXY,a_position.z+offsetZ,1.0);}",
                    fragmentShader: "precision highp float;varying vec4 v_color;varying vec2 v_normal;varying vec2 v_uv;varying vec2 v_dash_array;varying float v_counter;varying float v_total_distance;varying float v_width;uniform bool u_antialias;uniform float u_dash_offset;uniform float u_zoom_units;\n#if defined(USE_LINE_ANIMATION)\nuniform bool u_animate;uniform float u_time;uniform float u_duration;uniform float u_interval;uniform float u_trail_length;\n#endif\n#if defined(USE_TEXTURE)\nuniform float u_texture_width;uniform float u_texture_margin;uniform sampler2D u_sampler;\n#endif\nvoid main(){vec4 color=v_color;if(u_antialias){float blur=1.0;blur=1.0-smoothstep(0.9,1.0,length(v_normal));color.a*=blur;}\n#if defined(USE_LINE_ANIMATION)\nif(u_animate){float alpha=1.0-fract(mod(1.0-v_counter,u_interval)*(1.0/u_interval)+u_time/u_duration);alpha=(alpha+u_trail_length-1.0)/u_trail_length;color.a*=alpha;gl_FragColor=color;return;}\n#endif\n#if defined(USE_TEXTURE)\nfloat margin_width=u_texture_margin*u_zoom_units;float margin_width_half=margin_width/2.0;float texture_width=u_texture_width*u_zoom_units;float delta=mod(v_uv.x,texture_width+margin_width);if(delta>=margin_width_half&&delta<=margin_width_half+texture_width){float uvx=(delta-margin_width_half)/texture_width;vec4 texture=texture2D(u_sampler,vec2(uvx,v_uv.y));color=texture.a>=0.5 ? texture : color;}\n#endif\nif(v_dash_array.y>0.0){float offset=u_dash_offset*u_zoom_units/v_total_distance;color.a*=(1.0-step(v_dash_array.x,mod(v_counter+offset,v_dash_array.x+v_dash_array.y)));}gl_FragColor=color;}",
                    defines: c
                },
                this);
                this.positionBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.colorBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.normalBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.indexBuffer = new Buffer({
                    gl: a,
                    target: "ELEMENT_ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                c = [{
                    stride: 24,
                    name: "a_position",
                    buffer: this.positionBuffer,
                    size: 3,
                    type: "FLOAT",
                    offset: 0
                },
                {
                    stride: 24,
                    name: "a_distance",
                    buffer: this.positionBuffer,
                    size: 1,
                    type: "FLOAT",
                    offset: 12
                },
                {
                    stride: 24,
                    name: "a_width",
                    buffer: this.positionBuffer,
                    size: 1,
                    type: "FLOAT",
                    offset: 16
                },
                {
                    stride: 24,
                    name: "a_total_distance",
                    buffer: this.positionBuffer,
                    size: 1,
                    type: "FLOAT",
                    offset: 20
                },
                {
                    stride: 12,
                    name: "a_normal",
                    buffer: this.normalBuffer,
                    size: 3,
                    type: "FLOAT",
                    offset: 0
                },
                {
                    stride: 16,
                    name: "a_color",
                    buffer: this.colorBuffer,
                    size: 4,
                    type: "FLOAT",
                    offset: 0
                }];
                c = c.concat(this.getCommonAttributes());
                this.isUseTexture && (this.uvBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                }), c.push({
                    stride: 8,
                    name: "uv",
                    buffer: this.uvBuffer,
                    size: 2,
                    type: "FLOAT",
                    offset: 0
                }), b = (0, Lf[b.style])(b.styleOptions), this.setOptions({
                    texture: b
                }), this.loadTexture());
                this.vertexArray = new VertexArray({
                    gl: a,
                    program: this.program,
                    attributes: c
                })
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                var b = this;
                if (this.gl) {
                    var d = a.dashArray,
                    h = a.color;
                    d = !!this.isUseTexture || !!d[1] || !!this.isAnimateLine;
                    var k = new zi({
                        dash: d,
                        cap: a.lineCap,
                        join: a.lineJoin,
                        miterLimit: a.miterLimit,
                        thickness: a.width
                    }),
                    l = [],
                    m = function(d) {
                        var e = c[d].geometry.coordinates;
                        e && 0 < e.length && ("Polygon" !== c[d].geometry.type && "MultiLineString" !== c[d].geometry.type && (e = [e]), e = e.map(function(a) {
                            return a.map(function(a) {
                                return b.normizedPoint(a)
                            })
                        }));
                        var g = c[d].color || h;
                        "properties" in c[d] && "color" in c[d].properties && (g = c[d].properties.color);
                        "[object Function]" === Object.prototype.toString.call(g) && (g = g(c[d]));
                        g = b.normizedColor(g);
                        var n = k.complex.startIndex;
                        e = b.addMultipleCoords(e);
                        for (var m = 0; m < e.length; m++) e[m].forEach(function(a) {
                            k.extrude(a, g)
                        });
                        if (a.enablePicked) for (d = b.indexToRgb(d), e = k.complex.startIndex; n < e; n++) l.push(d[0] / 255, d[1] / 255, d[2] / 255),
                        a.repeat && (l.push(d[0] / 255, d[1] / 255, d[2] / 255), l.push(d[0] / 255, d[1] / 255, d[2] / 255))
                    },
                    p = 0;
                    for (; p < c.length; p++) m(p);
                    m = k.complex;
                    if (d) for (p = 0; p < m.positions.length / 6; p++) m.positions[6 * p + 5] = m.maxDistance;
                    this.lineData = m;
                    this.positionBuffer.updateData(new Float32Array(m.positions));
                    this.normalBuffer.updateData(new Float32Array(m.normals));
                    this.colorBuffer.updateData(new Float32Array(m.colors));
                    this.indexBuffer.updateData(new Uint32Array(m.indices));
                    this.isUseTexture && this.uvBuffer.updateData(new Float32Array(m.uvs));
                    a.enablePicked && this.pickBuffer.updateData(new Float32Array(l))
                }
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl,
                c = a.matrix,
                g = this.lineData;
                if (g && !(0 >= g.indices.length) && this.map) {
                    var h = this.getOptions(),
                    k = this.program;
                    k.use(b);
                    a = Object.assign(this.getCommonUniforms(a), {
                        u_matrix: c,
                        u_zoom_units: this.map.getZoomUnits(),
                        u_dash_array: h.dashArray,
                        u_dash_offset: h.dashOffset,
                        u_antialias: h.antialias,
                        u_offset: h.offset
                    });
                    this.isUseTexture && (a = Object.assign(a, {
                        u_texture_width: h.width,
                        u_texture_margin: 140,
                        u_sampler: this.texture
                    }));
                    this.isAnimateLine && (c = this.map.getZoom(), a = Object.assign(a, {
                        u_time: (new Date - this.date) / 1E3,
                        u_animate: c >= h.minZoom && c <= h.maxZoom && this.autoUpdate ? true : false,
                        u_duration: h.duration,
                        u_interval: h.interval,
                        u_trail_length: h.trailLength
                    }));
                    k.setUniforms(a);
                    b.enable(b.BLEND);
                    b.blendEquation(b.FUNC_ADD);
                    h.blend && "lighter" === h.blend ? b.blendFunc(b.SRC_ALPHA, b.ONE) : b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
                    this.indexBuffer.bind();
                    this.vertexArray.bind();
                    b.drawElements(b.TRIANGLES, g.indices.length, b.UNSIGNED_INT, 0);
                    b.bindBuffer(b.ARRAY_BUFFER, null);
                    b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, null);
                    b.disable(b.BLEND)
                }
            }
        },
        {
            key: "loadTexture",
            value: function(a) {
                var b = this,
                c = this.getOptions();
                c.texture ? Ma(this.gl, c.texture,
                function(c, d) {
                    b.image = d;
                    b.texture = c;
                    a && a();
                    b.webglLayer.render()
                }) : (this.image = this.texture = null, a && a())
            }
        }]);
        return a
    } (Layer),
    Bi = function() {
        function c(a, b) {
            I(this, c);
            this.layer = a;
            this.gl = b;
            this.initData()
        }
        M(c, [{
            key: "initData",
            value: function() {
                this.outWall3d = {
                    vertex: [],
                    vertexBuffer: [],
                    index: [],
                    indexBuffer: []
                };
                this.maxLength = 0
            }
        },
        {
            key: "getData",
            value: function() {
                return this.outWall3d
            }
        },
        {
            key: "getMaxDataLength",
            value: function() {
                return this.maxLength
            }
        },
        {
            key: "onLayerChange",
            value: function(a, b) {
                this.initData();
                var c = a.color,
                e = a.height,
                g = a.gradient;
                a = this.gl;
                for (var h = 0; h < b.length; h++) {
                    var k = b[h].geometry.coordinates,
                    l = k.length;
                    this.maxLength = l > this.maxLength ? l: this.maxLength;
                    for (var m = [], p = 0; p < l; p++) {
                        var n = this.layer.normizedPoint(k[p]);
                        m.push(n)
                    }
                    l = b[h].color || c;
                    "properties" in b[h] && "color" in b[h].properties && (l = b[h].properties.color);
                    g || "[object Function]" !== Object.prototype.toString.call(l) || (l = l(b[h]));
                    k = this.layer.normizedColor(g ? g[0] : l);
                    l = this.layer.normizedColor(g ? g[1] : l);
                    p = b[h].height || e;
                    "properties" in b[h] && "height" in b[h].properties && (p = b[h].properties.height);
                    "[object Function]" === Object.prototype.toString.call(p) && (p = p(b[h]));
                    this.processData(this.outWall3d, m, k, l, p)
                }
                for (b = 0; b < this.outWall3d.vertex.length; b++) {
                    c = [];
                    e = this.outWall3d.vertex[b].length;
                    for (g = 0; g < e; g++) c.push.apply(c, Y(this.outWall3d.vertex[b][g]));
                    e = a.createBuffer();
                    a.bindBuffer(a.ARRAY_BUFFER, e);
                    a.bufferData(a.ARRAY_BUFFER, new Float32Array(c), a.STATIC_DRAW);
                    this.outWall3d.vertexBuffer[b] = e;
                    a.bindBuffer(a.ARRAY_BUFFER, null);
                    e = a.createBuffer();
                    a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, e);
                    a.bufferData(a.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.outWall3d.index[b]), a.STATIC_DRAW);
                    this.outWall3d.indexBuffer[b] = e;
                    a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, null)
                }
            }
        },
        {
            key: "processData",
            value: function(a, b, c, e, g) {
                var d = a.vertex[a.vertex.length - 1],
                k = a.index[a.index.length - 1],
                l = b.length;
                if (!k || 65536 <= k.length + 2 * l + 2) d = [],
                k = [],
                a.vertex.push(d),
                a.index.push(k); (a = d.length) && k.push(a - 1, a);
                for (var m = a = 0; m < l; m++) {
                    var p = [],
                    n = [],
                    r = b[m];
                    p.push(r[0], r[1]);
                    p.push(r[2] ? Number(r[2]) + g: g);
                    p.push(r[3] ? Number(r[3]) : m);
                    p.push(a);
                    p.push(c[0], c[1], c[2], c[3]);
                    n.push(r[0], r[1]);
                    n.push(r[2] ? Number(r[2]) : 0);
                    n.push(r[3] ? Number(r[3]) : m);
                    n.push(a);
                    n.push(e[0], e[1], e[2], e[3]);
                    r = d.length;
                    d.push(p, n);
                    k.push(r, r + 1);
                    m < l - 1 && (a += this.getDistance(b[m], b[m + 1]))
                }
            }
        },
        {
            key: "getDistance",
            value: function(a, b) {
                return Math.sqrt(Math.pow(Math.abs(a[0] - b[0]), 2) + Math.pow(Math.abs(a[1] - b[1]), 2))
            }
        }]);
        return c
    } (),
    Mf = function(c) {
        function a(b, c) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b, c));
            b.startTime = b.options.startTime || 0;
            b.endTime = b.options.endTime;
            b.time = b.startTime;
            b.autoUpdate = true;
            return b
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    height: 100,
                    color: [1, 1, 1, 1],
                    trailLength: 3,
                    step: .1
                }
            }
        },
        {
            key: "initialize",
            value: function(a) {
                this.gl = a;
                this.dataMgr = new Bi(this, this.gl);
                this.program = new Program(this.gl, {
                    vertexShader: "uniform mat4 u_matrix;uniform float currentTime;uniform float trailLength;attribute vec4 aPos;attribute float aDistance;attribute vec4 aColor;varying vec4 vColor;varying float vHeight;varying float vTime;varying float vDistance;void main(){vTime=1.0-((currentTime-aPos.w)/trailLength);vHeight=aPos.z;vColor=aColor;vDistance=aDistance;gl_Position=u_matrix*vec4(aPos.xyz,1.0);}",
                    fragmentShader: "precision highp float;varying vec4 vColor;varying float vTime;varying float vDistance;varying float vHeight;uniform float currentTime;void main(){if(vTime>1.0||vTime<0.0){}float radius=2.5;float distance=vDistance+currentTime*20.0;float modDistance=mod(distance,9.0);float alpha=1.0;if(modDistance>radius*2.0){discard;}else{float x=abs(modDistance-radius);float y=abs(vHeight-radius);float dis=sqrt(pow(x,2.0)+pow(y,2.0));if(dis>radius){discard;}alpha=dis/radius;}gl_FragColor=vec4(vColor.rgb,1.0-alpha);}"
                })
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                this.gl && (this.dataMgr.onLayerChange(a, c), undefined === a.endTime && (this.endTime = this.dataMgr.getMaxDataLength()))
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl,
                c = a.matrix;
                if ((a = this.dataMgr.getData()) && !(0 >= a.vertex.length)) {
                    var g = this.getOptions(),
                    h = this.program;
                    b.useProgram(h.program);
                    b.enable(b.BLEND);
                    b.blendEquation(b.FUNC_ADD);
                    b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
                    b.enableVertexAttribArray(h.attributes.aPos);
                    b.enableVertexAttribArray(h.attributes.aDistance);
                    b.enableVertexAttribArray(h.attributes.aColor);
                    b.uniformMatrix4fv(h.uniforms.u_matrix, false, c);
                    b.uniform1f(h.uniforms.currentTime, this.time);
                    b.uniform1f(h.uniforms.trailLength, g.trailLength);
                    for (c = 0; c < a.vertex.length; c++) if (! (0 >= a.vertex[c].length)) {
                        var k = a.vertex[c],
                        l = (new Float32Array(k[0])).BYTES_PER_ELEMENT;
                        k = l * k[0].length;
                        b.bindBuffer(b.ARRAY_BUFFER, a.vertexBuffer[c]);
                        b.vertexAttribPointer(h.attributes.aPos, 4, b.FLOAT, false, k, 0);
                        b.vertexAttribPointer(h.attributes.aDistance, 1, b.FLOAT, false, k, 4 * l);
                        b.vertexAttribPointer(h.attributes.aColor, 4, b.FLOAT, false, k, 5 * l);
                        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, a.indexBuffer[c]);
                        b.drawElements(b.TRIANGLE_STRIP, a.index[c].length, b.UNSIGNED_SHORT, 0);
                        b.bindBuffer(b.ARRAY_BUFFER, null);
                        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, null)
                    }
                    b.disable(b.BLEND);
                    this.time += g.step;
                    this.time > this.endTime && (this.time = this.startTime);
                    b.useProgram(null)
                }
            }
        }]);
        return a
    } (Layer),
    Ci = O(function(c, a) {
        a.__esModule = true;
        var b = Wa && Wa.__esModule ? Wa: {
        default:
            Wa
        };
        a.
    default = function(a, c, g) {
            c in a ? (0, b.
        default)(a, c, {
                value: g,
                enumerable: true,
                configurable: true,
                writable: true
            }) : a[c] = g;
            return a
        }
    }),
    Cb = T(Ci),
    cc,
    dc,
    Di = (cc = {},
    Cb(cc, 1, 1), Cb(cc, 2, 1), Cb(cc, 3, 1), cc),
    Ei = (dc = {},
    Cb(dc, 1, 1), Cb(dc, 2, 1), Cb(dc, 3, 1), dc),
    qb = function(c) {
        function a(b, c) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b, c));
            b.bufferMap = {};
            b.bufferData = [];
            b.autoUpdate = true;
            return b
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    color: [1, 1, 1, .8],
                    speed: 1,
                    size: 5,
                    pointFade: true,
                    pointFadeBuffer: 1,
                    minLineLength: 2,
                    animationType: 2,
                    shapeType: 2,
                    depthTest: false
                }
            }
        },
        {
            key: "initialize",
            value: function(a) {
                this.gl = a;
                var b = this.getOptions();
                this.updateUniformsFromOptions(b);
                this.program = new Program(this.gl, {
                    vertexShader: "precision highp float;attribute vec3 aPos;attribute vec3 aNextPos;attribute float aIndex;attribute float aNextIndex;attribute float aLength;uniform float uSize;uniform mat4 u_matrix;uniform float uElapsedSteps;uniform int uAnimationType;uniform int uPointFade;uniform float uPointFadeBuffer;varying float vAddOpacity;void main(){if(uAnimationType==1){if(abs(aIndex-mod(uElapsedSteps,aLength))>.1){gl_Position=vec4(-2.,-2.,0,1.0);return;}gl_Position=u_matrix*vec4(aPos.xyz,1.0);vAddOpacity=1.;}else if(uAnimationType==2){float lineLength=aLength-1.;float cIndex=mod(uElapsedSteps,lineLength);float rest=cIndex-aIndex;if(rest<1.&&rest>=0.){if(uPointFade==1){if(cIndex<uPointFadeBuffer){vAddOpacity=cIndex/uPointFadeBuffer;}else if(cIndex>lineLength-uPointFadeBuffer){vAddOpacity=(lineLength-cIndex)/uPointFadeBuffer;}else{vAddOpacity=1.;}}else{vAddOpacity=1.;}gl_Position=u_matrix*vec4(aPos.x+(aNextPos.x-aPos.x)*rest,aPos.y+(aNextPos.y-aPos.y)*rest,aPos.z+(aNextPos.z-aPos.z)*rest,1.0);}else{gl_Position=vec4(-2.,-2.,0,1.0);return;}}else if(uAnimationType==3){float percent=mod(uElapsedSteps,aLength)/aLength;if(percent<=aNextIndex&&percent>=aIndex){if(uPointFade==1){float fadePercent=uPointFadeBuffer*1000./aLength;if(percent<fadePercent){vAddOpacity=percent/fadePercent;}else if(percent>1.-fadePercent){vAddOpacity=(1.-percent)/fadePercent;}else{vAddOpacity=1.;}}else{vAddOpacity=1.;}float rest=(percent-aIndex)/(aNextIndex-aIndex);gl_Position=u_matrix*vec4(aPos.x+(aNextPos.x-aPos.x)*rest,aPos.y+(aNextPos.y-aPos.y)*rest,aPos.z+(aNextPos.z-aPos.z)*rest,1.0);}else{gl_Position=vec4(-2.,-2.,0,1.0);return;}}gl_PointSize=uSize;}",
                    fragmentShader: "precision highp float;uniform vec4 uColor;uniform int ushapeType;varying float vAddOpacity;void main(){if(ushapeType==2){float d=distance(gl_PointCoord,vec2(0.5,0.5));if(d>0.5){discard;}gl_FragColor=vec4(uColor.rgb,uColor.a*vAddOpacity);}else if(ushapeType==3){float d=distance(gl_PointCoord,vec2(0.5,0.5));if(d>0.5){discard;}gl_FragColor=vec4(uColor.rgb,uColor.a*smoothstep(1.0,0.0,d*2.)*vAddOpacity);}else{gl_FragColor=vec4(uColor.rgb,uColor.a*vAddOpacity);}}"
                });
                this.buffer = a.createBuffer();
                a.bindBuffer(a.ARRAY_BUFFER, this.buffer)
            }
        },
        {
            key: "bindAttributeBufferData",
            value: function(a, c, e, g) {
                var b = a.createBuffer();
                a.bindBuffer(a.ARRAY_BUFFER, b);
                e = new Float32Array(e);
                a.bufferData(a.ARRAY_BUFFER, e, a.STATIC_DRAW);
                this.bufferMap[c] = {
                    buffer: b,
                    data: e,
                    elementSize: g
                }
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                var b = this.gl;
                if (b) {
                    Array.isArray(c) || (c = []);
                    this.updateUniformsFromOptions(a);
                    var d = [],
                    h = [],
                    k = [],
                    l = [],
                    m = [];
                    a = a.minLineLength;
                    for (var p = 0; p < c.length; p++) {
                        var n = c[p].geometry.coordinates,
                        r = n.length;
                        if (! (r < a)) {
                            for (var q = 0; q < r; ++q) {
                                var t = this.normizedPoint(n[q]);
                                d.push(t[0]);
                                d.push(t[1]);
                                d.push(t[2] || 0);
                                3 !== this.animationType && (h.push(q), l.push(r))
                            }
                            if (1 !== this.animationType) {
                                t = d.length - 3 * r + 3;
                                q = d.length;
                                for (n = t; n < q; ++n) m.push(d[n]);
                                d.splice(q - 3, 3);
                                if (2 === this.animationType) h.pop(),
                                l.pop();
                                else if (3 === this.animationType) {
                                    t -= 3;
                                    q = d.length - 3;
                                    n = 0;
                                    r = [];
                                    for (var y = t; y <= q; y += 3) t = Math.sqrt(Math.pow(m[y] - d[y], 2) + Math.pow(m[y + 1] - d[y + 1], 2) + Math.pow(m[y + 2] - d[y + 2], 2)),
                                    n += t,
                                    r.push(t);
                                    h.push(0);
                                    y = q = 0;
                                    for (var v = r.length - 1; y < v; ++y) q += r[y],
                                    t = q / n,
                                    h.push(t),
                                    k.push(t),
                                    l.push(n);
                                    k.push(1);
                                    l.push(n)
                                }
                            }
                        }
                    }
                    this.bindAttributeBufferData(b, "aPos", d, 3);
                    this.bindAttributeBufferData(b, "aIndex", h, 1);
                    this.bindAttributeBufferData(b, "aLength", l, 1);
                    1 !== this.animationType && (this.bindAttributeBufferData(b, "aNextPos", m, 3), 3 === this.animationType && this.bindAttributeBufferData(b, "aNextIndex", k, 1));
                    this.vertCount = d.length / 3
                }
            }
        },
        {
            key: "updateUniformsFromOptions",
            value: function(a) {
                this.color = this.normizedColor(a.color);
                this.startTime = (new Date).getTime();
                Di[a.animationType] || (a.animationType = 2);
                Ei[a.shapeType] || (a.shapeType = 2);
                if (isNaN(a.minLineLength) || 2 > a.minLineLength) a.minLineLength = 2;
                this.animationType = a.animationType
            }
        },
        {
            key: "renderAttributeArr",
            value: function(a, c, e) {
                if (undefined !== c.attributes[e]) {
                    var b = this.bufferMap[e];
                    b && (a.bindBuffer(a.ARRAY_BUFFER, b.buffer), a.enableVertexAttribArray(c.attributes[e]), a.vertexAttribPointer(c.attributes[e], b.elementSize, a.FLOAT, false, b.data.BYTES_PER_ELEMENT * b.elementSize, 0))
                }
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl;
                a = a.matrix;
                if (! (0 >= this.vertCount)) {
                    var c = this.program;
                    b.useProgram(c.program);
                    this.renderAttributeArr(b, c, "aPos");
                    this.renderAttributeArr(b, c, "aIndex");
                    this.renderAttributeArr(b, c, "aLength");
                    1 !== this.animationType && (this.renderAttributeArr(b, c, "aNextPos"), 3 === this.animationType && this.renderAttributeArr(b, c, "aNextIndex"));
                    var g = (new Date).getTime() - this.startTime;
                    g = 1 === this.animationType ? Math.round(g / 1E3 * this.options.speed * 20) : 3 === this.animationType ? g / 1E3 * this.options.speed * 1E3: g / 1E3 * this.options.speed;
                    b.uniformMatrix4fv(c.uniforms.u_matrix, false, a);
                    b.uniform4f(c.uniforms.uColor, this.color[0], this.color[1], this.color[2], this.color[3]);
                    b.uniform1f(c.uniforms.uSize, this.options.size);
                    b.uniform1f(c.uniforms.uElapsedSteps, g);
                    b.uniform1i(c.uniforms.uAnimationType, this.animationType);
                    b.uniform1i(c.uniforms.ushapeType, this.options.shapeType);
                    b.uniform1i(c.uniforms.uPointFade, this.options.pointFade ? 1 : 0);
                    b.uniform1f(c.uniforms.uPointFadeBuffer, this.options.pointFadeBuffer);
                    a = this.options.blend;
                    c = this.options.depthTest;
                    b.enable(b.BLEND);
                    b.blendEquation(b.FUNC_ADD);
                    a && "lighter" === a ? b.blendFunc(b.SRC_ALPHA, b.ONE) : b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
                    c || b.disable(b.DEPTH_TEST);
                    b.drawArrays(b.POINTS, 0, this.vertCount);
                    b.bindBuffer(b.ARRAY_BUFFER, null);
                    b.disable(b.BLEND);
                    b.disable(b.DEPTH_TEST);
                    b.useProgram(null)
                }
            }
        }]);
        return a
    } (Layer);
    qb.ANIMATION_TYPE_LEAP = 1;
    qb.ANIMATION_TYPE_SMOOTH = 2;
    qb.ANIMATION_TYPE_UNIFORM_SPEED = 3;
    qb.SHAPE_TYPE_SQUARE = 1;
    qb.SHAPE_TYPE_CIRCLE = 2;
    qb.SHAPE_TYPE_CIRCLE_GRADIENT = 3;
    var Fi = function() {
        function c(a, b) {
            I(this, c);
            this.layer = a;
            this.gl = b;
            this.initData()
        }
        M(c, [{
            key: "initData",
            value: function() {
                this.outWall3d = {
                    vertex: [],
                    vertexBuffer: [],
                    index: [],
                    indexBuffer: []
                }
            }
        },
        {
            key: "getData",
            value: function() {
                return this.outWall3d
            }
        },
        {
            key: "onLayerChange",
            value: function(a, b) {
                this.initData();
                for (var c = a.color,
                e = a.height,
                g = a.gradient,
                h = a.enablePreciseMap,
                k = this.gl,
                l = 0; l < b.length; l++) {
                    for (var m = b[l].geometry.coordinates, p = m.length, n = [], r = [], q = 0, t = 0; t < p; t++) {
                        var y = this.layer.normizedPoint(m[t]);
                        if (0 < t && h) {
                            var v = this.layer.normizedPoint(m[t - 1]);
                            q += Math.sqrt(Math.pow(y[0] - v[0], 2) + Math.pow(y[1] - v[1], 2))
                        }
                        n.push(y);
                        r.push(q)
                    }
                    p = b[l].color || c;
                    "properties" in b[l] && "color" in b[l].properties && (p = b[l].properties.color);
                    g || "[object Function]" !== Object.prototype.toString.call(p) || (p = p(b[l]));
                    m = this.layer.normizedColor(g ? g[0] : p);
                    p = this.layer.normizedColor(g ? g[1] : p);
                    q = b[l].height || e;
                    "properties" in b[l] && "height" in b[l].properties && (q = b[l].properties.height);
                    "[object Function]" === Object.prototype.toString.call(q) && (q = q(b[l]));
                    this.processData(this.outWall3d, a, n, r, m, p, q)
                }
                for (a = 0; a < this.outWall3d.vertex.length; a++) {
                    b = [];
                    c = this.outWall3d.vertex[a].length;
                    for (e = 0; e < c; e++) b.push.apply(b, Y(this.outWall3d.vertex[a][e]));
                    c = k.createBuffer();
                    k.bindBuffer(k.ARRAY_BUFFER, c);
                    k.bufferData(k.ARRAY_BUFFER, new Float32Array(b), k.STATIC_DRAW);
                    this.outWall3d.vertexBuffer[a] = c;
                    k.bindBuffer(k.ARRAY_BUFFER, null);
                    c = k.createBuffer();
                    k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, c);
                    k.bufferData(k.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.outWall3d.index[a]), k.STATIC_DRAW);
                    this.outWall3d.indexBuffer[a] = c;
                    k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, null)
                }
            }
        },
        {
            key: "processData",
            value: function(a, b, c, e, g, h, k) {
                var d = e[e.length - 1],
                m = a.vertex[a.vertex.length - 1],
                p = a.index[a.index.length - 1],
                n = c.length;
                if (!p || 65536 <= p.length + 2 * n + 2) m = [],
                p = [],
                a.vertex.push(m),
                a.index.push(p); (a = m.length) && p.push(a - 1, a);
                for (a = 0; a < n; a++) {
                    var r = [],
                    q = [],
                    t = c[a];
                    r.push(t[0], t[1], k);
                    r.push(g[0], g[1], g[2], g[3]);
                    q.push(t[0], t[1], 0);
                    q.push(h[0], h[1], h[2], h[3]);
                    b.texture && (t = e[a], b.enablePreciseMap ? (r.push(t / d, 1), q.push(t / d, 0)) : (r.push(a / (n - 1), 1), q.push(a / (n - 1), 0)));
                    t = m.length;
                    m.push(r, q);
                    p.push(t, t + 1)
                }
            }
        }]);
        return c
    } (),
    Gi = function(c) {
        function a(b, c) {
            I(this, a);
            return Q(this, (a.__proto__ || N(a)).call(this, b, c))
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    texture: null,
                    enablePreciseMap: false,
                    height: 100,
                    color: [1, 1, 1, 1]
                }
            }
        },
        {
            key: "initialize",
            value: function(a) {
                this.gl = a;
                this.dataMgr = new Fi(this, this.gl);
                this.texture = null;
                this.isUseTexture = false;
                this.vertexLength = 10;
                this.program = new Program(this.gl, {
                    vertexShader: "uniform mat4 u_matrix;uniform bool uUseTexture;attribute vec3 aPos;attribute vec4 aColor;attribute vec2 aTextureCoords;varying vec2 vTextureCoords;varying vec4 vColor;void main(){if(aColor.w>=0.0&&aColor.w<=1.0){vColor=aColor;}else{vColor=vec4(aColor.xyz,1.0);}if(uUseTexture){vTextureCoords=aTextureCoords;}gl_Position=u_matrix*vec4(aPos,1.0);}",
                    fragmentShader: "precision highp float;uniform bool uUseTexture;uniform sampler2D uSampler;varying vec2 vTextureCoords;varying vec4 vColor;void main(){if(uUseTexture){gl_FragColor=vec4(1.0,1.0,1.0,1.0)*texture2D(uSampler,vTextureCoords);}else{gl_FragColor=vColor;}}"
                });
                this.loadTexture()
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                var b = this;
                this.gl && (this.loadTextureTime && clearTimeout(this.loadTextureTime), this.loadTextureTime = setTimeout(function() {
                    b.loadTexture(function() {
                        b.dataMgr.onLayerChange(a, c);
                        b.webglLayer.render()
                    })
                },
                0))
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl,
                c = a.matrix;
                if ((a = this.dataMgr.getData()) && !(0 >= a.vertex.length)) {
                    var g = this.getOptions(),
                    h = this.program;
                    b.useProgram(h.program);
                    b.enable(b.BLEND);
                    b.blendEquation(b.FUNC_ADD);
                    b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
                    if (g.texture) {
                        if (!this.texture) return;
                        b.activeTexture(b.TEXTURE0);
                        b.bindTexture(b.TEXTURE_2D, this.texture);
                        b.uniform1i(h.uniforms.uSampler, 0);
                        b.depthMask(true);
                        b.depthFunc(b.LESS)
                    } else b.depthMask(false);
                    g.texture ? b.enableVertexAttribArray(h.attributes.aTextureCoords) : b.disableVertexAttribArray(h.attributes.aTextureCoords);
                    b.enableVertexAttribArray(h.attributes.aPos);
                    b.enableVertexAttribArray(h.attributes.aColor);
                    b.uniformMatrix4fv(h.uniforms.u_matrix, false, c);
                    b.uniform1i(h.uniforms.uUseTexture, this.isUseTexture);
                    for (c = 0; c < a.vertex.length; c++) if (! (0 >= a.vertex[c].length)) {
                        var k = a.vertex[c],
                        l = (new Float32Array(k[0])).BYTES_PER_ELEMENT;
                        k = l * k[0].length;
                        b.bindBuffer(b.ARRAY_BUFFER, a.vertexBuffer[c]);
                        b.vertexAttribPointer(h.attributes.aPos, 3, b.FLOAT, false, k, 0);
                        b.vertexAttribPointer(h.attributes.aColor, 4, b.FLOAT, false, k, 3 * l);
                        g.texture && b.vertexAttribPointer(h.attributes.aTextureCoords, 2, b.FLOAT, false, k, 7 * l);
                        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, a.indexBuffer[c]);
                        b.drawElements(b.TRIANGLE_STRIP, a.index[c].length, b.UNSIGNED_SHORT, 0);
                        b.bindBuffer(b.ARRAY_BUFFER, null);
                        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, null)
                    }
                    b.disable(b.BLEND);
                    b.useProgram(null)
                }
            }
        },
        {
            key: "loadTexture",
            value: function(a) {
                var b = this,
                c = this.getOptions();
                c.texture ? (this.isUseTexture = true, Ma(this.gl, c.texture,
                function(c, d) {
                    b.image = d;
                    b.texture = c;
                    a && a();
                    b.webglLayer.render()
                })) : (this.isUseTexture = false, this.image = this.texture = null, a && a())
            }
        }]);
        return a
    } (Layer),
    Hi = function() {
        function c(a, b) {
            I(this, c);
            this.layer = a;
            this.gl = b;
            this.initData()
        }
        M(c, [{
            key: "initData",
            value: function() {
                this.outWall3d = {
                    vertex: [],
                    vertexBuffer: [],
                    index: [],
                    indexBuffer: []
                };
                this.maxLength = 0
            }
        },
        {
            key: "getData",
            value: function() {
                return this.outWall3d
            }
        },
        {
            key: "getMaxDataLength",
            value: function() {
                return this.maxLength
            }
        },
        {
            key: "onLayerChange",
            value: function(a, b) {
                this.initData();
                var c = a.color,
                e = a.height,
                g = a.gradient;
                a = this.gl;
                for (var h = 0; h < b.length; h++) {
                    var k = b[h].geometry.coordinates,
                    l = k.length;
                    this.maxLength = l > this.maxLength ? l: this.maxLength;
                    for (var m = [], p = 0; p < l; p++) {
                        var n = this.layer.normizedPoint(k[p]);
                        m.push(n)
                    }
                    l = b[h].color || c;
                    "properties" in b[h] && "color" in b[h].properties && (l = b[h].properties.color);
                    g || "[object Function]" !== Object.prototype.toString.call(l) || (l = l(b[h]));
                    k = this.layer.normizedColor(g ? g[0] : l);
                    l = this.layer.normizedColor(g ? g[1] : l);
                    p = b[h].height || e;
                    "properties" in b[h] && "height" in b[h].properties && (p = b[h].properties.height);
                    "[object Function]" === Object.prototype.toString.call(p) && (p = p(b[h]));
                    this.processData(this.outWall3d, m, k, l, p)
                }
                for (b = 0; b < this.outWall3d.vertex.length; b++) {
                    c = [];
                    e = this.outWall3d.vertex[b].length;
                    for (g = 0; g < e; g++) c.push.apply(c, Y(this.outWall3d.vertex[b][g]));
                    e = a.createBuffer();
                    a.bindBuffer(a.ARRAY_BUFFER, e);
                    a.bufferData(a.ARRAY_BUFFER, new Float32Array(c), a.STATIC_DRAW);
                    this.outWall3d.vertexBuffer[b] = e;
                    a.bindBuffer(a.ARRAY_BUFFER, null);
                    e = a.createBuffer();
                    a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, e);
                    a.bufferData(a.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.outWall3d.index[b]), a.STATIC_DRAW);
                    this.outWall3d.indexBuffer[b] = e;
                    a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, null)
                }
            }
        },
        {
            key: "processData",
            value: function(a, b, c, e, g) {
                var d = a.vertex[a.vertex.length - 1],
                k = a.index[a.index.length - 1],
                l = b.length;
                if (!k || 65536 <= k.length + 2 * l + 2) d = [],
                k = [],
                a.vertex.push(d),
                a.index.push(k); (a = d.length) && k.push(a - 1, a);
                for (a = 0; a < l; a++) {
                    var m = [],
                    p = [],
                    n = b[a];
                    m.push(n[0], n[1]);
                    m.push(n[2] ? Number(n[2]) + g: g);
                    m.push(n[3] ? Number(n[3]) : a);
                    m.push(c[0], c[1], c[2], c[3]);
                    p.push(n[0], n[1]);
                    p.push(n[2] ? Number(n[2]) : 0);
                    p.push(n[3] ? Number(n[3]) : a);
                    p.push(e[0], e[1], e[2], e[3]);
                    n = d.length;
                    d.push(m, p);
                    k.push(n, n + 1)
                }
            }
        }]);
        return c
    } (),
    Ii = function(c) {
        function a(b, c) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b, c));
            b.startTime = b.options.startTime || 0;
            b.endTime = b.options.endTime;
            b.time = b.startTime;
            b.autoUpdate = true;
            return b
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    height: 100,
                    color: [1, 1, 1, 1],
                    trailLength: 3,
                    step: .1
                }
            }
        },
        {
            key: "initialize",
            value: function(a) {
                this.gl = a;
                this.dataMgr = new Hi(this, this.gl);
                this.program = new Program(this.gl, {
                    vertexShader: "uniform mat4 u_matrix;uniform float currentTime;uniform float trailLength;attribute vec4 aPos;attribute vec4 aColor;varying vec4 vColor;varying float vTime;void main(){vTime=1.0-((currentTime-aPos.w)/trailLength);vColor=aColor;gl_Position=u_matrix*vec4(aPos.xyz,1.0);}",
                    fragmentShader: "precision highp float;varying vec4 vColor;varying float vTime;void main(){if(vTime>1.0||vTime<0.0){discard;}gl_FragColor=vec4(vColor.rgb,1.0*vTime);}"
                })
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                this.gl && (this.dataMgr.onLayerChange(a, c), undefined === a.endTime && (this.endTime = this.dataMgr.getMaxDataLength()))
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl,
                c = a.matrix;
                if ((a = this.dataMgr.getData()) && !(0 >= a.vertex.length)) {
                    var g = this.getOptions(),
                    h = this.program;
                    b.useProgram(h.program);
                    b.enable(b.BLEND);
                    b.blendEquation(b.FUNC_ADD);
                    b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
                    b.enableVertexAttribArray(h.attributes.aPos);
                    b.enableVertexAttribArray(h.attributes.aColor);
                    b.uniformMatrix4fv(h.uniforms.u_matrix, false, c);
                    b.uniform1f(h.uniforms.currentTime, this.time);
                    b.uniform1f(h.uniforms.trailLength, g.trailLength);
                    for (c = 0; c < a.vertex.length; c++) if (! (0 >= a.vertex[c].length)) {
                        var k = a.vertex[c],
                        l = (new Float32Array(k[0])).BYTES_PER_ELEMENT;
                        k = l * k[0].length;
                        b.bindBuffer(b.ARRAY_BUFFER, a.vertexBuffer[c]);
                        b.vertexAttribPointer(h.attributes.aPos, 4, b.FLOAT, false, k, 0);
                        b.vertexAttribPointer(h.attributes.aColor, 4, b.FLOAT, false, k, 4 * l);
                        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, a.indexBuffer[c]);
                        b.drawElements(b.TRIANGLE_STRIP, a.index[c].length, b.UNSIGNED_SHORT, 0);
                        b.bindBuffer(b.ARRAY_BUFFER, null);
                        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, null)
                    }
                    b.disable(b.BLEND);
                    this.time += g.step;
                    this.time > this.endTime && (this.time = this.startTime);
                    b.useProgram(null)
                }
            }
        }]);
        return a
    } (Layer),
    Ji = function(c) {
        function a(b, c) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b, c));
            b.simpleLineLayer = new If(b.getHeatOptions());
            b.children = [b.simpleLineLayer];
            return b
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    blend: "normal",
                    gradient: {
                        0 : "rgb(50, 50, 256)",
                        "0.1": "rgb(50, 250, 56)",
                        "0.5": "rgb(250, 250, 56)",
                        1 : "rgb(250, 50, 56)"
                    }
                }
            }
        },
        {
            key: "onDataChanged",
            value: function(a) {
                this.simpleLineLayer.setData(a)
            }
        },
        {
            key: "onOptionsChanged",
            value: function(a) {
                this.simpleLineLayer.setOptions(this.getHeatOptions())
            }
        },
        {
            key: "getHeatOptions",
            value: function() {
                var a = this.getOptions(),
                c = a.max,
                e = a.min;
                undefined === c && (e = this.getDataRange(), c = e.max, e = e.min);
                var g = new oa({
                    max: c,
                    min: e,
                    gradient: a.gradient
                });
                a.color = function(a) {
                    var b = ~~a.count || 1;
                    "properties" in a && "count" in a.properties && (b = ~~a.properties.count);
                    a = g.getImageData(b);
                    return [a[0] / 255, a[1] / 255, a[2] / 255, a[3] / 255]
                };
                return a
            }
        },
        {
            key: "getDataRange",
            value: function() {
                var a = this.getData(),
                c = 0,
                e = 0;
                a[0] && (c = ~~a[0].count || 1, e = ~~a[0].count || 1);
                "properties" in a[0] && "count" in a[0].properties && (c = ~~a[0].properties.count, e = ~~a[0].properties.count);
                for (var g = a.length,
                h = 0; h < g; h++) {
                    var k = ~~a[h].count || 1;
                    "properties" in a[h] && "count" in a[h].properties && (k = ~~a[h].properties.count);
                    c = Math.max(k, c);
                    e = Math.min(k, e)
                }
                return {
                    max: c / 2,
                    min: e
                }
            }
        }]);
        return a
    } (pb),
    Ki = O(function(c, a) { (function(a, d) {
            c.exports = d()
        })(Ke,
        function() {
            function a(b, d, e, g, h) {
                for (; g > e;) {
                    if (600 < g - e) {
                        var k = g - e + 1,
                        l = d - e + 1,
                        n = Math.log(k),
                        m = .5 * Math.exp(2 * n / 3);
                        n = .5 * Math.sqrt(n * m * (k - m) / k) * (0 > l - k / 2 ? -1 : 1);
                        a(b, d, Math.max(e, Math.floor(d - l * m / k + n)), Math.min(g, Math.floor(d + (k - l) * m / k + n)), h)
                    }
                    k = b[d];
                    l = e;
                    m = g;
                    c(b, e, d);
                    for (0 < h(b[g], k) && c(b, e, g); l < m;) {
                        c(b, l, m);
                        l++;
                        for (m--; 0 > h(b[l], k);) l++;
                        for (; 0 < h(b[m], k);) m--
                    }
                    0 === h(b[e], k) ? c(b, e, m) : (m++, c(b, m, g));
                    m <= d && (e = m + 1);
                    d <= m && (g = m - 1)
                }
            }
            function c(a, b, c) {
                var d = a[b];
                a[b] = a[c];
                a[c] = d
            }
            function e(a, b) {
                return a < b ? -1 : a > b ? 1 : 0
            }
            function g(a, b) {
                h(a, 0, a.children.length, b, a)
            }
            function h(a, b, c, d, e) {
                e || (e = t(null));
                e.minX = Infinity;
                e.minY = Infinity;
                e.maxX = -Infinity;
                for (e.maxY = -Infinity; b < c; b++) {
                    var g = a.children[b];
                    k(e, a.leaf ? d(g) : g)
                }
                return e
            }
            function k(a, b) {
                a.minX = Math.min(a.minX, b.minX);
                a.minY = Math.min(a.minY, b.minY);
                a.maxX = Math.max(a.maxX, b.maxX);
                a.maxY = Math.max(a.maxY, b.maxY);
                return a
            }
            function l(a, b) {
                return a.minX - b.minX
            }
            function m(a, b) {
                return a.minY - b.minY
            }
            function p(a) {
                return (a.maxX - a.minX) * (a.maxY - a.minY)
            }
            function n(a) {
                return a.maxX - a.minX + (a.maxY - a.minY)
            }
            function r(a, b) {
                return a.minX <= b.minX && a.minY <= b.minY && b.maxX <= a.maxX && b.maxY <= a.maxY
            }
            function q(a, b) {
                return b.minX <= a.maxX && b.minY <= a.maxY && b.maxX >= a.minX && b.maxY >= a.minY
            }
            function t(a) {
                return {
                    children: a,
                    height: 1,
                    leaf: true,
                    minX: Infinity,
                    minY: Infinity,
                    maxX: -Infinity,
                    maxY: -Infinity
                }
            }
            function y(b, c, d, g, h) {
                for (var k = [c, d]; k.length;) if (d = k.pop(), c = k.pop(), !(d - c <= g)) {
                    var l = c + Math.ceil((d - c) / g / 2) * g;
                    a(b, l, c || 0, d || b.length - 1, h || e);
                    k.push(c, l, l, d)
                }
            }
            var v = function(a) {
                undefined === a && (a = 9);
                this._maxEntries = Math.max(4, a);
                this._minEntries = Math.max(2, Math.ceil(.4 * this._maxEntries));
                this.clear()
            };
            v.prototype.all = function() {
                return this._all(this.data, [])
            };
            v.prototype.search = function(a) {
                var b = this.data,
                c = [];
                if (!q(a, b)) return c;
                for (var d = this.toBBox,
                e = []; b;) {
                    for (var g = 0; g < b.children.length; g++) {
                        var h = b.children[g],
                        k = b.leaf ? d(h) : h;
                        q(a, k) && (b.leaf ? c.push(h) : r(a, k) ? this._all(h, c) : e.push(h))
                    }
                    b = e.pop()
                }
                return c
            };
            v.prototype.collides = function(a) {
                var b = this.data;
                if (!q(a, b)) return ! 1;
                for (var c = []; b;) {
                    for (var d = 0; d < b.children.length; d++) {
                        var e = b.children[d],
                        g = b.leaf ? this.toBBox(e) : e;
                        if (q(a, g)) {
                            if (b.leaf || r(a, g)) return ! 0;
                            c.push(e)
                        }
                    }
                    b = c.pop()
                }
                return ! 1
            };
            v.prototype.load = function(a) {
                if (!a || !a.length) return this;
                if (a.length < this._minEntries) {
                    for (var b = 0; b < a.length; b++) this.insert(a[b]);
                    return this
                }
                a = this._build(a.slice(), 0, a.length - 1, 0);
                this.data.children.length ? this.data.height === a.height ? this._splitRoot(this.data, a) : (this.data.height < a.height && (b = this.data, this.data = a, a = b), this._insert(a, this.data.height - a.height - 1, true)) : this.data = a;
                return this
            };
            v.prototype.insert = function(a) {
                a && this._insert(a, this.data.height - 1);
                return this
            };
            v.prototype.clear = function() {
                this.data = t([]);
                return this
            };
            v.prototype.remove = function(a, b) {
                if (!a) return this;
                for (var c = this.data,
                d = this.toBBox(a), e = [], g = [], h, k, l; c || e.length;) {
                    c || (c = e.pop(), k = e[e.length - 1], h = g.pop(), l = true);
                    if (c.leaf) {
                        a: {
                            var m = a;
                            var n = c.children,
                            p = b;
                            if (p) {
                                for (var u = 0; u < n.length; u++) if (p(m, n[u])) {
                                    m = u;
                                    break a
                                }
                                m = -1
                            } else m = n.indexOf(m)
                        }
                        if ( - 1 !== m) {
                            c.children.splice(m, 1);
                            e.push(c);
                            this._condense(e);
                            break
                        }
                    }
                    l || c.leaf || !r(c, d) ? k ? (h++, c = k.children[h], l = false) : c = null: (e.push(c), g.push(h), h = 0, k = c, c = c.children[0])
                }
                return this
            };
            v.prototype.toBBox = function(a) {
                return a
            };
            v.prototype.compareMinX = function(a, b) {
                return a.minX - b.minX
            };
            v.prototype.compareMinY = function(a, b) {
                return a.minY - b.minY
            };
            v.prototype.toJSON = function() {
                return this.data
            };
            v.prototype.fromJSON = function(a) {
                this.data = a;
                return this
            };
            v.prototype._all = function(a, b) {
                for (var c = []; a;) a.leaf ? b.push.apply(b, a.children) : c.push.apply(c, a.children),
                a = c.pop();
                return b
            };
            v.prototype._build = function(a, b, c, d) {
                var e = c - b + 1,
                h = this._maxEntries;
                if (e <= h) {
                    var k = t(a.slice(b, c + 1));
                    g(k, this.toBBox);
                    return k
                }
                d || (d = Math.ceil(Math.log(e) / Math.log(h)), h = Math.ceil(e / Math.pow(h, d - 1)));
                k = t([]);
                k.leaf = false;
                k.height = d;
                e = Math.ceil(e / h);
                h = e * Math.ceil(Math.sqrt(h));
                for (y(a, b, c, h, this.compareMinX); b <= c; b += h) {
                    var l = Math.min(b + h - 1, c);
                    y(a, b, l, e, this.compareMinY);
                    for (var m = b; m <= l; m += e) k.children.push(this._build(a, m, Math.min(m + e - 1, l), d - 1))
                }
                g(k, this.toBBox);
                return k
            };
            v.prototype._chooseSubtree = function(a, b, c, d) {
                for (;;) {
                    d.push(b);
                    if (b.leaf || d.length - 1 === c) break;
                    for (var e = Infinity,
                    g = Infinity,
                    h = undefined,
                    k = 0; k < b.children.length; k++) {
                        var l = b.children[k],
                        m = p(l),
                        n = (Math.max(l.maxX, a.maxX) - Math.min(l.minX, a.minX)) * (Math.max(l.maxY, a.maxY) - Math.min(l.minY, a.minY)) - m;
                        n < g ? (g = n, e = m < e ? m: e, h = l) : n === g && m < e && (e = m, h = l)
                    }
                    b = h || b.children[0]
                }
                return b
            };
            v.prototype._insert = function(a, b, c) {
                c = c ? a: this.toBBox(a);
                var d = [],
                e = this._chooseSubtree(c, this.data, b, d);
                e.children.push(a);
                for (k(e, c); 0 <= b;) if (d[b].children.length > this._maxEntries) this._split(d, b),
                b--;
                else break;
                this._adjustParentBBoxes(c, d, b)
            };
            v.prototype._split = function(a, b) {
                var c = a[b],
                d = c.children.length,
                e = this._minEntries;
                this._chooseSplitAxis(c, e, d);
                d = this._chooseSplitIndex(c, e, d);
                d = t(c.children.splice(d, c.children.length - d));
                d.height = c.height;
                d.leaf = c.leaf;
                g(c, this.toBBox);
                g(d, this.toBBox);
                b ? a[b - 1].children.push(d) : this._splitRoot(c, d)
            };
            v.prototype._splitRoot = function(a, b) {
                this.data = t([a, b]);
                this.data.height = a.height + 1;
                this.data.leaf = false;
                g(this.data, this.toBBox)
            };
            v.prototype._chooseSplitIndex = function(a, b, c) {
                for (var d, e = Infinity,
                g = Infinity,
                k = b; k <= c - b; k++) {
                    var l = h(a, 0, k, this.toBBox),
                    m = h(a, k, c, this.toBBox);
                    var n = Math.max(0, Math.min(l.maxX, m.maxX) - Math.max(l.minX, m.minX)) * Math.max(0, Math.min(l.maxY, m.maxY) - Math.max(l.minY, m.minY));
                    l = p(l) + p(m);
                    n < e ? (e = n, d = k, g = l < g ? l: g) : n === e && l < g && (g = l, d = k)
                }
                return d || c - b
            };
            v.prototype._chooseSplitAxis = function(a, b, c) {
                var d = a.leaf ? this.compareMinX: l,
                e = a.leaf ? this.compareMinY: m,
                g = this._allDistMargin(a, b, c, d);
                b = this._allDistMargin(a, b, c, e);
                g < b && a.children.sort(d)
            };
            v.prototype._allDistMargin = function(a, b, c, d) {
                a.children.sort(d);
                d = this.toBBox;
                for (var e = h(a, 0, b, d), g = h(a, c - b, c, d), l = n(e) + n(g), m = b; m < c - b; m++) {
                    var p = a.children[m];
                    k(e, a.leaf ? d(p) : p);
                    l += n(e)
                }
                for (c = c - b - 1; c >= b; c--) e = a.children[c],
                k(g, a.leaf ? d(e) : e),
                l += n(g);
                return l
            };
            v.prototype._adjustParentBBoxes = function(a, b, c) {
                for (; 0 <= c; c--) k(b[c], a)
            };
            v.prototype._condense = function(a) {
                for (var b = a.length - 1,
                c; 0 <= b; b--) 0 === a[b].children.length ? 0 < b ? (c = a[b - 1].children, c.splice(c.indexOf(a[b]), 1)) : this.clear() : g(a[b], this.toBBox)
            };
            return v
        })
    }),
    Db = window.devicePixelRatio,
    Eb = Math.max(2, Db),
    Od = function(c) {
        function a(b, c) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b, c));
            c = b.canvas = document.createElement("canvas");
            c = b.ctx = c.getContext("2d");
            c.textAlign = "start";
            c.textBaseline = "top";
            return b
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    color: "#fff",
                    fontFamily: "Microsoft Yahei",
                    fontSize: 14,
                    flat: false,
                    collides: true,
                    offset: [0, 0],
                    padding: [2, 2],
                    margin: [0, 0]
                }
            }
        },
        {
            key: "initialize",
            value: function(a) {
                this.gl = a;
                var b = this.getOptions();
                this.texture = null;
                this.program = new Program(this.gl, {
                    vertexShader: "precision highp float;uniform mat4 matrix;uniform bool uFlat;uniform float zoomUnits;uniform float devicePixelRatio;uniform vec2 offset;attribute vec3 position;attribute float corner;attribute vec2 size;attribute vec2 aTextCoord;varying vec2 vTextCoord;vec3 transformCoord(vec3 coord,vec2 size,float corner){float x=coord.x;float y=coord.y;if(corner==1.0){x-=size[0];y+=size[1];}else if(corner==2.0){x+=size[0];y+=size[1];}else if(corner==3.0){x+=size[0];y-=size[1];}else{x-=size[0];y-=size[1];}return vec3(x,y,coord.z);}void main(){vec2 pixelOffset=offset*zoomUnits;vTextCoord=aTextCoord;if(uFlat){vec2 halfSize=size/2.0*zoomUnits;vec3 current=transformCoord(position,halfSize,corner);gl_Position=matrix*vec4(current.x+pixelOffset[0],current.y+pixelOffset[1],current.z,1.0);}else{vec4 projection=matrix*vec4(position.x+pixelOffset[0],position.y+pixelOffset[1],position.z,1.0);vec3 screen=projection.xyz/projection.w;vec2 halfSize=size/MAPV_resolution*devicePixelRatio;vec3 current=transformCoord(screen,halfSize,corner);gl_Position=vec4(current,1.0);}}",
                    fragmentShader: "precision highp float;uniform sampler2D textureImage;uniform vec4 uSelectedColor;varying vec2 vTextCoord;void main(){gl_FragColor=texture2D(textureImage,vec2(vTextCoord.x,1.0-vTextCoord.y));\n#if defined(PICK)\nif(mapvIsPicked()){gl_FragColor=vec4(uSelectedColor.rgb,gl_FragColor.a);}\n#endif\n}",
                    defines: b.enablePicked ? ["PICK"] : []
                },
                this);
                this.vertexBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.uvBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.indexBuffer = new Buffer({
                    gl: a,
                    target: "ELEMENT_ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                b = [{
                    name: "position",
                    buffer: this.vertexBuffer,
                    size: 3,
                    stride: 24,
                    type: "FLOAT",
                    offset: 0
                },
                {
                    name: "corner",
                    buffer: this.vertexBuffer,
                    size: 1,
                    stride: 24,
                    type: "FLOAT",
                    offset: 12
                },
                {
                    name: "size",
                    buffer: this.vertexBuffer,
                    size: 2,
                    stride: 24,
                    type: "FLOAT",
                    offset: 16
                },
                {
                    name: "aTextCoord",
                    buffer: this.uvBuffer,
                    size: 2,
                    stride: 8,
                    type: "FLOAT",
                    offset: 0
                }];
                b = b.concat(this.getCommonAttributes());
                this.vertexArray = new VertexArray({
                    gl: a,
                    program: this.program,
                    attributes: b
                })
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                this.gl && this.processCache(c)
            }
        },
        {
            key: "processCache",
            value: function(a) {
                this.cachedData = [];
                for (var b = 0; b < a.length; b++) {
                    var c = this.normizedPoint(a[b].geometry.coordinates),
                    g = a[b].text;
                    "properties" in a[b] && "text" in a[b].properties && (g = a[b].properties.text);
                    c && undefined !== g && this.cachedData.push({
                        point: c,
                        text: g
                    })
                }
            }
        },
        {
            key: "render",
            value: function(a) {
                if (this.cachedData && this.cachedData.length && this.map) {
                    var b = a.gl,
                    c = a.matrix,
                    g = this.getOptions(),
                    h = this.program;
                    h.use(b);
                    this.updateText(a);
                    b.enable(b.BLEND);
                    b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
                    b.disable(b.DEPTH_TEST);
                    var k = this.map.getZoomUnits();
                    h.setUniforms(Object.assign(this.getCommonUniforms(a), {
                        matrix: c,
                        devicePixelRatio: Db,
                        textureImage: this.texture,
                        uFlat: g.flat,
                        offset: g.offset,
                        zoomUnits: k
                    }));
                    0 < this.index.length && (this.indexBuffer.bind(), this.vertexArray.bind(), b.drawElements(b.TRIANGLES, this.index.length, b.UNSIGNED_INT, 0));
                    b.useProgram(null)
                }
            }
        },
        {
            key: "updateText",
            value: function(a) {
                var b = a.gl,
                c = a.matrix,
                g = this.getOptions(),
                h = g.color,
                k = g.fontSize,
                l = g.fontFamily;
                a = g.padding;
                var m = g.margin,
                p = g.collides;
                g = g.enablePicked;
                var n = b.canvas.width,
                r = b.canvas.height,
                q = this.canvas;
                b = this.ctx;
                b.save();
                b.scale(Eb, Eb);
                b.textBaseline = "top";
                b.font = k + "px " + l;
                for (var t = new Ki,
                y = [], v = 0; v < this.cachedData.length; v++) {
                    var x = this.cachedData[v],
                    u = x.point;
                    x = x.text;
                    var B = Ia(u, 3);
                    B = Ga.clone([B[0], B[1], B[2], 1]);
                    Ga.transformMat4(B, B, c);
                    Ga.scale(B, B, 1 / B[3]);
                    var A = (B[0] + 1) / 2 * n,
                    D = ( - B[1] + 1) / 2 * r,
                    C = b.measureText(x);
                    B = C.width + a[0];
                    C = C.actualBoundingBoxAscent && C.actualBoundingBoxDescent ? C.actualBoundingBoxDescent - C.actualBoundingBoxAscent: k + a[1];
                    C += a[1];
                    var w = B + m[0],
                    H = C + m[1];
                    A -= w / 2 * Db;
                    D -= H / 2 * Db;
                    w = A + w * Db;
                    H = D + H * Db;
                    if (! (0 > w || 0 > H || A > n || D > r)) {
                        if (p) {
                            H = {
                                minX: A,
                                maxX: w,
                                minY: D,
                                maxY: H
                            };
                            if (t.collides(H)) continue;
                            t.insert(H)
                        }
                        y.push({
                            w: B,
                            h: C,
                            point: u,
                            text: x,
                            dataIndex: v
                        })
                    }
                }
                b.restore();
                m = Je(y);
                c = Kb(m.w);
                m = Kb(m.h);
                q.width = c * Eb;
                q.height = m * Eb;
                b.save();
                b.scale(Eb, Eb);
                b.textBaseline = "top";
                b.fillStyle = h;
                b.font = k + "px " + l;
                h = [];
                k = [];
                l = [];
                q = [];
                p = 0;
                for (n = y.length; p < n; ++p) {
                    r = y[p];
                    b.fillText(r.text, r.x + a[0], r.y + a[1]);
                    u = Ia(r.point, 3);
                    t = u[0];
                    v = u[1];
                    u = u[2];
                    for (x = 0; 4 > x; x++) h.push(t, v, u),
                    h.push(x),
                    h.push(r.w, r.h);
                    t = r.x / c;
                    v = (r.x + r.w) / c;
                    u = (r.y + r.h) / m;
                    x = r.y / m;
                    k.push(t, u, t, x, v, x, v, u);
                    t = 4 * p;
                    l.push(t, t + 2, t + 1, t, t + 3, t + 2);
                    g && (r = this.indexToRgb(r.dataIndex), q.push(r[0] / 255, r[1] / 255, r[2] / 255), q.push(r[0] / 255, r[1] / 255, r[2] / 255), q.push(r[0] / 255, r[1] / 255, r[2] / 255), q.push(r[0] / 255, r[1] / 255, r[2] / 255))
                }
                b.restore();
                this.loadTexture();
                this.index = l;
                this.vertexBuffer.updateData(new Float32Array(h));
                this.uvBuffer.updateData(new Float32Array(k));
                this.indexBuffer.updateData(new Uint32Array(l));
                g && this.pickBuffer.updateData(new Float32Array(q))
            }
        },
        {
            key: "loadTexture",
            value: function() {
                var a = this;
                this.canvas ? Ma(this.gl, this.canvas,
                function(b) {
                    a.texture = b
                }) : this.texture = null
            }
        }]);
        return a
    } (Layer),
    Nf = O(function(c, a) { (function(a, d) {
            c.exports = d()
        })(Ke,
        function() {
            function a(b, d, e, g, h, k) {
                if (! (h - g <= e)) {
                    var l = g + h >> 1;
                    c(b, d, l, g, h, k % 2);
                    a(b, d, e, g, l - 1, k + 1);
                    a(b, d, e, l + 1, h, k + 1)
                }
            }
            function c(a, b, d, g, h, k) {
                for (; h > g;) {
                    if (600 < h - g) {
                        var l = h - g + 1,
                        m = d - g + 1,
                        n = Math.log(l),
                        p = .5 * Math.exp(2 * n / 3);
                        n = .5 * Math.sqrt(n * p * (l - p) / l) * (0 > m - l / 2 ? -1 : 1);
                        c(a, b, d, Math.max(g, Math.floor(d - m * p / l + n)), Math.min(h, Math.floor(d + (l - m) * p / l + n)), k)
                    }
                    l = b[2 * d + k];
                    m = g;
                    p = h;
                    e(a, b, g, d);
                    for (b[2 * h + k] > l && e(a, b, g, h); m < p;) {
                        e(a, b, m, p);
                        m++;
                        for (p--; b[2 * m + k] < l;) m++;
                        for (; b[2 * p + k] > l;) p--
                    }
                    b[2 * g + k] === l ? e(a, b, g, p) : (p++, e(a, b, p, h));
                    p <= d && (g = p + 1);
                    d <= p && (h = p - 1)
                }
            }
            function e(a, b, c, d) {
                g(a, c, d);
                g(b, 2 * c, 2 * d);
                g(b, 2 * c + 1, 2 * d + 1)
            }
            function g(a, b, c) {
                var d = a[b];
                a[b] = a[c];
                a[c] = d
            }
            function h(a, b) {
                a = a.geometry.coordinates;
                return {
                    x: a[0] / 360 + .5,
                    y: m(a[1]),
                    zoom: Infinity,
                    index: b,
                    parentId: -1
                }
            }
            function k(a) {
                var b = a.id,
                c = l(a);
                return {
                    type: "Feature",
                    id: b,
                    properties: c,
                    geometry: {
                        type: "Point",
                        coordinates: [360 * (a.x - .5), 360 * Math.atan(Math.exp((180 - 360 * a.y) * Math.PI / 180)) / Math.PI - 90]
                    }
                }
            }
            function l(a) {
                var b = a.numPoints,
                c = 1E4 <= b ? Math.round(b / 1E3) + "k": 1E3 <= b ? Math.round(b / 100) / 10 + "k": b;
                return p(p({},
                a.properties), {
                    cluster: true,
                    cluster_id: a.id,
                    point_count: b,
                    point_count_abbreviated: c
                })
            }
            function m(a) {
                a = Math.sin(a * Math.PI / 180);
                a = .5 - .25 * Math.log((1 + a) / (1 - a)) / Math.PI;
                return 0 > a ? 0 : 1 < a ? 1 : a
            }
            function p(a, b) {
                for (var c in b) a[c] = b[c];
                return a
            }
            function n(a) {
                return a.x
            }
            function r(a) {
                return a.y
            }
            var q = function(a) {
                return a[0]
            },
            t = function(a) {
                return a[1]
            },
            y = function(b, c, d, e, g) {
                undefined === c && (c = q);
                undefined === d && (d = t);
                undefined === e && (e = 64);
                undefined === g && (g = Float64Array);
                this.nodeSize = e;
                this.points = b;
                var h = this.ids = new(65536 > b.length ? Uint16Array: Uint32Array)(b.length);
                g = this.coords = new g(2 * b.length);
                for (var k = 0; k < b.length; k++) h[k] = k,
                g[2 * k] = c(b[k]),
                g[2 * k + 1] = d(b[k]);
                a(h, g, e, 0, h.length - 1, 0)
            };
            y.prototype.range = function(a, b, c, d) {
                for (var e = this.ids,
                g = this.coords,
                h = this.nodeSize,
                k = [0, e.length - 1, 0], l = [], m, n; k.length;) {
                    var p = k.pop(),
                    q = k.pop(),
                    r = k.pop();
                    if (q - r <= h) for (p = r; p <= q; p++) m = g[2 * p],
                    n = g[2 * p + 1],
                    m >= a && m <= c && n >= b && n <= d && l.push(e[p]);
                    else {
                        var t = Math.floor((r + q) / 2);
                        m = g[2 * t];
                        n = g[2 * t + 1];
                        m >= a && m <= c && n >= b && n <= d && l.push(e[t]);
                        var u = (p + 1) % 2;
                        if (0 === p ? a <= m: b <= n) k.push(r),
                        k.push(t - 1),
                        k.push(u);
                        if (0 === p ? c >= m: d >= n) k.push(t + 1),
                        k.push(q),
                        k.push(u)
                    }
                }
                return l
            };
            y.prototype.within = function(a, b, c) {
                for (var d = this.ids,
                e = this.coords,
                g = this.nodeSize,
                h = [0, d.length - 1, 0], k = [], l = c * c; h.length;) {
                    var m = h.pop(),
                    n = h.pop(),
                    p = h.pop();
                    if (n - p <= g) for (m = p; m <= n; m++) {
                        p = e[2 * m] - a;
                        var q = e[2 * m + 1] - b;
                        p * p + q * q <= l && k.push(d[m])
                    } else {
                        q = Math.floor((p + n) / 2);
                        var r = e[2 * q],
                        t = e[2 * q + 1],
                        u = r - a,
                        v = t - b;
                        u * u + v * v <= l && k.push(d[q]);
                        u = (m + 1) % 2;
                        if (0 === m ? a - c <= r: b - c <= t) h.push(p),
                        h.push(q - 1),
                        h.push(u);
                        if (0 === m ? a + c >= r: b + c >= t) h.push(q + 1),
                        h.push(n),
                        h.push(u)
                    }
                }
                return k
            };
            var v = {
                minZoom: 0,
                maxZoom: 16,
                radius: 40,
                extent: 512,
                nodeSize: 64,
                log: false,
                generateId: false,
                reduce: null,
                map: function(a) {
                    return a
                }
            },
            x = function(a) {
                this.options = p(Lh(v), a);
                this.trees = Array(this.options.maxZoom + 1)
            };
            x.prototype.load = function(a) {
                var b = this.options,
                c = b.minZoom,
                d = b.maxZoom;
                b = b.nodeSize;
                this.points = a;
                for (var e = [], g = 0; g < a.length; g++) a[g].geometry && e.push(h(a[g], g));
                this.trees[d + 1] = new y(e, n, r, b, Float32Array);
                for (a = d; a >= c; a--) e = this._cluster(e, a),
                this.trees[a] = new y(e, n, r, b, Float32Array);
                return this
            };
            x.prototype.getClusters = function(a, b) {
                var c = ((a[0] + 180) % 360 + 360) % 360 - 180,
                d = Math.max( - 90, Math.min(90, a[1])),
                e = 180 === a[2] ? 180 : ((a[2] + 180) % 360 + 360) % 360 - 180,
                g = Math.max( - 90, Math.min(90, a[3]));
                if (360 <= a[2] - a[0]) c = -180,
                e = 180;
                else if (c > e) return c = this.getClusters([c, d, 180, g], b),
                d = this.getClusters([ - 180, d, e, g], b),
                c.concat(d);
                b = this.trees[this._limitZoom(b)];
                a = [];
                var h = 0;
                for (d = b.range(c / 360 + .5, m(g), e / 360 + .5, m(d)); h < d.length; h += 1) e = b.points[d[h]],
                a.push(e.numPoints ? k(e) : this.points[e.index]);
                return a
            };
            x.prototype.getChildren = function(a) {
                var b = this._getOriginId(a),
                c = this._getOriginZoom(a),
                d = this.trees[c];
                if (!d) throw Error("No cluster with the specified id.");
                var e = d.points[b];
                if (!e) throw Error("No cluster with the specified id.");
                b = [];
                var g = 0;
                for (c = d.within(e.x, e.y, this.options.radius / (this.options.extent * Math.pow(2, c - 1))); g < c.length; g += 1) e = d.points[c[g]],
                e.parentId === a && b.push(e.numPoints ? k(e) : this.points[e.index]);
                if (0 === b.length) throw Error("No cluster with the specified id.");
                return b
            };
            x.prototype.getLeaves = function(a, b, c) {
                var d = [];
                this._appendLeaves(d, a, b || 10, c || 0, 0);
                return d
            };
            x.prototype.getTile = function(a, b, c) {
                var d = this.trees[this._limitZoom(a)];
                a = Math.pow(2, a);
                var e = this.options;
                e = e.radius / e.extent;
                var g = (c - e) / a,
                h = (c + 1 + e) / a,
                k = {
                    features: []
                };
                this._addTileFeatures(d.range((b - e) / a, g, (b + 1 + e) / a, h), d.points, b, c, a, k);
                0 === b && this._addTileFeatures(d.range(1 - e / a, g, 1, h), d.points, a, c, a, k);
                b === a - 1 && this._addTileFeatures(d.range(0, g, e / a, h), d.points, -1, c, a, k);
                return k.features.length ? k: null
            };
            x.prototype.getClusterExpansionZoom = function(a) {
                for (var b = this._getOriginZoom(a) - 1; b <= this.options.maxZoom;) {
                    a = this.getChildren(a);
                    b++;
                    if (1 !== a.length) break;
                    a = a[0].properties.cluster_id
                }
                return b
            };
            x.prototype._appendLeaves = function(a, b, c, d, e) {
                var g = 0;
                for (b = this.getChildren(b); g < b.length; g += 1) {
                    var h = b[g],
                    k = h.properties;
                    k && k.cluster ? e = e + k.point_count <= d ? e + k.point_count: this._appendLeaves(a, k.cluster_id, c, d, e) : e < d ? e++:a.push(h);
                    if (a.length === c) break
                }
                return e
            };
            x.prototype._addTileFeatures = function(a, b, c, d, e, g) {
                for (var h = 0; h < a.length; h += 1) {
                    var k = b[a[h]],
                    m = k.numPoints,
                    n = {
                        type: 1,
                        geometry: [[Math.round(this.options.extent * (k.x * e - c)), Math.round(this.options.extent * (k.y * e - d))]],
                        tags: m ? l(k) : this.points[k.index].properties
                    },
                    p = undefined;
                    m ? p = k.id: this.options.generateId ? p = k.index: this.points[k.index].id && (p = this.points[k.index].id);
                    undefined !== p && (n.id = p);
                    g.features.push(n)
                }
            };
            x.prototype._limitZoom = function(a) {
                return Math.max(this.options.minZoom, Math.min(a, this.options.maxZoom + 1))
            };
            x.prototype._cluster = function(a, b) {
                var c = [],
                d = this.options,
                e = d.reduce;
                d = d.radius / (d.extent * Math.pow(2, b));
                for (var g = 0; g < a.length; g++) {
                    var h = a[g];
                    if (! (h.zoom <= b)) {
                        h.zoom = b;
                        for (var k = this.trees[b + 1], l = k.within(h.x, h.y, d), m = h.numPoints || 1, n = h.x * m, p = h.y * m, q = e && 1 < m ? this._map(h, true) : null, r = (g << 5) + (b + 1) + this.points.length, t = 0; t < l.length; t += 1) {
                            var u = k.points[l[t]];
                            if (! (u.zoom <= b)) {
                                u.zoom = b;
                                var v = u.numPoints || 1;
                                n += u.x * v;
                                p += u.y * v;
                                m += v;
                                u.parentId = r;
                                e && (q || (q = this._map(h, true)), e(q, this._map(u)))
                            }
                        }
                        1 === m ? c.push(h) : (h.parentId = r, c.push({
                            x: n / m,
                            y: p / m,
                            zoom: Infinity,
                            id: r,
                            parentId: -1,
                            numPoints: m,
                            properties: q
                        }))
                    }
                }
                return c
            };
            x.prototype._getOriginId = function(a) {
                return a - this.points.length >> 5
            };
            x.prototype._getOriginZoom = function(a) {
                return (a - this.points.length) % 32
            };
            x.prototype._map = function(a, b) {
                if (a.numPoints) return b ? p({},
                a.properties) : a.properties;
                a = this.points[a.index].properties;
                var c = this.options.map(a);
                return b && c === a ? p({},
                c) : c
            };
            return x
        })
    }),
    Li = function(c) {
        function a(b) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b));
            b.shapeLayer = new ShapeLayer(b.options);
            b.textLayer = new Od(b.options.textOptions);
            b.children = [b.shapeLayer, b.textLayer];
            b.max = [];
            return b
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    size: 50,
                    height: 0,
                    maxZoom: 19,
                    minZoom: 5,
                    gradient: {
                        0 : "rgb(50, 50, 256)",
                        "0.1": "rgb(50, 250, 56)",
                        "0.5": "rgb(250, 250, 56)",
                        1 : "rgb(250, 50, 56)"
                    },
                    enableCluster: false,
                    showText: true,
                    textOptions: {
                        fontSize: 13,
                        color: "white"
                    }
                }
            }
        },
        {
            key: "onOptionsChanged",
            value: function(a) {
                this.textLayer.setOptions(a.textOptions)
            }
        },
        {
            key: "setOptions",
            value: function() {
                var a = 0 < arguments.length && undefined !== arguments[0] ? arguments[0] : {},
                c = this.options.textOptions;
                a.textOptions && Object.assign(c, a.textOptions);
                var e = a.minZoom,
                g = a.maxZoom,
                h = a.size;
                e = g && g !== this.options.maxZoom || e && e !== this.options.minZoom || h && h !== this.options.size;
                Object.assign(this.options, a, {
                    textOptions: c
                });
                if (e) this.onChanged(this.options, this.data);
                else this.refreshLayer();
                this.onOptionsChanged(this.getOptions())
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                if (c && c.length) {
                    this.zoom = Math.floor(this.map.map.getZoom());
                    var b = a.maxZoom,
                    d = a.minZoom,
                    h = a.enableCluster;
                    a = a.size;
                    this.zoom > b ? this.zoom = b: this.zoom < d && (this.zoom = d);
                    h && (this.supercluster = new Nf({
                        maxZoom: b,
                        minZoom: d,
                        radius: a / 2
                    }), this.supercluster.load(c));
                    this.refreshLayer()
                }
            }
        },
        {
            key: "refreshLayer",
            value: function() {
                var a = 0 < arguments.length && undefined !== arguments[0] ? arguments[0] : this.options,
                c = 1 < arguments.length && undefined !== arguments[1] ? arguments[1] : this.data,
                e = this.map.map,
                g = this.zoom;
                a.enableCluster && this.supercluster && (c = this.getClusterData(a));
                if (c && c.length) {
                    var h = a.gradient,
                    k = a.showText,
                    l = a.textOptions,
                    m = a.height,
                    p = a.size;
                    p *= Math.pow(2, 18 - g);
                    c = Ng(c, p,
                    function(a) {
                        var b = Ia(a, 2),
                        c = b[0];
                        b = b[1]; - 180 <= c && 180 >= c && -90 <= b && 90 >= b && (b = e.lnglatToMercator(c, b), c = b[0], b = b[1]);
                        a[0] = c;
                        a[1] = b;
                        return a
                    });
                    this.max[g] = Math.max(this.max[g] || 0, c.max);
                    var n = new oa({
                        max: this.max[g],
                        min: 0,
                        maxSize: m * Math.pow(2, 18 - g),
                        minSize: 0,
                        gradient: h
                    });
                    h = [];
                    if (k) {
                        var r = l && l.format;
                        r = "function" === typeof r ? r: null;
                        h = c.map(function(a) {
                            return {
                                geometry: {
                                    coordinates: [a.center.x, a.center.y, n.getSize(a.count) + l.fontSize / 2 * Math.pow(2, 18 - g)]
                                },
                                text: r ? r(a.count) : a.count
                            }
                        })
                    }
                    this.textLayer.setData(h);
                    k = c.map(function(a) {
                        for (var b = a.center,
                        d = c.r,
                        e = [], g = 0; 6 > g; g++) e.push(Mg({
                            x: b.x,
                            y: b.y
                        },
                        d, g));
                        return {
                            geometry: {
                                type: "Polygon",
                                coordinates: [e]
                            },
                            properties: {
                                height: n.getSize(a.count),
                                color: n.getColor(a.count)
                            }
                        }
                    });
                    this.shapeLayer.setData(k);
                    a.enablePicked && a.autoSelect && this.pick( - 1, -1)
                }
            }
        },
        {
            key: "getClusterData",
            value: function() {
                var a = this.map.map,
                c = a.getBounds(),
                e = c.ne;
                c = c.sw;
                this.ne = e;
                this.sw = c;
                var g = e,
                h = g.lng;
                g = g.lat;
                var k = []; - 180 <= h && 180 >= h && -90 <= g && 90 >= g ? k = [c.lng, c.lat, e.lng, e.lat] : (e = a.mercatorToLnglat(this.ne.lng, this.ne.lat), c = a.mercatorToLnglat(this.sw.lng, this.sw.lat), k = c.concat(e));
                return this.supercluster.getClusters(k, this.zoom).map(function(a) {
                    var b = 0;
                    a.properties && a.properties.point_count && (b = a.properties.point_count);
                    return {
                        geometry: a.geometry,
                        count: b
                    }
                })
            }
        },
        {
            key: "pick",
            value: function(a, c) {
                return this.shapeLayer.pick(a, c)
            }
        },
        {
            key: "shouldUpdate",
            value: function() {
                if (!this.data) return ! 1;
                var a = this.map.map,
                c = Math.floor(a.getZoom()),
                e = this.options,
                g = e.maxZoom;
                e = e.minZoom;
                c > g ? c = g: c < e && (c = e);
                if (this.zoom !== c) return this.zoom = c,
                true;
                if (!this.options.enableCluster) return ! 1;
                c = a.getBounds();
                a = c.ne;
                c = c.sw;
                if (! (a && c && this.ne && this.sw)) return ! 1;
                if (this.ne.lng !== a.lng || this.ne.lat !== a.lat || this.sw.lng !== c.lng || this.sw.lat !== c.lat) return ! 0
            }
        },
        {
            key: "render",
            value: function(b) {
                this.shouldUpdate() ? this.refreshLayer() : Ya(a.prototype.__proto__ || N(a.prototype), "render", this).call(this, b)
            }
        }]);
        return a
    } (pb),
    ec = function() {
        function c(a, b) {
            I(this, c);
            this.map = a;
            this.options = b || {}
        }
        M(c, [{
            key: "onResize",
            value: function(a) {}
        },
        {
            key: "onUpdate",
            value: function(a) {
                throw "\u672a\u5b9e\u73b0onUpdate\u65b9\u6cd5";
            }
        },
        {
            key: "getContainer",
            value: function() {
                throw "\u672a\u5b9e\u73b0getContainer\u65b9\u6cd5";
            }
        },
        {
            key: "getSize",
            value: function() {
                throw "\u672a\u5b9e\u73b0getSize\u65b9\u6cd5";
            }
        },
        {
            key: "getTilt",
            value: function() {
                throw "\u672a\u5b9e\u73b0getTilt\u65b9\u6cd5";
            }
        },
        {
            key: "getHeading",
            value: function() {
                throw "\u672a\u5b9e\u73b0getHeading\u65b9\u6cd5";
            }
        },
        {
            key: "getZoomUnits",
            value: function() {
                throw "\u672a\u5b9e\u73b0getZoomUnits\u65b9\u6cd5";
            }
        },
        {
            key: "getCenter",
            value: function() {
                throw "\u672a\u5b9e\u73b0getCenter\u65b9\u6cd5";
            }
        },
        {
            key: "getMapType",
            value: function() {
                throw "\u672a\u5b9e\u73b0getMapType\u65b9\u6cd5";
            }
        },
        {
            key: "lnglatToMercator",
            value: function(a, b) {
                if ("gcj02" === this.options.coordinateSystem) return b = b * Math.PI / 180,
                b = 3189068.5 * Math.log((1 + Math.sin(b)) / (1 - Math.sin(b))),
                [parseFloat((a * Math.PI / 180 * 6378137).toFixed(2)), parseFloat(b.toFixed(2))];
                a = MercatorProjection.convertLL2MC({
                    lng: a,
                    lat: b
                });
                return [a.lng, a.lat]
            }
        }]);
        return c
    } (),
    Mi = function(c) {
        function a(b) {
            I(this, a);
            return Q(this, (a.__proto__ || N(a)).call(this, b))
        }
        R(a, c);
        M(a, [{
            key: "onResize",
            value: function(a) {
                this.map.addEventListener("resize", a)
            }
        },
        {
            key: "onMousemove",
            value: function(a) {
                this.map.addEventListener("mousemove",
                function(b) {
                    a(Object.assign(b, {
                        x: b.x,
                        y: b.y
                    }))
                })
            }
        },
        {
            key: "onClick",
            value: function(a) {
                this.map.addEventListener("click",
                function(b) {
                    a(Object.assign(b, {
                        x: b.x,
                        y: b.y
                    }))
                })
            }
        },
        {
            key: "onDblClick",
            value: function(a) {
                this.map.addEventListener("dblclick",
                function(b) {
                    a(Object.assign(b, {
                        x: b.x,
                        y: b.y
                    }))
                })
            }
        },
        {
            key: "onRightClick",
            value: function(a) {
                this.map.addEventListener("rightclick",
                function(b) {
                    a(Object.assign(b, {
                        x: b.x,
                        y: b.y
                    }))
                })
            }
        },
        {
            key: "onUpdate",
            value: function(a) {
                this.map.addEventListener("update", a);
                this.map.addEventListener("onearthstatuschange", a)
            }
        },
        {
            key: "getContainer",
            value: function() {
                return this.map.getContainer()
            }
        },
        {
            key: "getSize",
            value: function() {
                return this.map.getSize()
            }
        },
        {
            key: "getTilt",
            value: function() {
                return this.map.getTilt()
            }
        },
        {
            key: "getHeading",
            value: function() {
                return this.map.getHeading()
            }
        },
        {
            key: "getZoomUnits",
            value: function() {
                return this.map.getZoomUnits()
            }
        },
        {
            key: "getZoom",
            value: function() {
                return this.map.getZoom()
            }
        },
        {
            key: "getCenter",
            value: function() {
                var a = this.map.getCenter(); - 180 <= a.lng && 180 >= a.lng && (a = this.map.lnglatToMercator(a.lng, a.lat), a = {
                    lng: a[0],
                    lat: a[1]
                });
                return a
            }
        },
        {
            key: "getMapType",
            value: function() {
                return this.map.getMapType()
            }
        },
        {
            key: "lnglatToMercator",
            value: function(a, c) {
                return this.map.lnglatToMercator(a, c)
            }
        }]);
        return a
    } (ec),
    Ni = function(c) {
        function a(b) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b));
            b.div = document.createElement("div");
            b.div.style.position = "absolute";
            b.div.style.userSelect = "none";
            b.map.getPanes().mapPane.appendChild(b.div);
            return b
        }
        R(a, c);
        M(a, [{
            key: "onResize",
            value: function(a) {
                this.map.addEventListener("resize", a)
            }
        },
        {
            key: "onMousemove",
            value: function(a) {
                this.map.addEventListener("mousemove",
                function(b) {
                    a(Object.assign(b, {
                        x: b.pixel.x,
                        y: b.pixel.y
                    }))
                })
            }
        },
        {
            key: "onClick",
            value: function(a) {
                this.map.addEventListener("click",
                function(b) {
                    a(Object.assign(b, {
                        x: b.pixel.x,
                        y: b.pixel.y
                    }))
                })
            }
        },
        {
            key: "onDblClick",
            value: function(a) {
                this.map.addEventListener("dblclick",
                function(b) {
                    a(Object.assign(b, {
                        x: b.pixel.x,
                        y: b.pixel.y
                    }))
                })
            }
        },
        {
            key: "onRightClick",
            value: function(a) {
                this.map.addEventListener("rightclick",
                function(b) {
                    a(Object.assign(b, {
                        x: b.pixel.x,
                        y: b.pixel.y
                    }))
                })
            }
        },
        {
            key: "changeCanvas",
            value: function() {
                var a = this.map,
                c = a.getSize(),
                e = a.getCenter();
                a = a.pointToOverlayPixel(e);
                this.div.style.left = a.x - c.width / 2 + "px";
                this.div.style.top = a.y - c.height / 2 + "px"
            }
        },
        {
            key: "onUpdate",
            value: function(a) {
                var b = this;
                this.map.addEventListener("moveend",
                function() {
                    b.changeCanvas();
                    a()
                });
                this.map.addEventListener("moving",
                function() {
                    b.changeCanvas();
                    a()
                });
                this.map.addEventListener("zoomend",
                function() {
                    b.changeCanvas();
                    a()
                })
            }
        },
        {
            key: "getContainer",
            value: function() {
                return this.div
            }
        },
        {
            key: "getSize",
            value: function() {
                return this.map.getSize()
            }
        },
        {
            key: "getTilt",
            value: function() {
                return 0
            }
        },
        {
            key: "getHeading",
            value: function() {
                return 0
            }
        },
        {
            key: "getZoomUnits",
            value: function() {
                return Math.pow(2, 18 - this.map.getZoom())
            }
        },
        {
            key: "getCenter",
            value: function() {
                var a = this.map.getMapType().getProjection().lngLatToPoint(this.map.getCenter());
                return {
                    lng: a.x,
                    lat: a.y
                }
            }
        }]);
        return a
    } (ec),
    Oi = function(c) {
        function a(b) {
            I(this, a);
            return Q(this, (a.__proto__ || N(a)).call(this, b))
        }
        R(a, c);
        M(a, [{
            key: "onResize",
            value: function(a) {
                window.addEventListener("resize", a)
            }
        },
        {
            key: "onUpdate",
            value: function(a) {}
        },
        {
            key: "getContainer",
            value: function() {
                return this.map.container.getElementsByClassName("cesium-widget")[0]
            }
        },
        {
            key: "getSize",
            value: function() {
                var a = this.map;
                return {
                    width: a.canvas.clientWidth,
                    height: a.canvas.clientHeight
                }
            }
        },
        {
            key: "getTilt",
            value: function() {
                return 180 * this.map.camera.pitch / Math.PI + 90
            }
        },
        {
            key: "getHeading",
            value: function() {
                return 360 - 180 * this.map.camera.heading / Math.PI
            }
        },
        {
            key: "getZoomUnits",
            value: function() {
                var a = this.map;
                return 6.8 * a.scene.globe.ellipsoid.cartesianToCartographic(a.camera.position).height / 6500
            }
        },
        {
            key: "getZoom",
            value: function() {
                return 10
            }
        },
        {
            key: "getCenter",
            value: function() {
                var a = this.map;
                a = a.camera.pickEllipsoid(new Cesium.Cartesian2(a.canvas.clientWidth / 2, a.canvas.clientHeight / 2));
                a = Cesium.Ellipsoid.WGS84.cartesianToCartographic(a);
                a = this.getMercator([180 * a.longitude / Math.PI, 180 * a.latitude / Math.PI]);
                return {
                    lng: a[0],
                    lat: a[1]
                }
            }
        },
        {
            key: "getMercator",
            value: function(a) {
                var b = [];
                b[0] = a[0] * Math.PI / 180 * 6378137;
                a = a[1] * Math.PI / 180;
                b[1] = 3189068.5 * Math.log((1 + Math.sin(a)) / (1 - Math.sin(a)));
                return b
            }
        }]);
        return a
    } (ec),
    Pi = function(c) {
        function a(b) {
            I(this, a);
            return Q(this, (a.__proto__ || N(a)).call(this, b))
        }
        R(a, c);
        M(a, [{
            key: "onResize",
            value: function(a) {
                window.addEventListener("resize", a)
            }
        },
        {
            key: "onUpdate",
            value: function(a) {}
        },
        {
            key: "getContainer",
            value: function() {
                return this.map.container
            }
        },
        {
            key: "getSize",
            value: function() {
                return {
                    width: this.map.container.clientWidth,
                    height: this.map.container.clientHeight
                }
            }
        },
        {
            key: "getTilt",
            value: function() {
                return this.map.tilt
            }
        },
        {
            key: "getHeading",
            value: function() {
                return this.map.heading
            }
        },
        {
            key: "getZoomUnits",
            value: function() {
                return this.map.zoomUnits
            }
        },
        {
            key: "getCenter",
            value: function() {
                return this.map.center
            }
        }]);
        return a
    } (ec),
    Qi = function(c) {
        function a(b, c) {
            I(this, a);
            return Q(this, (a.__proto__ || N(a)).call(this, b, c))
        }
        R(a, c);
        M(a, [{
            key: "onResize",
            value: function(a) {
                window.addEventListener("resize", a)
            }
        },
        {
            key: "onUpdate",
            value: function(a) {}
        },
        {
            key: "getContainer",
            value: function() {
                return this.map.container
            }
        },
        {
            key: "getSize",
            value: function() {
                return {
                    width: this.map.container.clientWidth,
                    height: this.map.container.clientHeight
                }
            }
        },
        {
            key: "getTilt",
            value: function() {
                return this.map.tilt
            }
        },
        {
            key: "getHeading",
            value: function() {
                return this.map.heading
            }
        },
        {
            key: "getZoomUnits",
            value: function() {
                return this.map.zoomUnits
            }
        },
        {
            key: "getCenter",
            value: function() {
                return this.map.center
            }
        }]);
        return a
    } (ec),
    WebglLayer = function() {
        function c(a, b) {
            I(this, c);
            b = b || {};
            "bmap" === b.mapType ? this.map = new Ni(a, b) : "blank" === b.mapType ? this.map = new Pi(a, b) : "cesium" === b.mapType ? this.map = new Oi(a, b) : "three" === b.mapType ? this.map = new Qi(a, b) : (b.mapType = "bmapgl", this.map = new Mi(a, b));
            this.map.type = b.mapType;
            this.options = b || {};
            this.renderArr = []; (a = b.canvas) || (a = document.createElement("canvas"));
            this.canvas = a;
            this.gl = b.gl ? b.gl: he(a);
            this.gl.getExtension("OES_element_index_uint");
            this.changeSize();
            this.projectionMatrix = E.create(Float64Array);
            this.orthoMatrix = E.create(Float64Array);
            this.matrix = E.create(Float64Array);
            this.viewMatrix = E.create(Float64Array);
            this.pointToPixelMatrix = E.create(Float64Array);
            this.pixelToViewMatrix = E.create(Float64Array);
            this.fovy = 35;
            this._animation = this.animation.bind(this);
            this._update = this.update.bind(this);
            this.onInitialize(this.options.onInitialize);
            this.options.onRender && this.renderArr.push(this.options.onRender);
            this.stateManager = new wf({
                gl: this.gl
            });
            this.pickFBO = new FrameBufferObject(this.gl);
            this.transferOptions = {};
            this.bind()
        }
        M(c, [{
            key: "bind",
            value: function() {
                var a = this,
                b = this.map;
                b.onResize(function() {
                    a.changeSize();
                    a.render()
                });
                b.onUpdate(this._update);
                b.onClick && b.onClick(function(b) {
                    a.onClick && a.onClick(b)
                });
                b.onDblClick && b.onDblClick(function(b) {
                    a.onDblClick && a.onDblClick(b)
                });
                b.onRightClick && b.onRightClick(function(b) {
                    a.onRightClick && a.onRightClick(b)
                });
                b.onMousemove && b.onMousemove(function(b) {
                    a.onMousemove && a.onMousemove(b)
                });
                this.options.canvas || b.getContainer().appendChild(this.canvas)
            }
        },
        {
            key: "setOptions",
            value: function(a) {
                this.options = a
            }
        },
        {
            key: "onInitialize",
            value: function(a) {
                a && (this.transferOptions = a.bind(this)(this.gl) || {})
            }
        },
        {
            key: "bindFramebuffer",
            value: function(a) {
                var b = this.gl;
                a ? b.bindFramebuffer(b.FRAMEBUFFER, a.framebuffer) : b.bindFramebuffer(b.FRAMEBUFFER, null)
            }
        },
        {
            key: "saveFramebuffer",
            value: function() {
                var a = this.gl;
                this.preFramebuffer = a.getParameter(a.FRAMEBUFFER_BINDING)
            }
        },
        {
            key: "restoreFramebuffer",
            value: function() {
                var a = this.gl;
                a.bindFramebuffer(a.FRAMEBUFFER, this.preFramebuffer)
            }
        },
        {
            key: "onRender",
            value: function(a) {
                this.renderArr.push(a)
            }
        },
        {
            key: "changeSize",
            value: function() {
                var a = this.canvas;
                if (a) {
                    var b = a.style,
                    c = this.map.getSize(),
                    e = window.devicePixelRatio;
                    a.width = c.width * e;
                    a.height = c.height * e;
                    b.cssText = "position: absolute;left:0;top:0;width:" + c.width + "px;height:" + c.height + "px;z-index:2;";
                    c = this.options;
                    "cesium" !== c.mapType || c.canvas || (b.pointerEvents = "none");
                    this.gl.viewport(0, 0, a.width, a.height)
                }
            }
        },
        {
            key: "update",
            value: function() { ! 1 === this.options.autoUpdate || this.isAnimation || this.render()
            }
        },
        {
            key: "render",
            value: function() {
                if (this.map) {
                    var a = this.options,
                    b = this.projectionMatrix,
                    c = this.viewMatrix;
                    if ("three" === a.mapType) c = this.map.map.camera,
                    b = c.projectionMatrix.elements,
                    c = c.matrixWorldInverse.elements;
                    else if ("cesium" === a.mapType) {
                        c = this.map.map;
                        var e = c.camera.frustum.projectionMatrix;
                        b = new Float32Array([e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]]);
                        e = c.camera.viewMatrix;
                        c = new Float32Array([e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]])
                    } else "B_EARTH_MAP" === this.map.map.mapType ? (b = this.map.map.getEarth().scene._camera.getProjectionMatrix(), c = this.map.map.getEarth().scene._camera.getModelViewMatrix()) : (this.updateProjectionMatrix(), this.updateModelViewMatrix());
                    e = E.multiply(this.matrix, b, c);
                    Object.assign(this.transferOptions, {
                        gl: this.gl,
                        matrix: e,
                        pointToPixelMatrix: this.pointToPixelMatrix,
                        pixelToViewMatrix: this.pixelToViewMatrix,
                        projectionMatrix: b,
                        orthoMatrix: this.orthoMatrix,
                        viewMatrix: c,
                        stateManager: this.stateManager
                    });
                    "three" !== a.mapType && "cesium" !== a.mapType && false !== a.autoUpdate && this.clear();
                    for (a = 0; a < this.renderArr.length; a++) this.renderArr[a] && this.renderArr[a].bind(this)(this.transferOptions)
                }
            }
        },
        {
            key: "clear",
            value: function(a) {
                var b = this.gl,
                c = this.options.clearColor || [0, 0, 0, 0];
                b.clearColor(c[0], c[1], c[2], c[3]);
                a && (a instanceof Array || (a = ha(a).unitArray()), b.clearColor(a[0], a[1], a[2], a[3]));
                b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT)
            }
        },
        {
            key: "updateProjectionMatrix",
            value: function() {
                var a = this.gl.canvas.width / this.gl.canvas.height,
                b = this.options.cameraNear || 1,
                c = this.options.cameraFar || 4E3;
                E.perspective(this.projectionMatrix, toRadian(this.fovy), a, b, c);
                a = this.map.getSize();
                E.ortho(this.orthoMatrix, -a.width / 2, a.width / 2, -a.height / 2, a.height / 2, b, c)
            }
        },
        {
            key: "updateModelViewMatrix",
            value: function() {
                var a = this.map,
                b = this.viewMatrix,
                c = this.pointToPixelMatrix,
                e = this.pixelToViewMatrix;
                E.identity(b);
                E.identity(c);
                E.identity(e);
                var g = a.getSize();
                g = Math.round( - g.height / (2 * Math.tan(toRadian(this.fovy) / 2)));
                E.translate(e, e, [0, 0, g]);
                E.rotate(e, e, toRadian(a.getTilt()), [ - 1, 0, 0]);
                E.rotate(e, e, toRadian(a.getHeading()), [0, 0, -1]);
                g = a.getCenter();
                var h = this.options.pointOffset || [0, 0];
                a = a.getZoomUnits();
                E.translate(c, c, [(h[0] - g.lng) / a, (h[1] - g.lat) / a, 0]);
                a = 1 / a;
                E.scale(c, c, [a, a, a]);
                E.multiply(b, e, c)
            }
        },
        {
            key: "destroy",
            value: function() {
                this.stopAnimation();
                this.map.getContainer().removeChild(this.canvas);
                this.canvas = null
            }
        },
        {
            key: "animation",
            value: function() {
                this.isAnimation && (this.render(), window.requestAnimationFrame(this._animation))
            }
        },
        {
            key: "startAnimation",
            value: function() {
                this.isAnimation || (this.isAnimation = true, window.requestAnimationFrame(this._animation))
            }
        },
        {
            key: "stopAnimation",
            value: function() {
                this.isAnimation = false
            }
        }]);
        return c
    } (),
    Pf = {
        circle: 1,
        square: 2
    },
    PointLayer = function(c) {
        function a(b) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b));
            b.bufferData = [];
            return b
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    color: [.1, .1, .9, 1],
                    blend: "normal",
                    shape: "circle",
                    size: 5
                }
            }
        },
        {
            key: "initialize",
            value: function(a) {
                this.gl = a;
                var b = this.getOptions();
                this.program = new Program(this.gl, {
                    vertexShader: "attribute vec3 aPos;attribute vec4 aColor;attribute float aSize;uniform mat4 uMatrix;varying vec4 vColor;uniform vec4 uSelectedColor;void main(void){if(aColor.w>=0.0&&aColor.w<=1.0){vColor=aColor;}else{vColor=vec4(aColor.xyz,1.0);}gl_Position=uMatrix*vec4(aPos.xyz,1.0);gl_PointSize=aSize;\n#if defined(PICK)\nif(mapvIsPicked()){vColor=uSelectedColor;}\n#endif\n}",
                    fragmentShader: "varying vec4 vColor;uniform int uShape;void main(void){vec4 color=vColor;if(uShape==1){float d=distance(gl_PointCoord,vec2(0.5,0.5));if(d>0.5){discard;}float blur=1.0;blur=1.0-smoothstep(0.49,0.5,d);color.a*=blur;gl_FragColor=color;}else{gl_FragColor=color;}}",
                    defines: b.enablePicked ? ["PICK"] : []
                },
                this);
                this.buffer = new Buffer({
                    gl: a,
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
                this.vertexArray = new VertexArray({
                    gl: a,
                    program: this.program,
                    attributes: b
                })
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                if (this.gl) {
                    for (var b = [], d = a.color, h = a.size, k = 0; k < c.length; k++) {
                        var l = this.normizedPoint(c[k].geometry.coordinates),
                        m = c[k].color || d;
                        "properties" in c[k] && "color" in c[k].properties && (m = c[k].properties.color);
                        "[object Function]" === Object.prototype.toString.call(m) && (m = m(c[k]));
                        m = this.normizedColor(m);
                        var p = c[k].size || h;
                        "properties" in c[k] && "size" in c[k].properties && (p = c[k].properties.size);
                        p = "[object Function]" === Object.prototype.toString.call(p) ? p(c[k]) : Number(p);
                        l = this.addMultipleCoords(l);
                        for (var n = 0; n < l.length; n++) {
                            var r = l[n];
                            b.push(r[0], r[1], Number(r[2] || 0));
                            b.push(m[0], m[1], m[2], m[3]);
                            b.push(p * window.devicePixelRatio)
                        }
                    }
                    this.bufferData = b;
                    this.buffer.updateData(new Float32Array(b));
                    a.enablePicked && this.parsePickData(c)
                }
            }
        },
        {
            key: "parsePickData",
            value: function(a) {
                var b = this.getOptions(),
                c = [];
                if (b.enablePicked) for (var g = 0; g < a.length; g++) {
                    var h = this.indexToRgb(g);
                    c.push(h[0] / 255, h[1] / 255, h[2] / 255);
                    b.repeat && (c.push(h[0] / 255, h[1] / 255, h[2] / 255), c.push(h[0] / 255, h[1] / 255, h[2] / 255))
                }
                b.enablePicked && this.pickBuffer.updateData(new Float32Array(c))
            }
        },
        {
            key: "destroy",
            value: function() {
                this.buffer = this.program = this.bufferData = null
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl,
                c = a.matrix,
                g = a.isPickRender;
                if (! (0 >= this.bufferData.length)) {
                    this.getOptions();
                    var h = this.program;
                    h.use(b);
                    this.vertexArray.bind();
                    var k = 1;
                    this.options.shape && Pf[this.options.shape] && (k = Pf[this.options.shape]);
                    a = this.getCommonUniforms(a);
                    a = Object.assign(a, {
                        uShape: k,
                        uMatrix: c
                    });
                    h.setUniforms(a);
                    c = this.options.blend;
                    g ? b.disable(b.BLEND) : (b.enable(b.BLEND), b.blendEquation(b.FUNC_ADD), c && "lighter" === c ? b.blendFunc(b.SRC_ALPHA, b.ONE) : b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA));
                    b.drawArrays(b.POINTS, 0, this.bufferData.length / 8)
                }
            }
        }]);
        return a
    } (Layer),
    GroundRippleLayer = function(c) {
        function a(b, c) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b, c));
            b.bufferDataArr = [];
            b.indexDataArr = [];
            b.vertexBuffer = [];
            b.indexBuffer = [];
            b.position = [];
            b.opacity = 1;
            b.currentScale = 1;
            b.autoUpdate = true;
            return b
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    color: [.1, .1, .9, 1],
                    size: 5,
                    segs: 32,
                    scale: 2,
                    unit: "m",
                    step: .1
                }
            }
        },
        {
            key: "initialize",
            value: function(a) {
                this.gl = a;
                this.program = new Program(this.gl, {
                    vertexShader: "uniform mat4 u_projectionMatrix;uniform mat4 u_modelViewMatrix;uniform mat4 u_modelMatrix;uniform float u_opacity;attribute vec4 aPos;attribute vec4 aColor;varying vec4 vColor;void main(){vColor=aColor;vColor.a=u_opacity;gl_Position=u_projectionMatrix*u_modelViewMatrix*u_modelMatrix*vec4(aPos.xyz,1.0);}",
                    fragmentShader: "precision highp float;varying vec4 vColor;void main(){if(vColor.a==0.0){discard;}gl_FragColor=vColor;}"
                })
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                var b = this.gl;
                if (b && (this.currentScale = this.opacity = 1, (this.data = c) && c.length)) {
                    var d = a.color,
                    h = a.segs;
                    a = a.size;
                    for (var k = 360 / h,
                    l = 0; l < c.length; l++) {
                        var m = [],
                        p = [],
                        n = this.normizedPoint(c[l].geometry.coordinates),
                        r = c[l].color || d;
                        "properties" in c[l] && "color" in c[l].properties && (r = c[l].properties.color);
                        r = this.normizedColor(r);
                        var q = "[object Function]" === Object.prototype.toString.call(a) ? a(c[l]) : Number(a);
                        var t = n[0],
                        y = n[1];
                        m.push(0, 0, -.5);
                        m.push(r[0], r[1], r[2], 0);
                        for (var v = 1,
                        x = 0; v <= h; v++, x += k) m.push(n[0] - t + Math.cos(Math.PI / 180 * x) * q, n[1] - y + Math.sin(Math.PI / 180 * x) * q, -.5),
                        m.push(r[0], r[1], r[2], this.opacity),
                        v === h ? p.push(0, 0 + v, 1) : p.push(0, 0 + v, 0 + v + 1);
                        r = b.createBuffer();
                        b.bindBuffer(b.ARRAY_BUFFER, r);
                        b.bufferData(b.ARRAY_BUFFER, new Float32Array(m), b.STATIC_DRAW);
                        this.vertexBuffer[l] = r;
                        this.bufferDataArr[l] = m;
                        b.bindBuffer(b.ARRAY_BUFFER, null);
                        m = b.createBuffer();
                        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, m);
                        b.bufferData(b.ELEMENT_ARRAY_BUFFER, new Uint16Array(p), b.STATIC_DRAW);
                        this.indexBuffer[l] = m;
                        this.indexDataArr[l] = p;
                        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, null);
                        this.position[l] = [n[0], n[1]]
                    }
                    this.webglLayer && this.webglLayer.render()
                }
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl,
                c = a.projectionMatrix,
                g = a.viewMatrix;
                a = this.program;
                b.useProgram(a.program);
                b.uniformMatrix4fv(a.uniforms.u_projectionMatrix, false, c);
                b.uniformMatrix4fv(a.uniforms.u_modelViewMatrix, false, g);
                c = this.opacity;
                undefined !== this.options.opacity && (c = this.options.opacity);
                b.uniform1f(a.uniforms.u_opacity, c);
                b.enable(b.BLEND);
                b.blendFunc(b.SRC_ALPHA, b.DST_ALPHA);
                b.blendEquation(b.FUNC_ADD);
                b.enableVertexAttribArray(a.attributes.aPos);
                b.enableVertexAttribArray(a.attributes.aColor);
                for (c = 0; c < this.bufferDataArr.length; c++) if (! (0 >= this.bufferDataArr[c].length)) {
                    g = (new Float32Array(this.bufferDataArr[c])).BYTES_PER_ELEMENT;
                    b.bindBuffer(b.ARRAY_BUFFER, this.vertexBuffer[c]);
                    b.vertexAttribPointer(a.attributes.aColor, 4, b.FLOAT, false, 7 * g, 3 * g);
                    b.vertexAttribPointer(a.attributes.aPos, 3, b.FLOAT, false, 7 * g, 0);
                    g = this.position[c];
                    var h = E.create(),
                    k = [this.currentScale, this.currentScale, this.currentScale];
                    "px" === this.options.unit && this.map && (k = this.map.getZoomUnits(), k = [this.currentScale * k, this.currentScale * k, this.currentScale]);
                    E.identity(h);
                    E.translate(h, h, [g[0], g[1], 0]);
                    E.scale(h, h, k);
                    b.uniformMatrix4fv(a.uniforms.u_modelMatrix, false, h);
                    b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.indexBuffer[c]);
                    b.drawElements(b.TRIANGLES, this.indexDataArr[c].length, b.UNSIGNED_SHORT, 0);
                    b.bindBuffer(b.ARRAY_BUFFER, null);
                    b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, null)
                }
                b.disable(b.BLEND);
                c = this.getOptions();
                a = c.scale;
                c = c.step;
                this.opacity -= c / 10;
                this.currentScale += a * c;
                0 > this.opacity && (this.currentScale = this.opacity = 1);
                b.useProgram(null)
            }
        }]);
        return a
    } (Layer),
    RippleLayer = function(c) {
        function a(b) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b));
            b.bufferData = [];
            b.date = new Date;
            b.autoUpdate = true;
            return b
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    color: [.1, .1, .9, 1],
                    blend: "normal",
                    size: 20,
                    unit: "px",
                    duration: 2
                }
            }
        },
        {
            key: "initialize",
            value: function(a) {
                this.gl = a;
                var b = this.getOptions();
                this.program = new Program(this.gl, {
                    vertexShader: "attribute vec3 aPos;attribute vec4 aColor;attribute float aSize;uniform mat4 uMatrix;uniform vec4 uSelectedColor;uniform float uTime;uniform float duration;uniform float zoomUnits;varying vec4 vColor;void main(void){if(aColor.w>=0.0&&aColor.w<=1.0){vColor=aColor;}else{vColor=vec4(aColor.xyz,1.0);}float percent=mod(uTime,duration)/duration;vColor.a=1.-percent;gl_Position=uMatrix*vec4(aPos.xyz,1.0);gl_PointSize=aSize/zoomUnits*percent;\n#if defined(PICK)\nif(mapvIsPicked()){vColor=uSelectedColor;}\n#endif\n}",
                    fragmentShader: "varying vec4 vColor;void main(void){vec4 color=vColor;float d=distance(gl_PointCoord,vec2(0.5,0.5));if(d>0.5){discard;}float blur=1.0;blur=1.0-smoothstep(0.49,0.5,d);color.a*=blur;gl_FragColor=color;}",
                    defines: b.enablePicked ? ["PICK"] : []
                },
                this);
                this.buffer = new Buffer({
                    gl: a,
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
                this.vertexArray = new VertexArray({
                    gl: a,
                    program: this.program,
                    attributes: b
                })
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                if (this.gl) {
                    for (var b = [], d = a.color, h = a.size, k = 0; k < c.length; k++) {
                        var l = c[k].geometry.coordinates,
                        m = c[k].color || d;
                        "properties" in c[k] && "color" in c[k].properties && (m = c[k].properties.color);
                        "[object Function]" === Object.prototype.toString.call(m) && (m = m(c[k]));
                        m = this.normizedColor(m);
                        l = this.normizedPoint(l);
                        var p = c[k].size || h;
                        "properties" in c[k] && "size" in c[k].properties && (p = c[k].properties.size);
                        p = "[object Function]" === Object.prototype.toString.call(p) ? p(c[k]) : Number(p);
                        b.push(l[0], l[1], Number(l[2] || 0));
                        b.push(m[0], m[1], m[2], m[3]);
                        b.push(p * window.devicePixelRatio)
                    }
                    this.bufferData = b;
                    this.buffer.updateData(new Float32Array(b));
                    a.enablePicked && this.parsePickData(c)
                }
            }
        },
        {
            key: "parsePickData",
            value: function(a) {
                var b = this.getOptions(),
                c = [];
                if (b.enablePicked) for (var g = 0; g < a.length; g++) {
                    var h = this.indexToRgb(g);
                    c.push(h[0] / 255, h[1] / 255, h[2] / 255)
                }
                b.enablePicked && this.pickBuffer.updateData(new Float32Array(c))
            }
        },
        {
            key: "destroy",
            value: function() {
                this.buffer = this.program = this.bufferData = null
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl,
                c = a.matrix,
                g = a.isPickRender;
                if (! (0 >= this.bufferData.length)) {
                    var h = this.getOptions(),
                    k = this.program;
                    k.use(b);
                    this.vertexArray.bind();
                    a = this.getCommonUniforms(a);
                    var l = 1;
                    "m" === h.unit && this.map && (l = this.map.getZoomUnits());
                    a = Object.assign(a, {
                        zoomUnits: l,
                        uTime: (new Date - this.date) / 1E3,
                        duration: h.duration,
                        uMatrix: c
                    });
                    k.setUniforms(a);
                    c = this.options.blend;
                    g ? b.disable(b.BLEND) : (b.enable(b.BLEND), b.blendEquation(b.FUNC_ADD), c && "lighter" === c ? b.blendFunc(b.SRC_ALPHA, b.ONE) : b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA));
                    b.drawArrays(b.POINTS, 0, this.bufferData.length / 8)
                }
            }
        }]);
        return a
    } (Layer),
    SparkLayer = function(c) {
        function a(b, c) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b, c));
            b.bufferData = [];
            b.startTime = Number(b.options.startTime) || 0;
            b.endTime = Number(b.options.endTime);
            b.time = b.startTime;
            b.segs = Number(b.options.segs) || 10;
            b.autoUpdate = true;
            return b
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    color: [.9, .1, .1, 1],
                    trailLength: 3,
                    height: 100,
                    step: .1,
                    segs: 10
                }
            }
        },
        {
            key: "setTime",
            value: function(a) {
                this.time = a
            }
        },
        {
            key: "initialize",
            value: function(a) {
                this.gl = a;
                this.program = new Program(this.gl, {
                    vertexShader: "precision mediump float;attribute vec4 aPos;uniform mat4 u_matrix;uniform float currentTime;uniform float trailLength;varying float vTime;void main(){gl_Position=u_matrix*vec4(aPos.xyz,1.0);vTime=1.0-((currentTime-aPos.w)/trailLength);}",
                    fragmentShader: "precision mediump float;uniform vec3 uFragColor;varying float vTime;void main(){if(vTime>1.0||vTime<0.0){discard;}gl_FragColor=vec4(uFragColor,1.0*vTime);}"
                });
                this.buffer = a.createBuffer();
                a.bindBuffer(a.ARRAY_BUFFER, this.buffer)
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                var b = this.gl;
                if (b) {
                    this.buffer = b.createBuffer();
                    b.bindBuffer(b.ARRAY_BUFFER, this.buffer);
                    for (var d = [], h = a.height, k = 0; k < c.length; k++) {
                        var l = c[k].geometry.coordinates;
                        var m = "[object Function]" === Object.prototype.toString.call(h) ? h(c[k]) : Number(h);
                        for (var p = 0,
                        n = 0; n < this.segs; n++) {
                            var r = this.normizedPoint(l);
                            d.push(r[0], r[1], p);
                            undefined === l[2] ? d.push(n) : d.push(Number(l[2]));
                            p += m / this.segs;
                            d.push(r[0], r[1], p);
                            undefined === l[2] ? d.push(n + 1) : d.push(Number(l[2]))
                        }
                    }
                    undefined === a.endTime && (this.endTime = this.segs);
                    this.bufferData = d;
                    b.bufferData(b.ARRAY_BUFFER, new Float32Array(d), b.STATIC_DRAW);
                    this.webglLayer && this.webglLayer.render()
                }
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl,
                c = a.matrix;
                a = this.program;
                b.useProgram(a.program);
                b.uniformMatrix4fv(a.uniforms.u_matrix, false, c);
                b.bindBuffer(b.ARRAY_BUFFER, this.buffer);
                b.enableVertexAttribArray(a.attributes.aPos);
                b.vertexAttribPointer(a.attributes.aPos, 4, b.FLOAT, false, 0, 0);
                c = this.normizedColor(this.options.color);
                b.uniform3f(a.uniforms.uFragColor, c[0], c[1], c[2]);
                b.uniform1f(a.uniforms.currentTime, this.time);
                b.uniform1f(a.uniforms.trailLength, this.options.trailLength);
                b.enable(b.BLEND);
                b.polygonOffset(2, 1);
                b.blendFunc(b.SRC_ALPHA, b.ONE);
                b.blendEquation(b.FUNC_ADD);
                b.drawArrays(b.LINES, 0, this.bufferData.length / 4);
                b.bindBuffer(b.ARRAY_BUFFER, null);
                b.disable(b.BLEND);
                this.time += Number(this.options.step);
                this.time > 1.5 * this.endTime && (this.time = this.startTime);
                b.useProgram(null)
            }
        }]);
        return a
    } (Layer),
    Nc = function(c, a, b, d) {
        if (! (c instanceof a) || undefined !== d && d in c) throw TypeError(b + ": incorrect invocation!");
        return c
    },
    rb = O(function(c) {
        var a = {},
        b = {};
        c = c.exports = function(c, e, g, h, k) {
            k = k ?
            function() {
                return c
            }: Cd(c);
            g = la(g, h, e ? 2 : 1);
            h = 0;
            var d, m;
            if ("function" != typeof k) throw TypeError(c + " is not iterable!");
            if (undefined === k || Ra.Array !== k && sf[rf] !== k) for (h = k.call(c); ! (m = h.next()).done;) {
                if (k = qf(h, g, m.value, e), k === a || k === b) return k
            } else for (d = wc(c.length); d > h; h++) if (k = e ? g(sa(m = c[h])[0], m[1]) : g(c[h]), k === a || k === b) return k
        };
        c.BREAK = a;
        c.RETURN = b
    }),
    Ui = ja("species"),
    Qf = function(c, a) {
        c = sa(c).constructor;
        var b;
        return undefined === c || undefined == (b = sa(c)[Ui]) ? a: jb(b)
    },
    Vi = function(c, a, b) {
        var d = undefined === b;
        switch (a.length) {
        case 0:
            return d ? c() : c.call(b);
        case 1:
            return d ? c(a[0]) : c.call(b, a[0]);
        case 2:
            return d ? c(a[0], a[1]) : c.call(b, a[0], a[1]);
        case 3:
            return d ? c(a[0], a[1], a[2]) : c.call(b, a[0], a[1], a[2]);
        case 4:
            return d ? c(a[0], a[1], a[2], a[3]) : c.call(b, a[0], a[1], a[2], a[3])
        }
        return c.apply(b, a)
    },
    Rf = S.process,
    Qd = S.setImmediate,
    Sf = S.clearImmediate,
    Tf = S.MessageChannel,
    Rd = S.Dispatch,
    Sd = 0,
    fc = {},
    gc = function() {
        var c = +this;
        if (fc.hasOwnProperty(c)) {
            var a = fc[c];
            delete fc[c];
            a()
        }
    },
    Uf = function(c) {
        gc.call(c.data)
    };
    if (!Qd || !Sf) if (Qd = function(c) {
        for (var a = [], b = 1; arguments.length > b;) a.push(arguments[b++]);
        fc[++Sd] = function() {
            Vi("function" == typeof c ? c: Function(c), a)
        };
        hc(Sd);
        return Sd
    },
    Sf = function(c) {
        delete fc[c]
    },
    "process" == kb(Rf)) var hc = function(c) {
        Rf.nextTick(la(gc, c, 1))
    };
    else if (Rd && Rd.now) hc = function(c) {
        Rd.now(la(gc, c, 1))
    };
    else if (Tf) {
        var Vf = new Tf;
        var Wf = Vf.port2;
        Vf.port1.onmessage = Uf;
        hc = la(Wf.postMessage, Wf, 1)
    } else S.addEventListener && "function" == typeof postMessage && !S.importScripts ? (hc = function(c) {
        S.postMessage(c + "", "*")
    },
    S.addEventListener("message", Uf, false)) : hc = "onreadystatechange" in (zc ? xb.createElement("script") : {}) ?
    function(c) {
        od.appendChild(zc ? xb.createElement("script") : {}).onreadystatechange = function() {
            od.removeChild(this);
            gc.call(c)
        }
    }: function(c) {
        setTimeout(la(gc, c, 1), 0)
    };
    var Td = Qd,
    Xf = S.MutationObserver || S.WebKitMutationObserver,
    Ud = S.process,
    Vd = S.Promise,
    Yf = "process" == kb(Ud),
    Oc = {
        f: function(c) {
            return new Og(c)
        }
    },
    Pc = function(c) {
        try {
            return {
                e: false,
                v: c()
            }
        } catch(a) {
            return {
                e: true,
                v: a
            }
        }
    },
    Zf = S.navigator,
    Wi = Zf && Zf.userAgent || "",
    Wd = function(c, a) {
        sa(c);
        if (pa(a) && a.constructor === c) return a;
        c = Oc.f(c);
        var b = c.resolve;
        b(a);
        return c.promise
    },
    Xd = function(c, a, b) {
        for (var d in a) b && c[d] ? c[d] = a[d] : Va(c, d, a[d]);
        return c
    },
    $f = ja("species"),
    ag = function(c) {
        c = "function" == typeof X[c] ? X[c] : S[c];
        Ea && c && !c[$f] && Aa.f(c, $f, {
            configurable: true,
            get: function() {
                return this
            }
        })
    },
    bg = function() {
        var c, a, b = function() {
            var b;
            for (Yf && (b = Ud.domain) && b.exit(); c;) {
                var e = c.fn;
                c = c.next;
                try {
                    e()
                } catch(m) {
                    throw c ? d() : a = undefined,
                    m;
                }
            }
            a = undefined;
            b && b.enter()
        };
        if (Yf) var d = function() {
            Ud.nextTick(b)
        };
        else if (!Xf || S.navigator && S.navigator.standalone) if (Vd && Vd.resolve) {
            var e = Vd.resolve(undefined);
            d = function() {
                e.then(b)
            }
        } else d = function() {
            Td.call(S, b)
        };
        else {
            var g = true,
            h = document.createTextNode(""); (new Xf(b)).observe(h, {
                characterData: true
            });
            d = function() {
                h.data = g = !g
            }
        }
        return function(b) {
            b = {
                fn: b,
                next: undefined
            };
            a && (a.next = b);
            c || (c = b, d());
            a = b
        }
    } (),
    cg = S.TypeError,
    Fb = S.process,
    dg = Fb && Fb.versions,
    Xi = dg && dg.v8 || "",
    Sa = S.Promise,
    ic = "process" == Kc(Fb),
    Qc = function() {},
    eg,
    jc = eg = Oc.f,
    Rc = !!
    function() {
        try {
            var c = Sa.resolve(1),
            a = (c.constructor = {})[ja("species")] = function(a) {
                a(Qc, Qc)
            };
            return (ic || "function" == typeof PromiseRejectionEvent) && c.then(Qc) instanceof a && 0 !== Xi.indexOf("6.6") && -1 === Wi.indexOf("Chrome/66")
        } catch(b) {}
    } (),
    fg = function(c) {
        var a;
        return pa(c) && "function" == typeof(a = c.then) ? a: false
    },
    Yd = function(c, a) {
        if (!c._n) {
            c._n = true;
            var b = c._c;
            bg(function() {
                for (var d = c._v,
                e = 1 == c._s,
                g = 0; b.length > g;) {
                    var h = undefined,
                    k = undefined,
                    l = undefined,
                    m = b[g++],
                    p = e ? m.ok: m.fail,
                    n = m.resolve,
                    r = m.reject,
                    q = m.domain;
                    try {
                        p ? (e || (2 == c._h && Yi(c), c._h = 1), true === p ? l = d: (q && q.enter(), l = p(d), q && (q.exit(), h = true)), l === m.promise ? r(cg("Promise-chain cycle")) : (k = fg(l)) ? k.call(l, n, r) : n(l)) : r(d)
                    } catch(t) {
                        q && !h && q.exit(),
                        r(t)
                    }
                }
                c._c = [];
                c._n = false;
                a && !c._h && Zi(c)
            })
        }
    },
    Zi = function(c) {
        Td.call(S,
        function() {
            var a = c._v,
            b = 1 !== c._h && 0 === (c._a || c._c).length,
            d,
            e;
            if (b) {
                var g = Pc(function() {
                    ic ? Fb.emit("unhandledRejection", a, c) : (d = S.onunhandledrejection) ? d({
                        promise: c,
                        reason: a
                    }) : (e = S.console) && e.error && e.error("Unhandled promise rejection", a)
                });
                c._h = ic || 1 !== c._h && 0 === (c._a || c._c).length ? 2 : 1
            }
            c._a = undefined;
            if (b && g.e) throw g.v;
        })
    },
    Yi = function(c) {
        Td.call(S,
        function() {
            var a;
            ic ? Fb.emit("rejectionHandled", c) : (a = S.onrejectionhandled) && a({
                promise: c,
                reason: c._v
            })
        })
    },
    Gb = function(c) {
        var a = this;
        a._d || (a._d = true, a = a._w || a, a._v = c, a._s = 2, a._a || (a._a = a._c.slice()), Yd(a, true))
    },
    Zd = function(c) {
        var a = this,
        b;
        if (!a._d) {
            a._d = true;
            a = a._w || a;
            try {
                if (a === c) throw cg("Promise can't be resolved itself"); (b = fg(c)) ? bg(function() {
                    var d = {
                        _w: a,
                        _d: false
                    };
                    try {
                        b.call(c, la(Zd, d, 1), la(Gb, d, 1))
                    } catch(e) {
                        Gb.call(d, e)
                    }
                }) : (a._v = c, a._s = 1, Yd(a, false))
            } catch(d) {
                Gb.call({
                    _w: a,
                    _d: false
                },
                d)
            }
        }
    };
    if (!Rc) {
        Sa = function(c) {
            Nc(this, Sa, "Promise", "_h");
            jb(c);
            $d.call(this);
            try {
                c(la(Zd, this, 1), la(Gb, this, 1))
            } catch(a) {
                Gb.call(this, a)
            }
        };
        var $d = function(c) {
            this._c = [];
            this._a = undefined;
            this._s = 0;
            this._d = false;
            this._v = undefined;
            this._h = 0;
            this._n = false
        };
        $d.prototype = Xd(Sa.prototype, {
            then: function(c, a) {
                var b = jc(Qf(this, Sa));
                b.ok = "function" == typeof c ? c: true;
                b.fail = "function" == typeof a && a;
                b.domain = ic ? Fb.domain: undefined;
                this._c.push(b);
                this._a && this._a.push(b);
                this._s && Yd(this, false);
                return b.promise
            },
            "catch": function(c) {
                return this.then(undefined, c)
            }
        });
        var $i = function() {
            var c = new $d;
            this.promise = c;
            this.resolve = la(Zd, c, 1);
            this.reject = la(Gb, c, 1)
        };
        Oc.f = jc = function(c) {
            return c === Sa || c === gg ? new $i(c) : eg(c)
        }
    }
    F(F.G + F.W + F.F * !Rc, {
        Promise: Sa
    });
    lb(Sa, "Promise");
    ag("Promise");
    var gg = X.Promise;
    F(F.S + F.F * !Rc, "Promise", {
        reject: function(c) {
            var a = jc(this),
            b = a.reject;
            b(c);
            return a.promise
        }
    });
    F(F.S + 1 * F.F, "Promise", {
        resolve: function(c) {
            return Wd(this === gg ? Sa: this, c)
        }
    });
    F(F.S + F.F * !(Rc && uf(function(c) {
        Sa.all(c)["catch"](Qc)
    })), "Promise", {
        all: function(c) {
            var a = this,
            b = jc(a),
            d = b.resolve,
            e = b.reject,
            g = Pc(function() {
                var b = [],
                g = 0,
                l = 1;
                rb(c, false,
                function(c) {
                    var h = g++,
                    k = false;
                    b.push(undefined);
                    l++;
                    a.resolve(c).then(function(a) {
                        k || (k = true, b[h] = a, --l || d(b))
                    },
                    e)
                }); --l || d(b)
            });
            g.e && e(g.v);
            return b.promise
        },
        race: function(c) {
            var a = this,
            b = jc(a),
            d = b.reject,
            e = Pc(function() {
                rb(c, false,
                function(c) {
                    a.resolve(c).then(b.resolve, d)
                })
            });
            e.e && d(e.v);
            return b.promise
        }
    });
    F(F.P + F.R, "Promise", {
        "finally": function(c) {
            var a = Qf(this, X.Promise || S.Promise),
            b = "function" == typeof c;
            return this.then(b ?
            function(b) {
                return Wd(a, c()).then(function() {
                    return b
                })
            }: c, b ?
            function(b) {
                return Wd(a, c()).then(function() {
                    throw b;
                })
            }: c)
        }
    });
    F(F.S, "Promise", {
        "try": function(c) {
            var a = Oc.f(this);
            c = Pc(c); (c.e ? a.reject: a.resolve)(c.v);
            return a.promise
        }
    });
    var aj = X.Promise,
    bj = O(function(c) {
        c.exports = {
            "default": aj,
            __esModule: true
        }
    }),
    hg = T(bj),
    fb = function(c, a) {
        if (!pa(c) || c._t !== a) throw TypeError("Incompatible receiver, " + a + " required!");
        return c
    },
    cj = Aa.f,
    ig = Fc.fastKey,
    kc = Ea ? "_s": "size",
    Sc = function(c, a) {
        var b = ig(a);
        if ("F" !== b) return c._i[b];
        for (c = c._f; c; c = c.n) if (c.k == a) return c
    },
    ae = {
        getConstructor: function(c, a, b, d) {
            var e = c(function(c, h) {
                Nc(c, e, a, "_i");
                c._t = a;
                c._i = db(null);
                c._f = undefined;
                c._l = undefined;
                c[kc] = 0;
                undefined != h && rb(h, b, c[d], c)
            });
            Xd(e.prototype, {
                clear: function() {
                    for (var b = fb(this, a), c = b._i, d = b._f; d; d = d.n) d.r = true,
                    d.p && (d.p = d.p.n = undefined),
                    delete c[d.i];
                    b._f = b._l = undefined;
                    b[kc] = 0
                },
                "delete": function(b) {
                    var c = fb(this, a);
                    if (b = Sc(c, b)) {
                        var d = b.n,
                        e = b.p;
                        delete c._i[b.i];
                        b.r = true;
                        e && (e.n = d);
                        d && (d.p = e);
                        c._f == b && (c._f = d);
                        c._l == b && (c._l = e);
                        c[kc]--
                    }
                    return !! b
                },
                forEach: function(b) {
                    fb(this, a);
                    for (var c = la(b, 1 < arguments.length ? arguments[1] : undefined, 3), d; d = d ? d.n: this._f;) for (c(d.v, d.k, this); d && d.r;) d = d.p
                },
                has: function(b) {
                    return !! Sc(fb(this, a), b)
                }
            });
            Ea && cj(e.prototype, "size", {
                get: function() {
                    return fb(this, a)[kc]
                }
            });
            return e
        },
        def: function(c, a, b) {
            var d = Sc(c, a),
            e;
            d ? d.v = b: (c._l = d = {
                i: e = ig(a, true),
                k: a,
                v: b,
                p: a = c._l,
                n: undefined,
                r: false
            },
            c._f || (c._f = d), a && (a.n = d), c[kc]++, "F" !== e && (c._i[e] = d));
            return c
        },
        getEntry: Sc,
        setStrong: function(c, a, b) {
            sd(c, a,
            function(b, c) {
                this._t = fb(b, a);
                this._k = c;
                this._l = undefined
            },
            function() {
                for (var a = this._k,
                b = this._l; b && b.r;) b = b.p;
                return this._t && (this._l = b = b ? b.n: this._t._f) ? "keys" == a ? eb(0, b.k) : "values" == a ? eb(0, b.v) : eb(0, [b.k, b.v]) : (this._t = undefined, eb(1))
            },
            b ? "entries": "values", !b, true);
            ag(a)
        }
    },
    dj = ja("species"),
    ej = function(c, a) {
        if (xd(c)) {
            var b = c.constructor;
            "function" != typeof b || b !== Array && !xd(b.prototype) || (b = undefined);
            pa(b) && (b = b[dj], null === b && (b = undefined))
        }
        return new(undefined === b ? Array: b)(a)
    },
    fj = Aa.f,
    gj = function(c, a) {
        var b = 1 == c,
        d = 2 == c,
        e = 3 == c,
        g = 4 == c,
        h = 6 == c,
        k = 5 == c || h,
        l = a || ej;
        return function(a, p, n) {
            var m = Object(ab(a)),
            q = kd(m);
            p = la(p, n, 3);
            n = wc(q.length);
            var t = 0;
            a = b ? l(a, n) : d ? l(a, 0) : undefined;
            for (var y, v; n > t; t++) if (k || t in q) if (y = q[t], v = p(y, t, m), c) if (b) a[t] = v;
            else if (v) switch (c) {
            case 3:
                return ! 0;
            case 5:
                return y;
            case 6:
                return t;
            case 2:
                a.push(y)
            } else if (g) return ! 1;
            return h ? -1 : e || g ? g: a
        }
    } (0); (function(c, a, b, d, e, g) {
        var h = S[c],
        k = h,
        l = e ? "set": "add",
        m = k && k.prototype,
        p = {};
        Ea && "function" == typeof k && (g || m.forEach && !bb(function() { (new k).entries().next()
        })) ? (k = a(function(a, b) {
            Nc(a, k, c, "_c");
            a._c = new h;
            undefined != b && rb(b, e, a[l], a)
        }), gj("add clear delete forEach get has set keys values entries toJSON".split(" "),
        function(a) {
            var b = "add" == a || "set" == a;
            a in m && (!g || "clear" != a) && Va(k.prototype, a,
            function(c, d) {
                Nc(this, k, a);
                if (!b && g && !pa(c)) return "get" == a ? undefined : false;
                c = this._c[a](0 === c ? 0 : c, d);
                return b ? this: c
            })
        }), g || fj(k.prototype, "size", {
            get: function() {
                return this._c.size
            }
        })) : (k = d.getConstructor(a, c, e, l), Xd(k.prototype, b), Fc.NEED = true);
        lb(k, c);
        p[c] = k;
        F(F.G + F.W + F.F, p);
        g || d.setStrong(k, c, e);
        return k
    })("Map",
    function(c) {
        return function() {
            return c(this, 0 < arguments.length ? arguments[0] : undefined)
        }
    },
    {
        get: function(c) {
            return (c = ae.getEntry(fb(this, "Map"), c)) && c.v
        },
        set: function(c, a) {
            return ae.def(fb(this, "Map"), 0 === c ? 0 : c, a)
        }
    },
    ae, true);
    F(F.P + F.R, "Map", {
        toJSON: function(c) {
            return function() {
                if (Kc(this) != c) throw TypeError(c + "#toJSON isn't generic");
                var a = [];
                rb(this, false, a.push, a, undefined);
                return a
            }
        } ("Map")
    }); (function(c) {
        F(F.S, c, {
            of: function() {
                for (var a = arguments.length,
                b = Array(a); a--;) b[a] = arguments[a];
                return new this(b)
            }
        })
    })("Map"); (function(c) {
        F(F.S, c, {
            from: function(a, b, c) {
                var d;
                jb(this); (d = undefined !== b) && jb(b);
                if (undefined == a) return new this;
                var g = [];
                if (d) {
                    var h = 0;
                    var k = la(b, c, 2);
                    rb(a, false,
                    function(a) {
                        g.push(k(a, h++))
                    })
                } else rb(a, false, g.push, g);
                return new this(g)
            }
        })
    })("Map");
    var hj = X.Map,
    ij = O(function(c) {
        c.exports = {
            "default": hj,
            __esModule: true
        }
    }),
    jg = T(ij),
    IconLayer = function(c) {
        function a(b, c) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b, c));
            b.index = [];
            c = b.canvas = document.createElement("canvas");
            c = b.ctx = c.getContext("2d");
            c.textAlign = "start";
            c.textBaseline = "top";
            b.iconHash = new jg;
            return b
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    padding: [0, 0]
                }
            }
        },
        {
            key: "initialize",
            value: function(a) {
                this.gl = a;
                var b = this.getOptions();
                this.texture = null;
                this.program = new Program(this.gl, {
                    vertexShader: "precision highp float;attribute vec3 a_pos;attribute float a_corner;attribute vec2 a_size;attribute vec2 a_offset;attribute vec2 a_texture_coord;uniform mat4 u_matrix;uniform vec2 u_size;uniform vec2 u_offset;uniform float devicePixelRatio;varying vec2 v_texture_coord;vec3 transformCoord(vec3 coord,vec2 size,float corner){float x=coord.x;float y=coord.y;if(corner==1.0){x-=size[0];y+=size[1];}else if(corner==2.0){x+=size[0];y+=size[1];}else if(corner==3.0){x+=size[0];y-=size[1];}else{x-=size[0];y-=size[1];}return vec3(x,y,coord.z);}void main(){v_texture_coord=a_texture_coord;vec4 position=u_matrix*vec4(a_pos,1.0);vec3 screen=position.xyz/position.w;vec2 halfSize=a_size/MAPV_resolution*devicePixelRatio;vec3 current=transformCoord(screen,halfSize,a_corner);current.xy=current.xy-a_offset*2./MAPV_resolution*devicePixelRatio;gl_Position=vec4(current,1.0);}",
                    fragmentShader: "precision highp float;varying vec2 v_texture_coord;uniform sampler2D u_icon;uniform vec4 uSelectedColor;void main(){vec4 textureColor=texture2D(u_icon,vec2(v_texture_coord.x,1.0-v_texture_coord.y));if(textureColor.a==0.0){discard;}gl_FragColor=textureColor;\n#if defined(PICK)\nif(mapvIsPicked()){gl_FragColor=vec4(uSelectedColor.rgb,gl_FragColor.a);}\n#endif\n}",
                    defines: b.enablePicked ? ["PICK"] : []
                },
                this);
                this.vertexBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.uvBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.indexBuffer = new Buffer({
                    gl: a,
                    target: "ELEMENT_ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                b = [{
                    name: "a_pos",
                    buffer: this.vertexBuffer,
                    size: 3,
                    stride: 32,
                    type: "FLOAT",
                    offset: 0
                },
                {
                    name: "a_corner",
                    buffer: this.vertexBuffer,
                    size: 1,
                    stride: 32,
                    type: "FLOAT",
                    offset: 12
                },
                {
                    name: "a_size",
                    buffer: this.vertexBuffer,
                    size: 2,
                    stride: 32,
                    type: "FLOAT",
                    offset: 16
                },
                {
                    name: "a_offset",
                    buffer: this.vertexBuffer,
                    size: 2,
                    stride: 32,
                    type: "FLOAT",
                    offset: 24
                },
                {
                    name: "a_texture_coord",
                    buffer: this.uvBuffer,
                    size: 2,
                    stride: 8,
                    type: "FLOAT",
                    offset: 0
                }];
                b = b.concat(this.getCommonAttributes());
                this.vertexArray = new VertexArray({
                    gl: a,
                    program: this.program,
                    attributes: b
                })
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                this.gl && this.processCache(a, c)
            }
        },
        {
            key: "processCache",
            value: function(a, c) {
                var b = this;
                this.cachedData = [];
                for (var d = a.icon,
                h = a.width,
                k = a.height,
                l = a.offset,
                m = 0; m < c.length; m++) {
                    var p = this.normizedPoint(c[m].geometry.coordinates),
                    n = c[m].icon || d;
                    "properties" in c[m] && "icon" in c[m].properties && (n = c[m].properties.icon);
                    var r = c[m].width || h;
                    "properties" in c[m] && "width" in c[m].properties && (r = c[m].properties.width);
                    var q = c[m].height || k;
                    "properties" in c[m] && "height" in c[m].properties && (q = c[m].properties.height);
                    var t = c[m].offset || l;
                    "properties" in c[m] && "offset" in c[m].properties && (t = c[m].properties.offset);
                    p && n && (this.cachedData.push({
                        point: p,
                        icon: n,
                        width: r,
                        height: q,
                        offset: t
                    }), this.iconHash.get(n) || this.iconHash.set(n, n))
                }
                c = Vh(this.iconHash.entries()).filter(function(a) {
                    return "string" === typeof a[1]
                }).map(function(a) {
                    var c = Ia(a, 2)[0];
                    return new hg(function(a, d) {
                        b.url2canvas(c,
                        function(d) {
                            b.iconHash.set(c, d);
                            a()
                        })
                    })
                });
                hg.all(c).then(function(c) {
                    b.buildSprite(a);
                    b.webglLayer.render()
                })
            }
        },
        {
            key: "buildSprite",
            value: function(a) {
                var b = a.padding,
                c = this.canvas,
                g = this.ctx,
                h = [],
                k = new jg,
                l = true,
                m = false,
                p = undefined;
                try {
                    for (var n = id(this.iconHash), r; ! (l = (r = n.next()).done); l = true) {
                        var q = Ia(r.value, 2),
                        t = q[1];
                        if ("string" !== typeof t) {
                            var w = t.width,
                            v = t.height;
                            h.push({
                                w: w + b[0],
                                h: v + b[0],
                                width: w,
                                height: v,
                                key: q[0],
                                icon: t
                            })
                        }
                    }
                } catch(x) {
                    m = true,
                    p = x
                } finally {
                    try { ! l && n.
                        return && n.
                        return ()
                    } finally {
                        if (m) throw p;
                    }
                }
                m = Je(h);
                for (l = 0; l < h.length; l++) p = h[l],
                k.get(p.key) || k.set(p.key, p);
                l = Kb(m.w);
                m = Kb(m.h);
                c.width = l;
                c.height = m;
                g.save();
                for (c = 0; c < h.length; c++) p = h[c],
                g.drawImage(p.icon, p.x + b[0], p.y + b[1], p.width, p.height);
                g.restore();
                this.loadTexture();
                this.buildVertex(a, k, l, m)
            }
        },
        {
            key: "buildVertex",
            value: function(a, c, e, g) {
                a = a.enablePicked;
                for (var b = [], d = [], l = [], m = [], p = 0; p < this.cachedData.length; p++) {
                    var n = this.cachedData[p],
                    r = n.point,
                    q = n.width,
                    t = n.height,
                    w = n.offset;
                    if (n = c.get(n.icon)) {
                        q = q || n.icon.width;
                        t = t || n.icon.height;
                        w = w || [0, -t / 2];
                        var v = Ia(r, 3);
                        r = v[0];
                        var x = v[1];
                        v = v[2];
                        for (var u = 0; 4 > u; u++) b.push(r, x, v),
                        b.push(u),
                        b.push(q, t),
                        b.push.apply(b, Y(w));
                        q = n.x / e;
                        t = (n.x + n.w) / e;
                        w = (n.y + n.h) / g;
                        n = n.y / g;
                        d.push(q, w, q, n, t, n, t, w);
                        n = 4 * p;
                        l.push(n, n + 2, n + 1, n, n + 3, n + 2);
                        a && (n = this.indexToRgb(p), m.push(n[0] / 255, n[1] / 255, n[2] / 255), m.push(n[0] / 255, n[1] / 255, n[2] / 255), m.push(n[0] / 255, n[1] / 255, n[2] / 255), m.push(n[0] / 255, n[1] / 255, n[2] / 255))
                    }
                }
                this.index = l;
                this.vertexBuffer.updateData(new Float32Array(b));
                this.uvBuffer.updateData(new Float32Array(d));
                this.indexBuffer.updateData(new Uint32Array(l));
                a && this.pickBuffer.updateData(new Float32Array(m))
            }
        },
        {
            key: "render",
            value: function(a) {
                if (this.cachedData && this.cachedData.length && this.iconHash && this.texture) {
                    var b = a.gl,
                    c = a.matrix,
                    g = this.program;
                    g.use(b);
                    b.enable(b.BLEND);
                    b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
                    g.setUniforms(Object.assign(this.getCommonUniforms(a), {
                        u_icon: this.texture,
                        u_matrix: c,
                        devicePixelRatio: window.devicePixelRatio
                    }));
                    0 < this.index.length && (this.indexBuffer.bind(), this.vertexArray.bind(), b.drawElements(b.TRIANGLES, this.index.length, b.UNSIGNED_INT, 0));
                    b.useProgram(null)
                }
            }
        },
        {
            key: "url2canvas",
            value: function(a, c) {
                if ("object" === ("undefined" === typeof a ? "undefined": sb(a))) c(a);
                else {
                    var b = new Image;
                    b.crossOrigin = "anonymous";
                    b.onload = function() {
                        var a = b.width,
                        d = b.height,
                        e = document.createElement("canvas");
                        e.width = a;
                        e.height = d;
                        e.getContext("2d").drawImage(b, 0, 0, a, d);
                        c(e)
                    };
                    b.onerror = function() {
                        var a = document.createElement("canvas");
                        a.width = 20;
                        a.height = 40;
                        var b = a.getContext("2d");
                        b.fillStyle = "red";
                        b.beginPath();
                        b.lineTo(0, 0);
                        b.lineTo(20, 0);
                        b.lineTo(10, 40);
                        b.closePath();
                        b.fill();
                        c(a)
                    };
                    b.src = a
                }
            }
        },
        {
            key: "loadTexture",
            value: function() {
                var a = this;
                this.canvas ? Ma(this.gl, this.canvas,
                function(b) {
                    a.texture = b
                }) : this.texture = null
            }
        }]);
        return a
    } (Layer),
    ClusterLayer = function(c) {
        function a(b) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b));
            b.pointLayer = new PointLayer(b.options);
            b.textLayer = new Od(b.options.textOptions);
            var c = Object.assign({},
            b.options, b.options.iconOptions);
            b.iconLayer = new IconLayer(c);
            b.children = [b.pointLayer, b.textLayer, b.iconLayer];
            return b
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    minSize: 25,
                    maxSize: 40,
                    clusterRadius: 200,
                    showText: true,
                    maxZoom: 19,
                    minZoom: 4,
                    gradient: {
                        0 : "rgb(50, 50, 256)",
                        "0.1": "rgb(50, 250, 56)",
                        "0.5": "rgb(250, 250, 56)",
                        1 : "rgb(250, 50, 56)"
                    },
                    textOptions: {
                        fontSize: 12,
                        color: "white"
                    },
                    iconOptions: {}
                }
            }
        },
        {
            key: "onOptionsChanged",
            value: function(a) {
                this.textLayer.setOptions(a.textOptions)
            }
        },
        {
            key: "setOptions",
            value: function() {
                var a = 0 < arguments.length && undefined !== arguments[0] ? arguments[0] : {},
                c = this.options.textOptions;
                a.textOptions && Object.assign(c, a.textOptions);
                var e = a.minZoom,
                g = a.maxZoom,
                h = a.clusterRadius;
                e = g && g !== this.options.maxZoom || e && e !== this.options.minZoom || h && h !== this.options.clusterRadius;
                Object.assign(this.options, a, {
                    textOptions: c
                });
                if (e) this.onChanged(this.options, this.data);
                else this.refreshCluster();
                this.onOptionsChanged(this.getOptions())
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                if (c && c.length) {
                    var b = this.map.map;
                    c.forEach(function(a) {
                        var c = Ia(a.geometry.coordinates, 2),
                        d = c[0];
                        c = c[1]; - 180 <= d && 180 >= d && -90 <= c && 90 >= c || (d = b.mercatorToLnglat(d, c), a.geometry.coordinates[0] = d[0], a.geometry.coordinates[1] = d[1])
                    });
                    this.supercluster = new Nf({
                        maxZoom: a.maxZoom,
                        minZoom: a.minZoom,
                        radius: a.clusterRadius,
                        extent: 256
                    });
                    this.supercluster.load(c);
                    this.supercluster.trees.forEach(function(a) {
                        var b = 0,
                        c = Infinity;
                        a.points.forEach(function(a) {
                            b = Math.max(a.numPoints || 0, b);
                            c = Math.min(a.numPoints || Infinity, c)
                        });
                        a.max = b;
                        a.min = c
                    });
                    this.refreshCluster()
                }
            }
        },
        {
            key: "refreshCluster",
            value: function() {
                var a = 0 < arguments.length && undefined !== arguments[0] ? arguments[0] : this.options;
                if (this.supercluster) {
                    var c = this.getClusterData(a);
                    if (c && c.length) {
                        var e = [],
                        g = [];
                        c.forEach(function(a) {
                            a.properties.text ? e.push(a) : g.push(a)
                        });
                        this.pointLayer.setData(e);
                        this.iconLayer.setData(g);
                        this.textLayer.setData(a.showText ? c: []);
                        a.enablePicked && a.autoSelect && this.pick( - 1, -1)
                    }
                }
            }
        },
        {
            key: "getClusterData",
            value: function() {
                var a = 0 < arguments.length && undefined !== arguments[0] ? arguments[0] : this.options,
                c = this.map.map,
                e = c.getBounds(),
                g = e.ne;
                e = e.sw;
                this.ne = g;
                this.sw = e;
                var h = g,
                k = h.lng;
                h = h.lat; - 180 <= k && 180 >= k && -90 <= h && 90 >= h ? g = [e.lng, e.lat, g.lng, g.lat] : (g = c.mercatorToLnglat(this.ne.lng, this.ne.lat), e = c.mercatorToLnglat(this.sw.lng, this.sw.lat), g = e.concat(g));
                c = Math.floor(c.getZoom());
                g = this.supercluster.getClusters(g, c);
                this.zoom !== c && 0 < g.length && (this.zoom = c, k = this.supercluster.trees, e = k[c] && k[c].max || this.max, c = k[c] && k[c].min || this.min, e !== c && (this.max = e, this.min = c));
                return this.processData(g, a)
            }
        },
        {
            key: "processData",
            value: function(a, c) {
                var b = c.defaultColor,
                d = c.defaultSize,
                h = c.gradient,
                k = c.minSize,
                l = c.textOptions,
                m = new oa({
                    max: this.max,
                    min: ~~this.min || 1,
                    minSize: k || 8,
                    maxSize: c.maxSize || 30,
                    gradient: h
                });
                b = b || h[0] || "black";
                d = d || .5 * k || 5;
                var p = l && l.format;
                p = "function" === typeof p ? p: null;
                return a.map(function(a) {
                    var c = d,
                    e = b,
                    g = "";
                    a.properties && a.properties.point_count && (g = a.properties.point_count, c = m.getSize(g) || c, e = m.getColor(g), g = p ? p(g) : g);
                    c = Object.assign({},
                    a.properties, {
                        text: g,
                        size: c,
                        color: e
                    });
                    return Object.assign({},
                    a, {
                        properties: c,
                        children: a.id
                    })
                })
            }
        },
        {
            key: "pick",
            value: function(a, c) {
                var b = this.pointLayer.pick(a, c);
                0 > b.dataIndex && (b = this.iconLayer.pick(a, c)); (a = b.dataItem) && "number" === typeof a.children && (a.children = this.getClusterPoints(a.children));
                return b
            }
        },
        {
            key: "getClusterPoints",
            value: function(a) {
                var b = this;
                return a ? this.supercluster.getChildren(a).map(function(a) {
                    return "Feature" === a.type ? b.getClusterPoints(a.id) : a
                }).flat() : []
            }
        },
        {
            key: "shouldUpdate",
            value: function() {
                if (!this.data || !this.supercluster) return ! 1;
                var a = this.map.map;
                if (this.zoom !== Math.floor(a.getZoom())) return ! 0;
                var c = a.getBounds();
                a = c.ne;
                c = c.sw;
                if (this.ne.lng !== a.lng || this.ne.lat !== a.lat || this.sw.lng !== c.lng || this.sw.lat !== c.lat) return ! 0
            }
        },
        {
            key: "render",
            value: function(b) {
                this.shouldUpdate() ? this.refreshCluster() : Ya(a.prototype.__proto__ || N(a.prototype), "render", this).call(this, b)
            }
        }]);
        return a
    } (pb),
    HeatPointLayer = function(c) {
        function a(b, c) {
            I(this, a);
            return Q(this, (a.__proto__ || N(a)).call(this, b, c))
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return Object.assign(Ya(a.prototype.__proto__ || N(a.prototype), "getDefaultOptions", this).call(this), {
                    style: "grid",
                    gridSize: 500,
                    gradient: {
                        0 : "rgb(50, 50, 256)",
                        "0.1": "rgb(50, 250, 56)",
                        "0.5": "rgb(250, 250, 56)",
                        1 : "rgb(250, 50, 56)"
                    }
                })
            }
        },
        {
            key: "onChanged",
            value: function(b, c) {
                this.gl && (c = this.processData(c, b), Ya(a.prototype.__proto__ || N(a.prototype), "onChanged", this).call(this, b, c))
            }
        },
        {
            key: "generateGrid",
            value: function(a, c) {
                var b = c.gridSize,
                d = [],
                h = {};
                c = a.length;
                for (var k = this.getPointOffset(), l = 0; l < c; l++) {
                    var m = this.normizedPoint(a[l].geometry.coordinates);
                    m = ~~ ((m[0] + k[0]) / b) + "_" + ~~ ((m[1] + k[1]) / b);
                    undefined === h[m] && (h[m] = 0);
                    var p = ~~a[l].count || 1;
                    "properties" in a[l] && "count" in a[l].properties && (p = ~~a[l].properties.count);
                    h[m] += p
                }
                Ba(h).forEach(function(a) {
                    var c = a.split("_");
                    d.push([c[0] * b + b / 2, c[1] * b + b / 2, h[a]])
                });
                return d
            }
        },
        {
            key: "processData",
            value: function(a, c) {
                var b = [];
                if ("normal" === c.style) for (var d = this.getPointOffset(), h = 0; h < a.length; h++) {
                    var k = this.normizedPoint(a[h].geometry.coordinates),
                    l = k[0] + d[0];
                    k = k[1] + d[1];
                    var m = ~~a[h].count || 1;
                    "properties" in a[h] && "count" in a[h].properties && (m = ~~a[h].properties.count);
                    b.push([l, k, m])
                } else b = this.generateGrid(a, c);
                d = a = 0;
                if (undefined !== c.max && undefined !== c.min) a = c.max,
                d = c.min;
                else {
                    b[0] && (a = b[0][2], d = b[0][2]);
                    h = b.length;
                    for (l = 0; l < h; l++) k = b[l],
                    a = Math.max(k[2], a),
                    d = Math.min(k[2], d);
                    a /= 2
                }
                c = new oa({
                    max: ~~a,
                    min: d,
                    gradient: c.gradient
                });
                a = [];
                for (d = 0; d < b.length; d++) h = b[d],
                h[0] = h[0],
                h[1] = h[1],
                l = c.getImageData(h[2]),
                a.push({
                    geometry: {
                        type: "Point",
                        coordinates: [h[0], h[1]]
                    },
                    color: [l[0] / 255, l[1] / 255, l[2] / 255, l[3] / 255]
                });
                return a
            }
        }]);
        return a
    } (PointLayer),
    ShapeLineLayer = function(c) {
        function a(b, c) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b, c));
            b.bufferData = [];
            return b
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    color: [1, .05, .05, 1]
                }
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                var b = this;
                if (a = this.gl) {
                    this.buffer = a.createBuffer();
                    a.bindBuffer(a.ARRAY_BUFFER, this.buffer);
                    for (var d = [], h = function(a) {
                        var e = 5 * a;
                        for (a = 0; a < c.length; a++) c[a].geometry.coordinates.forEach(function(a) {
                            for (var c = 0; c < a.length - 1; c++) {
                                var g = b.normizedPoint(a[c]);
                                d.push(g[0]);
                                d.push(g[1]);
                                d.push(Number(e));
                                g = b.normizedPoint(a[c + 1]);
                                d.push(g[0]);
                                d.push(g[1]);
                                d.push(Number(e))
                            }
                        })
                    },
                    k = 0; 20 > k; k++) h(k);
                    a.bufferData(a.ARRAY_BUFFER, new Float32Array(d), a.STATIC_DRAW);
                    this.bufferData = d;
                    a.bindBuffer(a.ARRAY_BUFFER, null)
                }
            }
        },
        {
            key: "initialize",
            value: function(a) {
                this.gl = a;
                this.program = new Program(a, {
                    vertexShader: "uniform mat4 uMatrix;attribute vec3 aPos;void main(){gl_PointSize=10.0;gl_Position=uMatrix*vec4(aPos,1.0);}",
                    fragmentShader: "precision mediump float;uniform vec4 uFragColor;void main(){gl_FragColor=uFragColor;}"
                });
                this.buffer = a.createBuffer();
                a.bindBuffer(a.ARRAY_BUFFER, this.buffer)
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl;
                a = a.matrix;
                var c = this.program;
                b.useProgram(c.program);
                var g = this.normizedColor(this.options.color);
                b.uniform4f(c.uniforms.uFragColor, g[0], g[1], g[2], g[3]);
                b.uniformMatrix4fv(c.uniforms.uMatrix, false, a);
                b.bindBuffer(b.ARRAY_BUFFER, this.buffer);
                b.enableVertexAttribArray(c.attributes.aPos);
                b.vertexAttribPointer(c.attributes.aPos, 3, b.FLOAT, false, 0, 0);
                b.enable(b.BLEND);
                b.blendEquation(b.FUNC_ADD);
                b.blendFunc(b.ONE, b.ONE);
                b.drawArrays(b.LINES, 0, this.bufferData.length / 3);
                b.bindBuffer(b.ARRAY_BUFFER, null)
            }
        }]);
        return a
    } (Layer),
    lg = {
        circle: 1,
        square: 2
    },
    PointTripLayer = function(c) {
        function a(b, c) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b, c));
            b.bufferData = [];
            b.startTime = b.options.startTime || 0;
            b.endTime = b.options.endTime;
            b.time = b.startTime;
            b.autoUpdate = true;
            return b
        }
        R(a, c);
        M(a, [{
            key: "initialize",
            value: function(a) {
                this.gl = a;
                this.program = new Program(this.gl, {
                    vertexShader: "attribute vec4 aPos;attribute vec4 aColor;attribute float aSize;uniform mat4 u_matrix;varying vec4 vColor;uniform float currentTime;uniform float trailLength;varying float vTime;void main(void){if(aColor.w>=0.0&&aColor.w<=1.0){vColor=aColor;}else{vColor=vec4(aColor.xyz,1.0);}gl_Position=u_matrix*vec4(aPos.xyz,1.0);gl_PointSize=aSize;vTime=1.0-((currentTime-aPos.w)/trailLength);}",
                    fragmentShader: "precision highp float;varying vec4 vColor;uniform int uShape;varying float vTime;void main(void){if(vTime>1.0||vTime<0.0){discard;}if(uShape==1){float d=distance(gl_PointCoord,vec2(0.5,0.5));if(d<0.5){gl_FragColor=vColor;}else{discard;}}else{gl_FragColor=vec4(vColor.rgb,vColor.a*vTime);}}"
                });
                this.f32BufferData = new Float32Array;
                this.buffer = a.createBuffer();
                a.bindBuffer(a.ARRAY_BUFFER, this.buffer)
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                var b = this.gl;
                if (b) {
                    this.buffer = b.createBuffer();
                    b.bindBuffer(b.ARRAY_BUFFER, this.buffer);
                    for (var d = [], h = a.color || [.1, .1, .9, 1], k = a.size || 5, l = 0; l < c.length; l++) {
                        var m = c[l].geometry.coordinates,
                        p = c[l].color || h;
                        "[object Function]" === Object.prototype.toString.call(p) && (p = p(c[l]));
                        "properties" in c[l] && "color" in c[l].properties && (p = c[l].properties.color);
                        p = this.normizedColor(p);
                        var n = this.normizedPoint(m),
                        r = k;
                        r = "[object Function]" === Object.prototype.toString.call(r) ? r(c[l]) : Number(r);
                        var q = c[l].time || l;
                        "properties" in c[l] && "time" in c[l].properties && (q = c[l].properties.time);
                        d.push(n[0], n[1], Number(m[2] || 0), q);
                        d.push(p[0], p[1], p[2], p[3]);
                        d.push(r * window.devicePixelRatio)
                    }
                    undefined === a.endTime && (this.endTime = c.length);
                    this.bufferData = d;
                    this.f32BufferData = new Float32Array(d);
                    b.bufferData(b.ARRAY_BUFFER, this.f32BufferData, b.STATIC_DRAW)
                }
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl,
                c = a.matrix;
                0 >= this.bufferData.length || (a = this.program, b.useProgram(a.program), b.uniformMatrix4fv(a.uniforms.u_matrix, false, c), b.bindBuffer(b.ARRAY_BUFFER, this.buffer), c = this.f32BufferData.BYTES_PER_ELEMENT, b.enableVertexAttribArray(a.attributes.aPos), b.vertexAttribPointer(a.attributes.aPos, 4, b.FLOAT, false, 9 * c, 0), b.enableVertexAttribArray(a.attributes.aColor), b.vertexAttribPointer(a.attributes.aColor, 4, b.FLOAT, false, 9 * c, 4 * c), b.enableVertexAttribArray(a.attributes.aSize), b.vertexAttribPointer(a.attributes.aSize, 1, b.FLOAT, false, 9 * c, 8 * c), b.uniform1f(a.uniforms.currentTime, this.time), b.uniform1f(a.uniforms.trailLength, this.options.trailLength || 3), c = 1, this.options.shape && lg[this.options.shape] && (c = lg[this.options.shape]), b.uniform1i(a.uniforms.uShape, c), a = this.options.blend, b.enable(b.BLEND), b.blendEquation(b.FUNC_ADD), a && "lighter" === a ? b.blendFunc(b.SRC_ALPHA, b.ONE) : b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA), b.drawArrays(b.POINTS, 0, this.bufferData.length / 9), b.bindBuffer(b.ARRAY_BUFFER, null), b.disable(b.BLEND), b.useProgram(null), this.time += this.options.step || .1, this.time > this.endTime && (this.time = this.startTime))
            }
        }]);
        return a
    } (Layer),
    LineTripLayer = function(c) {
        function a(b, c) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b, c));
            b.bufferData = [];
            b.startTime = b.options.startTime || 0;
            b.endTime = b.options.endTime;
            b.time = b.startTime;
            b.autoUpdate = true;
            return b
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    color: [1, .05, .05, 1],
                    trailLength: 3,
                    step: .1
                }
            }
        },
        {
            key: "initialize",
            value: function(a) {
                this.gl = a;
                this.program = new Program(this.gl, {
                    vertexShader: "precision highp float;attribute vec4 aPos;attribute vec4 aColor;uniform mat4 u_matrix;uniform float currentTime;uniform float trailLength;varying float vTime;varying vec4 vColor;void main(){gl_Position=u_matrix*vec4(aPos.xyz,1.0);vColor=aColor;vTime=1.0-((currentTime-aPos.w)/trailLength);}",
                    fragmentShader: "precision highp float;uniform vec3 uFragColor;varying vec4 vColor;varying float vTime;void main(){if(vTime>1.0||vTime<0.0){discard;}gl_FragColor=vec4(vColor.rgb,1.0*vTime);}"
                },
                this);
                this.buffer = a.createBuffer();
                a.bindBuffer(a.ARRAY_BUFFER, this.buffer)
            }
        },
        {
            key: "setTime",
            value: function(a) {
                this.time = a
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                var b = this.gl;
                if (b) {
                    this.buffer = b.createBuffer();
                    b.bindBuffer(b.ARRAY_BUFFER, this.buffer);
                    for (var d = [], h = 0, k = this.options.color, l = 0; l < c.length; l++) {
                        var m = c[l].geometry.coordinates;
                        c[l].color && (k = c[l].color);
                        "properties" in c[l] && "color" in c[l].properties && (k = c[l].properties.color);
                        "[object Function]" === Object.prototype.toString.call(k) && (k = k(c[l]));
                        k = this.normizedColor(k);
                        m.length > h && (h = m.length);
                        for (var p = 0; p < m.length - 1; p++) {
                            var n = this.normizedPoint(m[p]);
                            d.push(n[0]);
                            d.push(n[1]);
                            d.push(n[2]);
                            undefined === m[p][3] ? d.push(p) : d.push(Number(m[p][3]));
                            d.push(k[0]);
                            d.push(k[1]);
                            d.push(k[2]);
                            d.push(k[3]);
                            n = this.normizedPoint(m[p + 1]);
                            d.push(n[0]);
                            d.push(n[1]);
                            d.push(n[2]);
                            undefined === m[p + 1][3] ? d.push(p + 1) : d.push(Number(m[p + 1][3]));
                            d.push(k[0]);
                            d.push(k[1]);
                            d.push(k[2]);
                            d.push(k[3])
                        }
                    }
                    undefined === a.endTime && (this.endTime = h);
                    this.bufferData = d;
                    this.f32BufferData = new Float32Array(d);
                    b.bufferData(b.ARRAY_BUFFER, this.f32BufferData, b.STATIC_DRAW)
                }
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl,
                c = a.matrix;
                a = this.program;
                a.use(b);
                b.uniformMatrix4fv(a.uniforms.u_matrix, false, c);
                b.bindBuffer(b.ARRAY_BUFFER, this.buffer);
                c = this.f32BufferData.BYTES_PER_ELEMENT;
                b.enableVertexAttribArray(a.attributes.aPos);
                b.vertexAttribPointer(a.attributes.aPos, 4, b.FLOAT, false, 8 * c, 0);
                b.enableVertexAttribArray(a.attributes.aColor);
                b.vertexAttribPointer(a.attributes.aColor, 4, b.FLOAT, false, 8 * c, 4 * c);
                c = this.normizedColor(this.options.color);
                b.uniform3f(a.uniforms.uFragColor, c[0], c[1], c[2]);
                b.uniform1f(a.uniforms.currentTime, this.time);
                b.uniform1f(a.uniforms.trailLength, this.options.trailLength);
                b.enable(b.BLEND);
                b.polygonOffset(2, 1);
                "lighter" === this.options.blend ? b.blendFunc(b.ONE, b.ONE) : b.blendFunc(b.SRC_ALPHA, b.ONE);
                b.blendEquation(b.FUNC_ADD);
                b.drawArrays(b.LINES, 0, this.bufferData.length / 8);
                b.bindBuffer(b.ARRAY_BUFFER, null);
                this.time += this.options.step;
                this.time > this.endTime && (this.time = this.startTime);
                b.useProgram(null)
            }
        }]);
        return a
    } (Layer),
    LineFlowLayer = function(c) {
        function a(b, c) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b, c));
            b.initData();
            b.date = new Date;
            b.autoUpdate = true;
            return b
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    color: "rgba(25, 25, 250, 1)",
                    blend: "normal",
                    width: 2,
                    antialias: false,
                    interval: .1,
                    duration: 2,
                    trailLength: .5,
                    minZoom: 4,
                    maxZoom: 21
                }
            }
        },
        {
            key: "initData",
            value: function() {
                this.dataMgr = {
                    position: [],
                    prev: [],
                    next: [],
                    direction: [],
                    color: [],
                    index: [],
                    counter: []
                }
            }
        },
        {
            key: "initialize",
            value: function(a) {
                this.gl = a;
                var b = this.getOptions();
                this.program = new Program(this.gl, {
                    vertexShader: "uniform mat4 u_matrix;uniform float thickness;uniform vec4 uSelectedColor;attribute vec3 position;attribute vec3 next;attribute vec3 previous;attribute float direction;attribute vec4 aColor;attribute float aCounter;attribute vec2 uv;varying vec4 vColor;varying vec2 vNormal;varying float vCounter;vec2 project(vec4 coord){vec3 screen=coord.xyz/coord.w;vec2 clip=(screen.xy+1.0)/2.0;return clip*MAPV_resolution;}vec4 unproject(vec2 projected,float z,float w){vec2 clip=projected/MAPV_resolution;vec2 screen=clip*2.0-1.0;return vec4(screen*w,z,w);}void main(){vColor=aColor;vCounter=aCounter;\n#if defined(PICK)\nif(mapvIsPicked()){vColor=uSelectedColor;}\n#endif\nvec4 previousProjected=u_matrix*vec4(previous,1.0);vec4 currentProjected=u_matrix*vec4(position,1.0);vec4 nextProjected=u_matrix*vec4(next,1.0);vec2 currentScreen=project(currentProjected);vec2 previousScreen=project(previousProjected);vec2 nextScreen=project(nextProjected);float len=thickness;float orientation=direction;vec2 dir=vec2(0.0);if(currentScreen==previousScreen){dir=normalize(nextScreen-currentScreen);}else if(currentScreen==nextScreen){dir=normalize(currentScreen-previousScreen);}else{vec2 dirA=normalize((currentScreen-previousScreen));vec2 dirB=normalize((nextScreen-currentScreen));vec2 tangent=normalize(dirA+dirB);vec2 perp=vec2(-dirA.y,dirA.x);vec2 miter=vec2(-tangent.y,tangent.x);dir=tangent;float angle=40.0;if(dot(dirA,dirB)>cos(radians(angle))){len=thickness/dot(miter,perp);}}vec2 normal=vec2(-dir.y,dir.x);vNormal=normal*orientation;normal*=len/2.0;vec2 pos=currentScreen+normal*orientation;vec4 finalPos=unproject(pos,currentProjected.z,currentProjected.w);gl_Position=finalPos;}",
                    fragmentShader: "precision highp float;uniform bool uAntialias;uniform bool uAnimate;uniform float uTime;uniform float duration;uniform float interval;uniform float trailLength;varying vec4 vColor;varying vec2 vNormal;varying float vCounter;void main(){vec4 color=vColor;if(uAntialias){float blur=1.0;blur=1.0-smoothstep(0.98,1.0,length(vNormal));color.a*=blur;}if(uAnimate){float alpha=1.0-fract(mod(1.0-vCounter,interval)*(1.0/interval)+uTime/duration);alpha=(alpha+trailLength-1.0)/trailLength;color.a*=alpha;}gl_FragColor=color;}",
                    defines: b.enablePicked ? ["PICK"] : []
                },
                this);
                this.prevBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.currentBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.nextBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.directionBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.colorBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.counterBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.indexBuffer = new Buffer({
                    gl: a,
                    target: "ELEMENT_ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                b = [{
                    stride: 12,
                    name: "previous",
                    buffer: this.prevBuffer,
                    size: 3,
                    type: "FLOAT",
                    offset: 0
                },
                {
                    stride: 12,
                    name: "position",
                    buffer: this.currentBuffer,
                    size: 3,
                    type: "FLOAT",
                    offset: 0
                },
                {
                    stride: 12,
                    name: "next",
                    buffer: this.nextBuffer,
                    size: 3,
                    type: "FLOAT",
                    offset: 0
                },
                {
                    stride: 4,
                    name: "direction",
                    buffer: this.directionBuffer,
                    size: 1,
                    type: "FLOAT",
                    offset: 0
                },
                {
                    stride: 16,
                    name: "aColor",
                    buffer: this.colorBuffer,
                    size: 4,
                    type: "FLOAT",
                    offset: 0
                },
                {
                    stride: 4,
                    name: "aCounter",
                    buffer: this.counterBuffer,
                    size: 1,
                    type: "FLOAT",
                    offset: 0
                }];
                b = b.concat(this.getCommonAttributes());
                this.vertexArray = new VertexArray({
                    gl: a,
                    program: this.program,
                    attributes: b
                })
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                var b = this;
                if (this.gl) {
                    this.initData();
                    for (var d = 1,
                    h = [], k = 0; k < c.length; k++) {
                        var l = [],
                        m = c[k].geometry.coordinates;
                        m && 0 < m.length && (l = "Polygon" === c[k].geometry.type ? m[0].map(function(a) {
                            return b.normizedPoint(a)
                        }) : m.map(function(a) {
                            return b.normizedPoint(a)
                        }));
                        l = Fe(l);
                        m = l.total;
                        h[k] = l.arr;
                        d = Math.max(m, d)
                    }
                    k = [];
                    l = a.color;
                    for (m = 0; m < c.length; m++) {
                        var p = [],
                        n = c[m].geometry.coordinates;
                        n && 0 < n.length && (p = "Polygon" === c[m].geometry.type ? n[0].map(function(a) {
                            return b.normizedPoint(a)
                        }) : n.map(function(a) {
                            return b.normizedPoint(a)
                        }));
                        n = c[m].color || l;
                        "properties" in c[m] && "color" in c[m].properties && (n = c[m].properties.color);
                        "[object Function]" === Object.prototype.toString.call(n) && (n = n(c[m]));
                        n = this.normizedColor(n);
                        for (var r = this.addMultipleCoords(p), q = 0; q < r.length; q++) this.processData(this.dataMgr, r[q], h[m], d, n);
                        if (a.enablePicked) for (n = this.indexToRgb(m), r = 0; r < p.length; r++) k.push(n[0] / 255, n[1] / 255, n[2] / 255),
                        k.push(n[0] / 255, n[1] / 255, n[2] / 255),
                        a.repeat && (k.push(n[0] / 255, n[1] / 255, n[2] / 255), k.push(n[0] / 255, n[1] / 255, n[2] / 255), k.push(n[0] / 255, n[1] / 255, n[2] / 255), k.push(n[0] / 255, n[1] / 255, n[2] / 255))
                    }
                    this.counterBuffer.updateData(new Float32Array(this.dataMgr.counter));
                    this.currentBuffer.updateData(new Float32Array(this.dataMgr.position));
                    this.prevBuffer.updateData(new Float32Array(this.dataMgr.prev));
                    this.nextBuffer.updateData(new Float32Array(this.dataMgr.next));
                    this.directionBuffer.updateData(new Float32Array(this.dataMgr.direction));
                    this.colorBuffer.updateData(new Float32Array(this.dataMgr.color));
                    this.indexBuffer.updateData(new Uint32Array(this.dataMgr.index));
                    a.enablePicked && this.pickBuffer.updateData(new Float32Array(k))
                }
            }
        },
        {
            key: "processData",
            value: function(a, c, e, g, h) {
                var b, d, m, p, n, r, q, t = c.length,
                w = a.position.length / 6;
                e = Da(e.map(function(a) {
                    return a / g
                }));
                var v = Da(c.map(function(a) {
                    return - 1
                }), true),
                x = Da(c),
                u = Da(c.map(sc( - 1))),
                z = Da(c.map(sc(1)));
                c = Da(c.map(function(a) {
                    return h
                }));
                t = Ee(t, w); (b = a.counter).push.apply(b, Y(e)); (d = a.position).push.apply(d, Y(Pa(x))); (m = a.prev).push.apply(m, Y(Pa(u))); (p = a.next).push.apply(p, Y(Pa(z))); (n = a.direction).push.apply(n, Y(v)); (r = a.color).push.apply(r, Y(Pa(c))); (q = a.index).push.apply(q, Y(t))
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl,
                c = a.matrix,
                g = this.dataMgr;
                if (g && !(0 >= g.index.length)) {
                    var h = this.getOptions(),
                    k = this.program;
                    k.use(b);
                    if (this.map) {
                        var l = this.map.getZoom();
                        l = l >= h.minZoom && l <= h.maxZoom && this.autoUpdate ? true : false
                    } else l = true;
                    k.setUniforms(Object.assign(this.getCommonUniforms(a), {
                        u_matrix: c,
                        thickness: h.width,
                        uAntialias: h.antialias,
                        uTime: (new Date - this.date) / 1E3,
                        uAnimate: l,
                        duration: h.duration,
                        interval: h.interval,
                        trailLength: h.trailLength
                    }));
                    b.enable(b.BLEND);
                    b.blendEquation(b.FUNC_ADD);
                    h.blend && "lighter" === h.blend ? b.blendFunc(b.SRC_ALPHA, b.ONE) : b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
                    this.indexBuffer.bind();
                    this.vertexArray.bind();
                    b.drawElements(b.TRIANGLES, g.index.length, b.UNSIGNED_INT, 0);
                    b.bindBuffer(b.ARRAY_BUFFER, null);
                    b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, null);
                    b.disable(b.BLEND)
                }
            }
        }]);
        return a
    } (Layer),
    TileLayer = function(c) {
        function a(b, c) {
            I(this, a);
            return Q(this, (a.__proto__ || N(a)).call(this, b, c))
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {}
            }
        },
        {
            key: "initialize",
            value: function(a) {
                this.gl = a;
                var b = this.getOptions();
                this.texture = null;
                this.program = new Program(this.gl, {
                    vertexShader: "precision highp float;attribute vec3 a_pos;attribute vec2 a_texture_coord;uniform sampler2D uTerrain;uniform mat4 u_proj_matrix;uniform mat4 u_mv_matrix;varying vec2 v_texture_coord;void main(){v_texture_coord=a_texture_coord;vec3 pos=a_pos.xyz;\n#if defined(TERRAIN)\nvec4 terrainColor=texture2D(uTerrain,vec2(v_texture_coord.s,v_texture_coord.t));vec3 rgb=terrainColor.rgb*256.0;pos.z=-10000.0+((rgb.r*256.0*256.0+rgb.g*256.0+rgb.b)*0.1);pos.z=pos.z-60.0;\n#endif\nvec4 position=u_proj_matrix*u_mv_matrix*vec4(pos,1.0);gl_Position=position;}",
                    fragmentShader: "precision highp float;varying vec2 v_texture_coord;uniform sampler2D uTile;uniform bool uUseFilter;uniform vec4 uFilterColor;void main(){vec4 textureColor=texture2D(uTile,vec2(v_texture_coord.s,v_texture_coord.t));if(uUseFilter){textureColor=textureColor*uFilterColor;}gl_FragColor=textureColor;}",
                    defines: b.terrain ? ["TERRAIN"] : ""
                },
                this);
                this.vertexBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.indexBuffer = new Buffer({
                    gl: a,
                    target: "ELEMENT_ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.vertexArray = new VertexArray({
                    gl: a,
                    program: this.program,
                    attributes: [{
                        name: "a_pos",
                        buffer: this.vertexBuffer,
                        stride: 20,
                        size: 3,
                        type: "FLOAT",
                        offset: 0
                    },
                    {
                        name: "a_texture_coord",
                        buffer: this.vertexBuffer,
                        size: 2,
                        stride: 20,
                        type: "FLOAT",
                        offset: 12
                    }]
                })
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                var b = this;
                this.gl && (this.loadTextureTime && clearTimeout(this.loadTextureTime), this.loadTextureTime = setTimeout(function() {
                    b.loadTexture(function() {
                        b.parseData(c);
                        b.dataTime = new Date;
                        b.webglLayer.render()
                    })
                },
                0))
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl,
                c = a.projectionMatrix;
                a = a.viewMatrix;
                var g = this.getOptions(),
                h = this.program,
                k = h.uniforms;
                h.use(b);
                this.texture && (b.activeTexture(b.TEXTURE0), b.uniform1i(k.uTile, 0), b.bindTexture(b.TEXTURE_2D, this.texture), b.activeTexture(b.TEXTURE1), b.uniform1i(k.uTerrain, 1), b.bindTexture(b.TEXTURE_2D, this.terrainSampler), b.disable(b.CULL_FACE), h.setUniforms({
                    u_proj_matrix: c,
                    uUseFilter: !!g.filterColor,
                    uFilterColor: this.normizedColor(g.filterColor || "rgba(0, 0, 100, 1.0)"),
                    u_mv_matrix: a
                }), 0 < this.index.length && (this.indexBuffer.bind(), this.vertexArray.bind(), b.drawElements(b.TRIANGLES, this.index.length, b.UNSIGNED_INT, 0)))
            }
        },
        {
            key: "loadTexture",
            value: function(a) {
                var b = this,
                c = this.getOptions();
                c.tile ? c.terrain ? Ma(this.gl, c.terrain,
                function(d, e) {
                    b.terrainSampler = d;
                    Ma(b.gl, c.tile,
                    function(c, d) {
                        b.texture = c;
                        a && a();
                        b.webglLayer.render()
                    })
                },
                {
                    TEXTURE_WRAP_S: "MIRRORED_REPEAT",
                    TEXTURE_WRAP_T: "MIRRORED_REPEAT"
                }) : Ma(this.gl, c.tile,
                function(c, d) {
                    b.texture = c;
                    a && a();
                    b.webglLayer.render()
                }) : (this.texture = null, a && a())
            }
        },
        {
            key: "parseData",
            value: function(a) {
                var b = this,
                c = [],
                g = [];
                if (a && a[0]) {
                    var h = a[0].geometry.coordinates[0];
                    h = h.map(function(a) {
                        return b.normizedPoint(a)
                    });
                    a = h[0][0];
                    var k = h[0][1],
                    l = h[0][2],
                    m = (h[2][0] - a) / 16;
                    h = (h[2][1] - k) / 16;
                    for (var p = 0; 16 >= p; p++) for (var n = 0; 16 >= n; n++) if (c.push(a + m * n, k + h * p, l), c.push(n / 16, p / 16), 16 > n && 16 > p) {
                        var r = 17 * p + n,
                        q = 17 * (p + 1) + n;
                        g.push(r, q + 1, r + 1);
                        g.push(r, q, q + 1)
                    }
                }
                this.index = g;
                this.vertexBuffer.updateData(new Float32Array(c));
                this.indexBuffer.updateData(new Uint32Array(g))
            }
        }]);
        return a
    } (Layer),
    PolygonLayer = function(c) {
        function a(b) {
            I(this, a);
            var c = Q(this, (a.__proto__ || N(a)).call(this, b));
            b = c.getOptions();
            c.shapeLayer = new ShapeLayer({
                enablePicked: b.enablePicked
            });
            c.lineLayer = new LineLayer3D;
            c.children = [c.shapeLayer, c.lineLayer];
            return c
        }
        R(a, c);
        M(a, [{
            key: "pick",
            value: function(a, c) {
                return this.shapeLayer.pick(a, c)
            }
        },
        {
            key: "onOptionsChanged",
            value: function(a) {
                this.shapeLayer.setOptions({
                    onClick: function(b) {
                        a.onClick && a.onClick(b)
                    },
                    selectedIndex: a.selectedIndex,
                    selectedColor: a.selectedColor,
                    height: 0,
                    autoSelect: a.autoSelect,
                    color: a.fillColor,
                    opacity: a.fillOpacity,
                    topColor: a.fillColor,
                    useLight: false
                });
                this.lineLayer.setOptions({
                    flat: true,
                    color: a.lineColor,
                    width: a.lineWidth,
                    lineJoin: a.lineJoin
                })
            }
        },
        {
            key: "onDataChanged",
            value: function(a) {
                var b = a.map(function(a) {
                    return {
                        geometry: {
                            type: "LineString",
                            coordinates: a.geometry.coordinates[0].map(function(a) {
                                return 3 === a.length ? a: [a[0], a[1], .1]
                            })
                        }
                    }
                });
                this.shapeLayer.setData(a);
                this.lineLayer.setData(b)
            }
        },
        {
            key: "getDefaultOptions",
            value: function() {
                return {
                    enablePicked: false,
                    selectedIndex: -1,
                    selectedColor: "#ff0000",
                    autoSelect: true,
                    lineColor: "rgba(250, 250, 25, 1)",
                    lineWidth: 2,
                    lineJoin: "miter",
                    fillColor: "rgba(25, 25, 250, 1)",
                    fillOpacity: 1
                }
            }
        }]);
        return a
    } (pb),
    ba = ba || {},
    ng = 0,
    La = null,
    qj = ba.Scene = function(c, a) {
        this.name = undefined !== a.name ? a.name: null;
        this.nodes = Array(a.nodes.length);
        for (var b = 0,
        d = a.nodes.length; b < d; b++) this.nodes[b] = c.nodes[a.nodes[b]];
        this.extensions = undefined !== a.extensions ? a.extensions: null;
        this.extras = undefined !== a.extras ? a.extras: null;
        this.boundingBox = null
    },
    Za = ba.BoundingBox = function(c, a, b) {
        c = c || L.fromValues(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        a = a || L.fromValues(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
        undefined === b || true === b ? (this.min = L.clone(c), this.max = L.clone(a)) : (this.min = c, this.max = a);
        this.transform = E.create()
    };
    Za.prototype.updateBoundingBox = function(c) {
        L.min(this.min, this.min, c.min);
        L.max(this.max, this.max, c.max)
    };
    Za.prototype.calculateTransform = function() {
        this.transform[0] = this.max[0] - this.min[0];
        this.transform[5] = this.max[1] - this.min[1];
        this.transform[10] = this.max[2] - this.min[2];
        this.transform[12] = this.min[0];
        this.transform[13] = this.min[1];
        this.transform[14] = this.min[2]
    };
    Za.getAABBFromOBB = function() {
        var c = L.create(),
        a = L.create(),
        b = L.create(),
        d = L.create(),
        e = L.create();
        return function(g, h) {
            L.set(c, h[0], h[1], h[2]);
            L.set(a, h[4], h[5], h[6]);
            L.set(b, h[8], h[9], h[10]);
            h = L.fromValues(h[12], h[13], h[14]);
            var k = L.clone(h);
            L.scale(d, c, g.min[0]);
            L.scale(e, c, g.max[0]);
            L.min(c, d, e);
            L.add(h, h, c);
            L.max(c, d, e);
            L.add(k, k, c);
            L.scale(d, a, g.min[1]);
            L.scale(e, a, g.max[1]);
            L.min(a, d, e);
            L.add(h, h, a);
            L.max(a, d, e);
            L.add(k, k, a);
            L.scale(d, b, g.min[2]);
            L.scale(e, b, g.max[2]);
            L.min(b, d, e);
            L.add(h, h, b);
            L.max(b, d, e);
            L.add(k, k, b);
            g = new Za(h, k, false);
            g.calculateTransform();
            return g
        }
    } ();
    var og = ba.Accessor = function(c, a) {
        this.bufferView = a;
        this.componentType = c.componentType;
        this.byteOffset = undefined !== c.byteOffset ? c.byteOffset: 0;
        this.byteStride = a.byteStride;
        this.normalized = undefined !== c.normalized ? c.normalized: false;
        this.count = c.count;
        this.type = c.type;
        this.size = jd[this.type];
        this.min = c.min;
        this.max = c.max;
        this.extensions = undefined !== c.extensions ? c.extensions: null;
        this.extras = undefined !== c.extras ? c.extras: null
    };
    og.prototype.prepareVertexAttrib = function(c, a) {
        a.vertexAttribPointer(c, this.size, this.componentType, this.normalized, this.byteStride, this.byteOffset);
        a.enableVertexAttribArray(c)
    };
    var be = ba.BufferView = function(c, a) {
        this.byteLength = c.byteLength;
        this.byteOffset = undefined !== c.byteOffset ? c.byteOffset: 0;
        this.byteStride = undefined !== c.byteStride ? c.byteStride: 0;
        this.target = undefined !== c.target ? c.target: null;
        this.data = a.slice(this.byteOffset, this.byteOffset + this.byteLength);
        this.extensions = undefined !== c.extensions ? c.extensions: null;
        this.extras = undefined !== c.extras ? c.extras: null;
        this.buffer = null
    };
    be.prototype.createBuffer = function(c) {
        this.buffer = c.createBuffer()
    };
    be.prototype.bindData = function(c) {
        return this.target ? (c.bindBuffer(this.target, this.buffer), c.bufferData(this.target, this.data, c.STATIC_DRAW), c.bindBuffer(this.target, null), true) : false
    };
    var rj = ba.Camera = function(c) {
        this.name = undefined !== c.name ? c.name: null;
        this.type = c.type;
        this.othographic = undefined === c.othographic ? null: c.othographic;
        this.perspective = undefined === c.perspective ? null: {
            yfov: c.perspective.yfov,
            znear: c.perspective.znear,
            zfar: undefined !== c.perspective.zfar ? c.perspective.zfar: null,
            aspectRatio: undefined !== c.perspective.aspectRatio ? c.perspective.aspectRatio: null
        };
        this.extensions = undefined !== c.extensions ? c.extensions: null;
        this.extras = undefined !== c.extras ? c.extras: null
    },
    Hb = ba.Node = function(c, a) {
        this.name = undefined !== c.name ? c.name: null;
        this.nodeID = a;
        this.camera = undefined !== c.camera ? c.camera: null;
        this.matrix = E.create();
        if (c.hasOwnProperty("matrix")) {
            for (a = 0; 16 > a; ++a) this.matrix[a] = c.matrix[a];
            this.translation = L.create();
            E.getTranslation(this.translation, this.matrix);
            this.rotation = vc.create();
            E.getRotation(this.rotation, this.matrix);
            this.scale = L.create();
            E.getScaling(this.scale, this.matrix)
        } else this.getTransformMatrixFromTRS(c.translation, c.rotation, c.scale);
        this.children = c.children || [];
        this.mesh = undefined !== c.mesh ? La.glTF.meshes[c.mesh] : null;
        this.skin = undefined !== c.skin ? c.skin: null;
        undefined !== c.extensions && undefined !== c.extensions.gl_avatar && true === La.enableGLAvatar && (this.skin = new sj(La.glTF, La.skeletonGltf.skins[La.skeletonGltf.json.extensions.gl_avatar.skins[c.extensions.gl_avatar.skin.name]], c.extensions.gl_avatar.skin.inverseBindMatrices));
        this.weights = undefined !== c.weights ? c.weights: null;
        this.extensions = undefined !== c.extensions ? c.extensions: null;
        this.extras = undefined !== c.extras ? c.extras: null;
        this.aabb = null;
        this.bvh = new Za
    };
    Hb.prototype.traverse = function(c, a) {
        a(this, c);
        c = 0;
        for (var b = this.children.length; c < b; c++) this.children[c].traverse(this, a)
    };
    Hb.prototype.traversePostOrder = function(c, a) {
        for (var b = 0,
        d = this.children.length; b < d; b++) this.children[b].traversePostOrder(this, a);
        a(this, c)
    };
    Hb.prototype.traverseTwoExecFun = function(c, a, b) {
        a(this, c);
        for (var d = 0,
        e = this.children.length; d < e; d++) this.children[d].traverseTwoExecFun(this, a, b);
        b(this, c)
    };
    var pg = E.create();
    Hb.prototype.getTransformMatrixFromTRS = function(c, a, b) {
        this.translation = undefined !== c ? L.fromValues(c[0], c[1], c[2]) : L.fromValues(0, 0, 0);
        this.rotation = undefined !== a ? Ga.fromValues(a[0], a[1], a[2], a[3]) : Ga.fromValues(0, 0, 0, 1);
        this.scale = undefined !== b ? L.fromValues(b[0], b[1], b[2]) : L.fromValues(1, 1, 1);
        this.updateMatrixFromTRS()
    };
    Hb.prototype.updateMatrixFromTRS = function() {
        E.fromRotationTranslation(pg, this.rotation, this.translation);
        E.scale(this.matrix, pg, this.scale)
    };
    var uj = ba.Mesh = function(c, a) {
        this.meshID = a;
        this.name = undefined !== c.name ? c.name: null;
        this.primitives = [];
        this.boundingBox = null;
        a = 0;
        for (var b = c.primitives.length; a < b; ++a) {
            var d = c.primitives[a];
            d = new tj(La.glTF, d);
            this.primitives.push(d);
            d.boundingBox && (this.boundingBox || (this.boundingBox = new Za), this.boundingBox.updateBoundingBox(d.boundingBox))
        }
        this.boundingBox && this.boundingBox.calculateTransform();
        this.weights = undefined !== c.weights ? c.weights: null;
        this.extensions = undefined !== c.extensions ? c.extensions: null;
        this.extras = undefined !== c.extras ? c.extras: null
    },
    tj = ba.Primitive = function(c, a) {
        this.attributes = a.attributes;
        this.indices = undefined !== a.indices ? a.indices: null;
        var b;
        if (undefined !== a.extensions && undefined !== a.extensions.gl_avatar && true === La.enableGLAvatar && a.extensions.gl_avatar.attributes) for (b in a.extensions.gl_avatar.attributes) this.attributes[b] = a.extensions.gl_avatar.attributes[b];
        null !== this.indices ? (this.indicesComponentType = c.json.accessors[this.indices].componentType, this.indicesLength = c.json.accessors[this.indices].count, this.indicesOffset = c.json.accessors[this.indices].byteOffset || 0) : (this.drawArraysCount = c.json.accessors[this.attributes.POSITION].count, this.drawArraysOffset = c.json.accessors[this.attributes.POSITION].byteOffset || 0);
        for (b in this.attributes) this.attributes[b] = c.accessors[this.attributes[b]];
        this.material = undefined !== a.material ? c.materials[a.material] : null;
        this.mode = undefined !== a.mode ? a.mode: 4;
        this.targets = a.targets;
        this.extensions = undefined !== a.extensions ? a.extensions: null;
        this.extras = undefined !== a.extras ? a.extras: null;
        this.boundingBox = this.shader = this.indexBuffer = this.vertexBuffer = this.vertexArray = null;
        undefined !== this.attributes.POSITION && (c = this.attributes.POSITION, c.max && "VEC3" === c.type && (this.boundingBox = new Za(L.fromValues(c.min[0], c.min[1], c.min[2]), L.fromValues(c.max[0], c.max[1], c.max[2]), false), this.boundingBox.calculateTransform()))
    },
    qg = ba.Texture = function(c) {
        this.name = undefined !== c.name ? c.name: null;
        this.sampler = undefined !== c.sampler ? La.glTF.samplers[c.sampler] : null;
        this.source = undefined !== c.source ? La.glTF.images[c.source] : null;
        this.extensions = undefined !== c.extensions ? c.extensions: null;
        this.extras = undefined !== c.extras ? c.extras: null;
        this.texture = null
    };
    qg.prototype.createTexture = function(c) {
        this.texture = c.createTexture();
        c.bindTexture(c.TEXTURE_2D, this.texture);
        c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, c.RGBA, c.UNSIGNED_BYTE, this.source);
        c.generateMipmap(c.TEXTURE_2D);
        c.bindTexture(c.TEXTURE_2D, null)
    };
    var rg = ba.Sampler = function(c) {
        this.name = undefined !== c.name ? c.name: null;
        this.magFilter = undefined !== c.magFilter ? c.magFilter: null;
        this.minFilter = undefined !== c.minFilter ? c.minFilter: null;
        this.wrapS = undefined !== c.wrapS ? c.wrapS: 10497;
        this.wrapT = undefined !== c.wrapT ? c.wrapT: 10497;
        this.extensions = undefined !== c.extensions ? c.extensions: null;
        this.extras = undefined !== c.extras ? c.extras: null;
        this.sampler = null
    };
    rg.prototype.createSampler = function(c) {
        this.sampler = c.createSampler();
        this.minFilter ? c.samplerParameteri(this.sampler, c.TEXTURE_MIN_FILTER, this.minFilter) : c.samplerParameteri(this.sampler, c.TEXTURE_MIN_FILTER, c.NEAREST_MIPMAP_LINEAR);
        this.magFilter ? c.samplerParameteri(this.sampler, c.TEXTURE_MAG_FILTER, this.magFilter) : c.samplerParameteri(this.sampler, c.TEXTURE_MAG_FILTER, c.LINEAR);
        c.samplerParameteri(this.sampler, c.TEXTURE_WRAP_S, this.wrapS);
        c.samplerParameteri(this.sampler, c.TEXTURE_WRAP_T, this.wrapT)
    };
    var ce = ba.TextureInfo = function(c) {
        this.index = c.index;
        this.texCoord = undefined !== c.texCoord ? c.texCoord: 0;
        this.extensions = undefined !== c.extensions ? c.extensions: null;
        this.extras = undefined !== c.extras ? c.extras: null
    },
    sg = ba.PbrMetallicRoughness = function(c) {
        this.baseColorFactor = undefined !== c.baseColorFactor ? c.baseColorFactor: [1, 1, 1, 1];
        this.baseColorTexture = undefined !== c.baseColorTexture ? new ce(c.baseColorTexture) : null;
        this.metallicFactor = undefined !== c.metallicFactor ? c.metallicFactor: 1;
        this.roughnessFactor = undefined !== c.roughnessFactor ? c.roughnessFactor: 1;
        this.metallicRoughnessTexture = undefined !== c.metallicRoughnessTexture ? new ce(c.metallicRoughnessTexture) : null;
        this.extensions = undefined !== c.extensions ? c.extensions: null;
        this.extras = undefined !== c.extras ? c.extras: null
    },
    vj = ba.NormalTextureInfo = function(c) {
        this.index = c.index;
        this.texCoord = undefined !== c.texCoord ? c.texCoord: 0;
        this.scale = undefined !== c.scale ? c.scale: 1;
        this.extensions = undefined !== c.extensions ? c.extensions: null;
        this.extras = undefined !== c.extras ? c.extras: null
    },
    wj = ba.OcclusionTextureInfo = function(c) {
        this.index = c.index;
        this.texCoord = undefined !== c.texCoord ? c.texCoord: 0;
        this.strength = undefined !== c.strength ? c.strength: 1;
        this.extensions = undefined !== c.extensions ? c.extensions: null;
        this.extras = undefined !== c.extras ? c.extras: null
    },
    xj = ba.Material = function(c) {
        this.name = undefined !== c.name ? c.name: null;
        this.pbrMetallicRoughness = undefined !== c.pbrMetallicRoughness ? new sg(c.pbrMetallicRoughness) : new sg({
            baseColorFactor: [1, 1, 1, 1],
            metallicFactor: 1,
            metallicRoughnessTexture: 1
        });
        this.normalTexture = undefined !== c.normalTexture ? new vj(c.normalTexture) : null;
        this.occlusionTexture = undefined !== c.occlusionTexture ? new wj(c.occlusionTexture) : null;
        this.emissiveTexture = undefined !== c.emissiveTexture ? new ce(c.emissiveTexture) : null;
        this.emissiveFactor = undefined !== c.emissiveFactor ? c.emissiveFactor: [0, 0, 0];
        this.alphaMode = undefined !== c.alphaMode ? c.alphaMode: "OPAQUE";
        this.alphaCutoff = undefined !== c.alphaCutoff ? c.alphaCutoff: .5;
        this.doubleSided = c.doubleSided || false;
        this.extensions = undefined !== c.extensions ? c.extensions: null;
        this.extras = undefined !== c.extras ? c.extras: null
    },
    yj = ba.Skin = function(c, a, b) {
        this.name = undefined !== a.name ? a.name: null;
        this.skinID = b;
        this.joints = Array(a.joints.length);
        var d;
        b = 0;
        for (d = this.joints.length; b < d; b++) this.joints[b] = c.nodes[a.joints[b]];
        this.skeleton = undefined !== a.skeleton ? c.nodes[a.skeleton] : null;
        this.inverseBindMatrices = undefined !== a.inverseBindMatrices ? c.accessors[a.inverseBindMatrices] : null;
        this.extensions = undefined !== a.extensions ? a.extensions: null;
        this.extras = undefined !== a.extras ? a.extras: null;
        this.uniformBlockID = ng++;
        if (this.inverseBindMatrices) for (this.inverseBindMatricesData = uc(this.inverseBindMatrices), this.inverseBindMatrix = [], this.jointMatrixUniformBuffer = null, this.jointMatrixUnidormBufferData = new Float32Array(1040), b = 0, d = this.inverseBindMatricesData.length; b < d; b += 16) this.inverseBindMatrix.push(E.fromValues(this.inverseBindMatricesData[b], this.inverseBindMatricesData[b + 1], this.inverseBindMatricesData[b + 2], this.inverseBindMatricesData[b + 3], this.inverseBindMatricesData[b + 4], this.inverseBindMatricesData[b + 5], this.inverseBindMatricesData[b + 6], this.inverseBindMatricesData[b + 7], this.inverseBindMatricesData[b + 8], this.inverseBindMatricesData[b + 9], this.inverseBindMatricesData[b + 10], this.inverseBindMatricesData[b + 11], this.inverseBindMatricesData[b + 12], this.inverseBindMatricesData[b + 13], this.inverseBindMatricesData[b + 14], this.inverseBindMatricesData[b + 15]))
    },
    sj = ba.SkinLink = function(c, a, b) {
        this.isLink = true;
        c.skins || (c.skins = []);
        c.skins.push(this);
        this.name = a.name;
        this.skinID = c.skins.length - 1;
        this.joints = a.joints;
        this.skeleton = a.skeleton;
        this.inverseBindMatrices = undefined !== b ? c.accessors[b] : null;
        this.uniformBlockID = ng++;
        if (this.inverseBindMatrices) for (this.inverseBindMatricesData = uc(this.inverseBindMatrices), this.inverseBindMatrix = [], this.jointMatrixUniformBuffer = null, this.jointMatrixUnidormBufferData = new Float32Array(1040), c = 0, a = this.inverseBindMatricesData.length; c < a; c += 16) this.inverseBindMatrix.push(E.fromValues(this.inverseBindMatricesData[c], this.inverseBindMatricesData[c + 1], this.inverseBindMatricesData[c + 2], this.inverseBindMatricesData[c + 3], this.inverseBindMatricesData[c + 4], this.inverseBindMatricesData[c + 5], this.inverseBindMatricesData[c + 6], this.inverseBindMatricesData[c + 7], this.inverseBindMatricesData[c + 8], this.inverseBindMatricesData[c + 9], this.inverseBindMatricesData[c + 10], this.inverseBindMatricesData[c + 11], this.inverseBindMatricesData[c + 12], this.inverseBindMatricesData[c + 13], this.inverseBindMatricesData[c + 14], this.inverseBindMatricesData[c + 15]))
    },
    zj = ba.Target = function(c) {
        this.nodeID = undefined !== c.node ? c.node: null;
        this.path = c.path;
        this.extensions = undefined !== c.extensions ? c.extensions: null;
        this.extras = undefined !== c.extras ? c.extras: null
    },
    Aj = ba.Channel = function(c, a) {
        this.sampler = a.samplers[c.sampler];
        this.target = new zj(c.target);
        this.extensions = undefined !== c.extensions ? c.extensions: null;
        this.extras = undefined !== c.extras ? c.extras: null
    },
    tg = ba.AnimationSampler = function(c, a) {
        this.input = c.accessors[a.input];
        this.output = c.accessors[a.output];
        this.inputTypedArray = uc(this.input);
        this.outputTypedArray = uc(this.output);
        this.interpolation = undefined !== a.interpolation ? a.interpolation: "LINEAR";
        this.extensions = undefined !== a.extensions ? a.extensions: null;
        this.extras = undefined !== a.extras ? a.extras: null;
        this.curIdx = 0;
        this.curValue = Ga.create();
        this.endT = this.inputTypedArray[this.inputTypedArray.length - 1];
        this.inputMax = this.endT - this.inputTypedArray[0]
    },
    ug = Ga.create(),
    vg = Ga.create();
    tg.prototype.getValue = function(c) {
        c > this.endT && (c -= this.inputMax * Math.ceil((c - this.endT) / this.inputMax), this.curIdx = 0);
        for (var a = this.inputTypedArray.length; this.curIdx <= a - 2 && c >= this.inputTypedArray[this.curIdx + 1];) this.curIdx++;
        this.curIdx >= a - 1 && (c -= this.inputMax, this.curIdx = 0);
        a = jd[this.output.type];
        var b = 4 === a ? vc.slerp: Ga.lerp,
        d = this.curIdx,
        e = d * a,
        g = e + a;
        c = Math.max(0, c - this.inputTypedArray[d]) / (this.inputTypedArray[d + 1] - this.inputTypedArray[d]);
        for (d = 0; d < a; d++) ug[d] = this.outputTypedArray[e + d],
        vg[d] = this.outputTypedArray[g + d];
        switch (this.interpolation) {
        case "LINEAR":
            b(this.curValue, ug, vg, c)
        }
    };
    var Bj = ba.Animation = function(c, a) {
        this.name = undefined !== a.name ? a.name: null;
        var b;
        this.samplers = [];
        var d = 0;
        for (b = a.samplers.length; d < b; d++) this.samplers[d] = new tg(c, a.samplers[d]);
        this.channels = [];
        d = 0;
        for (b = a.channels.length; d < b; d++) this.channels[d] = new Aj(a.channels[d], this);
        this.extensions = undefined !== a.extensions ? a.extensions: null;
        this.extras = undefined !== a.extras ? a.extras: null
    },
    Cj = ba.glTFModel = function(c) {
        this.json = c;
        this.defaultScene = undefined !== c.scene ? c.scene: 0;
        this.version = Number(c.asset.version);
        c.accessors && (this.accessors = Array(c.accessors.length));
        c.bufferViews && (this.bufferViews = Array(c.bufferViews.length));
        c.scenes && (this.scenes = Array(c.scenes.length));
        c.nodes && (this.nodes = Array(c.nodes.length));
        c.meshes && (this.meshes = Array(c.meshes.length));
        c.materials && (this.materials = Array(c.materials.length));
        c.textures && (this.textures = Array(c.textures.length));
        c.samplers && (this.samplers = Array(c.samplers.length));
        c.images && (this.images = Array(c.images.length));
        c.skins && (this.skins = Array(c.skins.length));
        c.animations && (this.animations = Array(c.animations.length));
        c.cameras && (this.cameras = Array(c.cameras.length));
        this.extensions = undefined !== c.extensions ? c.extensions: null;
        this.extras = undefined !== c.extras ? c.extras: null
    },
    Ib = ba.glTFLoader = function(c) {
        this._init();
        this.glTF = null;
        this.enableGLAvatar = false;
        this.linkSkeletonGltf = null
    };
    Ib.prototype._init = function() {
        this._loadDone = false;
        this._bufferLoaded = this._bufferRequested = 0;
        this._buffers = [];
        this._bufferTasks = {};
        this._finishedPendingTasks = this._pendingTasks = this._imageLoaded = this._imageRequested = this._shaderLoaded = this._shaderRequested = 0;
        this.onload = null;
        La = this
    };
    Ib.prototype._checkComplete = function() {
        this._bufferRequested == this._bufferLoaded && this._imageRequested == this._imageLoaded && (this._loadDone = true);
        this._loadDone && this._pendingTasks == this._finishedPendingTasks && (this._postprocess(), this.onload(this.glTF))
    };
    Ib.prototype.loadGLTF_GL_Avatar_Skin = function(c, a, b) {
        this.enableGLAvatar = true;
        this.skeletonGltf = a;
        this.loadGLTF(c, b)
    };
    Ib.prototype.loadGLTF = function(c, a) {
        this._init();
        this.onload = a ||
        function(a) {};
        this.baseUri = Qg(c);
        var b = this;
        Rg(c,
        function(a) {
            a = JSON.parse(a);
            b.glTF = new Cj(a);
            var c, d = function(a) {
                b._buffers[c] = a;
                b._bufferLoaded++;
                if (b._bufferTasks[c]) {
                    var d;
                    var e = 0;
                    for (d = b._bufferTasks[c].length; e < d; ++e) b._bufferTasks[c][e](a)
                }
                b._checkComplete()
            };
            if (a.buffers) for (c in a.buffers) {
                b._bufferRequested++;
                var h = a.buffers[c].uri; - 1 === h.indexOf("base64") && (h = b.baseUri + h);
                Sg(h, d)
            }
            d = function(a, c) {
                b._imageLoaded++;
                b.glTF.images[c] = a;
                b._checkComplete()
            };
            var k;
            if (a.images) for (k in a.images) b._imageRequested++,
            Tg(b.baseUri + a.images[k].uri, k, d);
            b._checkComplete()
        })
    };
    Ib.prototype._postprocess = function() {
        function c(a, b) {
            var c = l[a.nodeID];
            null !== b ? E.mul(c, l[b.nodeID], a.matrix) : E.copy(c, a.matrix)
        }
        function a(a, b) {
            var c = l[a.nodeID];
            b = null !== b ? b.bvh: m.boundingBox;
            a.mesh && (e = a.mesh, e.boundingBox && (a.aabb = Za.getAABBFromOBB(e.boundingBox, c), 0 === a.children.length && (L.copy(a.bvh.min, a.aabb.min), L.copy(a.bvh.max, a.aabb.max))));
            L.min(b.min, b.min, a.bvh.min);
            L.max(b.max, b.max, a.bvh.max)
        }
        La = this;
        var b, d, e;
        if (this.glTF.cameras) {
            var g = 0;
            for (b = this.glTF.cameras.length; g < b; g++) this.glTF.cameras[g] = new rj(this.glTF.json.cameras[g])
        }
        if (this.glTF.bufferViews) for (g = 0, b = this.glTF.bufferViews.length; g < b; g++) this.glTF.bufferViews[g] = new be(this.glTF.json.bufferViews[g], this._buffers[this.glTF.json.bufferViews[g].buffer]);
        if (this.glTF.accessors) for (g = 0, b = this.glTF.accessors.length; g < b; g++) this.glTF.accessors[g] = new og(this.glTF.json.accessors[g], this.glTF.bufferViews[this.glTF.json.accessors[g].bufferView]);
        if (this.glTF.materials) for (g = 0, b = this.glTF.materials.length; g < b; g++) this.glTF.materials[g] = new xj(this.glTF.json.materials[g]);
        if (this.glTF.samplers) for (g = 0, b = this.glTF.samplers.length; g < b; g++) this.glTF.samplers[g] = new rg(this.glTF.json.samplers[g]);
        if (this.glTF.textures) for (g = 0, b = this.glTF.textures.length; g < b; g++) this.glTF.textures[g] = new qg(this.glTF.json.textures[g]);
        g = 0;
        for (b = this.glTF.meshes.length; g < b; g++) this.glTF.meshes[g] = new uj(this.glTF.json.meshes[g], g);
        g = 0;
        for (b = this.glTF.nodes.length; g < b; g++) this.glTF.nodes[g] = new Hb(this.glTF.json.nodes[g], g);
        g = 0;
        for (b = this.glTF.nodes.length; g < b; g++) {
            var h = this.glTF.nodes[g];
            var k = 0;
            for (d = h.children.length; k < d; k++) h.children[k] = this.glTF.nodes[h.children[k]]
        }
        var l = Array(this.glTF.nodes.length);
        g = 0;
        for (b = l.length; g < b; g++) l[g] = E.create();
        g = 0;
        for (b = this.glTF.scenes.length; g < b; g++) {
            var m = this.glTF.scenes[g] = new qj(this.glTF, this.glTF.json.scenes[g]);
            m.boundingBox = new Za;
            k = 0;
            for (d = m.nodes.length; k < d; k++) h = m.nodes[k],
            h.traverseTwoExecFun(null, c, a);
            m.boundingBox.calculateTransform()
        }
        k = 0;
        for (d = this.glTF.nodes.length; k < d; k++) h = this.glTF.nodes[k],
        null !== h.bvh && h.bvh.calculateTransform();
        if (this.glTF.animations) for (g = 0, b = this.glTF.animations.length; g < b; g++) this.glTF.animations[g] = new Bj(this.glTF, this.glTF.json.animations[g]);
        if (this.glTF.json.skins) for (g = 0, b = this.glTF.skins.length; g < b; g++) for (this.glTF.skins[g] = new yj(this.glTF, this.glTF.json.skins[g], g), h = this.glTF.skins[g].joints, k = 0, d = h.length; k < d; k++) h[k].jointID = k;
        g = 0;
        for (b = this.glTF.nodes.length; g < b; g++) h = this.glTF.nodes[g],
        null !== h.skin && "number" == typeof h.skin && (h.skin = this.glTF.skins[h.skin])
    };
    var jd = {
        SCALAR: 1,
        VEC2: 2,
        VEC3: 3,
        VEC4: 4,
        MAT2: 4,
        MAT3: 9,
        MAT4: 16
    },
    wg = function(c) {
        function a(b, c) {
            I(this, a);
            return Q(this, (a.__proto__ || N(a)).call(this, b, c))
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    scale: 1
                }
            }
        },
        {
            key: "initialize",
            value: function(a) {
                var b = this;
                this.gl = a;
                var c = this.getOptions();
                this.gltfObj = Ug({
                    gl: a,
                    options: c
                }); (new Ib).loadGLTF(c.url,
                function(a) {
                    b.gltfObj.setupScene(a);
                    b.webglLayer.render()
                })
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {}
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl;
                a = a.matrix;
                var c = this.getData(),
                g = this.getOptions(),
                h = g.scale,
                k = [h, h, h];
                "px" === g.unit && this.map && (k = this.map.getZoomUnits(), k = [h * k, h * k, h * k]);
                for (h = 0; h < c.length; h++) {
                    var l = c[h].geometry.coordinates;
                    g = E.create();
                    var m = E.create();
                    l = this.normizedPoint(l);
                    E.identity(g);
                    E.translate(g, g, [l[0], l[1], 0]);
                    E.rotateX(g, g, Math.PI / 2);
                    E.rotateY(g, g, (c[h].angle || 0) * Math.PI / 180);
                    E.scale(g, g, k);
                    E.mul(m, a, g);
                    this.gltfObj.render({
                        gl: b,
                        matrix: m
                    })
                }
            }
        }]);
        return a
    } (Layer),
    vb = vb || {}; (function() {
        function c(a, c, e) {
            e = a.createShader(e);
            a.shaderSource(e, c);
            a.compileShader(e);
            return e
        }
        vb.getShaderSource = function(a) {
            return document.getElementById(a).textContent.replace(/^\s+|\s+$/g, "")
        };
        vb.createProgram = function(a, d, e) {
            var b = a.createProgram();
            d = c(a, d, a.VERTEX_SHADER);
            e = c(a, e, a.FRAGMENT_SHADER);
            a.attachShader(b, d);
            a.deleteShader(d);
            a.attachShader(b, e);
            a.deleteShader(e);
            a.linkProgram(b);
            a.getProgramInfoLog(b);
            a.getShaderInfoLog(d);
            a.getShaderInfoLog(e);
            return b
        };
        var a = vb.loadImage = function(a, c) {
            var b = new Image;
            b.crossOrigin = "Anonymous";
            b.src = a;
            b.onload = c;
            return b
        };
        vb.loadImages = function(b, c) {
            function d() {
                0 >= --h && c(g)
            }
            for (var g = [], h = b.length, k = 0; k < h; ++k) g.push(a(b[k], d))
        }
    })();
    var CarLineLayer = function(c) {
        function a(b) {
            I(this, a);
            var c = Q(this, (a.__proto__ || N(a)).call(this, b));
            b = c.getOptions();
            c.gltfLayer = new wg({
                url: b.url || "https://mapv-website.bj.bcebos.com/gl/examples/model/car.gltf",
                scale: b.scale
            });
            c.children = [c.gltfLayer];
            c.autoUpdate = true;
            c.index = [];
            c.newData = [];
            c.isStarted = false === b.autoPlay ? false : true;
            return c
        }
        R(a, c);
        M(a, [{
            key: "onOptionsChanged",
            value: function(a) {
                this.gltfLayer.setOptions({})
            }
        },
        {
            key: "onDataChanged",
            value: function(a) {
                this.index = [];
                this.newData = [];
                for (var b = 0; b < a.length; b++) this.index.push(0),
                this.newData.push(this._addPath(a[b].geometry.coordinates));
                this.updatePoints()
            }
        },
        {
            key: "lnglatToMercator",
            value: function(a, c) {
                c = c * Math.PI / 180;
                c = 3189068.5 * Math.log((1 + Math.sin(c)) / (1 - Math.sin(c)));
                return [parseFloat((a * Math.PI / 180 * 6378137).toFixed(2)), parseFloat(c.toFixed(2))]
            }
        },
        {
            key: "getDeg",
            value: function(a, c) { - 180 < a[0] && 180 > a[0] && (a = this.lnglatToMercator(a[0], a[1]), c = this.lnglatToMercator(c[0], c[1]));
                var b = 180 * Math.atan((c[1] - a[1]) / (c[0] - a[0])) / Math.PI;
                c[0] > a[0] && (b -= 180);
                return b
            }
        },
        {
            key: "getPoint",
            value: function(a, c, e) {
                return [a[0] + (c[0] - a[0]) * e, a[1] + (c[1] - a[1]) * e]
            }
        },
        {
            key: "updatePoints",
            value: function() {
                for (var a = this.newData,
                c = [], e = 0; e < a.length; e++) {
                    for (var g = a[e], h = Math.floor(this.index[e]), k = h + 1; g[k][0] === g[h][0] && g[k][1] === g[h][1];) k++;
                    k >= g.length - 1 && (k = --h);
                    k = this.getDeg(g[h], g[k]);
                    c.push({
                        geometry: {
                            type: "Point",
                            coordinates: this.getPoint(g[h], g[h + 1], this.index[e] % 1)
                        },
                        angle: k - 90
                    })
                }
                this.pointData = c;
                this.gltfLayer.setData(c, {
                    autoRender: false
                })
            }
        },
        {
            key: "getCurrentPoint",
            value: function() {
                return this.pointData
            }
        },
        {
            key: "getDefaultOptions",
            value: function() {
                return {
                    step: 1
                }
            }
        },
        {
            key: "getDistance",
            value: function(a, c) {
                var b = a[1] * Math.PI / 180,
                d = c[1] * Math.PI / 180;
                a = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin((b - d) / 2), 2) + Math.cos(b) * Math.cos(d) * Math.pow(Math.sin((a[0] * Math.PI / 180 - c[0] * Math.PI / 180) / 2), 2)));
                return a = Math.round(6378137E4 * a) / 1E4
            }
        },
        {
            key: "_addPath",
            value: function(a) {
                for (var b = a.length,
                c = 0,
                g = [], h = [], k = 1; k < b; k++) {
                    var l = this.getDistance(a[k - 1], a[k]);
                    g.push(l);
                    c += l
                }
                l = [0];
                for (k = 1; k < b; k++) {
                    var m = (g[k - 1] / c).toFixed(2);
                    l[k] = l[k - 1] + parseFloat(m, 10);
                    h = h.concat(this._getPath(a[k - 1], a[k], 1E3 * m))
                }
                this._pathPercents = l;
                return h
            }
        },
        {
            key: "_getPath",
            value: function(a, c, e) {
                if (0 === e) return [a];
                for (var b = [], d = 0; d <= e; d++) b.push([(c[0] - a[0]) / e * d + a[0], (c[1] - a[1]) / e * d + a[1]]);
                return b
            }
        },
        {
            key: "start",
            value: function() {
                this.isStarted = true
            }
        },
        {
            key: "stop",
            value: function() {
                this.isStarted = false
            }
        },
        {
            key: "render",
            value: function(b) {
                Ya(a.prototype.__proto__ || N(a.prototype), "render", this).call(this, b);
                b = this.getOptions();
                if (this.isStarted) for (var c = this.newData,
                e = 0; e < this.index.length; e++) this.index[e] += b.step,
                this.index[e] > c[e].length - 2 && (this.index[e] = 0);
                this.updatePoints()
            }
        }]);
        return a
    } (pb);
    da.prototype.parseColors = function(c) {
        this.arrFeatureStyles = [[2, c[0] || "rgba(79,210,125,1)", 2, 2, 0, [], 0, 0], [2, c[0] || "rgba(79,210,125,1)", 3, 2, 0, [], 0, 0], [2, c[0] || "rgba(79,210,125,1)", 3, 2, 0, [], 0, 0], [2, c[0] || "rgba(79,210,125,1)", 5, 2, 0, [], 0, 0], [2, c[0] || "rgba(79,210,125,1)", 6, 2, 0, [], 0, 0], [2, c[2] || "rgba(255,208,69,1)", 2, 2, 0, [], 0, 0], [2, c[2] || "rgba(255,208,69,1)", 3, 2, 0, [], 0, 0], [2, c[2] || "rgba(255,208,69,1)", 3, 2, 0, [], 0, 0], [2, c[2] || "rgba(255,208,69,1)", 5, 2, 0, [], 0, 0], [2, c[2] || "rgba(255,208,69,1)", 6, 2, 0, [], 0, 0], [2, c[1] || "rgba(232,14,14,1)", 2, 2, 0, [], 0, 0], [2, c[1] || "rgba(232,14,14,1)", 3, 2, 0, [], 0, 0], [2, c[1] || "rgba(232,14,14,1)", 3, 2, 0, [], 0, 0], [2, c[1] || "rgba(232,14,14,1)", 5, 2, 0, [], 0, 0], [2, c[1] || "rgba(232,14,14,1)", 6, 2, 0, [], 0, 0], [2, c[3] || "rgba(181,0,0,1)", 2, 2, 0, [], 0, 0], [2, c[3] || "rgba(181,0,0,1)", 3, 2, 0, [], 0, 0], [2, c[3] || "rgba(181,0,0,1)", 3, 2, 0, [], 0, 0], [2, c[3] || "rgba(181,0,0,1)", 5, 2, 0, [], 0, 0], [2, c[3] || "rgba(181,0,0,1)", 6, 2, 0, [], 0, 0], [2, "rgba(255,255,255,1)", 4, 0, 0, [], 0, 0], [2, "rgba(255,255,255,1)", 5.5, 0, 0, [], 0, 0], [2, "rgba(255,255,255,1)", 7, 0, 0, [], 0, 0], [2, "rgba(255,255,255,1)", 8.5, 0, 0, [], 0, 0], [2, "rgba(255,255,255,1)", 10, 0, 0, [], 0, 0]]
    };
    da.prototype.setColors = function(c) {
        this.parseColors(c)
    };
    da.prototype.initialize = function(c) {
        this._initialize || (this._initialize = true)
    };
    da.prototype.clearCache = function(c) {
        this.cache = {}
    };
    da.prototype.setMap = function(c) {
        c ? (this.map = c, this._initialize ? this.canvaslayer.show() : this.initialize(c)) : this.canvaslayer.hide()
    };
    da.prototype.draw = function(c) {
        c = c || {};
        c.clearCache && this.clearCache();
        this.canvaslayer.draw()
    };
    da.prototype.clear = function() {};
    da.prototype.update = function() {
        var c = this.map,
        a = this.getDataZoom(),
        b = Math.pow(2, 18 - a),
        d = 256 * b,
        e = c.getCenter(),
        g = Math.ceil(e.lng / d),
        h = Math.ceil(e.lat / d),
        k = this.tileSize,
        l = a - Math.round(c.getZoom());
        0 < l && (k /= Math.pow(2, l));
        d = [g, h, (e.lng - g * d) / d * k, (e.lat - h * d) / d * k];
        g = c.getBounds();
        e = g.getNorthEast();
        g = g.getSouthWest();
        c.getSize();
        c.getSize();
        c = (e.lng - g.lng) / b;
        b = (e.lat - g.lat) / b;
        e = d[1] - Math.ceil((b / 2 - d[3]) / k);
        g = d[0] + Math.ceil((c / 2 + d[2]) / k);
        h = d[1] + Math.ceil((b / 2 + d[3]) / k);
        b = [];
        for (k = d[0] - Math.ceil((c / 2 - d[2]) / k); k < g; k++) for (d = e; d < h; d++) b.push([k, d, a]);
        this.tilesOrder = b;
        this._loadCount = {};
        for (k = 0; k < b.length; k++) d = b[k][0],
        c = b[k][1],
        this._loadCount[d + "_" + c + "_" + b[k][2]] = false;
        for (k = 0; k < b.length; k++) d = b[k][0],
        c = b[k][1],
        this.showTile(d, c, a)
    };
    da.prototype.showTile = function(c, a, b) {
        this._parseDataAndDraw(c, a, b)
    };
    da.prototype.drawCurrentData = function() {
        this.clear();
        for (var c = [], a = 0; a < this.tilesOrder.length; a++) {
            var b = this.tilesOrder[a][0],
            d = this.tilesOrder[a][1],
            e = this.tilesOrder[a][2],
            g = this.cache[this.getCacheKey(b, d, e)];
            if (g) for (b = this._drawFeatures(g, b, d, e), d = 0; d < b.length; d++) c.push(b[d])
        }
        this.lineLayer.setData(c)
    };
    da.prototype.isAllLoaded = function() {
        var c = true,
        a;
        for (a in this._loadCount) if (!this._loadCount[a]) {
            c = false;
            break
        }
        return c
    };
    da.prototype.getCacheKey = function(c, a, b) {
        return c + "_" + a + "_" + b
    };
    da.prototype.getDataZoom = function() {
        var c = Math.round(this.map.getZoom());
        19 < c && (c = 19);
        return c
    };
    da.prototype._parseDataAndDraw = function(c, a, b) {
        var d = this,
        e = d.map,
        g = e.getCenter(),
        h = Math.round(e.getZoom()),
        k = this.getCacheKey(c, a, b),
        l = "_cbk" + (1E5 * Math.random()).toFixed(0),
        m = this.getTileUrl(c, a, b, "BMapGL." + l);
        BMapGL[l] = function(m) {
            d._loadCount[c + "_" + a + "_" + b] = true;
            var n = e.getCenter(),
            p = Math.round(e.getZoom());
            n.equals(g) && p === h ? (n = m.content && m.content.tf, m.data && (n = m.data), d.cache[k] = n ? {
                traffic: n,
                precision: m.precision
            }: null, d.drawTogether && d.isAllLoaded() && d.drawCurrentData()) : p !== h && d.clear();
            delete BMapGL[l]
        };
        undefined !== d.cache[k] ? (d._loadCount[c + "_" + a + "_" + b] = true, d.drawTogether && d.isAllLoaded() && d.drawCurrentData()) : this.request(m)
    };
    da.prototype.getTileUrl = function(c, a, b, d) {
        return "https://sp3.baidu.com/7_AZsjOpB1gCo2Kml5_Y_DAcsMJiwa/traffic/?qt=vtraffic&x=" + c + "&y=" + a + "&z=" + b + "&fn=" + d + "&t=" + (new Date).getTime()
    };
    da.prototype._drawFeatures = function(c, a, b, d) {
        var e = 10;
        d = Math.pow(2, 18 - d);
        this.map.getCenter();
        var g = this.tileSize;
        a = [a * g * d, (b + 1) * g * d];
        b = [];
        if (c && c.traffic) {
            e *= c.precision;
            c = c.traffic;
            g = 0;
            for (var h = c.length; g < h; g++) {
                var k = c[g],
                l = k[1];
                k = this.arrFeatureStyles[k[3]];
                var m = l[0] / e,
                p = -l[1] / e,
                n = [];
                n.push([a[0] + m * d, a[1] + p * d]);
                for (var r = 2,
                q = l.length; r < q; r += 2) m += l[r] / e,
                p -= l[r + 1] / e,
                n.push([a[0] + m * d, a[1] + p * d, 1]);
                b.push({
                    color: k[1],
                    geometry: {
                        type: "LineString",
                        coordinates: n
                    }
                })
            }
        }
        return b
    };
    da.prototype.request = function(c, a) {
        if (a) {
            var b = (1E5 * Math.random()).toFixed(0);
            BMapGL._rd["_cbk" + b] = function(c) {
                a && a(c);
                delete BMapGL._rd["_cbk" + b]
            };
            c += "&callback=BMapGL._rd._cbk" + b
        }
        var d = document.createElement("script");
        d.type = "text/javascript";
        d.charset = "utf-8";
        d.src = c;
        d.addEventListener ? d.addEventListener("load",
        function(a) {
            a = a.target;
            a.parentNode.removeChild(a)
        },
        false) : d.attachEvent && d.attachEvent("onreadystatechange",
        function(a) {
            a = window.event.srcElement; ! a || "loaded" !== a.readyState && "complete" !== a.readyState || a.parentNode.removeChild(a)
        });
        setTimeout(function() {
            document.getElementsByTagName("head")[0].appendChild(d);
            d = null
        },
        1)
    };
    da.prototype.getRGBA = function(c) {
        c >>>= 0;
        return "rgba(" + (c >> 24 & 255) + "," + (c >> 16 & 255) + "," + (c >> 8 & 255) + "," + (c & 255) / 256 + ")"
    };
    da.prototype.getLineCap = function(c) {
        return ["butt", "square", "round"][c]
    };
    da.prototype.getLineJoin = function(c) {
        return ["miter", "bevel", "round"][c]
    };
    var Ej = function(c) {
        function a(b) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b));
            b.autoUpdate = true;
            b.getOptions();
            var c = new LineFlowLayer({
                color: "rgba(257, 254, 47, 0.9)",
                minZoom: 18,
                duration: .8,
                interval: .2,
                trailLength: .4
            }),
            e = new Mf({
                height: 5,
                color: "rgba(257, 254, 47, 0.9)",
                trailLength: 2,
                step: .02,
                startTime: 0,
                endTime: 4
            });
            b.lineLayer = c;
            b.wallTripLayer = e;
            b.children = [c, e];
            return b
        }
        R(a, c);
        M(a, [{
            key: "initialize",
            value: function(b) {
                Ya(a.prototype.__proto__ || N(a.prototype), "initialize", this).call(this, b);
                b = this.map.map;
                var c = new da({});
                c.lineLayer = this.lineLayer;
                c.wallTripLayer = this.wallTripLayer;
                this.trafficTileManager = c;
                c.setMap(b);
                c.update();
                b.addEventListener("moveend",
                function() {
                    c.update()
                });
                b.addEventListener("zoomend",
                function() {
                    c.update()
                });
                b.addEventListener("ondraw",
                function() {})
            }
        },
        {
            key: "onOptionsChanged",
            value: function(a) {}
        },
        {
            key: "onDataChanged",
            value: function(a) {}
        },
        {
            key: "getDefaultOptions",
            value: function() {
                return {}
            }
        }]);
        return a
    } (pb),
    Fj = function(c) {
        function a(b, c) {
            I(this, a);
            b = Q(this, (a.__proto__ || N(a)).call(this, b, c));
            b.bufferData = [];
            return b
        }
        R(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    size: 13,
                    unit: "px",
                    height: 0,
                    max: 100,
                    min: 0
                }
            }
        },
        {
            key: "initialize",
            value: function(a) {
                var b = this;
                this.gl = a;
                var c = this.getOptions();
                this.inverseMatrix = E.create(Float64Array);
                this.frameBuffer = new FrameBufferObject(a);
                this.webglLayer.map.onResize(function() {
                    b.frameBuffer = new FrameBufferObject(a)
                });
                this.circle = Vg(64);
                this.circleTexture = tb(a, this.circle, {
                    TEXTURE_MAG_FILTER: "LINEAR",
                    TEXTURE_MIN_FILTER: "LINEAR",
                    TEXTURE_WRAP_S: "CLAMP_TO_EDGE",
                    TEXTURE_WRAP_T: "CLAMP_TO_EDGE"
                });
                this.intensity = new oa({
                    gradient: c.gradient
                });
                this.paletteTexture = tb(a, this.intensity.paletteCtx.canvas, {
                    TEXTURE_MAG_FILTER: "LINEAR",
                    TEXTURE_MIN_FILTER: "LINEAR",
                    TEXTURE_WRAP_S: "CLAMP_TO_EDGE",
                    TEXTURE_WRAP_T: "CLAMP_TO_EDGE"
                });
                this.offlineProgram = new Program(this.gl, {
                    vertexShader: "uniform mat4 u_matrix;uniform mat4 pointToPixelMatrix;uniform mat4 pixelToViewMatrix;uniform mat4 projectionMatrix;uniform int unit;uniform float size;uniform float max;uniform float min;attribute vec3 aPos;attribute vec2 aOffset;attribute float aCount;varying vec2 vOffset;varying float vCount;varying vec3 vPosition;void main(){vOffset=aOffset;vCount=(aCount-min)/(max-min);if(unit==1){vec2 pos=(pointToPixelMatrix*vec4(aPos.xy,0.0,1.0)).xy+aOffset.xy*size/2.0;gl_Position=projectionMatrix*pixelToViewMatrix*vec4(pos,0.0,1.0);}else{vec2 pos=aPos.xy+aOffset.xy*size;gl_Position=u_matrix*vec4(pos,0.0,1.0);}vPosition=vec3(gl_Position.z/gl_Position.w);}",
                    fragmentShader: "varying vec2 vOffset;varying float vCount;varying vec3 vPosition;uniform sampler2D uCircle;void main(){vec4 circle=texture2D(uCircle,(vOffset+1.0)/2.0);float intensity=circle.a*vCount;if(intensity<=0.0){discard;}gl_FragColor=vec4(vPosition,intensity);}"
                },
                this);
                this.offlineBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.offlineIndexBuffer = new Buffer({
                    gl: a,
                    target: "ELEMENT_ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.offlineVertexArray = new VertexArray({
                    gl: a,
                    program: this.offlineProgram,
                    attributes: [{
                        stride: 24,
                        name: "aPos",
                        buffer: this.offlineBuffer,
                        size: 3,
                        type: "FLOAT",
                        offset: 0
                    },
                    {
                        stride: 24,
                        name: "aOffset",
                        buffer: this.offlineBuffer,
                        size: 2,
                        type: "FLOAT",
                        offset: 12
                    },
                    {
                        stride: 24,
                        name: "aCount",
                        buffer: this.offlineBuffer,
                        size: 1,
                        type: "FLOAT",
                        offset: 20
                    }]
                });
                this.indexBuffer = new Buffer({
                    gl: a,
                    target: "ELEMENT_ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.program = new Program(this.gl, {
                    vertexShader: "attribute vec2 aPos;varying vec2 vPos;uniform float uHeight;uniform mat4 pixelToViewMatrix;uniform mat4 projectionMatrix;uniform sampler2D u_sampler;uniform mat4 inverseMatrix;void main(){vPos=aPos;if(uHeight<=0.0){gl_Position=vec4(aPos,0.0,1.0);}else{vec4 gray=texture2D(u_sampler,(aPos+1.0)/2.0);vec4 m0=inverseMatrix*vec4(aPos.xy,0.0,1.0);vec4 m1=inverseMatrix*vec4(aPos.xy,1.0,1.0);m0/=m0.w;m1/=m1.w;vec4 pixel=m0+(-m0.z/(m1.z-m0.z))*(m1-m0);pixel.z=uHeight*gray.a;gl_Position=projectionMatrix*pixelToViewMatrix*vec4(pixel.xyz,1.0);}}",
                    fragmentShader: "uniform sampler2D u_sampler;uniform sampler2D u_samplerPalette;uniform float uHeight;varying vec2 vPos;void main(){vec4 gray=texture2D(u_sampler,(vPos+1.0)/2.0);float grayAlpha=gray.a;if(grayAlpha<=0.0){discard;}vec4 color=texture2D(u_samplerPalette,vec2(grayAlpha,1.0));gl_FragColor=vec4(color.rgb,grayAlpha);}"
                },
                this);
                this.buffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                });
                this.vertexArray = new VertexArray({
                    gl: a,
                    program: this.program,
                    attributes: [{
                        stride: 8,
                        name: "aPos",
                        buffer: this.buffer,
                        size: 2,
                        type: "FLOAT",
                        offset: 0
                    }]
                });
                c = [];
                for (var g = [], h = Math.floor(a.canvas.width / 4), k = Math.floor(a.canvas.height / 4), l = h + 1, m = 0; m <= k; m++) for (var p = 0; p <= h; p++) if (c.push(2 * p / h - 1, 2 * m / k - 1), p < h && m < k) {
                    var n = l * m + p,
                    r = l * (m + 1) + p;
                    g.push(n, n + 1, r + 1);
                    g.push(n, r + 1, r)
                }
                this.bufferData = c;
                this.buffer.updateData(new Float32Array(c));
                this.indexData = g;
                this.indexBuffer.updateData(new Uint32Array(g))
            }
        },
        {
            key: "onOptionsChanged",
            value: function(a, c) {
                var b = this.gl;
                b && a.gradient !== c.gradient && (this.intensity = new oa({
                    gradient: a.gradient
                }), this.paletteTexture = tb(b, this.intensity.paletteCtx.canvas, {
                    TEXTURE_MAG_FILTER: "LINEAR",
                    TEXTURE_MIN_FILTER: "LINEAR",
                    TEXTURE_WRAP_S: "CLAMP_TO_EDGE",
                    TEXTURE_WRAP_T: "CLAMP_TO_EDGE"
                }))
            }
        },
        {
            key: "onDataChanged",
            value: function(a) {
                if (this.gl) {
                    var b = [],
                    c = [];
                    this.getOptions();
                    for (var g = 0; g < a.length; g++) {
                        var h = a[g],
                        k = this.normizedPoint(a[g].geometry.coordinates),
                        l = undefined === h.count ? 1 : h.count;
                        "properties" in h && "count" in h.properties && (l = h.properties.count);
                        b.push(k[0], k[1], k[2]);
                        b.push( - 1, -1);
                        b.push(l);
                        b.push(k[0], k[1], k[2]);
                        b.push( - 1, 1);
                        b.push(l);
                        b.push(k[0], k[1], k[2]);
                        b.push(1, 1);
                        b.push(l);
                        b.push(k[0], k[1], k[2]);
                        b.push(1, -1);
                        b.push(l);
                        h = 4 * g;
                        c.push(h + 0, h + 2, h + 1);
                        c.push(h + 0, h + 3, h + 2)
                    }
                    this.offlineBufferData = b;
                    this.offlineIndexData = c;
                    this.offlineBuffer.updateData(new Float32Array(b));
                    this.offlineIndexBuffer.updateData(new Uint32Array(c))
                }
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl,
                c = a.matrix,
                g = a.pointToPixelMatrix,
                h = a.pixelToViewMatrix;
                a = a.projectionMatrix;
                if (this.offlineBufferData && !(0 >= this.offlineBufferData.length)) {
                    var k = this.getOptions();
                    b.enable(b.BLEND);
                    b.disable(b.DEPTH_TEST);
                    b.blendFunc(b.ONE, b.ONE);
                    b.bindFramebuffer(b.FRAMEBUFFER, this.frameBuffer.framebuffer);
                    b.clearColor(0, 0, 0, 0);
                    b.clear(b.COLOR_BUFFER_BIT);
                    this.offlineProgram.use(b);
                    this.offlineProgram.setUniforms({
                        u_matrix: c,
                        uCircle: this.circleTexture,
                        pointToPixelMatrix: g,
                        pixelToViewMatrix: h,
                        projectionMatrix: a,
                        unit: "px" === k.unit ? 1 : 0,
                        size: k.size,
                        max: k.max,
                        min: k.min
                    });
                    this.offlineVertexArray.bind();
                    this.offlineIndexBuffer.bind();
                    b.drawElements(b.TRIANGLES, this.offlineIndexData.length, b.UNSIGNED_INT, 0);
                    b.bindFramebuffer(b.FRAMEBUFFER, null);
                    this.program.use(b);
                    this.vertexArray.bind();
                    c = this.inverseMatrix;
                    E.identity(c);
                    E.multiply(c, a, h);
                    E.invert(c, c);
                    b.enable(b.DEPTH_TEST);
                    b.disable(b.BLEND);
                    this.program.setUniforms({
                        u_sampler: this.frameBuffer.framebuffer.texture,
                        u_samplerPalette: this.paletteTexture,
                        uHeight: k.height,
                        pixelToViewMatrix: h,
                        inverseMatrix: c,
                        projectionMatrix: a
                    });
                    this.indexBuffer.bind();
                    b.drawElements(b.TRIANGLES, this.indexData.length, b.UNSIGNED_INT, 0)
                }
            }
        }]);
        return a
    } (Layer),
    Gj = function() {
        function c(a) {
            I(this, c);
            this.layers = [];
            this.options = a;
            this.webglLayer = a.webglLayer
        }
        M(c, [{
            key: "addLayer",
            value: function(a) {
                for (var b = false,
                c = 0; c < this.layers.length; c++) if (this.layers[c] === a) {
                    b = true;
                    break
                }
                b || (a.map = this.webglLayer.map, "threeLayer" === a.layerType ? (a.setWebglLayer(this.webglLayer), b = a.getThreeLayer(), this.addLayer(b), a.initialize && a.initialize(b)) : (a.setWebglLayer(this.webglLayer), a.commonInitialize && a.commonInitialize(this.webglLayer.gl), a.initialize && a.initialize(this.webglLayer.gl), a.onOptionsChanged(a.getOptions(), {}), a.onDataChanged(a.getData()), a.onChanged(a.getOptions(), a.getData())), this.layers.push(a));
                this.options.autoUpdate && (this.isRequestAnimation() ? this.webglLayer.startAnimation() : this.webglLayer.stopAnimation());
                this.webglLayer.render()
            }
        },
        {
            key: "removeLayer",
            value: function(a) {
                for (var b = 0; b < this.layers.length; b++) this.layers[b] === a && (a.destroy && a.destroy(), this.layers.splice(b, 1));
                this.options.autoUpdate && (this.isRequestAnimation() ? this.webglLayer.startAnimation() : this.webglLayer.stopAnimation());
                this.webglLayer.render()
            }
        },
        {
            key: "removeAllLayers",
            value: function() {
                for (var a = 0; a < this.layers.length; a++) {
                    var b = this.layers[a];
                    b.destroy && b.destroy();
                    this.layers.splice(a, 1)
                }
                this.webglLayer.render()
            }
        },
        {
            key: "getAllLayers",
            value: function() {
                return this.layers
            }
        },
        {
            key: "getAllThreeLayers",
            value: function() {
                for (var a = [], b = 0; b < this.layers.length; b++) {
                    var c = this.layers[b];
                    "ThreeLayer" === c.layerType && a.push(c)
                }
                return a
            }
        },
        {
            key: "isRequestAnimation",
            value: function() {
                for (var a = false,
                b = 0; b < this.layers.length; b++) if (this.layers[b].isRequestAnimation()) {
                    a = true;
                    break
                }
                return a
            }
        },
        {
            key: "beforeRender",
            value: function(a) {
                a.gl && this.webglLayer.stateManager.save()
            }
        },
        {
            key: "afterRender",
            value: function(a) {
                a.gl && this.webglLayer.stateManager.restore()
            }
        },
        {
            key: "renderGLLayers",
            value: function(a) {
                this.webglLayer.stateManager.save();
                this.webglLayer.stateManager.setDefaultState();
                for (var b = 0; b < this.layers.length; b++) {
                    var c = this.layers[b];
                    "threeLayer" !== c.layerType && "ThreeLayer" !== c.layerType && (this.beforeRender(a), a.gl.enable(a.gl.DEPTH_TEST), a.gl.depthFunc(a.gl.LEQUAL), a.gl.enable(a.gl.POLYGON_OFFSET_FILL), a.gl.polygonOffset(1, 1), c.render(a), this.afterRender(a))
                }
                this.webglLayer.stateManager.restore()
            }
        },
        {
            key: "renderThreeLayer",
            value: function(a) {
                for (var b = 0; b < this.layers.length; b++) {
                    var c = this.layers[b];
                    "ThreeLayer" === c.layerType && c.render(a)
                }
            }
        },
        {
            key: "renderThreeLayers",
            value: function(a) {
                for (var b = 0; b < this.layers.length; b++) {
                    var c = this.layers[b];
                    "threeLayer" === c.layerType && (this.beforeRender(a), c.render(a), this.afterRender(a))
                }
            }
        },
        {
            key: "onClick",
            value: function(a) {
                for (var b = 0; b < this.layers.length; b++) {
                    var c = this.layers[b];
                    if ("threeLayer" !== c.layerType && "ThreeLayer" !== c.layerType && c.options.enablePicked && c.options.onClick && c.pick) {
                        var e = c.pick(a.x, a.y);
                        c.options.onClick(e, a)
                    }
                }
            }
        },
        {
            key: "onDblClick",
            value: function(a) {
                for (var b = 0; b < this.layers.length; b++) {
                    var c = this.layers[b];
                    if ("threeLayer" !== c.layerType && "ThreeLayer" !== c.layerType && c.options.enablePicked && c.options.onDblClick && c.pick) {
                        var e = c.pick(a.x, a.y);
                        c.options.onDblClick(e, a)
                    }
                }
            }
        },
        {
            key: "onRightClick",
            value: function(a) {
                for (var b = 0; b < this.layers.length; b++) {
                    var c = this.layers[b];
                    if ("threeLayer" !== c.layerType && "ThreeLayer" !== c.layerType && c.options.enablePicked && c.options.onRightClick && c.pick) {
                        var e = c.pick(a.x, a.y);
                        c.options.onRightClick(e, a)
                    }
                }
            }
        },
        {
            key: "onMousemove",
            value: function(a) {
                for (var b = false,
                c = 0; c < this.layers.length; c++) {
                    var e = this.layers[c];
                    if ("threeLayer" !== e.layerType && "ThreeLayer" !== e.layerType && e.options.enablePicked && e.pick) {
                        var g = e.pick(a.x, a.y);
                        this.webglLayer.map.map.platform.style.cursor = -1 === g.dataIndex ? "default": "pointer";
                        if (e.options.onMousemove) e.options.onMousemove(g, a);
                        e.options.autoSelect && (b = true)
                    }
                }
                b && (this.webglLayer.isAnimation || this.webglLayer.render())
            }
        }]);
        return c
    } (),
    View = function() {
        function c(a) {
            var b = this;
            I(this, c);
            this.options = {
                autoUpdate: true
            };
            Object.assign(this.options, a);
            var d = a.pointOffset;
            this.webglLayer = a.webglLayer || new WebglLayer(a.map, this.options);
            this.layerManager = new Gj({
                autoUpdate: this.options.autoUpdate,
                webglLayer: this.webglLayer
            });
            this.effectManager = new EffectManager(this.webglLayer.gl);
            this.webglRender = {
                render: function() {}
            };
            this.options.effects && this.effectManager.setEffects([this.webglRender].concat(this.options.effects));
            this.webglLayer.onRender(function(a) {
                b._render(a)
            });
            this.webglLayer.onClick = function(a) {
                b.layerManager.onClick(a)
            };
            this.webglLayer.onDblClick = function(a) {
                b.layerManager.onDblClick(a)
            };
            this.webglLayer.onRightClick = function(a) {
                b.layerManager.onRightClick(a)
            };
            this.webglLayer.onMousemove = function(a) {
                b.layerManager.onMousemove(a)
            };
            d || "cesium" === this.webglLayer.options.mapType || (d = this.webglLayer.map.getCenter(), this.webglLayer.options.pointOffset = [d.lng, d.lat]);
            this.webglLayer.map.onResize(function() {
                b.effectManager.onResize()
            });
            if (this.postProcessing = a.postProcessing) this.postProcessing.setWebglLayer(this.webglLayer),
            a = this.postProcessing.getThreeLayer(),
            this.addLayer(a),
            this.postProcessing.initialize(a),
            a.postProcessing = this.postProcessing
        }
        M(c, [{
            key: "renderCanvas",
            value: function(a) {
                var b = this;
                this.postProcessing ? (this.postProcessing.addRender(function() {
                    b.renderGLLayers(a)
                }), this.layerManager.renderThreeLayers(a), this.layerManager.renderThreeLayer(a)) : (this.layerManager.renderThreeLayers(a), this.layerManager.renderThreeLayer(a), this.layerManager.renderGLLayers(a))
            }
        },
        {
            key: "render",
            value: function() {
                this.webglLayer.render()
            }
        },
        {
            key: "_render",
            value: function(a) {
                var b = this,
                c = this.options.effects;
                c && 0 < c.length ? (this.webglRender.render = function() {
                    b.renderCanvas(a)
                },
                this.effectManager.render()) : (this.webglLayer.saveFramebuffer(), this.renderCanvas(a), this.webglLayer.restoreFramebuffer())
            }
        },
        {
            key: "onRender",
            value: function(a) {
                this.webglLayer.onRender(a)
            }
        },
        {
            key: "destroy",
            value: function() {
                this.stopAnimation();
                this.layerManager.removeAllLayers();
                this.webglLayer.destroy()
            }
        },
        {
            key: "isRequestAnimation",
            value: function() {
                return this.layerManager.isRequestAnimation()
            }
        },
        {
            key: "startAnimation",
            value: function() {
                this.webglLayer.startAnimation()
            }
        },
        {
            key: "stopAnimation",
            value: function() {
                this.webglLayer.stopAnimation()
            }
        },
        {
            key: "addLayer",
            value: function(a) {
                this.layerManager.addLayer(a)
            }
        },
        {
            key: "removeLayer",
            value: function(a) {
                this.layerManager.removeLayer(a)
            }
        },
        {
            key: "getAllLayers",
            value: function() {
                return this.layerManager.getAllLayers()
            }
        },
        {
            key: "getAllThreeLayers",
            value: function() {
                return this.layerManager.getAllThreeLayers()
            }
        }]);
        return c
    } ();
    window._hmt = window._hmt || []; (function() {
        var c = document.createElement("script");
        c.src = "https://hm.baidu.com/hm.js?e8002ef3d9e0d8274b5b74cc4a027d08";
        var a = document.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(c, a)
    })();
    z.View = View;
    z.CircleLayer = function b(a) {
        I(this, b);
        return ni.includes(a.type) ? new mi(a) : new li(a)
    };
    z.GridLayer = GridLayer;
    z.HeatGridLayer = HeatGridLayer;
    z.ShapeLayer = ShapeLayer;
    z.SimpleLineLayer = SimpleLineLayer;
    z.LineLayer3D = LineLayer3D;
    z.LineLayer = LineLayer;
    z.WallSpriteLayer = Mf;
    z.LinePointLayer = qb;
    z.WallLayer = Gi;
    z.WallTripLayer = Ii;
    z.HeatLineLayer = Ji;
    z.HoneycombLayer = Li;
    z.WebglLayer = WebglLayer;
    z.PointLayer = PointLayer;
    z.GroundRippleLayer = GroundRippleLayer;
    z.RippleLayer = RippleLayer;
    z.SparkLayer = SparkLayer;
    z.ClusterLayer = ClusterLayer;
    z.HeatPointLayer = HeatPointLayer;
    z.ShapeLineLayer = ShapeLineLayer;
    z.PointTripLayer = PointTripLayer;
    z.LineTripLayer = LineTripLayer;
    z.LineFlowLayer = LineFlowLayer;
    z.TileLayer = TileLayer;
    z.IconLayer = IconLayer;
    z.PolygonLayer = PolygonLayer;
    z.CarLineLayer = CarLineLayer;
    z.Layer = Layer;
    z.TextLayer = Od;
    z.TrafficLayer = Ej;
    z.GltfLayer = wg;
    z.HeatmapLayer = Fj;
    z.BlurEffect = hi;
    z.BloomEffect = BloomEffect;
    z.BrightEffect = ji;
    z.DepthEffect = ki;
    z.EffectManager = EffectManager;
    z.getContext = he;
    z.createTexture = tb;
    z.loadTextureImage = Ma;
    z.FrameBufferObject = FrameBufferObject;
    z.Program = Program;
    z.StateManager = wf;
    z.Buffer = Buffer;
    z.VertexArray = VertexArray;
    z.CommonLayer = CommonLayer;
    z.MercatorProjection = MercatorProjection;
    z.Canvas = $c;
    z.Intensity = oa;
    z.BezierCurve = BezierCurve;
    z.GeodesicCurve = GeodesicCurve;
    z.OdCurve = OdCurve;
    z.utilCity = {
        getProvinceNameByCityName: function(a) {
            for (var b = 0; b < ob.length; b++) for (var d = ob[b].n, e = ob[b].cities, g = 0; g < e.length; g++) if (e[g].n == a) return d;
            return null
        },
        getCenterByCityName: function(a) {
            a = a.replace("\u5e02", "");
            for (var b = 0; b < Ed.length; b++) if (Ed[b].n == a) return mc(Ed[b].g);
            for (b = 0; b < Fd.length; b++) if (Fd[b].n == a) return mc(Fd[b].g);
            for (b = 0; b < ob.length; b++) {
                if (ob[b].n == a) return mc(ob[b].g);
                for (var d = ob[b].cities, e = 0; e < d.length; e++) if (d[e].n == a) return mc(d[e].g)
            }
            return null
        }
    };
    z.toRadian = toRadian;
    z.toAngle = toAngle;
    z.ceilPowerOfTwo = Kb;
    z.floorPowerOfTwo = Xc;
    z.approximatelyEqual = Yc;
    z.__moduleExports = Fa;
    z.vec4 = Ga;
    z.vec3 = L;
    z.vec2 = P;
    z.quat2 = pi;
    z.quat = vc;
    z.mat4 = E;
    z.mat3 = qi;
    z.mat2d = ri;
    z.mat2 = si;
    z.glMatrix = ti;
    Object.defineProperty(z, "__esModule", {
        value: true
    })
});