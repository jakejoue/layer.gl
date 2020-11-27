import ComponentDatatype from "./ComponentDatatype";
import IndexDatatype from "./IndexDatatype";

import assert from "../helper/assert";

function addAttribute(attributes, attribute, buffer) {
    const { name, size = 1, normalize = false } = attribute;

    if (!name) throw new Error("attribute needs name");

    // 每行数据长度
    if (buffer.stride === undefined) {
        buffer.stride = 0;
    }

    // 构建新的属性
    const attr = {
        name: name,
        size: size,
        offset: buffer.stride,
        normalize,
    };
    // 总长度
    buffer.stride += size * buffer.bytesPerIndex;

    attributes.push(attr);
}

export class IndexBuffer {
    constructor({
        gl,
        data,
        sizeInBytes = 0,
        indexDatatype = IndexDatatype.UNSIGNED_INT,
        dynamicDraw = false,
    }) {
        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.dynamicDraw = Boolean(dynamicDraw);
        this.sizeInBytes = sizeInBytes;

        // 定义其他变量
        Object.defineProperties(this, {
            indexDatatype: {
                get: function () {
                    return indexDatatype;
                },
            },
        });

        this.setData(data);
    }

    get bytesPerIndex() {
        return IndexDatatype.getSizeInBytes(this.indexDatatype);
    }

    get numberOfIndices() {
        return this.sizeInBytes / this.bytesPerIndex;
    }

    getTypeArray(data) {
        return IndexDatatype.createTypedArray(this.indexDatatype, data);
    }

    bind() {
        const gl = this.gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
    }

    setData(data) {
        const gl = this.gl;

        let typeArray;
        if (data) {
            typeArray = this.getTypeArray(data);
            this.sizeInBytes = typeArray.byteLength;
        }

        gl.context.unbindVAO();
        this.bind();

        gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            typeArray ? typeArray : this.sizeInBytes,
            this.dynamicDraw ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW
        );
    }

    updateData(data, offset = 0) {
        const gl = this.gl;

        assert(this.dynamicDraw);

        gl.context.unbindVAO();
        this.bind();
        gl.bufferSubData(
            gl.ELEMENT_ARRAY_BUFFER,
            offset,
            this.getTypeArray(data)
        );
    }

    destroy() {
        const gl = this.gl;
        if (this.buffer) {
            gl.deleteBuffer(this.buffer);
            delete this.buffer;
        }
    }
}

export class VertexBuffer {
    constructor({
        gl,
        data,
        attributes,
        sizeInBytes = 0,
        componentDatatype = ComponentDatatype.FLOAT,
        dynamicDraw = false,
    }) {
        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.dynamicDraw = Boolean(dynamicDraw);
        this.sizeInBytes = sizeInBytes;

        // 定义其他变量
        Object.defineProperties(this, {
            componentDatatype: {
                get: function () {
                    return componentDatatype;
                },
            },
        });

        // 顶点相关属性
        this.stride = 0;
        this.vaAttributes = [];

        for (let i = 0; i < attributes.length; i++) {
            addAttribute(this.vaAttributes, attributes[i], this);
        }

        this.setData(data);
    }

    get bytesPerIndex() {
        return ComponentDatatype.getSizeInBytes(this.componentDatatype);
    }

    get numberOfVertices() {
        if (this.stride > 0) {
            return this.sizeInBytes / this.stride;
        }
        return 0;
    }

    getTypeArray(data) {
        return ComponentDatatype.createTypedArray(this.componentDatatype, data);
    }

    bind() {
        const gl = this.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    }

    setData(data) {
        const gl = this.gl;

        // 判断是使用数组还是字节长度
        let typeArray;
        if (data) {
            typeArray = this.getTypeArray(data);
            this.sizeInBytes = typeArray.byteLength;
        }

        this.bind();

        gl.bufferData(
            gl.ARRAY_BUFFER,
            typeArray ? typeArray : this.sizeInBytes,
            this.dynamicDraw ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW
        );
    }

    updateData(data, offset = 0) {
        const gl = this.gl;

        this.bind();
        gl.bufferSubData(gl.ARRAY_BUFFER, offset, this.getTypeArray(data));
    }

    enableAttributes(gl, program) {
        for (let j = 0; j < this.vaAttributes.length; j++) {
            const member = this.vaAttributes[j];
            const attribIndex = program.attributes[member.name];
            // 在一些低版本浏览器下，空数据是不被允许写入的
            if (attribIndex !== undefined && this.sizeInBytes > 0) {
                gl.enableVertexAttribArray(attribIndex);
            }
        }
    }

    setVertexAttribPointers(gl, program) {
        for (let j = 0; j < this.vaAttributes.length; j++) {
            const member = this.vaAttributes[j];
            const attribIndex = program.attributes[member.name];

            // 在一些低版本浏览器下，空数据是不被允许写入的
            if (attribIndex !== undefined && this.sizeInBytes > 0) {
                gl.vertexAttribPointer(
                    attribIndex,
                    member.size,
                    this.componentDatatype,
                    member.normalize,
                    this.stride,
                    member.offset
                );
            }
        }
    }

    destroy() {
        const gl = this.gl;
        if (this.buffer) {
            gl.deleteBuffer(this.buffer);
            delete this.buffer;
        }
    }
}

export default class Buffer {}
