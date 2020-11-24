import WebGLConstants from "./WebGLConstants";
import ComponentDatatype from "./ComponentDatatype";
import IndexDatatype from "./IndexDatatype";

class Buffer {
    constructor(options) {
        this.gl = options.gl;
        this.target = options.target;
        this.usage = options.usage;

        this.buffer = this.gl.createBuffer();

        // 缓冲区数组大小
        this.sizeInBytes = options.sizeInBytes || 0;
    }

    _setData(data) {
        // 如果存在data
        let typeArray;
        if (data) {
            typeArray = this.getTypeArray(data);
            this.sizeInBytes = typeArray.byteLength;
        }

        this.gl._context.unbindVAO();

        // 初次绑定
        this.bind();
        this.gl.bufferData(
            this.target,
            typeArray ? typeArray : this.sizeInBytes,
            this.usage
        );
        this.unBind();
    }

    updateData(typedArray) {
        typedArray = this.getTypeArray(typedArray);

        this.gl._context.unbindVAO();

        this.bind();
        this.gl.bufferSubData(this.target, 0, typedArray);
        this.unBind();
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
        sizeInBytes: options.sizeInBytes,
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
    buffer.getTypeArray = function (data) {
        return ComponentDatatype.createTypedArray(componentDatatype, data);
    };

    // 初始化buffer
    buffer._setData(options.data);

    return buffer;
};

Buffer.createIndexBuffer = function (options) {
    const buffer = new Buffer({
        gl: options.gl,
        target: WebGLConstants.ELEMENT_ARRAY_BUFFER,
        usage: options.usage || WebGLConstants.STATIC_DRAW,
        sizeInBytes: options.sizeInBytes,
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
    buffer.getTypeArray = function (data) {
        return IndexDatatype.createTypedArray(indexDatatype, data);
    };

    // 初始化buffer
    buffer._setData(options.data);

    return buffer;
};

export default Buffer;
