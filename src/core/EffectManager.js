import FrameBufferObject from "./FrameBufferObject";

export default class EffectManager {
    constructor(gl) {
        this.gl = gl;
        this.effects = [];
        this.initFbo();
    }

    addEffect(effect) {
        this.effects.push(effect);
    }

    removeEffect(effect) {
        const eIndex = this.effects.indexOf(effect);
        if (eIndex !== -1) {
            this.effects.splice(eIndex, 1);
        }
    }

    setEffects(effects) {
        this.effects = effects;
    }

    onResize() {
        this.initFbo();

        const gl = this.gl,
            effects = this.effects;

        if (effects && 1 < effects.length) {
            for (let i = 1; i < effects.length; i++) {
                const effect = effects[i];
                effect.onResize && effect.onResize(gl);
            }
        }
    }

    initFbo() {
        const gl = this.gl;
        this.fbo = [new FrameBufferObject(gl), new FrameBufferObject(gl)];
    }

    render() {
        const gl = this.gl,
            effects = this.effects;

        if (effects && 0 < effects.length) {
            let preFrameBuffer = {};

            for (let i = 0; i < effects.length; i++) {
                let buffer = this.fbo[i % 2].framebuffer;

                if (i === effects.length - 1) {
                    buffer = null;
                }

                gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
                gl.clearCanvas();

                effects[i].render({
                    isPickRender: false,
                    gl: gl,
                    texture: preFrameBuffer.texture,
                    fbo: buffer,
                });

                preFrameBuffer = buffer;
            }
        }
    }
}
