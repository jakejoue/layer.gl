import WebGLConstants from "./WebGLConstants.js";

const ComponentDatatype = {
    /**
     * 8-bit signed byte corresponding to <code>gl.BYTE</code> and the type
     * of an element in <code>Int8Array</code>.
     *
     * @type {Number}
     * @constant
     */
    BYTE: WebGLConstants.BYTE,

    /**
     * 8-bit unsigned byte corresponding to <code>UNSIGNED_BYTE</code> and the type
     * of an element in <code>Uint8Array</code>.
     *
     * @type {Number}
     * @constant
     */
    UNSIGNED_BYTE: WebGLConstants.UNSIGNED_BYTE,

    /**
     * 16-bit signed short corresponding to <code>SHORT</code> and the type
     * of an element in <code>Int16Array</code>.
     *
     * @type {Number}
     * @constant
     */
    SHORT: WebGLConstants.SHORT,

    /**
     * 16-bit unsigned short corresponding to <code>UNSIGNED_SHORT</code> and the type
     * of an element in <code>Uint16Array</code>.
     *
     * @type {Number}
     * @constant
     */
    UNSIGNED_SHORT: WebGLConstants.UNSIGNED_SHORT,

    /**
     * 32-bit signed int corresponding to <code>INT</code> and the type
     * of an element in <code>Int32Array</code>.
     *
     * @memberOf ComponentDatatype
     *
     * @type {Number}
     * @constant
     */
    INT: WebGLConstants.INT,

    /**
     * 32-bit unsigned int corresponding to <code>UNSIGNED_INT</code> and the type
     * of an element in <code>Uint32Array</code>.
     *
     * @memberOf ComponentDatatype
     *
     * @type {Number}
     * @constant
     */
    UNSIGNED_INT: WebGLConstants.UNSIGNED_INT,

    /**
     * 32-bit floating-point corresponding to <code>FLOAT</code> and the type
     * of an element in <code>Float32Array</code>.
     *
     * @type {Number}
     * @constant
     */
    FLOAT: WebGLConstants.FLOAT,

    /**
     * 64-bit floating-point corresponding to <code>gl.DOUBLE</code> (in Desktop OpenGL;
     * this is not supported in WebGL, and is emulated in Cesium via {@link GeometryPipeline.encodeAttribute})
     * and the type of an element in <code>Float64Array</code>.
     *
     * @memberOf ComponentDatatype
     *
     * @type {Number}
     * @constant
     * @default 0x140A
     */
    DOUBLE: WebGLConstants.DOUBLE,
};

ComponentDatatype.getSizeInBytes = function (componentDatatype) {
    if (!componentDatatype) {
        throw new Error("value is required.");
    }

    switch (componentDatatype) {
        case ComponentDatatype.BYTE:
            return Int8Array.BYTES_PER_ELEMENT;
        case ComponentDatatype.UNSIGNED_BYTE:
            return Uint8Array.BYTES_PER_ELEMENT;
        case ComponentDatatype.SHORT:
            return Int16Array.BYTES_PER_ELEMENT;
        case ComponentDatatype.UNSIGNED_SHORT:
            return Uint16Array.BYTES_PER_ELEMENT;
        case ComponentDatatype.INT:
            return Int32Array.BYTES_PER_ELEMENT;
        case ComponentDatatype.UNSIGNED_INT:
            return Uint32Array.BYTES_PER_ELEMENT;
        case ComponentDatatype.FLOAT:
            return Float32Array.BYTES_PER_ELEMENT;
        case ComponentDatatype.DOUBLE:
            return Float64Array.BYTES_PER_ELEMENT;
        default:
            throw new Error("componentDatatype is not a valid value.");
    }
};

ComponentDatatype.createTypedArray = function (
    componentDatatype,
    valuesOrLength
) {
    if (!componentDatatype) {
        throw new Error("componentDatatype is required.");
    }
    if (!valuesOrLength) {
        throw new Error("valuesOrLength is required.");
    }

    switch (componentDatatype) {
        case ComponentDatatype.BYTE:
            return new Int8Array(valuesOrLength);
        case ComponentDatatype.UNSIGNED_BYTE:
            return new Uint8Array(valuesOrLength);
        case ComponentDatatype.SHORT:
            return new Int16Array(valuesOrLength);
        case ComponentDatatype.UNSIGNED_SHORT:
            return new Uint16Array(valuesOrLength);
        case ComponentDatatype.INT:
            return new Int32Array(valuesOrLength);
        case ComponentDatatype.UNSIGNED_INT:
            return new Uint32Array(valuesOrLength);
        case ComponentDatatype.FLOAT:
            return new Float32Array(valuesOrLength);
        case ComponentDatatype.DOUBLE:
            return new Float64Array(valuesOrLength);
        default:
            throw new Error("componentDatatype is not a valid value.");
    }
};

ComponentDatatype.fromName = function (name) {
    switch (name) {
        case "BYTE":
            return ComponentDatatype.BYTE;
        case "UNSIGNED_BYTE":
            return ComponentDatatype.UNSIGNED_BYTE;
        case "SHORT":
            return ComponentDatatype.SHORT;
        case "UNSIGNED_SHORT":
            return ComponentDatatype.UNSIGNED_SHORT;
        case "INT":
            return ComponentDatatype.INT;
        case "UNSIGNED_INT":
            return ComponentDatatype.UNSIGNED_INT;
        case "FLOAT":
            return ComponentDatatype.FLOAT;
        case "DOUBLE":
            return ComponentDatatype.DOUBLE;
        default:
            throw new Error("name is not a valid value.");
    }
};

export default ComponentDatatype;
