/**
 * @module curve
 */

import MercatorProjection, { LngLat } from "../helper/MercatorProjection";
import { toRadian, toAngle } from "../helper/math";

function ad(f, c, a, b, d) {
    const e = 1 - f,
        g = 1 - f;
    return (
        e * e * e * c + 3 * g * g * f * a + 3 * e * f * f * b + f * f * f * d
    );
}

function Yc(f, c) {
    return 1e-8 > Math.abs(f - c);
}

function ge(f, c) {
    return f && c
        ? Math.round(
              Math.sqrt(Math.pow(f.lng - c.lng, 2) + Math.pow(f.lat - c.lat, 2))
          )
        : 0;
}

/**
 * @classdesc
 * 通过传入起点和终点，生成带高度的贝塞尔曲线坐标集，可以用来生成飞线数据
 *
 * @param {Object} options
 * @param {Array} options.start 起点坐标
 * @param {Array} options.end 终点坐标
 *
 * @example
 * var curve = new layergl.curve.BezierCurve({
 *     start: [12946640.989, 4846560.296],
 *     end: [12946348.509, 4846401.146]
 * });
 */
export class BezierCurve {
    constructor(options) {
        this.options = options || {};
        this._initialize();
    }

    _initialize() {
        this.v0 = this._normalizaCoord(this.options.start);
        this.v3 = this._normalizaCoord(this.options.end);
        this.v1 = this._getControlPoint(this.v0, this.v3, 4);
        this.v2 = this._getControlPoint(this.v3, this.v0, 5);
    }

    /**
     * 修改起点、终点坐标等属性
     * @param {Object} options
     */
    setOptions(options) {
        this.options = options || {};
        this._initialize();
    }

    /**
     * 获取生成的曲线坐标集，传入的字段为曲线的分段数
     * @param {Number} [size=20]
     */
    getPoints(size = 20) {
        const points = [];

        for (let i = 0; i <= size; i++) {
            const mcCoord = this._getPoint(i / size);
            const coord = MercatorProjection.convertMC2LL(
                new LngLat(mcCoord[0], mcCoord[1])
            ).toArray();

            points.push([...coord, mcCoord[2]]);
        }

        return points;
    }

    _normalizaCoord(coord) {
        if (!coord) return [];

        const mclnglat = MercatorProjection.convertLL2MC({
            lng: Number(coord[0]),
            lat: Number(coord[1]),
        });

        return [mclnglat.lng, mclnglat.lat, coord[2] || 0];
    }

    _getControlPoint(p1, p2, a = 1) {
        return [...this._getQuarter(p1, p2), this._getDistance(p1, p2) / a];
    }

    _getQuarter(p1, p2) {
        return [(3 * p1[0] + p2[0]) / 4, (3 * p1[1] + p2[1]) / 4];
    }

    _getDistance(p1, p2) {
        return Math.sqrt(
            Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2)
        );
    }

    _getPoint(f) {
        const coord = [],
            a = this.v0,
            b = this.v1,
            d = this.v2,
            e = this.v3;
        coord.push(
            ad(f, a[0], b[0], d[0], e[0]),
            ad(f, a[1], b[1], d[1], e[1]),
            ad(f, a[2], b[2], d[2], e[2])
        );
        return coord;
    }
}

/**
 * @classdesc
 * 通过传入2个以上的坐标点，来依次生成大地线坐标集，可以用来生成地球模式的大圆曲线
 *
 * @param {Object} options
 * @param {Array} options.points 传入经过点的坐标数组
 *
 * @example
 * var curve = new layergl.curve.GeodesicCurve({
 *     points: [[116.392394, 39.910683],[10.2345234, 22.453211],[101.432322, 70.222315]]
 * });
 */
export class GeodesicCurve {
    constructor(f) {
        this.WORLD_SIZE_MC_HALF = 2.0037726372307256e7;
        this.WORLD_SIZE_MC = 2 * this.WORLD_SIZE_MC_HALF;
        this.options = f || {};
        this._initialize();
    }

    _initialize() {
        this.points = this.options.points || this.options.point || [];
        this.greatCirclePoints = [];

        const f = [];
        for (let c = 0; c < this.points.length; c++) {
            const a = this._normalizaCoord(this.points[c]);
            a && f.push(a);
        }
        this.points = f;
    }

    /**
     * 修改坐标数组等属性
     * @param {Object} options
     */
    setOptions(options) {
        this.options = options || {};
        this._initialize();
    }

    /**
     * 获取生成的大地曲线坐标集，分段数按实际距离自动设定，无需传入参数
     */
    getPoints() {
        if (0 === this.greatCirclePoints.length) {
            for (let f = 0; f < this.points.length - 1; f++) {
                this._calcGreatCirclePoints(this.points[f], this.points[f + 1]);
            }
        }
        return this.greatCirclePoints.map((p) =>
            MercatorProjection.convertMC2LL(new LngLat(p[0], p[1])).toArray()
        );
    }

    _normalizaCoord(f) {
        if (!f) return null;

        if (f instanceof Array) {
            f = {
                lng: Number(f[0]),
                lat: Number(f[1]),
            };
        }
        const c = MercatorProjection.convertLL2MC(f);
        f = MercatorProjection.convertMC2LL(f);
        c.latLng = f;

        return c;
    }

