export default class Buffer {
    constructor(options) {
        this.options = options;
        this.gl = options.gl;
        this.buffer = this.gl.createBuffer();
        options.data && this.updateData(options.data);
    }

    updateData(data) {
        const options = this.options,
            gl = this.gl;
        this.bind();
        gl.bufferData(gl[options.target], data, gl[options.usage]);
    }

    bind(gl) {
        gl = gl || this.gl;
        gl.bindBuffer(gl[this.options.target], this.buffer);
    }

    unBind(gl) {
        gl = gl || this.gl;
        gl.bindBuffer(gl[this.options.target], null);
    }

    destroy() {
        this.buffer = null;
    }
}
