// --- Utilities ---

// Array Caches (provide typed arrays for temporary by size)

const arrayCacheF32 = [];
const arrayCacheI32 = [];

// Float32Array caches used for uploading Matrix uniforms

const mat4array = new Float32Array(16);
const mat3array = new Float32Array(9);
const mat2array = new Float32Array(4);

// Flattening for arrays of vectors and matrices

function flatten(array, nBlocks, blockSize) {
    const firstElem = array[0];

    if (firstElem <= 0 || firstElem > 0) return array;
    // unoptimized: ! isNaN( firstElem )
    // see http://jacksondunstan.com/articles/983

    const n = nBlocks * blockSize;
    let r = arrayCacheF32[n];

    if (r === undefined) {
        r = new Float32Array(n);
        arrayCacheF32[n] = r;
    }

    if (nBlocks !== 0) {
        firstElem.toArray(r, 0);

        for (let i = 1, offset = 0; i !== nBlocks; ++i) {
            offset += blockSize;
            array[i].toArray(r, offset);
        }
    }

    return r;
}

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;

    for (let i = 0, l = a.length; i < l; i++) {
        if (a[i] !== b[i]) return false;
    }

    return true;
}

function copyArray(a, b) {
    for (let i = 0, l = b.length; i < l; i++) {
        a[i] = b[i];
    }
}

// Texture unit allocation

function allocTexUnits(textures, n) {
    let r = arrayCacheI32[n];

    if (r === undefined) {
        r = new Int32Array(n);
        arrayCacheI32[n] = r;
    }

    for (let i = 0; i !== n; ++i) {
        r[i] = textures.allocateTextureUnit();
    }

    return r;
}

// --- Setters ---

// Note: Defining these methods externally, because they come in a bunch
// and this way their names minify.

// Single scalar

function setValueV1f(gl, v) {
    const cache = this.cache;

    if (cache[0] === v) return;

    gl.uniform1f(this.addr, v);

    cache[0] = v;
}

function setValueV2f(gl, v) {
    const cache = this.cache;

    if (v.x !== undefined) {
        if (cache[0] !== v.x || cache[1] !== v.y) {
            gl.uniform2f(this.addr, v.x, v.y);

            cache[0] = v.x;
            cache[1] = v.y;
        }
    } else {
        v = v.slice(0, 2);
        if (arraysEqual(cache, v)) return;

        gl.uniform2fv(this.addr, v);

        copyArray(cache, v);
    }
}

function setValueV3f(gl, v) {
    const cache = this.cache;

    if (v.x !== undefined) {
        if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z) {
            gl.uniform3f(this.addr, v.x, v.y, v.z);

            cache[0] = v.x;
            cache[1] = v.y;
            cache[2] = v.z;
        }
    } else if (v.r !== undefined) {
        if (cache[0] !== v.r || cache[1] !== v.g || cache[2] !== v.b) {
            gl.uniform3f(this.addr, v.r, v.g, v.b);

            cache[0] = v.r;
            cache[1] = v.g;
            cache[2] = v.b;
        }
    } else {
        v = v.slice(0, 3);
        if (arraysEqual(cache, v)) return;

        gl.uniform3fv(this.addr, v);

        copyArray(cache, v);
    }
}

function setValueV4f(gl, v) {
    const cache = this.cache;

    if (v.x !== undefined) {
        if (
            cache[0] !== v.x ||
            cache[1] !== v.y ||
            cache[2] !== v.z ||
            cache[3] !== v.w
        ) {
            gl.uniform4f(this.addr, v.x, v.y, v.z, v.w);

            cache[0] = v.x;
            cache[1] = v.y;
            cache[2] = v.z;
            cache[3] = v.w;
        }
    } else if (v.r !== undefined) {
        if (
            cache[0] !== v.r ||
            cache[1] !== v.g ||
            cache[2] !== v.b ||
            cache[3] !== v.a
        ) {
            gl.uniform4f(this.addr, v.r, v.g, v.b, v.a);

            cache[0] = v.r;
            cache[1] = v.g;
            cache[2] = v.b;
            cache[3] = v.a;
        }
    } else {
        v = v.slice(0, 4);
        if (arraysEqual(cache, v)) return;

        gl.uniform4fv(this.addr, v);

        copyArray(cache, v);
    }
}

function setValueM2(gl, v) {
    const cache = this.cache;
    const elements = v.elements;

    if (elements === undefined) {
        if (arraysEqual(cache, v)) return;

        gl.uniformMatrix2fv(this.addr, false, v);

        copyArray(cache, v);
    } else {
        if (arraysEqual(cache, elements)) return;

        mat2array.set(elements);

        gl.uniformMatrix2fv(this.addr, false, mat2array);

        copyArray(cache, elements);
    }
}

