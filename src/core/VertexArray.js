function addAttribute(attributes, attribute) {
    const { name, buffer, size = 1 } = attribute;

    if (!name || !buffer) throw new Error("attribute needs name & buffer");

    if (buffer.stride === undefined) {
        buffer.stride = 0;
    }

    // 构建新的属性
    const attr = {
        name: name,
        buffer: buffer,
        size: size,
        offset: buffer.stride,
    };
    // 总长度
    buffer.stride += size * buffer.bytesPerIndex;

    attributes.push(attr);
}

export default class VertexArray {
    constructor(options) {
        this.gl = options.gl;
        this.program = options.program;
        this.indexBuffer = options.indexBuffer;

        this.attributes = [];

        // 构建新的属性
        for (let i = 0; i < options.attributes.length; i++) {
            const attribute = options.attributes[i];
            addAttribute(this.attributes, attribute);
        }
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
                    attribute.buffer.componentDatatype,
                    attribute.normalize || false,
                    attribute.buffer.stride,
                    attribute.offset
                );
                gl.enableVertexAttribArray(attribIndex);
            }
        }
        if (this.indexBuffer) {
            this.indexBuffer.bind(this.gl);
        }
    }

    bind() {
        this.setVertexAttribPointers();
    }

    destroy() {}
}
