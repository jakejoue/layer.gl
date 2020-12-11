export class LngLat {
    constructor(lng, lat) {
        this.lng = lng;
        this.lat = lat;
    }

    equals(f) {
        return this.lat === f.lat && this.lng === f.lng;
    }

    clone() {
        return new LngLat(this.lat, this.lng);
    }

    getLngSpan(lng) {
        lng = Math.abs(lng - this.lng);
        180 < lng && (lng = 360 - lng);
        return lng;
    }

    sub(f) {
        return new LngLat(this.lat - f.lat, this.lng - f.lng);
    }

    toString() {
        return `Point[${this.lng}, ${this.lat}]`;
    }

    toArray() {
        return [this.lng, this.lat];
    }
}

export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toArray() {
        return [this.x, this.y];
    }
}

export default class MercatorProjection {
    static EARTHRADIUS = 6370996.81;
    static MCBAND = [1.289059486e7, 8362377.87, 5591021, 3481989.83, 1678043.12, 0];
    static LLBAND = [75, 60, 45, 30, 15, 0];
    static MC2LL = [
        [1.410526172116255e-8, 8.98305509648872e-6, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 1.73379812e7],
        [-7.435856389565537e-9, 8.983055097726239e-6, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 1.026014486e7],
        [-3.030883460898826e-8, 8.98305509983578e-6, 0.30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6856817.37],
        [-1.981981304930552e-8, 8.983055099779535e-6, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4482777.06],
        [3.09191371068437e-9, 8.983055096812155e-6, 6.995724062e-5, 23.10934304144901, -2.3663490511e-4, -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2555164.4],
        [2.890871144776878e-9, 8.983055095805407e-6, -3.068298e-8, 7.47137025468032, -3.53937994e-6, -0.02145144861037, -1.234426596e-5, 1.0322952773e-4, -3.23890364e-6, 826088.5],
    ];
    static LL2MC = [
        [-0.0015702102444, 111320.7020616939, 0x60e374c3105a3, -0x24bb4115e2e164, 0x5cc55543bb0ae8, -0x7ce070193f3784, 0x5e7ca61ddf8150, -0x261a578d8b24d0, 0x665d60f3742ca, 82.5],
        [8.277824516172526e-4,111320.7020463578,6.477955746671607e8,-4.082003173641316e9,1.077490566351142e10,-1.517187553151559e10,1.205306533862167e10,-5.124939663577472e9,9.133119359512032e8,67.5],
        [0.00337398766765, 111320.7020202162, 4481351.045890365, -2.339375119931662e7, 7.968221547186455e7, -1.159649932797253e8, 9.723671115602145e7, -4.366194633752821e7, 8477230.501135234, 52.5],
        [0.00220636496208,111320.7020209128,51751.86112841131,3796837.749470245,992013.7397791013,-1221952.21711287,1340652.697009075,-620943.6990984312,144416.9293806241,37.5],
        [-3.441963504368392e-4, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5],
        [-3.218135878613132e-4, 111320.7020701615, 0.00369383431289, 823725.6402795718, 0.46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45],
    ];

    static getDistanceByMC(f, c) {
        if (!f || !c) return 0;

        f = this.convertMC2LL(f);
        if (!f) return 0;

        const a = this.toRadians(f.lng);
        f = this.toRadians(f.lat);
        c = this.convertMC2LL(c);
        if (!c) return 0;

        const b = this.toRadians(c.lng);
        c = this.toRadians(c.lat);
        return this.getDistance(a, b, f, c);
    }

    static getDistanceByLL(f, c) {
        if (!f || !c) return 0;

        f.lng = this.getLoop(f.lng, -180, 180);
        f.lat = this.getRange(f.lat, -74, 74);
        c.lng = this.getLoop(c.lng, -180, 180);
        c.lat = this.getRange(c.lat, -74, 74);

        const a = this.toRadians(f.lng);
        const b = this.toRadians(f.lat);

        f = this.toRadians(c.lng);
        c = this.toRadians(c.lat);

        return this.getDistance(a, f, b, c);
    }

    static convertMC2LL(f) {
        if (null === f || undefined === f) return new LngLat(0, 0);
        if (180 > f.lng && -180 < f.lng && 90 > f.lat && -90 < f.lat) return f;
        const c = new LngLat(Math.abs(f.lng), Math.abs(f.lat));

        let b;
        for (let a = 0; a < this.MCBAND.length; a++) {
            if (c.lat >= this.MCBAND[a]) {
                b = this.MC2LL[a];
                break;
            }
        }
        f = this.convertor(f, b);
        f = new LngLat(Number(f.lng.toFixed(6)), Number(f.lat.toFixed(6)));
        return f;
    }

    static convertLL2MC(f) {
        if (null === f || undefined === f) return new LngLat(0, 0);
        if (180 < f.lng || -180 > f.lng || 90 < f.lat || -90 > f.lat) return f;

        f.lng = this.getLoop(f.lng, -180, 180);
        f.lat = this.getRange(f.lat, -74, 74);
        const c = new LngLat(f.lng, f.lat);
        let b;

        for (let a = 0; a < this.LLBAND.length; a++) {
            if (c.lat >= this.LLBAND[a]) {
                b = this.LL2MC[a];
                break;
            }
        }
        if (!b) {
            for (let a = 0; a < this.LLBAND.length; a++) {
                if (c.lat <= -this.LLBAND[a]) {
                    b = this.LL2MC[a];
                    break;
                }
            }
        }
        f = this.convertor(f, b);
        f = new LngLat(Number(f.lng.toFixed(2)), Number(f.lat.toFixed(2)));

        return f;
    }

    static convertor(f, c) {
        if (f && c) {
            let a = c[0] + c[1] * Math.abs(f.lng);
            const b = Math.abs(f.lat) / c[9];
            c =
                c[2] +
                c[3] * b +
                c[4] * b * b +
                c[5] * b * b * b +
                c[6] * b * b * b * b +
                c[7] * b * b * b * b * b +
                c[8] * b * b * b * b * b * b;
            a *= 0 > f.lng ? -1 : 1;
            c *= 0 > f.lat ? -1 : 1;
            return new LngLat(a, c);
        }
    }

    static getDistance(f, c, a, b) {
        return (
            this.EARTHRADIUS *
            Math.acos(Math.sin(a) * Math.sin(b) + Math.cos(a) * Math.cos(b) * Math.cos(c - f))
        );
    }

    static toRadians(f) {
        return (Math.PI * f) / 180;
    }

    static toDegrees(f) {
        return (180 * f) / Math.PI;
    }

    static getRange(f, c, a) {
        null != c && (f = Math.max(f, c));
        null != a && (f = Math.min(f, a));
        return f;
    }

    static getLoop(f, c, a) {
        for (; f > a; ) f -= a - c;
        for (; f < c; ) f += a - c;
        return f;
    }

    lngLatToMercator(lnglat) {
        return MercatorProjection.convertLL2MC(lnglat);
    }

    lngLatToPoint(lnglat) {
        lnglat = MercatorProjection.convertLL2MC(lnglat);
        return new Point(lnglat.lng, lnglat.lat);
    }

    mercatorToLngLat(mclnglat) {
        return MercatorProjection.convertMC2LL(mclnglat);
    }

    pointToLngLat(point) {
        point = new LngLat(point.x, point.y);
        return MercatorProjection.convertMC2LL(point);
    }
}
