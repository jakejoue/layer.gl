import TextureManager from './TextureManager';

function defineObj(obj, key, val) {
    const property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
        return;
    }
    const getter = property && property.get;
    const setter = property && property.set;

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            return getter ? getter.call(obj) : val;
        },
        set: function reactiveSetter(newVal) {
            const value = getter ? getter.call(obj) : val;
            if (newVal === value || (newVal !== newVal && value !== value)) {
                return;
            }

            newVal = getter ? setter.call(obj, newVal) : newVal;
        },
    });
}

function initGL(GLObj, gl) {
    for (const key in gl) {
        let value = gl[key];

        if (typeof value === "function") {
            value = value.bind(gl);
        }
        defineObj(GLObj, key, value);
    }
}

function isWebGl2(gl) {
    return WebGL2RenderingContext && gl instanceof WebGL2RenderingContext;
}

function getExtension(gl, names) {
    const length = names.length;
    for (let i = 0; i < length; ++i) {
        const extension = gl.getExtension(names[i]);
        if (extension) {
            return extension;
        }
    }

    return undefined;
}

export default class GL {
    constructor(gl) {
        this.webgl2 = isWebGl2(gl);

        // starnder api
        let glCreateVertexArray;
        let glBindVertexArray;
        let glDeleteVertexArray;
        let elementIndexUint;

        let glDrawElementsInstanced;
        let glDrawArraysInstanced;
        let glVertexAttribDivisor;

        let glDrawBuffers;

        // function state
        let vertexArrayObject;
        let instancedArrays;
        let drawBuffers;

        if (this.webgl2) {
            glCreateVertexArray = function () {
                return gl.createVertexArray();
            };
            glBindVertexArray = function (vao) {
                gl.bindVertexArray(vao);
            };
            glDeleteVertexArray = function (vao) {
                gl.deleteVertexArray(vao);
            };

            glDrawElementsInstanced = function (mode, count, type, offset, instanceCount) {
                gl.drawElementsInstanced(mode, count, type, offset, instanceCount);
            };
            glDrawArraysInstanced = function (mode, first, count, instanceCount) {
                gl.drawArraysInstanced(mode, first, count, instanceCount);
            };
            glVertexAttribDivisor = function (index, divisor) {
                gl.vertexAttribDivisor(index, divisor);
            };

            glDrawBuffers = function (buffers) {
                gl.drawBuffers(buffers);
            };
        } else {
            // Query and initialize extensions
            elementIndexUint = !!getExtension(gl, ["OES_element_index_uint"]);

            vertexArrayObject = getExtension(gl, ["OES_vertex_array_object"]);
            if (vertexArrayObject) {
                glCreateVertexArray = function () {
                    return vertexArrayObject.createVertexArrayOES();
                };
                glBindVertexArray = function (vertexArray) {
                    vertexArrayObject.bindVertexArrayOES(vertexArray);
                };
                glDeleteVertexArray = function (vertexArray) {
                    vertexArrayObject.deleteVertexArrayOES(vertexArray);
                };
            }

            instancedArrays = getExtension(gl, ["ANGLE_instanced_arrays"]);
            if (instancedArrays) {
                glDrawElementsInstanced = function (mode, count, type, offset, instanceCount) {
                    instancedArrays.drawElementsInstancedANGLE(mode, count, type, offset, instanceCount);
                };
                glDrawArraysInstanced = function (mode, first, count, instanceCount) {
                    instancedArrays.drawArraysInstancedANGLE(mode, first, count, instanceCount);
                };
                glVertexAttribDivisor = function (index, divisor) {
                    instancedArrays.vertexAttribDivisorANGLE(index, divisor);
                };
            }

            drawBuffers = getExtension(gl, ["WEBGL_draw_buffers"]);
            if (drawBuffers) {
                glDrawBuffers = function (buffers) {
                    drawBuffers.drawBuffersWEBGL(buffers);
                };
            }
        }

        this.glCreateVertexArray = glCreateVertexArray;
        this.glBindVertexArray = glBindVertexArray;
        this.glDeleteVertexArray = glDeleteVertexArray;

        this.glDrawElementsInstanced = glDrawElementsInstanced;
        this.glDrawArraysInstanced = glDrawArraysInstanced;
        this.glVertexAttribDivisor = glVertexAttribDivisor;

        this.glDrawBuffers = glDrawBuffers;

        this._elementIndexUint = !!elementIndexUint;
        this._vertexArrayObject = !!vertexArrayObject;
        this._instancedArrays = !!instancedArrays;
        this._drawBuffers = !!drawBuffers;

        // 全局纹理管理器
        this.textureManager = new TextureManager(gl);

        // 扩展原生的gl
        initGL(this, gl);
    }

    get elementIndexUint() {
        return this._elementIndexUint || this.webgl2;
    }

    get vertexArrayObject() {
        return this._vertexArrayObject || this.webgl2;
    }

    get instancedArrays() {
        return this._instancedArrays || this.webgl2;
    }

    get drawBuffers() {
        return this._drawBuffers || this.webgl2;
    }

    unbindVAO() {
        if (this.vertexArrayObject) {
            this.glBindVertexArray(null);
        }
    }
    
    clearCanvas({ color, mask } = {}) {
        color = color || [0, 0, 0, 0];
        mask = mask || this.COLOR_BUFFER_BIT | this.DEPTH_BUFFER_BIT;

        this.clearColor(...color);
        this.clear(mask);
    }
}
