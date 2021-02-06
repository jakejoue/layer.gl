import GL from "./core/GL";
import StateManager from "./core/StateManager";
import FrameBufferObject from "./core/FrameBufferObject";

// 解决多版本浏览器获取webgl的问题
function getContext(canvas, contextAttributes) {
    const contextNames = ["webgl2", "webgl", "experimental-webgl"];

    for (let i = 0; i < contextNames.length; i++) {
        const contextName = contextNames[i];
        const context = canvas.getContext(contextName, contextAttributes);
        if (context !== null) return context;
    }

    return null;
}

export default class WebglLayer {
    constructor(map, options = {}) {
        this.map = map;
        this.options = options;

        // 渲染队列
        this.renderArr = [];

        // 画布和webgl对象
        this.canvas = options.canvas || document.createElement("canvas");
        this.gl = new GL(
            options.gl || getContext(this.canvas, options.glAttributes)
        );

        // 修改画布样式
        this.changeSize();

        // 动画和更新事件
        this._animation = this.animation.bind(this);
        this._update = this.update.bind(this);
        this.options.onRender && this.renderArr.push(this.options.onRender);

        // webgl状态修改器
        this.stateManager = new StateManager(this.gl);

        // 帧缓存
        this.pickFBO = new FrameBufferObject(this.gl);

        // 绘画相关参数
        this.transferOptions = {};

        // 绑定同步事件
        this.bind();
    }

    bind() {
        const self = this,
            map = this.map;

        // 画布缩放事件
        map.onResize(function () {
            self.changeSize();
            self.render();
        });
        // 更新事件
        map.onUpdate(this._update);

        // 其余可能支持的事件
        map.onClick &&
            map.onClick(function (evt) {
                self.onClick && self.onClick(evt);
            });
        map.onDblClick &&
            map.onDblClick(function (evt) {
                self.onDblClick && self.onDblClick(evt);
            });
        map.onRightClick &&
            map.onRightClick(function (evt) {
                self.onRightClick && self.onRightClick(evt);
            });
        map.onMousemove &&
            map.onMousemove(function (evt) {
                self.onMousemove && self.onMousemove(evt);
            });
        // 附加画布
        this.options.canvas || map.getContainer().appendChild(this.canvas);
    }

    bindFramebuffer(bufferData) {
        const gl = this.gl;
        bufferData
            ? gl.bindFramebuffer(gl.FRAMEBUFFER, bufferData.framebuffer)
            : gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    saveFramebuffer() {
        const gl = this.gl;
        this.preFramebuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
    }

    restoreFramebuffer() {
        const gl = this.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.preFramebuffer);
    }

    onRender(customRender) {
        this.renderArr.push(customRender);
    }

    changeSize() {
        const canvas = this.canvas;
        if (canvas && !this.options.canvas) {
            const style = canvas.style,
                size = this.map.getSize(),
                devicePixelRatio = window.devicePixelRatio;
            canvas.width = size.width * devicePixelRatio;
            canvas.height = size.height * devicePixelRatio;
            style.cssText =
                "position: absolute; left: 0; top: 0; width:" +
                size.width +
                "px; height:" +
                size.height +
                "px; z-index: 2; pointer-events: none;";
            this.gl.viewport(0, 0, canvas.width, canvas.height);
        }
    }

    update() {
        false === this.options.autoUpdate || this.isAnimation || this.render();
    }

    render() {
        if (this.map) {
            // 更新渲染参数
            this.transferOptions = {
                gl: this.gl,
                stateManager: this.stateManager,
                ...this.map.updateMatrixs(),
            };

            // 是否为手动更新
            false !== this.options.autoUpdate && this.clear();

            for (let i = 0; i < this.renderArr.length; i++) {
                if (this.renderArr[i]) {
                    this.renderArr[i].bind(this)(this.transferOptions);
                }
            }
        }
    }

    clear() {
        this.gl.clearCanvas();
    }

    destroy() {
        this.stopAnimation();
        if (this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        this.gl = this.gl = this.canvas = null;
        this.map.destroy && this.map.destroy();
        this.map = null;
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
