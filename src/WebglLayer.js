export default class WebglLayer {
    constructor(map, options = {}) {
        this.map = map;
        this.options = options;

        this.renderArr = [];

        (map = options.canvas) || (map = document.createElement("canvas"));
        this.canvas = map;
        this.gl = options.gl ? options.gl : ee(map);
        this.gl.getExtension("OES_element_index_uint");
        this.changeSize();

        this._animation = this.animation.bind(this);
        this._update = this.update.bind(this);
        this.options.onRender && this.renderArr.push(this.options.onRender);
        this.stateManager = new rf({
            gl: this.gl,
        });
        this.pickFBO = new wa(this.gl);
        this.transferOptions = {};
        this.bind();
    }

    bind() {
        var a = this,
            b = this.map;
        b.onResize(function () {
            a.changeSize();
            a.render();
        });
        b.onUpdate(this._update);
        b.onClick &&
            b.onClick(function (b) {
                a.onClick && a.onClick(b);
            });
        b.onDblClick &&
            b.onDblClick(function (b) {
                a.onDblClick && a.onDblClick(b);
            });
        b.onRightClick &&
            b.onRightClick(function (b) {
                a.onRightClick && a.onRightClick(b);
            });
        b.onMousemove &&
            b.onMousemove(function (b) {
                a.onMousemove && a.onMousemove(b);
            });
        this.options.canvas || b.getContainer().appendChild(this.canvas);
    }

    setOptions(a) {
        this.options = a;
    }

    onInitialize(a) {
        a && (this.transferOptions = a.bind(this)(this.gl) || {});
    }

    bindFramebuffer(a) {
        var b = this.gl;
        a
            ? b.bindFramebuffer(b.FRAMEBUFFER, a.framebuffer)
            : b.bindFramebuffer(b.FRAMEBUFFER, null);
    }

    saveFramebuffer() {
        var a = this.gl;
        this.preFramebuffer = a.getParameter(a.FRAMEBUFFER_BINDING);
    }

    restoreFramebuffer() {
        var a = this.gl;
        a.bindFramebuffer(a.FRAMEBUFFER, this.preFramebuffer);
    }

    onRender(a) {
        this.renderArr.push(a);
    }

    changeSize() {
        var a = this.canvas;
        if (a) {
            var b = a.style,
                c = this.map.getSize(),
                e = window.devicePixelRatio;
            a.width = c.width * e;
            a.height = c.height * e;
            b.cssText =
                "position: absolute;left:0;top:0;width:" +
                c.width +
                "px;height:" +
                c.height +
                "px;z-index:2;";
            c = this.options;
            "cesium" !== c.mapType || c.canvas || (b.pointerEvents = "none");
            this.gl.viewport(0, 0, a.width, a.height);
        }
    }

    update() {
        false === this.options.autoUpdate || this.isAnimation || this.render();
    }

    render() {
        if (this.map) {
            var a = this.options,
                b = this.projectionMatrix,
                c = this.viewMatrix;
            if ("three" === a.mapType)
                (c = this.map.map.camera),
                    (b = c.projectionMatrix.elements),
                    (c = c.matrixWorldInverse.elements);
            else if ("cesium" === a.mapType) {
                c = this.map.map;
                var e = c.camera.frustum.projectionMatrix;
                b = new Float32Array([
                    e[0],
                    e[1],
                    e[2],
                    e[3],
                    e[4],
                    e[5],
                    e[6],
                    e[7],
                    e[8],
                    e[9],
                    e[10],
                    e[11],
                    e[12],
                    e[13],
                    e[14],
                    e[15],
                ]);
                e = c.camera.viewMatrix;
                c = new Float32Array([
                    e[0],
                    e[1],
                    e[2],
                    e[3],
                    e[4],
                    e[5],
                    e[6],
                    e[7],
                    e[8],
                    e[9],
                    e[10],
                    e[11],
                    e[12],
                    e[13],
                    e[14],
                    e[15],
                ]);
            } else
                "B_EARTH_MAP" === this.map.map.mapType
                    ? ((b = this.map.map
                          .getEarth()
                          .scene._camera.getProjectionMatrix()),
                      (c = this.map.map
                          .getEarth()
                          .scene._camera.getModelViewMatrix()))
                    : (this.updateProjectionMatrix(),
                      this.updateModelViewMatrix());
            e = C.multiply(this.matrix, b, c);
            T(this.transferOptions, {
                gl: this.gl,
                matrix: e,
                pointToPixelMatrix: this.pointToPixelMatrix,
                pixelToViewMatrix: this.pixelToViewMatrix,
                projectionMatrix: b,
                orthoMatrix: this.orthoMatrix,
                viewMatrix: c,
                stateManager: this.stateManager,
            });
            "three" !== a.mapType &&
                "cesium" !== a.mapType &&
                false !== a.autoUpdate &&
                this.clear();
            for (a = 0; a < this.renderArr.length; a++)
                this.renderArr[a] &&
                    this.renderArr[a].bind(this)(this.transferOptions);
        }
    }

    clear() {
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    updateProjectionMatrix() {
        var a = this.gl.canvas.width / this.gl.canvas.height,
            b = this.options.cameraNear || 1,
            c = this.options.cameraFar || 4e3;
        C.perspective(this.projectionMatrix, la(this.fovy), a, b, c);
        a = this.map.getSize();
        C.ortho(
            this.orthoMatrix,
            -a.width / 2,
            a.width / 2,
            -a.height / 2,
            a.height / 2,
            b,
            c
        );
    }

    updateModelViewMatrix() {
        var a = this.map,
            b = this.viewMatrix,
            c = this.pointToPixelMatrix,
            e = this.pixelToViewMatrix;
        C.identity(b);
        C.identity(c);
        C.identity(e);
        var g = a.getSize();
        g = Math.round(-g.height / (2 * Math.tan(la(this.fovy) / 2)));
        C.translate(e, e, [0, 0, g]);
        C.rotate(e, e, la(a.getTilt()), [-1, 0, 0]);
        C.rotate(e, e, la(a.getHeading()), [0, 0, -1]);
        g = a.getCenter();
        var k = this.options.pointOffset || [0, 0];
        a = a.getZoomUnits();
        C.translate(c, c, [(k[0] - g.lng) / a, (k[1] - g.lat) / a, 0]);
        a = 1 / a;
        C.scale(c, c, [a, a, a]);
        C.multiply(b, e, c);
    }

    destroy() {
        this.stopAnimation();
        this.map.getContainer().removeChild(this.canvas);
        this.canvas = null;
    }

    animation() {
        if (this.isAnimation) {
            this.render();
            window.requestAnimationFrame(this._animation);
        }
    }

    startAnimation() {
        if (!this.isAnimation) {
            this.isAnimation = true;
            window.requestAnimationFrame(this._animation);
        }
    }

    stopAnimation() {
        this.isAnimation = false;
    }
}
