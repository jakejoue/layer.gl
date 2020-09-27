(function(x, Q) {
    "object" === typeof exports && "undefined" !== typeof module ? Q(exports) : "function" === typeof define && define.amd ? define(["exports"], Q) : (x = x || self, Q(x.mapvgl = {}))
})(this,
function(x) {
    function Q(f) {
        return f && f.__esModule && Object.prototype.hasOwnProperty.call(f, "default") ? f["default"] : f
    }
    function O(f, c) {
        return c = {
            exports: {}
        },
        f(c, c.exports),
        c.exports
    }
    function pg(f, c) {
        return function(a) {
            return c(f(a))
        }
    }
    function qg(f) {
        var c = function(a) {
            if (void 0 === a || null === a) return a;
            1 < arguments.length && (a = Array.prototype.slice.call(arguments));
            return f(a)
        };
        "conversion" in f && (c.conversion = f.conversion);
        return c
    }
    function rg(f) {
        var c = function(a) {
            if (void 0 === a || null === a) return a;
            1 < arguments.length && (a = Array.prototype.slice.call(arguments));
            var b = f(a);
            if ("object" === ("undefined" === typeof b ? "undefined": qb(b))) for (var d = b.length,
            c = 0; c < d; c++) b[c] = Math.round(b[c]);
            return b
        };
        "conversion" in f && (c.conversion = f.conversion);
        return c
    }
    function fa(f, c) {
        if (! (this instanceof fa)) return new fa(f, c);
        c && c in ae && (c = null);
        if (c && !(c in xa)) throw Error("Unknown model: " + c);
        if ("undefined" === typeof f) this.model = "rgb",
        this.color = [0, 0, 0],
        this.valpha = 1;
        else if (f instanceof fa) this.model = f.model,
        this.color = f.color.slice(),
        this.valpha = f.valpha;
        else if ("string" === typeof f) {
            c = Jb.get(f);
            if (null === c) throw Error("Unable to parse color from string: " + f);
            this.model = c.model;
            var a = xa[this.model].channels;
            this.color = c.value.slice(0, a);
            this.valpha = "number" === typeof c.value[a] ? c.value[a] : 1
        } else if (f.length) this.model = c || "rgb",
        a = xa[this.model].channels,
        c = Rc.call(f, 0, a),
        this.color = Sc(c, a),
        this.valpha = "number" === typeof f[a] ? f[a] : 1;
        else if ("number" === typeof f) f &= 16777215,
        this.model = "rgb",
        this.color = [f >> 16 & 255, f >> 8 & 255, f & 255],
        this.valpha = 1;
        else {
            this.valpha = 1;
            c = Ea(f);
            "alpha" in f && (c.splice(c.indexOf("alpha"), 1), this.valpha = "number" === typeof f.alpha ? f.alpha: 0);
            c = c.sort().join("");
            if (! (c in Tc)) throw Error("Unable to parse color from object: " + sg(f));
            this.model = Tc[c];
            a = xa[this.model].labels;
            var b = [];
            for (c = 0; c < a.length; c++) b.push(f[a[c]]);
            this.color = Sc(b)
        }
        if (lc[this.model]) for (a = xa[this.model].channels, c = 0; c < a; c++)(f = lc[this.model][c]) && (this.color[c] = f(this.color[c]));
        this.valpha = Math.max(0, Math.min(1, this.valpha));
        be && be(this)
    }
    function tg(f) {
        return function(c) {
            return Number(c.toFixed(f))
        }
    }
    function aa(f, c, a) {
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
    function ha(f) {
        return function(c) {
            return Math.max(0, Math.min(f, c))
        }
    }
    function Sc(f, c) {
        for (var a = 0; a < c; a++)"number" !== typeof f[a] && (f[a] = 0);
        return f
    }
    function toRadian(f) {
        return f * Math.PI / 180
    }
    function toAngle(f) {
        return f / Math.PI * 180
    }
    function ceilPowerOfTwo(f) {
        return Math.pow(2, Math.ceil(Math.log(f) / Math.LN2))
    }
    function floorPowerOfTwo(f) {
        return Math.pow(2, Math.floor(Math.log(f) / Math.LN2))
    }
    function approximatelyEqual(f, c) {
        return 1E-8 > Math.abs(f - c)
    }
    function MercatorProjection() {}
    function Xc(f, c) {
        for (var a in c) f[a] = c[a]
    }
    function ya(f, c) {
        this.lng = f;
        this.lat = c
    }
    function ce(f, c) {
        this.x = f;
        this.y = c
    }
    function Canvas(f, c) {
        var a = document.createElement("canvas");
        f && (a.width = f);
        c && (a.height = c);
        return a
    }
    function Intensity(f) {
        f = f || {};
        this.gradient = f.gradient || {
            "0.25": "rgba(0, 0, 255, 1)",
            "0.55": "rgba(0, 255, 0, 1)",
            "0.85": "rgba(255, 255, 0, 1)",
            1 : "rgba(255, 0, 0, 1)"
        };
        this.maxSize = void 0 === f.maxSize ? 35 : f.maxSize;
        this.minSize = f.minSize || 0;
        this.max = f.max || 100;
        this.min = f.min || 0;
        this.initPalette()
    }
    function BezierCurve(f) {
        this.options = f || {};
        this._initialize()
    }
    function Zc(f, c, a, b, d) {
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
    function de(f, c) {
        return f && c ? Math.round(Math.sqrt(Math.pow(f.lng - c.lng, 2) + Math.pow(f.lat - c.lat, 2))) : 0
    }
    function getContext(f) {
        for (var c = ["webgl2", "experimental-webgl2", "webgl", "experimental-webgl"], a, b = 0; b < c.length; b++) try {
            if (a = f.getContext(c[b], {
                premultipliedAlpha: false
            })) break
        } catch(d) {}
        return a
    }
    function createTexture(f, c, a) {
        a = T({
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
    function loadTextureImage(f, c, a, b) {
        if ("object" === ("undefined" === typeof c ? "undefined": qb(c))) c = createTexture(f, c, b),
        a(c, null);
        else {
            var d = new Image;
            d.crossOrigin = "anonymous";
            d.onload = function() {
                var c = floorPowerOfTwo(d.width),
                g = floorPowerOfTwo(d.height),
                k = document.createElement("canvas");
                k.width = c;
                k.height = g;
                k.getContext("2d").drawImage(d, 0, 0, c, g);
                d = k;
                c = createTexture(f, d, b);
                a(c, d)
            };
            d.src = c
        }
    }
    function Lb(f, c, a) {
        a = a || 2;
        var b = c && c.length,
        d = b ? c[0] * a: f.length,
        e = fe(f, 0, d, a, true),
        g = [];
        if (!e || e.next === e.prev) return g;
        var k;
        if (b) {
            var h = a;
            b = [];
            var l;
            var n = 0;
            for (l = c.length; n < l; n++) {
                var p = c[n] * h;
                var m = n < l - 1 ? c[n + 1] * h: f.length;
                p = fe(f, p, m, h, false);
                p === p.next && (p.steiner = true);
                b.push(ug(p))
            }
            b.sort(vg);
            for (n = 0; n < b.length; n++) {
                c = b[n];
                h = e;
                if (h = wg(c, h)) c = ge(h, c),
                Mb(c, c.next);
                e = Mb(e, e.next)
            }
        }
        if (f.length > 80 * a) {
            var q = k = f[0];
            var r = b = f[1];
            for (h = a; h < d; h += a) n = f[h],
            c = f[h + 1],
            n < q && (q = n),
            c < r && (r = c),
            n > k && (k = n),
            c > b && (b = c);
            k = Math.max(k - q, b - r);
            k = 0 !== k ? 1 / k: 0
        }
        Nb(e, g, a, q, r, k);
        return g
    }
    function fe(f, c, a, b, d) {
        if (d === 0 < $c(f, c, a, b)) for (d = c; d < a; d += b) var e = he(d, f[d], f[d + 1], e);
        else for (d = a - b; d >= c; d -= b) e = he(d, f[d], f[d + 1], e);
        e && fb(e, e.next) && (Ob(e), e = e.next);
        return e
    }
    function Mb(f, c) {
        if (!f) return f;
        c || (c = f);
        do {
            var a = false;
            if (f.steiner || !fb(f, f.next) && 0 !== ma(f.prev, f, f.next)) f = f.next;
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
                var k = f,
                h = k;
                do null === h.z && (h.z = ad(h.x, h.y, b, d, e)),
                h.prevZ = h.prev,
                h = h.nextZ = h.next;
                while (h !== k);
                h.prevZ.nextZ = null;
                h.prevZ = null;
                k = h;
                var l, n, p, m, q = 1;
                do {
                    h = k;
                    var r = k = null;
                    for (n = 0; h;) {
                        n++;
                        var u = h;
                        for (l = p = 0; l < q && (p++, u = u.nextZ, u); l++);
                        for (m = q; 0 < p || 0 < m && u;) 0 !== p && (0 === m || !u || h.z <= u.z) ? (l = h, h = h.nextZ, p--) : (l = u, u = u.nextZ, m--),
                        r ? r.nextZ = l: k = l,
                        l.prevZ = r,
                        r = l;
                        h = u
                    }
                    r.nextZ = null;
                    q *= 2
                } while ( 1 < n )
            }
            for (k = f; f.prev !== f.next;) {
                h = f.prev;
                u = f.next;
                if (e) r = xg(f, b, d, e);
                else a: if (r = f, n = r.prev, p = r, q = r.next, 0 <= ma(n, p, q)) r = false;
                else {
                    for (l = r.next.next; l !== r.prev;) {
                        if (sb(n.x, n.y, p.x, p.y, q.x, q.y, l.x, l.y) && 0 <= ma(l.prev, l, l.next)) {
                            r = false;
                            break a
                        }
                        l = l.next
                    }
                    r = true
                }
                if (r) c.push(h.i / a),
                c.push(f.i / a),
                c.push(u.i / a),
                Ob(f),
                k = f = u.next;
                else if (f = u, f === k) {
                    if (!g) Nb(Mb(f), c, a, b, d, e, 1);
                    else if (1 === g) {
                        g = c;
                        k = a;
                        h = f;
                        do u = h.prev,
                        r = h.next.next,
                        !fb(u, r) && ie(u, h, h.next, r) && Pb(u, r) && Pb(r, u) && (g.push(u.i / k), g.push(h.i / k), g.push(r.i / k), Ob(h), Ob(h.next), h = f = r),
                        h = h.next;
                        while (h !== f);
                        f = h;
                        Nb(f, c, a, b, d, e, 2)
                    } else if (2 === g) a: {
                        g = f;
                        do {
                            for (k = g.next.next; k !== g.prev;) {
                                if (h = g.i !== k.i) {
                                    h = g;
                                    u = k;
                                    if (r = h.next.i !== u.i && h.prev.i !== u.i) {
                                        b: {
                                            r = h;
                                            do {
                                                if (r.i !== h.i && r.next.i !== h.i && r.i !== u.i && r.next.i !== u.i && ie(r, r.next, h, u)) {
                                                    r = true;
                                                    break b
                                                }
                                                r = r.next
                                            } while ( r !== h );
                                            r = false
                                        }
                                        r = !r
                                    }
                                    if (r = r && Pb(h, u) && Pb(u, h)) {
                                        r = h;
                                        n = false;
                                        p = (h.x + u.x) / 2;
                                        u = (h.y + u.y) / 2;
                                        do r.y > u !== r.next.y > u && r.next.y !== r.y && p < (r.next.x - r.x) * (u - r.y) / (r.next.y - r.y) + r.x && (n = !n),
                                        r = r.next;
                                        while (r !== h);
                                        r = n
                                    }
                                    h = r
                                }
                                if (h) {
                                    f = ge(g, k);
                                    g = Mb(g, g.next);
                                    f = Mb(f, f.next);
                                    Nb(g, c, a, b, d, e);
                                    Nb(f, c, a, b, d, e);
                                    break a
                                }
                                k = k.next
                            }
                            g = g.next
                        } while ( g !== f )
                    }
                    break
                }
            }
        }
    }
    function xg(f, c, a, b) {
        var d = f.prev,
        e = f.next;
        if (0 <= ma(d, f, e)) return ! 1;
        var g = d.x > f.x ? d.x > e.x ? d.x: e.x: f.x > e.x ? f.x: e.x,
        k = d.y > f.y ? d.y > e.y ? d.y: e.y: f.y > e.y ? f.y: e.y,
        h = ad(d.x < f.x ? d.x < e.x ? d.x: e.x: f.x < e.x ? f.x: e.x, d.y < f.y ? d.y < e.y ? d.y: e.y: f.y < e.y ? f.y: e.y, c, a, b);
        c = ad(g, k, c, a, b);
        a = f.prevZ;
        for (b = f.nextZ; a && a.z >= h && b && b.z <= c;) {
            if (a !== f.prev && a !== f.next && sb(d.x, d.y, f.x, f.y, e.x, e.y, a.x, a.y) && 0 <= ma(a.prev, a, a.next)) return ! 1;
            a = a.prevZ;
            if (b !== f.prev && b !== f.next && sb(d.x, d.y, f.x, f.y, e.x, e.y, b.x, b.y) && 0 <= ma(b.prev, b, b.next)) return ! 1;
            b = b.nextZ
        }
        for (; a && a.z >= h;) {
            if (a !== f.prev && a !== f.next && sb(d.x, d.y, f.x, f.y, e.x, e.y, a.x, a.y) && 0 <= ma(a.prev, a, a.next)) return ! 1;
            a = a.prevZ
        }
        for (; b && b.z <= c;) {
            if (b !== f.prev && b !== f.next && sb(d.x, d.y, f.x, f.y, e.x, e.y, b.x, b.y) && 0 <= ma(b.prev, b, b.next)) return ! 1;
            b = b.nextZ
        }
        return ! 0
    }
    function vg(f, c) {
        return f.x - c.x
    }
    function wg(f, c) {
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
                    var k = a.x < a.next.x ? a: a.next
                }
            }
            a = a.next
        } while ( a !== c );
        if (!k) return null;
        if (b === e) return k.prev;
        c = k;
        g = k.x;
        var h = k.y,
        l = Infinity;
        for (a = k.next; a !== c;) {
            if (b >= a.x && a.x >= g && b !== a.x && sb(d < h ? b: e, d, g, h, d < h ? e: b, d, a.x, a.y)) {
                var n = Math.abs(d - a.y) / (b - a.x); (n < l || n === l && a.x > k.x) && Pb(a, f) && (k = a, l = n)
            }
            a = a.next
        }
        return k
    }
    function ad(f, c, a, b, d) {
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
    function ug(f) {
        var c = f,
        a = f;
        do {
            if (c.x < a.x || c.x === a.x && c.y < a.y) a = c;
            c = c.next
        } while ( c !== f );
        return a
    }
    function sb(f, c, a, b, d, e, g, k) {
        return 0 <= (d - g) * (c - k) - (f - g) * (e - k) && 0 <= (f - g) * (b - k) - (a - g) * (c - k) && 0 <= (a - g) * (e - k) - (d - g) * (b - k)
    }
    function ma(f, c, a) {
        return (c.y - f.y) * (a.x - c.x) - (c.x - f.x) * (a.y - c.y)
    }
    function fb(f, c) {
        return f.x === c.x && f.y === c.y
    }
    function ie(f, c, a, b) {
        return fb(f, c) && fb(a, b) || fb(f, b) && fb(a, c) ? true : 0 < ma(f, c, a) !== 0 < ma(f, c, b) && 0 < ma(a, b, f) !== 0 < ma(a, b, c)
    }
    function Pb(f, c) {
        return 0 > ma(f.prev, f, f.next) ? 0 <= ma(f, c, f.next) && 0 <= ma(f, f.prev, c) : 0 > ma(f, c, f.prev) || 0 > ma(f, f.next, c)
    }
    function ge(f, c) {
        var a = new bd(f.i, f.x, f.y),
        b = new bd(c.i, c.x, c.y),
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
    function he(f, c, a, b) {
        f = new bd(f, c, a);
        b ? (f.next = b.next, f.prev = b, b.next.prev = f, b.next = f) : (f.prev = f, f.next = f);
        return f
    }
    function Ob(f) {
        f.next.prev = f.prev;
        f.prev.next = f.next;
        f.prevZ && (f.prevZ.nextZ = f.nextZ);
        f.nextZ && (f.nextZ.prevZ = f.prevZ)
    }
    function bd(f, c, a) {
        this.i = f;
        this.x = c;
        this.y = a;
        this.nextZ = this.prevZ = this.z = this.next = this.prev = null;
        this.steiner = false
    }
    function $c(f, c, a, b) {
        for (var d = 0,
        e = a - b; c < a; c += b) d += (f[e] - f[c]) * (f[c + 1] + f[e + 1]),
        e = c;
        return d
    }
    function je(f) {
        try {
            return mc.createObjectURL(new Blob([f], {
                type: "application/javascript"
            }))
        } catch(a) {
            var c = new yg;
            c.append(f);
            return mc.createObjectURL(c.getBlob(type))
        }
    }
    function gb(f, c) {
        this.shapeLayer = f;
        this.gl = c;
        this.initData()
    }
    function ke() {
        cd = true;
        for (var f = 0; 64 > f; ++f) La[f] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [f],
        Aa["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(f)] = f;
        Aa[45] = 62;
        Aa[95] = 63
    }
    function zg(f, c, a) {
        for (var b = [], d = c; d < a; d += 3) c = (f[d] << 16) + (f[d + 1] << 8) + f[d + 2],
        b.push(La[c >> 18 & 63] + La[c >> 12 & 63] + La[c >> 6 & 63] + La[c & 63]);
        return b.join("")
    }
    function le(f) {
        cd || ke();
        for (var c = f.length,
        a = c % 3,
        b = "",
        d = [], e = 0, g = c - a; e < g; e += 16383) d.push(zg(f, e, e + 16383 > g ? g: e + 16383));
        1 === a ? (f = f[c - 1], b += La[f >> 2], b += La[f << 4 & 63], b += "==") : 2 === a && (f = (f[c - 2] << 8) + f[c - 1], b += La[f >> 10], b += La[f >> 4 & 63], b += La[f << 2 & 63], b += "=");
        d.push(b);
        return d.join("")
    }
    function nc(f, c, a, b, d) {
        var e = 8 * d - b - 1;
        var g = (1 << e) - 1,
        k = g >> 1,
        h = -7;
        d = a ? d - 1 : 0;
        var l = a ? -1 : 1,
        n = f[c + d];
        d += l;
        a = n & (1 << -h) - 1;
        n >>= -h;
        for (h += e; 0 < h; a = 256 * a + f[c + d], d += l, h -= 8);
        e = a & (1 << -h) - 1;
        a >>= -h;
        for (h += b; 0 < h; e = 256 * e + f[c + d], d += l, h -= 8);
        if (0 === a) a = 1 - k;
        else {
            if (a === g) return e ? NaN: Infinity * (n ? -1 : 1);
            e += Math.pow(2, b);
            a -= k
        }
        return (n ? -1 : 1) * e * Math.pow(2, a - b)
    }
    function me(f, c, a, b, d, e) {
        var g, k = 8 * e - d - 1,
        h = (1 << k) - 1,
        l = h >> 1,
        n = 23 === d ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        e = b ? 0 : e - 1;
        var p = b ? 1 : -1,
        m = 0 > c || 0 === c && 0 > 1 / c ? 1 : 0;
        c = Math.abs(c);
        isNaN(c) || Infinity === c ? (c = isNaN(c) ? 1 : 0, b = h) : (b = Math.floor(Math.log(c) / Math.LN2), 1 > c * (g = Math.pow(2, -b)) && (b--, g *= 2), c = 1 <= b + l ? c + n / g: c + n * Math.pow(2, 1 - l), 2 <= c * g && (b++, g /= 2), b + l >= h ? (c = 0, b = h) : 1 <= b + l ? (c = (c * g - 1) * Math.pow(2, d), b += l) : (c = c * Math.pow(2, l - 1) * Math.pow(2, d), b = 0));
        for (; 8 <= d; f[a + e] = c & 255, e += p, c /= 256, d -= 8);
        b = b << d | c;
        for (k += d; 0 < k; f[a + e] = b & 255, e += p, b /= 256, k -= 8);
        f[a + e - p] |= 128 * m
    }
    function Sa(f, c) {
        if ((w.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823) < c) throw new RangeError("Invalid typed array length");
        w.TYPED_ARRAY_SUPPORT ? (f = new Uint8Array(c), f.__proto__ = w.prototype) : (null === f && (f = new w(c)), f.length = c);
        return f
    }
    function w(f, c, a) {
        if (! (w.TYPED_ARRAY_SUPPORT || this instanceof w)) return new w(f, c, a);
        if ("number" === typeof f) {
            if ("string" === typeof c) throw Error("If encoding is specified then the first argument must be a string");
            return dd(this, f)
        }
        return ne(this, f, c, a)
    }
    function ne(f, c, a, b) {
        if ("number" === typeof c) throw new TypeError('"value" argument must not be a number');
        if ("undefined" !== typeof ArrayBuffer && c instanceof ArrayBuffer) {
            c.byteLength;
            if (0 > a || c.byteLength < a) throw new RangeError("'offset' is out of bounds");
            if (c.byteLength < a + (b || 0)) throw new RangeError("'length' is out of bounds");
            c = void 0 === a && void 0 === b ? new Uint8Array(c) : void 0 === b ? new Uint8Array(c, a) : new Uint8Array(c, a, b);
            w.TYPED_ARRAY_SUPPORT ? (f = c, f.__proto__ = w.prototype) : f = ed(f, c);
            return f
        }
        if ("string" === typeof c) {
            b = f;
            f = a;
            if ("string" !== typeof f || "" === f) f = "utf8";
            if (!w.isEncoding(f)) throw new TypeError('"encoding" must be a valid string encoding');
            a = oe(c, f) | 0;
            b = Sa(b, a);
            c = b.write(c, f);
            c !== a && (b = b.slice(0, c));
            return b
        }
        return Ag(f, c)
    }
    function pe(f) {
        if ("number" !== typeof f) throw new TypeError('"size" argument must be a number');
        if (0 > f) throw new RangeError('"size" argument must not be negative');
    }
    function dd(f, c) {
        pe(c);
        f = Sa(f, 0 > c ? 0 : fd(c) | 0);
        if (!w.TYPED_ARRAY_SUPPORT) for (var a = 0; a < c; ++a) f[a] = 0;
        return f
    }
    function ed(f, c) {
        var a = 0 > c.length ? 0 : fd(c.length) | 0;
        f = Sa(f, a);
        for (var b = 0; b < a; b += 1) f[b] = c[b] & 255;
        return f
    }
    function Ag(f, c) {
        if (Ma(c)) {
            var a = fd(c.length) | 0;
            f = Sa(f, a);
            if (0 === f.length) return f;
            c.copy(f, 0, 0, a);
            return f
        }
        if (c) {
            if ("undefined" !== typeof ArrayBuffer && c.buffer instanceof ArrayBuffer || "length" in c) return (a = "number" !== typeof c.length) || (a = c.length, a = a !== a),
            a ? Sa(f, 0) : ed(f, c);
            if ("Buffer" === c.type && qe(c.data)) return ed(f, c.data)
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
    }
    function fd(f) {
        if (f >= (w.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823)) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + (w.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823).toString(16) + " bytes");
        return f | 0
    }
    function Ma(f) {
        return ! (null == f || !f._isBuffer)
    }
    function oe(f, c) {
        if (Ma(f)) return f.length;
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
        case void 0:
            return oc(f).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return 2 * a;
        case "hex":
            return a >>> 1;
        case "base64":
            return re(f).length;
        default:
            if (b) return oc(f).length;
            c = ("" + c).toLowerCase();
            b = true
        }
    }
    function Bg(f, c, a) {
        var b = false;
        if (void 0 === c || 0 > c) c = 0;
        if (c > this.length) return "";
        if (void 0 === a || a > this.length) a = this.length;
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
            return se(this, c, a);
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
            return c = 0 === c && a === this.length ? le(this) : le(this.slice(c, a)),
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
    function hb(f, c, a) {
        var b = f[c];
        f[c] = f[a];
        f[a] = b
    }
    function te(f, c, a, b, d) {
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
        if (Ma(c)) return 0 === c.length ? -1 : ue(f, c, a, b, d);
        if ("number" === typeof c) return c &= 255,
        w.TYPED_ARRAY_SUPPORT && "function" === typeof Uint8Array.prototype.indexOf ? d ? Uint8Array.prototype.indexOf.call(f, c, a) : Uint8Array.prototype.lastIndexOf.call(f, c, a) : ue(f, [c], a, b, d);
        throw new TypeError("val must be string, number or Buffer");
    }
    function ue(f, c, a, b, d) {
        function e(a, b) {
            return 1 === g ? a[b] : a.readUInt16BE(b * g)
        }
        var g = 1,
        k = f.length,
        h = c.length;
        if (void 0 !== b && (b = String(b).toLowerCase(), "ucs2" === b || "ucs-2" === b || "utf16le" === b || "utf-16le" === b)) {
            if (2 > f.length || 2 > c.length) return - 1;
            g = 2;
            k /= 2;
            h /= 2;
            a /= 2
        }
        if (d) for (b = -1; a < k; a++) if (e(f, a) === e(c, -1 === b ? 0 : a - b)) {
            if ( - 1 === b && (b = a), a - b + 1 === h) return b * g
        } else - 1 !== b && (a -= a - b),
        b = -1;
        else for (a + h > k && (a = k - h); 0 <= a; a--) {
            k = true;
            for (b = 0; b < h; b++) if (e(f, a + b) !== e(c, b)) {
                k = false;
                break
            }
            if (k) return a
        }
        return - 1
    }
    function se(f, c, a) {
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
                var k = f[c + 1];
                128 === (k & 192) && (d = (d & 31) << 6 | k & 63, 127 < d && (e = d));
                break;
            case 3:
                k = f[c + 1];
                var h = f[c + 2];
                128 === (k & 192) && 128 === (h & 192) && (d = (d & 15) << 12 | (k & 63) << 6 | h & 63, 2047 < d && (55296 > d || 57343 < d) && (e = d));
                break;
            case 4:
                k = f[c + 1];
                h = f[c + 2];
                var l = f[c + 3];
                128 === (k & 192) && 128 === (h & 192) && 128 === (l & 192) && (d = (d & 15) << 18 | (k & 63) << 12 | (h & 63) << 6 | l & 63, 65535 < d && 1114112 > d && (e = d))
            }
            null === e ? (e = 65533, g = 1) : 65535 < e && (e -= 65536, b.push(e >>> 10 & 1023 | 55296), e = 56320 | e & 1023);
            b.push(e);
            c += g
        }
        f = b.length;
        if (f <= ve) b = String.fromCharCode.apply(String, b);
        else {
            a = "";
            for (c = 0; c < f;) a += String.fromCharCode.apply(String, b.slice(c, c += ve));
            b = a
        }
        return b
    }
    function ja(f, c, a) {
        if (0 !== f % 1 || 0 > f) throw new RangeError("offset is not uint");
        if (f + c > a) throw new RangeError("Trying to access beyond buffer length");
    }
    function sa(f, c, a, b, d, e) {
        if (!Ma(f)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (c > d || c < e) throw new RangeError('"value" argument is out of bounds');
        if (a + b > f.length) throw new RangeError("Index out of range");
    }
    function pc(f, c, a, b) {
        0 > c && (c = 65535 + c + 1);
        for (var d = 0,
        e = Math.min(f.length - a, 2); d < e; ++d) f[a + d] = (c & 255 << 8 * (b ? d: 1 - d)) >>> 8 * (b ? d: 1 - d)
    }
    function qc(f, c, a, b) {
        0 > c && (c = 4294967295 + c + 1);
        for (var d = 0,
        e = Math.min(f.length - a, 4); d < e; ++d) f[a + d] = c >>> 8 * (b ? d: 3 - d) & 255
    }
    function we(f, c, a, b, d, e) {
        if (a + b > f.length) throw new RangeError("Index out of range");
        if (0 > a) throw new RangeError("Index out of range");
    }
    function xe(f, c, a, b, d) {
        d || we(f, c, a, 4, 3.4028234663852886E38, -3.4028234663852886E38);
        me(f, c, a, b, 23, 4);
        return a + 4
    }
    function ye(f, c, a, b, d) {
        d || we(f, c, a, 8, 1.7976931348623157E308, -1.7976931348623157E308);
        me(f, c, a, b, 52, 8);
        return a + 8
    }
    function oc(f, c) {
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
    function ze(f) {
        for (var c = [], a = 0; a < f.length; ++a) c.push(f.charCodeAt(a) & 255);
        return c
    }
    function re(f) {
        f = (f.trim ? f.trim() : f.replace(/^\s+|\s+$/g, "")).replace(Cg, "");
        if (2 > f.length) f = "";
        else for (; 0 !== f.length % 4;) f += "=";
        cd || ke();
        var c = f.length;
        if (0 < c % 4) throw Error("Invalid string. Length must be a multiple of 4");
        var a = "=" === f[c - 2] ? 2 : "=" === f[c - 1] ? 1 : 0;
        var b = new Dg(3 * c / 4 - a);
        var d = 0 < a ? c - 4 : c;
        var e = 0;
        for (c = 0; c < d; c += 4) {
            var g = Aa[f.charCodeAt(c)] << 18 | Aa[f.charCodeAt(c + 1)] << 12 | Aa[f.charCodeAt(c + 2)] << 6 | Aa[f.charCodeAt(c + 3)];
            b[e++] = g >> 16 & 255;
            b[e++] = g >> 8 & 255;
            b[e++] = g & 255
        }
        2 === a ? (g = Aa[f.charCodeAt(c)] << 2 | Aa[f.charCodeAt(c + 1)] >> 4, b[e++] = g & 255) : 1 === a && (g = Aa[f.charCodeAt(c)] << 10 | Aa[f.charCodeAt(c + 1)] << 4 | Aa[f.charCodeAt(c + 2)] >> 2, b[e++] = g >> 8 & 255, b[e++] = g & 255);
        return b
    }
    function Qb(f, c, a, b) {
        for (var d = 0; d < b && !(d + a >= c.length || d >= f.length); ++d) c[d + a] = f[d];
        return d
    }
    function Ae(f) {
        return !! f.constructor && "function" === typeof f.constructor.isBuffer && f.constructor.isBuffer(f)
    }
    function Ba(f, c) {
        var a = [];
        f.forEach(function(b) {
            a.push(c ? -b: b, b)
        });
        return a
    }
    function Be(f) {
        for (var c = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0, a = [], b = 0; b < f - 1; b++) {
            var d = 2 * (b + c);
            a.push(d, d + 1, d + 2);
            a.push(d + 2, d + 1, d + 3)
        }
        return a
    }
    function rc(f) {
        return function(c, a, b) {
            c = a + f;
            a = b.length - 1;
            return b[0 < a ? 0 > c ? 0 : c > a ? a: c: c < a ? a: 0 < c ? 0 : c]
        }
    }
    function Na(f) {
        if (!f[0] || !f[0].length) return f;
        for (var c = f[0].length, a = [], b = 0, d = 0; d < f.length; d++) for (var e = 0; e < c; e++) a[b++] = f[d][e];
        return a
    }
    function Ce() {
        for (var f = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [], c = [], a = 0, b = 0; b < f.length; b++) {
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
    function tb(f, c) {
        var a = [];
        f.forEach(function(b) {
            a.push(c ? -b: b, b)
        });
        return a
    }
    function Eg(f) {
        for (var c = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0, a = [], b = 0; b < f - 1; b++) {
            var d = 2 * (b + c);
            a.push(d, d + 1, d + 2);
            a.push(d + 2, d + 1, d + 3)
        }
        return a
    }
    function De(f) {
        return function(c, a, b) {
            c = a + f;
            a = b.length - 1;
            return b[0 < a ? 0 > c ? 0 : c > a ? a: c: c < a ? a: 0 < c ? 0 : c]
        }
    }
    function ub(f) {
        if (!f[0] || !f[0].length) return f;
        for (var c = f[0].length, a = [], b = 0, d = 0; d < f.length; d++) for (var e = 0; e < c; e++) a[b++] = f[d][e];
        return a
    }
    function Fg() {
        for (var f = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [], c = [], a = 0, b = 0; b < f.length; b++) {
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
    function Ee(f) {
        var c = 0,
        a = 0,
        b = true,
        d = false,
        e = void 0;
        try {
            for (var g = gd(f), k; ! (b = (k = g.next()).done); b = true) {
                var h = k.value;
                c += h.w * h.h;
                a = Math.max(a, h.w)
            }
        } catch(u) {
            d = true,
            e = u
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
        k = void 0;
        try {
            for (var l = gd(f), n; ! (e = (n = l.next()).done); e = true) for (var p = n.value,
            m = a.length - 1; 0 <= m; m--) {
                var q = a[m];
                if (! (p.w > q.w || p.h > q.h)) {
                    p.x = q.x;
                    p.y = q.y;
                    d = Math.max(d, p.y + p.h);
                    b = Math.max(b, p.x + p.w);
                    if (p.w === q.w && p.h === q.h) {
                        var r = a.pop();
                        m < a.length && (a[m] = r)
                    } else p.h === q.h ? (q.x += p.w, q.w -= p.w) : (p.w !== q.w && a.push({
                        x: q.x + p.w,
                        y: q.y,
                        w: q.w - p.w,
                        h: p.h
                    }), q.y += p.h, q.h -= p.h);
                    break
                }
            }
        } catch(u) {
            g = true,
            k = u
        } finally {
            try { ! e && l.
                return && l.
                return ()
            } finally {
                if (g) throw k;
            }
        }
        return {
            w: b,
            h: d,
            fill: c / (b * d) || 0
        }
    }
    function Gg(f, c, a) {
        a = Math.PI / 180 * (60 * a + 30);
        return [f.x + c * Math.cos(a), f.y + c * Math.sin(a)]
    }
    function Hg(f, c, a) {
        for (var b = {},
        d = [], e = f.length, g = c / 2 / Math.sin(Math.PI / 3), k = 1.5 * g, h = 1, l = 0; l < e; ++l) {
            var n = f[l].geometry.coordinates;
            a && (n = a(n));
            var p = +n[0],
            m = +n[1];
            if (!isNaN(p) && !isNaN(m)) {
                n = Math.round(m /= k);
                var q = Math.round(p = p / c - (n & 1) / 2),
                r = m - n;
                if (1 < 3 * Math.abs(r)) {
                    var u = p - q,
                    y = q + (p < q ? -1 : 1) / 2,
                    t = n + (m < n ? -1 : 1);
                    p -= y;
                    m -= t;
                    u * u + r * r > p * p + m * m && (q = y + (n & 1 ? 1 : -1) / 2, n = t)
                }
                r = q + "-" + n; (u = b[r]) ? (u.count += f[l].count || 1, h = Math.max(h, u.count)) : (b[r] = {
                    center: {
                        x: (q + (n & 1) / 2) * c,
                        y: n * k
                    },
                    count: f[l].count || 1
                },
                d.push(b[r]))
            }
        }
        d.max = h;
        d.r = g;
        return d
    }
    function Ig(f) {
        var c, a;
        this.promise = new f(function(b, d) {
            if (void 0 !== c || void 0 !== a) throw TypeError("Bad Promise constructor");
            c = b;
            a = d
        });
        this.resolve = ib(c);
        this.reject = ib(a)
    }
    function Jg(f, c, a, b) {
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
    function sc(f) {
        return Jg(f.bufferView.data, f.byteOffset, f.count * hd[f.type], f.componentType)
    }
    function Kg(f) {
        var c = "",
        a = f.lastIndexOf("/"); - 1 !== a && (c = f.substring(0, a + 1));
        return c
    }
    function Lg(f, c) {
        var a = new XMLHttpRequest;
        a.overrideMimeType("application/json");
        a.open("GET", f, true);
        a.onreadystatechange = function() {
            4 == a.readyState && "200" == a.status && c(a.responseText, this)
        };
        a.send(null)
    }
    function Mg(f, c) {
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
    function Ng(f, c, a) {
        var b = new Image;
        b.crossOrigin = "Anonymous";
        b.src = f;
        b.onload = function() {
            a(b, c)
        }
    }
    function Og(f) {
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
            this.rootTransform = C.create();
            this.nodeMatrix = Array(b.nodes.length);
            a = 0;
            for (b = this.nodeMatrix.length; a < b; a++) this.nodeMatrix[a] = C.create()
        },
        g = a.createSampler();
        a.samplerParameteri(g, a.TEXTURE_MIN_FILTER, a.NEAREST_MIPMAP_LINEAR);
        a.samplerParameteri(g, a.TEXTURE_MAG_FILTER, a.LINEAR);
        a.samplerParameteri(g, a.TEXTURE_WRAP_S, a.REPEAT);
        a.samplerParameteri(g, a.TEXTURE_WRAP_T, a.REPEAT);
        a.bindVertexArray(null);
        a.bindVertexArray(null);
        var k = {
            HAS_SKIN: 1,
            SKIN_VEC8: 2,
            HAS_BASECOLORMAP: 4,
            HAS_NORMALMAP: 8,
            HAS_METALROUGHNESSMAP: 16,
            HAS_OCCLUSIONMAP: 32,
            HAS_EMISSIVEMAP: 64
        },
        h = {},
        l = function() {
            this.flags = 0;
            this.programObject = null
        };
        l.prototype.hasSkin = function() {
            return this.flags & k.HAS_SKIN
        };
        l.prototype.hasBaseColorMap = function() {
            return this.flags & k.HAS_BASECOLORMAP
        };
        l.prototype.hasNormalMap = function() {
            return this.flags & k.HAS_NORMALMAP
        };
        l.prototype.hasMetalRoughnessMap = function() {
            return this.flags & k.HAS_METALROUGHNESSMAP
        };
        l.prototype.hasOcclusionMap = function() {
            return this.flags & k.HAS_OCCLUSIONMAP
        };
        l.prototype.hasEmissiveMap = function() {
            return this.flags & k.HAS_EMISSIVEMAP
        };
        l.prototype.defineMacro = function(a) {
            void 0 !== k[a] && (this.flags |= k[a])
        };
        l.prototype.compile = function() {
            var b = h[this.flags];
            if (b) this.programObject = b;
            else {
                var d = b = "";
                this.flags & k.HAS_SKIN && (b += "#define HAS_SKIN\n");
                this.flags & k.SKIN_VEC8 && (b += "#define SKIN_VEC8\n");
                this.flags & k.HAS_BASECOLORMAP && (d += "#define HAS_BASECOLORMAP\n");
                this.flags & k.HAS_NORMALMAP && (d += "#define HAS_NORMALMAP\n");
                this.flags & k.HAS_METALROUGHNESSMAP && (d += "#define HAS_METALROUGHNESSMAP\n");
                this.flags & k.HAS_OCCLUSIONMAP && (d += "#define HAS_OCCLUSIONMAP\n");
                this.flags & k.HAS_EMISSIVEMAP && (d += "#define HAS_EMISSIVEMAP\n");
                b = vb.createProgram(a, "#version 300 es\n" + b + "#define POSITION_LOCATION 0\n#define NORMAL_LOCATION 1\n#define TEXCOORD_0_LOCATION 2\n#define JOINTS_0_LOCATION 3\n#define JOINTS_1_LOCATION 5\n#define WEIGHTS_0_LOCATION 4\n#define WEIGHTS_1_LOCATION 6\n#define TANGENT_LOCATION 7\nprecision highp float;precision highp int;uniform mat4 u_MVP;uniform mat4 u_MV;uniform mat4 u_MVNormal;\n#ifdef HAS_SKIN\nuniform JointMatrix{mat4 matrix[65];}u_jointMatrix;\n#endif\nlayout(location=POSITION_LOCATION)in vec3 position;layout(location=NORMAL_LOCATION)in vec3 normal;layout(location=TEXCOORD_0_LOCATION)in vec2 uv;\n#ifdef HAS_SKIN\nlayout(location=JOINTS_0_LOCATION)in vec4 joint0;layout(location=WEIGHTS_0_LOCATION)in vec4 weight0;\n#ifdef SKIN_VEC8\nlayout(location=JOINTS_1_LOCATION)in vec4 joint1;layout(location=WEIGHTS_1_LOCATION)in vec4 weight1;\n#endif\n#endif\nout vec3 v_position;out vec3 v_normal;out vec2 v_uv;void main(){\n#ifdef HAS_SKIN\nmat4 skinMatrix=weight0.x*u_jointMatrix.matrix[int(joint0.x)]+weight0.y*u_jointMatrix.matrix[int(joint0.y)]+weight0.z*u_jointMatrix.matrix[int(joint0.z)]+weight0.w*u_jointMatrix.matrix[int(joint0.w)];\n#ifdef SKIN_VEC8\nskinMatrix+=weight1.x*u_jointMatrix.matrix[int(joint1.x)]+weight1.y*u_jointMatrix.matrix[int(joint1.y)]+weight1.z*u_jointMatrix.matrix[int(joint1.z)]+weight1.w*u_jointMatrix.matrix[int(joint1.w)];\n#endif\n#endif\nv_uv=uv;\n#ifdef HAS_SKIN\nv_normal=normalize((u_MVNormal*transpose(inverse(skinMatrix))*vec4(normal,0)).xyz);vec4 pos=u_MV*skinMatrix*vec4(position,1.0);gl_Position=u_MVP*skinMatrix*vec4(position,1.0);\n#else\nv_normal=normalize((u_MVNormal*vec4(normal,0)).xyz);vec4 pos=u_MV*vec4(position,1.0);gl_Position=u_MVP*vec4(position,1.0);\n#endif\nv_position=vec3(pos.xyz)/pos.w;}", "#version 300 es\n" + d + "#define FRAG_COLOR_LOCATION 0\nprecision highp float;precision highp int;uniform sampler2D u_brdfLUT;uniform vec4 u_baseColorFactor;\n#ifdef HAS_BASECOLORMAP\nuniform sampler2D u_baseColorTexture;\n#endif\n#ifdef HAS_NORMALMAP\nuniform sampler2D u_normalTexture;uniform float u_normalTextureScale;\n#endif\n#ifdef HAS_EMISSIVEMAP\nuniform sampler2D u_emissiveTexture;uniform vec3 u_emissiveFactor;\n#endif\n#ifdef HAS_METALROUGHNESSMAP\nuniform sampler2D u_metallicRoughnessTexture;\n#endif\nuniform float u_metallicFactor;uniform float u_roughnessFactor;\n#ifdef HAS_OCCLUSIONMAP\nuniform sampler2D u_occlusionTexture;uniform float u_occlusionStrength;\n#endif\nin vec3 v_position;in vec3 v_normal;in vec2 v_uv;layout(location=FRAG_COLOR_LOCATION)out vec4 frag_color;struct PBRInfo{float NdotL;float NdotV;float NdotH;float LdotH;float VdotH;float perceptualRoughness;float metalness;vec3 reflectance0;vec3 reflectance90;float alphaRoughness;vec3 diffuseColor;vec3 specularColor;};const float M_PI=3.141592653589793;const float c_MinRoughness=0.04;vec3 getNormal(){vec3 pos_dx=dFdx(v_position);vec3 pos_dy=dFdy(v_position);vec3 tex_dx=dFdx(vec3(v_uv,0.0));vec3 tex_dy=dFdy(vec3(v_uv,0.0));vec3 t=(tex_dy.t*pos_dx-tex_dx.t*pos_dy)/(tex_dx.s*tex_dy.t-tex_dy.s*tex_dx.t);vec3 ng=v_normal;t=normalize(t-ng*dot(ng,t));vec3 b=normalize(cross(ng,t));mat3 tbn=mat3(t,b,ng);\n#ifdef HAS_NORMALMAP\nvec3 n=texture(u_normalTexture,v_uv).rgb;n=normalize(tbn*((2.0*n-1.0)*vec3(u_normalTextureScale,u_normalTextureScale,1.0)));\n#else\nvec3 n=tbn[2].xyz;\n#endif\nreturn n;}vec3 getIBLContribution(PBRInfo pbrInputs,vec3 n,vec3 reflection){float mipCount=10.0;float lod=(pbrInputs.perceptualRoughness*mipCount);vec3 brdf=texture(u_brdfLUT,vec2(pbrInputs.NdotV,1.0-pbrInputs.perceptualRoughness)).rgb;vec3 diffuseLight=vec3(0.6,0.6,0.6);vec3 specularLight=vec3(0.6,0.6,0.6);vec3 diffuse=diffuseLight*pbrInputs.diffuseColor;vec3 specular=specularLight*(pbrInputs.specularColor*brdf.x+brdf.y);return diffuse+specular;}vec3 diffuse(PBRInfo pbrInputs){return pbrInputs.diffuseColor/M_PI;}vec3 specularReflection(PBRInfo pbrInputs){return pbrInputs.reflectance0+(pbrInputs.reflectance90-pbrInputs.reflectance0)*pow(clamp(1.0-pbrInputs.VdotH,0.0,1.0),5.0);}float geometricOcclusion(PBRInfo pbrInputs){float NdotL=pbrInputs.NdotL;float NdotV=pbrInputs.NdotV;float r=pbrInputs.alphaRoughness;float attenuationL=2.0*NdotL/(NdotL+sqrt(r*r+(1.0-r*r)*(NdotL*NdotL)));float attenuationV=2.0*NdotV/(NdotV+sqrt(r*r+(1.0-r*r)*(NdotV*NdotV)));return attenuationL*attenuationV;}float microfacetDistribution(PBRInfo pbrInputs){float roughnessSq=pbrInputs.alphaRoughness*pbrInputs.alphaRoughness;float f=(pbrInputs.NdotH*roughnessSq-pbrInputs.NdotH)*pbrInputs.NdotH+1.0;return roughnessSq/(M_PI*f*f);}void main(){float perceptualRoughness=u_roughnessFactor;float metallic=u_metallicFactor;\n#ifdef HAS_METALROUGHNESSMAP\nvec4 mrSample=texture(u_metallicRoughnessTexture,v_uv);perceptualRoughness=mrSample.g*perceptualRoughness;metallic=mrSample.b*metallic;\n#endif\nperceptualRoughness=clamp(perceptualRoughness,c_MinRoughness,1.0);metallic=clamp(metallic,0.0,1.0);float alphaRoughness=perceptualRoughness*perceptualRoughness;\n#ifdef HAS_BASECOLORMAP\nvec4 baseColor=texture(u_baseColorTexture,v_uv)*u_baseColorFactor;\n#else\nvec4 baseColor=u_baseColorFactor;\n#endif\nvec3 f0=vec3(0.04);vec3 diffuseColor=baseColor.rgb*(vec3(1.0)-f0);diffuseColor*=1.0-metallic;vec3 specularColor=mix(f0,baseColor.rgb,metallic);float reflectance=max(max(specularColor.r,specularColor.g),specularColor.b);float reflectance90=clamp(reflectance*25.0,0.0,1.0);vec3 specularEnvironmentR0=specularColor.rgb;vec3 specularEnvironmentR90=vec3(1.0,1.0,1.0)*reflectance90;vec3 n=getNormal();vec3 v=normalize(-v_position);vec3 l=normalize(vec3(1.0,1.0,1.0));vec3 h=normalize(l+v);vec3 reflection=-normalize(reflect(v,n));float NdotL=clamp(dot(n,l),0.001,1.0);float NdotV=abs(dot(n,v))+0.001;float NdotH=clamp(dot(n,h),0.0,1.0);float LdotH=clamp(dot(l,h),0.0,1.0);float VdotH=clamp(dot(v,h),0.0,1.0);PBRInfo pbrInputs=PBRInfo(NdotL,NdotV,NdotH,LdotH,VdotH,perceptualRoughness,metallic,specularEnvironmentR0,specularEnvironmentR90,alphaRoughness,diffuseColor,specularColor);vec3 F=specularReflection(pbrInputs);float G=geometricOcclusion(pbrInputs);float D=microfacetDistribution(pbrInputs);vec3 diffuseContrib=(1.0-F)*diffuse(pbrInputs);vec3 specContrib=max(vec3(0.0),F*G*D/(4.0*NdotL*NdotV));vec3 color=NdotL*(diffuseContrib+specContrib);color+=getIBLContribution(pbrInputs,n,reflection);\n#ifdef HAS_OCCLUSIONMAP\nfloat ao=texture(u_occlusionTexture,v_uv).r;color=mix(color,color*ao,u_occlusionStrength);\n#endif\n#ifdef HAS_EMISSIVEMAP\nvec3 emissive=texture(u_emissiveTexture,v_uv).rgb*u_emissiveFactor;color+=emissive;\n#endif\nfrag_color=vec4(color,baseColor.a);}");
                this.programObject = {
                    program: b,
                    uniformLocations: {},
                    uniformBlockIndices: {}
                };
                this.flags & k.HAS_SKIN && (this.programObject.uniformBlockIndices.JointMatrix = a.getUniformBlockIndex(b, "JointMatrix"));
                d = this.programObject.uniformLocations;
                d.MVP = a.getUniformLocation(b, "u_MVP");
                d.MVNormal = a.getUniformLocation(b, "u_MVNormal");
                d.MV = a.getUniformLocation(b, "u_MV");
                d.baseColorFactor = a.getUniformLocation(b, "u_baseColorFactor");
                d.metallicFactor = a.getUniformLocation(b, "u_metallicFactor");
                d.roughnessFactor = a.getUniformLocation(b, "u_roughnessFactor");
                this.flags & k.HAS_BASECOLORMAP && (d.baseColorTexture = a.getUniformLocation(b, "u_baseColorTexture"));
                this.flags & k.HAS_NORMALMAP && (d.normalTexture = a.getUniformLocation(b, "u_normalTexture"), d.normalTextureScale = a.getUniformLocation(b, "u_normalTextureScale"));
                this.flags & k.HAS_METALROUGHNESSMAP && (d.metallicRoughnessTexture = a.getUniformLocation(b, "u_metallicRoughnessTexture"));
                this.flags & k.HAS_OCCLUSIONMAP && (d.occlusionTexture = a.getUniformLocation(b, "u_occlusionTexture"), d.occlusionStrength = a.getUniformLocation(b, "u_occlusionStrength"));
                this.flags & k.HAS_EMISSIVEMAP && (d.emissiveTexture = a.getUniformLocation(b, "u_emissiveTexture"), d.emissiveFactor = a.getUniformLocation(b, "u_emissiveFactor"));
                a.useProgram(null);
                h[this.flags] = this.programObject
            }
        };
        var n = 1,
        p = K.create(),
        m = C.create();
        tc.create();
        var q = [];
        a.enable(a.CULL_FACE);
        a.cullFace(a.BACK);
        a.frontFace(a.CCW);
        var r = true;
        a.enable(a.DEPTH_TEST);
        a.depthFunc(a.LEQUAL);
        var u = u || {},
        y = null;
        K.create();
        var t = C.create();
        C.perspective(t, .785, f.width / f.height, .01, 100);
        C.create();
        var z = C.create(),
        v = C.create(),
        B = C.create();
        C.create();
        var A, D, E = [1, 1, 1, 1],
        I = u.drawPrimitive = function(b, d) {
            if (G) {
                v = z = G.matrix;
                C.invert(B, z);
                C.transpose(B, B);
                d = E;
                var h = b.shader,
                g = b.material;
                if (null !== g) {
                    var e = g.pbrMetallicRoughness;
                    d = e.baseColorFactor;
                    b.material.doubleSided === r && ((r = !b.material.doubleSided) ? a.enable(a.CULL_FACE) : a.disable(a.CULL_FACE))
                }
                y != b.shader.programObject && (y = b.shader.programObject, a.useProgram(y.program));
                g && (h.hasBaseColorMap() && c(y.uniformLocations.baseColorTexture, e.baseColorTexture), h.hasNormalMap() && (c(y.uniformLocations.normalTexture, g.normalTexture), a.uniform1f(y.uniformLocations.normalTextureScale, g.normalTexture.scale)), h.hasMetalRoughnessMap() && c(y.uniformLocations.metallicRoughnessTexture, e.metallicRoughnessTexture), a.uniform1f(y.uniformLocations.metallicFactor, e.metallicFactor), a.uniform1f(y.uniformLocations.roughnessFactor, e.roughnessFactor), h.hasOcclusionMap() && (c(y.uniformLocations.occlusionTexture, g.occlusionTexture), a.uniform1f(y.uniformLocations.occlusionStrength, g.occlusionTexture.strength)), h.hasEmissiveMap() && (c(y.uniformLocations.emissiveTexture, g.emissiveTexture), a.uniform3fv(y.uniformLocations.emissiveFactor, g.emissiveFactor)));
                h.hasSkin() && a.uniformBlockBinding(y.program, y.uniformBlockIndices.JointMatrix, A);
                a.activeTexture(a.TEXTURE0 + 29);
                a.bindTexture(a.TEXTURE_2D, null);
                a.uniform4fv(y.uniformLocations.baseColorFactor, d);
                a.uniformMatrix4fv(y.uniformLocations.MV, false, z);
                a.uniformMatrix4fv(y.uniformLocations.MVP, false, v);
                a.uniformMatrix4fv(y.uniformLocations.MVNormal, false, B);
                a.bindVertexArray(b.vertexArray);
                null !== b.indices ? a.drawElements(b.mode, b.indicesLength, b.indicesComponentType, b.indicesOffset) : a.drawArrays(b.mode, b.drawArraysOffset, b.drawArraysCount);
                a.bindVertexArray(null)
            }
        },
        L = C.create(),
        J = C.create(),
        w = u.drawNode = function(b, d, c, h) {
            d = c[d];
            void 0 !== h ? C.mul(d, h, b.matrix) : C.copy(d, b.matrix);
            if (null !== b.skin) {
                var g = b.skin;
                A = g.uniformBlockID;
                var e = b.skin.joints;
                C.invert(J, d);
                h = 0;
                for (f = e.length; h < f; h++) {
                    var k = e[h];
                    C.mul(L, c[k.nodeID], g.inverseBindMatrix[h]);
                    C.mul(L, J, L);
                    g.jointMatrixUnidormBufferData.set(L, 16 * h)
                }
                a.bindBuffer(a.UNIFORM_BUFFER, g.jointMatrixUniformBuffer);
                a.bufferSubData(a.UNIFORM_BUFFER, 0, g.jointMatrixUnidormBufferData, 0, g.jointMatrixUnidormBufferData.length)
            }
            var f;
            if (null !== b.mesh) for (g = b.mesh, h = 0, f = g.primitives.length; h < f; h++) I(g.primitives[h], d);
            null !== b.skin && a.bindBuffer(a.UNIFORM_BUFFER, null);
            h = 0;
            for (f = b.children.length; h < f; h++) w(b.children[h], b.children[h].nodeID, c, d)
        },
        U = u.drawScene = function(a) {
            var d = a.glTF;
            if (d.animations) {
                var c = d.animations[b];
                var h;
                var g = 0;
                for (h = c.samplers.length; g < h; g++) c.samplers[g].getValue(F);
                g = 0;
                for (h = c.channels.length; g < h; g++) {
                    var e = c.channels[g];
                    var k = e.sampler;
                    var f = d.nodes[e.target.nodeID];
                    switch (e.target.path) {
                    case "rotation":
                        Fa.copy(f.rotation, k.curValue);
                        break;
                    case "translation":
                        K.copy(f.translation, k.curValue);
                        break;
                    case "scale":
                        K.copy(f.scale, k.curValue)
                    }
                    f.updateMatrixFromTRS()
                }
            }
            c = 0;
            for (d = a.glTFScene.nodes.length; c < d; c++) w(a.glTFScene.nodes[c], a.glTFScene.nodes[c].nodeID, a.nodeMatrix, a.rootTransform)
        },
        x = performance.now(),
        F = 0,
        G;
        return {
            setupScene: function(c, h) {
                function g(b, d) {
                    if (void 0 !== b) {
                        var c = b.bufferView;
                        null === c.target ? (a.bindBuffer(a.ARRAY_BUFFER, c.buffer), a.bufferData(a.ARRAY_BUFFER, c.data, a.STATIC_DRAW)) : a.bindBuffer(c.target, c.buffer);
                        b.prepareVertexAttrib(d, a);
                        return ! 0
                    }
                    return ! 1
                }
                var k;
                if (c.animations) {
                    var f = 0;
                    for (k = c.animations.length; f < k; f++) d.add(c.animations[f].name || f)
                }
                b = 0;
                f = c.scenes[c.defaultScene];
                K.fromValues(1.2 * f.boundingBox.transform[0], 0, 0);
                K.create();
                h ? h = q[h.id] = new e(f, c, h.id) : (h = new e(f, c, q.length), q.push(h));
                1 === q.length && (C.identity(m), n = 1 / Math.max(f.boundingBox.transform[0], Math.max(f.boundingBox.transform[5], f.boundingBox.transform[10])), C.getTranslation(p, f.boundingBox.transform), K.scale(p, p, -1), p[0] += -.5 * f.boundingBox.transform[0], p[1] += -.5 * f.boundingBox.transform[5], p[2] += -.5 * f.boundingBox.transform[10], n *= .5, m[0] = n, m[5] = n, m[10] = n, C.translate(m, m, p), K.set(p, 0, 0, -1.5), n = 1);
                var u;
                f = 0;
                for (k = c.bufferViews.length; f < k; f++) {
                    var r = c.bufferViews[f];
                    r.createBuffer(a);
                    r.bindData(a)
                }
                if (c.textures) for (f = 0, k = c.textures.length; f < k; f++) {
                    var y = c.textures[f];
                    y.createTexture(a)
                }
                if (c.samplers) for (f = 0, k = c.samplers.length; f < k; f++) y = c.samplers[f],
                y.createSampler(a);
                if (c.skins) for (f = 0, k = c.skins.length; f < k; f++) y = c.skins[f],
                y.jointMatrixUniformBuffer = a.createBuffer(),
                a.bindBufferBase(a.UNIFORM_BUFFER, y.uniformBlockID, y.jointMatrixUniformBuffer),
                a.bindBuffer(a.UNIFORM_BUFFER, y.jointMatrixUniformBuffer),
                a.bufferData(a.UNIFORM_BUFFER, y.jointMatrixUnidormBufferData, a.DYNAMIC_DRAW),
                a.bufferSubData(a.UNIFORM_BUFFER, 0, y.jointMatrixUnidormBufferData),
                a.bindBuffer(a.UNIFORM_BUFFER, null);
                var v = 0;
                for (u = c.meshes.length; v < u; v++) for (y = c.meshes[v], f = 0, k = y.primitives.length; f < k; ++f) {
                    var t = y.primitives[f];
                    t.shader = new l;
                    t.vertexArray = r = a.createVertexArray();
                    a.bindVertexArray(r);
                    g(t.attributes.POSITION, 0);
                    g(t.attributes.NORMAL, 1);
                    g(t.attributes.TEXCOORD_0, 2);
                    g(t.attributes.JOINTS_0, 3) && g(t.attributes.WEIGHTS_0, 4) && t.shader.defineMacro("HAS_SKIN");
                    g(t.attributes.JOINTS_1, 5) && g(t.attributes.WEIGHTS_1, 6) && t.shader.defineMacro("SKIN_VEC8");
                    null !== t.indices && (r = c.accessors[t.indices], r = r.bufferView, null === r.target ? (a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, r.buffer), a.bufferData(a.ELEMENT_ARRAY_BUFFER, r.data, a.STATIC_DRAW)) : a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, r.buffer));
                    a.bindVertexArray(null);
                    a.bindBuffer(a.ARRAY_BUFFER, null);
                    a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, null);
                    if (r = t.material) r.pbrMetallicRoughness.baseColorTexture && t.shader.defineMacro("HAS_BASECOLORMAP"),
                    r.pbrMetallicRoughness.metallicRoughnessTexture && t.shader.defineMacro("HAS_METALROUGHNESSMAP"),
                    r.normalTexture && t.shader.defineMacro("HAS_NORMALMAP"),
                    r.occlusionTexture && t.shader.defineMacro("HAS_OCCLUSIONMAP"),
                    r.emissiveTexture && t.shader.defineMacro("HAS_EMISSIVEMAP");
                    t.shader.compile()
                }
                return h
            },
            render: u.render = function(a) {
                G = a;
                a = (new Date).getTime();
                var b;
                var d = 0;
                for (b = q.length; d < b; d++) D = q[d],
                U(q[d]);
                y = null;
                F = .001 * (a - x)
            }
        }
    }
    function ca(f) {
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
    function Pg(f) {
        var c = f / 2,
        a = f + c,
        b = new Canvas(2 * a, 2 * a),
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
    var Fe = "undefined" !== typeof globalThis ? globalThis: "undefined" !== typeof window ? window: "undefined" !== typeof global ? global: "undefined" !== typeof self ? self: {},
    Za = function(f) {
        if (void 0 == f) throw TypeError("Can't call method on  " + f);
        return f
    },
    Qg = {}.hasOwnProperty,
    Y = function(f, c) {
        return Qg.call(f, c)
    },
    Rg = {}.toString,
    jb = function(f) {
        return Rg.call(f).slice(8, -1)
    },
    id = Object("z").propertyIsEnumerable(0) ? Object: function(f) {
        return "String" == jb(f) ? f.split("") : Object(f)
    },
    Oa = function(f) {
        return id(Za(f))
    },
    Sg = Math.ceil,
    Tg = Math.floor,
    jd = function(f) {
        return isNaN(f = +f) ? 0 : (0 < f ? Tg: Sg)(f)
    },
    Ug = Math.min,
    uc = function(f) {
        return 0 < f ? Ug(jd(f), 9007199254740991) : 0
    },
    Vg = Math.max,
    Wg = Math.min,
    X = O(function(f) {
        f = f.exports = {
            version: "2.6.5"
        };
        "number" == typeof __e && (__e = f)
    }),
    P = O(function(f) {
        f = f.exports = "undefined" != typeof window && Math == Math ? window: "undefined" != typeof self && self.Math == Math ? self: Function("return this")();
        "number" == typeof __g && (__g = f)
    }),
    Rb = O(function(f) {
        var c = P["__core-js_shared__"] || (P["__core-js_shared__"] = {}); (f.exports = function(a, b) {
            return c[a] || (c[a] = void 0 !== b ? b: {})
        })("versions", []).push({
            version: X.version,
            mode: "pure",
            copyright: "\u00a9 2019 Denis Pushkarev (zloirock.ru)"
        })
    }),
    Xg = 0,
    Yg = Math.random(),
    vc = function(f) {
        return "Symbol(".concat(void 0 === f ? "": f, ")_", (++Xg + Yg).toString(36))
    },
    Ge = Rb("keys"),
    kd = function(f) {
        return Ge[f] || (Ge[f] = vc(f))
    },
    Zg = function(f) {
        return function(c, a, b) {
            c = Oa(c);
            var d = uc(c.length);
            b = jd(b);
            b = 0 > b ? Vg(b + d, 0) : Wg(b, d);
            if (f && a != a) for (; d > b;) {
                if (a = c[b++], a != a) return ! 0
            } else for (; d > b; b++) if ((f || b in c) && c[b] === a) return f || b || 0;
            return ! f && -1
        }
    } (false),
    $g = kd("IE_PROTO"),
    He = function(f, c) {
        f = Oa(f);
        var a = 0,
        b = [],
        d;
        for (d in f) d != $g && Y(f, d) && b.push(d);
        for (; c.length > a;) Y(f, d = c[a++]) && (~Zg(b, d) || b.push(d));
        return b
    },
    wc = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
    wb = Object.keys ||
    function(f) {
        return He(f, wc)
    },
    ib = function(f) {
        if ("function" != typeof f) throw TypeError(f + " is not a function!");
        return f
    },
    ka = function(f, c, a) {
        ib(f);
        if (void 0 === c) return f;
        switch (a) {
        case 1:
            return function(a) {
                return f.call(c, a)
            };
        case 2:
            return function(a, d) {
                return f.call(c, a, d)
            };
        case 3:
            return function(a, d, e) {
                return f.call(c, a, d, e)
            }
        }
        return function() {
            return f.apply(c, arguments)
        }
    },
    oa = function(f) {
        return "object" === typeof f ? null !== f: "function" === typeof f
    },
    qa = function(f) {
        if (!oa(f)) throw TypeError(f + " is not an object!");
        return f
    },
    $a = function(f) {
        try {
            return !! f()
        } catch(c) {
            return ! 0
        }
    },
    Ca = !$a(function() {
        return 7 != Object.defineProperty({},
        "a", {
            get: function() {
                return 7
            }
        }).a
    }),
    xb = P.document,
    xc = oa(xb) && oa(xb.createElement),
    Ie = !Ca && !$a(function() {
        return 7 != Object.defineProperty(xc ? xb.createElement("div") : {},
        "a", {
            get: function() {
                return 7
            }
        }).a
    }),
    Sb = function(f, c) {
        if (!oa(f)) return f;
        var a, b;
        if (c && "function" == typeof(a = f.toString) && !oa(b = a.call(f)) || "function" == typeof(a = f.valueOf) && !oa(b = a.call(f)) || !c && "function" == typeof(a = f.toString) && !oa(b = a.call(f))) return b;
        throw TypeError("Can't convert object to primitive value");
    },
    ah = Object.defineProperty,
    za = {
        f: Ca ? Object.defineProperty: function(f, c, a) {
            qa(f);
            c = Sb(c, true);
            qa(a);
            if (Ie) try {
                return ah(f, c, a)
            } catch(b) {}
            if ("get" in a || "set" in a) throw TypeError("Accessors not supported!");
            "value" in a && (f[c] = a.value);
            return f
        }
    },
    ab = function(f, c) {
        return {
            enumerable: !(f & 1),
            configurable: !(f & 2),
            writable: !(f & 4),
            value: c
        }
    },
    Ta = Ca ?
    function(f, c, a) {
        return za.f(f, c, ab(1, a))
    }: function(f, c, a) {
        f[c] = a;
        return f
    },
    pa = function(f, c, a) {
        var b = f & pa.F,
        d = f & pa.G,
        e = f & pa.S,
        g = f & pa.P,
        k = f & pa.B,
        h = f & pa.W,
        l = d ? X: X[c] || (X[c] = {}),
        n = l.prototype;
        e = d ? P: e ? P[c] : (P[c] || {}).prototype;
        var p;
        d && (a = c);
        for (p in a) if (c = !b && e && void 0 !== e[p], !c || !Y(l, p)) {
            var m = c ? e[p] : a[p];
            l[p] = d && "function" != typeof e[p] ? a[p] : k && c ? ka(m, P) : h && e[p] == m ?
            function(a) {
                var b = function(b, d, c) {
                    if (this instanceof a) {
                        switch (arguments.length) {
                        case 0:
                            return new a;
                        case 1:
                            return new a(b);
                        case 2:
                            return new a(b, d)
                        }
                        return new a(b, d, c)
                    }
                    return a.apply(this, arguments)
                };
                b.prototype = a.prototype;
                return b
            } (m) : g && "function" == typeof m ? ka(Function.call, m) : m;
            g && ((l.virtual || (l.virtual = {}))[p] = m, f & pa.R && n && !n[p] && Ta(n, p, m))
        }
    };
    pa.F = 1;
    pa.G = 2;
    pa.S = 4;
    pa.P = 8;
    pa.B = 16;
    pa.W = 32;
    pa.U = 64;
    pa.R = 128;
    var F = pa,
    yc = function(f, c) {
        var a = (X.Object || {})[f] || Object[f],
        b = {};
        b[f] = c(a);
        F(F.S + F.F * $a(function() {
            a(1)
        }), "Object", b)
    };
    yc("keys",
    function() {
        return function(f) {
            return wb(Object(Za(f)))
        }
    });
    var bh = X.Object.keys,
    ch = O(function(f) {
        f.exports = {
            "default": bh,
            __esModule: true
        }
    }),
    Ea = Q(ch),
    ld = Object.getOwnPropertySymbols,
    zc = {}.propertyIsEnumerable,
    Ac = Object.assign,
    dh = !Ac || $a(function() {
        var f = {},
        c = {},
        a = Symbol();
        f[a] = 7;
        "abcdefghijklmnopqrst".split("").forEach(function(a) {
            c[a] = a
        });
        return 7 != Ac({},
        f)[a] || "abcdefghijklmnopqrst" != Object.keys(Ac({},
        c)).join("")
    }) ?
    function(f, c) {
        for (var a = Object(Za(f)), b = arguments.length, d = 1, e = ld, g = zc; b > d;) for (var k = id(arguments[d++]), h = e ? wb(k).concat(e(k)) : wb(k), l = h.length, n = 0, p; l > n;) g.call(k, p = h[n++]) && (a[p] = k[p]);
        return a
    }: Ac;
    F(F.S + F.F, "Object", {
        assign: dh
    });
    var eh = X.Object.assign,
    fh = O(function(f) {
        f.exports = {
            "default": eh,
            __esModule: true
        }
    }),
    T = Q(fh),
    Je = kd("IE_PROTO"),
    gh = Object.prototype,
    Ke = Object.getPrototypeOf ||
    function(f) {
        f = Object(Za(f));
        return Y(f, Je) ? f[Je] : "function" == typeof f.constructor && f instanceof f.constructor ? f.constructor.prototype: f instanceof Object ? gh: null
    };
    yc("getPrototypeOf",
    function() {
        return function(f) {
            return Ke(Object(Za(f)))
        }
    });
    var hh = X.Object.getPrototypeOf,
    Tb = O(function(f) {
        f.exports = {
            "default": hh,
            __esModule: true
        }
    }),
    N = Q(Tb),
    ih = O(function(f, c) {
        c.__esModule = true;
        c.
    default = function(a, b) {
            if (! (a instanceof b)) throw new TypeError("Cannot call a class as a function");
        }
    }),
    G = Q(ih);
    F(F.S + F.F * !Ca, "Object", {
        defineProperty: za.f
    });
    var jh = X.Object,
    kh = function(f, c, a) {
        return jh.defineProperty(f, c, a)
    },
    Ua = O(function(f) {
        f.exports = {
            "default": kh,
            __esModule: true
        }
    }),
    ea = Q(Ua),
    lh = O(function(f, c) {
        c.__esModule = true;
        var a = Ua && Ua.__esModule ? Ua: {
        default:
            Ua
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
    M = Q(lh),
    Pa = {},
    mh = Ca ? Object.defineProperties: function(f, c) {
        qa(f);
        for (var a = wb(c), b = a.length, d = 0, e; b > d;) za.f(f, e = a[d++], c[e]);
        return f
    },
    Le = P.document,
    md = Le && Le.documentElement,
    nh = kd("IE_PROTO"),
    nd = function() {},
    Bc = function() {
        var f = xc ? xb.createElement("iframe") : {},
        c = wc.length;
        f.style.display = "none";
        md.appendChild(f);
        f.src = "javascript:";
        f = f.contentWindow.document;
        f.open();
        f.write("<script>document.F=Object\x3c/script>");
        f.close();
        for (Bc = f.F; c--;) delete Bc.prototype[wc[c]];
        return Bc()
    },
    bb = Object.create ||
    function(f, c) {
        if (null !== f) {
            nd.prototype = qa(f);
            var a = new nd;
            nd.prototype = null;
            a[nh] = f
        } else a = Bc();
        return void 0 === c ? a: mh(a, c)
    },
    ia = O(function(f) {
        var c = Rb("wks"),
        a = P.Symbol,
        b = "function" == typeof a; (f.exports = function(d) {
            return c[d] || (c[d] = b && a[d] || (b ? a: vc)("Symbol." + d))
        }).store = c
    }),
    oh = za.f,
    Me = ia("toStringTag"),
    kb = function(f, c, a) {
        f && !Y(f = a ? f: f.prototype, Me) && oh(f, Me, {
            configurable: true,
            value: c
        })
    },
    Ne = {};
    Ta(Ne, ia("iterator"),
    function() {
        return this
    });
    var ph = function(f, c, a) {
        f.prototype = bb(Ne, {
            next: ab(1, a)
        });
        kb(f, c + " Iterator")
    },
    od = ia("iterator"),
    pd = !([].keys && "next" in [].keys()),
    qh = function() {
        return this
    },
    qd = function(f, c, a, b, d, e, g) {
        ph(a, c, b);
        b = function(b) {
            return ! pd && b in n ? n[b] : function() {
                return new a(this, b)
            }
        };
        var k = c + " Iterator",
        h = "values" == d,
        l = false,
        n = f.prototype,
        p = n[od] || n["@@iterator"] || d && n[d],
        m = p || b(d),
        q = d ? h ? b("entries") : m: void 0,
        r = "Array" == c ? n.entries || p: p,
        u;
        r && (f = Ke(r.call(new f)), f !== Object.prototype && f.next && kb(f, k, true));
        h && p && "values" !== p.name && (l = true, m = function() {
            return p.call(this)
        });
        g && (pd || l || !n[od]) && Ta(n, od, m);
        Pa[c] = m;
        Pa[k] = qh;
        if (d) {
            var y = {
                values: h ? m: b("values"),
                keys: e ? m: b("keys"),
                entries: q
            };
            if (g) for (u in y) u in n || Ta(n, u, y[u]);
            else F(F.P + F.F * (pd || l), c, y)
        }
        return y
    },
    rh = function(f) {
        return function(c, a) {
            c = String(Za(c));
            a = jd(a);
            var b = c.length,
            d;
            if (0 > a || a >= b) return f ? "": void 0;
            var e = c.charCodeAt(a);
            return 55296 > e || 56319 < e || a + 1 === b || 56320 > (d = c.charCodeAt(a + 1)) || 57343 < d ? f ? c.charAt(a) : e: f ? c.slice(a, a + 2) : (e - 55296 << 10) + (d - 56320) + 65536
        }
    } (true);
    qd(String, "String",
    function(f) {
        this._t = String(f);
        this._i = 0
    },
    function() {
        var f = this._t,
        c = this._i;
        if (c >= f.length) return {
            value: void 0,
            done: true
        };
        f = rh(f, c);
        this._i += f.length;
        return {
            value: f,
            done: false
        }
    });
    var cb = function(f, c) {
        return {
            value: c,
            done: !!f
        }
    };
    qd(Array, "Array",
    function(f, c) {
        this._t = Oa(f);
        this._i = 0;
        this._k = c
    },
    function() {
        var f = this._t,
        c = this._k,
        a = this._i++;
        return ! f || a >= f.length ? (this._t = void 0, cb(1)) : "keys" == c ? cb(0, a) : "values" == c ? cb(0, f[a]) : cb(0, [a, f[a]])
    },
    "values");
    Pa.Arguments = Pa.Array;
    for (var Oe = ia("toStringTag"), Pe = "CSSRuleList CSSStyleDeclaration CSSValueList ClientRectList DOMRectList DOMStringList DOMTokenList DataTransferItemList FileList HTMLAllCollection HTMLCollection HTMLFormElement HTMLSelectElement MediaList MimeTypeArray NamedNodeMap NodeList PaintRequestList Plugin PluginArray SVGLengthList SVGNumberList SVGPathSegList SVGPointList SVGStringList SVGTransformList SourceBufferList StyleSheetList TextTrackCueList TextTrackList TouchList".split(" "), rd = 0; rd < Pe.length; rd++) {
        var sd = Pe[rd],
        Qe = P[sd],
        td = Qe && Qe.prototype;
        td && !td[Oe] && Ta(td, Oe, sd);
        Pa[sd] = Pa.Array
    }
    var Cc = {
        f: ia
    },
    sh = Cc.f("iterator"),
    Ub = O(function(f) {
        f.exports = {
            "default": sh,
            __esModule: true
        }
    });
    Q(Ub);
    var Dc = O(function(f) {
        var c = vc("meta"),
        a = za.f,
        b = 0,
        d = Object.isExtensible ||
        function() {
            return ! 0
        },
        e = !$a(function() {
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
        k = f.exports = {
            KEY: c,
            NEED: false,
            fastKey: function(a, b) {
                if (!oa(a)) return "symbol" == typeof a ? a: ("string" == typeof a ? "S": "P") + a;
                if (!Y(a, c)) {
                    if (!d(a)) return "F";
                    if (!b) return "E";
                    g(a)
                }
                return a[c].i
            },
            getWeak: function(a, b) {
                if (!Y(a, c)) {
                    if (!d(a)) return ! 0;
                    if (!b) return ! 1;
                    g(a)
                }
                return a[c].w
            },
            onFreeze: function(a) {
                e && k.NEED && d(a) && !Y(a, c) && g(a);
                return a
            }
        }
    }),
    th = za.f,
    ud = function(f) {
        var c = X.Symbol || (X.Symbol = {});
        "_" == f.charAt(0) || f in c || th(c, f, {
            value: Cc.f(f)
        })
    },
    vd = Array.isArray ||
    function(f) {
        return "Array" == jb(f)
    },
    uh = wc.concat("length", "prototype"),
    Re = Object.getOwnPropertyNames ||
    function(f) {
        return He(f, uh)
    },
    Se = Re,
    vh = {}.toString,
    Te = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
    Ue = function(f) {
        if (Te && "[object Window]" == vh.call(f)) try {
            var c = Se(f)
        } catch(a) {
            c = Te.slice()
        } else c = Se(Oa(f));
        return c
    },
    Ve = Object.getOwnPropertyDescriptor,
    Ec = {
        f: Ca ? Ve: function(f, c) {
            f = Oa(f);
            c = Sb(c, true);
            if (Ie) try {
                return Ve(f, c)
            } catch(a) {}
            if (Y(f, c)) return ab(!zc.call(f, c), f[c])
        }
    },
    wh = Dc.KEY,
    We = Ec.f,
    lb = za.f,
    Xe = Ue,
    ta = P.Symbol,
    Fc = P.JSON,
    Gc = Fc && Fc.stringify,
    ua = ia("_hidden"),
    Ye = ia("toPrimitive"),
    xh = {}.propertyIsEnumerable,
    Vb = Rb("symbol-registry"),
    Va = Rb("symbols"),
    Wb = Rb("op-symbols"),
    Ga = Object.prototype,
    yb = "function" == typeof ta,
    wd = P.QObject,
    xd = !wd || !wd.prototype || !wd.prototype.findChild,
    yd = Ca && $a(function() {
        return 7 != bb(lb({},
        "a", {
            get: function() {
                return lb(this, "a", {
                    value: 7
                }).a
            }
        })).a
    }) ?
    function(f, c, a) {
        var b = We(Ga, c);
        b && delete Ga[c];
        lb(f, c, a);
        b && f !== Ga && lb(Ga, c, b)
    }: lb,
    Ze = function(f) {
        var c = Va[f] = bb(ta.prototype);
        c._k = f;
        return c
    },
    zd = yb && "symbol" == typeof ta.iterator ?
    function(f) {
        return "symbol" == typeof f
    }: function(f) {
        return f instanceof ta
    },
    Hc = function(f, c, a) {
        f === Ga && Hc(Wb, c, a);
        qa(f);
        c = Sb(c, true);
        qa(a);
        return Y(Va, c) ? (a.enumerable ? (Y(f, ua) && f[ua][c] && (f[ua][c] = false), a = bb(a, {
            enumerable: ab(0, false)
        })) : (Y(f, ua) || lb(f, ua, ab(1, {})), f[ua][c] = true), yd(f, c, a)) : lb(f, c, a)
    },
    $e = function(f, c) {
        qa(f);
        var a = c = Oa(c),
        b = wb(a),
        d = ld;
        if (d) {
            d = d(a);
            for (var e = zc,
            g = 0,
            k; d.length > g;) e.call(a, k = d[g++]) && b.push(k)
        }
        a = 0;
        k = b.length;
        for (var h; k > a;) Hc(f, h = b[a++], c[h]);
        return f
    },
    yh = function(f) {
        var c = xh.call(this, f = Sb(f, true));
        return this === Ga && Y(Va, f) && !Y(Wb, f) ? false : c || !Y(this, f) || !Y(Va, f) || Y(this, ua) && this[ua][f] ? c: true
    },
    af = function(f, c) {
        f = Oa(f);
        c = Sb(c, true);
        if (f !== Ga || !Y(Va, c) || Y(Wb, c)) {
            var a = We(f, c); ! a || !Y(Va, c) || Y(f, ua) && f[ua][c] || (a.enumerable = true);
            return a
        }
    },
    bf = function(f) {
        f = Xe(Oa(f));
        for (var c = [], a = 0, b; f.length > a;) Y(Va, b = f[a++]) || b == ua || b == wh || c.push(b);
        return c
    },
    cf = function(f) {
        var c = f === Ga;
        f = Xe(c ? Wb: Oa(f));
        for (var a = [], b = 0, d; f.length > b;) Y(Va, d = f[b++]) && (c ? Y(Ga, d) : 1) && a.push(Va[d]);
        return a
    };
    yb || (ta = function() {
        if (this instanceof ta) throw TypeError("Symbol is not a constructor!");
        var f = vc(0 < arguments.length ? arguments[0] : void 0),
        c = function(a) {
            this === Ga && c.call(Wb, a);
            Y(this, ua) && Y(this[ua], f) && (this[ua][f] = false);
            yd(this, f, ab(1, a))
        };
        Ca && xd && yd(Ga, f, {
            configurable: true,
            set: c
        });
        return Ze(f)
    },
    Ta(ta.prototype, "toString",
    function() {
        return this._k
    }), Ec.f = af, za.f = Hc, Re = Ue = bf, zc = yh, ld = cf, Cc.f = function(f) {
        return Ze(ia(f))
    });
    F(F.G + F.W + F.F * !yb, {
        Symbol: ta
    });
    for (var df = "hasInstance isConcatSpreadable iterator match replace search species split toPrimitive toStringTag unscopables".split(" "), ef = 0; df.length > ef;) ia(df[ef++]);
    for (var ff = wb(ia.store), gf = 0; ff.length > gf;) ud(ff[gf++]);
    F(F.S + F.F * !yb, "Symbol", {
        "for": function(f) {
            return Y(Vb, f += "") ? Vb[f] : Vb[f] = ta(f)
        },
        keyFor: function(f) {
            if (!zd(f)) throw TypeError(f + " is not a symbol!");
            for (var c in Vb) if (Vb[c] === f) return c
        },
        useSetter: function() {
            xd = true
        },
        useSimple: function() {
            xd = false
        }
    });
    F(F.S + F.F * !yb, "Object", {
        create: function(f, c) {
            return void 0 === c ? bb(f) : $e(bb(f), c)
        },
        defineProperty: Hc,
        defineProperties: $e,
        getOwnPropertyDescriptor: af,
        getOwnPropertyNames: bf,
        getOwnPropertySymbols: cf
    });
    Fc && F(F.S + F.F * (!yb || $a(function() {
        var f = ta();
        return "[null]" != Gc([f]) || "{}" != Gc({
            a: f
        }) || "{}" != Gc(Object(f))
    })), "JSON", {
        stringify: function(f) {
            for (var c = [f], a = 1, b; arguments.length > a;) c.push(arguments[a++]);
            b = a = c[1];
            if ((oa(a) || void 0 !== f) && !zd(f)) return vd(a) || (a = function(a, c) {
                "function" == typeof b && (c = b.call(this, a, c));
                if (!zd(c)) return c
            }),
            c[1] = a,
            Gc.apply(Fc, c)
        }
    });
    ta.prototype[Ye] || Ta(ta.prototype, Ye, ta.prototype.valueOf);
    kb(ta, "Symbol");
    kb(Math, "Math", true);
    kb(P.JSON, "JSON", true);
    ud("asyncIterator");
    ud("observable");
    var zh = X.Symbol,
    Xb = O(function(f) {
        f.exports = {
            "default": zh,
            __esModule: true
        }
    }),
    hf = Q(Xb),
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
        function(a) {
            return typeof a
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
    qb = Q(zb),
    Ah = O(function(f, c) {
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
    R = Q(Ah),
    Bh = Ec.f;
    yc("getOwnPropertyDescriptor",
    function() {
        return function(f, c) {
            return Bh(Oa(f), c)
        }
    });
    var Ch = X.Object,
    Dh = function(f, c) {
        return Ch.getOwnPropertyDescriptor(f, c)
    },
    Yb = O(function(f) {
        f.exports = {
            "default": Dh,
            __esModule: true
        }
    }),
    da = Q(Yb),
    Eh = O(function(f, c) {
        c.__esModule = true;
        var a = Tb && Tb.__esModule ? Tb: {
        default:
            Tb
        },
        b = Yb && Yb.__esModule ? Yb: {
        default:
            Yb
        };
        c.
    default = function h(c, g, k) {
            null === c && (c = Function.prototype);
            var e = (0, b.
        default)(c, g);
            if (void 0 === e) {
                if (c = (0, a.
            default)(c), null !== c) return h(c, g, k)
            } else {
                if ("value" in e) return e.value;
                g = e.get;
                return void 0 === g ? void 0 : g.call(k)
            }
        }
    }),
    Wa = Q(Eh),
    Fh = Object.setPrototypeOf || ("__proto__" in {} ?
    function(f, c, a) {
        try {
            a = ka(Function.call, Ec.f(Object.prototype, "__proto__").set, 2),
            a(f, []),
            c = !(f instanceof Array)
        } catch(b) {
            c = true
        }
        return function(b, d) {
            qa(b);
            if (!oa(d) && null !== d) throw TypeError(d + ": can't set as prototype!");
            c ? b.__proto__ = d: a(b, d);
            return b
        }
    } ({},
    false) : void 0);
    F(F.S, "Object", {
        setPrototypeOf: Fh
    });
    var Gh = X.Object.setPrototypeOf,
    jf = O(function(f) {
        f.exports = {
            "default": Gh,
            __esModule: true
        }
    });
    Q(jf);
    F(F.S, "Object", {
        create: bb
    });
    var Hh = X.Object,
    Ih = function(f, c) {
        return Hh.create(f, c)
    },
    kf = O(function(f) {
        f.exports = {
            "default": Ih,
            __esModule: true
        }
    }),
    Jh = Q(kf),
    Kh = O(function(f, c) {
        function a(a) {
            return a && a.__esModule ? a: {
            default:
                a
            }
        }
        c.__esModule = true;
        var b = a(jf),
        d = a(kf),
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
    S = Q(Kh),
    Lh = ia("toStringTag"),
    Mh = "Arguments" == jb(function() {
        return arguments
    } ()),
    Ic = function(f) {
        var c;
        if (void 0 === f) var a = "Undefined";
        else {
            if (null === f) var b = "Null";
            else {
                a: {
                    var d = f = Object(f);
                    try {
                        b = d[Lh];
                        break a
                    } catch(e) {}
                    b = void 0
                }
                b = "string" == typeof(a = b) ? a: Mh ? jb(f) : "Object" == (c = jb(f)) && "function" == typeof f.callee ? "Arguments": c
            }
            a = b
        }
        return a
    },
    Nh = ia("iterator"),
    Oh = X.isIterable = function(f) {
        f = Object(f);
        return void 0 !== f[Nh] || "@@iterator" in f || Pa.hasOwnProperty(Ic(f))
    },
    Zb = O(function(f) {
        f.exports = {
            "default": Oh,
            __esModule: true
        }
    });
    Q(Zb);
    var Ph = ia("iterator"),
    Ad = X.getIteratorMethod = function(f) {
        if (void 0 != f) return f[Ph] || f["@@iterator"] || Pa[Ic(f)]
    },
    Qh = X.getIterator = function(f) {
        var c = Ad(f);
        if ("function" != typeof c) throw TypeError(f + " is not iterable!");
        return qa(c.call(f))
    },
    $b = O(function(f) {
        f.exports = {
            "default": Qh,
            __esModule: true
        }
    }),
    gd = Q($b),
    Rh = O(function(f, c) {
        c.__esModule = true;
        var a = Zb && Zb.__esModule ? Zb: {
        default:
            Zb
        },
        b = $b && $b.__esModule ? $b: {
        default:
            $b
        };
        c.
    default = function() {
            return function(d, c) {
                if (Array.isArray(d)) return d;
                if ((0, a.
            default)(Object(d))) {
                    var g = [],
                    e = true,
                    h = false,
                    f = void 0;
                    try {
                        for (var n = (0, b.
                    default)(d), p; ! (e = (p = n.next()).done) && (g.push(p.value), !c || g.length !== c); e = true);
                    } catch(m) {
                        h = true,
                        f = m
                    } finally {
                        try {
                            if (!e && n["return"]) n["return"]()
                        } finally {
                            if (h) throw f;
                        }
                    }
                    return g
                }
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        } ()
    }),
    db = Q(Rh),
    lf = function(f, c, a, b) {
        try {
            return b ? c(qa(a)[0], a[1]) : c(a)
        } catch(d) {
            throw c = f["return"],
            void 0 !== c && qa(c.call(f)),
            d;
        }
    },
    mf = ia("iterator"),
    nf = Array.prototype,
    Bd = ia("iterator"),
    of = false;
    try { [7][Bd]()["return"] = function() {
            of = true
        }
    } catch(f) {}
    var pf = function(f, c) {
        if (!c && !of) return ! 1;
        var a = false;
        try {
            c = [7];
            var b = c[Bd]();
            b.next = function() {
                return {
                    done: a = true
                }
            };
            c[Bd] = function() {
                return b
            };
            f(c)
        } catch(d) {}
        return a
    };
    F(F.S + F.F * !pf(function(f) {}), "Array", {
        from: function(f) {
            var c = Object(Za(f)),
            a = "function" == typeof this ? this: Array,
            b = arguments.length,
            d = 1 < b ? arguments[1] : void 0,
            e = void 0 !== d,
            g = 0,
            k = Ad(c),
            h;
            e && (d = ka(d, 2 < b ? arguments[2] : void 0, 2));
            if (void 0 != k && (a != Array || void 0 === k || Pa.Array !== k && nf[mf] !== k)) for (c = k.call(c), a = new a; ! (h = c.next()).done; g++) b = a,
            k = g,
            h = e ? lf(c, d, [h.value, g], true) : h.value,
            k in b ? za.f(b, k, ab(0, h)) : b[k] = h;
            else for (b = uc(c.length), a = new a(b); b > g; g++) {
                k = a;
                h = g;
                var l = e ? d(c[g], g) : c[g];
                h in k ? za.f(k, h, ab(0, l)) : k[h] = l
            }
            a.length = g;
            return a
        }
    });
    var Sh = X.Array.from,
    ac = O(function(f) {
        f.exports = {
            "default": Sh,
            __esModule: true
        }
    }),
    Th = Q(ac),
    Uh = O(function(f, c) {
        c.__esModule = true;
        var a = ac && ac.__esModule ? ac: {
        default:
            ac
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
    W = Q(Uh),
    Vh = Dc.onFreeze;
    yc("freeze",
    function(f) {
        return function(c) {
            return f && oa(c) ? f(Vh(c)) : c
        }
    });
    var Wh = X.Object.freeze,
    Xh = O(function(f) {
        f.exports = {
            "default": Wh,
            __esModule: true
        }
    }),
    be = Q(Xh),
    qf = X.JSON || (X.JSON = {
        stringify: JSON.stringify
    }),
    Yh = function(f) {
        return qf.stringify.apply(qf, arguments)
    },
    Zh = O(function(f) {
        f.exports = {
            "default": Yh,
            __esModule: true
        }
    }),
    sg = Q(Zh),
    Ha = {
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
    bc = O(function(f) {
        var c = Array.prototype.concat,
        a = Array.prototype.slice,
        b = f.exports = function(b) {
            for (var d = [], g = 0, k = b.length; g < k; g++) {
                var h = b[g];
                var f = (f = h) && "string" !== typeof f ? f instanceof Array || Array.isArray(f) || 0 <= f.length && (f.splice instanceof Function || da(f, f.length - 1) && "String" !== f.constructor.name) : false;
                f ? d = c.call(d, a.call(h)) : d.push(h)
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
        function c(a, b, d) {
            return Math.min(Math.max(b, a), d)
        }
        function a(a) {
            a = a.toString(16).toUpperCase();
            return 2 > a.length ? "0" + a: a
        }
        var b = {},
        d;
        for (d in Ha) Ha.hasOwnProperty(d) && (b[Ha[d]] = d);
        var e = f.exports = {
            to: {},
            get: {}
        };
        e.get = function(a) {
            switch (a.substring(0, 3).toLowerCase()) {
            case "hsl":
                a = e.get.hsl(a);
                var b = "hsl";
                break;
            case "hwb":
                a = e.get.hwb(a);
                b = "hwb";
                break;
            default:
                a = e.get.rgb(a),
                b = "rgb"
            }
            return a ? {
                model: b,
                value: a
            }: null
        };
        e.get.rgb = function(a) {
            if (!a) return null;
            var b = /^#([a-f0-9]{3,4})$/i,
            d = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
            g = /^rgba?\(\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
            e = /(\D+)/,
            f = [0, 0, 0, 1],
            m;
            if (m = a.match(/^#([a-f0-9]{6})([a-f0-9]{2})?$/i)) {
                b = m[2];
                m = m[1];
                for (a = 0; 3 > a; a++) d = 2 * a,
                f[a] = parseInt(m.slice(d, d + 2), 16);
                b && (f[3] = Math.round(parseInt(b, 16) / 255 * 100) / 100)
            } else if (m = a.match(b)) {
                m = m[1];
                b = m[3];
                for (a = 0; 3 > a; a++) f[a] = parseInt(m[a] + m[a], 16);
                b && (f[3] = Math.round(parseInt(b + b, 16) / 255 * 100) / 100)
            } else if (m = a.match(d)) {
                for (a = 0; 3 > a; a++) f[a] = parseInt(m[a + 1], 0);
                m[4] && (f[3] = parseFloat(m[4]))
            } else if (m = a.match(g)) {
                for (a = 0; 3 > a; a++) f[a] = Math.round(2.55 * parseFloat(m[a + 1]));
                m[4] && (f[3] = parseFloat(m[4]))
            } else {
                if (m = a.match(e)) {
                    if ("transparent" === m[1]) return [0, 0, 0, 0];
                    f = Ha[m[1]];
                    if (!f) return null;
                    f[3] = 1;
                    return f
                }
                return null
            }
            for (a = 0; 3 > a; a++) f[a] = c(f[a], 0, 255);
            f[3] = c(f[3], 0, 1);
            return f
        };
        e.get.hsl = function(a) {
            if (!a) return null;
            var b = a.match(/^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/);
            if (b) {
                var d = parseFloat(b[4]);
                a = (parseFloat(b[1]) + 360) % 360;
                var g = c(parseFloat(b[2]), 0, 100);
                b = c(parseFloat(b[3]), 0, 100);
                d = c(isNaN(d) ? 1 : d, 0, 1);
                return [a, g, b, d]
            }
            return null
        };
        e.get.hwb = function(a) {
            if (!a) return null;
            var b = a.match(/^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/);
            if (b) {
                var d = parseFloat(b[4]);
                a = (parseFloat(b[1]) % 360 + 360) % 360;
                var g = c(parseFloat(b[2]), 0, 100);
                b = c(parseFloat(b[3]), 0, 100);
                d = c(isNaN(d) ? 1 : d, 0, 1);
                return [a, g, b, d]
            }
            return null
        };
        e.to.hex = function() {
            var b = bc(arguments);
            return "#" + a(b[0]) + a(b[1]) + a(b[2]) + (1 > b[3] ? a(Math.round(255 * b[3])) : "")
        };
        e.to.rgb = function() {
            var a = bc(arguments);
            return 4 > a.length || 1 === a[3] ? "rgb(" + Math.round(a[0]) + ", " + Math.round(a[1]) + ", " + Math.round(a[2]) + ")": "rgba(" + Math.round(a[0]) + ", " + Math.round(a[1]) + ", " + Math.round(a[2]) + ", " + a[3] + ")"
        };
        e.to.rgb.percent = function() {
            var a = bc(arguments),
            b = Math.round(a[0] / 255 * 100),
            d = Math.round(a[1] / 255 * 100),
            c = Math.round(a[2] / 255 * 100);
            return 4 > a.length || 1 === a[3] ? "rgb(" + b + "%, " + d + "%, " + c + "%)": "rgba(" + b + "%, " + d + "%, " + c + "%, " + a[3] + ")"
        };
        e.to.hsl = function() {
            var a = bc(arguments);
            return 4 > a.length || 1 === a[3] ? "hsl(" + a[0] + ", " + a[1] + "%, " + a[2] + "%)": "hsla(" + a[0] + ", " + a[1] + "%, " + a[2] + "%, " + a[3] + ")"
        };
        e.to.hwb = function() {
            var a = bc(arguments),
            b = "";
            4 <= a.length && 1 !== a[3] && (b = ", " + a[3]);
            return "hwb(" + a[0] + ", " + a[1] + "%, " + a[2] + "%" + b + ")"
        };
        e.to.keyword = function(a) {
            return b[a.slice(0, 3)]
        }
    }),
    mb = O(function(f) {
        var c = {};
        for (d in Ha) Ha.hasOwnProperty(d) && (c[Ha[d]] = d);
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
        a.rgb.hsl = function(a) {
            var b = a[0] / 255,
            d = a[1] / 255,
            c = a[2] / 255;
            a = Math.min(b, d, c);
            var e = Math.max(b, d, c),
            f = e - a,
            p;
            e === a ? p = 0 : b === e ? p = (d - c) / f: d === e ? p = 2 + (c - b) / f: c === e && (p = 4 + (b - d) / f);
            p = Math.min(60 * p, 360);
            0 > p && (p += 360);
            b = (a + e) / 2;
            return [p, 100 * (e === a ? 0 : .5 >= b ? f / (e + a) : f / (2 - e - a)), 100 * b]
        };
        a.rgb.hsv = function(a) {
            var b, d = a[0] / 255,
            c = a[1] / 255,
            e = a[2] / 255,
            f = Math.max(d, c, e);
            var p = f - Math.min(d, c, e);
            if (0 === p) var m = b = 0;
            else {
                b = p / f;
                a = (f - d) / 6 / p + .5;
                var q = (f - c) / 6 / p + .5;
                p = (f - e) / 6 / p + .5;
                d === f ? m = p - q: c === f ? m = 1 / 3 + a - p: e === f && (m = 2 / 3 + q - a);
                0 > m ? m += 1 : 1 < m && --m
            }
            return [360 * m, 100 * b, 100 * f]
        };
        a.rgb.hwb = function(b) {
            var d = b[0],
            c = b[1],
            h = b[2];
            b = a.rgb.hsl(b)[0];
            var e = 1 / 255 * Math.min(d, Math.min(c, h));
            h = 1 - 1 / 255 * Math.max(d, Math.max(c, h));
            return [b, 100 * e, 100 * h]
        };
        a.rgb.cmyk = function(a) {
            var b = a[0] / 255,
            d = a[1] / 255;
            a = a[2] / 255;
            var c = Math.min(1 - b, 1 - d, 1 - a);
            return [100 * ((1 - b - c) / (1 - c) || 0), 100 * ((1 - d - c) / (1 - c) || 0), 100 * ((1 - a - c) / (1 - c) || 0), 100 * c]
        };
        a.rgb.keyword = function(a) {
            var b = c[a];
            if (b) return b;
            b = Infinity;
            var d;
            for (d in Ha) if (Ha.hasOwnProperty(d)) {
                var h = Ha[d];
                h = Math.pow(a[0] - h[0], 2) + Math.pow(a[1] - h[1], 2) + Math.pow(a[2] - h[2], 2);
                if (h < b) {
                    b = h;
                    var e = d
                }
            }
            return e
        };
        a.keyword.rgb = function(a) {
            return Ha[a]
        };
        a.rgb.xyz = function(a) {
            var b = a[0] / 255,
            d = a[1] / 255;
            a = a[2] / 255;
            b = .04045 < b ? Math.pow((b + .055) / 1.055, 2.4) : b / 12.92;
            d = .04045 < d ? Math.pow((d + .055) / 1.055, 2.4) : d / 12.92;
            a = .04045 < a ? Math.pow((a + .055) / 1.055, 2.4) : a / 12.92;
            return [100 * (.4124 * b + .3576 * d + .1805 * a), 100 * (.2126 * b + .7152 * d + .0722 * a), 100 * (.0193 * b + .1192 * d + .9505 * a)]
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
        a.hsl.rgb = function(a) {
            var b = a[0] / 360,
            d = a[1] / 100;
            a = a[2] / 100;
            if (0 === d) {
                var c = 255 * a;
                return [c, c, c]
            }
            d = .5 > a ? a * (1 + d) : a + d - a * d;
            a = 2 * a - d;
            var e = [0, 0, 0];
            for (var f = 0; 3 > f; f++) c = b + 1 / 3 * -(f - 1),
            0 > c && c++,
            1 < c && c--,
            c = 1 > 6 * c ? a + 6 * (d - a) * c: 1 > 2 * c ? d: 2 > 3 * c ? a + (d - a) * (2 / 3 - c) * 6 : a,
            e[f] = 255 * c;
            return e
        };
        a.hsl.hsv = function(a) {
            var b = a[0],
            d = a[1] / 100;
            a = a[2] / 100;
            var c = d,
            e = Math.max(a, .01);
            a *= 2;
            d *= 1 >= a ? a: 2 - a;
            c *= 1 >= e ? e: 2 - e;
            return [b, 100 * (0 === a ? 2 * c / (e + c) : 2 * d / (a + d)), (a + d) / 2 * 100]
        };
        a.hsv.rgb = function(a) {
            var b = a[0] / 60,
            d = a[1] / 100;
            a = a[2] / 100;
            var c = Math.floor(b) % 6,
            e = b - Math.floor(b);
            b = 255 * a * (1 - d);
            var f = 255 * a * (1 - d * e);
            d = 255 * a * (1 - d * (1 - e));
            a *= 255;
            switch (c) {
            case 0:
                return [a, d, b];
            case 1:
                return [f, a, b];
            case 2:
                return [b, a, d];
            case 3:
                return [b, f, a];
            case 4:
                return [d, b, a];
            case 5:
                return [a, b, f]
            }
        };
        a.hsv.hsl = function(a) {
            var b = a[0],
            d = a[1] / 100;
            a = a[2] / 100;
            var c = Math.max(a, .01);
            var e = (2 - d) * c;
            c = d * c / (1 >= e ? e: 2 - e) || 0;
            return [b, 100 * c, (2 - d) * a / 2 * 100]
        };
        a.hwb.rgb = function(a) {
            var b = a[0] / 360,
            d = a[1] / 100;
            a = a[2] / 100;
            var c = d + a;
            1 < c && (d /= c, a /= c);
            c = Math.floor(6 * b);
            a = 1 - a;
            b = 6 * b - c;
            0 !== (c & 1) && (b = 1 - b);
            b = d + b * (a - d);
            switch (c) {
            default:
            case 6:
            case 0:
                c = a;
                var e = b;
                break;
            case 1:
                c = b;
                e = a;
                break;
            case 2:
                c = d;
                e = a;
                d = b;
                break;
            case 3:
                c = d;
                e = b;
                d = a;
                break;
            case 4:
                c = b;
                e = d;
                d = a;
                break;
            case 5:
                c = a,
                e = d,
                d = b
            }
            return [255 * c, 255 * e, 255 * d]
        };
        a.cmyk.rgb = function(a) {
            var b = a[3] / 100;
            return [255 * (1 - Math.min(1, a[0] / 100 * (1 - b) + b)), 255 * (1 - Math.min(1, a[1] / 100 * (1 - b) + b)), 255 * (1 - Math.min(1, a[2] / 100 * (1 - b) + b))]
        };
        a.xyz.rgb = function(a) {
            var b = a[0] / 100,
            d = a[1] / 100,
            c = a[2] / 100;
            a = 3.2406 * b + -1.5372 * d + -.4986 * c;
            var e = -.9689 * b + 1.8758 * d + .0415 * c;
            b = .0557 * b + -.204 * d + 1.057 * c;
            a = .0031308 < a ? 1.055 * Math.pow(a, 1 / 2.4) - .055 : 12.92 * a;
            e = .0031308 < e ? 1.055 * Math.pow(e, 1 / 2.4) - .055 : 12.92 * e;
            b = .0031308 < b ? 1.055 * Math.pow(b, 1 / 2.4) - .055 : 12.92 * b;
            a = Math.min(Math.max(0, a), 1);
            e = Math.min(Math.max(0, e), 1);
            b = Math.min(Math.max(0, b), 1);
            return [255 * a, 255 * e, 255 * b]
        };
        a.xyz.lab = function(a) {
            var b = a[0],
            d = a[1];
            a = a[2];
            b /= 95.047;
            d /= 100;
            a /= 108.883;
            b = .008856 < b ? Math.pow(b, 1 / 3) : 7.787 * b + 16 / 116;
            d = .008856 < d ? Math.pow(d, 1 / 3) : 7.787 * d + 16 / 116;
            a = .008856 < a ? Math.pow(a, 1 / 3) : 7.787 * a + 16 / 116;
            return [116 * d - 16, 500 * (b - d), 200 * (d - a)]
        };
        a.lab.xyz = function(a) {
            var b = a[1],
            d = a[2];
            a = (a[0] + 16) / 116;
            b = b / 500 + a;
            d = a - d / 200;
            var c = Math.pow(a, 3),
            e = Math.pow(b, 3),
            f = Math.pow(d, 3);
            return [95.047 * (.008856 < e ? e: (b - 16 / 116) / 7.787), 100 * (.008856 < c ? c: (a - 16 / 116) / 7.787), 108.883 * (.008856 < f ? f: (d - 16 / 116) / 7.787)]
        };
        a.lab.lch = function(a) {
            var b = a[0],
            d = a[1];
            a = a[2];
            var c = 360 * Math.atan2(a, d) / 2 / Math.PI;
            0 > c && (c += 360);
            return [b, Math.sqrt(d * d + a * a), c]
        };
        a.lch.lab = function(a) {
            var b = a[0],
            d = a[1];
            a = a[2] / 360 * 2 * Math.PI;
            return [b, d * Math.cos(a), d * Math.sin(a)]
        };
        a.rgb.ansi16 = function(b) {
            var d = b[0],
            c = b[1],
            h = b[2],
            e = 1 in arguments ? arguments[1] : a.rgb.hsv(b)[2];
            e = Math.round(e / 50);
            if (0 === e) return 30;
            d = 30 + (Math.round(h / 255) << 2 | Math.round(c / 255) << 1 | Math.round(d / 255));
            2 === e && (d += 60);
            return d
        };
        a.hsv.ansi16 = function(b) {
            return a.rgb.ansi16(a.hsv.rgb(b), b[2])
        };
        a.rgb.ansi256 = function(a) {
            var b = a[0],
            d = a[1];
            a = a[2];
            return b === d && d === a ? 8 > b ? 16 : 248 < b ? 231 : Math.round((b - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(b / 255 * 5) + 6 * Math.round(d / 255 * 5) + Math.round(a / 255 * 5)
        };
        a.ansi16.rgb = function(a) {
            var b = a % 10;
            if (0 === b || 7 === b) return 50 < a && (b += 3.5),
            b = b / 10.5 * 255,
            [b, b, b];
            a = .5 * (~~ (50 < a) + 1);
            return [(b & 1) * a * 255, (b >> 1 & 1) * a * 255, (b >> 2 & 1) * a * 255]
        };
        a.ansi256.rgb = function(a) {
            if (232 <= a) {
                var b = 10 * (a - 232) + 8;
                return [b, b, b]
            }
            a -= 16;
            b = Math.floor(a / 36) / 5 * 255;
            var d = Math.floor((a %= 36) / 6) / 5 * 255;
            return [b, d, a % 6 / 5 * 255]
        };
        a.rgb.hex = function(a) {
            a = (((Math.round(a[0]) & 255) << 16) + ((Math.round(a[1]) & 255) << 8) + (Math.round(a[2]) & 255)).toString(16).toUpperCase();
            return "000000".substring(a.length) + a
        };
        a.hex.rgb = function(a) {
            a = a.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
            if (!a) return [0, 0, 0];
            var b = a[0];
            3 === a[0].length && (b = b.split("").map(function(a) {
                return a + a
            }).join(""));
            a = parseInt(b, 16);
            return [a >> 16 & 255, a >> 8 & 255, a & 255]
        };
        a.rgb.hcg = function(a) {
            var b = a[0] / 255,
            d = a[1] / 255;
            a = a[2] / 255;
            var c = Math.max(Math.max(b, d), a),
            f = Math.min(Math.min(b, d), a),
            e = c - f;
            return [(0 >= e ? 0 : c === b ? (d - a) / e % 6 : c === d ? 2 + (a - b) / e: (b - d) / e + 8) / 6 % 1 * 360, 100 * e, 100 * (1 > e ? f / (1 - e) : 0)]
        };
        a.hsl.hcg = function(a) {
            var b = a[1] / 100,
            d = a[2] / 100,
            c = 0;
            b = .5 > d ? 2 * b * d: 2 * b * (1 - d);
            1 > b && (c = (d - .5 * b) / (1 - b));
            return [a[0], 100 * b, 100 * c]
        };
        a.hsv.hcg = function(a) {
            var b = a[2] / 100,
            d = a[1] / 100 * b,
            c = 0;
            1 > d && (c = (b - d) / (1 - d));
            return [a[0], 100 * d, 100 * c]
        };
        a.hcg.rgb = function(a) {
            var b = a[1] / 100,
            d = a[2] / 100;
            if (0 === b) return [255 * d, 255 * d, 255 * d];
            var c = [0, 0, 0];
            a = a[0] / 360 % 1 * 6;
            var f = a % 1,
            e = 1 - f;
            switch (Math.floor(a)) {
            case 0:
                c[0] = 1;
                c[1] = f;
                c[2] = 0;
                break;
            case 1:
                c[0] = e;
                c[1] = 1;
                c[2] = 0;
                break;
            case 2:
                c[0] = 0;
                c[1] = 1;
                c[2] = f;
                break;
            case 3:
                c[0] = 0;
                c[1] = e;
                c[2] = 1;
                break;
            case 4:
                c[0] = f;
                c[1] = 0;
                c[2] = 1;
                break;
            default:
                c[0] = 1,
                c[1] = 0,
                c[2] = e
            }
            d *= 1 - b;
            return [255 * (b * c[0] + d), 255 * (b * c[1] + d), 255 * (b * c[2] + d)]
        };
        a.hcg.hsv = function(a) {
            var b = a[1] / 100,
            d = b + a[2] / 100 * (1 - b),
            c = 0;
            0 < d && (c = b / d);
            return [a[0], 100 * c, 100 * d]
        };
        a.hcg.hsl = function(a) {
            var b = a[1] / 100,
            d = a[2] / 100 * (1 - b) + .5 * b,
            c = 0;
            0 < d && .5 > d ? c = b / (2 * d) : .5 <= d && 1 > d && (c = b / (2 * (1 - d)));
            return [a[0], 100 * c, 100 * d]
        };
        a.hcg.hwb = function(a) {
            var b = a[1] / 100,
            d = b + a[2] / 100 * (1 - b);
            return [a[0], 100 * (d - b), 100 * (1 - d)]
        };
        a.hwb.hcg = function(a) {
            var b = 1 - a[2] / 100,
            d = b - a[1] / 100,
            c = 0;
            1 > d && (c = (b - d) / (1 - d));
            return [a[0], 100 * d, 100 * c]
        };
        a.apple.rgb = function(a) {
            return [a[0] / 65535 * 255, a[1] / 65535 * 255, a[2] / 65535 * 255]
        };
        a.rgb.apple = function(a) {
            return [a[0] / 255 * 65535, a[1] / 255 * 65535, a[2] / 255 * 65535]
        };
        a.gray.rgb = function(a) {
            return [a[0] / 100 * 255, a[0] / 100 * 255, a[0] / 100 * 255]
        };
        a.gray.hsl = a.gray.hsv = function(a) {
            return [0, 0, a[0]]
        };
        a.gray.hwb = function(a) {
            return [0, 100, a[0]]
        };
        a.gray.cmyk = function(a) {
            return [0, 0, 0, a[0]]
        };
        a.gray.lab = function(a) {
            return [a[0], 0, 0]
        };
        a.gray.hex = function(a) {
            a = Math.round(a[0] / 100 * 255) & 255;
            a = ((a << 16) + (a << 8) + a).toString(16).toUpperCase();
            return "000000".substring(a.length) + a
        };
        a.rgb.gray = function(a) {
            return [(a[0] + a[1] + a[2]) / 3 / 255 * 100]
        }
    }),
    $h = function(f) {
        for (var c = {},
        a = Ea(mb), b = a.length, d = 0; d < b; d++) c[a[d]] = {
            distance: -1,
            parent: null
        };
        a = [f];
        for (c[f].distance = 0; a.length;) {
            f = a.pop();
            b = Ea(mb[f]);
            d = b.length;
            for (var e = 0; e < d; e++) {
                var g = b[e],
                k = c[g]; - 1 === k.distance && (k.distance = c[f].distance + 1, k.parent = f, a.unshift(g))
            }
        }
        a = {};
        f = Ea(c);
        b = f.length;
        for (d = 0; d < b; d++) {
            var h = f[d];
            if (null !== c[h].parent) {
                e = h;
                g = c;
                k = [g[h].parent, h];
                var l = mb[g[h].parent][h];
                for (h = g[h].parent; g[h].parent;) k.unshift(g[h].parent),
                l = pg(mb[g[h].parent][h], l),
                h = g[h].parent;
                l.conversion = k;
                a[e] = l
            }
        }
        return a
    },
    Ab = {};
    Ea(mb).forEach(function(f) {
        Ab[f] = {};
        Object.defineProperty(Ab[f], "channels", {
            value: mb[f].channels
        });
        Object.defineProperty(Ab[f], "labels", {
            value: mb[f].labels
        });
        var c = $h(f);
        Ea(c).forEach(function(a) {
            var b = c[a];
            Ab[f][a] = rg(b);
            Ab[f][a].raw = qg(b)
        })
    });
    var xa = Ab,
    Rc = [].slice,
    ae = ["keyword", "gray", "hex"],
    Tc = {};
    Ea(xa).forEach(function(f) {
        Tc[Rc.call(xa[f].labels).sort().join("")] = f
    });
    var lc = {};
    fa.prototype = {
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
            c = xa[this.model].channels, a = xa[this.model].labels, b = 0; b < c; b++) f[a[b]] = this.color[b];
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
            return new fa(this.color.map(tg(f)).concat(this.valpha), this.model)
        },
        alpha: function(f) {
            return arguments.length ? new fa(this.color.concat(Math.max(0, Math.min(1, f))), this.model) : this.valpha
        },
        red: aa("rgb", 0, ha(255)),
        green: aa("rgb", 1, ha(255)),
        blue: aa("rgb", 2, ha(255)),
        hue: aa(["hsl", "hsv", "hsl", "hwb", "hcg"], 0,
        function(f) {
            return (f % 360 + 360) % 360
        }),
        saturationl: aa("hsl", 1, ha(100)),
        lightness: aa("hsl", 2, ha(100)),
        saturationv: aa("hsv", 1, ha(100)),
        value: aa("hsv", 2, ha(100)),
        chroma: aa("hcg", 1, ha(100)),
        gray: aa("hcg", 2, ha(100)),
        white: aa("hwb", 1, ha(100)),
        wblack: aa("hwb", 2, ha(100)),
        cyan: aa("cmyk", 0, ha(100)),
        magenta: aa("cmyk", 1, ha(100)),
        yellow: aa("cmyk", 2, ha(100)),
        black: aa("cmyk", 3, ha(100)),
        x: aa("xyz", 0, ha(100)),
        y: aa("xyz", 1, ha(100)),
        z: aa("xyz", 2, ha(100)),
        l: aa("lab", 0, ha(100)),
        a: aa("lab", 1),
        b: aa("lab", 2),
        keyword: function(f) {
            return arguments.length ? new fa(f) : xa[this.model].keyword(this.color)
        },
        hex: function(f) {
            return arguments.length ? new fa(f) : Jb.to.hex(this.rgb().round().color)
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
            return fa.rgb(f, f, f)
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
            if (!f || !f.rgb) throw Error('Argument to "mix" was not a Color instance, but rather an instance of ' + ("undefined" === typeof f ? "undefined": qb(f)));
            f = f.rgb();
            var a = this.rgb();
            c = void 0 === c ? .5 : c;
            var b = 2 * c - 1,
            d = f.alpha() - a.alpha();
            b = (( - 1 === b * d ? b: (b + d) / (1 + b * d)) + 1) / 2;
            d = 1 - b;
            return fa.rgb(b * f.red() + d * a.red(), b * f.green() + d * a.green(), b * f.blue() + d * a.blue(), f.alpha() * c + a.alpha() * (1 - c))
        }
    };
    Ea(xa).forEach(function(f) {
        if ( - 1 === ae.indexOf(f)) {
            var c = xa[f].channels;
            fa.prototype[f] = function() {
                if (this.model === f) return new fa(this);
                if (arguments.length) return new fa(arguments, f);
                var a = "number" === typeof arguments[c] ? c: this.valpha;
                var b = xa[this.model][f].raw(this.color);
                b = Array.isArray(b) ? b: [b];
                return new fa(b.concat(a), f)
            };
            fa[f] = function(a) {
                "number" === typeof a && (a = Sc(Rc.call(arguments), c));
                return new fa(a, f)
            }
        }
    });
    Xc(ya.prototype, {
        equals: function(f) {
            return this.lat === f.lat && this.lng === f.lng
        },
        clone: function() {
            return new ya(this.lat, this.lng)
        },
        getLngSpan: function(f) {
            f = Math.abs(f - this.lng);
            180 < f && (f = 360 - f);
            return f
        },
        sub: function(f) {
            return new ya(this.lat - f.lat, this.lng - f.lng)
        },
        toString: function() {
            return "Point"
        }
    });
    Xc(MercatorProjection, {
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
            if (null === f || void 0 === f) return new ya(0, 0);
            if (180 > f.lng && -180 < f.lng && 90 > f.lat && -90 < f.lat) return f;
            var c = new ya(Math.abs(f.lng), Math.abs(f.lat));
            for (var a = 0; a < this.MCBAND.length; a++) if (c.lat >= this.MCBAND[a]) {
                var b = this.MC2LL[a];
                break
            }
            f = this.convertor(f, b);
            return f = new ya(f.lng.toFixed(6), f.lat.toFixed(6))
        },
        convertLL2MC: function(f) {
            if (null === f || void 0 === f) return new ya(0, 0);
            if (180 < f.lng || -180 > f.lng || 90 < f.lat || -90 > f.lat) return f;
            f.lng = this.getLoop(f.lng, -180, 180);
            f.lat = this.getRange(f.lat, -74, 74);
            var c = new ya(f.lng, f.lat);
            for (var a = 0; a < this.LLBAND.length; a++) if (c.lat >= this.LLBAND[a]) {
                var b = this.LL2MC[a];
                break
            }
            if (!b) for (a = 0; a < this.LLBAND.length; a++) if (c.lat <= -this.LLBAND[a]) {
                b = this.LL2MC[a];
                break
            }
            f = this.convertor(f, b);
            return f = new ya(Number(f.lng.toFixed(2)), Number(f.lat.toFixed(2)))
        },
        convertor: function(f, c) {
            if (f && c) {
                var a = c[0] + c[1] * Math.abs(f.lng),
                b = Math.abs(f.lat) / c[9];
                c = c[2] + c[3] * b + c[4] * b * b + c[5] * b * b * b + c[6] * b * b * b * b + c[7] * b * b * b * b * b + c[8] * b * b * b * b * b * b;
                a *= 0 > f.lng ? -1 : 1;
                c *= 0 > f.lat ? -1 : 1;
                return new ya(a, c)
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
    Xc(MercatorProjection.prototype, {
        lngLatToMercator: function(f) {
            return MercatorProjection.convertLL2MC(f)
        },
        lngLatToPoint: function(f) {
            f = MercatorProjection.convertLL2MC(f);
            return new ce(f.lng, f.lat)
        },
        mercatorToLngLat: function(f) {
            return MercatorProjection.convertMC2LL(f)
        },
        pointToLngLat: function(f) {
            f = new ya(f.x, f.y);
            return MercatorProjection.convertMC2LL(f)
        },
        pointToPixel: function(f, c, a, b, d) {
            if (f) return f = this.lngLatToMercator(f, d),
            c = this.getZoomUnits(c),
            new ce(Math.round((f.lng - a.lng) / c + b.width / 2), Math.round((a.lat - f.lat) / c + b.height / 2))
        },
        pixelToPoint: function(f, c, a, b, d) {
            if (f) return c = this.getZoomUnits(c),
            f = new ya(a.lng + c * (f.x - b.width / 2), a.lat - c * (f.y - b.height / 2)),
            this.mercatorToLngLat(f, d)
        },
        getZoomUnits: function(f) {
            return Math.pow(2, 18 - f)
        }
    });
    Intensity.prototype.setMax = function(f) {
        this.max = f || 100
    };
    Intensity.prototype.setMin = function(f) {
        this.min = f || 0
    };
    Intensity.prototype.setMaxSize = function(f) {
        this.maxSize = f || 35
    };
    Intensity.prototype.setMinSize = function(f) {
        this.minSize = f || 0
    };
    Intensity.prototype.initPalette = function() {
        var f = this.gradient,
        c = this.paletteCtx = (new Canvas(256, 1)).getContext("2d"),
        a = c.createLinearGradient(0, 0, 256, 1);
        Ea(f).forEach(function(b) {
            a.addColorStop(parseFloat(b), f[b])
        });
        c.fillStyle = a;
        c.fillRect(0, 0, 256, 1);
        c.imageData = c.getImageData(0, 0, 256, 1).data
    };
    Intensity.prototype.getColor = function(f) {
        f = this.getImageData(f);
        return "rgba(" + f[0] + ", " + f[1] + ", " + f[2] + ", " + f[3] / 256 + ")"
    };
    Intensity.prototype.getImageData = function(f) {
        var c = this.paletteCtx.imageData;
        if (void 0 === f) return c;
        var a = this.max,
        b = this.min;
        f > a && (f = a);
        f < b && (f = b);
        f = 4 * Math.floor((f - b) / (a - b) * 255);
        return [c[f], c[f + 1], c[f + 2], c[f + 3]]
    };
    Intensity.prototype.getSize = function(f) {
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
        void 0 === f && (f = 20);
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
        var a = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1;
        return [].concat(W(this._getQuarter(f, c)), [this._getDistance(f, c) / a])
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
        c.push(Zc(f, a[0], b[0], d[0], e[0]), Zc(f, a[1], b[1], d[1], e[1]), Zc(f, a[2], b[2], d[2], e[2]));
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
        if (!approximatelyEqual(a.lng, b.lng) || !approximatelyEqual(a.lat, b.lat)) {
            var d = MercatorProjection.getDistance(toRadian(a.lng), toRadian(a.lat), toRadian(b.lng), toRadian(b.lat));
            if (! (25E4 > d)) {
                d = Math.round(d / 15E4);
                var e = this._calcAngularDistance(a, b);
                this.greatCirclePoints.push([f.lng, f.lat]);
                for (var g = 0; g < d; g++) {
                    var k = this._calcMiddlePoint(a, b, g / d, e);
                    k = MercatorProjection.convertLL2MC(k);
                    var h = de(k, f);
                    30037726 < h && (k.lng = k.lng < f.lng ? k.lng + this.WORLD_SIZE_MC: k.lng - this.WORLD_SIZE_MC);
                    this.greatCirclePoints.push([k.lng, k.lat]);
                    f = k
                }
                h = de(c, f);
                30037726 < h && (c.lng = c.lng < f.lng ? c.lng + this.WORLD_SIZE_MC: c.lng - this.WORLD_SIZE_MC);
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
        return new ya(toAngle(Math.atan2(e, a)), toAngle(f))
    };
    var OdCurve = function() {
        function f() {
            var c = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            G(this, f);
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
                this.options = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
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
                var b = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 20;
                if (!c || !a) return null;
                var d = [],
                f = 0;
                if (void 0 === ("undefined" === typeof a ? "undefined": qb(a)))"undefined" === typeof d || qb(d);
                else {
                    var g = parseFloat(c.lat),
                    k = parseFloat(a.lat),
                    h = parseFloat(c.lng),
                    l = parseFloat(a.lng);
                    l > h && 180 < parseFloat(l - h) && 0 > h && (h = parseFloat(360 + h), l = parseFloat(360 + l));
                    var n = 0;
                    if (k === g) {
                        var p = 0;
                        var m = h - l
                    } else l === h ? (p = Math.PI / 2, m = g - k) : (p = Math.atan((k - g) / (l - h)), m = (k - g) / Math.sin(p));
                    0 === n && (n = p + Math.PI / 5);
                    m /= 2;
                    p = m * Math.cos(n) + h;
                    n = m * Math.sin(n) + g;
                    for (m = 0; m < b + 1; m++) {
                        var q = h * (1 - 2 * f + f * f) + p * (2 * f - 2 * f * f) + l * f * f,
                        r = a.lng;
                        d.push([0 > c.lng && 0 < r ? q - 360 : q, g * (1 - 2 * f + f * f) + n * (2 * f - 2 * f * f) + k * f * f]);
                        f += 1 / b
                    }
                    return d
                }
            }
        }]);
        return f
    } (),
    CommonLayer = function() {
        function f(c) {
            G(this, f);
            this.options = this.getCommonDefaultOptions();
            this.options = T(this.options, this.getDefaultOptions());
            this.autoUpdate = false;
            this.options = T(this.options, c);
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
                var a = T({},
                this.getOptions());
                T(this.options, c);
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
            G(this, f);
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
            for (var k = c.getProgramParameter(a, c.ACTIVE_UNIFORMS), h = 0; h < k; h++) {
                var l = c.getActiveUniform(a, h);
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
    StateManager = function() {
        function f(c) {
            G(this, f);
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
                c = T(this.getDefaultState(), c);
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
            G(this, f);
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
    bi = {
        BYTE: 1,
        UNSIGNED_BYTE: 1,
        SHORT: 2,
        UNSIGNED_SHORT: 2,
        FLOAT: 4
    },
    VertexArray = function() {
        function f(c) {
            G(this, f);
            this.options = c;
            this.attributes = c.attributes;
            this.gl = c.gl;
            this.program = c.program;
            for (c = this.stride = 0; c < this.attributes.length; c++) this.stride += bi[this.attributes[c].type] * this.attributes[c].size
        }
        M(f, [{
            key: "setVertexAttribPointers",
            value: function() {
                for (var c = this.gl,
                a = this.program,
                b = 0; b < this.attributes.length; b++) {
                    var d = this.attributes[b],
                    f = a.attributes[d.name];
                    void 0 !== f && (d.buffer.bind(c), c.vertexAttribPointer(f, d.size, c[d.type], d.normalize || false, void 0 !== d.stride ? d.stride: this.stride, d.offset), c.enableVertexAttribArray(f))
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
        G(this, d);
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
        var k = c.createRenderbuffer();
        c.bindRenderbuffer(c.RENDERBUFFER, k);
        c.renderbufferStorage(c.RENDERBUFFER, c.DEPTH_COMPONENT16, a, b);
        e.depthBuffer = k;
        c.bindFramebuffer(c.FRAMEBUFFER, e);
        c.framebufferTexture2D(c.FRAMEBUFFER, c.COLOR_ATTACHMENT0, c.TEXTURE_2D, g, 0);
        c.framebufferRenderbuffer(c.FRAMEBUFFER, c.DEPTH_ATTACHMENT, c.RENDERBUFFER, k);
        a = c.checkFramebufferStatus(c.FRAMEBUFFER);
        c.FRAMEBUFFER_COMPLETE === a && (c.bindFramebuffer(c.FRAMEBUFFER, null), c.bindTexture(c.TEXTURE_2D, null), c.bindRenderbuffer(c.RENDERBUFFER, null), this.framebuffer = e)
    },
    Jc = function() {
        function c(a) {
            G(this, c);
            this.options = {};
            T(this.options, a);
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
    BlurEffect = function(c) {
        function a(b) {
            G(this, a);
            return R(this, (a.__proto__ || N(a)).call(this, b))
        }
        S(a, c);
        M(a, [{
            key: "getProgram",
            value: function(a) {
                this.programSample || (this.programSample = new Program(a, {
                    vertexShader: "attribute vec3 aPos;attribute vec2 aTextureCoord;varying vec2 vTextureCoord;void main(){vTextureCoord=aTextureCoord;gl_Position=vec4(aPos,1.0);}",
                    fragmentShader: "precision mediump float;uniform sampler2D uSampler;varying vec2 vTextureCoord;void main(){float fStep=1.0/512.0;vec4 sample11=texture2D(uSampler,vec2(vTextureCoord.s-1.0*fStep,vTextureCoord.t+1.0*fStep));vec4 sample12=texture2D(uSampler,vec2(vTextureCoord.s,vTextureCoord.t+1.0*fStep));vec4 sample13=texture2D(uSampler,vec2(vTextureCoord.s+1.0*fStep,vTextureCoord.t+1.0*fStep));vec4 sample21=texture2D(uSampler,vec2(vTextureCoord.s-1.0*fStep,vTextureCoord.t));vec4 sample22=texture2D(uSampler,vec2(vTextureCoord.s,vTextureCoord.t));vec4 sample23=texture2D(uSampler,vec2(vTextureCoord.s+1.0*fStep,vTextureCoord.t));vec4 sample31=texture2D(uSampler,vec2(vTextureCoord.s-1.0*fStep,vTextureCoord.t-1.0*fStep));vec4 sample32=texture2D(uSampler,vec2(vTextureCoord.s,vTextureCoord.t-1.0*fStep));vec4 sample33=texture2D(uSampler,vec2(vTextureCoord.s+1.0*fStep,vTextureCoord.t-1.0*fStep));vec4 blurSample=(sample11+sample12+sample13+sample21+2.0*sample22+sample23+sample31+sample32+sample33)/10.0;gl_FragColor=blurSample;}"
                }), this.vertexBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                }), this.sampleBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                }), this.vertexBuffer.updateData(new Float32Array(this.vertex)), this.sampleBuffer.updateData(new Float32Array(this.sampleCoord)), this.vertexArray = new VertexArray({
                    gl: a,
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
            value: function(a) {
                var b = a.gl;
                a = a.texture;
                b.clearColor(0, 0, 0, 0);
                b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                var c = this.getProgram(b);
                c.use(b);
                this.vertexArray.bind();
                b.activeTexture(b.TEXTURE1);
                b.bindTexture(b.TEXTURE_2D, a);
                b.uniform1i(c.uniforms.uSampler, 1);
                b.drawArrays(b.TRIANGLES, 0, this.vertex.length / 3)
            }
        }]);
        return a
    } (Jc),
    BloomEffect = function(c) {
        function a(b) {
            G(this, a);
            return R(this, (a.__proto__ || N(a)).call(this, b))
        }
        S(a, c);
        M(a, [{
            key: "getProgram",
            value: function(a) {
                this.programBright || (this.programBright = new Program(a, {
                    vertexShader: "attribute vec3 aPos;attribute vec2 aTextureCoord;varying vec2 vTextureCoord;void main(){vTextureCoord=aTextureCoord;gl_Position=vec4(aPos,1.0);}",
                    fragmentShader: "precision mediump float;uniform sampler2D uSampler;uniform float threshold;varying vec2 vTextureCoord;void main(){vec4 color=texture2D(uSampler,vTextureCoord);vec4 lightColor=max(vec4(0.0),(color-(1.0-threshold)/5.0));float brightness=dot(color.rgb,vec3(0.2126,0.7152,0.0722));if(brightness>threshold){color=lightColor;}else{color=vec4(0.0);}gl_FragColor=color;}"
                }));
                this.programBloom || (this.programBloom = new Program(a, {
                    vertexShader: "attribute vec3 aPos;attribute vec2 aTextureCoord;varying vec2 vTextureCoord;void main(){vTextureCoord=aTextureCoord;gl_Position=vec4(aPos,1.0);}",
                    fragmentShader: "precision mediump float;uniform sampler2D uSampler;uniform bool isVertical;uniform vec2 canvasSize;uniform float blurSize;uniform float devicePixelRatio;varying vec2 vTextureCoord;void main(){float weight[10];weight[0]=0.2270270270;weight[1]=0.1945945946;weight[2]=0.1216216216;weight[3]=0.1135135135;weight[4]=0.0972972973;weight[5]=0.0608108108;weight[6]=0.0540540541;weight[7]=0.0270270270;weight[8]=0.0162162162;weight[9]=0.0081081081;vec2 offset=vec2(blurSize/canvasSize.x,blurSize/canvasSize.y)*devicePixelRatio;vec4 result=texture2D(uSampler,vTextureCoord)*weight[0];if(isVertical){for(int i=1;i<10;++i){result+=texture2D(uSampler,vTextureCoord+vec2(0.0,offset.y*float(i)))*weight[i];result+=texture2D(uSampler,vTextureCoord-vec2(0.0,offset.y*float(i)))*weight[i];}}else{for(int i=1;i<10;++i){result+=texture2D(uSampler,vTextureCoord+vec2(offset.x*float(i),0.0))*weight[i];result+=texture2D(uSampler,vTextureCoord-vec2(offset.x*float(i),0.0))*weight[i];}}gl_FragColor=result;}"
                }));
                this.programResult || (this.programResult = new Program(a, {
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
            value: function(a) {
                this.collectBrightBuffer = new FrameBufferObject(a);
                this.bloomBuffer = new FrameBufferObject(a)
            }
        },
        {
            key: "getExtraFbo",
            value: function(a) {
                this.collectBrightBuffer || (this.collectBrightBuffer = new FrameBufferObject(a));
                this.bloomBuffer || (this.bloomBuffer = new FrameBufferObject(a));
                return {
                    collectBrightBuffer: this.collectBrightBuffer.framebuffer,
                    bloomBuffer: this.bloomBuffer.framebuffer
                }
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl,
                c = a.texture;
                a = a.fbo;
                var g = this.getOptions();
                b.clearColor(0, 0, 0, 0);
                b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                var k = this.getProgram(b),
                h = k.programBright,
                l = k.programBloom;
                k = k.programResult;
                var n = this.getExtraFbo(b),
                p = n.collectBrightBuffer;
                n = n.bloomBuffer;
                var m = b.createBuffer();
                b.bindBuffer(b.ARRAY_BUFFER, m);
                b.bufferData(b.ARRAY_BUFFER, new Float32Array(this.vertex), b.STATIC_DRAW);
                b.enableVertexAttribArray(h.attributes.aPos);
                b.vertexAttribPointer(h.attributes.aPos, 3, b.FLOAT, false, 0, 0);
                b.enableVertexAttribArray(l.attributes.aPos);
                b.vertexAttribPointer(l.attributes.aPos, 3, b.FLOAT, false, 0, 0);
                b.enableVertexAttribArray(k.attributes.aPos);
                b.vertexAttribPointer(k.attributes.aPos, 3, b.FLOAT, false, 0, 0);
                m = b.createBuffer();
                b.bindBuffer(b.ARRAY_BUFFER, m);
                b.bufferData(b.ARRAY_BUFFER, new Float32Array(this.sampleCoord), b.STATIC_DRAW);
                b.enableVertexAttribArray(h.attributes.aTextureCoord);
                b.vertexAttribPointer(h.attributes.aTextureCoord, 2, b.FLOAT, false, 0, 0);
                b.enableVertexAttribArray(l.attributes.aTextureCoord);
                b.vertexAttribPointer(l.attributes.aTextureCoord, 2, b.FLOAT, false, 0, 0);
                b.enableVertexAttribArray(k.attributes.aTextureCoord);
                b.vertexAttribPointer(k.attributes.aTextureCoord, 2, b.FLOAT, false, 0, 0);
                b.useProgram(h.program);
                b.bindFramebuffer(b.FRAMEBUFFER, p);
                b.clearColor(0, 0, 0, 0);
                b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                b.activeTexture(b.TEXTURE1);
                b.bindTexture(b.TEXTURE_2D, c);
                b.uniform1i(h.uniforms.uSampler, 1);
                b.uniform1f(h.uniforms.threshold, g.threshold || 0);
                b.drawArrays(b.TRIANGLES, 0, this.vertex.length / 3);
                b.useProgram(l.program);
                b.bindFramebuffer(b.FRAMEBUFFER, n);
                b.clearColor(0, 0, 0, 0);
                b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                b.activeTexture(b.TEXTURE1);
                b.bindTexture(b.TEXTURE_2D, p.texture);
                b.uniform1i(l.uniforms.uSampler, 1);
                b.uniform1i(l.uniforms.isVertical, true);
                b.uniform1f(l.uniforms.blurSize, g.blurSize || 2);
                b.uniform1f(l.uniforms.devicePixelRatio, window.devicePixelRatio);
                b.uniform2fv(l.uniforms.canvasSize, [b.canvas.width, b.canvas.height]);
                b.drawArrays(b.TRIANGLES, 0, this.vertex.length / 3);
                b.useProgram(l.program);
                b.bindFramebuffer(b.FRAMEBUFFER, p);
                b.clearColor(0, 0, 0, 0);
                b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                b.activeTexture(b.TEXTURE1);
                b.bindTexture(b.TEXTURE_2D, n.texture);
                b.uniform1i(l.uniforms.uSampler, 1);
                b.uniform1i(l.uniforms.isVertical, false);
                b.uniform1f(l.uniforms.blurSize, g.blurSize || 2);
                b.uniform1f(l.uniforms.devicePixelRatio, window.devicePixelRatio);
                b.uniform2fv(l.uniforms.canvasSize, [b.canvas.width, b.canvas.height]);
                b.drawArrays(b.TRIANGLES, 0, this.vertex.length / 3);
                b.useProgram(k.program);
                b.bindFramebuffer(b.FRAMEBUFFER, a);
                b.clearColor(0, 0, 0, 0);
                b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                b.activeTexture(b.TEXTURE1);
                b.bindTexture(b.TEXTURE_2D, c);
                b.uniform1i(k.uniforms.originalTexture, 1);
                b.activeTexture(b.TEXTURE0);
                b.bindTexture(b.TEXTURE_2D, p.texture);
                b.uniform1i(k.uniforms.bloomTexture, 0);
                b.drawArrays(b.TRIANGLES, 0, this.vertex.length / 3);
                b.bindBuffer(b.ARRAY_BUFFER, null);
                b.useProgram(null)
            }
        }]);
        return a
    } (Jc),
    BrightEffect = function(c) {
        function a(b) {
            G(this, a);
            return R(this, (a.__proto__ || N(a)).call(this, b))
        }
        S(a, c);
        M(a, [{
            key: "getProgram",
            value: function(a) {
                this.programBright || (this.programBright = new Program(a, {
                    vertexShader: "attribute vec3 aPos;attribute vec2 aTextureCoord;varying vec2 vTextureCoord;void main(){vTextureCoord=aTextureCoord;gl_Position=vec4(aPos,1.0);}",
                    fragmentShader: "precision mediump float;uniform sampler2D uSampler;uniform float threshold;varying vec2 vTextureCoord;void main(){vec4 color=texture2D(uSampler,vTextureCoord);vec4 lightColor=max(vec4(0.0),(color-threshold));gl_FragColor=lightColor;}"
                }));
                this.programBloom || (this.programBloom = new Program(a, {
                    vertexShader: "attribute vec3 aPos;attribute vec2 aTextureCoord;varying vec2 vTextureCoord;void main(){vTextureCoord=aTextureCoord;gl_Position=vec4(aPos,1.0);}",
                    fragmentShader: "precision mediump float;uniform sampler2D uSampler;uniform bool isVertical;uniform vec2 canvasSize;uniform float blurSize;uniform float devicePixelRatio;varying vec2 vTextureCoord;void main(){float weight[10];weight[0]=0.2270270270;weight[1]=0.1945945946;weight[2]=0.1216216216;weight[3]=0.1135135135;weight[4]=0.0972972973;weight[5]=0.0608108108;weight[6]=0.0540540541;weight[7]=0.0270270270;weight[8]=0.0162162162;weight[9]=0.0081081081;vec2 offset=vec2(blurSize/canvasSize.x,blurSize/canvasSize.y)*devicePixelRatio;vec4 result=texture2D(uSampler,vTextureCoord)*weight[0];if(isVertical){for(int i=1;i<10;++i){result+=texture2D(uSampler,vTextureCoord+vec2(0.0,offset.y*float(i)))*weight[i];result+=texture2D(uSampler,vTextureCoord-vec2(0.0,offset.y*float(i)))*weight[i];}}else{for(int i=1;i<10;++i){result+=texture2D(uSampler,vTextureCoord+vec2(offset.x*float(i),0.0))*weight[i];result+=texture2D(uSampler,vTextureCoord-vec2(offset.x*float(i),0.0))*weight[i];}}gl_FragColor=result;}"
                }));
                this.programResult || (this.programResult = new Program(a, {
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
            value: function(a) {
                this.collectBrightBuffer = new FrameBufferObject(a);
                this.bloomBuffer = new FrameBufferObject(a)
            }
        },
        {
            key: "getExtraFbo",
            value: function(a) {
                this.collectBrightBuffer || (this.collectBrightBuffer = new FrameBufferObject(a));
                this.bloomBuffer || (this.bloomBuffer = new FrameBufferObject(a));
                return {
                    collectBrightBuffer: this.collectBrightBuffer.framebuffer,
                    bloomBuffer: this.bloomBuffer.framebuffer
                }
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl,
                c = a.texture;
                a = a.fbo;
                var g = this.getOptions(),
                k = "clarity" in g ? g.clarity: 1;
                k = Math.max(0, k);
                k = Math.min(1, k);
                b.clearColor(0, 0, 0, 0);
                b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                var h = this.getProgram(b),
                l = h.programBright,
                n = h.programBloom;
                h = h.programResult;
                var p = this.getExtraFbo(b),
                m = p.collectBrightBuffer;
                p = p.bloomBuffer;
                var q = b.createBuffer();
                b.bindBuffer(b.ARRAY_BUFFER, q);
                b.bufferData(b.ARRAY_BUFFER, new Float32Array(this.vertex), b.STATIC_DRAW);
                b.enableVertexAttribArray(l.attributes.aPos);
                b.vertexAttribPointer(l.attributes.aPos, 3, b.FLOAT, false, 0, 0);
                b.enableVertexAttribArray(n.attributes.aPos);
                b.vertexAttribPointer(n.attributes.aPos, 3, b.FLOAT, false, 0, 0);
                b.enableVertexAttribArray(h.attributes.aPos);
                b.vertexAttribPointer(h.attributes.aPos, 3, b.FLOAT, false, 0, 0);
                q = b.createBuffer();
                b.bindBuffer(b.ARRAY_BUFFER, q);
                b.bufferData(b.ARRAY_BUFFER, new Float32Array(this.sampleCoord), b.STATIC_DRAW);
                b.enableVertexAttribArray(l.attributes.aTextureCoord);
                b.vertexAttribPointer(l.attributes.aTextureCoord, 2, b.FLOAT, false, 0, 0);
                b.enableVertexAttribArray(n.attributes.aTextureCoord);
                b.vertexAttribPointer(n.attributes.aTextureCoord, 2, b.FLOAT, false, 0, 0);
                b.enableVertexAttribArray(h.attributes.aTextureCoord);
                b.vertexAttribPointer(h.attributes.aTextureCoord, 2, b.FLOAT, false, 0, 0);
                b.useProgram(l.program);
                b.bindFramebuffer(b.FRAMEBUFFER, m);
                b.clearColor(0, 0, 0, 0);
                b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                b.activeTexture(b.TEXTURE1);
                b.bindTexture(b.TEXTURE_2D, c);
                b.uniform1i(l.uniforms.uSampler, 1);
                b.uniform1f(l.uniforms.threshold, g.threshold || 0);
                b.drawArrays(b.TRIANGLES, 0, this.vertex.length / 3);
                b.useProgram(n.program);
                b.bindFramebuffer(b.FRAMEBUFFER, p);
                b.clearColor(0, 0, 0, 0);
                b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                b.activeTexture(b.TEXTURE1);
                b.bindTexture(b.TEXTURE_2D, m.texture);
                b.uniform1i(n.uniforms.uSampler, 1);
                b.uniform1i(n.uniforms.isVertical, true);
                b.uniform1f(n.uniforms.blurSize, g.blurSize || 2);
                b.uniform1f(n.uniforms.devicePixelRatio, window.devicePixelRatio);
                b.uniform2fv(n.uniforms.canvasSize, [b.canvas.width, b.canvas.height]);
                b.drawArrays(b.TRIANGLES, 0, this.vertex.length / 3);
                b.useProgram(n.program);
                b.bindFramebuffer(b.FRAMEBUFFER, m);
                b.clearColor(0, 0, 0, 0);
                b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                b.activeTexture(b.TEXTURE1);
                b.bindTexture(b.TEXTURE_2D, p.texture);
                b.uniform1i(n.uniforms.uSampler, 1);
                b.uniform1i(n.uniforms.isVertical, false);
                b.uniform1f(n.uniforms.blurSize, g.blurSize || 2);
                b.uniform1f(n.uniforms.devicePixelRatio, window.devicePixelRatio);
                b.uniform2fv(n.uniforms.canvasSize, [b.canvas.width, b.canvas.height]);
                b.drawArrays(b.TRIANGLES, 0, this.vertex.length / 3);
                b.useProgram(h.program);
                b.bindFramebuffer(b.FRAMEBUFFER, a);
                b.clearColor(0, 0, 0, 0);
                b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                b.activeTexture(b.TEXTURE1);
                b.bindTexture(b.TEXTURE_2D, c);
                b.uniform1i(h.uniforms.originalTexture, 1);
                b.uniform1f(h.uniforms.toneScale, k);
                b.activeTexture(b.TEXTURE0);
                b.bindTexture(b.TEXTURE_2D, m.texture);
                b.uniform1i(h.uniforms.bloomTexture, 0);
                b.drawArrays(b.TRIANGLES, 0, this.vertex.length / 3);
                b.bindBuffer(b.ARRAY_BUFFER, null);
                b.useProgram(null)
            }
        }]);
        return a
    } (Jc),
    DepthEffect = function(c) {
        function a(b) {
            G(this, a);
            return R(this, (a.__proto__ || N(a)).call(this, b))
        }
        S(a, c);
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
    } (Jc),
    EffectManager = function() {
        function c(a) {
            G(this, c);
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
                    var k = [0, 0, 0, 0];
                    a.clearColor(k[0], k[1], k[2], k[3]);
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
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b));
            b.pickedColor = [ - 1, -1, -1];
            return b
        }
        S(a, c);
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
            value: function(a) {
                var b = this.getOptions();
                this.gl = a;
                b.enablePicked && (this.pickBuffer = new Buffer({
                    gl: a,
                    target: "ARRAY_BUFFER",
                    usage: "STATIC_DRAW"
                }))
            }
        },
        {
            key: "getCommonAttributes",
            value: function() {
                var a = [];
                this.getOptions().enablePicked && a.push({
                    name: "aPickColor",
                    buffer: this.pickBuffer,
                    size: 3,
                    type: "FLOAT",
                    stride: 12,
                    offset: 0
                });
                return a
            }
        },
        {
            key: "normizedColor",
            value: function(a) {
                var b = a;
                a instanceof Array || (b = fa(a).unitArray());
                void 0 === b[3] && (b[3] = 1);
                return b
            }
        },
        {
            key: "normizedPoint",
            value: function(a) {
                if (!a || !a[0] || !a[1]) return [0, 0, 0];
                var b = this.getPointOffset(),
                c = Number(a[0]),
                g = Number(a[1]); - 180 <= c && 180 >= c && -90 <= g && 90 >= g && (g = this.webglLayer.map.lnglatToMercator(c, g), c = g[0], g = g[1]);
                var k = Number(a[2]) || 0;
                this.webglLayer && "cesium" === this.webglLayer.options.mapType && window.Cesium ? (c = this.convertLngLat([c, g]), k = window.Cesium.Cartesian3.fromDegrees(c[0], c[1], k), c = k.x, g = k.y, k = k.z) : this.webglLayer && "bmapgl" === this.webglLayer.options.mapType && "B_EARTH_MAP" === this.webglLayer.map.map.mapType && (c = this.convertLngLat([c, g]), k = this.webglLayer.map.map.getEarth().scene.fromLatLngToXYZ({
                    lng: c[0],
                    lat: c[1]
                }), c = k.x, g = k.y, k = k.z);
                return 3 < a.length ? [c - b[0], g - b[1], k].concat(W(a.slice(3))) : [c - b[0], g - b[1], k]
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
                    var g = b.autoSelect ? this.pickedColor: this.indexToRgb(b.selectedIndex || -1);
                    c = T(c, {
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
                c = db(c, 2),
                [a, c[0], c[1]];
                e = [];
                b = [];
                for (var h = 0; h < a.length; h++) {
                    var l = c(a[h]);
                    l = db(l, 2);
                    var n = l[1];
                    e.push(l[0]);
                    b.push(n)
                }
                return [a, e, b]
            }
        }]);
        return a
    } (CommonLayer),
    Ia = O(function(c, a) {
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
        a.RANDOM = a.ARRAY_TYPE = a.EPSILON = void 0;
        var b = 1E-6;
        a.EPSILON = b;
        var d = "undefined" !== typeof Float32Array ? Float32Array: Array;
        a.ARRAY_TYPE = d;
        a.RANDOM = Math.random;
        var e = Math.PI / 180
    });
    Q(Ia);
    var tf = O(function(c, a) {
        function b(a, b, c) {
            var d = b[0],
            h = b[1],
            g = b[2];
            b = b[3];
            var k = c[0],
            e = c[1],
            r = c[2];
            c = c[3];
            a[0] = d * k + g * e;
            a[1] = h * k + b * e;
            a[2] = d * r + g * c;
            a[3] = h * r + b * c;
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
            var h = new e.ARRAY_TYPE(4);
            h[0] = a;
            h[1] = b;
            h[2] = c;
            h[3] = d;
            return h
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
            var e = c * b - g * d;
            if (!e) return null;
            e = 1 / e;
            a[0] = b * e;
            a[1] = -d * e;
            a[2] = -g * e;
            a[3] = c * e;
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
            h = b[1],
            g = b[2];
            b = b[3];
            var e = Math.sin(c);
            c = Math.cos(c);
            a[0] = d * c + g * e;
            a[1] = h * c + b * e;
            a[2] = d * -e + g * c;
            a[3] = h * -e + b * c;
            return a
        };
        a.scale = function(a, b, c) {
            var d = b[1],
            h = b[2],
            g = b[3],
            e = c[0];
            c = c[1];
            a[0] = b[0] * e;
            a[1] = d * e;
            a[2] = h * c;
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
            var k = b[0],
            m = b[1],
            q = b[2];
            b = b[3];
            return Math.abs(c - k) <= e.EPSILON * Math.max(1, Math.abs(c), Math.abs(k)) && Math.abs(d - m) <= e.EPSILON * Math.max(1, Math.abs(d), Math.abs(m)) && Math.abs(g - q) <= e.EPSILON * Math.max(1, Math.abs(g), Math.abs(q)) && Math.abs(a - b) <= e.EPSILON * Math.max(1, Math.abs(a), Math.abs(b))
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
        a.sub = a.mul = void 0;
        var e = function(a) {
            if (a && a.__esModule) return a;
            var b = {};
            if (null != a) for (var c in a) if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = ea && da ? da(a, c) : {};
                d.get || d.set ? ea(b, c, d) : b[c] = a[c]
            }
            b.
        default = a;
            return b
        } (Ia);
        a.mul = b;
        a.sub = d
    });
    Q(tf);
    var uf = O(function(c, a) {
        function b(a, b, c) {
            var d = b[0],
            h = b[1],
            g = b[2],
            e = b[3],
            k = b[4];
            b = b[5];
            var r = c[0],
            u = c[1],
            y = c[2],
            t = c[3],
            z = c[4];
            c = c[5];
            a[0] = d * r + g * u;
            a[1] = h * r + e * u;
            a[2] = d * y + g * t;
            a[3] = h * y + e * t;
            a[4] = d * z + g * c + k;
            a[5] = h * z + e * c + b;
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
        a.fromValues = function(a, b, c, d, n, p) {
            var h = new e.ARRAY_TYPE(6);
            h[0] = a;
            h[1] = b;
            h[2] = c;
            h[3] = d;
            h[4] = n;
            h[5] = p;
            return h
        };
        a.set = function(a, b, c, d, e, p, m) {
            a[0] = b;
            a[1] = c;
            a[2] = d;
            a[3] = e;
            a[4] = p;
            a[5] = m;
            return a
        };
        a.invert = function(a, b) {
            var c = b[0],
            d = b[1],
            g = b[2],
            e = b[3],
            m = b[4];
            b = b[5];
            var k = c * e - d * g;
            if (!k) return null;
            k = 1 / k;
            a[0] = e * k;
            a[1] = -d * k;
            a[2] = -g * k;
            a[3] = c * k;
            a[4] = (g * b - e * m) * k;
            a[5] = (d * m - c * b) * k;
            return a
        };
        a.determinant = function(a) {
            return a[0] * a[3] - a[1] * a[2]
        };
        a.multiply = b;
        a.rotate = function(a, b, c) {
            var d = b[0],
            h = b[1],
            g = b[2],
            e = b[3],
            k = b[4];
            b = b[5];
            var r = Math.sin(c);
            c = Math.cos(c);
            a[0] = d * c + g * r;
            a[1] = h * c + e * r;
            a[2] = d * -r + g * c;
            a[3] = h * -r + e * c;
            a[4] = k;
            a[5] = b;
            return a
        };
        a.scale = function(a, b, c) {
            var d = b[1],
            h = b[2],
            g = b[3],
            e = b[4],
            k = b[5],
            r = c[0];
            c = c[1];
            a[0] = b[0] * r;
            a[1] = d * r;
            a[2] = h * c;
            a[3] = g * c;
            a[4] = e;
            a[5] = k;
            return a
        };
        a.translate = function(a, b, c) {
            var d = b[0],
            h = b[1],
            g = b[2],
            e = b[3],
            k = b[4];
            b = b[5];
            var r = c[0];
            c = c[1];
            a[0] = d;
            a[1] = h;
            a[2] = g;
            a[3] = e;
            a[4] = d * r + g * c + k;
            a[5] = h * r + e * c + b;
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
            k = a[3],
            m = a[4];
            a = a[5];
            var q = b[0],
            r = b[1],
            u = b[2],
            y = b[3],
            t = b[4];
            b = b[5];
            return Math.abs(c - q) <= e.EPSILON * Math.max(1, Math.abs(c), Math.abs(q)) && Math.abs(d - r) <= e.EPSILON * Math.max(1, Math.abs(d), Math.abs(r)) && Math.abs(g - u) <= e.EPSILON * Math.max(1, Math.abs(g), Math.abs(u)) && Math.abs(k - y) <= e.EPSILON * Math.max(1, Math.abs(k), Math.abs(y)) && Math.abs(m - t) <= e.EPSILON * Math.max(1, Math.abs(m), Math.abs(t)) && Math.abs(a - b) <= e.EPSILON * Math.max(1, Math.abs(a), Math.abs(b))
        };
        a.sub = a.mul = void 0;
        var e = function(a) {
            if (a && a.__esModule) return a;
            var b = {};
            if (null != a) for (var c in a) if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = ea && da ? da(a, c) : {};
                d.get || d.set ? ea(b, c, d) : b[c] = a[c]
            }
            b.
        default = a;
            return b
        } (Ia);
        a.mul = b;
        a.sub = d
    });
    Q(uf);
    var Dd = O(function(c, a) {
        function b(a, b, c) {
            var d = b[0],
            h = b[1],
            e = b[2],
            m = b[3],
            g = b[4],
            k = b[5],
            u = b[6],
            y = b[7];
            b = b[8];
            var t = c[0],
            z = c[1],
            v = c[2],
            B = c[3],
            A = c[4],
            D = c[5],
            E = c[6],
            I = c[7];
            c = c[8];
            a[0] = t * d + z * m + v * u;
            a[1] = t * h + z * g + v * y;
            a[2] = t * e + z * k + v * b;
            a[3] = B * d + A * m + D * u;
            a[4] = B * h + A * g + D * y;
            a[5] = B * e + A * k + D * b;
            a[6] = E * d + I * m + c * u;
            a[7] = E * h + I * g + c * y;
            a[8] = E * e + I * k + c * b;
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
        a.fromValues = function(a, b, c, d, n, p, m, q, r) {
            var h = new e.ARRAY_TYPE(9);
            h[0] = a;
            h[1] = b;
            h[2] = c;
            h[3] = d;
            h[4] = n;
            h[5] = p;
            h[6] = m;
            h[7] = q;
            h[8] = r;
            return h
        };
        a.set = function(a, b, c, d, e, p, m, q, r, u) {
            a[0] = b;
            a[1] = c;
            a[2] = d;
            a[3] = e;
            a[4] = p;
            a[5] = m;
            a[6] = q;
            a[7] = r;
            a[8] = u;
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
            m = b[4],
            k = b[5],
            r = b[6],
            u = b[7];
            b = b[8];
            var y = b * m - k * u,
            t = -b * g + k * r,
            z = u * g - m * r,
            v = c * y + d * t + e * z;
            if (!v) return null;
            v = 1 / v;
            a[0] = y * v;
            a[1] = ( - b * d + e * u) * v;
            a[2] = (k * d - e * m) * v;
            a[3] = t * v;
            a[4] = (b * c - e * r) * v;
            a[5] = ( - k * c + e * g) * v;
            a[6] = z * v;
            a[7] = ( - u * c + d * r) * v;
            a[8] = (m * c - d * g) * v;
            return a
        };
        a.adjoint = function(a, b) {
            var c = b[0],
            d = b[1],
            e = b[2],
            g = b[3],
            m = b[4],
            k = b[5],
            r = b[6],
            u = b[7];
            b = b[8];
            a[0] = m * b - k * u;
            a[1] = e * u - d * b;
            a[2] = d * k - e * m;
            a[3] = k * r - g * b;
            a[4] = c * b - e * r;
            a[5] = e * g - c * k;
            a[6] = g * u - m * r;
            a[7] = d * r - c * u;
            a[8] = c * m - d * g;
            return a
        };
        a.determinant = function(a) {
            var b = a[3],
            c = a[4],
            d = a[5],
            e = a[6],
            g = a[7],
            m = a[8];
            return a[0] * (m * c - d * g) + a[1] * ( - m * b + d * e) + a[2] * (g * b - c * e)
        };
        a.multiply = b;
        a.translate = function(a, b, c) {
            var d = b[0],
            h = b[1],
            e = b[2],
            m = b[3],
            g = b[4],
            k = b[5],
            u = b[6],
            y = b[7];
            b = b[8];
            var t = c[0];
            c = c[1];
            a[0] = d;
            a[1] = h;
            a[2] = e;
            a[3] = m;
            a[4] = g;
            a[5] = k;
            a[6] = t * d + c * m + u;
            a[7] = t * h + c * g + y;
            a[8] = t * e + c * k + b;
            return a
        };
        a.rotate = function(a, b, c) {
            var d = b[0],
            h = b[1],
            e = b[2],
            m = b[3],
            g = b[4],
            k = b[5],
            u = b[6],
            y = b[7];
            b = b[8];
            var t = Math.sin(c);
            c = Math.cos(c);
            a[0] = c * d + t * m;
            a[1] = c * h + t * g;
            a[2] = c * e + t * k;
            a[3] = c * m - t * d;
            a[4] = c * g - t * h;
            a[5] = c * k - t * e;
            a[6] = u;
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
            m = d + d,
            q = e + e;
            c *= g;
            var k = d * g;
            d *= m;
            var u = e * g,
            y = e * m;
            e *= q;
            g *= b;
            m *= b;
            b *= q;
            a[0] = 1 - d - e;
            a[3] = k - b;
            a[6] = u + m;
            a[1] = k + b;
            a[4] = 1 - c - e;
            a[7] = y - g;
            a[2] = u - m;
            a[5] = y + g;
            a[8] = 1 - c - d;
            return a
        };
        a.normalFromMat4 = function(a, b) {
            var c = b[0],
            d = b[1],
            e = b[2],
            g = b[3],
            m = b[4],
            q = b[5],
            k = b[6],
            u = b[7],
            y = b[8],
            t = b[9],
            z = b[10],
            v = b[11],
            B = b[12],
            A = b[13],
            D = b[14];
            b = b[15];
            var E = c * q - d * m,
            I = c * k - e * m,
            L = c * u - g * m,
            J = d * k - e * q,
            w = d * u - g * q,
            U = e * u - g * k,
            x = y * A - t * B,
            C = y * D - z * B;
            y = y * b - v * B;
            var F = t * D - z * A;
            t = t * b - v * A;
            z = z * b - v * D;
            v = E * z - I * t + L * F + J * y - w * C + U * x;
            if (!v) return null;
            v = 1 / v;
            a[0] = (q * z - k * t + u * F) * v;
            a[1] = (k * y - m * z - u * C) * v;
            a[2] = (m * t - q * y + u * x) * v;
            a[3] = (e * t - d * z - g * F) * v;
            a[4] = (c * z - e * y + g * C) * v;
            a[5] = (d * y - c * t - g * x) * v;
            a[6] = (A * U - D * w + b * J) * v;
            a[7] = (D * L - B * U - b * I) * v;
            a[8] = (B * w - A * L + b * E) * v;
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
            k = a[3],
            m = a[4],
            q = a[5],
            r = a[6],
            u = a[7];
            a = a[8];
            var y = b[0],
            t = b[1],
            z = b[2],
            v = b[3],
            B = b[4],
            A = b[5],
            D = b[6],
            E = b[7];
            b = b[8];
            return Math.abs(c - y) <= e.EPSILON * Math.max(1, Math.abs(c), Math.abs(y)) && Math.abs(d - t) <= e.EPSILON * Math.max(1, Math.abs(d), Math.abs(t)) && Math.abs(g - z) <= e.EPSILON * Math.max(1, Math.abs(g), Math.abs(z)) && Math.abs(k - v) <= e.EPSILON * Math.max(1, Math.abs(k), Math.abs(v)) && Math.abs(m - B) <= e.EPSILON * Math.max(1, Math.abs(m), Math.abs(B)) && Math.abs(q - A) <= e.EPSILON * Math.max(1, Math.abs(q), Math.abs(A)) && Math.abs(r - D) <= e.EPSILON * Math.max(1, Math.abs(r), Math.abs(D)) && Math.abs(u - E) <= e.EPSILON * Math.max(1, Math.abs(u), Math.abs(E)) && Math.abs(a - b) <= e.EPSILON * Math.max(1, Math.abs(a), Math.abs(b))
        };
        a.sub = a.mul = void 0;
        var e = function(a) {
            if (a && a.__esModule) return a;
            var b = {};
            if (null != a) for (var c in a) if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = ea && da ? da(a, c) : {};
                d.get || d.set ? ea(b, c, d) : b[c] = a[c]
            }
            b.
        default = a;
            return b
        } (Ia);
        a.mul = b;
        a.sub = d
    });
    Q(Dd);
    var Ed = O(function(c, a) {
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
            h = b[1],
            e = b[2],
            l = b[3],
            g = b[4],
            k = b[5],
            n = b[6],
            z = b[7],
            v = b[8],
            B = b[9],
            A = b[10],
            D = b[11],
            E = b[12],
            I = b[13],
            L = b[14];
            b = b[15];
            var J = c[0],
            w = c[1],
            U = c[2],
            x = c[3];
            a[0] = J * d + w * g + U * v + x * E;
            a[1] = J * h + w * k + U * B + x * I;
            a[2] = J * e + w * n + U * A + x * L;
            a[3] = J * l + w * z + U * D + x * b;
            J = c[4];
            w = c[5];
            U = c[6];
            x = c[7];
            a[4] = J * d + w * g + U * v + x * E;
            a[5] = J * h + w * k + U * B + x * I;
            a[6] = J * e + w * n + U * A + x * L;
            a[7] = J * l + w * z + U * D + x * b;
            J = c[8];
            w = c[9];
            U = c[10];
            x = c[11];
            a[8] = J * d + w * g + U * v + x * E;
            a[9] = J * h + w * k + U * B + x * I;
            a[10] = J * e + w * n + U * A + x * L;
            a[11] = J * l + w * z + U * D + x * b;
            J = c[12];
            w = c[13];
            U = c[14];
            x = c[15];
            a[12] = J * d + w * g + U * v + x * E;
            a[13] = J * h + w * k + U * B + x * I;
            a[14] = J * e + w * n + U * A + x * L;
            a[15] = J * l + w * z + U * D + x * b;
            return a
        }
        function e(a, b, c) {
            var d = b[0],
            h = b[1],
            e = b[2],
            l = b[3],
            g = d + d,
            k = h + h,
            n = e + e;
            b = d * g;
            var z = d * k;
            d *= n;
            var v = h * k;
            h *= n;
            e *= n;
            g *= l;
            k *= l;
            l *= n;
            a[0] = 1 - (v + e);
            a[1] = z + l;
            a[2] = d - k;
            a[3] = 0;
            a[4] = z - l;
            a[5] = 1 - (b + e);
            a[6] = h + g;
            a[7] = 0;
            a[8] = d + k;
            a[9] = h - g;
            a[10] = 1 - (b + v);
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
            var a = new k.ARRAY_TYPE(16);
            k.ARRAY_TYPE != Float32Array && (a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0);
            a[0] = 1;
            a[5] = 1;
            a[10] = 1;
            a[15] = 1;
            return a
        };
        a.clone = function(a) {
            var b = new k.ARRAY_TYPE(16);
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
        a.fromValues = function(a, b, c, d, e, g, r, u, y, t, z, v, B, A, D, E) {
            var h = new k.ARRAY_TYPE(16);
            h[0] = a;
            h[1] = b;
            h[2] = c;
            h[3] = d;
            h[4] = e;
            h[5] = g;
            h[6] = r;
            h[7] = u;
            h[8] = y;
            h[9] = t;
            h[10] = z;
            h[11] = v;
            h[12] = B;
            h[13] = A;
            h[14] = D;
            h[15] = E;
            return h
        };
        a.set = function(a, b, c, d, e, g, k, u, y, t, z, v, B, A, D, E, I) {
            a[0] = b;
            a[1] = c;
            a[2] = d;
            a[3] = e;
            a[4] = g;
            a[5] = k;
            a[6] = u;
            a[7] = y;
            a[8] = t;
            a[9] = z;
            a[10] = v;
            a[11] = B;
            a[12] = A;
            a[13] = D;
            a[14] = E;
            a[15] = I;
            return a
        };
        a.identity = b;
        a.transpose = function(a, b) {
            if (a === b) {
                var c = b[1],
                d = b[2],
                h = b[3],
                e = b[6],
                g = b[7],
                l = b[11];
                a[1] = b[4];
                a[2] = b[8];
                a[3] = b[12];
                a[4] = c;
                a[6] = b[9];
                a[7] = b[13];
                a[8] = d;
                a[9] = e;
                a[11] = b[14];
                a[12] = h;
                a[13] = g;
                a[14] = l
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
            h = b[2],
            e = b[3],
            g = b[4],
            k = b[5],
            l = b[6],
            t = b[7],
            z = b[8],
            v = b[9],
            B = b[10],
            A = b[11],
            D = b[12],
            E = b[13],
            I = b[14];
            b = b[15];
            var L = c * k - d * g,
            J = c * l - h * g,
            w = c * t - e * g,
            U = d * l - h * k,
            x = d * t - e * k,
            C = h * t - e * l,
            F = z * E - v * D,
            G = z * I - B * D,
            K = z * b - A * D,
            M = v * I - B * E,
            N = v * b - A * E,
            O = B * b - A * I,
            Buffer = L * O - J * N + w * M + U * K - x * G + C * F;
            if (!Buffer) return null;
            Buffer = 1 / Buffer;
            a[0] = (k * O - l * N + t * M) * Buffer;
            a[1] = (h * N - d * O - e * M) * Buffer;
            a[2] = (E * C - I * x + b * U) * Buffer;
            a[3] = (B * x - v * C - A * U) * Buffer;
            a[4] = (l * K - g * O - t * G) * Buffer;
            a[5] = (c * O - h * K + e * G) * Buffer;
            a[6] = (I * w - D * C - b * J) * Buffer;
            a[7] = (z * C - B * w + A * J) * Buffer;
            a[8] = (g * N - k * K + t * F) * Buffer;
            a[9] = (d * K - c * N - e * F) * Buffer;
            a[10] = (D * x - E * w + b * L) * Buffer;
            a[11] = (v * w - z * x - A * L) * Buffer;
            a[12] = (k * G - g * M - l * F) * Buffer;
            a[13] = (c * M - d * G + h * F) * Buffer;
            a[14] = (E * J - D * U - I * L) * Buffer;
            a[15] = (z * U - v * J + B * L) * Buffer;
            return a
        };
        a.adjoint = function(a, b) {
            var c = b[0],
            d = b[1],
            h = b[2],
            e = b[3],
            g = b[4],
            k = b[5],
            l = b[6],
            t = b[7],
            z = b[8],
            v = b[9],
            B = b[10],
            A = b[11],
            D = b[12],
            E = b[13],
            I = b[14];
            b = b[15];
            a[0] = k * (B * b - A * I) - v * (l * b - t * I) + E * (l * A - t * B);
            a[1] = -(d * (B * b - A * I) - v * (h * b - e * I) + E * (h * A - e * B));
            a[2] = d * (l * b - t * I) - k * (h * b - e * I) + E * (h * t - e * l);
            a[3] = -(d * (l * A - t * B) - k * (h * A - e * B) + v * (h * t - e * l));
            a[4] = -(g * (B * b - A * I) - z * (l * b - t * I) + D * (l * A - t * B));
            a[5] = c * (B * b - A * I) - z * (h * b - e * I) + D * (h * A - e * B);
            a[6] = -(c * (l * b - t * I) - g * (h * b - e * I) + D * (h * t - e * l));
            a[7] = c * (l * A - t * B) - g * (h * A - e * B) + z * (h * t - e * l);
            a[8] = g * (v * b - A * E) - z * (k * b - t * E) + D * (k * A - t * v);
            a[9] = -(c * (v * b - A * E) - z * (d * b - e * E) + D * (d * A - e * v));
            a[10] = c * (k * b - t * E) - g * (d * b - e * E) + D * (d * t - e * k);
            a[11] = -(c * (k * A - t * v) - g * (d * A - e * v) + z * (d * t - e * k));
            a[12] = -(g * (v * I - B * E) - z * (k * I - l * E) + D * (k * B - l * v));
            a[13] = c * (v * I - B * E) - z * (d * I - h * E) + D * (d * B - h * v);
            a[14] = -(c * (k * I - l * E) - g * (d * I - h * E) + D * (d * l - h * k));
            a[15] = c * (k * B - l * v) - g * (d * B - h * v) + z * (d * l - h * k);
            return a
        };
        a.determinant = function(a) {
            var b = a[0],
            c = a[1],
            d = a[2],
            h = a[3],
            e = a[4],
            g = a[5],
            k = a[6],
            y = a[7],
            t = a[8],
            z = a[9],
            v = a[10],
            B = a[11],
            A = a[12],
            D = a[13],
            E = a[14];
            a = a[15];
            return (b * g - c * e) * (v * a - B * E) - (b * k - d * e) * (z * a - B * D) + (b * y - h * e) * (z * E - v * D) + (c * k - d * g) * (t * a - B * A) - (c * y - h * g) * (t * E - v * A) + (d * y - h * k) * (t * D - z * A)
        };
        a.multiply = d;
        a.translate = function(a, b, c) {
            var d = c[0],
            h = c[1];
            c = c[2];
            if (b === a) a[12] = b[0] * d + b[4] * h + b[8] * c + b[12],
            a[13] = b[1] * d + b[5] * h + b[9] * c + b[13],
            a[14] = b[2] * d + b[6] * h + b[10] * c + b[14],
            a[15] = b[3] * d + b[7] * h + b[11] * c + b[15];
            else {
                var e = b[0];
                var g = b[1];
                var k = b[2];
                var l = b[3];
                var n = b[4];
                var z = b[5];
                var v = b[6];
                var B = b[7];
                var A = b[8];
                var D = b[9];
                var E = b[10];
                var I = b[11];
                a[0] = e;
                a[1] = g;
                a[2] = k;
                a[3] = l;
                a[4] = n;
                a[5] = z;
                a[6] = v;
                a[7] = B;
                a[8] = A;
                a[9] = D;
                a[10] = E;
                a[11] = I;
                a[12] = e * d + n * h + A * c + b[12];
                a[13] = g * d + z * h + D * c + b[13];
                a[14] = k * d + v * h + E * c + b[14];
                a[15] = l * d + B * h + I * c + b[15]
            }
            return a
        };
        a.scale = function(a, b, c) {
            var d = c[0],
            h = c[1];
            c = c[2];
            a[0] = b[0] * d;
            a[1] = b[1] * d;
            a[2] = b[2] * d;
            a[3] = b[3] * d;
            a[4] = b[4] * h;
            a[5] = b[5] * h;
            a[6] = b[6] * h;
            a[7] = b[7] * h;
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
            h = d[1];
            d = d[2];
            var g = Math.sqrt(e * e + h * h + d * d);
            if (g < k.EPSILON) return null;
            g = 1 / g;
            e *= g;
            h *= g;
            d *= g;
            var u = Math.sin(c);
            var l = Math.cos(c);
            var n = 1 - l;
            c = b[0];
            g = b[1];
            var z = b[2];
            var v = b[3];
            var p = b[4];
            var A = b[5];
            var D = b[6];
            var E = b[7];
            var I = b[8];
            var L = b[9];
            var J = b[10];
            var w = b[11];
            var x = e * e * n + l;
            var C = h * e * n + d * u;
            var F = d * e * n - h * u;
            var G = e * h * n - d * u;
            var Buffer = h * h * n + l;
            var K = d * h * n + e * u;
            var M = e * d * n + h * u;
            e = h * d * n - e * u;
            h = d * d * n + l;
            a[0] = c * x + p * C + I * F;
            a[1] = g * x + A * C + L * F;
            a[2] = z * x + D * C + J * F;
            a[3] = v * x + E * C + w * F;
            a[4] = c * G + p * Buffer + I * K;
            a[5] = g * G + A * Buffer + L * K;
            a[6] = z * G + D * Buffer + J * K;
            a[7] = v * G + E * Buffer + w * K;
            a[8] = c * M + p * e + I * h;
            a[9] = g * M + A * e + L * h;
            a[10] = z * M + D * e + J * h;
            a[11] = v * M + E * e + w * h;
            b !== a && (a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]);
            return a
        };
        a.rotateX = function(a, b, c) {
            var d = Math.sin(c);
            c = Math.cos(c);
            var e = b[4],
            h = b[5],
            g = b[6],
            k = b[7],
            l = b[8],
            n = b[9],
            z = b[10],
            v = b[11];
            b !== a && (a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]);
            a[4] = e * c + l * d;
            a[5] = h * c + n * d;
            a[6] = g * c + z * d;
            a[7] = k * c + v * d;
            a[8] = l * c - e * d;
            a[9] = n * c - h * d;
            a[10] = z * c - g * d;
            a[11] = v * c - k * d;
            return a
        };
        a.rotateY = function(a, b, c) {
            var d = Math.sin(c);
            c = Math.cos(c);
            var e = b[0],
            h = b[1],
            g = b[2],
            k = b[3],
            l = b[8],
            n = b[9],
            z = b[10],
            v = b[11];
            b !== a && (a[4] = b[4], a[5] = b[5], a[6] = b[6], a[7] = b[7], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]);
            a[0] = e * c - l * d;
            a[1] = h * c - n * d;
            a[2] = g * c - z * d;
            a[3] = k * c - v * d;
            a[8] = e * d + l * c;
            a[9] = h * d + n * c;
            a[10] = g * d + z * c;
            a[11] = k * d + v * c;
            return a
        };
        a.rotateZ = function(a, b, c) {
            var d = Math.sin(c);
            c = Math.cos(c);
            var e = b[0],
            h = b[1],
            g = b[2],
            k = b[3],
            l = b[4],
            n = b[5],
            z = b[6],
            v = b[7];
            b !== a && (a[8] = b[8], a[9] = b[9], a[10] = b[10], a[11] = b[11], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15]);
            a[0] = e * c + l * d;
            a[1] = h * c + n * d;
            a[2] = g * c + z * d;
            a[3] = k * c + v * d;
            a[4] = l * c - e * d;
            a[5] = n * c - h * d;
            a[6] = z * c - g * d;
            a[7] = v * c - k * d;
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
            var h = Math.sqrt(d * d + e * e + c * c);
            if (h < k.EPSILON) return null;
            h = 1 / h;
            d *= h;
            e *= h;
            c *= h;
            h = Math.sin(b);
            b = Math.cos(b);
            var g = 1 - b;
            a[0] = d * d * g + b;
            a[1] = e * d * g + c * h;
            a[2] = c * d * g - e * h;
            a[3] = 0;
            a[4] = d * e * g - c * h;
            a[5] = e * e * g + b;
            a[6] = c * e * g + d * h;
            a[7] = 0;
            a[8] = d * c * g + e * h;
            a[9] = e * c * g - d * h;
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
            var c = new k.ARRAY_TYPE(3),
            d = -b[0],
            h = -b[1],
            g = -b[2],
            r = b[3],
            u = b[4],
            l = b[5],
            t = b[6],
            z = b[7],
            v = d * d + h * h + g * g + r * r;
            0 < v ? (c[0] = 2 * (u * r + z * d + l * g - t * h) / v, c[1] = 2 * (l * r + z * h + t * d - u * g) / v, c[2] = 2 * (t * r + z * g + u * h - l * d) / v) : (c[0] = 2 * (u * r + z * d + l * g - t * h), c[1] = 2 * (l * r + z * h + t * d - u * g), c[2] = 2 * (t * r + z * g + u * h - l * d));
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
            h = b[4],
            g = b[5],
            k = b[6],
            l = b[8],
            t = b[9];
            b = b[10];
            a[0] = Math.sqrt(c * c + d * d + e * e);
            a[1] = Math.sqrt(h * h + g * g + k * k);
            a[2] = Math.sqrt(l * l + t * t + b * b);
            return a
        };
        a.getRotation = function(a, b) {
            var c = b[0] + b[5] + b[10];
            0 < c ? (c = 2 * Math.sqrt(c + 1), a[3] = .25 * c, a[0] = (b[6] - b[9]) / c, a[1] = (b[8] - b[2]) / c, a[2] = (b[1] - b[4]) / c) : b[0] > b[5] && b[0] > b[10] ? (c = 2 * Math.sqrt(1 + b[0] - b[5] - b[10]), a[3] = (b[6] - b[9]) / c, a[0] = .25 * c, a[1] = (b[1] + b[4]) / c, a[2] = (b[8] + b[2]) / c) : b[5] > b[10] ? (c = 2 * Math.sqrt(1 + b[5] - b[0] - b[10]), a[3] = (b[8] - b[2]) / c, a[0] = (b[1] + b[4]) / c, a[1] = .25 * c, a[2] = (b[6] + b[9]) / c) : (c = 2 * Math.sqrt(1 + b[10] - b[0] - b[5]), a[3] = (b[1] - b[4]) / c, a[0] = (b[8] + b[2]) / c, a[1] = (b[6] + b[9]) / c, a[2] = .25 * c);
            return a
        };
        a.fromRotationTranslationScale = function(a, b, c, d) {
            var e = b[0],
            h = b[1],
            g = b[2],
            k = b[3],
            l = e + e,
            t = h + h,
            n = g + g;
            b = e * l;
            var v = e * t;
            e *= n;
            var p = h * t;
            h *= n;
            g *= n;
            l *= k;
            t *= k;
            k *= n;
            n = d[0];
            var A = d[1];
            d = d[2];
            a[0] = (1 - (p + g)) * n;
            a[1] = (v + k) * n;
            a[2] = (e - t) * n;
            a[3] = 0;
            a[4] = (v - k) * A;
            a[5] = (1 - (b + g)) * A;
            a[6] = (h + l) * A;
            a[7] = 0;
            a[8] = (e + t) * d;
            a[9] = (h - l) * d;
            a[10] = (1 - (b + p)) * d;
            a[11] = 0;
            a[12] = c[0];
            a[13] = c[1];
            a[14] = c[2];
            a[15] = 1;
            return a
        };
        a.fromRotationTranslationScaleOrigin = function(a, b, c, d, e) {
            var h = b[0],
            m = b[1],
            g = b[2],
            k = b[3],
            l = h + h,
            n = m + m,
            v = g + g;
            b = h * l;
            var p = h * n,
            A = h * v;
            h = m * n;
            m *= v;
            var D = g * v;
            g = k * l;
            n *= k;
            var E = k * v,
            I = d[0],
            L = d[1];
            v = d[2];
            d = e[0];
            k = e[1];
            e = e[2];
            l = (1 - (h + D)) * I;
            var J = (p + E) * I;
            I *= A - n;
            p = (p - E) * L;
            D = (1 - (b + D)) * L;
            L *= m + g;
            A = (A + n) * v;
            m = (m - g) * v;
            b = (1 - (b + h)) * v;
            a[0] = l;
            a[1] = J;
            a[2] = I;
            a[3] = 0;
            a[4] = p;
            a[5] = D;
            a[6] = L;
            a[7] = 0;
            a[8] = A;
            a[9] = m;
            a[10] = b;
            a[11] = 0;
            a[12] = c[0] + d - (l * d + p * k + A * e);
            a[13] = c[1] + k - (J * d + D * k + m * e);
            a[14] = c[2] + e - (I * d + L * k + b * e);
            a[15] = 1;
            return a
        };
        a.fromQuat = function(a, b) {
            var c = b[0],
            d = b[1],
            e = b[2];
            b = b[3];
            var h = c + c,
            g = d + d,
            k = e + e;
            c *= h;
            var l = d * h;
            d *= g;
            var t = e * h,
            z = e * g;
            e *= k;
            h *= b;
            g *= b;
            b *= k;
            a[0] = 1 - d - e;
            a[1] = l + b;
            a[2] = t - g;
            a[3] = 0;
            a[4] = l - b;
            a[5] = 1 - c - e;
            a[6] = z + h;
            a[7] = 0;
            a[8] = t + g;
            a[9] = z - h;
            a[10] = 1 - c - d;
            a[11] = 0;
            a[12] = 0;
            a[13] = 0;
            a[14] = 0;
            a[15] = 1;
            return a
        };
        a.frustum = function(a, b, c, d, e, g, k) {
            var h = 1 / (c - b),
            m = 1 / (e - d),
            q = 1 / (g - k);
            a[0] = 2 * g * h;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = 0;
            a[5] = 2 * g * m;
            a[6] = 0;
            a[7] = 0;
            a[8] = (c + b) * h;
            a[9] = (e + d) * m;
            a[10] = (k + g) * q;
            a[11] = -1;
            a[12] = 0;
            a[13] = 0;
            a[14] = k * g * 2 * q;
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
            h = Math.tan(b.downDegrees * Math.PI / 180),
            g = Math.tan(b.leftDegrees * Math.PI / 180);
            b = Math.tan(b.rightDegrees * Math.PI / 180);
            var k = 2 / (g + b),
            l = 2 / (e + h);
            a[0] = k;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = 0;
            a[5] = l;
            a[6] = 0;
            a[7] = 0;
            a[8] = -((g - b) * k * .5);
            a[9] = (e - h) * l * .5;
            a[10] = d / (c - d);
            a[11] = -1;
            a[12] = 0;
            a[13] = 0;
            a[14] = d * c / (c - d);
            a[15] = 0;
            return a
        };
        a.ortho = function(a, b, c, d, e, g, k) {
            var h = 1 / (b - c),
            m = 1 / (d - e),
            q = 1 / (g - k);
            a[0] = -2 * h;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = 0;
            a[5] = -2 * m;
            a[6] = 0;
            a[7] = 0;
            a[8] = 0;
            a[9] = 0;
            a[10] = 2 * q;
            a[11] = 0;
            a[12] = (b + c) * h;
            a[13] = (e + d) * m;
            a[14] = (k + g) * q;
            a[15] = 1;
            return a
        };
        a.lookAt = function(a, c, d, e) {
            var h = c[0],
            g = c[1];
            c = c[2];
            var r = e[0];
            var u = e[1];
            var l = e[2];
            var t = d[0];
            e = d[1];
            var n = d[2];
            if (Math.abs(h - t) < k.EPSILON && Math.abs(g - e) < k.EPSILON && Math.abs(c - n) < k.EPSILON) return b(a);
            d = h - t;
            e = g - e;
            t = c - n;
            var v = 1 / Math.sqrt(d * d + e * e + t * t);
            d *= v;
            e *= v;
            t *= v;
            n = u * t - l * e;
            l = l * d - r * t;
            r = r * e - u * d; (v = Math.sqrt(n * n + l * l + r * r)) ? (v = 1 / v, n *= v, l *= v, r *= v) : r = l = n = 0;
            u = e * r - t * l;
            var p = t * n - d * r;
            var A = d * l - e * n; (v = Math.sqrt(u * u + p * p + A * A)) ? (v = 1 / v, u *= v, p *= v, A *= v) : A = p = u = 0;
            a[0] = n;
            a[1] = u;
            a[2] = d;
            a[3] = 0;
            a[4] = l;
            a[5] = p;
            a[6] = e;
            a[7] = 0;
            a[8] = r;
            a[9] = A;
            a[10] = t;
            a[11] = 0;
            a[12] = -(n * h + l * g + r * c);
            a[13] = -(u * h + p * g + A * c);
            a[14] = -(d * h + e * g + t * c);
            a[15] = 1;
            return a
        };
        a.targetTo = function(a, b, c, d) {
            var e = b[0],
            h = b[1];
            b = b[2];
            var g = d[0],
            k = d[1],
            l = d[2];
            d = e - c[0];
            var t = h - c[1];
            c = b - c[2];
            var n = d * d + t * t + c * c;
            0 < n && (n = 1 / Math.sqrt(n), d *= n, t *= n, c *= n);
            var v = k * c - l * t;
            l = l * d - g * c;
            g = g * t - k * d;
            n = v * v + l * l + g * g;
            0 < n && (n = 1 / Math.sqrt(n), v *= n, l *= n, g *= n);
            a[0] = v;
            a[1] = l;
            a[2] = g;
            a[3] = 0;
            a[4] = t * g - c * l;
            a[5] = c * v - d * g;
            a[6] = d * l - t * v;
            a[7] = 0;
            a[8] = d;
            a[9] = t;
            a[10] = c;
            a[11] = 0;
            a[12] = e;
            a[13] = h;
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
            h = a[4],
            u = a[5],
            y = a[6],
            t = a[7],
            l = a[8],
            v = a[9],
            B = a[10],
            A = a[11],
            D = a[12],
            E = a[13],
            I = a[14];
            a = a[15];
            var L = b[0],
            J = b[1],
            w = b[2],
            x = b[3],
            C = b[4],
            F = b[5],
            G = b[6],
            Buffer = b[7],
            K = b[8],
            M = b[9],
            N = b[10],
            O = b[11],
            P = b[12],
            Q = b[13],
            R = b[14];
            b = b[15];
            return Math.abs(c - L) <= k.EPSILON * Math.max(1, Math.abs(c), Math.abs(L)) && Math.abs(d - J) <= k.EPSILON * Math.max(1, Math.abs(d), Math.abs(J)) && Math.abs(e - w) <= k.EPSILON * Math.max(1, Math.abs(e), Math.abs(w)) && Math.abs(g - x) <= k.EPSILON * Math.max(1, Math.abs(g), Math.abs(x)) && Math.abs(h - C) <= k.EPSILON * Math.max(1, Math.abs(h), Math.abs(C)) && Math.abs(u - F) <= k.EPSILON * Math.max(1, Math.abs(u), Math.abs(F)) && Math.abs(y - G) <= k.EPSILON * Math.max(1, Math.abs(y), Math.abs(G)) && Math.abs(t - Buffer) <= k.EPSILON * Math.max(1, Math.abs(t), Math.abs(Buffer)) && Math.abs(l - K) <= k.EPSILON * Math.max(1, Math.abs(l), Math.abs(K)) && Math.abs(v - M) <= k.EPSILON * Math.max(1, Math.abs(v), Math.abs(M)) && Math.abs(B - N) <= k.EPSILON * Math.max(1, Math.abs(B), Math.abs(N)) && Math.abs(A - O) <= k.EPSILON * Math.max(1, Math.abs(A), Math.abs(O)) && Math.abs(D - P) <= k.EPSILON * Math.max(1, Math.abs(D), Math.abs(P)) && Math.abs(E - Q) <= k.EPSILON * Math.max(1, Math.abs(E), Math.abs(Q)) && Math.abs(I - R) <= k.EPSILON * Math.max(1, Math.abs(I), Math.abs(R)) && Math.abs(a - b) <= k.EPSILON * Math.max(1, Math.abs(a), Math.abs(b))
        };
        a.sub = a.mul = void 0;
        var k = function(a) {
            if (a && a.__esModule) return a;
            var b = {};
            if (null != a) for (var c in a) if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = ea && da ? da(a, c) : {};
                d.get || d.set ? ea(b, c, d) : b[c] = a[c]
            }
            b.
        default = a;
            return b
        } (Ia);
        a.mul = d;
        a.sub = g
    });
    Q(Ed);
    var Fd = O(function(c, a) {
        function b() {
            var a = new r.ARRAY_TYPE(3);
            r.ARRAY_TYPE != Float32Array && (a[0] = 0, a[1] = 0, a[2] = 0);
            return a
        }
        function d(a) {
            var b = a[0],
            c = a[1];
            a = a[2];
            return Math.sqrt(b * b + c * c + a * a)
        }
        function e(a, b, c) {
            var d = new r.ARRAY_TYPE(3);
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
        function k(a, b, c) {
            a[0] = b[0] * c[0];
            a[1] = b[1] * c[1];
            a[2] = b[2] * c[2];
            return a
        }
        function h(a, b, c) {
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
        function n(a, b) {
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
        function m(a, b) {
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
        function q(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
        }
        Object.defineProperty(a, "__esModule", {
            value: true
        });
        a.create = b;
        a.clone = function(a) {
            var b = new r.ARRAY_TYPE(3);
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
        a.multiply = k;
        a.divide = h;
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
        a.squaredDistance = n;
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
        a.normalize = m;
        a.dot = q;
        a.cross = function(a, b, c) {
            var d = b[0],
            e = b[1];
            b = b[2];
            var m = c[0],
            g = c[1];
            c = c[2];
            a[0] = e * c - b * g;
            a[1] = b * m - d * c;
            a[2] = d * g - e * m;
            return a
        };
        a.lerp = function(a, b, c, d) {
            var e = b[0],
            m = b[1];
            b = b[2];
            a[0] = e + d * (c[0] - e);
            a[1] = m + d * (c[1] - m);
            a[2] = b + d * (c[2] - b);
            return a
        };
        a.hermite = function(a, b, c, d, e, m) {
            var g = m * m,
            h = g * (2 * m - 3) + 1,
            k = g * (m - 2) + m,
            q = g * (m - 1);
            m = g * (3 - 2 * m);
            a[0] = b[0] * h + c[0] * k + d[0] * q + e[0] * m;
            a[1] = b[1] * h + c[1] * k + d[1] * q + e[1] * m;
            a[2] = b[2] * h + c[2] * k + d[2] * q + e[2] * m;
            return a
        };
        a.bezier = function(a, b, c, d, e, m) {
            var g = 1 - m,
            h = g * g,
            k = m * m,
            q = h * g;
            h *= 3 * m;
            g *= 3 * k;
            m *= k;
            a[0] = b[0] * q + c[0] * h + d[0] * g + e[0] * m;
            a[1] = b[1] * q + c[1] * h + d[1] * g + e[1] * m;
            a[2] = b[2] * q + c[2] * h + d[2] * g + e[2] * m;
            return a
        };
        a.random = function(a, b) {
            b = b || 1;
            var c = 2 * r.RANDOM() * Math.PI,
            d = 2 * r.RANDOM() - 1,
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
            var m = c[3] * d + c[7] * e + c[11] * b + c[15];
            m = m || 1;
            a[0] = (c[0] * d + c[4] * e + c[8] * b + c[12]) / m;
            a[1] = (c[1] * d + c[5] * e + c[9] * b + c[13]) / m;
            a[2] = (c[2] * d + c[6] * e + c[10] * b + c[14]) / m;
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
            m = c[2],
            g = b[0],
            h = b[1];
            b = b[2];
            var k = e * b - m * h,
            q = m * g - d * b,
            r = d * h - e * g;
            c = 2 * c[3];
            a[0] = g + k * c + 2 * (e * r - m * q);
            a[1] = h + q * c + 2 * (m * k - d * r);
            a[2] = b + r * c + 2 * (d * q - e * k);
            return a
        };
        a.rotateX = function(a, b, c, d) {
            var e = [],
            m = [];
            e[0] = b[0] - c[0];
            e[1] = b[1] - c[1];
            e[2] = b[2] - c[2];
            m[0] = e[0];
            m[1] = e[1] * Math.cos(d) - e[2] * Math.sin(d);
            m[2] = e[1] * Math.sin(d) + e[2] * Math.cos(d);
            a[0] = m[0] + c[0];
            a[1] = m[1] + c[1];
            a[2] = m[2] + c[2];
            return a
        };
        a.rotateY = function(a, b, c, d) {
            var e = [],
            m = [];
            e[0] = b[0] - c[0];
            e[1] = b[1] - c[1];
            e[2] = b[2] - c[2];
            m[0] = e[2] * Math.sin(d) + e[0] * Math.cos(d);
            m[1] = e[1];
            m[2] = e[2] * Math.cos(d) - e[0] * Math.sin(d);
            a[0] = m[0] + c[0];
            a[1] = m[1] + c[1];
            a[2] = m[2] + c[2];
            return a
        };
        a.rotateZ = function(a, b, c, d) {
            var e = [],
            m = [];
            e[0] = b[0] - c[0];
            e[1] = b[1] - c[1];
            e[2] = b[2] - c[2];
            m[0] = e[0] * Math.cos(d) - e[1] * Math.sin(d);
            m[1] = e[0] * Math.sin(d) + e[1] * Math.cos(d);
            m[2] = e[2];
            a[0] = m[0] + c[0];
            a[1] = m[1] + c[1];
            a[2] = m[2] + c[2];
            return a
        };
        a.angle = function(a, b) {
            a = e(a[0], a[1], a[2]);
            b = e(b[0], b[1], b[2]);
            m(a, a);
            m(b, b);
            b = q(a, b);
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
            m = b[1];
            b = b[2];
            return Math.abs(c - e) <= r.EPSILON * Math.max(1, Math.abs(c), Math.abs(e)) && Math.abs(d - m) <= r.EPSILON * Math.max(1, Math.abs(d), Math.abs(m)) && Math.abs(a - b) <= r.EPSILON * Math.max(1, Math.abs(a), Math.abs(b))
        };
        a.forEach = a.sqrLen = a.len = a.sqrDist = a.dist = a.div = a.mul = a.sub = void 0;
        var r = function(a) {
            if (a && a.__esModule) return a;
            var b = {};
            if (null != a) for (var c in a) if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = ea && da ? da(a, c) : {};
                d.get || d.set ? ea(b, c, d) : b[c] = a[c]
            }
            b.
        default = a;
            return b
        } (Ia);
        a.sub = g;
        a.mul = k;
        a.div = h;
        a.dist = l;
        a.sqrDist = n;
        a.len = d;
        a.sqrLen = p;
        c = function() {
            var a = b();
            return function(b, c, d, e, m, g) {
                c || (c = 3);
                d || (d = 0);
                for (e = e ? Math.min(e * c + d, b.length) : b.length; d < e; d += c) a[0] = b[d],
                a[1] = b[d + 1],
                a[2] = b[d + 2],
                m(a, a, g),
                b[d] = a[0],
                b[d + 1] = a[1],
                b[d + 2] = a[2];
                return b
            }
        } ();
        a.forEach = c
    });
    Q(Fd);
    var Gd = O(function(c, a) {
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
        function k(a, b) {
            var c = b[0] - a[0],
            d = b[1] - a[1],
            e = b[2] - a[2];
            a = b[3] - a[3];
            return Math.sqrt(c * c + d * d + e * e + a * a)
        }
        function h(a, b) {
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
        function n(a) {
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
        a.distance = k;
        a.squaredDistance = h;
        a.length = l;
        a.squaredLength = n;
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
            m = c[1] * d[2] - c[2] * d[1],
            k = c[1] * d[3] - c[3] * d[1];
            c = c[2] * d[3] - c[3] * d[2];
            d = b[0];
            var q = b[1],
            r = b[2];
            b = b[3];
            a[0] = q * c - r * k + b * m;
            a[1] = -(d * c) + r * h - b * g;
            a[2] = d * k - q * h + b * e;
            a[3] = -(d * m) + q * g - r * e;
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
                var m = g * g + h * h
            } while ( 1 <= m );
            e = Math.sqrt((1 - e) / m);
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
            m = c[1],
            k = c[2];
            c = c[3];
            var q = c * d + m * g - k * e,
            r = c * e + k * d - h * g,
            l = c * g + h * e - m * d;
            d = -h * d - m * e - k * g;
            a[0] = q * c + d * -h + r * -k - l * -m;
            a[1] = r * c + d * -m + l * -h - q * -k;
            a[2] = l * c + d * -k + q * -m - r * -h;
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
        a.forEach = a.sqrLen = a.len = a.sqrDist = a.dist = a.div = a.mul = a.sub = void 0;
        var p = function(a) {
            if (a && a.__esModule) return a;
            var b = {};
            if (null != a) for (var c in a) if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = ea && da ? da(a, c) : {};
                d.get || d.set ? ea(b, c, d) : b[c] = a[c]
            }
            b.
        default = a;
            return b
        } (Ia);
        a.sub = d;
        a.mul = e;
        a.div = g;
        a.dist = k;
        a.sqrDist = h;
        a.len = l;
        a.sqrLen = n;
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
    Q(Gd);
    var Hd = O(function(c, a) {
        function b(a) {
            if (a && a.__esModule) return a;
            var b = {};
            if (null != a) for (var c in a) if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = ea && da ? da(a, c) : {};
                d.get || d.set ? ea(b, c, d) : b[c] = a[c]
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
            m = c[2];
            c = c[3];
            a[0] = d * c + b * h + e * m - g * k;
            a[1] = e * c + b * k + g * h - d * m;
            a[2] = g * c + b * m + d * k - e * h;
            a[3] = b * c - d * h - e * k - g * m;
            return a
        }
        function k(a, b, c, d) {
            var e = b[0],
            g = b[1],
            h = b[2];
            b = b[3];
            var k = c[0],
            m = c[1],
            q = c[2];
            c = c[3];
            var r = e * k + g * m + h * q + b * c;
            0 > r && (r = -r, k = -k, m = -m, q = -q, c = -c);
            if (1 - r > l.EPSILON) {
                var n = Math.acos(r);
                var u = Math.sin(n);
                r = Math.sin((1 - d) * n) / u;
                d = Math.sin(d * n) / u
            } else r = 1 - d;
            a[0] = r * e + d * k;
            a[1] = r * g + d * m;
            a[2] = r * h + d * q;
            a[3] = r * b + d * c;
            return a
        }
        function h(a, b) {
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
        a.slerp = k;
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
        a.fromMat3 = h;
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
        a.setAxes = a.sqlerp = a.rotationTo = a.equals = a.exactEquals = a.normalize = a.sqrLen = a.squaredLength = a.len = a.length = a.lerp = a.dot = a.scale = a.mul = a.add = a.set = a.copy = a.fromValues = a.clone = void 0;
        var l = b(Ia),
        n = b(Dd),
        p = b(Fd);
        c = b(Gd);
        a.clone = c.clone;
        a.fromValues = c.fromValues;
        a.copy = c.copy;
        a.set = c.set;
        a.add = c.add;
        a.mul = g;
        a.scale = c.scale;
        a.dot = c.dot;
        a.lerp = c.lerp;
        var m = c.length;
        a.length = m;
        a.len = m;
        m = c.squaredLength;
        a.squaredLength = m;
        a.sqrLen = m;
        var q = c.normalize;
        a.normalize = q;
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
                return q(d, d)
            }
        } ();
        a.rotationTo = c;
        c = function() {
            var a = d(),
            b = d();
            return function(c, d, e, g, h, m) {
                k(a, d, h, m);
                k(b, e, g, m);
                k(c, a, b, 2 * m * (1 - m));
                return c
            }
        } ();
        a.sqlerp = c;
        c = function() {
            var a = n.create();
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
                return q(b, h(b, a))
            }
        } ();
        a.setAxes = c
    });
    Q(Hd);
    var vf = O(function(c, a) {
        function b(a) {
            if (a && a.__esModule) return a;
            var b = {};
            if (null != a) for (var c in a) if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = ea && da ? da(a, c) : {};
                d.get || d.set ? ea(b, c, d) : b[c] = a[c]
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
            m = c[5],
            q = c[6],
            l = c[7],
            n = b[4],
            r = b[5],
            p = b[6];
            b = b[7];
            var J = c[0],
            w = c[1],
            x = c[2];
            c = c[3];
            a[0] = d * c + h * J + e * x - g * w;
            a[1] = e * c + h * w + g * J - d * x;
            a[2] = g * c + h * x + d * w - e * J;
            a[3] = h * c - d * J - e * w - g * x;
            a[4] = d * l + h * k + e * q - g * m + n * c + b * J + r * x - p * w;
            a[5] = e * l + h * m + g * k - d * q + r * c + b * w + p * J - n * x;
            a[6] = g * l + h * q + d * m - e * k + p * c + b * x + n * w - r * J;
            a[7] = h * l - d * k - e * m - g * q + b * c - n * J - r * w - p * x;
            return a
        }
        Object.defineProperty(a, "__esModule", {
            value: true
        });
        a.create = function() {
            var a = new k.ARRAY_TYPE(8);
            k.ARRAY_TYPE != Float32Array && (a[0] = 0, a[1] = 0, a[2] = 0, a[4] = 0, a[5] = 0, a[6] = 0, a[7] = 0);
            a[3] = 1;
            return a
        };
        a.clone = function(a) {
            var b = new k.ARRAY_TYPE(8);
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
        a.fromValues = function(a, b, c, d, e, g, h, l) {
            var m = new k.ARRAY_TYPE(8);
            m[0] = a;
            m[1] = b;
            m[2] = c;
            m[3] = d;
            m[4] = e;
            m[5] = g;
            m[6] = h;
            m[7] = l;
            return m
        };
        a.fromRotationTranslationValues = function(a, b, c, d, e, g, h) {
            var m = new k.ARRAY_TYPE(8);
            m[0] = a;
            m[1] = b;
            m[2] = c;
            m[3] = d;
            e *= .5;
            g *= .5;
            h *= .5;
            m[4] = e * d + g * c - h * b;
            m[5] = g * d + h * a - e * c;
            m[6] = h * d + e * b - g * a;
            m[7] = -e * a - g * b - h * c;
            return m
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
            var c = h.create();
            l.getRotation(c, b);
            var e = new k.ARRAY_TYPE(3);
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
            m = -b[2];
            b = b[3];
            a[0] = 2 * (c * b + g * h + d * m - e * k);
            a[1] = 2 * (d * b + g * k + e * h - c * m);
            a[2] = 2 * (e * b + g * m + c * k - d * h);
            return a
        };
        a.translate = function(a, b, c) {
            var d = b[0],
            e = b[1],
            g = b[2],
            h = b[3],
            k = .5 * c[0],
            m = .5 * c[1];
            c = .5 * c[2];
            var q = b[4],
            l = b[5],
            n = b[6];
            b = b[7];
            a[0] = d;
            a[1] = e;
            a[2] = g;
            a[3] = h;
            a[4] = h * k + e * c - g * m + q;
            a[5] = h * m + g * k - d * c + l;
            a[6] = h * c + d * m - e * k + n;
            a[7] = -d * k - e * m - g * c + b;
            return a
        };
        a.rotateX = function(a, b, c) {
            var d = -b[0],
            e = -b[1],
            g = -b[2],
            k = b[3],
            m = b[4],
            q = b[5],
            l = b[6],
            n = b[7],
            r = m * k + n * d + q * g - l * e,
            p = q * k + n * e + l * d - m * g,
            L = l * k + n * g + m * e - q * d;
            m = n * k - m * d - q * e - l * g;
            h.rotateX(a, b, c);
            d = a[0];
            e = a[1];
            g = a[2];
            k = a[3];
            a[4] = r * k + m * d + p * g - L * e;
            a[5] = p * k + m * e + L * d - r * g;
            a[6] = L * k + m * g + r * e - p * d;
            a[7] = m * k - r * d - p * e - L * g;
            return a
        };
        a.rotateY = function(a, b, c) {
            var d = -b[0],
            e = -b[1],
            g = -b[2],
            k = b[3],
            m = b[4],
            q = b[5],
            l = b[6],
            n = b[7],
            r = m * k + n * d + q * g - l * e,
            p = q * k + n * e + l * d - m * g,
            L = l * k + n * g + m * e - q * d;
            m = n * k - m * d - q * e - l * g;
            h.rotateY(a, b, c);
            d = a[0];
            e = a[1];
            g = a[2];
            k = a[3];
            a[4] = r * k + m * d + p * g - L * e;
            a[5] = p * k + m * e + L * d - r * g;
            a[6] = L * k + m * g + r * e - p * d;
            a[7] = m * k - r * d - p * e - L * g;
            return a
        };
        a.rotateZ = function(a, b, c) {
            var d = -b[0],
            e = -b[1],
            g = -b[2],
            k = b[3],
            m = b[4],
            l = b[5],
            q = b[6],
            n = b[7],
            r = m * k + n * d + l * g - q * e,
            p = l * k + n * e + q * d - m * g,
            L = q * k + n * g + m * e - l * d;
            m = n * k - m * d - l * e - q * g;
            h.rotateZ(a, b, c);
            d = a[0];
            e = a[1];
            g = a[2];
            k = a[3];
            a[4] = r * k + m * d + p * g - L * e;
            a[5] = p * k + m * e + L * d - r * g;
            a[6] = L * k + m * g + r * e - p * d;
            a[7] = m * k - r * d - p * e - L * g;
            return a
        };
        a.rotateByQuatAppend = function(a, b, c) {
            var d = c[0],
            e = c[1],
            g = c[2];
            c = c[3];
            var h = b[0],
            k = b[1],
            m = b[2],
            l = b[3];
            a[0] = h * c + l * d + k * g - m * e;
            a[1] = k * c + l * e + m * d - h * g;
            a[2] = m * c + l * g + h * e - k * d;
            a[3] = l * c - h * d - k * e - m * g;
            h = b[4];
            k = b[5];
            m = b[6];
            l = b[7];
            a[4] = h * c + l * d + k * g - m * e;
            a[5] = k * c + l * e + m * d - h * g;
            a[6] = m * c + l * g + h * e - k * d;
            a[7] = l * c - h * d - k * e - m * g;
            return a
        };
        a.rotateByQuatPrepend = function(a, b, c) {
            var d = b[0],
            e = b[1],
            g = b[2];
            b = b[3];
            var h = c[0],
            k = c[1],
            m = c[2],
            l = c[3];
            a[0] = d * l + b * h + e * m - g * k;
            a[1] = e * l + b * k + g * h - d * m;
            a[2] = g * l + b * m + d * k - e * h;
            a[3] = b * l - d * h - e * k - g * m;
            h = c[4];
            k = c[5];
            m = c[6];
            l = c[7];
            a[4] = d * l + b * h + e * m - g * k;
            a[5] = e * l + b * k + g * h - d * m;
            a[6] = g * l + b * m + d * k - e * h;
            a[7] = b * l - d * h - e * k - g * m;
            return a
        };
        a.rotateAroundAxis = function(a, b, c, d) {
            if (Math.abs(d) < k.EPSILON) return e(a, b);
            var g = Math.sqrt(c[0] * c[0] + c[1] * c[1] + c[2] * c[2]);
            d *= .5;
            var h = Math.sin(d),
            m = h * c[0] / g,
            l = h * c[1] / g;
            c = h * c[2] / g;
            d = Math.cos(d);
            g = b[0];
            h = b[1];
            var n = b[2],
            q = b[3];
            a[0] = g * d + q * m + h * c - n * l;
            a[1] = h * d + q * l + n * m - g * c;
            a[2] = n * d + q * c + g * l - h * m;
            a[3] = q * d - g * m - h * l - n * c;
            g = b[4];
            h = b[5];
            n = b[6];
            b = b[7];
            a[4] = g * d + b * m + h * c - n * l;
            a[5] = h * d + b * l + n * m - g * c;
            a[6] = n * d + b * c + g * l - h * m;
            a[7] = b * d - g * m - h * l - n * c;
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
            0 > n(b, c) && (d = -d);
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
                m = b[5],
                l = b[6];
                b = b[7];
                var n = d * k + e * m + g * l + h * b;
                a[0] = d;
                a[1] = e;
                a[2] = g;
                a[3] = h;
                a[4] = (k - d * n) / c;
                a[5] = (m - e * n) / c;
                a[6] = (l - g * n) / c;
                a[7] = (b - h * n) / c
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
            h = a[4],
            m = a[5],
            l = a[6];
            a = a[7];
            var n = b[0],
            q = b[1],
            p = b[2],
            I = b[3],
            L = b[4],
            J = b[5],
            w = b[6];
            b = b[7];
            return Math.abs(c - n) <= k.EPSILON * Math.max(1, Math.abs(c), Math.abs(n)) && Math.abs(d - q) <= k.EPSILON * Math.max(1, Math.abs(d), Math.abs(q)) && Math.abs(e - p) <= k.EPSILON * Math.max(1, Math.abs(e), Math.abs(p)) && Math.abs(g - I) <= k.EPSILON * Math.max(1, Math.abs(g), Math.abs(I)) && Math.abs(h - L) <= k.EPSILON * Math.max(1, Math.abs(h), Math.abs(L)) && Math.abs(m - J) <= k.EPSILON * Math.max(1, Math.abs(m), Math.abs(J)) && Math.abs(l - w) <= k.EPSILON * Math.max(1, Math.abs(l), Math.abs(w)) && Math.abs(a - b) <= k.EPSILON * Math.max(1, Math.abs(a), Math.abs(b))
        };
        a.sqrLen = a.squaredLength = a.len = a.length = a.dot = a.mul = a.setReal = a.getReal = void 0;
        var k = b(Ia),
        h = b(Hd),
        l = b(Ed);
        a.getReal = h.copy;
        a.setReal = h.copy;
        a.mul = g;
        var n = h.dot;
        a.dot = n;
        c = h.length;
        a.length = c;
        a.len = c;
        var p = h.squaredLength;
        a.squaredLength = p;
        a.sqrLen = p
    });
    Q(vf);
    var wf = O(function(c, a) {
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
        function k(a, b) {
            var c = b[0] - a[0];
            a = b[1] - a[1];
            return Math.sqrt(c * c + a * a)
        }
        function h(a, b) {
            var c = b[0] - a[0];
            a = b[1] - a[1];
            return c * c + a * a
        }
        function l(a) {
            var b = a[0];
            a = a[1];
            return Math.sqrt(b * b + a * a)
        }
        function n(a) {
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
        a.distance = k;
        a.squaredDistance = h;
        a.length = l;
        a.squaredLength = n;
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
        a.forEach = a.sqrLen = a.sqrDist = a.dist = a.div = a.mul = a.sub = a.len = void 0;
        var p = function(a) {
            if (a && a.__esModule) return a;
            var b = {};
            if (null != a) for (var c in a) if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = ea && da ? da(a, c) : {};
                d.get || d.set ? ea(b, c, d) : b[c] = a[c]
            }
            b.
        default = a;
            return b
        } (Ia);
        a.len = l;
        a.sub = d;
        a.mul = e;
        a.div = g;
        a.dist = k;
        a.sqrDist = h;
        a.sqrLen = n;
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
    Q(wf);
    var Da = O(function(c, a) {
        function b(a) {
            if (a && a.__esModule) return a;
            var b = {};
            if (null != a) for (var c in a) if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = ea && da ? da(a, c) : {};
                d.get || d.set ? ea(b, c, d) : b[c] = a[c]
            }
            b.
        default = a;
            return b
        }
        Object.defineProperty(a, "__esModule", {
            value: true
        });
        a.vec4 = a.vec3 = a.vec2 = a.quat2 = a.quat = a.mat4 = a.mat3 = a.mat2d = a.mat2 = a.glMatrix = void 0;
        c = b(Ia);
        a.glMatrix = c;
        c = b(tf);
        a.mat2 = c;
        c = b(uf);
        a.mat2d = c;
        c = b(Dd);
        a.mat3 = c;
        c = b(Ed);
        a.mat4 = c;
        c = b(Hd);
        a.quat = c;
        c = b(vf);
        a.quat2 = c;
        c = b(wf);
        a.vec2 = c;
        c = b(Fd);
        a.vec3 = c;
        c = b(Gd);
        a.vec4 = c
    });
    Q(Da);
    var Fa = Da.vec4,
    K = Da.vec3,
    gi = Da.vec2,
    hi = Da.quat2,
    tc = Da.quat,
    C = Da.mat4,
    ii = Da.mat3,
    ji = Da.mat2d,
    ki = Da.mat2,
    li = Da.glMatrix;
    Lb.deviation = function(c, a, b, d) {
        var e = a && a.length,
        g = Math.abs($c(c, 0, e ? a[0] * b: c.length, b));
        if (e) {
            e = 0;
            for (var k = a.length; e < k; e++) g -= Math.abs($c(c, a[e] * b, e < k - 1 ? a[e + 1] * b: c.length, b))
        }
        for (e = a = 0; e < d.length; e += 3) {
            k = d[e] * b;
            var h = d[e + 1] * b,
            l = d[e + 2] * b;
            a += Math.abs((c[k] - c[l]) * (c[h + 1] - c[k + 1]) - (c[k] - c[h]) * (c[l + 1] - c[k + 1]))
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
            for (var g = 0; g < c[e].length; g++) for (var k = 0; k < a; k++) b.vertices.push(c[e][g][k]);
            0 < e && (d += c[e - 1].length, b.holes.push(d))
        }
        return b
    };
    Lb.
default = Lb;
    var xf = "undefined" === typeof hf ? "__target": hf(),
    yg = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
    mc = window.URL || window.webkitURL,
    Bb = window.Worker;
    if (Bb) {
        var yf = je("self.onmessage = function () {}"),
        zf = new Uint8Array(1);
        try {
            if (/(?:Trident|Edge)\/(?:[567]|12)/i.test(navigator.userAgent)) throw Error("Not available");
            var Id = new Bb(yf);
            Id.postMessage(zf, [zf.buffer])
        } catch(c) {
            Bb = null
        } finally {
            mc.revokeObjectURL(yf),
            Id && Id.terminate()
        }
    }
    var mi = new
    function(c, a) {
        return function(b) {
            var d = this;
            if (a) {
                if (Bb && !b) return b = ("" + a).replace(/^function.+?{/, "").slice(0, -1),
                b = je(b),
                this[xf] = new Bb(b),
                mc.revokeObjectURL(b),
                this[xf];
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
    Af = {
        window: 1,
        windowAnimation: 2,
        gradual: 3,
        ripple: 4,
        water: 6
    },
    ShapeLayer = function(c) {
        function a(b, c) {
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b, c));
            b._isShow = true;
            c = b.getOptions();
            if ("windowAnimation" === c.style || "ripple" === c.style || 0 < c.riseTime) b.autoUpdate = true;
            b.selectedColor = [ - 1, -1, -1];
            b.textureCache = {};
            return b
        }
        S(a, c);
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
                this.dataMgr = new gb(this, this.gl);
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
                this.normalMatrix = C.create()
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
                    var k = this.getData();
                    if (k && !(0 >= k.length)) {
                        k = this.getOptions();
                        var h = this.program;
                        h.use(b);
                        if (!k.texture || this.texture) {
                            b.disable(b.CULL_FACE);
                            k.blend && (b.enable(b.BLEND), b.blendFunc(b.ONE, b.ONE), b.blendEquation(b.FUNC_ADD));
                            0 === k.height && (b.enable(b.BLEND), b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA));
                            var l = 0;
                            k.style && Af[k.style] && (l = Af[k.style]);
                            "gradual" === k.style ? (b.depthMask(false), b.enable(b.BLEND), b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA)) : b.depthMask(true);
                            var n = this.normizedColor(k.topColor);
                            if ("ripple" === k.style && k.rippleLayer && k.rippleLayer.data && k.rippleLayer.data[0]) {
                                var p = this.normizedPoint(k.rippleLayer.data[0].geometry.coordinates);
                                h.setUniforms({
                                    u_ripple_center: [p[0], p[1], 0],
                                    u_radius: k.rippleLayer.options.size * k.rippleLayer.currentScale
                                })
                            }
                            p = K.fromValues(0, -1, 2);
                            k.lightDir && (p = K.fromValues(k.lightDir[0], k.lightDir[1], k.lightDir[2]));
                            var m = this.normalMatrix;
                            C.invert(m, g);
                            C.transpose(m, m);
                            h.setUniforms(T(this.getCommonUniforms(a), {
                                u_normal_matrix: m,
                                u_sampler: this.texture,
                                u_proj_matrix: c,
                                u_mv_matrix: g,
                                style: l,
                                top_color: n,
                                u_use_lighting: k.useLight,
                                u_use_texture: this.isUseTexture,
                                alpha: void 0 === k.opacity ? .8 : parseFloat(k.opacity),
                                time: new Date - this.initializeTime,
                                dataTime: new Date - this.dataTime,
                                riseTime: k.riseTime,
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
                c.texture ? (this.isUseTexture = true, loadTextureImage(this.gl, c.texture,
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
    gb.prototype.initData = function() {
        this.outBuilding3d = {
            pickColorVertex: [],
            vertex: [],
            texture: [],
            color: [],
            height: [],
            index: []
        }
    };
    gb.prototype.getData = function() {
        return this.outBuilding3d
    };
    gb.prototype.initWorker = function() {
        this.worker = new mi;
        this.worker.onmessage = function(c) {}
    };
    gb.prototype.parseData = function(c) {
        var a = this;
        this.initData();
        for (var b = this.shapeLayer.getOptions(), d = 0; d < c.length; d++) {
            var e = c[d],
            g = e.height || 0;
            "properties" in e && "height" in e.properties && (g = e.properties.height);
            g *= 1;
            var k = e.color || b.color;
            "properties" in e && "color" in e.properties && (k = e.properties.color);
            "[object Function]" === Object.prototype.toString.call(k) && (k = k(e));
            k = this.shapeLayer.normizedColor(k);
            var h = void 0;
            b.enablePicked && (h = this.shapeLayer.indexToRgb(d));
            var l = void 0,
            n = void 0;
            b.riseTime && (n = e.preColor, "properties" in e && "preColor" in e.properties && (n = e.properties.preColor), l = e.preHeight, "properties" in e && "preHeight" in e.properties && (l = e.properties.preHeight), void 0 === l && (l = 0));
            if (e.geometry.coordinates) if ("MultiPolygon" === e.geometry.type) for (var p = e.geometry.coordinates,
            m = function(b) {
                var c = [],
                d = [];
                e.geometry.coordinates[b][0].forEach(function(b) {
                    b = a.shapeLayer.normizedPoint(b);
                    c.push(b[0], b[1]);
                    d.push(b[2])
                });
                a.parseBuilding3d(c, d, l, g, n, k, h, a.outBuilding3d)
            },
            q = 0; q < p.length; q++) m(q);
            else(function() {
                var b = [],
                c = [];
                e.geometry.coordinates[0].forEach(function(d) {
                    d = a.shapeLayer.normizedPoint(d);
                    b.push(d[0], d[1]);
                    c.push(d[2])
                });
                a.parseBuilding3d(b, c, l, g, n, k, h, a.outBuilding3d)
            })()
        }
        this.shapeLayer.vertexBuffer.updateData(new Float32Array(this.outBuilding3d.vertex));
        this.shapeLayer.colorBuffer.updateData(new Float32Array(this.outBuilding3d.color));
        this.shapeLayer.heightBuffer.updateData(new Float32Array(this.outBuilding3d.height));
        this.shapeLayer.textureBuffer.updateData(new Float32Array(this.outBuilding3d.texture));
        this.shapeLayer.indexBuffer.updateData(new Uint32Array(this.outBuilding3d.index));
        b.enablePicked && this.shapeLayer.pickBuffer.updateData(new Float32Array(this.outBuilding3d.pickColorVertex))
    };
    gb.prototype.getBounds = function(c) {
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
    gb.prototype.parseBuilding3d = function(c, a, b, d, e, g, k, h) {
        void 0 === b && (b = d);
        var l = this.shapeLayer.options,
        n = h.vertex,
        p = h.texture,
        m = h.color,
        q = h.height,
        r = h.pickColorVertex;
        h = h.index;
        void 0 === e && (e = g);
        var u = 0,
        y = 0;
        this.shapeLayer.image && (u = this.shapeLayer.image.width * l.textureScale, y = this.shapeLayer.image.height * l.textureScale);
        if ("gradual" != l.style) {
            var t = Lb(c),
            z = t[0],
            v = t[1],
            B = t[2];
            z = [c[2 * z], c[2 * z + 1], 1];
            v = [c[2 * v], c[2 * v + 1], 1];
            var A = [c[2 * B], c[2 * B + 1], 1];
            B = [];
            K.cross(B, [A[0] - v[0], A[1] - v[1], A[2] - v[2]], [z[0] - v[0], z[1] - v[1], z[2] - v[2]]);
            v = n.length / 7;
            if (l.texture) var D = this.getBounds(c);
            z = l.isTextureFull;
            A = 0;
            for (var E = c.length; A < E; A += 2) n.push(c[A], c[A + 1], a[A / 2], 1, B[0], B[1], B[2]),
            m.push(g[0], g[1], g[2], g[3], e[0], e[1], e[2], e[3]),
            q.push(d, b),
            l.texture && (z ? (p.push((c[A] - D.minX) / D.width), p.push((c[A + 1] - D.minY) / D.height)) : (p.push((c[A] - D.minX) / u), p.push((c[A + 1] - D.minY) / y))),
            k && r.push(k[0] / 255, k[1] / 255, k[2] / 255);
            D = 0;
            for (B = t.length; D < B; D++) h.push(t[D] + v)
        }
        if (! (d === b && 0 >= d)) for (t = 0, D = c.length; t < D; t += 2) {
            B = n.length / 7;
            var I = c[t],
            L = c[t + 1];
            v = [I, L, a[t / 2], 0];
            A = [I, L, a[t / 2], 1];
            E = t + 2;
            var J = t + 3;
            t === D - 2 && (E = 0, J = 1);
            E = c[E];
            J = c[J];
            I = Math.sqrt(Math.pow(E - I, 2), Math.pow(J - L, 2));
            L = [E, J, a[t / 2], 0];
            E = [E, J, a[t / 2], 1];
            J = [];
            K.cross(J, [L[0] - v[0], L[1] - v[1], L[2] - v[2]], [A[0] - v[0], A[1] - v[1], A[2] - v[2]]);
            n.push(v[0], v[1], v[2], v[3]);
            n.push(J[0], J[1], J[2]);
            n.push(A[0], A[1], A[2], A[3]);
            n.push(J[0], J[1], J[2]);
            n.push(L[0], L[1], L[2], L[3]);
            n.push(J[0], J[1], J[2]);
            n.push(E[0], E[1], E[2], E[3]);
            n.push(J[0], J[1], J[2]);
            m.push(g[0], g[1], g[2], g[3]);
            m.push(e[0], e[1], e[2], e[3]);
            m.push(g[0], g[1], g[2], g[3]);
            m.push(e[0], e[1], e[2], e[3]);
            m.push(g[0], g[1], g[2], g[3]);
            m.push(e[0], e[1], e[2], e[3]);
            m.push(g[0], g[1], g[2], g[3]);
            m.push(e[0], e[1], e[2], e[3]);
            q.push(d);
            q.push(b);
            q.push(d);
            q.push(b);
            q.push(d);
            q.push(b);
            q.push(d);
            q.push(b);
            l.texture && (z ? (p.push(0, 0), p.push(0, 1), p.push(1, 0), p.push(1, 1)) : (p.push(0, 0), p.push(0, d / y), p.push(I / u, 0), p.push(I / u, d / y)));
            k && (r.push(k[0] / 255, k[1] / 255, k[2] / 255), r.push(k[0] / 255, k[1] / 255, k[2] / 255), r.push(k[0] / 255, k[1] / 255, k[2] / 255), r.push(k[0] / 255, k[1] / 255, k[2] / 255));
            h.push(B, B + 2, B + 3, B, B + 3, B + 1)
        }
    };
    var GridLayer = function(c) {
        function a(b, c) {
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b, c));
            b.preHeightMapper = {};
            b.preColorMapper = {};
            return b
        }
        S(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return T(Wa(a.prototype.__proto__ || N(a.prototype), "getDefaultOptions", this).call(this), {
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
                k = {};
                c = a.length;
                for (var h = this.getPointOffset(), l = 0; l < c; l++) {
                    var n = this.normizedPoint(a[l].geometry.coordinates);
                    n = ~~ ((n[0] + h[0]) / b) + "_" + ~~ ((n[1] + h[1]) / b);
                    void 0 === k[n] && (k[n] = 0);
                    var p = ~~a[l].count || 1;
                    "properties" in a[l] && "count" in a[l].properties && (p = ~~a[l].properties.count);
                    k[n] += p
                }
                Ea(k).forEach(function(a) {
                    var c = a.split("_");
                    d.push([c[0] * b + b / 2, c[1] * b + b / 2, k[a]])
                });
                return d
            }
        },
        {
            key: "onChanged",
            value: function(b, c) {
                c = this.processData(c);
                Wa(a.prototype.__proto__ || N(a.prototype), "onChanged", this).call(this, b, c)
            }
        },
        {
            key: "getGridDataRange",
            value: function() {
                var a = this.gridData,
                c = void 0,
                e = void 0;
                a[0] && (c = a[0][2], e = a[0][2]);
                for (var g = a.length,
                k = 0; k < g; k++) {
                    var h = a[k];
                    c = Math.max(h[2], c);
                    e = Math.min(h[2], e)
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
                k = [];
                this.gridData = k;
                if ("normal" === c) {
                    c = this.getPointOffset();
                    for (var h = 0; h < a.length; h++) {
                        var l = this.normizedPoint(a[h].geometry.coordinates),
                        n = l[0] + c[0];
                        l = l[1] + c[1];
                        var p = ~~a[h].count || 1;
                        "properties" in a[h] && "count" in a[h].properties && (p = ~~a[h].properties.count);
                        var m = a[h].color;
                        "properties" in a[h] && "color" in a[h].properties && (m = ~~a[h].properties.color);
                        k.push([n, l, p, m])
                    }
                } else k = this.generateGrid(a, b);
                a = [];
                this._preHeightMapper = {};
                this._preColorMapper = {};
                for (c = 0; c < k.length; c++) h = k[c],
                h[0] = h[0],
                h[1] = h[1],
                n = h[2],
                b.height && (n = "function" === typeof b.height ? b.height({
                    count: h[2]
                }) : b.height),
                l = g / 2 - 5,
                p = h[3],
                b.color && (p = "function" === typeof b.color ? b.color({
                    count: h[2],
                    color: h[3]
                }) : fa(p).unitArray()),
                m = "p" + h[0] + h[1],
                a.push({
                    geometry: {
                        type: "Polygon",
                        coordinates: [[[h[0] - l, h[1] - l], [h[0] - l, h[1] + l], [h[0] + l, h[1] + l], [h[0] + l, h[1] - l]]]
                    },
                    color: p,
                    preHeight: this.preHeightMapper[m],
                    preColor: this.preColorMapper[m],
                    height: n
                }),
                this._preHeightMapper[m] = n,
                this._preColorMapper[m] = p;
                this.preHeightMapper = this._preHeightMapper;
                this.preColorMapper = this._preColorMapper;
                return a
            }
        }]);
        return a
    } (ShapeLayer),
    nb = function(c) {
        function a(b) {
            G(this, a);
            return R(this, (a.__proto__ || N(a)).call(this, b))
        }
        S(a, c);
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
                if (void 0 !== this.autoUpdate) return Wa(a.prototype.__proto__ || N(a.prototype), "isRequestAnimation", this).call(this);
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
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b, c));
            b.gridLayer = new GridLayer(b.getGridOptions());
            b.children = [b.gridLayer];
            b.options.riseTime && (b.autoUpdate = true);
            return b
        }
        S(a, c);
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
                void 0 === c && (e = this.gridLayer.getGridDataRange(), c = e.max, e = e.min);
                var g = new Intensity({
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
    } (nb),
    SimpleLineLayer = function(c) {
        function a(b, c) {
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b, c));
            b.bufferData = [];
            return b
        }
        S(a, c);
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
                    k = function(a, c) {
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
                    for (var h = 0; h < c.length; h++) {
                        var l = c[h].color || a;
                        "properties" in c[h] && "color" in c[h].properties && (l = c[h].properties.color);
                        "[object Function]" === Object.prototype.toString.call(l) && (l = l(c[h]));
                        l = this.normizedColor(l);
                        var n = c[h].geometry,
                        p = n.coordinates;
                        if ("MultiPolygon" === n.type) {
                            if (p) for (n = 0; n < p.length; n++) k(p[n][0], l)
                        } else if ("Polygon" === n.type) p && k(p[0], l);
                        else if ("MultiLineString" === n.type) {
                            if (p) for (n = 0; n < p.length; n++) k(p[n], l)
                        } else k(p, l)
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
    oi = Cc.f("species"),
    pi = O(function(c) {
        c.exports = {
            "default": oi,
            __esModule: true
        }
    });
    Q(pi);
    var Df = "undefined" !== typeof global ? global: "undefined" !== typeof self ? self: "undefined" !== typeof window ? window: {},
    La = [],
    Aa = [],
    Dg = "undefined" !== typeof Uint8Array ? Uint8Array: Array,
    cd = false,
    qi = {}.toString,
    qe = Array.isArray ||
    function(c) {
        return "[object Array]" == qi.call(c)
    };
    w.TYPED_ARRAY_SUPPORT = void 0 !== Df.TYPED_ARRAY_SUPPORT ? Df.TYPED_ARRAY_SUPPORT: true;
    w.poolSize = 8192;
    w._augment = function(c) {
        c.__proto__ = w.prototype;
        return c
    };
    w.from = function(c, a, b) {
        return ne(null, c, a, b)
    };
    w.TYPED_ARRAY_SUPPORT && (w.prototype.__proto__ = Uint8Array.prototype, w.__proto__ = Uint8Array);
    w.alloc = function(c, a, b) {
        pe(c);
        c = 0 >= c ? Sa(null, c) : void 0 !== a ? "string" === typeof b ? Sa(null, c).fill(a, b) : Sa(null, c).fill(a) : Sa(null, c);
        return c
    };
    w.allocUnsafe = function(c) {
        return dd(null, c)
    };
    w.allocUnsafeSlow = function(c) {
        return dd(null, c)
    };
    w.isBuffer = function(c) {
        return null != c && ( !! c._isBuffer || Ae(c) || "function" === typeof c.readFloatLE && "function" === typeof c.slice && Ae(c.slice(0, 0)))
    };
    w.compare = function(c, a) {
        if (!Ma(c) || !Ma(a)) throw new TypeError("Arguments must be Buffers");
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
        if (!qe(c)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === c.length) return w.alloc(0);
        var b;
        if (void 0 === a) for (b = a = 0; b < c.length; ++b) a += c[b].length;
        a = w.allocUnsafe(a);
        var d = 0;
        for (b = 0; b < c.length; ++b) {
            var e = c[b];
            if (!Ma(e)) throw new TypeError('"list" argument must be an Array of Buffers');
            e.copy(a, d);
            d += e.length
        }
        return a
    };
    w.byteLength = oe;
    w.prototype._isBuffer = true;
    w.prototype.swap16 = function() {
        var c = this.length;
        if (0 !== c % 2) throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var a = 0; a < c; a += 2) hb(this, a, a + 1);
        return this
    };
    w.prototype.swap32 = function() {
        var c = this.length;
        if (0 !== c % 4) throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var a = 0; a < c; a += 4) hb(this, a, a + 3),
        hb(this, a + 1, a + 2);
        return this
    };
    w.prototype.swap64 = function() {
        var c = this.length;
        if (0 !== c % 8) throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var a = 0; a < c; a += 8) hb(this, a, a + 7),
        hb(this, a + 1, a + 6),
        hb(this, a + 2, a + 5),
        hb(this, a + 3, a + 4);
        return this
    };
    w.prototype.toString = function() {
        var c = this.length | 0;
        return 0 === c ? "": 0 === arguments.length ? se(this, 0, c) : Bg.apply(this, arguments)
    };
    w.prototype.equals = function(c) {
        if (!Ma(c)) throw new TypeError("Argument must be a Buffer");
        return this === c ? true : 0 === w.compare(this, c)
    };
    w.prototype.inspect = function() {
        var c = "";
        0 < this.length && (c = this.toString("hex", 0, 50).match(/.{2}/g).join(" "), 50 < this.length && (c += " ... "));
        return "<Buffer " + c + ">"
    };
    w.prototype.compare = function(c, a, b, d, e) {
        if (!Ma(c)) throw new TypeError("Argument must be a Buffer");
        void 0 === a && (a = 0);
        void 0 === b && (b = c ? c.length: 0);
        void 0 === d && (d = 0);
        void 0 === e && (e = this.length);
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
        k = b - a,
        h = Math.min(g, k);
        d = this.slice(d, e);
        c = c.slice(a, b);
        for (a = 0; a < h; ++a) if (d[a] !== c[a]) {
            g = d[a];
            k = c[a];
            break
        }
        return g < k ? -1 : k < g ? 1 : 0
    };
    w.prototype.includes = function(c, a, b) {
        return - 1 !== this.indexOf(c, a, b)
    };
    w.prototype.indexOf = function(c, a, b) {
        return te(this, c, a, b, true)
    };
    w.prototype.lastIndexOf = function(c, a, b) {
        return te(this, c, a, b, false)
    };
    w.prototype.write = function(c, a, b, d) {
        if (void 0 === a) d = "utf8",
        b = this.length,
        a = 0;
        else if (void 0 === b && "string" === typeof a) d = a,
        b = this.length,
        a = 0;
        else if (isFinite(a)) a |= 0,
        isFinite(b) ? (b |= 0, void 0 === d && (d = "utf8")) : (d = b, b = void 0);
        else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        var e = this.length - a;
        if (void 0 === b || b > e) b = e;
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
            return Qb(oc(c, this.length - a), this, a, b);
        case "ascii":
            return Qb(ze(c), this, a, b);
        case "latin1":
        case "binary":
            return Qb(ze(c), this, a, b);
        case "base64":
            return Qb(re(c), this, a, b);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            d = c;
            e = this.length - a;
            for (var g = [], k = 0; k < d.length && !(0 > (e -= 2)); ++k) {
                var h = d.charCodeAt(k);
                c = h >> 8;
                h %= 256;
                g.push(h);
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
    var ve = 4096;
    w.prototype.slice = function(c, a) {
        var b = this.length;
        c = ~~c;
        a = void 0 === a ? b: ~~a;
        0 > c ? (c += b, 0 > c && (c = 0)) : c > b && (c = b);
        0 > a ? (a += b, 0 > a && (a = 0)) : a > b && (a = b);
        a < c && (a = c);
        if (w.TYPED_ARRAY_SUPPORT) a = this.subarray(c, a),
        a.__proto__ = w.prototype;
        else {
            b = a - c;
            a = new w(b, void 0);
            for (var d = 0; d < b; ++d) a[d] = this[d + c]
        }
        return a
    };
    w.prototype.readUIntLE = function(c, a, b) {
        c |= 0;
        a |= 0;
        b || ja(c, a, this.length);
        b = this[c];
        for (var d = 1,
        e = 0; ++e < a && (d *= 256);) b += this[c + e] * d;
        return b
    };
    w.prototype.readUIntBE = function(c, a, b) {
        c |= 0;
        a |= 0;
        b || ja(c, a, this.length);
        b = this[c + --a];
        for (var d = 1; 0 < a && (d *= 256);) b += this[c + --a] * d;
        return b
    };
    w.prototype.readUInt8 = function(c, a) {
        a || ja(c, 1, this.length);
        return this[c]
    };
    w.prototype.readUInt16LE = function(c, a) {
        a || ja(c, 2, this.length);
        return this[c] | this[c + 1] << 8
    };
    w.prototype.readUInt16BE = function(c, a) {
        a || ja(c, 2, this.length);
        return this[c] << 8 | this[c + 1]
    };
    w.prototype.readUInt32LE = function(c, a) {
        a || ja(c, 4, this.length);
        return (this[c] | this[c + 1] << 8 | this[c + 2] << 16) + 16777216 * this[c + 3]
    };
    w.prototype.readUInt32BE = function(c, a) {
        a || ja(c, 4, this.length);
        return 16777216 * this[c] + (this[c + 1] << 16 | this[c + 2] << 8 | this[c + 3])
    };
    w.prototype.readIntLE = function(c, a, b) {
        c |= 0;
        a |= 0;
        b || ja(c, a, this.length);
        b = this[c];
        for (var d = 1,
        e = 0; ++e < a && (d *= 256);) b += this[c + e] * d;
        b >= 128 * d && (b -= Math.pow(2, 8 * a));
        return b
    };
    w.prototype.readIntBE = function(c, a, b) {
        c |= 0;
        a |= 0;
        b || ja(c, a, this.length);
        b = a;
        for (var d = 1,
        e = this[c + --b]; 0 < b && (d *= 256);) e += this[c + --b] * d;
        e >= 128 * d && (e -= Math.pow(2, 8 * a));
        return e
    };
    w.prototype.readInt8 = function(c, a) {
        a || ja(c, 1, this.length);
        return this[c] & 128 ? -1 * (255 - this[c] + 1) : this[c]
    };
    w.prototype.readInt16LE = function(c, a) {
        a || ja(c, 2, this.length);
        c = this[c] | this[c + 1] << 8;
        return c & 32768 ? c | 4294901760 : c
    };
    w.prototype.readInt16BE = function(c, a) {
        a || ja(c, 2, this.length);
        c = this[c + 1] | this[c] << 8;
        return c & 32768 ? c | 4294901760 : c
    };
    w.prototype.readInt32LE = function(c, a) {
        a || ja(c, 4, this.length);
        return this[c] | this[c + 1] << 8 | this[c + 2] << 16 | this[c + 3] << 24
    };
    w.prototype.readInt32BE = function(c, a) {
        a || ja(c, 4, this.length);
        return this[c] << 24 | this[c + 1] << 16 | this[c + 2] << 8 | this[c + 3]
    };
    w.prototype.readFloatLE = function(c, a) {
        a || ja(c, 4, this.length);
        return nc(this, c, true, 23, 4)
    };
    w.prototype.readFloatBE = function(c, a) {
        a || ja(c, 4, this.length);
        return nc(this, c, false, 23, 4)
    };
    w.prototype.readDoubleLE = function(c, a) {
        a || ja(c, 8, this.length);
        return nc(this, c, true, 52, 8)
    };
    w.prototype.readDoubleBE = function(c, a) {
        a || ja(c, 8, this.length);
        return nc(this, c, false, 52, 8)
    };
    w.prototype.writeUIntLE = function(c, a, b, d) {
        c = +c;
        a |= 0;
        b |= 0;
        d || sa(this, c, a, b, Math.pow(2, 8 * b) - 1, 0);
        d = 1;
        var e = 0;
        for (this[a] = c & 255; ++e < b && (d *= 256);) this[a + e] = c / d & 255;
        return a + b
    };
    w.prototype.writeUIntBE = function(c, a, b, d) {
        c = +c;
        a |= 0;
        b |= 0;
        d || sa(this, c, a, b, Math.pow(2, 8 * b) - 1, 0);
        d = b - 1;
        var e = 1;
        for (this[a + d] = c & 255; 0 <= --d && (e *= 256);) this[a + d] = c / e & 255;
        return a + b
    };
    w.prototype.writeUInt8 = function(c, a, b) {
        c = +c;
        a |= 0;
        b || sa(this, c, a, 1, 255, 0);
        w.TYPED_ARRAY_SUPPORT || (c = Math.floor(c));
        this[a] = c & 255;
        return a + 1
    };
    w.prototype.writeUInt16LE = function(c, a, b) {
        c = +c;
        a |= 0;
        b || sa(this, c, a, 2, 65535, 0);
        w.TYPED_ARRAY_SUPPORT ? (this[a] = c & 255, this[a + 1] = c >>> 8) : pc(this, c, a, true);
        return a + 2
    };
    w.prototype.writeUInt16BE = function(c, a, b) {
        c = +c;
        a |= 0;
        b || sa(this, c, a, 2, 65535, 0);
        w.TYPED_ARRAY_SUPPORT ? (this[a] = c >>> 8, this[a + 1] = c & 255) : pc(this, c, a, false);
        return a + 2
    };
    w.prototype.writeUInt32LE = function(c, a, b) {
        c = +c;
        a |= 0;
        b || sa(this, c, a, 4, 4294967295, 0);
        w.TYPED_ARRAY_SUPPORT ? (this[a + 3] = c >>> 24, this[a + 2] = c >>> 16, this[a + 1] = c >>> 8, this[a] = c & 255) : qc(this, c, a, true);
        return a + 4
    };
    w.prototype.writeUInt32BE = function(c, a, b) {
        c = +c;
        a |= 0;
        b || sa(this, c, a, 4, 4294967295, 0);
        w.TYPED_ARRAY_SUPPORT ? (this[a] = c >>> 24, this[a + 1] = c >>> 16, this[a + 2] = c >>> 8, this[a + 3] = c & 255) : qc(this, c, a, false);
        return a + 4
    };
    w.prototype.writeIntLE = function(c, a, b, d) {
        c = +c;
        a |= 0;
        d || (d = Math.pow(2, 8 * b - 1), sa(this, c, a, b, d - 1, -d));
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
        d || (d = Math.pow(2, 8 * b - 1), sa(this, c, a, b, d - 1, -d));
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
        b || sa(this, c, a, 1, 127, -128);
        w.TYPED_ARRAY_SUPPORT || (c = Math.floor(c));
        0 > c && (c = 255 + c + 1);
        this[a] = c & 255;
        return a + 1
    };
    w.prototype.writeInt16LE = function(c, a, b) {
        c = +c;
        a |= 0;
        b || sa(this, c, a, 2, 32767, -32768);
        w.TYPED_ARRAY_SUPPORT ? (this[a] = c & 255, this[a + 1] = c >>> 8) : pc(this, c, a, true);
        return a + 2
    };
    w.prototype.writeInt16BE = function(c, a, b) {
        c = +c;
        a |= 0;
        b || sa(this, c, a, 2, 32767, -32768);
        w.TYPED_ARRAY_SUPPORT ? (this[a] = c >>> 8, this[a + 1] = c & 255) : pc(this, c, a, false);
        return a + 2
    };
    w.prototype.writeInt32LE = function(c, a, b) {
        c = +c;
        a |= 0;
        b || sa(this, c, a, 4, 2147483647, -2147483648);
        w.TYPED_ARRAY_SUPPORT ? (this[a] = c & 255, this[a + 1] = c >>> 8, this[a + 2] = c >>> 16, this[a + 3] = c >>> 24) : qc(this, c, a, true);
        return a + 4
    };
    w.prototype.writeInt32BE = function(c, a, b) {
        c = +c;
        a |= 0;
        b || sa(this, c, a, 4, 2147483647, -2147483648);
        0 > c && (c = 4294967295 + c + 1);
        w.TYPED_ARRAY_SUPPORT ? (this[a] = c >>> 24, this[a + 1] = c >>> 16, this[a + 2] = c >>> 8, this[a + 3] = c & 255) : qc(this, c, a, false);
        return a + 4
    };
    w.prototype.writeFloatLE = function(c, a, b) {
        return xe(this, c, a, true, b)
    };
    w.prototype.writeFloatBE = function(c, a, b) {
        return xe(this, c, a, false, b)
    };
    w.prototype.writeDoubleLE = function(c, a, b) {
        return ye(this, c, a, true, b)
    };
    w.prototype.writeDoubleBE = function(c, a, b) {
        return ye(this, c, a, false, b)
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
            if (void 0 !== d && "string" !== typeof d) throw new TypeError("encoding must be a string");
            if ("string" === typeof d && !w.isEncoding(d)) throw new TypeError("Unknown encoding: " + d);
        } else "number" === typeof c && (c &= 255);
        if (0 > a || this.length < a || this.length < b) throw new RangeError("Out of range index");
        if (b <= a) return this;
        a >>>= 0;
        b = void 0 === b ? this.length: b >>> 0;
        c || (c = 0);
        if ("number" === typeof c) for (d = a; d < b; ++d) this[d] = c;
        else for (c = Ma(c) ? c: oc((new w(c, d)).toString()), e = c.length, d = 0; d < b - a; ++d) this[d + a] = c[d % e];
        return this
    };
    var Cg = /[^+\/0-9A-Za-z-_]/g,
    Jd = {
        normal: null,
        road: function() {
            var c = document.createElement("canvas");
            c.width = c.height = 32;
            var a = c.getContext("2d");
            a.save();
            a.moveTo(0, 0);
            a.lineTo(20, 0);
            a.lineTo(32, 16);
            a.lineTo(20, 32);
            a.lineTo(0, 32);
            a.lineTo(10, 16);
            a.fillStyle = "#fff";
            a.fill();
            a.restore();
            return c
        } ()
    },
    LineLayer = function(c) {
        function a(b, c) {
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b, c));
            b.initData();
            return b
        }
        S(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    color: "rgba(25, 25, 250, 1)",
                    blend: "normal",
                    width: 4,
                    isFlat: true,
                    antialias: false,
                    lineJoin: "miter",
                    lineCap: "butt",
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
                Jd[b.style] && (this.isUseTexture = true, c.push("USE_TEXTURE"));
                this.program = new Program(this.gl, {
                    vertexShader: "precision highp float;uniform vec4 uSelectedColor;uniform mat4 uMatrix;uniform bool uFlat;uniform vec2 uDashArray;uniform float thickness;uniform float zoomUnits;uniform float devicePixelRatio;uniform int miter;attribute vec3 position;attribute vec3 next;attribute vec3 previous;attribute float direction;attribute vec4 aColor;attribute float aDistance;attribute float aTotalDistance;\n#if defined(USE_TEXTURE)\nattribute vec2 uv;\n#endif\nvarying vec4 vColor;varying vec2 vNormal;varying vec2 vUV;varying vec2 vDashArray;varying float vTotalDistance;varying float vCounter;vec2 project(vec4 coord){vec3 screen=coord.xyz/coord.w;vec2 clip=(screen.xy+1.0)/2.0;return clip*MAPV_resolution;}vec4 unproject(vec2 projected,float z,float w){vec2 clip=projected/MAPV_resolution;vec2 screen=clip*2.0-1.0;return vec4(screen*w,z,w);}vec3 getNormalAndWidth(vec2 currentScreen,vec2 previousScreen,vec2 nextScreen,float thickness){vec2 dir=vec2(0.0);if(currentScreen==previousScreen){dir=normalize(nextScreen-currentScreen);}else if(currentScreen==nextScreen){dir=normalize(currentScreen-previousScreen);}else{vec2 dirA=normalize((currentScreen-previousScreen));if(miter==1){vec2 dirB=normalize((nextScreen-currentScreen));vec2 tangent=normalize(dirA+dirB);vec2 perp=vec2(-dirA.y,dirA.x);vec2 miter=vec2(-tangent.y,tangent.x);dir=tangent;float angle=40.0;if(dot(dirA,dirB)>cos(radians(angle))){thickness=thickness/dot(miter,perp);}}else{dir=dirA;}}vec2 normal=vec2(-dir.y,dir.x);return vec3(normal,thickness);}void main(){vColor=aColor;vCounter=aDistance/aTotalDistance;vDashArray=zoomUnits*uDashArray/aTotalDistance;vTotalDistance=aTotalDistance;\n#if defined(USE_TEXTURE)\nvUV=uv;\n#endif\n#if defined(PICK)\nif(mapvIsPicked()){vColor=uSelectedColor;}\n#endif\nif(uFlat){float width=thickness*zoomUnits;vec3 nw=getNormalAndWidth(position.xy,previous.xy,next.xy,width);width=nw.z;vec2 normal=nw.xy;vNormal=normal*direction;normal*=width/2.0;gl_Position=uMatrix*vec4(position.xy+normal*direction,position.z,1.0);}else{vec4 previousProjected=uMatrix*vec4(previous,1.0);vec4 currentProjected=uMatrix*vec4(position,1.0);vec4 nextProjected=uMatrix*vec4(next,1.0);vec2 currentScreen=project(currentProjected);vec2 previousScreen=project(previousProjected);vec2 nextScreen=project(nextProjected);float width=thickness*devicePixelRatio;vec3 nw=getNormalAndWidth(currentScreen,previousScreen,nextScreen,width);width=nw.z;vec2 normal=nw.xy;vNormal=normal*direction;normal*=width/2.0;vec2 pos=currentScreen+normal*direction;vec4 finalPos=unproject(pos,currentProjected.z,currentProjected.w);gl_Position=finalPos;}}",
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
                Jd[b.style] && (c.push({
                    stride: 8,
                    name: "uv",
                    buffer: this.uvBuffer,
                    size: 2,
                    type: "FLOAT",
                    offset: 0
                }), this.setOptions({
                    texture: Jd[b.style]
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
                    k = [], h = 0; h < c.length; h++) {
                        var l = [],
                        n = c[h].geometry.coordinates;
                        n && 0 < n.length && (l = "Polygon" === c[h].geometry.type ? n[0].map(function(a) {
                            return b.normizedPoint(a)
                        }) : n.map(function(a) {
                            return b.normizedPoint(a)
                        }));
                        n = c[h].color || d;
                        "properties" in c[h] && "color" in c[h].properties && (n = c[h].properties.color);
                        "[object Function]" === Object.prototype.toString.call(n) && (n = n(c[h]));
                        n = this.normizedColor(n);
                        for (var p = this.addMultipleCoords(l), m = 0; m < p.length; m++) this.processData(this.dataMgr, p[m], n);
                        if (a.enablePicked) for (n = this.indexToRgb(h), p = 0; p < l.length; p++) k.push(n[0] / 255, n[1] / 255, n[2] / 255),
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
                    this.isUseTexture && this.uvBuffer.updateData(new Float32Array(this.dataMgr.uv));
                    a.enablePicked && this.pickBuffer.updateData(new Float32Array(k))
                }
            }
        },
        {
            key: "processData",
            value: function(a, c, e) {
                var b, d, h, l, n, p, m, q, r = c.length,
                u = a.position.length / 6,
                y = Ce(c),
                t = y.arr,
                z = y.total;
                y = Ba(t.map(function(a) {
                    return [a, z]
                }));
                t = t.map(function(a) {
                    return [a, 0, a, 1]
                });
                var v = Ba(c.map(function(a) {
                    return - 1
                }), true),
                B = Ba(c),
                A = Ba(c.map(rc( - 1))),
                D = Ba(c.map(rc(1)));
                c = Ba(c.map(function(a) {
                    return e
                }));
                r = Be(r, u); (b = a.uv).push.apply(b, W(Na(t))); (d = a.counter).push.apply(d, W(Na(y))); (h = a.position).push.apply(h, W(Na(B))); (l = a.prev).push.apply(l, W(Na(A))); (n = a.next).push.apply(n, W(Na(D))); (p = a.direction).push.apply(p, W(v)); (m = a.color).push.apply(m, W(Na(c))); (q = a.index).push.apply(q, W(r))
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl,
                c = a.matrix,
                g = this.dataMgr;
                if (g && !(0 >= g.index.length) && this.map) {
                    var k = this.getOptions(),
                    h = this.program;
                    h.use(b);
                    a = T(this.getCommonUniforms(a), {
                        uMatrix: c,
                        uFlat: k.isFlat,
                        zoomUnits: this.map.getZoomUnits(),
                        devicePixelRatio: window.devicePixelRatio,
                        miter: 1,
                        thickness: k.width,
                        uDashArray: k.dashArray,
                        uDashOffset: k.dashOffset,
                        uAntialias: k.antialias
                    });
                    this.isUseTexture && (a = T(a, {
                        uTextureMargin: 140,
                        textureImage: this.texture
                    }));
                    h.setUniforms(a);
                    b.enable(b.BLEND);
                    b.blendEquation(b.FUNC_ADD);
                    k.blend && "lighter" === k.blend ? b.blendFunc(b.SRC_ALPHA, b.ONE) : b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
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
                c.texture ? loadTextureImage(this.gl, c.texture,
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
    Kd = {
        normal: null,
        road: function() {
            var c = document.createElement("canvas");
            c.width = c.height = 32;
            var a = c.getContext("2d");
            a.save();
            a.moveTo(0, 0);
            a.lineTo(20, 0);
            a.lineTo(32, 16);
            a.lineTo(20, 32);
            a.lineTo(0, 32);
            a.lineTo(10, 16);
            a.fillStyle = "#fff";
            a.fill();
            a.restore();
            return c
        } ()
    },
    ELineLayer = function(c) {
        function a(b, c) {
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b, c));
            b.initData();
            return b
        }
        S(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    color: "rgba(25, 25, 250, 1)",
                    blend: "normal",
                    width: 10,
                    isFlat: true,
                    antialias: false,
                    lineJoin: "miter",
                    lineCap: "butt",
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
                Kd[b.style] && (this.isUseTexture = true, c.push("USE_TEXTURE"));
                this.program = new Program(this.gl, {
                    vertexShader: "precision highp float;uniform vec4 uSelectedColor;uniform mat4 uMatrix;uniform bool uFlat;uniform vec2 uDashArray;uniform float thickness;uniform float zoomUnits;uniform float devicePixelRatio;uniform int miter;attribute vec3 position;attribute vec3 next;attribute vec3 previous;attribute float direction;attribute vec4 aColor;attribute float aDistance;attribute float aTotalDistance;\n#if defined(USE_TEXTURE)\nattribute vec2 uv;\n#endif\nvarying vec4 vColor;varying vec2 vNormal;varying vec2 vUV;varying vec2 vDashArray;varying float vTotalDistance;varying float vCounter;vec2 project(vec4 coord){vec3 screen=coord.xyz/coord.w;vec2 clip=(screen.xy+1.0)/2.0;return clip*MAPV_resolution;}vec4 unproject(vec2 projected,float z,float w){vec2 clip=projected/MAPV_resolution;vec2 screen=clip*2.0-1.0;return vec4(screen*w,z,w);}vec3 getNormalAndWidth(vec2 currentScreen,vec2 previousScreen,vec2 nextScreen,float thickness){vec2 dir=vec2(0.0);if(currentScreen==previousScreen){dir=normalize(nextScreen-currentScreen);}else if(currentScreen==nextScreen){dir=normalize(currentScreen-previousScreen);}else{vec2 dirA=normalize((currentScreen-previousScreen));if(miter==1){vec2 dirB=normalize((nextScreen-currentScreen));vec2 tangent=normalize(dirA+dirB);vec2 perp=vec2(-dirA.y,dirA.x);vec2 miter=vec2(-tangent.y,tangent.x);dir=tangent;float angle=40.0;if(dot(dirA,dirB)>cos(radians(angle))){thickness=thickness/dot(miter,perp);}}else{dir=dirA;}}vec2 normal=vec2(-dir.y,dir.x);return vec3(normal,thickness);}void main(){vColor=aColor;vCounter=aDistance/aTotalDistance;vDashArray=zoomUnits*uDashArray/aTotalDistance;vTotalDistance=aTotalDistance;\n#if defined(USE_TEXTURE)\nvUV=uv;\n#endif\n#if defined(PICK)\nif(mapvIsPicked()){vColor=uSelectedColor;}\n#endif\nif(uFlat){float width=thickness*zoomUnits;vec3 nw=getNormalAndWidth(position.xy,previous.xy,next.xy,width);width=nw.z;vec2 normal=nw.xy;vNormal=normal*direction;normal*=width/2.0;gl_Position=uMatrix*vec4(position.xy+normal*direction,position.z,1.0);}else{vec4 previousProjected=uMatrix*vec4(previous,1.0);vec4 currentProjected=uMatrix*vec4(position,1.0);vec4 nextProjected=uMatrix*vec4(next,1.0);vec2 currentScreen=project(currentProjected);vec2 previousScreen=project(previousProjected);vec2 nextScreen=project(nextProjected);float width=thickness*devicePixelRatio;vec3 nw=getNormalAndWidth(currentScreen,previousScreen,nextScreen,width);width=nw.z;vec2 normal=nw.xy;vNormal=normal*direction;normal*=width/2.0;vec2 pos=currentScreen+normal*direction;vec4 finalPos=unproject(pos,currentProjected.z,currentProjected.w);gl_Position=finalPos;}}",
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
                Kd[b.style] && (c.push({
                    stride: 8,
                    name: "uv",
                    buffer: this.uvBuffer,
                    size: 2,
                    type: "FLOAT",
                    offset: 0
                }), this.setOptions({
                    texture: Kd[b.style]
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
                    k = [], h = 0; h < c.length; h++) {
                        var l = [],
                        n = c[h].geometry.coordinates;
                        n && 0 < n.length && (l = "Polygon" === c[h].geometry.type ? n[0].map(function(a) {
                            return b.normizedPoint(a)
                        }) : n.map(function(a) {
                            return b.normizedPoint(a)
                        }));
                        n = c[h].color || d;
                        "properties" in c[h] && "color" in c[h].properties && (n = c[h].properties.color);
                        "[object Function]" === Object.prototype.toString.call(n) && (n = n(c[h]));
                        n = this.normizedColor(n);
                        for (var p = this.addMultipleCoords(l), m = 0; m < p.length; m++) this.processData(this.dataMgr, p[m], n);
                        if (a.enablePicked) for (n = this.indexToRgb(h), p = 0; p < l.length; p++) k.push(n[0] / 255, n[1] / 255, n[2] / 255),
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
                    this.isUseTexture && this.uvBuffer.updateData(new Float32Array(this.dataMgr.uv));
                    a.enablePicked && this.pickBuffer.updateData(new Float32Array(k))
                }
            }
        },
        {
            key: "processData",
            value: function(a, c, e) {
                var b, d, h, l, n, p, m, q, r = c.length,
                u = a.position.length / 6,
                y = Fg(c),
                t = y.arr,
                z = y.total;
                y = tb(t.map(function(a) {
                    return [a, z]
                }));
                t = t.map(function(a) {
                    return [a, 0, a, 1]
                });
                var v = tb(c.map(function(a) {
                    return - 1
                }), true),
                B = tb(c),
                A = tb(c.map(De( - 1))),
                D = tb(c.map(De(1)));
                c = tb(c.map(function(a) {
                    return e
                }));
                r = Eg(r, u); (b = a.uv).push.apply(b, W(ub(t))); (d = a.counter).push.apply(d, W(ub(y))); (h = a.position).push.apply(h, W(ub(B))); (l = a.prev).push.apply(l, W(ub(A))); (n = a.next).push.apply(n, W(ub(D))); (p = a.direction).push.apply(p, W(v)); (m = a.color).push.apply(m, W(ub(c))); (q = a.index).push.apply(q, W(r))
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl,
                c = a.matrix,
                g = this.dataMgr;
                if (g && !(0 >= g.index.length) && this.map) {
                    var k = this.getOptions(),
                    h = this.program;
                    h.use(b);
                    a = T(this.getCommonUniforms(a), {
                        uMatrix: c,
                        uFlat: k.isFlat,
                        zoomUnits: this.map.getZoomUnits(),
                        devicePixelRatio: window.devicePixelRatio,
                        miter: 1,
                        thickness: k.width,
                        uDashArray: k.dashArray,
                        uDashOffset: k.dashOffset,
                        uAntialias: k.antialias
                    });
                    this.isUseTexture && (a = T(a, {
                        uTextureMargin: 140,
                        textureImage: this.texture
                    }));
                    h.setUniforms(a);
                    b.enable(b.BLEND);
                    b.blendEquation(b.FUNC_ADD);
                    k.blend && "lighter" === k.blend ? b.blendFunc(b.SRC_ALPHA, b.ONE) : b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
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
                c.texture ? loadTextureImage(this.gl, c.texture,
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
    si = function() {
        function c(a, b) {
            G(this, c);
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
                for (var k = 0; k < b.length; k++) {
                    var h = b[k].geometry.coordinates,
                    l = h.length;
                    this.maxLength = l > this.maxLength ? l: this.maxLength;
                    for (var n = [], p = 0; p < l; p++) {
                        var m = this.layer.normizedPoint(h[p]);
                        n.push(m)
                    }
                    l = b[k].color || c;
                    "properties" in b[k] && "color" in b[k].properties && (l = b[k].properties.color);
                    g || "[object Function]" !== Object.prototype.toString.call(l) || (l = l(b[k]));
                    h = this.layer.normizedColor(g ? g[0] : l);
                    l = this.layer.normizedColor(g ? g[1] : l);
                    p = b[k].height || e;
                    "properties" in b[k] && "height" in b[k].properties && (p = b[k].properties.height);
                    "[object Function]" === Object.prototype.toString.call(p) && (p = p(b[k]));
                    this.processData(this.outWall3d, n, h, l, p)
                }
                for (b = 0; b < this.outWall3d.vertex.length; b++) {
                    c = [];
                    e = this.outWall3d.vertex[b].length;
                    for (g = 0; g < e; g++) c.push.apply(c, W(this.outWall3d.vertex[b][g]));
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
                h = a.index[a.index.length - 1],
                l = b.length;
                if (!h || 65536 <= h.length + 2 * l + 2) d = [],
                h = [],
                a.vertex.push(d),
                a.index.push(h); (a = d.length) && h.push(a - 1, a);
                for (var n = a = 0; n < l; n++) {
                    var p = [],
                    m = [],
                    q = b[n];
                    p.push(q[0], q[1]);
                    p.push(q[2] ? Number(q[2]) + g: g);
                    p.push(q[3] ? Number(q[3]) : n);
                    p.push(a);
                    p.push(c[0], c[1], c[2], c[3]);
                    m.push(q[0], q[1]);
                    m.push(q[2] ? Number(q[2]) : 0);
                    m.push(q[3] ? Number(q[3]) : n);
                    m.push(a);
                    m.push(e[0], e[1], e[2], e[3]);
                    q = d.length;
                    d.push(p, m);
                    h.push(q, q + 1);
                    n < l - 1 && (a += this.getDistance(b[n], b[n + 1]))
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
    WallSpriteLayer = function(c) {
        function a(b, c) {
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b, c));
            b.startTime = b.options.startTime || 0;
            b.endTime = b.options.endTime;
            b.time = b.startTime;
            b.autoUpdate = true;
            return b
        }
        S(a, c);
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
                this.dataMgr = new si(this, this.gl);
                this.program = new Program(this.gl, {
                    vertexShader: "uniform mat4 u_matrix;uniform float currentTime;uniform float trailLength;attribute vec4 aPos;attribute float aDistance;attribute vec4 aColor;varying vec4 vColor;varying float vHeight;varying float vTime;varying float vDistance;void main(){vTime=1.0-((currentTime-aPos.w)/trailLength);vHeight=aPos.z;vColor=aColor;vDistance=aDistance;gl_Position=u_matrix*vec4(aPos.xyz,1.0);}",
                    fragmentShader: "precision highp float;varying vec4 vColor;varying float vTime;varying float vDistance;varying float vHeight;uniform float currentTime;void main(){if(vTime>1.0||vTime<0.0){}float radius=2.5;float distance=vDistance+currentTime*20.0;float modDistance=mod(distance,9.0);float alpha=1.0;if(modDistance>radius*2.0){discard;}else{float x=abs(modDistance-radius);float y=abs(vHeight-radius);float dis=sqrt(pow(x,2.0)+pow(y,2.0));if(dis>radius){discard;}alpha=dis/radius;}gl_FragColor=vec4(vColor.rgb,1.0-alpha);}"
                })
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                this.gl && (this.dataMgr.onLayerChange(a, c), void 0 === a.endTime && (this.endTime = this.dataMgr.getMaxDataLength()))
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl,
                c = a.matrix;
                if ((a = this.dataMgr.getData()) && !(0 >= a.vertex.length)) {
                    var g = this.getOptions(),
                    k = this.program;
                    b.useProgram(k.program);
                    b.enable(b.BLEND);
                    b.blendEquation(b.FUNC_ADD);
                    b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
                    b.enableVertexAttribArray(k.attributes.aPos);
                    b.enableVertexAttribArray(k.attributes.aDistance);
                    b.enableVertexAttribArray(k.attributes.aColor);
                    b.uniformMatrix4fv(k.uniforms.u_matrix, false, c);
                    b.uniform1f(k.uniforms.currentTime, this.time);
                    b.uniform1f(k.uniforms.trailLength, g.trailLength);
                    for (c = 0; c < a.vertex.length; c++) if (! (0 >= a.vertex[c].length)) {
                        var h = a.vertex[c],
                        l = (new Float32Array(h[0])).BYTES_PER_ELEMENT;
                        h = l * h[0].length;
                        b.bindBuffer(b.ARRAY_BUFFER, a.vertexBuffer[c]);
                        b.vertexAttribPointer(k.attributes.aPos, 4, b.FLOAT, false, h, 0);
                        b.vertexAttribPointer(k.attributes.aDistance, 1, b.FLOAT, false, h, 4 * l);
                        b.vertexAttribPointer(k.attributes.aColor, 4, b.FLOAT, false, h, 5 * l);
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
    ti = O(function(c, a) {
        a.__esModule = true;
        var b = Ua && Ua.__esModule ? Ua: {
        default:
            Ua
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
    Cb = Q(ti),
    cc,
    dc,
    ui = (cc = {},
    Cb(cc, 1, 1), Cb(cc, 2, 1), Cb(cc, 3, 1), cc),
    vi = (dc = {},
    Cb(dc, 1, 1), Cb(dc, 2, 1), Cb(dc, 3, 1), dc),
    LinePointLayer = function(c) {
        function a(b, c) {
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b, c));
            b.bufferMap = {};
            b.bufferData = [];
            b.autoUpdate = true;
            return b
        }
        S(a, c);
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
                    k = [],
                    h = [],
                    l = [],
                    n = [];
                    a = a.minLineLength;
                    for (var p = 0; p < c.length; p++) {
                        var m = c[p].geometry.coordinates,
                        q = m.length;
                        if (! (q < a)) {
                            for (var r = 0; r < q; ++r) {
                                var u = this.normizedPoint(m[r]);
                                d.push(u[0]);
                                d.push(u[1]);
                                d.push(u[2] || 0);
                                3 !== this.animationType && (k.push(r), l.push(q))
                            }
                            if (1 !== this.animationType) {
                                u = d.length - 3 * q + 3;
                                r = d.length;
                                for (m = u; m < r; ++m) n.push(d[m]);
                                d.splice(r - 3, 3);
                                if (2 === this.animationType) k.pop(),
                                l.pop();
                                else if (3 === this.animationType) {
                                    u -= 3;
                                    r = d.length - 3;
                                    m = 0;
                                    q = [];
                                    for (var y = u; y <= r; y += 3) u = Math.sqrt(Math.pow(n[y] - d[y], 2) + Math.pow(n[y + 1] - d[y + 1], 2) + Math.pow(n[y + 2] - d[y + 2], 2)),
                                    m += u,
                                    q.push(u);
                                    k.push(0);
                                    y = r = 0;
                                    for (var t = q.length - 1; y < t; ++y) r += q[y],
                                    u = r / m,
                                    k.push(u),
                                    h.push(u),
                                    l.push(m);
                                    h.push(1);
                                    l.push(m)
                                }
                            }
                        }
                    }
                    this.bindAttributeBufferData(b, "aPos", d, 3);
                    this.bindAttributeBufferData(b, "aIndex", k, 1);
                    this.bindAttributeBufferData(b, "aLength", l, 1);
                    1 !== this.animationType && (this.bindAttributeBufferData(b, "aNextPos", n, 3), 3 === this.animationType && this.bindAttributeBufferData(b, "aNextIndex", h, 1));
                    this.vertCount = d.length / 3
                }
            }
        },
        {
            key: "updateUniformsFromOptions",
            value: function(a) {
                this.color = this.normizedColor(a.color);
                this.startTime = (new Date).getTime();
                ui[a.animationType] || (a.animationType = 2);
                vi[a.shapeType] || (a.shapeType = 2);
                if (isNaN(a.minLineLength) || 2 > a.minLineLength) a.minLineLength = 2;
                this.animationType = a.animationType
            }
        },
        {
            key: "renderAttributeArr",
            value: function(a, c, e) {
                if (void 0 !== c.attributes[e]) {
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
    LinePointLayer.ANIMATION_TYPE_LEAP = 1;
    LinePointLayer.ANIMATION_TYPE_SMOOTH = 2;
    LinePointLayer.ANIMATION_TYPE_UNIFORM_SPEED = 3;
    LinePointLayer.SHAPE_TYPE_SQUARE = 1;
    LinePointLayer.SHAPE_TYPE_CIRCLE = 2;
    LinePointLayer.SHAPE_TYPE_CIRCLE_GRADIENT = 3;
    var wi = function() {
        function c(a, b) {
            G(this, c);
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
                k = a.enablePreciseMap,
                h = this.gl,
                l = 0; l < b.length; l++) {
                    for (var n = b[l].geometry.coordinates, p = n.length, m = [], q = [], r = 0, u = 0; u < p; u++) {
                        var y = this.layer.normizedPoint(n[u]);
                        if (0 < u && k) {
                            var t = this.layer.normizedPoint(n[u - 1]);
                            r += Math.sqrt(Math.pow(y[0] - t[0], 2) + Math.pow(y[1] - t[1], 2))
                        }
                        m.push(y);
                        q.push(r)
                    }
                    p = b[l].color || c;
                    "properties" in b[l] && "color" in b[l].properties && (p = b[l].properties.color);
                    g || "[object Function]" !== Object.prototype.toString.call(p) || (p = p(b[l]));
                    n = this.layer.normizedColor(g ? g[0] : p);
                    p = this.layer.normizedColor(g ? g[1] : p);
                    r = b[l].height || e;
                    "properties" in b[l] && "height" in b[l].properties && (r = b[l].properties.height);
                    "[object Function]" === Object.prototype.toString.call(r) && (r = r(b[l]));
                    this.processData(this.outWall3d, a, m, q, n, p, r)
                }
                for (a = 0; a < this.outWall3d.vertex.length; a++) {
                    b = [];
                    c = this.outWall3d.vertex[a].length;
                    for (e = 0; e < c; e++) b.push.apply(b, W(this.outWall3d.vertex[a][e]));
                    c = h.createBuffer();
                    h.bindBuffer(h.ARRAY_BUFFER, c);
                    h.bufferData(h.ARRAY_BUFFER, new Float32Array(b), h.STATIC_DRAW);
                    this.outWall3d.vertexBuffer[a] = c;
                    h.bindBuffer(h.ARRAY_BUFFER, null);
                    c = h.createBuffer();
                    h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, c);
                    h.bufferData(h.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.outWall3d.index[a]), h.STATIC_DRAW);
                    this.outWall3d.indexBuffer[a] = c;
                    h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, null)
                }
            }
        },
        {
            key: "processData",
            value: function(a, b, c, e, g, k, h) {
                var d = e[e.length - 1],
                n = a.vertex[a.vertex.length - 1],
                p = a.index[a.index.length - 1],
                m = c.length;
                if (!p || 65536 <= p.length + 2 * m + 2) n = [],
                p = [],
                a.vertex.push(n),
                a.index.push(p); (a = n.length) && p.push(a - 1, a);
                for (a = 0; a < m; a++) {
                    var q = [],
                    r = [],
                    u = c[a];
                    q.push(u[0], u[1], h);
                    q.push(g[0], g[1], g[2], g[3]);
                    r.push(u[0], u[1], 0);
                    r.push(k[0], k[1], k[2], k[3]);
                    b.texture && (u = e[a], b.enablePreciseMap ? (q.push(u / d, 1), r.push(u / d, 0)) : (q.push(a / (m - 1), 1), r.push(a / (m - 1), 0)));
                    u = n.length;
                    n.push(q, r);
                    p.push(u, u + 1)
                }
            }
        }]);
        return c
    } (),
    WallLayer = function(c) {
        function a(b, c) {
            G(this, a);
            return R(this, (a.__proto__ || N(a)).call(this, b, c))
        }
        S(a, c);
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
                this.dataMgr = new wi(this, this.gl);
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
                    k = this.program;
                    b.useProgram(k.program);
                    b.enable(b.BLEND);
                    b.blendEquation(b.FUNC_ADD);
                    b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
                    if (g.texture) {
                        if (!this.texture) return;
                        b.activeTexture(b.TEXTURE0);
                        b.bindTexture(b.TEXTURE_2D, this.texture);
                        b.uniform1i(k.uniforms.uSampler, 0);
                        b.depthMask(true);
                        b.depthFunc(b.LESS)
                    } else b.depthMask(false);
                    g.texture ? b.enableVertexAttribArray(k.attributes.aTextureCoords) : b.disableVertexAttribArray(k.attributes.aTextureCoords);
                    b.enableVertexAttribArray(k.attributes.aPos);
                    b.enableVertexAttribArray(k.attributes.aColor);
                    b.uniformMatrix4fv(k.uniforms.u_matrix, false, c);
                    b.uniform1i(k.uniforms.uUseTexture, this.isUseTexture);
                    for (c = 0; c < a.vertex.length; c++) if (! (0 >= a.vertex[c].length)) {
                        var h = a.vertex[c],
                        l = (new Float32Array(h[0])).BYTES_PER_ELEMENT;
                        h = l * h[0].length;
                        b.bindBuffer(b.ARRAY_BUFFER, a.vertexBuffer[c]);
                        b.vertexAttribPointer(k.attributes.aPos, 3, b.FLOAT, false, h, 0);
                        b.vertexAttribPointer(k.attributes.aColor, 4, b.FLOAT, false, h, 3 * l);
                        g.texture && b.vertexAttribPointer(k.attributes.aTextureCoords, 2, b.FLOAT, false, h, 7 * l);
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
                c.texture ? (this.isUseTexture = true, loadTextureImage(this.gl, c.texture,
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
    yi = function() {
        function c(a, b) {
            G(this, c);
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
                for (var k = 0; k < b.length; k++) {
                    var h = b[k].geometry.coordinates,
                    l = h.length;
                    this.maxLength = l > this.maxLength ? l: this.maxLength;
                    for (var n = [], p = 0; p < l; p++) {
                        var m = this.layer.normizedPoint(h[p]);
                        n.push(m)
                    }
                    l = b[k].color || c;
                    "properties" in b[k] && "color" in b[k].properties && (l = b[k].properties.color);
                    g || "[object Function]" !== Object.prototype.toString.call(l) || (l = l(b[k]));
                    h = this.layer.normizedColor(g ? g[0] : l);
                    l = this.layer.normizedColor(g ? g[1] : l);
                    p = b[k].height || e;
                    "properties" in b[k] && "height" in b[k].properties && (p = b[k].properties.height);
                    "[object Function]" === Object.prototype.toString.call(p) && (p = p(b[k]));
                    this.processData(this.outWall3d, n, h, l, p)
                }
                for (b = 0; b < this.outWall3d.vertex.length; b++) {
                    c = [];
                    e = this.outWall3d.vertex[b].length;
                    for (g = 0; g < e; g++) c.push.apply(c, W(this.outWall3d.vertex[b][g]));
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
                h = a.index[a.index.length - 1],
                l = b.length;
                if (!h || 65536 <= h.length + 2 * l + 2) d = [],
                h = [],
                a.vertex.push(d),
                a.index.push(h); (a = d.length) && h.push(a - 1, a);
                for (a = 0; a < l; a++) {
                    var n = [],
                    p = [],
                    m = b[a];
                    n.push(m[0], m[1]);
                    n.push(m[2] ? Number(m[2]) + g: g);
                    n.push(m[3] ? Number(m[3]) : a);
                    n.push(c[0], c[1], c[2], c[3]);
                    p.push(m[0], m[1]);
                    p.push(m[2] ? Number(m[2]) : 0);
                    p.push(m[3] ? Number(m[3]) : a);
                    p.push(e[0], e[1], e[2], e[3]);
                    m = d.length;
                    d.push(n, p);
                    h.push(m, m + 1)
                }
            }
        }]);
        return c
    } (),
    WallTripLayer = function(c) {
        function a(b, c) {
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b, c));
            b.startTime = b.options.startTime || 0;
            b.endTime = b.options.endTime;
            b.time = b.startTime;
            b.autoUpdate = true;
            return b
        }
        S(a, c);
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
                this.dataMgr = new yi(this, this.gl);
                this.program = new Program(this.gl, {
                    vertexShader: "uniform mat4 u_matrix;uniform float currentTime;uniform float trailLength;attribute vec4 aPos;attribute vec4 aColor;varying vec4 vColor;varying float vTime;void main(){vTime=1.0-((currentTime-aPos.w)/trailLength);vColor=aColor;gl_Position=u_matrix*vec4(aPos.xyz,1.0);}",
                    fragmentShader: "precision highp float;varying vec4 vColor;varying float vTime;void main(){if(vTime>1.0||vTime<0.0){discard;}gl_FragColor=vec4(vColor.rgb,1.0*vTime);}"
                })
            }
        },
        {
            key: "onChanged",
            value: function(a, c) {
                this.gl && (this.dataMgr.onLayerChange(a, c), void 0 === a.endTime && (this.endTime = this.dataMgr.getMaxDataLength()))
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl,
                c = a.matrix;
                if ((a = this.dataMgr.getData()) && !(0 >= a.vertex.length)) {
                    var g = this.getOptions(),
                    k = this.program;
                    b.useProgram(k.program);
                    b.enable(b.BLEND);
                    b.blendEquation(b.FUNC_ADD);
                    b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
                    b.enableVertexAttribArray(k.attributes.aPos);
                    b.enableVertexAttribArray(k.attributes.aColor);
                    b.uniformMatrix4fv(k.uniforms.u_matrix, false, c);
                    b.uniform1f(k.uniforms.currentTime, this.time);
                    b.uniform1f(k.uniforms.trailLength, g.trailLength);
                    for (c = 0; c < a.vertex.length; c++) if (! (0 >= a.vertex[c].length)) {
                        var h = a.vertex[c],
                        l = (new Float32Array(h[0])).BYTES_PER_ELEMENT;
                        h = l * h[0].length;
                        b.bindBuffer(b.ARRAY_BUFFER, a.vertexBuffer[c]);
                        b.vertexAttribPointer(k.attributes.aPos, 4, b.FLOAT, false, h, 0);
                        b.vertexAttribPointer(k.attributes.aColor, 4, b.FLOAT, false, h, 4 * l);
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
    HeatLineLayer = function(c) {
        function a(b, c) {
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b, c));
            b.simpleLineLayer = new SimpleLineLayer(b.getHeatOptions());
            b.children = [b.simpleLineLayer];
            return b
        }
        S(a, c);
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
                void 0 === c && (e = this.getDataRange(), c = e.max, e = e.min);
                var g = new Intensity({
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
                k = 0; k < g; k++) {
                    var h = ~~a[k].count || 1;
                    "properties" in a[k] && "count" in a[k].properties && (h = ~~a[k].properties.count);
                    c = Math.max(h, c);
                    e = Math.min(h, e)
                }
                return {
                    max: c / 2,
                    min: e
                }
            }
        }]);
        return a
    } (nb),
    Bi = O(function(c, a) { (function(a, d) {
            c.exports = d()
        })(Fe,
        function() {
            function a(b, d, e, g, h) {
                for (; g > e;) {
                    if (600 < g - e) {
                        var k = g - e + 1,
                        l = d - e + 1,
                        m = Math.log(k),
                        n = .5 * Math.exp(2 * m / 3);
                        m = .5 * Math.sqrt(m * n * (k - n) / k) * (0 > l - k / 2 ? -1 : 1);
                        a(b, d, Math.max(e, Math.floor(d - l * n / k + m)), Math.min(g, Math.floor(d + (k - l) * n / k + m)), h)
                    }
                    k = b[d];
                    l = e;
                    n = g;
                    c(b, e, d);
                    for (0 < h(b[g], k) && c(b, e, g); l < n;) {
                        c(b, l, n);
                        l++;
                        for (n--; 0 > h(b[l], k);) l++;
                        for (; 0 < h(b[n], k);) n--
                    }
                    0 === h(b[e], k) ? c(b, e, n) : (n++, c(b, n, g));
                    n <= d && (e = n + 1);
                    d <= n && (g = n - 1)
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
                k(a, 0, a.children.length, b, a)
            }
            function k(a, b, c, d, e) {
                e || (e = u(null));
                e.minX = Infinity;
                e.minY = Infinity;
                e.maxX = -Infinity;
                for (e.maxY = -Infinity; b < c; b++) {
                    var g = a.children[b];
                    h(e, a.leaf ? d(g) : g)
                }
                return e
            }
            function h(a, b) {
                a.minX = Math.min(a.minX, b.minX);
                a.minY = Math.min(a.minY, b.minY);
                a.maxX = Math.max(a.maxX, b.maxX);
                a.maxY = Math.max(a.maxY, b.maxY);
                return a
            }
            function l(a, b) {
                return a.minX - b.minX
            }
            function n(a, b) {
                return a.minY - b.minY
            }
            function p(a) {
                return (a.maxX - a.minX) * (a.maxY - a.minY)
            }
            function m(a) {
                return a.maxX - a.minX + (a.maxY - a.minY)
            }
            function q(a, b) {
                return a.minX <= b.minX && a.minY <= b.minY && b.maxX <= a.maxX && b.maxY <= a.maxY
            }
            function r(a, b) {
                return b.minX <= a.maxX && b.minY <= a.maxY && b.maxX >= a.minX && b.maxY >= a.minY
            }
            function u(a) {
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
            var t = function(a) {
                void 0 === a && (a = 9);
                this._maxEntries = Math.max(4, a);
                this._minEntries = Math.max(2, Math.ceil(.4 * this._maxEntries));
                this.clear()
            };
            t.prototype.all = function() {
                return this._all(this.data, [])
            };
            t.prototype.search = function(a) {
                var b = this.data,
                c = [];
                if (!r(a, b)) return c;
                for (var d = this.toBBox,
                e = []; b;) {
                    for (var g = 0; g < b.children.length; g++) {
                        var h = b.children[g],
                        k = b.leaf ? d(h) : h;
                        r(a, k) && (b.leaf ? c.push(h) : q(a, k) ? this._all(h, c) : e.push(h))
                    }
                    b = e.pop()
                }
                return c
            };
            t.prototype.collides = function(a) {
                var b = this.data;
                if (!r(a, b)) return ! 1;
                for (var c = []; b;) {
                    for (var d = 0; d < b.children.length; d++) {
                        var e = b.children[d],
                        g = b.leaf ? this.toBBox(e) : e;
                        if (r(a, g)) {
                            if (b.leaf || q(a, g)) return ! 0;
                            c.push(e)
                        }
                    }
                    b = c.pop()
                }
                return ! 1
            };
            t.prototype.load = function(a) {
                if (!a || !a.length) return this;
                if (a.length < this._minEntries) {
                    for (var b = 0; b < a.length; b++) this.insert(a[b]);
                    return this
                }
                a = this._build(a.slice(), 0, a.length - 1, 0);
                this.data.children.length ? this.data.height === a.height ? this._splitRoot(this.data, a) : (this.data.height < a.height && (b = this.data, this.data = a, a = b), this._insert(a, this.data.height - a.height - 1, true)) : this.data = a;
                return this
            };
            t.prototype.insert = function(a) {
                a && this._insert(a, this.data.height - 1);
                return this
            };
            t.prototype.clear = function() {
                this.data = u([]);
                return this
            };
            t.prototype.remove = function(a, b) {
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
                                for (var v = 0; v < n.length; v++) if (p(m, n[v])) {
                                    m = v;
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
                    l || c.leaf || !q(c, d) ? k ? (h++, c = k.children[h], l = false) : c = null: (e.push(c), g.push(h), h = 0, k = c, c = c.children[0])
                }
                return this
            };
            t.prototype.toBBox = function(a) {
                return a
            };
            t.prototype.compareMinX = function(a, b) {
                return a.minX - b.minX
            };
            t.prototype.compareMinY = function(a, b) {
                return a.minY - b.minY
            };
            t.prototype.toJSON = function() {
                return this.data
            };
            t.prototype.fromJSON = function(a) {
                this.data = a;
                return this
            };
            t.prototype._all = function(a, b) {
                for (var c = []; a;) a.leaf ? b.push.apply(b, a.children) : c.push.apply(c, a.children),
                a = c.pop();
                return b
            };
            t.prototype._build = function(a, b, c, d) {
                var e = c - b + 1,
                h = this._maxEntries;
                if (e <= h) {
                    var k = u(a.slice(b, c + 1));
                    g(k, this.toBBox);
                    return k
                }
                d || (d = Math.ceil(Math.log(e) / Math.log(h)), h = Math.ceil(e / Math.pow(h, d - 1)));
                k = u([]);
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
            t.prototype._chooseSubtree = function(a, b, c, d) {
                for (;;) {
                    d.push(b);
                    if (b.leaf || d.length - 1 === c) break;
                    for (var e = Infinity,
                    g = Infinity,
                    h = void 0,
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
            t.prototype._insert = function(a, b, c) {
                c = c ? a: this.toBBox(a);
                var d = [],
                e = this._chooseSubtree(c, this.data, b, d);
                e.children.push(a);
                for (h(e, c); 0 <= b;) if (d[b].children.length > this._maxEntries) this._split(d, b),
                b--;
                else break;
                this._adjustParentBBoxes(c, d, b)
            };
            t.prototype._split = function(a, b) {
                var c = a[b],
                d = c.children.length,
                e = this._minEntries;
                this._chooseSplitAxis(c, e, d);
                d = this._chooseSplitIndex(c, e, d);
                d = u(c.children.splice(d, c.children.length - d));
                d.height = c.height;
                d.leaf = c.leaf;
                g(c, this.toBBox);
                g(d, this.toBBox);
                b ? a[b - 1].children.push(d) : this._splitRoot(c, d)
            };
            t.prototype._splitRoot = function(a, b) {
                this.data = u([a, b]);
                this.data.height = a.height + 1;
                this.data.leaf = false;
                g(this.data, this.toBBox)
            };
            t.prototype._chooseSplitIndex = function(a, b, c) {
                for (var d, e = Infinity,
                g = Infinity,
                h = b; h <= c - b; h++) {
                    var l = k(a, 0, h, this.toBBox),
                    m = k(a, h, c, this.toBBox);
                    var n = Math.max(0, Math.min(l.maxX, m.maxX) - Math.max(l.minX, m.minX)) * Math.max(0, Math.min(l.maxY, m.maxY) - Math.max(l.minY, m.minY));
                    l = p(l) + p(m);
                    n < e ? (e = n, d = h, g = l < g ? l: g) : n === e && l < g && (g = l, d = h)
                }
                return d || c - b
            };
            t.prototype._chooseSplitAxis = function(a, b, c) {
                var d = a.leaf ? this.compareMinX: l,
                e = a.leaf ? this.compareMinY: n,
                g = this._allDistMargin(a, b, c, d);
                b = this._allDistMargin(a, b, c, e);
                g < b && a.children.sort(d)
            };
            t.prototype._allDistMargin = function(a, b, c, d) {
                a.children.sort(d);
                d = this.toBBox;
                for (var e = k(a, 0, b, d), g = k(a, c - b, c, d), l = m(e) + m(g), n = b; n < c - b; n++) {
                    var p = a.children[n];
                    h(e, a.leaf ? d(p) : p);
                    l += m(e)
                }
                for (c = c - b - 1; c >= b; c--) e = a.children[c],
                h(g, a.leaf ? d(e) : e),
                l += m(g);
                return l
            };
            t.prototype._adjustParentBBoxes = function(a, b, c) {
                for (; 0 <= c; c--) h(b[c], a)
            };
            t.prototype._condense = function(a) {
                for (var b = a.length - 1,
                c; 0 <= b; b--) 0 === a[b].children.length ? 0 < b ? (c = a[b - 1].children, c.splice(c.indexOf(a[b]), 1)) : this.clear() : g(a[b], this.toBBox)
            };
            return t
        })
    }),
    Db = window.devicePixelRatio,
    Eb = Math.max(2, Db),
    TextLayer = function(c) {
        function a(b, c) {
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b, c));
            c = b.canvas = document.createElement("canvas");
            c = b.ctx = c.getContext("2d");
            c.textAlign = "start";
            c.textBaseline = "top";
            return b
        }
        S(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    color: "#fff",
                    fontFamily: "Microsoft Yahei",
                    fontSize: 14,
                    isFlat: false,
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
                    g = a[b].text || "";
                    "properties" in a[b] && "text" in a[b].properties && (g = a[b].properties.text);
                    c && g && this.cachedData.push({
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
                    k = this.program;
                    k.use(b);
                    this.updateText(a);
                    b.enable(b.BLEND);
                    b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
                    b.disable(b.DEPTH_TEST);
                    var h = this.map.getZoomUnits();
                    k.setUniforms(T(this.getCommonUniforms(a), {
                        matrix: c,
                        devicePixelRatio: Db,
                        textureImage: this.texture,
                        uFlat: g.isFlat,
                        offset: g.offset,
                        zoomUnits: h
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
                k = g.color,
                h = g.fontSize,
                l = g.fontFamily;
                a = g.padding;
                var n = g.margin,
                p = g.collides;
                g = g.enablePicked;
                var m = b.canvas.width,
                q = b.canvas.height,
                r = this.canvas;
                b = this.ctx;
                b.save();
                b.scale(Eb, Eb);
                b.textBaseline = "top";
                b.font = h + "px " + l;
                for (var u = new Bi,
                y = [], t = 0; t < this.cachedData.length; t++) {
                    var w = this.cachedData[t],
                    v = w.point;
                    w = w.text;
                    var B = db(v, 3);
                    B = Fa.clone([B[0], B[1], B[2], 1]);
                    Fa.transformMat4(B, B, c);
                    Fa.scale(B, B, 1 / B[3]);
                    var A = (B[0] + 1) / 2 * m,
                    D = ( - B[1] + 1) / 2 * q,
                    E = b.measureText(w);
                    B = E.width + a[0];
                    E = E.actualBoundingBoxAscent && E.actualBoundingBoxDescent ? E.actualBoundingBoxDescent - E.actualBoundingBoxAscent: h + a[1];
                    E += a[1];
                    var I = B + n[0],
                    L = E + n[1];
                    A -= I / 2 * Db;
                    D -= L / 2 * Db;
                    I = A + I * Db;
                    L = D + L * Db;
                    if (! (0 > I || 0 > L || A > m || D > q)) {
                        if (p) {
                            L = {
                                minX: A,
                                maxX: I,
                                minY: D,
                                maxY: L
                            };
                            if (u.collides(L)) continue;
                            u.insert(L)
                        }
                        y.push({
                            w: B,
                            h: E,
                            point: v,
                            text: w
                        })
                    }
                }
                b.restore();
                n = Ee(y);
                c = ceilPowerOfTwo(n.w);
                n = ceilPowerOfTwo(n.h);
                r.width = c * Eb;
                r.height = n * Eb;
                b.save();
                b.scale(Eb, Eb);
                b.textBaseline = "top";
                b.fillStyle = k;
                b.font = h + "px " + l;
                k = [];
                h = [];
                l = [];
                r = [];
                p = 0;
                for (m = y.length; p < m; ++p) {
                    q = y[p];
                    b.fillText(q.text, q.x + a[0], q.y + a[1]);
                    v = db(q.point, 3);
                    u = v[0];
                    t = v[1];
                    v = v[2];
                    for (w = 0; 4 > w; w++) k.push(u, t, v),
                    k.push(w),
                    k.push(q.w, q.h);
                    u = q.x / c;
                    t = (q.x + q.w) / c;
                    v = (q.y + q.h) / n;
                    q = q.y / n;
                    h.push(u, v, u, q, t, q, t, v);
                    q = 4 * p;
                    l.push(q, q + 2, q + 1, q, q + 3, q + 2);
                    g && (q = this.indexToRgb(p), r.push(q[0] / 255, q[1] / 255, q[2] / 255), r.push(q[0] / 255, q[1] / 255, q[2] / 255), r.push(q[0] / 255, q[1] / 255, q[2] / 255), r.push(q[0] / 255, q[1] / 255, q[2] / 255))
                }
                b.restore();
                this.loadTexture();
                this.index = l;
                this.vertexBuffer.updateData(new Float32Array(k));
                this.uvBuffer.updateData(new Float32Array(h));
                this.indexBuffer.updateData(new Uint32Array(l));
                g && this.pickBuffer.updateData(new Float32Array(r))
            }
        },
        {
            key: "loadTexture",
            value: function() {
                var a = this;
                this.canvas ? loadTextureImage(this.gl, this.canvas,
                function(b) {
                    a.texture = b
                }) : this.texture = null
            }
        }]);
        return a
    } (Layer),
    Gf = O(function(c, a) { (function(a, d) {
            c.exports = d()
        })(Fe,
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
            function k(a, b) {
                a = a.geometry.coordinates;
                return {
                    x: a[0] / 360 + .5,
                    y: n(a[1]),
                    zoom: Infinity,
                    index: b,
                    parentId: -1
                }
            }
            function h(a) {
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
            function n(a) {
                a = Math.sin(a * Math.PI / 180);
                a = .5 - .25 * Math.log((1 + a) / (1 - a)) / Math.PI;
                return 0 > a ? 0 : 1 < a ? 1 : a
            }
            function p(a, b) {
                for (var c in b) a[c] = b[c];
                return a
            }
            function m(a) {
                return a.x
            }
            function q(a) {
                return a.y
            }
            var r = function(a) {
                return a[0]
            },
            u = function(a) {
                return a[1]
            },
            w = function(b, c, d, e, g) {
                void 0 === c && (c = r);
                void 0 === d && (d = u);
                void 0 === e && (e = 64);
                void 0 === g && (g = Float64Array);
                this.nodeSize = e;
                this.points = b;
                var h = this.ids = new(65536 > b.length ? Uint16Array: Uint32Array)(b.length);
                g = this.coords = new g(2 * b.length);
                for (var k = 0; k < b.length; k++) h[k] = k,
                g[2 * k] = c(b[k]),
                g[2 * k + 1] = d(b[k]);
                a(h, g, e, 0, h.length - 1, 0)
            };
            w.prototype.range = function(a, b, c, d) {
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
                        var v = Math.floor((r + q) / 2);
                        m = g[2 * v];
                        n = g[2 * v + 1];
                        m >= a && m <= c && n >= b && n <= d && l.push(e[v]);
                        var u = (p + 1) % 2;
                        if (0 === p ? a <= m: b <= n) k.push(r),
                        k.push(v - 1),
                        k.push(u);
                        if (0 === p ? c >= m: d >= n) k.push(v + 1),
                        k.push(q),
                        k.push(u)
                    }
                }
                return l
            };
            w.prototype.within = function(a, b, c) {
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
                        v = e[2 * q + 1],
                        u = r - a,
                        t = v - b;
                        u * u + t * t <= l && k.push(d[q]);
                        u = (m + 1) % 2;
                        if (0 === m ? a - c <= r: b - c <= v) h.push(p),
                        h.push(q - 1),
                        h.push(u);
                        if (0 === m ? a + c >= r: b + c >= v) h.push(q + 1),
                        h.push(n),
                        h.push(u)
                    }
                }
                return k
            };
            var t = {
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
            z = function(a) {
                this.options = p(Jh(t), a);
                this.trees = Array(this.options.maxZoom + 1)
            };
            z.prototype.load = function(a) {
                var b = this.options,
                c = b.minZoom,
                d = b.maxZoom;
                b = b.nodeSize;
                this.points = a;
                for (var e = [], g = 0; g < a.length; g++) a[g].geometry && e.push(k(a[g], g));
                this.trees[d + 1] = new w(e, m, q, b, Float32Array);
                for (a = d; a >= c; a--) e = this._cluster(e, a),
                this.trees[a] = new w(e, m, q, b, Float32Array);
                return this
            };
            z.prototype.getClusters = function(a, b) {
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
                var k = 0;
                for (d = b.range(c / 360 + .5, n(g), e / 360 + .5, n(d)); k < d.length; k += 1) e = b.points[d[k]],
                a.push(e.numPoints ? h(e) : this.points[e.index]);
                return a
            };
            z.prototype.getChildren = function(a) {
                var b = this._getOriginId(a),
                c = this._getOriginZoom(a),
                d = this.trees[c];
                if (!d) throw Error("No cluster with the specified id.");
                var e = d.points[b];
                if (!e) throw Error("No cluster with the specified id.");
                b = [];
                var g = 0;
                for (c = d.within(e.x, e.y, this.options.radius / (this.options.extent * Math.pow(2, c - 1))); g < c.length; g += 1) e = d.points[c[g]],
                e.parentId === a && b.push(e.numPoints ? h(e) : this.points[e.index]);
                if (0 === b.length) throw Error("No cluster with the specified id.");
                return b
            };
            z.prototype.getLeaves = function(a, b, c) {
                var d = [];
                this._appendLeaves(d, a, b || 10, c || 0, 0);
                return d
            };
            z.prototype.getTile = function(a, b, c) {
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
            z.prototype.getClusterExpansionZoom = function(a) {
                for (var b = this._getOriginZoom(a) - 1; b <= this.options.maxZoom;) {
                    a = this.getChildren(a);
                    b++;
                    if (1 !== a.length) break;
                    a = a[0].properties.cluster_id
                }
                return b
            };
            z.prototype._appendLeaves = function(a, b, c, d, e) {
                var g = 0;
                for (b = this.getChildren(b); g < b.length; g += 1) {
                    var h = b[g],
                    k = h.properties;
                    k && k.cluster ? e = e + k.point_count <= d ? e + k.point_count: this._appendLeaves(a, k.cluster_id, c, d, e) : e < d ? e++:a.push(h);
                    if (a.length === c) break
                }
                return e
            };
            z.prototype._addTileFeatures = function(a, b, c, d, e, g) {
                for (var h = 0; h < a.length; h += 1) {
                    var k = b[a[h]],
                    m = k.numPoints,
                    n = {
                        type: 1,
                        geometry: [[Math.round(this.options.extent * (k.x * e - c)), Math.round(this.options.extent * (k.y * e - d))]],
                        tags: m ? l(k) : this.points[k.index].properties
                    },
                    p = void 0;
                    m ? p = k.id: this.options.generateId ? p = k.index: this.points[k.index].id && (p = this.points[k.index].id);
                    void 0 !== p && (n.id = p);
                    g.features.push(n)
                }
            };
            z.prototype._limitZoom = function(a) {
                return Math.max(this.options.minZoom, Math.min(a, this.options.maxZoom + 1))
            };
            z.prototype._cluster = function(a, b) {
                var c = [],
                d = this.options,
                e = d.reduce;
                d = d.radius / (d.extent * Math.pow(2, b));
                for (var g = 0; g < a.length; g++) {
                    var h = a[g];
                    if (! (h.zoom <= b)) {
                        h.zoom = b;
                        for (var k = this.trees[b + 1], l = k.within(h.x, h.y, d), m = h.numPoints || 1, n = h.x * m, p = h.y * m, q = e && 1 < m ? this._map(h, true) : null, r = (g << 5) + (b + 1) + this.points.length, u = 0; u < l.length; u += 1) {
                            var t = k.points[l[u]];
                            if (! (t.zoom <= b)) {
                                t.zoom = b;
                                var v = t.numPoints || 1;
                                n += t.x * v;
                                p += t.y * v;
                                m += v;
                                t.parentId = r;
                                e && (q || (q = this._map(h, true)), e(q, this._map(t)))
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
            z.prototype._getOriginId = function(a) {
                return a - this.points.length >> 5
            };
            z.prototype._getOriginZoom = function(a) {
                return (a - this.points.length) % 32
            };
            z.prototype._map = function(a, b) {
                if (a.numPoints) return b ? p({},
                a.properties) : a.properties;
                a = this.points[a.index].properties;
                var c = this.options.map(a);
                return b && c === a ? p({},
                c) : c
            };
            return z
        })
    }),
    HoneycombLayer = function(c) {
        function a(b) {
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b));
            b.shapeLayer = new ShapeLayer(b.options);
            b.textLayer = new TextLayer(b.options.textOptions);
            b.children = [b.shapeLayer, b.textLayer];
            b.max = [];
            return b
        }
        S(a, c);
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
                var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                c = this.options.textOptions;
                a.textOptions && T(c, a.textOptions);
                var e = a.minZoom,
                g = a.maxZoom,
                k = a.size;
                e = g && g !== this.options.maxZoom || e && e !== this.options.minZoom || k && k !== this.options.size;
                T(this.options, a, {
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
                    k = a.enableCluster;
                    a = a.size;
                    this.zoom > b ? this.zoom = b: this.zoom < d && (this.zoom = d);
                    k && (this.supercluster = new Gf({
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
                var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.options,
                c = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : this.data,
                e = this.map.map,
                g = this.zoom;
                a.enableCluster && this.supercluster && (c = this.getClusterData(a));
                if (c && c.length) {
                    var k = a.gradient,
                    h = a.showText,
                    l = a.textOptions,
                    n = a.height,
                    p = a.size;
                    p *= Math.pow(2, 18 - g);
                    c = Hg(c, p,
                    function(a) {
                        var b = db(a, 2),
                        c = b[0];
                        b = b[1]; - 180 <= c && 180 >= c && -90 <= b && 90 >= b && (b = e.lnglatToMercator(c, b), c = b[0], b = b[1]);
                        a[0] = c;
                        a[1] = b;
                        return a
                    });
                    this.max[g] = Math.max(this.max[g] || 0, c.max);
                    var m = new Intensity({
                        max: this.max[g],
                        min: 0,
                        maxSize: n * Math.pow(2, 18 - g),
                        minSize: 0,
                        gradient: k
                    });
                    k = [];
                    if (h) {
                        var q = l && l.format;
                        q = "function" === typeof q ? q: null;
                        k = c.map(function(a) {
                            return {
                                geometry: {
                                    coordinates: [a.center.x, a.center.y, m.getSize(a.count) + l.fontSize / 2 * Math.pow(2, 18 - g)]
                                },
                                text: q ? q(a.count) : a.count
                            }
                        })
                    }
                    this.textLayer.setData(k);
                    h = c.map(function(a) {
                        for (var b = a.center,
                        d = c.r,
                        e = [], g = 0; 6 > g; g++) e.push(Gg({
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
                                height: m.getSize(a.count),
                                color: m.getColor(a.count)
                            }
                        }
                    });
                    this.shapeLayer.setData(h);
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
                k = g.lng;
                g = g.lat;
                var h = []; - 180 <= k && 180 >= k && -90 <= g && 90 >= g ? h = [c.lng, c.lat, e.lng, e.lat] : (e = a.mercatorToLnglat(this.ne.lng, this.ne.lat), c = a.mercatorToLnglat(this.sw.lng, this.sw.lat), h = c.concat(e));
                return this.supercluster.getClusters(h, this.zoom).map(function(a) {
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
                this.shouldUpdate() ? this.refreshLayer() : Wa(a.prototype.__proto__ || N(a.prototype), "render", this).call(this, b)
            }
        }]);
        return a
    } (nb),
    ec = function() {
        function c(a, b) {
            G(this, c);
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
    Di = function(c) {
        function a(b) {
            G(this, a);
            return R(this, (a.__proto__ || N(a)).call(this, b))
        }
        S(a, c);
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
                    a(T(b, {
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
                    a(T(b, {
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
                    a(T(b, {
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
                    a(T(b, {
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
    Ei = function(c) {
        function a(b) {
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b));
            b.div = document.createElement("div");
            b.div.style.position = "absolute";
            b.div.style.userSelect = "none";
            b.map.getPanes().mapPane.appendChild(b.div);
            return b
        }
        S(a, c);
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
                    a(T(b, {
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
                    a(T(b, {
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
                    a(T(b, {
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
                    a(T(b, {
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
    Fi = function(c) {
        function a(b) {
            G(this, a);
            return R(this, (a.__proto__ || N(a)).call(this, b))
        }
        S(a, c);
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
    Gi = function(c) {
        function a(b) {
            G(this, a);
            return R(this, (a.__proto__ || N(a)).call(this, b))
        }
        S(a, c);
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
    Hi = function(c) {
        function a(b, c) {
            G(this, a);
            return R(this, (a.__proto__ || N(a)).call(this, b, c))
        }
        S(a, c);
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
            G(this, c);
            b = b || {};
            "bmap" === b.mapType ? this.map = new Ei(a, b) : "blank" === b.mapType ? this.map = new Gi(a, b) : "cesium" === b.mapType ? this.map = new Fi(a, b) : "three" === b.mapType ? this.map = new Hi(a, b) : (b.mapType = "bmapgl", this.map = new Di(a, b));
            this.map.type = b.mapType;
            this.options = b || {};
            this.renderArr = []; (a = b.canvas) || (a = document.createElement("canvas"));
            this.canvas = a;
            this.gl = b.gl ? b.gl: getContext(a);
            this.gl.getExtension("OES_element_index_uint");
            this.changeSize();
            this.projectionMatrix = C.create(Float64Array);
            this.orthoMatrix = C.create(Float64Array);
            this.matrix = C.create(Float64Array);
            this.viewMatrix = C.create(Float64Array);
            this.pointToPixelMatrix = C.create(Float64Array);
            this.pixelToViewMatrix = C.create(Float64Array);
            this.fovy = 35;
            this._animation = this.animation.bind(this);
            this._update = this.update.bind(this);
            this.onInitialize(this.options.onInitialize);
            this.options.onRender && this.renderArr.push(this.options.onRender);
            this.stateManager = new StateManager({
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
                    e = C.multiply(this.matrix, b, c);
                    T(this.transferOptions, {
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
                a && (a instanceof Array || (a = fa(a).unitArray()), b.clearColor(a[0], a[1], a[2], a[3]));
                b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT)
            }
        },
        {
            key: "updateProjectionMatrix",
            value: function() {
                var a = this.gl.canvas.width / this.gl.canvas.height,
                b = this.options.cameraNear || 1,
                c = this.options.cameraFar || 4E3;
                C.perspective(this.projectionMatrix, toRadian(this.fovy), a, b, c);
                a = this.map.getSize();
                C.ortho(this.orthoMatrix, -a.width / 2, a.width / 2, -a.height / 2, a.height / 2, b, c)
            }
        },
        {
            key: "updateModelViewMatrix",
            value: function() {
                var a = this.map,
                b = this.viewMatrix,
                c = this.pointToPixelMatrix,
                e = this.pixelToViewMatrix;
                C.identity(b);
                C.identity(c);
                C.identity(e);
                var g = a.getSize();
                g = Math.round( - g.height / (2 * Math.tan(toRadian(this.fovy) / 2)));
                C.translate(e, e, [0, 0, g]);
                C.rotate(e, e, toRadian(a.getTilt()), [ - 1, 0, 0]);
                C.rotate(e, e, toRadian(a.getHeading()), [0, 0, -1]);
                g = a.getCenter();
                var k = this.options.pointOffset || [0, 0];
                a = a.getZoomUnits();
                C.translate(c, c, [(k[0] - g.lng) / a, (k[1] - g.lat) / a, 0]);
                a = 1 / a;
                C.scale(c, c, [a, a, a]);
                C.multiply(b, e, c)
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
    If = {
        circle: 1,
        square: 2
    },
    PointLayer = function(c) {
        function a(b) {
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b));
            b.bufferData = [];
            return b
        }
        S(a, c);
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
                    for (var b = [], d = a.color, k = a.size, h = 0; h < c.length; h++) {
                        var l = this.normizedPoint(c[h].geometry.coordinates),
                        n = c[h].color || d;
                        "properties" in c[h] && "color" in c[h].properties && (n = c[h].properties.color);
                        "[object Function]" === Object.prototype.toString.call(n) && (n = n(c[h]));
                        n = this.normizedColor(n);
                        var p = c[h].size || k;
                        "properties" in c[h] && "size" in c[h].properties && (p = c[h].properties.size);
                        p = "[object Function]" === Object.prototype.toString.call(p) ? p(c[h]) : Number(p);
                        l = this.addMultipleCoords(l);
                        for (var m = 0; m < l.length; m++) {
                            var q = l[m];
                            b.push(q[0], q[1], Number(q[2] || 0));
                            b.push(n[0], n[1], n[2], n[3]);
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
                    var k = this.indexToRgb(g);
                    c.push(k[0] / 255, k[1] / 255, k[2] / 255);
                    b.repeat && (c.push(k[0] / 255, k[1] / 255, k[2] / 255), c.push(k[0] / 255, k[1] / 255, k[2] / 255))
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
                    var k = this.program;
                    k.use(b);
                    this.vertexArray.bind();
                    var h = 1;
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
        }]);
        return a
    } (Layer),
    GroundRippleLayer = function(c) {
        function a(b, c) {
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b, c));
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
        S(a, c);
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
                    k = a.segs;
                    a = a.size;
                    for (var h = 360 / k,
                    l = 0; l < c.length; l++) {
                        var n = [],
                        p = [],
                        m = this.normizedPoint(c[l].geometry.coordinates),
                        q = c[l].color || d;
                        "properties" in c[l] && "color" in c[l].properties && (q = c[l].properties.color);
                        q = this.normizedColor(q);
                        var r = "[object Function]" === Object.prototype.toString.call(a) ? a(c[l]) : Number(a);
                        var u = m[0],
                        w = m[1];
                        n.push(0, 0, -.5);
                        n.push(q[0], q[1], q[2], 0);
                        for (var t = 1,
                        z = 0; t <= k; t++, z += h) n.push(m[0] - u + Math.cos(Math.PI / 180 * z) * r, m[1] - w + Math.sin(Math.PI / 180 * z) * r, -.5),
                        n.push(q[0], q[1], q[2], this.opacity),
                        t === k ? p.push(0, 0 + t, 1) : p.push(0, 0 + t, 0 + t + 1);
                        q = b.createBuffer();
                        b.bindBuffer(b.ARRAY_BUFFER, q);
                        b.bufferData(b.ARRAY_BUFFER, new Float32Array(n), b.STATIC_DRAW);
                        this.vertexBuffer[l] = q;
                        this.bufferDataArr[l] = n;
                        b.bindBuffer(b.ARRAY_BUFFER, null);
                        n = b.createBuffer();
                        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, n);
                        b.bufferData(b.ELEMENT_ARRAY_BUFFER, new Uint16Array(p), b.STATIC_DRAW);
                        this.indexBuffer[l] = n;
                        this.indexDataArr[l] = p;
                        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, null);
                        this.position[l] = [m[0], m[1]]
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
                void 0 !== this.options.opacity && (c = this.options.opacity);
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
                    var k = C.create(),
                    h = [this.currentScale, this.currentScale, this.currentScale];
                    "px" === this.options.unit && this.map && (h = this.map.getZoomUnits(), h = [this.currentScale * h, this.currentScale * h, this.currentScale]);
                    C.identity(k);
                    C.translate(k, k, [g[0], g[1], 0]);
                    C.scale(k, k, h);
                    b.uniformMatrix4fv(a.uniforms.u_modelMatrix, false, k);
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
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b));
            b.bufferData = [];
            b.date = new Date;
            b.autoUpdate = true;
            return b
        }
        S(a, c);
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
                    for (var b = [], d = a.color, k = a.size, h = 0; h < c.length; h++) {
                        var l = c[h].geometry.coordinates,
                        n = c[h].color || d;
                        "properties" in c[h] && "color" in c[h].properties && (n = c[h].properties.color);
                        "[object Function]" === Object.prototype.toString.call(n) && (n = n(c[h]));
                        n = this.normizedColor(n);
                        l = this.normizedPoint(l);
                        var p = c[h].size || k;
                        "properties" in c[h] && "size" in c[h].properties && (p = c[h].properties.size);
                        p = "[object Function]" === Object.prototype.toString.call(p) ? p(c[h]) : Number(p);
                        b.push(l[0], l[1], Number(l[2] || 0));
                        b.push(n[0], n[1], n[2], n[3]);
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
                    var k = this.indexToRgb(g);
                    c.push(k[0] / 255, k[1] / 255, k[2] / 255)
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
                    var k = this.getOptions(),
                    h = this.program;
                    h.use(b);
                    this.vertexArray.bind();
                    a = this.getCommonUniforms(a);
                    var l = 1;
                    "m" === k.unit && this.map && (l = this.map.getZoomUnits());
                    a = T(a, {
                        zoomUnits: l,
                        uTime: (new Date - this.date) / 1E3,
                        duration: k.duration,
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
    SparkLayer = function(c) {
        function a(b, c) {
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b, c));
            b.bufferData = [];
            b.startTime = Number(b.options.startTime) || 0;
            b.endTime = Number(b.options.endTime);
            b.time = b.startTime;
            b.segs = Number(b.options.segs) || 10;
            b.autoUpdate = true;
            return b
        }
        S(a, c);
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
                    for (var d = [], k = a.height, h = 0; h < c.length; h++) {
                        var l = c[h].geometry.coordinates;
                        var n = "[object Function]" === Object.prototype.toString.call(k) ? k(c[h]) : Number(k);
                        for (var p = 0,
                        m = 0; m < this.segs; m++) {
                            var q = this.normizedPoint(l);
                            d.push(q[0], q[1], p);
                            void 0 === l[2] ? d.push(m) : d.push(Number(l[2]));
                            p += n / this.segs;
                            d.push(q[0], q[1], p);
                            void 0 === l[2] ? d.push(m + 1) : d.push(Number(l[2]))
                        }
                    }
                    void 0 === a.endTime && (this.endTime = this.segs);
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
    ClusterLayer = function(c) {
        function a(b) {
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b));
            b.pointLayer = new PointLayer(b.options);
            b.textLayer = new TextLayer(b.options.textOptions);
            b.children = [b.pointLayer, b.textLayer];
            return b
        }
        S(a, c);
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
                var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                c = this.options.textOptions;
                a.textOptions && T(c, a.textOptions);
                var e = a.minZoom,
                g = a.maxZoom,
                k = a.clusterRadius;
                e = g && g !== this.options.maxZoom || e && e !== this.options.minZoom || k && k !== this.options.clusterRadius;
                T(this.options, a, {
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
                        var c = db(a.geometry.coordinates, 2),
                        d = c[0];
                        c = c[1]; - 180 <= d && 180 >= d && -90 <= c && 90 >= c || (d = b.mercatorToLnglat(d, c), a.geometry.coordinates[0] = d[0], a.geometry.coordinates[1] = d[1])
                    });
                    this.supercluster = new Gf({
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
                var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.options;
                if (this.supercluster) {
                    var c = this.getClusterData(a);
                    c && c.length && (this.pointLayer.setData(c), this.textLayer.setData(a.showText ? c: []), a.enablePicked && a.autoSelect && this.pick( - 1, -1))
                }
            }
        },
        {
            key: "getClusterData",
            value: function() {
                var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.options,
                c = this.map.map,
                e = c.getBounds(),
                g = e.ne;
                e = e.sw;
                this.ne = g;
                this.sw = e;
                var k = g,
                h = k.lng;
                k = k.lat; - 180 <= h && 180 >= h && -90 <= k && 90 >= k ? g = [e.lng, e.lat, g.lng, g.lat] : (g = c.mercatorToLnglat(this.ne.lng, this.ne.lat), e = c.mercatorToLnglat(this.sw.lng, this.sw.lat), g = e.concat(g));
                c = Math.floor(c.getZoom());
                g = this.supercluster.getClusters(g, c);
                this.zoom !== c && 0 < g.length && (this.zoom = c, h = this.supercluster.trees, e = h[c] && h[c].max || this.max, c = h[c] && h[c].min || this.min, e !== c && (this.max = e, this.min = c));
                return this.processData(g, a)
            }
        },
        {
            key: "processData",
            value: function(a, c) {
                var b = c.defaultColor,
                d = c.defaultSize,
                k = c.gradient,
                h = c.minSize,
                l = c.textOptions,
                n = new Intensity({
                    max: this.max,
                    min: ~~this.min || 1,
                    minSize: h || 8,
                    maxSize: c.maxSize || 30,
                    gradient: k
                });
                b = b || k[0] || "black";
                d = d || .5 * h || 5;
                var p = l && l.format;
                p = "function" === typeof p ? p: null;
                return a.map(function(a) {
                    var c = d,
                    e = b,
                    g = 0;
                    a.properties && a.properties.point_count && (g = a.properties.point_count, c = n.getSize(g) || c, e = n.getColor(g), g = p ? p(g) : g);
                    return {
                        geometry: a.geometry,
                        properties: {
                            text: g,
                            size: c,
                            color: e
                        }
                    }
                })
            }
        },
        {
            key: "pick",
            value: function(a, c) {
                return this.pointLayer.pick(a, c)
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
                this.shouldUpdate() ? this.refreshCluster() : Wa(a.prototype.__proto__ || N(a.prototype), "render", this).call(this, b)
            }
        }]);
        return a
    } (nb),
    HeatPointLayer = function(c) {
        function a(b, c) {
            G(this, a);
            return R(this, (a.__proto__ || N(a)).call(this, b, c))
        }
        S(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return T(Wa(a.prototype.__proto__ || N(a.prototype), "getDefaultOptions", this).call(this), {
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
                this.gl && (c = this.processData(c, b), Wa(a.prototype.__proto__ || N(a.prototype), "onChanged", this).call(this, b, c))
            }
        },
        {
            key: "generateGrid",
            value: function(a, c) {
                var b = c.gridSize,
                d = [],
                k = {};
                c = a.length;
                for (var h = this.getPointOffset(), l = 0; l < c; l++) {
                    var n = this.normizedPoint(a[l].geometry.coordinates);
                    n = ~~ ((n[0] + h[0]) / b) + "_" + ~~ ((n[1] + h[1]) / b);
                    void 0 === k[n] && (k[n] = 0);
                    var p = ~~a[l].count || 1;
                    "properties" in a[l] && "count" in a[l].properties && (p = ~~a[l].properties.count);
                    k[n] += p
                }
                Ea(k).forEach(function(a) {
                    var c = a.split("_");
                    d.push([c[0] * b + b / 2, c[1] * b + b / 2, k[a]])
                });
                return d
            }
        },
        {
            key: "processData",
            value: function(a, c) {
                var b = [];
                if ("normal" === c.style) for (var d = this.getPointOffset(), k = 0; k < a.length; k++) {
                    var h = this.normizedPoint(a[k].geometry.coordinates),
                    l = h[0] + d[0];
                    h = h[1] + d[1];
                    var n = ~~a[k].count || 1;
                    "properties" in a[k] && "count" in a[k].properties && (n = ~~a[k].properties.count);
                    b.push([l, h, n])
                } else b = this.generateGrid(a, c);
                d = a = 0;
                if (void 0 !== c.max && void 0 !== c.min) a = c.max,
                d = c.min;
                else {
                    b[0] && (a = b[0][2], d = b[0][2]);
                    k = b.length;
                    for (l = 0; l < k; l++) h = b[l],
                    a = Math.max(h[2], a),
                    d = Math.min(h[2], d);
                    a /= 2
                }
                c = new Intensity({
                    max: ~~a,
                    min: d,
                    gradient: c.gradient
                });
                a = [];
                for (d = 0; d < b.length; d++) k = b[d],
                k[0] = k[0],
                k[1] = k[1],
                l = c.getImageData(k[2]),
                a.push({
                    geometry: {
                        type: "Point",
                        coordinates: [k[0], k[1]]
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
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b, c));
            b.bufferData = [];
            return b
        }
        S(a, c);
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
                    for (var d = [], k = function(a) {
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
                    h = 0; 20 > h; h++) k(h);
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
    Jf = {
        circle: 1,
        square: 2
    },
    PointTripLayer = function(c) {
        function a(b, c) {
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b, c));
            b.bufferData = [];
            b.startTime = b.options.startTime || 0;
            b.endTime = b.options.endTime;
            b.time = b.startTime;
            b.autoUpdate = true;
            return b
        }
        S(a, c);
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
                    for (var d = [], k = a.color || [.1, .1, .9, 1], h = a.size || 5, l = 0; l < c.length; l++) {
                        var n = c[l].geometry.coordinates,
                        p = c[l].color || k;
                        "[object Function]" === Object.prototype.toString.call(p) && (p = p(c[l]));
                        "properties" in c[l] && "color" in c[l].properties && (p = c[l].properties.color);
                        p = this.normizedColor(p);
                        var m = this.normizedPoint(n),
                        q = h;
                        q = "[object Function]" === Object.prototype.toString.call(q) ? q(c[l]) : Number(q);
                        var r = c[l].time || l;
                        "properties" in c[l] && "time" in c[l].properties && (r = c[l].properties.time);
                        d.push(m[0], m[1], Number(n[2] || 0), r);
                        d.push(p[0], p[1], p[2], p[3]);
                        d.push(q * window.devicePixelRatio)
                    }
                    void 0 === a.endTime && (this.endTime = c.length);
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
                0 >= this.bufferData.length || (a = this.program, b.useProgram(a.program), b.uniformMatrix4fv(a.uniforms.u_matrix, false, c), b.bindBuffer(b.ARRAY_BUFFER, this.buffer), c = this.f32BufferData.BYTES_PER_ELEMENT, b.enableVertexAttribArray(a.attributes.aPos), b.vertexAttribPointer(a.attributes.aPos, 4, b.FLOAT, false, 9 * c, 0), b.enableVertexAttribArray(a.attributes.aColor), b.vertexAttribPointer(a.attributes.aColor, 4, b.FLOAT, false, 9 * c, 4 * c), b.enableVertexAttribArray(a.attributes.aSize), b.vertexAttribPointer(a.attributes.aSize, 1, b.FLOAT, false, 9 * c, 8 * c), b.uniform1f(a.uniforms.currentTime, this.time), b.uniform1f(a.uniforms.trailLength, this.options.trailLength || 3), c = 1, this.options.shape && Jf[this.options.shape] && (c = Jf[this.options.shape]), b.uniform1i(a.uniforms.uShape, c), a = this.options.blend, b.enable(b.BLEND), b.blendEquation(b.FUNC_ADD), a && "lighter" === a ? b.blendFunc(b.SRC_ALPHA, b.ONE) : b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA), b.drawArrays(b.POINTS, 0, this.bufferData.length / 9), b.bindBuffer(b.ARRAY_BUFFER, null), b.disable(b.BLEND), b.useProgram(null), this.time += this.options.step || .1, this.time > this.endTime && (this.time = this.startTime))
            }
        }]);
        return a
    } (Layer),
    LineTripLayer = function(c) {
        function a(b, c) {
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b, c));
            b.bufferData = [];
            b.startTime = b.options.startTime || 0;
            b.endTime = b.options.endTime;
            b.time = b.startTime;
            b.autoUpdate = true;
            return b
        }
        S(a, c);
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
                    for (var d = [], k = 0, h = this.options.color, l = 0; l < c.length; l++) {
                        var n = c[l].geometry.coordinates;
                        c[l].color && (h = c[l].color);
                        "properties" in c[l] && "color" in c[l].properties && (h = c[l].properties.color);
                        "[object Function]" === Object.prototype.toString.call(h) && (h = h(c[l]));
                        h = this.normizedColor(h);
                        n.length > k && (k = n.length);
                        for (var p = 0; p < n.length - 1; p++) {
                            var m = this.normizedPoint(n[p]);
                            d.push(m[0]);
                            d.push(m[1]);
                            d.push(m[2]);
                            void 0 === n[p][3] ? d.push(p) : d.push(Number(n[p][3]));
                            d.push(h[0]);
                            d.push(h[1]);
                            d.push(h[2]);
                            d.push(h[3]);
                            m = this.normizedPoint(n[p + 1]);
                            d.push(m[0]);
                            d.push(m[1]);
                            d.push(m[2]);
                            void 0 === n[p + 1][3] ? d.push(p + 1) : d.push(Number(n[p + 1][3]));
                            d.push(h[0]);
                            d.push(h[1]);
                            d.push(h[2]);
                            d.push(h[3])
                        }
                    }
                    void 0 === a.endTime && (this.endTime = k);
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
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b, c));
            b.initData();
            b.date = new Date;
            b.autoUpdate = true;
            return b
        }
        S(a, c);
        M(a, [{
            key: "getDefaultOptions",
            value: function() {
                return {
                    color: "rgba(25, 25, 250, 1)",
                    blend: "normal",
                    width: 2,
                    isFlat: true,
                    antialias: false,
                    lineJoin: "miter",
                    lineCap: "butt",
                    interval: .1,
                    duration: 2,
                    trailLength: .5,
                    zoom: 4
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
                    vertexShader: "uniform mat4 u_matrix;uniform float thickness;uniform int miter;uniform vec4 uSelectedColor;attribute vec3 position;attribute vec3 next;attribute vec3 previous;attribute float direction;attribute vec4 aColor;attribute float aCounter;attribute vec2 uv;varying vec4 vColor;varying vec2 vNormal;varying float vCounter;vec2 project(vec4 coord){vec3 screen=coord.xyz/coord.w;vec2 clip=(screen.xy+1.0)/2.0;return clip*MAPV_resolution;}vec4 unproject(vec2 projected,float z,float w){vec2 clip=projected/MAPV_resolution;vec2 screen=clip*2.0-1.0;return vec4(screen*w,z,w);}void main(){vColor=aColor;vCounter=aCounter;\n#if defined(PICK)\nif(mapvIsPicked()){vColor=uSelectedColor;}\n#endif\nvec4 previousProjected=u_matrix*vec4(previous,1.0);vec4 currentProjected=u_matrix*vec4(position,1.0);vec4 nextProjected=u_matrix*vec4(next,1.0);vec2 currentScreen=project(currentProjected);vec2 previousScreen=project(previousProjected);vec2 nextScreen=project(nextProjected);float len=thickness;float orientation=direction;vec2 dir=vec2(0.0);if(currentScreen==previousScreen){dir=normalize(nextScreen-currentScreen);}else if(currentScreen==nextScreen){dir=normalize(currentScreen-previousScreen);}else{vec2 dirA=normalize((currentScreen-previousScreen));if(miter==1){vec2 dirB=normalize((nextScreen-currentScreen));vec2 tangent=normalize(dirA+dirB);vec2 perp=vec2(-dirA.y,dirA.x);vec2 miter=vec2(-tangent.y,tangent.x);dir=tangent;}else{dir=dirA;}}vec2 normal=vec2(-dir.y,dir.x);vNormal=normal*orientation;normal*=len/2.0;vec2 pos=currentScreen+normal*orientation;vec4 finalPos=unproject(pos,currentProjected.z,currentProjected.w);gl_Position=finalPos;}",
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
                    k = [], h = 0; h < c.length; h++) {
                        var l = [],
                        n = c[h].geometry.coordinates;
                        n && 0 < n.length && (l = "Polygon" === c[h].geometry.type ? n[0].map(function(a) {
                            return b.normizedPoint(a)
                        }) : n.map(function(a) {
                            return b.normizedPoint(a)
                        }));
                        l = Ce(l);
                        n = l.total;
                        k[h] = l.arr;
                        d = Math.max(n, d)
                    }
                    h = [];
                    l = a.color;
                    for (n = 0; n < c.length; n++) {
                        var p = [],
                        m = c[n].geometry.coordinates;
                        m && 0 < m.length && (p = "Polygon" === c[n].geometry.type ? m[0].map(function(a) {
                            return b.normizedPoint(a)
                        }) : m.map(function(a) {
                            return b.normizedPoint(a)
                        }));
                        m = c[n].color || l;
                        "properties" in c[n] && "color" in c[n].properties && (m = c[n].properties.color);
                        "[object Function]" === Object.prototype.toString.call(m) && (m = m(c[n]));
                        m = this.normizedColor(m);
                        for (var q = this.addMultipleCoords(p), r = 0; r < q.length; r++) this.processData(this.dataMgr, q[r], k[n], d, m);
                        if (a.enablePicked) for (m = this.indexToRgb(n), q = 0; q < p.length; q++) h.push(m[0] / 255, m[1] / 255, m[2] / 255),
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
                    a.enablePicked && this.pickBuffer.updateData(new Float32Array(h))
                }
            }
        },
        {
            key: "processData",
            value: function(a, c, e, g, k) {
                var b, d, n, p, m, q, r, u = c.length,
                w = a.position.length / 6;
                e = Ba(e.map(function(a) {
                    return a / g
                }));
                var t = Ba(c.map(function(a) {
                    return - 1
                }), true),
                z = Ba(c),
                v = Ba(c.map(rc( - 1))),
                x = Ba(c.map(rc(1)));
                c = Ba(c.map(function(a) {
                    return k
                }));
                u = Be(u, w); (b = a.counter).push.apply(b, W(e)); (d = a.position).push.apply(d, W(Na(z))); (n = a.prev).push.apply(n, W(Na(v))); (p = a.next).push.apply(p, W(Na(x))); (m = a.direction).push.apply(m, W(t)); (q = a.color).push.apply(q, W(Na(c))); (r = a.index).push.apply(r, W(u))
            }
        },
        {
            key: "render",
            value: function(a) {
                var b = a.gl,
                c = a.matrix,
                g = this.dataMgr;
                if (g && !(0 >= g.index.length)) {
                    var k = this.getOptions(),
                    h = this.program;
                    h.use(b);
                    var l = this.map ? this.map.getZoom() >= k.zoom && this.autoUpdate ? true : false : true;
                    h.setUniforms(T(this.getCommonUniforms(a), {
                        u_matrix: c,
                        miter: 1,
                        thickness: k.width,
                        uAntialias: k.antialias,
                        uTime: (new Date - this.date) / 1E3,
                        uAnimate: l,
                        duration: k.duration,
                        interval: k.interval,
                        trailLength: k.trailLength
                    }));
                    b.enable(b.BLEND);
                    b.blendEquation(b.FUNC_ADD);
                    k.blend && "lighter" === k.blend ? b.blendFunc(b.SRC_ALPHA, b.ONE) : b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
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
            G(this, a);
            return R(this, (a.__proto__ || N(a)).call(this, b, c))
        }
        S(a, c);
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
                k = this.program,
                h = k.uniforms;
                k.use(b);
                this.texture && (b.activeTexture(b.TEXTURE0), b.uniform1i(h.uTile, 0), b.bindTexture(b.TEXTURE_2D, this.texture), b.activeTexture(b.TEXTURE1), b.uniform1i(h.uTerrain, 1), b.bindTexture(b.TEXTURE_2D, this.terrainSampler), b.disable(b.CULL_FACE), k.setUniforms({
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
                c.tile ? c.terrain ? loadTextureImage(this.gl, c.terrain,
                function(d, e) {
                    b.terrainSampler = d;
                    loadTextureImage(b.gl, c.tile,
                    function(c, d) {
                        b.texture = c;
                        a && a();
                        b.webglLayer.render()
                    })
                },
                {
                    TEXTURE_WRAP_S: "MIRRORED_REPEAT",
                    TEXTURE_WRAP_T: "MIRRORED_REPEAT"
                }) : loadTextureImage(this.gl, c.tile,
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
                    var k = a[0].geometry.coordinates[0];
                    k = k.map(function(a) {
                        return b.normizedPoint(a)
                    });
                    a = k[0][0];
                    var h = k[0][1],
                    l = k[0][2],
                    n = (k[2][0] - a) / 16;
                    k = (k[2][1] - h) / 16;
                    for (var p = 0; 16 >= p; p++) for (var m = 0; 16 >= m; m++) if (c.push(a + n * m, h + k * p, l), c.push(m / 16, p / 16), 16 > m && 16 > p) {
                        var q = 17 * p + m,
                        r = 17 * (p + 1) + m;
                        g.push(q, r + 1, q + 1);
                        g.push(q, r, r + 1)
                    }
                }
                this.index = g;
                this.vertexBuffer.updateData(new Float32Array(c));
                this.indexBuffer.updateData(new Uint32Array(g))
            }
        }]);
        return a
    } (Layer),
    Lc = function(c, a, b, d) {
        if (! (c instanceof a) || void 0 !== d && d in c) throw TypeError(b + ": incorrect invocation!");
        return c
    },
    pb = O(function(c) {
        var a = {},
        b = {};
        c = c.exports = function(c, e, g, k, h) {
            h = h ?
            function() {
                return c
            }: Ad(c);
            g = ka(g, k, e ? 2 : 1);
            k = 0;
            var d, n;
            if ("function" != typeof h) throw TypeError(c + " is not iterable!");
            if (void 0 === h || Pa.Array !== h && nf[mf] !== h) for (k = h.call(c); ! (n = k.next()).done;) {
                if (h = lf(k, g, n.value, e), h === a || h === b) return h
            } else for (d = uc(c.length); d > k; k++) if (h = e ? g(qa(n = c[k])[0], n[1]) : g(c[k]), h === a || h === b) return h
        };
        c.BREAK = a;
        c.RETURN = b
    }),
    Ri = ia("species"),
    Lf = function(c, a) {
        c = qa(c).constructor;
        var b;
        return void 0 === c || void 0 == (b = qa(c)[Ri]) ? a: ib(b)
    },
    Si = function(c, a, b) {
        var d = void 0 === b;
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
    Mf = P.process,
    Nd = P.setImmediate,
    Nf = P.clearImmediate,
    Of = P.MessageChannel,
    Od = P.Dispatch,
    Pd = 0,
    fc = {},
    gc = function() {
        var c = +this;
        if (fc.hasOwnProperty(c)) {
            var a = fc[c];
            delete fc[c];
            a()
        }
    },
    Pf = function(c) {
        gc.call(c.data)
    };
    if (!Nd || !Nf) if (Nd = function(c) {
        for (var a = [], b = 1; arguments.length > b;) a.push(arguments[b++]);
        fc[++Pd] = function() {
            Si("function" == typeof c ? c: Function(c), a)
        };
        hc(Pd);
        return Pd
    },
    Nf = function(c) {
        delete fc[c]
    },
    "process" == jb(Mf)) var hc = function(c) {
        Mf.nextTick(ka(gc, c, 1))
    };
    else if (Od && Od.now) hc = function(c) {
        Od.now(ka(gc, c, 1))
    };
    else if (Of) {
        var Qf = new Of;
        var Rf = Qf.port2;
        Qf.port1.onmessage = Pf;
        hc = ka(Rf.postMessage, Rf, 1)
    } else P.addEventListener && "function" == typeof postMessage && !P.importScripts ? (hc = function(c) {
        P.postMessage(c + "", "*")
    },
    P.addEventListener("message", Pf, false)) : hc = "onreadystatechange" in (xc ? xb.createElement("script") : {}) ?
    function(c) {
        md.appendChild(xc ? xb.createElement("script") : {}).onreadystatechange = function() {
            md.removeChild(this);
            gc.call(c)
        }
    }: function(c) {
        setTimeout(ka(gc, c, 1), 0)
    };
    var Qd = Nd,
    Sf = P.MutationObserver || P.WebKitMutationObserver,
    Rd = P.process,
    Sd = P.Promise,
    Tf = "process" == jb(Rd),
    Mc = {
        f: function(c) {
            return new Ig(c)
        }
    },
    Nc = function(c) {
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
    Uf = P.navigator,
    Ti = Uf && Uf.userAgent || "",
    Td = function(c, a) {
        qa(c);
        if (oa(a) && a.constructor === c) return a;
        c = Mc.f(c);
        var b = c.resolve;
        b(a);
        return c.promise
    },
    Ud = function(c, a, b) {
        for (var d in a) b && c[d] ? c[d] = a[d] : Ta(c, d, a[d]);
        return c
    },
    Vf = ia("species"),
    Wf = function(c) {
        c = "function" == typeof X[c] ? X[c] : P[c];
        Ca && c && !c[Vf] && za.f(c, Vf, {
            configurable: true,
            get: function() {
                return this
            }
        })
    },
    Xf = function() {
        var c, a, b = function() {
            var b;
            for (Tf && (b = Rd.domain) && b.exit(); c;) {
                var e = c.fn;
                c = c.next;
                try {
                    e()
                } catch(n) {
                    throw c ? d() : a = void 0,
                    n;
                }
            }
            a = void 0;
            b && b.enter()
        };
        if (Tf) var d = function() {
            Rd.nextTick(b)
        };
        else if (!Sf || P.navigator && P.navigator.standalone) if (Sd && Sd.resolve) {
            var e = Sd.resolve(void 0);
            d = function() {
                e.then(b)
            }
        } else d = function() {
            Qd.call(P, b)
        };
        else {
            var g = true,
            k = document.createTextNode(""); (new Sf(b)).observe(k, {
                characterData: true
            });
            d = function() {
                k.data = g = !g
            }
        }
        return function(b) {
            b = {
                fn: b,
                next: void 0
            };
            a && (a.next = b);
            c || (c = b, d());
            a = b
        }
    } (),
    Yf = P.TypeError,
    Fb = P.process,
    Zf = Fb && Fb.versions,
    Ui = Zf && Zf.v8 || "",
    Qa = P.Promise,
    ic = "process" == Ic(Fb),
    Oc = function() {},
    $f,
    jc = $f = Mc.f,
    Pc = !!
    function() {
        try {
            var c = Qa.resolve(1),
            a = (c.constructor = {})[ia("species")] = function(a) {
                a(Oc, Oc)
            };
            return (ic || "function" == typeof PromiseRejectionEvent) && c.then(Oc) instanceof a && 0 !== Ui.indexOf("6.6") && -1 === Ti.indexOf("Chrome/66")
        } catch(b) {}
    } (),
    ag = function(c) {
        var a;
        return oa(c) && "function" == typeof(a = c.then) ? a: false
    },
    Vd = function(c, a) {
        if (!c._n) {
            c._n = true;
            var b = c._c;
            Xf(function() {
                for (var d = c._v,
                e = 1 == c._s,
                g = 0; b.length > g;) {
                    var k = void 0,
                    h = void 0,
                    l = void 0,
                    n = b[g++],
                    p = e ? n.ok: n.fail,
                    m = n.resolve,
                    q = n.reject,
                    r = n.domain;
                    try {
                        p ? (e || (2 == c._h && Vi(c), c._h = 1), true === p ? l = d: (r && r.enter(), l = p(d), r && (r.exit(), k = true)), l === n.promise ? q(Yf("Promise-chain cycle")) : (h = ag(l)) ? h.call(l, m, q) : m(l)) : q(d)
                    } catch(u) {
                        r && !k && r.exit(),
                        q(u)
                    }
                }
                c._c = [];
                c._n = false;
                a && !c._h && Wi(c)
            })
        }
    },
    Wi = function(c) {
        Qd.call(P,
        function() {
            var a = c._v,
            b = 1 !== c._h && 0 === (c._a || c._c).length,
            d,
            e;
            if (b) {
                var g = Nc(function() {
                    ic ? Fb.emit("unhandledRejection", a, c) : (d = P.onunhandledrejection) ? d({
                        promise: c,
                        reason: a
                    }) : (e = P.console) && e.error && e.error("Unhandled promise rejection", a)
                });
                c._h = ic || 1 !== c._h && 0 === (c._a || c._c).length ? 2 : 1
            }
            c._a = void 0;
            if (b && g.e) throw g.v;
        })
    },
    Vi = function(c) {
        Qd.call(P,
        function() {
            var a;
            ic ? Fb.emit("rejectionHandled", c) : (a = P.onrejectionhandled) && a({
                promise: c,
                reason: c._v
            })
        })
    },
    Gb = function(c) {
        var a = this;
        a._d || (a._d = true, a = a._w || a, a._v = c, a._s = 2, a._a || (a._a = a._c.slice()), Vd(a, true))
    },
    Wd = function(c) {
        var a = this,
        b;
        if (!a._d) {
            a._d = true;
            a = a._w || a;
            try {
                if (a === c) throw Yf("Promise can't be resolved itself"); (b = ag(c)) ? Xf(function() {
                    var d = {
                        _w: a,
                        _d: false
                    };
                    try {
                        b.call(c, ka(Wd, d, 1), ka(Gb, d, 1))
                    } catch(e) {
                        Gb.call(d, e)
                    }
                }) : (a._v = c, a._s = 1, Vd(a, false))
            } catch(d) {
                Gb.call({
                    _w: a,
                    _d: false
                },
                d)
            }
        }
    };
    if (!Pc) {
        Qa = function(c) {
            Lc(this, Qa, "Promise", "_h");
            ib(c);
            Xd.call(this);
            try {
                c(ka(Wd, this, 1), ka(Gb, this, 1))
            } catch(a) {
                Gb.call(this, a)
            }
        };
        var Xd = function(c) {
            this._c = [];
            this._a = void 0;
            this._s = 0;
            this._d = false;
            this._v = void 0;
            this._h = 0;
            this._n = false
        };
        Xd.prototype = Ud(Qa.prototype, {
            then: function(c, a) {
                var b = jc(Lf(this, Qa));
                b.ok = "function" == typeof c ? c: true;
                b.fail = "function" == typeof a && a;
                b.domain = ic ? Fb.domain: void 0;
                this._c.push(b);
                this._a && this._a.push(b);
                this._s && Vd(this, false);
                return b.promise
            },
            "catch": function(c) {
                return this.then(void 0, c)
            }
        });
        var Xi = function() {
            var c = new Xd;
            this.promise = c;
            this.resolve = ka(Wd, c, 1);
            this.reject = ka(Gb, c, 1)
        };
        Mc.f = jc = function(c) {
            return c === Qa || c === bg ? new Xi(c) : $f(c)
        }
    }
    F(F.G + F.W + F.F * !Pc, {
        Promise: Qa
    });
    kb(Qa, "Promise");
    Wf("Promise");
    var bg = X.Promise;
    F(F.S + F.F * !Pc, "Promise", {
        reject: function(c) {
            var a = jc(this),
            b = a.reject;
            b(c);
            return a.promise
        }
    });
    F(F.S + 1 * F.F, "Promise", {
        resolve: function(c) {
            return Td(this === bg ? Qa: this, c)
        }
    });
    F(F.S + F.F * !(Pc && pf(function(c) {
        Qa.all(c)["catch"](Oc)
    })), "Promise", {
        all: function(c) {
            var a = this,
            b = jc(a),
            d = b.resolve,
            e = b.reject,
            g = Nc(function() {
                var b = [],
                g = 0,
                l = 1;
                pb(c, false,
                function(c) {
                    var h = g++,
                    k = false;
                    b.push(void 0);
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
            e = Nc(function() {
                pb(c, false,
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
            var a = Lf(this, X.Promise || P.Promise),
            b = "function" == typeof c;
            return this.then(b ?
            function(b) {
                return Td(a, c()).then(function() {
                    return b
                })
            }: c, b ?
            function(b) {
                return Td(a, c()).then(function() {
                    throw b;
                })
            }: c)
        }
    });
    F(F.S, "Promise", {
        "try": function(c) {
            var a = Mc.f(this);
            c = Nc(c); (c.e ? a.reject: a.resolve)(c.v);
            return a.promise
        }
    });
    var Yi = X.Promise,
    Zi = O(function(c) {
        c.exports = {
            "default": Yi,
            __esModule: true
        }
    }),
    cg = Q(Zi),
    eb = function(c, a) {
        if (!oa(c) || c._t !== a) throw TypeError("Incompatible receiver, " + a + " required!");
        return c
    },
    $i = za.f,
    dg = Dc.fastKey,
    kc = Ca ? "_s": "size",
    Qc = function(c, a) {
        var b = dg(a);
        if ("F" !== b) return c._i[b];
        for (c = c._f; c; c = c.n) if (c.k == a) return c
    },
    Yd = {
        getConstructor: function(c, a, b, d) {
            var e = c(function(c, k) {
                Lc(c, e, a, "_i");
                c._t = a;
                c._i = bb(null);
                c._f = void 0;
                c._l = void 0;
                c[kc] = 0;
                void 0 != k && pb(k, b, c[d], c)
            });
            Ud(e.prototype, {
                clear: function() {
                    for (var b = eb(this, a), c = b._i, d = b._f; d; d = d.n) d.r = true,
                    d.p && (d.p = d.p.n = void 0),
                    delete c[d.i];
                    b._f = b._l = void 0;
                    b[kc] = 0
                },
                "delete": function(b) {
                    var c = eb(this, a);
                    if (b = Qc(c, b)) {
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
                    eb(this, a);
                    for (var c = ka(b, 1 < arguments.length ? arguments[1] : void 0, 3), d; d = d ? d.n: this._f;) for (c(d.v, d.k, this); d && d.r;) d = d.p
                },
                has: function(b) {
                    return !! Qc(eb(this, a), b)
                }
            });
            Ca && $i(e.prototype, "size", {
                get: function() {
                    return eb(this, a)[kc]
                }
            });
            return e
        },
        def: function(c, a, b) {
            var d = Qc(c, a),
            e;
            d ? d.v = b: (c._l = d = {
                i: e = dg(a, true),
                k: a,
                v: b,
                p: a = c._l,
                n: void 0,
                r: false
            },
            c._f || (c._f = d), a && (a.n = d), c[kc]++, "F" !== e && (c._i[e] = d));
            return c
        },
        getEntry: Qc,
        setStrong: function(c, a, b) {
            qd(c, a,
            function(b, c) {
                this._t = eb(b, a);
                this._k = c;
                this._l = void 0
            },
            function() {
                for (var a = this._k,
                b = this._l; b && b.r;) b = b.p;
                return this._t && (this._l = b = b ? b.n: this._t._f) ? "keys" == a ? cb(0, b.k) : "values" == a ? cb(0, b.v) : cb(0, [b.k, b.v]) : (this._t = void 0, cb(1))
            },
            b ? "entries": "values", !b, true);
            Wf(a)
        }
    },
    aj = ia("species"),
    bj = function(c, a) {
        if (vd(c)) {
            var b = c.constructor;
            "function" != typeof b || b !== Array && !vd(b.prototype) || (b = void 0);
            oa(b) && (b = b[aj], null === b && (b = void 0))
        }
        return new(void 0 === b ? Array: b)(a)
    },
    cj = za.f,
    dj = function(c, a) {
        var b = 1 == c,
        d = 2 == c,
        e = 3 == c,
        g = 4 == c,
        k = 6 == c,
        h = 5 == c || k,
        l = a || bj;
        return function(a, p, m) {
            var n = Object(Za(a)),
            r = id(n);
            p = ka(p, m, 3);
            m = uc(r.length);
            var u = 0;
            a = b ? l(a, m) : d ? l(a, 0) : void 0;
            for (var w, t; m > u; u++) if (h || u in r) if (w = r[u], t = p(w, u, n), c) if (b) a[u] = t;
            else if (t) switch (c) {
            case 3:
                return ! 0;
            case 5:
                return w;
            case 6:
                return u;
            case 2:
                a.push(w)
            } else if (g) return ! 1;
            return k ? -1 : e || g ? g: a
        }
    } (0); (function(c, a, b, d, e, g) {
        var k = P[c],
        h = k,
        l = e ? "set": "add",
        n = h && h.prototype,
        p = {};
        Ca && "function" == typeof h && (g || n.forEach && !$a(function() { (new h).entries().next()
        })) ? (h = a(function(a, b) {
            Lc(a, h, c, "_c");
            a._c = new k;
            void 0 != b && pb(b, e, a[l], a)
        }), dj("add clear delete forEach get has set keys values entries toJSON".split(" "),
        function(a) {
            var b = "add" == a || "set" == a;
            a in n && (!g || "clear" != a) && Ta(h.prototype, a,
            function(c, d) {
                Lc(this, h, a);
                if (!b && g && !oa(c)) return "get" == a ? void 0 : false;
                c = this._c[a](0 === c ? 0 : c, d);
                return b ? this: c
            })
        }), g || cj(h.prototype, "size", {
            get: function() {
                return this._c.size
            }
        })) : (h = d.getConstructor(a, c, e, l), Ud(h.prototype, b), Dc.NEED = true);
        kb(h, c);
        p[c] = h;
        F(F.G + F.W + F.F, p);
        g || d.setStrong(h, c, e);
        return h
    })("Map",
    function(c) {
        return function() {
            return c(this, 0 < arguments.length ? arguments[0] : void 0)
        }
    },
    {
        get: function(c) {
            return (c = Yd.getEntry(eb(this, "Map"), c)) && c.v
        },
        set: function(c, a) {
            return Yd.def(eb(this, "Map"), 0 === c ? 0 : c, a)
        }
    },
    Yd, true);
    F(F.P + F.R, "Map", {
        toJSON: function(c) {
            return function() {
                if (Ic(this) != c) throw TypeError(c + "#toJSON isn't generic");
                var a = [];
                pb(this, false, a.push, a, void 0);
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
                ib(this); (d = void 0 !== b) && ib(b);
                if (void 0 == a) return new this;
                var g = [];
                if (d) {
                    var k = 0;
                    var h = ka(b, c, 2);
                    pb(a, false,
                    function(a) {
                        g.push(h(a, k++))
                    })
                } else pb(a, false, g.push, g);
                return new this(g)
            }
        })
    })("Map");
    var ej = X.Map,
    fj = O(function(c) {
        c.exports = {
            "default": ej,
            __esModule: true
        }
    }),
    eg = Q(fj),
    IconLayer = function(c) {
        function a(b, c) {
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b, c));
            b.index = [];
            c = b.canvas = document.createElement("canvas");
            c = b.ctx = c.getContext("2d");
            c.textAlign = "start";
            c.textBaseline = "top";
            return b
        }
        S(a, c);
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
                var b = this;
                this.gl && (this.loadTextureTime && clearTimeout(this.loadTextureTime), this.loadTextureTime = setTimeout(function() {
                    b.processCache(a, c)
                },
                0))
            }
        },
        {
            key: "processCache",
            value: function(a, c) {
                var b = this;
                this.cachedData = [];
                this.iconHash = new eg;
                for (var d = a.icon,
                k = a.width,
                h = a.height,
                l = a.offset,
                n = 0; n < c.length; n++) {
                    var p = this.normizedPoint(c[n].geometry.coordinates),
                    m = c[n].icon || d;
                    "properties" in c[n] && "icon" in c[n].properties && (m = c[n].properties.icon);
                    var q = c[n].width || k;
                    "properties" in c[n] && "width" in c[n].properties && (q = c[n].properties.width);
                    var r = c[n].height || h;
                    "properties" in c[n] && "height" in c[n].properties && (r = c[n].properties.height);
                    var u = c[n].offset || l;
                    "properties" in c[n] && "offset" in c[n].properties && (u = c[n].properties.offset);
                    p && m && (this.cachedData.push({
                        point: p,
                        icon: m,
                        width: q,
                        height: r,
                        offset: u
                    }), p = new Image, this.iconHash.get(m) || this.iconHash.set(m, p))
                }
                c = Th(this.iconHash.keys()).map(function(a) {
                    return new cg(function(c, d) {
                        b.url2canvas(a,
                        function(d) {
                            b.iconHash.set(a, d);
                            c()
                        })
                    })
                });
                cg.all(c).then(function(c) {
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
                k = [],
                h = new eg,
                l = true,
                n = false,
                p = void 0;
                try {
                    for (var m = gd(this.iconHash), q; ! (l = (q = m.next()).done); l = true) {
                        var r = db(q.value, 2),
                        u = r[1],
                        w = u.width,
                        t = u.height;
                        k.push({
                            w: w + b[0],
                            h: t + b[0],
                            width: w,
                            height: t,
                            key: r[0],
                            icon: u
                        })
                    }
                } catch(z) {
                    n = true,
                    p = z
                } finally {
                    try { ! l && m.
                        return && m.
                        return ()
                    } finally {
                        if (n) throw p;
                    }
                }
                n = Ee(k);
                for (l = 0; l < k.length; l++) p = k[l],
                h.get(p.key) || h.set(p.key, p);
                l = ceilPowerOfTwo(n.w);
                n = ceilPowerOfTwo(n.h);
                c.width = l;
                c.height = n;
                g.save();
                for (c = 0; c < k.length; c++) p = k[c],
                g.drawImage(p.icon, p.x + b[0], p.y + b[1], p.width, p.height);
                g.restore();
                this.loadTexture();
                this.buildVertex(a, h, l, n)
            }
        },
        {
            key: "buildVertex",
            value: function(a, c, e, g) {
                a = a.enablePicked;
                for (var b = [], d = [], l = [], n = [], p = 0; p < this.cachedData.length; p++) {
                    var m = this.cachedData[p],
                    q = m.point,
                    r = m.width,
                    u = m.height,
                    w = m.offset;
                    m = c.get(m.icon);
                    r = r || m.icon.width;
                    u = u || m.icon.height;
                    w = w || [0, -u / 2];
                    var t = db(q, 3);
                    q = t[0];
                    var x = t[1];
                    t = t[2];
                    for (var v = 0; 4 > v; v++) b.push(q, x, t),
                    b.push(v),
                    b.push(r, u),
                    b.push.apply(b, W(w));
                    r = m.x / e;
                    u = (m.x + m.w) / e;
                    w = (m.y + m.h) / g;
                    m = m.y / g;
                    d.push(r, w, r, m, u, m, u, w);
                    m = 4 * p;
                    l.push(m, m + 2, m + 1, m, m + 3, m + 2);
                    a && (m = this.indexToRgb(p), n.push(m[0] / 255, m[1] / 255, m[2] / 255), n.push(m[0] / 255, m[1] / 255, m[2] / 255), n.push(m[0] / 255, m[1] / 255, m[2] / 255), n.push(m[0] / 255, m[1] / 255, m[2] / 255))
                }
                this.index = l;
                this.vertexBuffer.updateData(new Float32Array(b));
                this.uvBuffer.updateData(new Float32Array(d));
                this.indexBuffer.updateData(new Uint32Array(l));
                a && this.pickBuffer.updateData(new Float32Array(n))
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
                    g.setUniforms(T(this.getCommonUniforms(a), {
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
                if ("object" === ("undefined" === typeof a ? "undefined": qb(a))) c(a);
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
                    b.src = a
                }
            }
        },
        {
            key: "loadTexture",
            value: function() {
                var a = this;
                this.canvas ? loadTextureImage(this.gl, this.canvas,
                function(b) {
                    a.texture = b
                }) : this.texture = null
            }
        }]);
        return a
    } (Layer),
    PolygonLayer = function(c) {
        function a(b) {
            G(this, a);
            var c = R(this, (a.__proto__ || N(a)).call(this, b));
            b = c.getOptions();
            c.shapeLayer = new ShapeLayer({
                enablePicked: b.enablePicked
            });
            c.lineLayer = new LineLayer;
            c.children = [c.shapeLayer, c.lineLayer];
            return c
        }
        S(a, c);
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
    } (nb),
    Z = Z || {},
    fg = 0,
    Ja = null,
    ij = Z.Scene = function(c, a) {
        this.name = void 0 !== a.name ? a.name: null;
        this.nodes = Array(a.nodes.length);
        for (var b = 0,
        d = a.nodes.length; b < d; b++) this.nodes[b] = c.nodes[a.nodes[b]];
        this.extensions = void 0 !== a.extensions ? a.extensions: null;
        this.extras = void 0 !== a.extras ? a.extras: null;
        this.boundingBox = null
    },
    Xa = Z.BoundingBox = function(c, a, b) {
        c = c || K.fromValues(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        a = a || K.fromValues(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
        void 0 === b || true === b ? (this.min = K.clone(c), this.max = K.clone(a)) : (this.min = c, this.max = a);
        this.transform = C.create()
    };
    Xa.prototype.updateBoundingBox = function(c) {
        K.min(this.min, this.min, c.min);
        K.max(this.max, this.max, c.max)
    };
    Xa.prototype.calculateTransform = function() {
        this.transform[0] = this.max[0] - this.min[0];
        this.transform[5] = this.max[1] - this.min[1];
        this.transform[10] = this.max[2] - this.min[2];
        this.transform[12] = this.min[0];
        this.transform[13] = this.min[1];
        this.transform[14] = this.min[2]
    };
    Xa.getAABBFromOBB = function() {
        var c = K.create(),
        a = K.create(),
        b = K.create(),
        d = K.create(),
        e = K.create();
        return function(g, k) {
            K.set(c, k[0], k[1], k[2]);
            K.set(a, k[4], k[5], k[6]);
            K.set(b, k[8], k[9], k[10]);
            k = K.fromValues(k[12], k[13], k[14]);
            var h = K.clone(k);
            K.scale(d, c, g.min[0]);
            K.scale(e, c, g.max[0]);
            K.min(c, d, e);
            K.add(k, k, c);
            K.max(c, d, e);
            K.add(h, h, c);
            K.scale(d, a, g.min[1]);
            K.scale(e, a, g.max[1]);
            K.min(a, d, e);
            K.add(k, k, a);
            K.max(a, d, e);
            K.add(h, h, a);
            K.scale(d, b, g.min[2]);
            K.scale(e, b, g.max[2]);
            K.min(b, d, e);
            K.add(k, k, b);
            K.max(b, d, e);
            K.add(h, h, b);
            g = new Xa(k, h, false);
            g.calculateTransform();
            return g
        }
    } ();
    var gg = Z.Accessor = function(c, a) {
        this.bufferView = a;
        this.componentType = c.componentType;
        this.byteOffset = void 0 !== c.byteOffset ? c.byteOffset: 0;
        this.byteStride = a.byteStride;
        this.normalized = void 0 !== c.normalized ? c.normalized: false;
        this.count = c.count;
        this.type = c.type;
        this.size = hd[this.type];
        this.min = c.min;
        this.max = c.max;
        this.extensions = void 0 !== c.extensions ? c.extensions: null;
        this.extras = void 0 !== c.extras ? c.extras: null
    };
    gg.prototype.prepareVertexAttrib = function(c, a) {
        a.vertexAttribPointer(c, this.size, this.componentType, this.normalized, this.byteStride, this.byteOffset);
        a.enableVertexAttribArray(c)
    };
    var Zd = Z.BufferView = function(c, a) {
        this.byteLength = c.byteLength;
        this.byteOffset = void 0 !== c.byteOffset ? c.byteOffset: 0;
        this.byteStride = void 0 !== c.byteStride ? c.byteStride: 0;
        this.target = void 0 !== c.target ? c.target: null;
        this.data = a.slice(this.byteOffset, this.byteOffset + this.byteLength);
        this.extensions = void 0 !== c.extensions ? c.extensions: null;
        this.extras = void 0 !== c.extras ? c.extras: null;
        this.buffer = null
    };
    Zd.prototype.createBuffer = function(c) {
        this.buffer = c.createBuffer()
    };
    Zd.prototype.bindData = function(c) {
        return this.target ? (c.bindBuffer(this.target, this.buffer), c.bufferData(this.target, this.data, c.STATIC_DRAW), c.bindBuffer(this.target, null), true) : false
    };
    var jj = Z.Camera = function(c) {
        this.name = void 0 !== c.name ? c.name: null;
        this.type = c.type;
        this.othographic = void 0 === c.othographic ? null: c.othographic;
        this.perspective = void 0 === c.perspective ? null: {
            yfov: c.perspective.yfov,
            znear: c.perspective.znear,
            zfar: void 0 !== c.perspective.zfar ? c.perspective.zfar: null,
            aspectRatio: void 0 !== c.perspective.aspectRatio ? c.perspective.aspectRatio: null
        };
        this.extensions = void 0 !== c.extensions ? c.extensions: null;
        this.extras = void 0 !== c.extras ? c.extras: null
    },
    Hb = Z.Node = function(c, a) {
        this.name = void 0 !== c.name ? c.name: null;
        this.nodeID = a;
        this.camera = void 0 !== c.camera ? c.camera: null;
        this.matrix = C.create();
        if (c.hasOwnProperty("matrix")) {
            for (a = 0; 16 > a; ++a) this.matrix[a] = c.matrix[a];
            this.translation = K.create();
            C.getTranslation(this.translation, this.matrix);
            this.rotation = tc.create();
            C.getRotation(this.rotation, this.matrix);
            this.scale = K.create();
            C.getScaling(this.scale, this.matrix)
        } else this.getTransformMatrixFromTRS(c.translation, c.rotation, c.scale);
        this.children = c.children || [];
        this.mesh = void 0 !== c.mesh ? Ja.glTF.meshes[c.mesh] : null;
        this.skin = void 0 !== c.skin ? c.skin: null;
        void 0 !== c.extensions && void 0 !== c.extensions.gl_avatar && true === Ja.enableGLAvatar && (this.skin = new kj(Ja.glTF, Ja.skeletonGltf.skins[Ja.skeletonGltf.json.extensions.gl_avatar.skins[c.extensions.gl_avatar.skin.name]], c.extensions.gl_avatar.skin.inverseBindMatrices));
        this.weights = void 0 !== c.weights ? c.weights: null;
        this.extensions = void 0 !== c.extensions ? c.extensions: null;
        this.extras = void 0 !== c.extras ? c.extras: null;
        this.aabb = null;
        this.bvh = new Xa
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
    var hg = C.create();
    Hb.prototype.getTransformMatrixFromTRS = function(c, a, b) {
        this.translation = void 0 !== c ? K.fromValues(c[0], c[1], c[2]) : K.fromValues(0, 0, 0);
        this.rotation = void 0 !== a ? Fa.fromValues(a[0], a[1], a[2], a[3]) : Fa.fromValues(0, 0, 0, 1);
        this.scale = void 0 !== b ? K.fromValues(b[0], b[1], b[2]) : K.fromValues(1, 1, 1);
        this.updateMatrixFromTRS()
    };
    Hb.prototype.updateMatrixFromTRS = function() {
        C.fromRotationTranslation(hg, this.rotation, this.translation);
        C.scale(this.matrix, hg, this.scale)
    };
    var mj = Z.Mesh = function(c, a) {
        this.meshID = a;
        this.name = void 0 !== c.name ? c.name: null;
        this.primitives = [];
        this.boundingBox = null;
        a = 0;
        for (var b = c.primitives.length; a < b; ++a) {
            var d = c.primitives[a];
            d = new lj(Ja.glTF, d);
            this.primitives.push(d);
            d.boundingBox && (this.boundingBox || (this.boundingBox = new Xa), this.boundingBox.updateBoundingBox(d.boundingBox))
        }
        this.boundingBox && this.boundingBox.calculateTransform();
        this.weights = void 0 !== c.weights ? c.weights: null;
        this.extensions = void 0 !== c.extensions ? c.extensions: null;
        this.extras = void 0 !== c.extras ? c.extras: null
    },
    lj = Z.Primitive = function(c, a) {
        this.attributes = a.attributes;
        this.indices = void 0 !== a.indices ? a.indices: null;
        var b;
        if (void 0 !== a.extensions && void 0 !== a.extensions.gl_avatar && true === Ja.enableGLAvatar && a.extensions.gl_avatar.attributes) for (b in a.extensions.gl_avatar.attributes) this.attributes[b] = a.extensions.gl_avatar.attributes[b];
        null !== this.indices ? (this.indicesComponentType = c.json.accessors[this.indices].componentType, this.indicesLength = c.json.accessors[this.indices].count, this.indicesOffset = c.json.accessors[this.indices].byteOffset || 0) : (this.drawArraysCount = c.json.accessors[this.attributes.POSITION].count, this.drawArraysOffset = c.json.accessors[this.attributes.POSITION].byteOffset || 0);
        for (b in this.attributes) this.attributes[b] = c.accessors[this.attributes[b]];
        this.material = void 0 !== a.material ? c.materials[a.material] : null;
        this.mode = void 0 !== a.mode ? a.mode: 4;
        this.targets = a.targets;
        this.extensions = void 0 !== a.extensions ? a.extensions: null;
        this.extras = void 0 !== a.extras ? a.extras: null;
        this.boundingBox = this.shader = this.indexBuffer = this.vertexBuffer = this.vertexArray = null;
        void 0 !== this.attributes.POSITION && (c = this.attributes.POSITION, c.max && "VEC3" === c.type && (this.boundingBox = new Xa(K.fromValues(c.min[0], c.min[1], c.min[2]), K.fromValues(c.max[0], c.max[1], c.max[2]), false), this.boundingBox.calculateTransform()))
    },
    ig = Z.Texture = function(c) {
        this.name = void 0 !== c.name ? c.name: null;
        this.sampler = void 0 !== c.sampler ? Ja.glTF.samplers[c.sampler] : null;
        this.source = void 0 !== c.source ? Ja.glTF.images[c.source] : null;
        this.extensions = void 0 !== c.extensions ? c.extensions: null;
        this.extras = void 0 !== c.extras ? c.extras: null;
        this.texture = null
    };
    ig.prototype.createTexture = function(c) {
        this.texture = c.createTexture();
        c.bindTexture(c.TEXTURE_2D, this.texture);
        c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, c.RGBA, c.UNSIGNED_BYTE, this.source);
        c.generateMipmap(c.TEXTURE_2D);
        c.bindTexture(c.TEXTURE_2D, null)
    };
    var jg = Z.Sampler = function(c) {
        this.name = void 0 !== c.name ? c.name: null;
        this.magFilter = void 0 !== c.magFilter ? c.magFilter: null;
        this.minFilter = void 0 !== c.minFilter ? c.minFilter: null;
        this.wrapS = void 0 !== c.wrapS ? c.wrapS: 10497;
        this.wrapT = void 0 !== c.wrapT ? c.wrapT: 10497;
        this.extensions = void 0 !== c.extensions ? c.extensions: null;
        this.extras = void 0 !== c.extras ? c.extras: null;
        this.sampler = null
    };
    jg.prototype.createSampler = function(c) {
        this.sampler = c.createSampler();
        this.minFilter ? c.samplerParameteri(this.sampler, c.TEXTURE_MIN_FILTER, this.minFilter) : c.samplerParameteri(this.sampler, c.TEXTURE_MIN_FILTER, c.NEAREST_MIPMAP_LINEAR);
        this.magFilter ? c.samplerParameteri(this.sampler, c.TEXTURE_MAG_FILTER, this.magFilter) : c.samplerParameteri(this.sampler, c.TEXTURE_MAG_FILTER, c.LINEAR);
        c.samplerParameteri(this.sampler, c.TEXTURE_WRAP_S, this.wrapS);
        c.samplerParameteri(this.sampler, c.TEXTURE_WRAP_T, this.wrapT)
    };
    var $d = Z.TextureInfo = function(c) {
        this.index = c.index;
        this.texCoord = void 0 !== c.texCoord ? c.texCoord: 0;
        this.extensions = void 0 !== c.extensions ? c.extensions: null;
        this.extras = void 0 !== c.extras ? c.extras: null
    },
    kg = Z.PbrMetallicRoughness = function(c) {
        this.baseColorFactor = void 0 !== c.baseColorFactor ? c.baseColorFactor: [1, 1, 1, 1];
        this.baseColorTexture = void 0 !== c.baseColorTexture ? new $d(c.baseColorTexture) : null;
        this.metallicFactor = void 0 !== c.metallicFactor ? c.metallicFactor: 1;
        this.roughnessFactor = void 0 !== c.roughnessFactor ? c.roughnessFactor: 1;
        this.metallicRoughnessTexture = void 0 !== c.metallicRoughnessTexture ? new $d(c.metallicRoughnessTexture) : null;
        this.extensions = void 0 !== c.extensions ? c.extensions: null;
        this.extras = void 0 !== c.extras ? c.extras: null
    },
    nj = Z.NormalTextureInfo = function(c) {
        this.index = c.index;
        this.texCoord = void 0 !== c.texCoord ? c.texCoord: 0;
        this.scale = void 0 !== c.scale ? c.scale: 1;
        this.extensions = void 0 !== c.extensions ? c.extensions: null;
        this.extras = void 0 !== c.extras ? c.extras: null
    },
    oj = Z.OcclusionTextureInfo = function(c) {
        this.index = c.index;
        this.texCoord = void 0 !== c.texCoord ? c.texCoord: 0;
        this.strength = void 0 !== c.strength ? c.strength: 1;
        this.extensions = void 0 !== c.extensions ? c.extensions: null;
        this.extras = void 0 !== c.extras ? c.extras: null
    },
    pj = Z.Material = function(c) {
        this.name = void 0 !== c.name ? c.name: null;
        this.pbrMetallicRoughness = void 0 !== c.pbrMetallicRoughness ? new kg(c.pbrMetallicRoughness) : new kg({
            baseColorFactor: [1, 1, 1, 1],
            metallicFactor: 1,
            metallicRoughnessTexture: 1
        });
        this.normalTexture = void 0 !== c.normalTexture ? new nj(c.normalTexture) : null;
        this.occlusionTexture = void 0 !== c.occlusionTexture ? new oj(c.occlusionTexture) : null;
        this.emissiveTexture = void 0 !== c.emissiveTexture ? new $d(c.emissiveTexture) : null;
        this.emissiveFactor = void 0 !== c.emissiveFactor ? c.emissiveFactor: [0, 0, 0];
        this.alphaMode = void 0 !== c.alphaMode ? c.alphaMode: "OPAQUE";
        this.alphaCutoff = void 0 !== c.alphaCutoff ? c.alphaCutoff: .5;
        this.doubleSided = c.doubleSided || false;
        this.extensions = void 0 !== c.extensions ? c.extensions: null;
        this.extras = void 0 !== c.extras ? c.extras: null
    },
    qj = Z.Skin = function(c, a, b) {
        this.name = void 0 !== a.name ? a.name: null;
        this.skinID = b;
        this.joints = Array(a.joints.length);
        var d;
        b = 0;
        for (d = this.joints.length; b < d; b++) this.joints[b] = c.nodes[a.joints[b]];
        this.skeleton = void 0 !== a.skeleton ? c.nodes[a.skeleton] : null;
        this.inverseBindMatrices = void 0 !== a.inverseBindMatrices ? c.accessors[a.inverseBindMatrices] : null;
        this.extensions = void 0 !== a.extensions ? a.extensions: null;
        this.extras = void 0 !== a.extras ? a.extras: null;
        this.uniformBlockID = fg++;
        if (this.inverseBindMatrices) for (this.inverseBindMatricesData = sc(this.inverseBindMatrices), this.inverseBindMatrix = [], this.jointMatrixUniformBuffer = null, this.jointMatrixUnidormBufferData = new Float32Array(1040), b = 0, d = this.inverseBindMatricesData.length; b < d; b += 16) this.inverseBindMatrix.push(C.fromValues(this.inverseBindMatricesData[b], this.inverseBindMatricesData[b + 1], this.inverseBindMatricesData[b + 2], this.inverseBindMatricesData[b + 3], this.inverseBindMatricesData[b + 4], this.inverseBindMatricesData[b + 5], this.inverseBindMatricesData[b + 6], this.inverseBindMatricesData[b + 7], this.inverseBindMatricesData[b + 8], this.inverseBindMatricesData[b + 9], this.inverseBindMatricesData[b + 10], this.inverseBindMatricesData[b + 11], this.inverseBindMatricesData[b + 12], this.inverseBindMatricesData[b + 13], this.inverseBindMatricesData[b + 14], this.inverseBindMatricesData[b + 15]))
    },
    kj = Z.SkinLink = function(c, a, b) {
        this.isLink = true;
        c.skins || (c.skins = []);
        c.skins.push(this);
        this.name = a.name;
        this.skinID = c.skins.length - 1;
        this.joints = a.joints;
        this.skeleton = a.skeleton;
        this.inverseBindMatrices = void 0 !== b ? c.accessors[b] : null;
        this.uniformBlockID = fg++;
        if (this.inverseBindMatrices) for (this.inverseBindMatricesData = sc(this.inverseBindMatrices), this.inverseBindMatrix = [], this.jointMatrixUniformBuffer = null, this.jointMatrixUnidormBufferData = new Float32Array(1040), c = 0, a = this.inverseBindMatricesData.length; c < a; c += 16) this.inverseBindMatrix.push(C.fromValues(this.inverseBindMatricesData[c], this.inverseBindMatricesData[c + 1], this.inverseBindMatricesData[c + 2], this.inverseBindMatricesData[c + 3], this.inverseBindMatricesData[c + 4], this.inverseBindMatricesData[c + 5], this.inverseBindMatricesData[c + 6], this.inverseBindMatricesData[c + 7], this.inverseBindMatricesData[c + 8], this.inverseBindMatricesData[c + 9], this.inverseBindMatricesData[c + 10], this.inverseBindMatricesData[c + 11], this.inverseBindMatricesData[c + 12], this.inverseBindMatricesData[c + 13], this.inverseBindMatricesData[c + 14], this.inverseBindMatricesData[c + 15]))
    },
    rj = Z.Target = function(c) {
        this.nodeID = void 0 !== c.node ? c.node: null;
        this.path = c.path;
        this.extensions = void 0 !== c.extensions ? c.extensions: null;
        this.extras = void 0 !== c.extras ? c.extras: null
    },
    sj = Z.Channel = function(c, a) {
        this.sampler = a.samplers[c.sampler];
        this.target = new rj(c.target);
        this.extensions = void 0 !== c.extensions ? c.extensions: null;
        this.extras = void 0 !== c.extras ? c.extras: null
    },
    lg = Z.AnimationSampler = function(c, a) {
        this.input = c.accessors[a.input];
        this.output = c.accessors[a.output];
        this.inputTypedArray = sc(this.input);
        this.outputTypedArray = sc(this.output);
        this.interpolation = void 0 !== a.interpolation ? a.interpolation: "LINEAR";
        this.extensions = void 0 !== a.extensions ? a.extensions: null;
        this.extras = void 0 !== a.extras ? a.extras: null;
        this.curIdx = 0;
        this.curValue = Fa.create();
        this.endT = this.inputTypedArray[this.inputTypedArray.length - 1];
        this.inputMax = this.endT - this.inputTypedArray[0]
    },
    mg = Fa.create(),
    ng = Fa.create();
    lg.prototype.getValue = function(c) {
        c > this.endT && (c -= this.inputMax * Math.ceil((c - this.endT) / this.inputMax), this.curIdx = 0);
        for (var a = this.inputTypedArray.length; this.curIdx <= a - 2 && c >= this.inputTypedArray[this.curIdx + 1];) this.curIdx++;
        this.curIdx >= a - 1 && (c -= this.inputMax, this.curIdx = 0);
        a = hd[this.output.type];
        var b = 4 === a ? tc.slerp: Fa.lerp,
        d = this.curIdx,
        e = d * a,
        g = e + a;
        c = Math.max(0, c - this.inputTypedArray[d]) / (this.inputTypedArray[d + 1] - this.inputTypedArray[d]);
        for (d = 0; d < a; d++) mg[d] = this.outputTypedArray[e + d],
        ng[d] = this.outputTypedArray[g + d];
        switch (this.interpolation) {
        case "LINEAR":
            b(this.curValue, mg, ng, c)
        }
    };
    var tj = Z.Animation = function(c, a) {
        this.name = void 0 !== a.name ? a.name: null;
        var b;
        this.samplers = [];
        var d = 0;
        for (b = a.samplers.length; d < b; d++) this.samplers[d] = new lg(c, a.samplers[d]);
        this.channels = [];
        d = 0;
        for (b = a.channels.length; d < b; d++) this.channels[d] = new sj(a.channels[d], this);
        this.extensions = void 0 !== a.extensions ? a.extensions: null;
        this.extras = void 0 !== a.extras ? a.extras: null
    },
    uj = Z.glTFModel = function(c) {
        this.json = c;
        this.defaultScene = void 0 !== c.scene ? c.scene: 0;
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
        this.extensions = void 0 !== c.extensions ? c.extensions: null;
        this.extras = void 0 !== c.extras ? c.extras: null
    },
    Ib = Z.glTFLoader = function(c) {
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
        Ja = this
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
        this.baseUri = Kg(c);
        var b = this;
        Lg(c,
        function(a) {
            a = JSON.parse(a);
            b.glTF = new uj(a);
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
                var k = a.buffers[c].uri; - 1 === k.indexOf("base64") && (k = b.baseUri + k);
                Mg(k, d)
            }
            d = function(a, c) {
                b._imageLoaded++;
                b.glTF.images[c] = a;
                b._checkComplete()
            };
            var h;
            if (a.images) for (h in a.images) b._imageRequested++,
            Ng(b.baseUri + a.images[h].uri, h, d);
            b._checkComplete()
        })
    };
    Ib.prototype._postprocess = function() {
        function c(a, b) {
            var c = l[a.nodeID];
            null !== b ? C.mul(c, l[b.nodeID], a.matrix) : C.copy(c, a.matrix)
        }
        function a(a, b) {
            var c = l[a.nodeID];
            b = null !== b ? b.bvh: n.boundingBox;
            a.mesh && (e = a.mesh, e.boundingBox && (a.aabb = Xa.getAABBFromOBB(e.boundingBox, c), 0 === a.children.length && (K.copy(a.bvh.min, a.aabb.min), K.copy(a.bvh.max, a.aabb.max))));
            K.min(b.min, b.min, a.bvh.min);
            K.max(b.max, b.max, a.bvh.max)
        }
        Ja = this;
        var b, d, e;
        if (this.glTF.cameras) {
            var g = 0;
            for (b = this.glTF.cameras.length; g < b; g++) this.glTF.cameras[g] = new jj(this.glTF.json.cameras[g])
        }
        if (this.glTF.bufferViews) for (g = 0, b = this.glTF.bufferViews.length; g < b; g++) this.glTF.bufferViews[g] = new Zd(this.glTF.json.bufferViews[g], this._buffers[this.glTF.json.bufferViews[g].buffer]);
        if (this.glTF.accessors) for (g = 0, b = this.glTF.accessors.length; g < b; g++) this.glTF.accessors[g] = new gg(this.glTF.json.accessors[g], this.glTF.bufferViews[this.glTF.json.accessors[g].bufferView]);
        if (this.glTF.materials) for (g = 0, b = this.glTF.materials.length; g < b; g++) this.glTF.materials[g] = new pj(this.glTF.json.materials[g]);
        if (this.glTF.samplers) for (g = 0, b = this.glTF.samplers.length; g < b; g++) this.glTF.samplers[g] = new jg(this.glTF.json.samplers[g]);
        if (this.glTF.textures) for (g = 0, b = this.glTF.textures.length; g < b; g++) this.glTF.textures[g] = new ig(this.glTF.json.textures[g]);
        g = 0;
        for (b = this.glTF.meshes.length; g < b; g++) this.glTF.meshes[g] = new mj(this.glTF.json.meshes[g], g);
        g = 0;
        for (b = this.glTF.nodes.length; g < b; g++) this.glTF.nodes[g] = new Hb(this.glTF.json.nodes[g], g);
        g = 0;
        for (b = this.glTF.nodes.length; g < b; g++) {
            var k = this.glTF.nodes[g];
            var h = 0;
            for (d = k.children.length; h < d; h++) k.children[h] = this.glTF.nodes[k.children[h]]
        }
        var l = Array(this.glTF.nodes.length);
        g = 0;
        for (b = l.length; g < b; g++) l[g] = C.create();
        g = 0;
        for (b = this.glTF.scenes.length; g < b; g++) {
            var n = this.glTF.scenes[g] = new ij(this.glTF, this.glTF.json.scenes[g]);
            n.boundingBox = new Xa;
            h = 0;
            for (d = n.nodes.length; h < d; h++) k = n.nodes[h],
            k.traverseTwoExecFun(null, c, a);
            n.boundingBox.calculateTransform()
        }
        h = 0;
        for (d = this.glTF.nodes.length; h < d; h++) k = this.glTF.nodes[h],
        null !== k.bvh && k.bvh.calculateTransform();
        if (this.glTF.animations) for (g = 0, b = this.glTF.animations.length; g < b; g++) this.glTF.animations[g] = new tj(this.glTF, this.glTF.json.animations[g]);
        if (this.glTF.json.skins) for (g = 0, b = this.glTF.skins.length; g < b; g++) for (this.glTF.skins[g] = new qj(this.glTF, this.glTF.json.skins[g], g), k = this.glTF.skins[g].joints, h = 0, d = k.length; h < d; h++) k[h].jointID = h;
        g = 0;
        for (b = this.glTF.nodes.length; g < b; g++) k = this.glTF.nodes[g],
        null !== k.skin && "number" == typeof k.skin && (k.skin = this.glTF.skins[k.skin])
    };
    var hd = {
        SCALAR: 1,
        VEC2: 2,
        VEC3: 3,
        VEC4: 4,
        MAT2: 4,
        MAT3: 9,
        MAT4: 16
    },
    GltfLayer = function(c) {
        function a(b, c) {
            G(this, a);
            return R(this, (a.__proto__ || N(a)).call(this, b, c))
        }
        S(a, c);
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
                this.gltfObj = Og({
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
                k = g.scale,
                h = [k, k, k];
                "px" === g.unit && this.map && (h = this.map.getZoomUnits(), h = [k * h, k * h, k * h]);
                for (k = 0; k < c.length; k++) {
                    var l = c[k].geometry.coordinates;
                    g = C.create();
                    var n = C.create();
                    l = this.normizedPoint(l);
                    C.identity(g);
                    C.translate(g, g, [l[0], l[1], 0]);
                    C.rotateX(g, g, Math.PI / 2);
                    C.rotateY(g, g, (c[k].angle || 0) * Math.PI / 180);
                    C.scale(g, g, h);
                    C.mul(n, a, g);
                    this.gltfObj.render({
                        gl: b,
                        matrix: n
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
                0 >= --k && c(g)
            }
            for (var g = [], k = b.length, h = 0; h < k; ++h) g.push(a(b[h], d))
        }
    })();
    var CarLineLayer = function(c) {
        function a(b) {
            G(this, a);
            var c = R(this, (a.__proto__ || N(a)).call(this, b));
            b = c.getOptions();
            c.gltfLayer = new GltfLayer({
                url: b.url,
                scale: b.scale
            });
            c.children = [c.gltfLayer];
            c.autoUpdate = true;
            c.index = 0;
            c.isStarted = false === b.autoPlay ? false : true;
            return c
        }
        S(a, c);
        M(a, [{
            key: "onOptionsChanged",
            value: function(a) {
                this.gltfLayer.setOptions({})
            }
        },
        {
            key: "onDataChanged",
            value: function(a) {
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
                for (var a = this.getData(), c = [], e = 0; e < a.length; e++) {
                    var g = a[e].geometry.coordinates;
                    g = this._addPath(g);
                    var k = Math.floor(this.index) % g.length,
                    h = k + 3;
                    h >= g.length - 1 && (h = --k);
                    h = this.getDeg(g[k], g[h]);
                    c.push({
                        geometry: {
                            type: "Point",
                            coordinates: this.getPoint(g[k], g[k + 1], this.index % 1)
                        },
                        angle: h - 90
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
                    step: .5
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
                g = [], k = [], h = 1; h < b; h++) {
                    var l = this.getDistance(a[h - 1], a[h]);
                    g.push(l);
                    c += l
                }
                l = [0];
                for (h = 1; h < b; h++) {
                    var n = (g[h - 1] / c).toFixed(2);
                    l[h] = l[h - 1] + parseFloat(n, 10);
                    k = k.concat(this._getPath(a[h - 1], a[h], 1E3 * n))
                }
                this._pathPercents = l;
                return k
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
                Wa(a.prototype.__proto__ || N(a.prototype), "render", this).call(this, b);
                b = this.getOptions();
                this.isStarted && (this.index += b.step);
                this.updatePoints()
            }
        }]);
        return a
    } (nb);
    ca.prototype.parseColors = function(c) {
        this.arrFeatureStyles = [[2, c[0] || "rgba(79,210,125,1)", 2, 2, 0, [], 0, 0], [2, c[0] || "rgba(79,210,125,1)", 3, 2, 0, [], 0, 0], [2, c[0] || "rgba(79,210,125,1)", 3, 2, 0, [], 0, 0], [2, c[0] || "rgba(79,210,125,1)", 5, 2, 0, [], 0, 0], [2, c[0] || "rgba(79,210,125,1)", 6, 2, 0, [], 0, 0], [2, c[2] || "rgba(255,208,69,1)", 2, 2, 0, [], 0, 0], [2, c[2] || "rgba(255,208,69,1)", 3, 2, 0, [], 0, 0], [2, c[2] || "rgba(255,208,69,1)", 3, 2, 0, [], 0, 0], [2, c[2] || "rgba(255,208,69,1)", 5, 2, 0, [], 0, 0], [2, c[2] || "rgba(255,208,69,1)", 6, 2, 0, [], 0, 0], [2, c[1] || "rgba(232,14,14,1)", 2, 2, 0, [], 0, 0], [2, c[1] || "rgba(232,14,14,1)", 3, 2, 0, [], 0, 0], [2, c[1] || "rgba(232,14,14,1)", 3, 2, 0, [], 0, 0], [2, c[1] || "rgba(232,14,14,1)", 5, 2, 0, [], 0, 0], [2, c[1] || "rgba(232,14,14,1)", 6, 2, 0, [], 0, 0], [2, c[3] || "rgba(181,0,0,1)", 2, 2, 0, [], 0, 0], [2, c[3] || "rgba(181,0,0,1)", 3, 2, 0, [], 0, 0], [2, c[3] || "rgba(181,0,0,1)", 3, 2, 0, [], 0, 0], [2, c[3] || "rgba(181,0,0,1)", 5, 2, 0, [], 0, 0], [2, c[3] || "rgba(181,0,0,1)", 6, 2, 0, [], 0, 0], [2, "rgba(255,255,255,1)", 4, 0, 0, [], 0, 0], [2, "rgba(255,255,255,1)", 5.5, 0, 0, [], 0, 0], [2, "rgba(255,255,255,1)", 7, 0, 0, [], 0, 0], [2, "rgba(255,255,255,1)", 8.5, 0, 0, [], 0, 0], [2, "rgba(255,255,255,1)", 10, 0, 0, [], 0, 0]]
    };
    ca.prototype.setColors = function(c) {
        this.parseColors(c)
    };
    ca.prototype.initialize = function(c) {
        this._initialize || (this._initialize = true)
    };
    ca.prototype.clearCache = function(c) {
        this.cache = {}
    };
    ca.prototype.setMap = function(c) {
        c ? (this.map = c, this._initialize ? this.canvaslayer.show() : this.initialize(c)) : this.canvaslayer.hide()
    };
    ca.prototype.draw = function(c) {
        c = c || {};
        c.clearCache && this.clearCache();
        this.canvaslayer.draw()
    };
    ca.prototype.clear = function() {};
    ca.prototype.update = function() {
        var c = this.map,
        a = this.getDataZoom(),
        b = Math.pow(2, 18 - a),
        d = 256 * b,
        e = c.getCenter(),
        g = Math.ceil(e.lng / d),
        k = Math.ceil(e.lat / d),
        h = this.tileSize,
        l = a - Math.round(c.getZoom());
        0 < l && (h /= Math.pow(2, l));
        d = [g, k, (e.lng - g * d) / d * h, (e.lat - k * d) / d * h];
        g = c.getBounds();
        e = g.getNorthEast();
        g = g.getSouthWest();
        c.getSize();
        c.getSize();
        c = (e.lng - g.lng) / b;
        b = (e.lat - g.lat) / b;
        e = d[1] - Math.ceil((b / 2 - d[3]) / h);
        g = d[0] + Math.ceil((c / 2 + d[2]) / h);
        k = d[1] + Math.ceil((b / 2 + d[3]) / h);
        b = [];
        for (h = d[0] - Math.ceil((c / 2 - d[2]) / h); h < g; h++) for (d = e; d < k; d++) b.push([h, d, a]);
        this.tilesOrder = b;
        this._loadCount = {};
        for (h = 0; h < b.length; h++) d = b[h][0],
        c = b[h][1],
        this._loadCount[d + "_" + c + "_" + b[h][2]] = false;
        for (h = 0; h < b.length; h++) d = b[h][0],
        c = b[h][1],
        this.showTile(d, c, a)
    };
    ca.prototype.showTile = function(c, a, b) {
        this._parseDataAndDraw(c, a, b)
    };
    ca.prototype.drawCurrentData = function() {
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
    ca.prototype.isAllLoaded = function() {
        var c = true,
        a;
        for (a in this._loadCount) if (!this._loadCount[a]) {
            c = false;
            break
        }
        return c
    };
    ca.prototype.getCacheKey = function(c, a, b) {
        return c + "_" + a + "_" + b
    };
    ca.prototype.getDataZoom = function() {
        var c = Math.round(this.map.getZoom());
        19 < c && (c = 19);
        return c
    };
    ca.prototype._parseDataAndDraw = function(c, a, b) {
        var d = this,
        e = d.map,
        g = e.getCenter(),
        k = Math.round(e.getZoom()),
        h = this.getCacheKey(c, a, b),
        l = "_cbk" + (1E5 * Math.random()).toFixed(0),
        n = this.getTileUrl(c, a, b, "BMapGL." + l);
        BMapGL[l] = function(n) {
            d._loadCount[c + "_" + a + "_" + b] = true;
            var m = e.getCenter(),
            p = Math.round(e.getZoom());
            m.equals(g) && p === k ? (m = n.content && n.content.tf, n.data && (m = n.data), d.cache[h] = m ? {
                traffic: m,
                precision: n.precision
            }: null, d.drawTogether && d.isAllLoaded() && d.drawCurrentData()) : p !== k && d.clear();
            delete BMapGL[l]
        };
        void 0 !== d.cache[h] ? (d._loadCount[c + "_" + a + "_" + b] = true, d.drawTogether && d.isAllLoaded() && d.drawCurrentData()) : this.request(n)
    };
    ca.prototype.getTileUrl = function(c, a, b, d) {
        return "https://sp3.baidu.com/7_AZsjOpB1gCo2Kml5_Y_DAcsMJiwa/traffic/?qt=vtraffic&x=" + c + "&y=" + a + "&z=" + b + "&fn=" + d + "&t=" + (new Date).getTime()
    };
    ca.prototype._drawFeatures = function(c, a, b, d) {
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
            for (var k = c.length; g < k; g++) {
                var h = c[g],
                l = h[1];
                h = this.arrFeatureStyles[h[3]];
                var n = l[0] / e,
                p = -l[1] / e,
                m = [];
                m.push([a[0] + n * d, a[1] + p * d]);
                for (var q = 2,
                r = l.length; q < r; q += 2) n += l[q] / e,
                p -= l[q + 1] / e,
                m.push([a[0] + n * d, a[1] + p * d, 1]);
                b.push({
                    color: h[1],
                    geometry: {
                        type: "LineString",
                        coordinates: m
                    }
                })
            }
        }
        return b
    };
    ca.prototype.request = function(c, a) {
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
    ca.prototype.getRGBA = function(c) {
        c >>>= 0;
        return "rgba(" + (c >> 24 & 255) + "," + (c >> 16 & 255) + "," + (c >> 8 & 255) + "," + (c & 255) / 256 + ")"
    };
    ca.prototype.getLineCap = function(c) {
        return ["butt", "square", "round"][c]
    };
    ca.prototype.getLineJoin = function(c) {
        return ["miter", "bevel", "round"][c]
    };
    var TrafficLayer = function(c) {
        function a(b) {
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b));
            b.autoUpdate = true;
            b.getOptions();
            var c = new LineFlowLayer({
                color: "rgba(257, 254, 47, 0.9)",
                zoom: 18,
                duration: .8,
                interval: .2,
                trailLength: .4
            }),
            e = new WallSpriteLayer({
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
        S(a, c);
        M(a, [{
            key: "initialize",
            value: function(b) {
                Wa(a.prototype.__proto__ || N(a.prototype), "initialize", this).call(this, b);
                b = this.map.map;
                var c = new ca({});
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
    } (nb),
    HeatmapLayer = function(c) {
        function a(b, c) {
            G(this, a);
            b = R(this, (a.__proto__ || N(a)).call(this, b, c));
            b.bufferData = [];
            return b
        }
        S(a, c);
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
                this.inverseMatrix = C.create(Float64Array);
                this.frameBuffer = new FrameBufferObject(a);
                this.webglLayer.map.onResize(function() {
                    b.frameBuffer = new FrameBufferObject(a)
                });
                this.circle = Pg(64);
                this.circleTexture = createTexture(a, this.circle, {
                    TEXTURE_MAG_FILTER: "LINEAR",
                    TEXTURE_MIN_FILTER: "LINEAR",
                    TEXTURE_WRAP_S: "CLAMP_TO_EDGE",
                    TEXTURE_WRAP_T: "CLAMP_TO_EDGE"
                });
                this.intensity = new Intensity({
                    gradient: c.gradient
                });
                this.paletteTexture = createTexture(a, this.intensity.paletteCtx.canvas, {
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
                for (var g = [], k = Math.floor(a.canvas.width / 4), h = Math.floor(a.canvas.height / 4), l = k + 1, n = 0; n <= h; n++) for (var p = 0; p <= k; p++) if (c.push(2 * p / k - 1, 2 * n / h - 1), p < k && n < h) {
                    var m = l * n + p,
                    q = l * (n + 1) + p;
                    g.push(m, m + 1, q + 1);
                    g.push(m, q + 1, q)
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
                b && a.gradient !== c.gradient && (this.intensity = new Intensity({
                    gradient: a.gradient
                }), this.paletteTexture = createTexture(b, this.intensity.paletteCtx.canvas, {
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
                        var k = a[g],
                        h = this.normizedPoint(a[g].geometry.coordinates),
                        l = void 0 === k.count ? 1 : k.count;
                        "properties" in k && "count" in k.properties && (l = k.properties.count);
                        b.push(h[0], h[1], h[2]);
                        b.push( - 1, -1);
                        b.push(l);
                        b.push(h[0], h[1], h[2]);
                        b.push( - 1, 1);
                        b.push(l);
                        b.push(h[0], h[1], h[2]);
                        b.push(1, 1);
                        b.push(l);
                        b.push(h[0], h[1], h[2]);
                        b.push(1, -1);
                        b.push(l);
                        k = 4 * g;
                        c.push(k + 0, k + 2, k + 1);
                        c.push(k + 0, k + 3, k + 2)
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
                k = a.pixelToViewMatrix;
                a = a.projectionMatrix;
                if (this.offlineBufferData && !(0 >= this.offlineBufferData.length)) {
                    var h = this.getOptions();
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
                        pixelToViewMatrix: k,
                        projectionMatrix: a,
                        unit: "px" === h.unit ? 1 : 0,
                        size: h.size,
                        max: h.max,
                        min: h.min
                    });
                    this.offlineVertexArray.bind();
                    this.offlineIndexBuffer.bind();
                    b.drawElements(b.TRIANGLES, this.offlineIndexData.length, b.UNSIGNED_INT, 0);
                    b.bindFramebuffer(b.FRAMEBUFFER, null);
                    this.program.use(b);
                    this.vertexArray.bind();
                    c = this.inverseMatrix;
                    C.identity(c);
                    C.multiply(c, a, k);
                    C.invert(c, c);
                    b.enable(b.DEPTH_TEST);
                    b.disable(b.BLEND);
                    this.program.setUniforms({
                        u_sampler: this.frameBuffer.framebuffer.texture,
                        u_samplerPalette: this.paletteTexture,
                        uHeight: h.height,
                        pixelToViewMatrix: k,
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
    yj = function() {
        function c(a) {
            G(this, c);
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
            G(this, c);
            this.options = {
                autoUpdate: true
            };
            T(this.options, a);
            var d = a.pointOffset;
            this.webglLayer = a.webglLayer || new WebglLayer(a.map, this.options);
            this.layerManager = new yj({
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
    x.View = View;
    x.GridLayer = GridLayer;
    x.HeatGridLayer = HeatGridLayer;
    x.ShapeLayer = ShapeLayer;
    x.SimpleLineLayer = SimpleLineLayer;
    x.LineLayer = LineLayer;
    x.ELineLayer = ELineLayer;
    x.WallSpriteLayer = WallSpriteLayer;
    x.LinePointLayer = LinePointLayer;
    x.WallLayer = WallLayer;
    x.WallTripLayer = WallTripLayer;
    x.HeatLineLayer = HeatLineLayer;
    x.HoneycombLayer = HoneycombLayer;
    x.WebglLayer = WebglLayer;
    x.PointLayer = PointLayer;
    x.GroundRippleLayer = GroundRippleLayer;
    x.RippleLayer = RippleLayer;
    x.SparkLayer = SparkLayer;
    x.ClusterLayer = ClusterLayer;
    x.HeatPointLayer = HeatPointLayer;
    x.ShapeLineLayer = ShapeLineLayer;
    x.PointTripLayer = PointTripLayer;
    x.LineTripLayer = LineTripLayer;
    x.LineFlowLayer = LineFlowLayer;
    x.TileLayer = TileLayer;
    x.IconLayer = IconLayer;
    x.PolygonLayer = PolygonLayer;
    x.CarLineLayer = CarLineLayer;
    x.Layer = Layer;
    x.TextLayer = TextLayer;
    x.TrafficLayer = TrafficLayer;
    x.GltfLayer = GltfLayer;
    x.HeatmapLayer = HeatmapLayer;
    x.BlurEffect = BlurEffect;
    x.BloomEffect = BloomEffect;
    x.BrightEffect = BrightEffect;
    x.DepthEffect = DepthEffect;
    x.EffectManager = EffectManager;
    x.getContext = getContext;
    x.createTexture = createTexture;
    x.loadTextureImage = loadTextureImage;
    x.FrameBufferObject = FrameBufferObject;
    x.Program = Program;
    x.StateManager = StateManager;
    x.Buffer = Buffer;
    x.VertexArray = VertexArray;
    x.CommonLayer = CommonLayer;
    x.MercatorProjection = MercatorProjection;
    x.Canvas = Canvas;
    x.Intensity = Intensity;
    x.BezierCurve = BezierCurve;
    x.GeodesicCurve = GeodesicCurve;
    x.OdCurve = OdCurve;
    x.toRadian = toRadian;
    x.toAngle = toAngle;
    x.ceilPowerOfTwo = ceilPowerOfTwo;
    x.floorPowerOfTwo = floorPowerOfTwo;
    x.approximatelyEqual = approximatelyEqual;
    x.__moduleExports = Da;
    x.vec4 = Fa;
    x.vec3 = K;
    x.vec2 = gi;
    x.quat2 = hi;
    x.quat = tc;
    x.mat4 = C;
    x.mat3 = ii;
    x.mat2d = ji;
    x.mat2 = ki;
    x.glMatrix = li;
    Object.defineProperty(x, "__esModule", {
        value: true
    })
});