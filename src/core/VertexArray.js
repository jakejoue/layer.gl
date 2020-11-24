function addAttribute(attributes, attribute, program) {
    const { name, buffer, size = 1 } = attribute;

    if (!name || !buffer) throw new Error("attribute needs name & buffer");

    // attribute实际索引
    const attribIndex = program.attributes[name];
    if (!(attribIndex >= 0)) return;

    // 每行数据长度
    if (buffer.stride === undefined) {
        buffer.stride = 0;
    }

    // 构建新的属性
    const attr = {
        index: attribIndex,
        name: name,
        buffer: buffer,
        size: size,
        offset: buffer.stride,
    };
    // 总长度
    buffer.stride += size * buffer.bytesPerIndex;

    attributes.push(attr);
}

function bind(gl, attributes, indexBuffer) {
    for (let i = 0; i < attributes.length; ++i) {
        const attribute = attributes[i];
        const { index, size, buffer, normalize = false, offset } = attribute;

        buffer.bind(gl);
        gl.vertexAttribPointer(
            index,
            size,
            buffer.componentDatatype,
            normalize,
            buffer.stride,
            offset
        );
        gl.enableVertexAttribArray(index);
    }

    if (indexBuffer) {
        indexBuffer.bind(gl);
    }
}

export default class VertexArray {
    constructor(options) {
        const { gl, program, indexBuffer } = options;

        // 构建新的属性
        const vaAttributes = [];

        for (let i = 0; i < options.attributes.length; i++) {
            const attribute = options.attributes[i];
            addAttribute(vaAttributes, attribute, program);
        }

        // Setup VAO if supported
        let vao;

        const context = gl._context;
        if (context.vertexArrayObject) {
            vao = context.glCreateVertexArray();
            context.glBindVertexArray(vao);
            bind(gl, vaAttributes, indexBuffer);
            context.glBindVertexArray(null);
        }

        this._gl = gl;
        this._program = program;
        this._vaAttributes = vaAttributes;
        this._indexBuffer = indexBuffer;

        this._vao = vao;
    }

    bind() {
        if (this._vao) {
            this._gl._context.glBindVertexArray(this._vao);
        } else {
            bind(this._gl, this._vaAttributes, this._indexBuffer);
        }
    }

    unBind() {
        if (this._vao) {
            this._gl._context.glBindVertexArray(null);
        } else {
            const attributes = this._vaAttributes;
            const gl = this._gl;

            for (let i = 0; i < attributes.length; ++i) {
                const attribute = attributes[i];
                gl.disableVertexAttribArray(attribute.index);
            }
            if (this._indexBuffer) {
                this._indexBuffer.unBind();
            }
        }
    }

    // 顶点类型
    get indexDatatype() {
        if (this._indexBuffer) {
            return this._indexBuffer.indexDatatype;
        }
    }

    // 获取顶点数量（通过indexBuffer）
    get numberOfIndices() {
        if (this._indexBuffer) {
            return this._indexBuffer.numberOfIndices;
        }
        return 0;
    }

    // 获取顶点数据（通过常规buffer，读取第一个）
    get numberOfVertices() {
        if (this._vaAttributes[0]) {
            return this._vaAttributes[0].buffer.numberOfVertices;
        }
        return 0;
    }

    destroy() {
        const attributes = this._vaAttributes;
        for (let i = 0; i < attributes.length; ++i) {
            attributes[i].buffer.destroy();
        }

        const indexBuffer = this._indexBuffer;
        if (indexBuffer) {
            indexBuffer.destroy();
        }

        if (this._vao) {
            this._gl._context.glDeleteVertexArray(this._vao);
        }
    }
}
