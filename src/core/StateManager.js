export default class StateManager {
    constructor(options = {}) {
        this.options = options;
        this.gl = options.gl;
        this.savedState = [];
        this.currentState = this.getCurrentState();
    }

    setDefaultState() {
        this.setState();
    }

    getDefaultState() {
        return {
            blend: false,
            depthTest: false,
            cullFace: false,
            depthMask: true,
            stencilTest: false,
        };
    }

    getCurrentState() {
        const gl = this.gl;
        return {
            blend: gl.getParameter(gl.BLEND),
            stencilTest: gl.getParameter(gl.STENCIL_TEST),
            depthTest: gl.getParameter(gl.DEPTH_TEST),
            cullFace: gl.getParameter(gl.CULL_FACE),
            depthMask: gl.getParameter(gl.DEPTH_WRITEMASK),
        };
    }

    save() {
        this.savedState.push(this.getCurrentState());
    }

    restore() {
        const state = this.savedState.pop();
        this.setState(state);
    }

    setState(state) {
        const gl = this.gl,
            currentState = this.getCurrentState();
        state = { ...this.getDefaultState(), ...state };

        if (state.blend !== currentState.blend) {
            state.blend ? gl.enable(gl.BLEND) : gl.disable(gl.BLEND);
        }
        if (state.depthTest !== currentState.depthTest) {
            state.depthTest
                ? gl.enable(gl.DEPTH_TEST)
                : gl.disable(gl.DEPTH_TEST);
        }
        if (state.cullFace !== currentState.cullFace) {
            state.cullFace ? gl.enable(gl.CULL_FACE) : gl.disable(gl.CULL_FACE);
        }
        if (state.depthMask !== currentState.depthMask) {
            state.depthMask ? gl.depthMask(true) : gl.depthMask(false);
        }
        this.currentState = state;
    }
}