function setValueM3(gl, v) {
    const cache = this.cache;
    const elements = v.elements;

    if (elements === undefined) {
        if (arraysEqual(cache, v)) return;

        gl.uniformMatrix3fv(this.addr, false, v);

        copyArray(cache, v);
    } else {
        if (arraysEqual(cache, elements)) return;

        mat3array.set(elements);

        gl.uniformMatrix3fv(this.addr, false, mat3array);

        copyArray(cache, elements);
    }
}

function setValueM4(gl, v) {
    const cache = this.cache;
    const elements = v.elements;

    if (elements === undefined) {
        if (arraysEqual(cache, v)) return;

        gl.uniformMatrix4fv(this.addr, false, v);

        copyArray(cache, v);
    } else {
        if (arraysEqual(cache, elements)) return;

        mat4array.set(elements);

        gl.uniformMatrix4fv(this.addr, false, mat4array);

        copyArray(cache, elements);
    }
}

function setValueT1(gl, v, textures) {
    const cache = this.cache;
    const unit = textures.allocateTextureUnit();

    if (cache[0] !== unit) {
        gl.uniform1i(this.addr, unit);
        cache[0] = unit;
    }

    textures.setTexture2D(gl, v, unit);
}

function setValueV1i(gl, v) {
    const cache = this.cache;

    if (cache[0] === v) return;

    gl.uniform1i(this.addr, v);

    cache[0] = v;
}

function setValueV2i(gl, v) {
    v = v.slice(0, 2);

    const cache = this.cache;

    if (arraysEqual(cache, v)) return;

    gl.uniform2iv(this.addr, v);

    copyArray(cache, v);
}

function setValueV3i(gl, v) {
    v = v.slice(0, 3);

    const cache = this.cache;

    if (arraysEqual(cache, v)) return;

    gl.uniform3iv(this.addr, v);

    copyArray(cache, v);
}

function setValueV4i(gl, v) {
    v = v.slice(0, 4);

    const cache = this.cache;

    if (arraysEqual(cache, v)) return;

    gl.uniform4iv(this.addr, v);

    copyArray(cache, v);
}

function setValueV1ui(gl, v) {
    const cache = this.cache;

    if (cache[0] === v) return;

    gl.uniform1ui(this.addr, v);

    cache[0] = v;
}

// Helper to pick the right setter for the singular case

function getSingularSetter(type) {
    switch (type) {
        case 0x1406:
            return setValueV1f; // FLOAT
        case 0x8b50:
            return setValueV2f; // _VEC2
        case 0x8b51:
            return setValueV3f; // _VEC3
        case 0x8b52:
            return setValueV4f; // _VEC4

        case 0x8b5a:
            return setValueM2; // _MAT2
        case 0x8b5b:
            return setValueM3; // _MAT3
        case 0x8b5c:
            return setValueM4; // _MAT4

        case 0x1404:
        case 0x8b56:
            return setValueV1i; // INT, BOOL
        case 0x8b53:
        case 0x8b57:
            return setValueV2i; // _VEC2
        case 0x8b54:
        case 0x8b58:
            return setValueV3i; // _VEC3
        case 0x8b55:
        case 0x8b59:
            return setValueV4i; // _VEC4

        case 0x1405:
            return setValueV1ui; // UINT

        case 0x8b5e: // SAMPLER_2D
        case 0x8d66: // SAMPLER_EXTERNAL_OES
        case 0x8dca: // INT_SAMPLER_2D
        case 0x8dd2: // UNSIGNED_INT_SAMPLER_2D
        case 0x8b62: // SAMPLER_2D_SHADOW
            return setValueT1;
    }
}

// Array of scalars
function setValueV1fArray(gl, v) {
    gl.uniform1fv(this.addr, v);
}

function setValueV1iArray(gl, v) {
    gl.uniform1iv(this.addr, v);
}

function setValueV2iArray(gl, v) {
    gl.uniform2iv(this.addr, v);
}

function setValueV3iArray(gl, v) {
    gl.uniform3iv(this.addr, v);
}

function setValueV4iArray(gl, v) {
    gl.uniform4iv(this.addr, v);
}

function setValueV2fArray(gl, v) {
    const data = flatten(v, this.size, 2);

    gl.uniform2fv(this.addr, data);
}

function setValueV3fArray(gl, v) {
    const data = flatten(v, this.size, 3);

    gl.uniform3fv(this.addr, data);
}

function setValueV4fArray(gl, v) {
    const data = flatten(v, this.size, 4);

    gl.uniform4fv(this.addr, data);
}

function setValueM2Array(gl, v) {
    const data = flatten(v, this.size, 4);

    gl.uniformMatrix2fv(this.addr, false, data);
}

function setValueM3Array(gl, v) {
    const data = flatten(v, this.size, 9);

    gl.uniformMatrix3fv(this.addr, false, data);
}

function setValueM4Array(gl, v) {
    const data = flatten(v, this.size, 16);

    gl.uniformMatrix4fv(this.addr, false, data);
}

function setValueT1Array(gl, v, textures) {
    const n = v.length;

    const units = allocTexUnits(textures, n);

    gl.uniform1iv(this.addr, units);

    for (let i = 0; i !== n; ++i) {
        textures.setTexture2D(gl, v[i], units[i]);
    }
}

