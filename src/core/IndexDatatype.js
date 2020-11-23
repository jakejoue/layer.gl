import WebGLConstants from "./WebGLConstants.js";

const IndexDatatype = {
    /**
     * 8-bit unsigned byte corresponding to <code>UNSIGNED_BYTE</code> and the type
     * of an element in <code>Uint8Array</code>.
     *
     * @type {Number}
     * @constant
     */
    UNSIGNED_BYTE: WebGLConstants.UNSIGNED_BYTE,

    /**
     * 16-bit unsigned short corresponding to <code>UNSIGNED_SHORT</code> and the type
     * of an element in <code>Uint16Array</code>.
     *
     * @type {Number}
     * @constant
     */
    UNSIGNED_SHORT: WebGLConstants.UNSIGNED_SHORT,

    /**
     * 32-bit unsigned int corresponding to <code>UNSIGNED_INT</code> and the type
     * of an element in <code>Uint32Array</code>.
     *
     * @type {Number}
     * @constant
     */
    UNSIGNED_INT: WebGLConstants.UNSIGNED_INT,
};

IndexDatatype.getSizeInBytes = function (indexDatatype) {
    switch (indexDatatype) {
        case IndexDatatype.UNSIGNED_BYTE:
            return Uint8Array.BYTES_PER_ELEMENT;
        case IndexDatatype.UNSIGNED_SHORT:
            return Uint16Array.BYTES_PER_ELEMENT;
        case IndexDatatype.UNSIGNED_INT:
            return Uint32Array.BYTES_PER_ELEMENT;
    }

    throw new Error(
        "indexDatatype is required and must be a valid IndexDatatype constant."
    );
};

IndexDatatype.fromSizeInBytes = function (sizeInBytes) {
    switch (sizeInBytes) {
        case 2:
            return IndexDatatype.UNSIGNED_SHORT;
        case 4:
            return IndexDatatype.UNSIGNED_INT;
        case 1:
            return IndexDatatype.UNSIGNED_BYTE;
        default:
            throw new Error(
                "Size in bytes cannot be mapped to an IndexDatatype"
            );
    }
};

IndexDatatype.createTypedArray = function (
    indexDatatype,
    indicesLengthOrArray
) {
    if (!indexDatatype) {
        throw new Error("indexDatatype is required.");
    }
    if (!indicesLengthOrArray) {
        throw new Error("indicesLengthOrArray is required.");
    }

    switch (indexDatatype) {
        case IndexDatatype.UNSIGNED_BYTE:
            return new Int8Array(indicesLengthOrArray);
        case IndexDatatype.UNSIGNED_SHORT:
            return new Uint16Array(indicesLengthOrArray);
        case IndexDatatype.UNSIGNED_INT:
            return new Uint32Array(indicesLengthOrArray);
        default:
            throw new Error("indexDatatype is not a valid value.");
    }
};

export default IndexDatatype;
