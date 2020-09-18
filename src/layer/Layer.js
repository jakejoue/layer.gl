import CommonLayer from "./CommonLayer";

export default class Layer extends CommonLayer {
    getCommonDefaultOptions() {
        return {
            repeat: false,
            enablePicked: false,
            autoSelect: false,
            selectedIndex: -1,
            selectedColor: "rgba(20, 20, 200, 1.0)",
        };
    }

    commonInitialize(a) {
        var b = this.getOptions();
        this.gl = a;
        b.enablePicked &&
            (this.pickBuffer = new H({
                gl: a,
                target: "ARRAY_BUFFER",
                usage: "STATIC_DRAW",
            }));
    }

    getCommonAttributes() {
        var a = [];
        this.getOptions().enablePicked &&
            a.push({
                name: "aPickColor",
                buffer: this.pickBuffer,
                size: 3,
                type: "FLOAT",
                stride: 12,
                offset: 0,
            });
        return a;
    }

    normizedColor(a) {
        var b = a;
        a instanceof Array || (b = fa(a).unitArray());
        void 0 === b[3] && (b[3] = 1);
        return b;
    }

    normizedPoint(a) {
        if (!a || !a[0] || !a[1]) return [0, 0, 0];
        var b = this.getPointOffset(),
            c = Number(a[0]),
            g = Number(a[1]);
        -180 <= c &&
            180 >= c &&
            -90 <= g &&
            90 >= g &&
            ((g = this.webglLayer.map.lnglatToMercator(c, g)),
            (c = g[0]),
            (g = g[1]));
        var k = Number(a[2]) || 0;
        this.webglLayer &&
        "cesium" === this.webglLayer.options.mapType &&
        window.Cesium
            ? ((c = this.convertLngLat([c, g])),
              (k = window.Cesium.Cartesian3.fromDegrees(c[0], c[1], k)),
              (c = k.x),
              (g = k.y),
              (k = k.z))
            : this.webglLayer &&
              "bmapgl" === this.webglLayer.options.mapType &&
              "B_EARTH_MAP" === this.webglLayer.map.map.mapType &&
              ((c = this.convertLngLat([c, g])),
              (k = this.webglLayer.map.map.getEarth().scene.fromLatLngToXYZ({
                  lng: c[0],
                  lat: c[1],
              })),
              (c = k.x),
              (g = k.y),
              (k = k.z));
        return 3 < a.length
            ? [c - b[0], g - b[1], k].concat(W(a.slice(3)))
            : [c - b[0], g - b[1], k];
    }

    convertLngLat(a) {
        return [
            (a[0] / 2.003750834e7) * 180,
            (180 / Math.PI) *
                (2 *
                    Math.atan(
                        Math.exp(((a[1] / 2.003750834e7) * 180 * Math.PI) / 180)
                    ) -
                    Math.PI / 2),
        ];
    }

    getPointOffset() {
        var a = [0, 0],
            c = this.getOptions();
        this.webglLayer && this.webglLayer.options.pointOffset
            ? (a = this.webglLayer.options.pointOffset)
            : c.pointOffset && (a = c.pointOffset);
        return a;
    }

    indexToRgb(a) {
        a++;
        var b = Math.floor(a / 65536);
        a -= 65536 * b;
        var c = Math.floor(a / 256);
        return [a - 256 * c, c, b];
    }

    rgbToIndex(a) {
        return a[0] + 256 * a[1] + 65536 * a[2] - 1;
    }

    getCommonUniforms(a) {
        a = a.isPickRender;
        var b = this.getOptions(),
            c = {};
        if (b.enablePicked) {
            var g = b.autoSelect
                ? this.pickedColor
                : this.indexToRgb(b.selectedIndex || -1);
            c = T(c, {
                uSelectedColor: this.normizedColor(b.selectedColor),
                uEnablePicked: b.enablePicked,
                uPickedColor: g.map(function (a) {
                    return a / 255;
                }),
                uIsPickRender: !!a,
            });
        }
        return c;
    }

    pick(a, c) {
        var b = this.gl;
        this.webglLayer.saveFramebuffer();
        this.webglLayer.bindFramebuffer(this.webglLayer.pickFBO);
        this.webglLayer.clear();
        this.render({
            gl: b,
            isPickRender: !0,
            matrix: this.webglLayer.matrix,
            projectionMatrix: this.webglLayer.projectionMatrix,
            viewMatrix: this.webglLayer.viewMatrix,
            orthoMatrix: this.webglLayer.orthoMatrix,
        });
        var d = new Uint8Array(4);
        b.readPixels(
            a * window.devicePixelRatio,
            b.canvas.height - c * window.devicePixelRatio,
            1,
            1,
            b.RGBA,
            b.UNSIGNED_BYTE,
            d
        );
        a = this.rgbToIndex(d);
        this.pickedColor = [d[0], d[1], d[2]];
        this.webglLayer.restoreFramebuffer();
        return {
            dataIndex: a,
            dataItem: this.data[a],
        };
    }

    setGLState(a) {
        this.webglLayer.stateManager.setState(a);
    }

    addMultipleCoords(a, c, e) {
        if (
            !this.options.repeat ||
            !this.webglLayer ||
            "bmapgl" !== this.webglLayer.options.mapType ||
            "B_EARTH_MAP" === this.webglLayer.map.map.mapType
        )
            return [a];
        var b = this.webglLayer.map.map;
        c = c || b.getZoom();
        var d = e ? b.worldSize(c) : 4.007545274461451e7;
        c = function (a) {
            return [
                [a[0] - d, a[1], a[2] || 0],
                [a[0] + d, a[1], a[2] || 0],
            ];
        };
        if (a instanceof Array && !(a[0] instanceof Array))
            return (c = c(a)), (c = db(c, 2)), [a, c[0], c[1]];
        e = [];
        b = [];
        for (var h = 0; h < a.length; h++) {
            var l = c(a[h]);
            l = db(l, 2);
            var n = l[1];
            e.push(l[0]);
            b.push(n);
        }
        return [a, e, b];
    }
}
