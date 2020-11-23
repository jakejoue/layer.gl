import WebGLConstants from "./WebGLConstants";
import ComponentDatatype from "./ComponentDatatype";
import IndexDatatype from "./IndexDatatype";

class Buffer {
    constructor(options) {
        this.sizeInBytes = 0;

        this.gl = options.gl;
        this.target = options.target;
        this.usage = options.usage;

        this.buffer = this.gl.createBuffer();
        options.typedArray && this.updateData(options.typedArray);
    }

    _updateData(typedArray) {
        this.bind();
        this.gl.bufferData(this.target, typedArray, this.usage);

        this.sizeInBytes = typedArray ? typedArray.byteLength : 0;
    }

    bind(gl) {
        gl = gl || this.gl;
        gl.bindBuffer(this.target, this.buffer);
    }

    unBind(gl) {
        gl = gl || this.gl;
        gl.bindBuffer(this.target, null);
    }

    destroy() {
        this.gl.deleteBuffer(this.buffer, null);

        this.gl = this.buffer = null;
    }
}

Buffer.createVertexBuffer = function (options) {
    const buffer = new Buffer({
        gl: options.gl,
        target: WebGLConstants.ARRAY_BUFFER,
        usage: options.usage || WebGLConstants.STATIC_DRAW,
    });

    const componentDatatype =
        options.componentDatatype || ComponentDatatype.FLOAT;
    const bytesPerIndex = ComponentDatatype.getSizeInBytes(componentDatatype);

    // 定义其他属性
    buffer.stride = 0;

    Object.defineProperties(buffer, {
        componentDatatype: {
            get() {
                return componentDatatype;
            },
        },
        bytesPerIndex: {
            get: function () {
                return bytesPerIndex;
            },
        },
        numberOfVertices: {
            get: function () {
                if (this.stride > 0) {
                    return this.sizeInBytes / this.stride;
                }
                return 0;
            },
        },
    });
    // 定义数据分析方法
    buffer.updateData = function (data) {
        this._updateData(
            data
                ? ComponentDatatype.createTypedArray(componentDatatype, data)
                : data
        );
    };

    return buffer;
};

Buffer.createIndexBuffer = function (options) {
    const buffer = new Buffer({
        gl: options.gl,
        target: WebGLConstants.ELEMENT_ARRAY_BUFFER,
        usage: options.usage || WebGLConstants.STATIC_DRAW,
    });

    const indexDatatype = options.indexDatatype || IndexDatatype.UNSIGNED_INT;
    const bytesPerIndex = IndexDatatype.getSizeInBytes(indexDatatype);

    Object.defineProperties(buffer, {
        indexDatatype: {
            get: function () {
                return indexDatatype;
            },
        },
        bytesPerIndex: {
            get: function () {
                return bytesPerIndex;
            },
        },
        numberOfIndices: {
            get: function () {
                return this.sizeInBytes / bytesPerIndex;
            },
        },
    });
    buffer.updateData = function (data) {
        this._updateData(
            data ? IndexDatatype.createTypedArray(indexDatatype, data) : data
        );
    };

    return buffer;
};

export default Buffer;
