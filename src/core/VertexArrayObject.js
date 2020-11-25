export default class VertexArrayObject {
    constructor() {
        this.boundProgram = null;
        this.boundIndexBuffer = null;
        this.boundVertexBuffer = null;
        this.boundVertexBuffers = null;
        this.boundDynamicVertexBuffers = null;
        this.vao = null;
    }

    bind({
        gl,
        program,
        vertexBuffer = null,
        vertexBuffers = null,
        indexBuffer = null,
        dynamicVertexBuffers = null,
    }) {
        const context = (this.context = gl.context);

        const isFreshBindRequired =
            !this.vao ||
            this.boundProgram !== program ||
            this.boundIndexBuffer !== indexBuffer ||
            this.boundVertexBuffer !== vertexBuffer ||
            this.boundVertexBuffers !== vertexBuffers ||
            this.boundDynamicVertexBuffers !== dynamicVertexBuffers;

        if (!context.vertexArrayObject || isFreshBindRequired) {
            this.freshBind({
                program,
                vertexBuffer,
                vertexBuffers,
                indexBuffer,
                dynamicVertexBuffers,
            });
        } else {
            context.glBindVertexArray(this.vao);

            // 绑定动态更新的数据
            if (dynamicVertexBuffers) {
                for (const dynamicVertexBuffer of dynamicVertexBuffers) {
                    dynamicVertexBuffer.bind();
                }
            }

            if (indexBuffer && indexBuffer.dynamicDraw) {
                indexBuffer.bind();
            }
        }
    }

    freshBind({
        program,
        vertexBuffer,
        vertexBuffers,
        indexBuffer,
        dynamicVertexBuffers,
    }) {
        const context = this.context;
        const gl = context.gl;

        if (context.vertexArrayObject) {
            if (this.vao) this.destroy();
            this.vao = context.glCreateVertexArray();
            context.glBindVertexArray(this.vao);

            // store the arguments so that we can verify them when the vao is bound again
            this.boundProgram = program;
            this.boundIndexBuffer = indexBuffer;
            this.boundVertexBuffer = vertexBuffer;
            this.boundVertexBuffers = vertexBuffers;
            this.boundDynamicVertexBuffers = dynamicVertexBuffers;
        }

        if (vertexBuffer) {
            vertexBuffer.enableAttributes(gl, program);
        }

        if (vertexBuffers) {
            for (const vertexBuffer of vertexBuffers) {
                vertexBuffer.enableAttributes(gl, program);
            }
        }

        if (dynamicVertexBuffers) {
            for (const dynamicVertexBuffer of dynamicVertexBuffers) {
                dynamicVertexBuffer.enableAttributes(gl, program);
            }
        }

        if (vertexBuffer) {
            vertexBuffer.bind(gl, program);
            vertexBuffer.setVertexAttribPointers(gl, program);
        }

        if (vertexBuffers) {
            for (const vertexBuffer of vertexBuffers) {
                vertexBuffer.bind();
                vertexBuffer.setVertexAttribPointers(gl, program);
            }
        }

        if (dynamicVertexBuffers) {
            for (const dynamicVertexBuffer of dynamicVertexBuffers) {
                dynamicVertexBuffer.bind();
                dynamicVertexBuffer.setVertexAttribPointers(gl, program);
            }
        }

        if (indexBuffer) {
            indexBuffer.bind();
        }
    }

    destroy() {
        if (this.vao) {
            this.context.glDeleteVertexArray(this.vao);
            this.vao = null;
        }
    }
}