    _calcGreatCirclePoints(f, c) {
        const a = f.latLng,
            b = c.latLng;
        if (!Yc(a.lng, b.lng) || !Yc(a.lat, b.lat)) {
            let d = MercatorProjection.getDistance(
                toRadian(a.lng),
                toRadian(a.lat),
                toRadian(b.lng),
                toRadian(b.lat)
            );
            if (!(25e4 > d)) {
                d = Math.round(d / 15e4);
                const e = this._calcAngularDistance(a, b);
                this.greatCirclePoints.push([f.lng, f.lat]);

                let k;
                for (let g = 0; g < d; g++) {
                    let h = this._calcMiddlePoint(a, b, g / d, e);
                    h = MercatorProjection.convertLL2MC(h);
                    k = ge(h, f);

                    if (30037726 < k) {
                        h.lng =
                            h.lng < f.lng
                                ? h.lng + this.WORLD_SIZE_MC
                                : h.lng - this.WORLD_SIZE_MC;
                    }

                    this.greatCirclePoints.push([h.lng, h.lat]);
                    f = h;
                }
                k = ge(c, f);

                if (30037726 < k) {
                    c.lng =
                        c.lng < f.lng
                            ? c.lng + this.WORLD_SIZE_MC
                            : c.lng - this.WORLD_SIZE_MC;
                }
                this.greatCirclePoints.push([c.lng, c.lat]);
            }
        }
    }

    _calcAngularDistance(f, c) {
        const a = toRadian(f.lat),
            b = toRadian(c.lat);
        f = toRadian(f.lng);
        c = toRadian(c.lng);
        return Math.acos(
            Math.sin(a) * Math.sin(b) +
                Math.cos(a) * Math.cos(b) * Math.cos(Math.abs(c - f))
        );
    }

    _calcMiddlePoint(f, c, a, b) {
        let d = c.lat,
            e = f.lng;
        c = c.lng;
        f = toRadian(f.lat);
        d = toRadian(d);
        e = toRadian(e);
        const g = toRadian(c);
        c = Math.sin((1 - a) * b) / Math.sin(b);
        b = Math.sin(a * b) / Math.sin(b);
        a = c * Math.cos(f) * Math.cos(e) + b * Math.cos(d) * Math.cos(g);
        e = c * Math.cos(f) * Math.sin(e) + b * Math.cos(d) * Math.sin(g);
        f = Math.atan2(
            c * Math.sin(f) + b * Math.sin(d),
            Math.sqrt(Math.pow(a, 2) + Math.pow(e, 2))
        );
        return new LngLat(toAngle(Math.atan2(e, a)), toAngle(f));
    }
}

/**
 * @classdesc
 * 通过传入2个或2个以上的坐标点，来依次生成od曲线坐标集。
 * 该曲线为2D弯曲方式，且不同于大地曲线，大地曲是根据球面最短距离来计算的，距离太近的2个点基本不会弯曲，而这个Od曲线的生成算法不同，即使很短的距离也会弯曲。
 *
 * @param {Object} options
 * @param {Array} options.points 传入经过点的坐标数组
 *
 * @example
 * var curve = new layergl.curve.OdCurve({
 *     points: [[116.392394, 39.910683],[111.432322, 40.222315]]
 * });
 */
export class OdCurve {
    constructor(options = {}) {
        this.options = options;
        this._initialize();
    }

    _initialize() {
        this.points = this.options.points;
    }

    _normalizaCoord(c) {
        if (!c) return null;

        if (c instanceof Array) {
            c = {
                lng: Number(c[0]),
                lat: Number(c[1]),
            };
        }

        return MercatorProjection.convertLL2MC(c);
    }

    setOptions(options = {}) {
        this.options = options;
        this._initialize();
    }

    /**
     * 获取生成的Od曲线坐标集，传入的字段为曲线的分段数，默认值是20
     * @param {Number=} [size=20]
     */
    getPoints(size) {
        const a = [],
            b = this.points;

        for (let d = 0; d < b.length - 1; d++) {
            const f = this.getCurveByTwoPoints(
                this._normalizaCoord(b[d]),
                this._normalizaCoord(b[d + 1]),
                size
            );
            if (f && 0 < f.length) {
                a.push(...f);
            }
        }

        return a.map((p) =>
            MercatorProjection.convertMC2LL(new LngLat(p[0], p[1])).toArray()
        );
    }

    getCurveByTwoPoints(c, a, b = 20) {
        if (!c || !a) return null;
        const d = [];

        let f = 0;

        const g = parseFloat(c.lat),
            h = parseFloat(a.lat);
        let k = parseFloat(c.lng),
            l = parseFloat(a.lng);

        if (l > k) {
            if (180 < parseFloat(l - k)) {
                if (0 > k) {
                    k = parseFloat(360 + k);
                    l = parseFloat(360 + l);
                }
            }
        }

        let m = 0,
            p,
            n;
        if (h === g) {
            p = 0;
            n = k - l;
        } else {
            l === k
                ? ((p = Math.PI / 2), (n = g - h))
                : ((p = Math.atan((h - g) / (l - k))),
                  (n = (h - g) / Math.sin(p)));
        }

        0 === m && (m = p + Math.PI / 5);
        n /= 2;
        p = n * Math.cos(m) + k;
        m = n * Math.sin(m) + g;

        for (n = 0; n < b + 1; n++) {
            const r =
                    k * (1 - 2 * f + f * f) +
                    p * (2 * f - 2 * f * f) +
                    l * f * f,
                q = a.lng;

            d.push([
                0 > c.lng && 0 < q ? r - 360 : r,
                g * (1 - 2 * f + f * f) + m * (2 * f - 2 * f * f) + h * f * f,
            ]);

            f += 1 / b;
        }

        return d;
    }
}
