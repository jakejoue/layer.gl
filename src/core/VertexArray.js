const BufferTypeLength = {
    BYTE: 1,
    UNSIGNED_BYTE: 1,
    SHORT: 2,
    UNSIGNED_SHORT: 2,
    FLOAT: 4,
};

export default class VertexArray {
    constructor(options) {
        this.options = options;
        this.attributes = options.attributes;

        this.gl = options.gl;
        this.program = options.program;

        this.stride = 0;
        for (let i = 0; i < this.attributes.length; i++)
            this.stride +=
                BufferTypeLength[this.attributes[i].type] *
                this.attributes[i].size;
    }

    setVertexAttribPointers() {
        const gl = this.gl;
        const program = this.program;

        for (let i = 0; i < this.attributes.length; i++) {
            const attribute = this.attributes[i],
                attribIndex = program.attributes[attribute.name];

            if (attribIndex >= 0) {
                attribute.buffer.bind(gl);

                gl.vertexAttribPointer(
                    attribIndex,
                    attribute.size,
                    gl[attribute.type],
                    attribute.normalize || false,
                    attribute.stride ? attribute.stride : this.stride,
                    attribute.offset
                );
                gl.enableVertexAttribArray(attribIndex);
            }
        }
    }

    bind() {
        this.setVertexAttribPointers();
    }

    destroy() {}
}
