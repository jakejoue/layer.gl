import StateManager from "./core/StateManager";
import FrameBuffer from "./core/FrameBuffer";

export default class WebglLayer {
    constructor(map, options = {}) {
        this.map = map;
        this.options = options;

        // 渲染队列
        this.renderArr = [];

        // 画布和webgl对象
        const canvas = options.canvas
            ? options.canvas
            : document.createElement("canvas");
        this.canvas = canvas;
        this.gl = options.gl ? options.gl : canvas.getContext("webgl");
        this.gl.getExtension("OES_element_index_uint");
        // 修改画布样式
        this.changeSize();

        // 动画和更新事件
        this._animation = this.animation.bind(this);
        this._update = this.update.bind(this);
        this.options.onRender && this.renderArr.push(this.options.onRender);

        // webgl状态修改器
        this.stateManager = new StateManager({
            gl: this.gl,
        });

        // 帧缓存
        this.pickFBO = new FrameBuffer(this.gl);

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
        // 更新时间
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
                "position: absolute;left:0;top:0;width:" +
                size.width +
                "px;height:" +
                size.height +
                "px;z-index:2;";
            style.pointerEvents = "none";
            this.gl.viewport(0, 0, canvas.width, canvas.height);
        }
    }

    update() {
        false === this.options.autoUpdate || this.isAnimation || this.render();
    }

    render() {
        if (this.map) {
            // 更新渲染参数
            Object.assign(
                this.transferOptions,
                {
                    gl: this.gl,
                    matrix: this.map.getMatirx(),
                    stateManager: this.stateManager,
                },
                this.map.getTransferOptions ? this.map.getTransferOptions() : {}
            );

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
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    destroy() {
        this.stopAnimation();
        if (this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        this.canvas = null;
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
