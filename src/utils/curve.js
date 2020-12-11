import MercatorProjection, { LngLat } from "../helper/MercatorProjection";

function ad(f, c, a, b, d) {
    const e = 1 - f,
        g = 1 - f;
    return (
        e * e * e * c + 3 * g * g * f * a + 3 * e * f * f * b + f * f * f * d
    );
}

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

    setOptions(options) {
        this.options = options || {};
        this._initialize();
    }

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