// Helper to pick the right setter for a pure (bottom-level) array

function getPureArraySetter(type) {
    switch (type) {
        case 0x1406:
            return setValueV1fArray; // FLOAT
        case 0x8b50:
            return setValueV2fArray; // _VEC2
        case 0x8b51:
            return setValueV3fArray; // _VEC3
        case 0x8b52:
            return setValueV4fArray; // _VEC4

        case 0x8b5a:
            return setValueM2Array; // _MAT2
        case 0x8b5b:
            return setValueM3Array; // _MAT3
        case 0x8b5c:
            return setValueM4Array; // _MAT4

        case 0x1404:
        case 0x8b56:
            return setValueV1iArray; // INT, BOOL
        case 0x8b53:
        case 0x8b57:
            return setValueV2iArray; // _VEC2
        case 0x8b54:
        case 0x8b58:
            return setValueV3iArray; // _VEC3
        case 0x8b55:
        case 0x8b59:
            return setValueV4iArray; // _VEC4

        case 0x8b5e: // SAMPLER_2D
        case 0x8d66: // SAMPLER_EXTERNAL_OES
        case 0x8dca: // INT_SAMPLER_2D
        case 0x8dd2: // UNSIGNED_INT_SAMPLER_2D
        case 0x8b62: // SAMPLER_2D_SHADOW
            return setValueT1Array;
    }
}

// --- Uniform Classes ---

class SingleUniform {
    constructor(id, activeInfo, addr) {
        this.id = id;
        this.addr = addr;
        this.cache = [];
        this.setValue = getSingularSetter(activeInfo.type);

        // this.path = activeInfo.name; // DEBUG
    }
}

class PureArrayUniform {
    constructor(id, activeInfo, addr) {
        this.id = id;
        this.addr = addr;
        this.cache = [];
        this.size = activeInfo.size;
        this.setValue = getPureArraySetter(activeInfo.type);

        // this.path = activeInfo.name; // DEBUG
    }

    updateCache(data) {
        const cache = this.cache;

        if (data instanceof Float32Array && cache.length !== data.length) {
            this.cache = new Float32Array(data.length);
        }

        copyArray(cache, data);
    }
}

class StructuredUniform {
    constructor(id) {
        this.id = id;

        this.seq = [];
        this.map = {};
    }

    setValue(gl, value) {
        const seq = this.seq;

        for (let i = 0, n = seq.length; i !== n; ++i) {
            const u = seq[i];
            u.setValue(gl, value[u.id]);
        }
    }
}

// --- Top-level ---

// Parser - builds up the property tree from the path strings

const RePathPart = /([\w\d_]+)(\])?(\[|\.)?/g;

// extracts
// 	- the identifier (member name or array index)
//  - followed by an optional right bracket (found when array index)
//  - followed by an optional left bracket or dot (type of subscript)
//
// Note: These portions can be read in a non-overlapping fashion and
// allow straightforward parsing of the hierarchy that WebGL encodes
// in the uniform names.

function addUniform(container, uniformObject) {
    container.seq.push(uniformObject);
    container.map[uniformObject.id] = uniformObject;
}

function parseUniform(activeInfo, addr, container) {
    const path = activeInfo.name,
        pathLength = path.length;

    // reset RegExp object, because of the early exit of a previous run
    RePathPart.lastIndex = 0;

    while (true) {
        const match = RePathPart.exec(path),
            matchEnd = RePathPart.lastIndex;

        let id = match[1];
        const idIsIndex = match[2] === "]",
            subscript = match[3];

        if (idIsIndex) id = id | 0; // convert to integer

        if (
            subscript === undefined ||
            (subscript === "[" && matchEnd + 2 === pathLength)
        ) {
            // bare name or "pure" bottom-level array "[0]" suffix

            addUniform(
                container,
                subscript === undefined
                    ? new SingleUniform(id, activeInfo, addr)
                    : new PureArrayUniform(id, activeInfo, addr)
            );

            break;
        } else {
            // step into inner node / create it in case it doesn't exist

            const map = container.map;
            let next = map[id];

            if (next === undefined) {
                next = new StructuredUniform(id);
                addUniform(container, next);
            }

            container = next;
        }
    }
}

// Root Container

export default class Uniforms {
    constructor(gl, program) {
        this.seq = [];
        this.map = {};

        const n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

        for (let i = 0; i < n; ++i) {
            const info = gl.getActiveUniform(program, i),
                addr = gl.getUniformLocation(program, info.name);

            parseUniform(info, addr, this);
        }
    }

    setValue(gl, name, value, textures) {
        const u = this.map[name];

        if (u !== undefined) u.setValue(gl, value, textures);
    }

    setOptional(gl, object, name, textures) {
        const v = object[name];

        if (v !== undefined) this.setValue(gl, name, v, textures);
    }
}
