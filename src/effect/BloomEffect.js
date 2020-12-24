import Effect from "./Effect";
import Program from "../core/Program";
import { VertexBuffer } from "../core/Buffer";
import VertexArrayObject from "../core/VertexArrayObject";
import FrameBufferObject from "../core/FrameBufferObject";

import ShaderEffect from "../shaders/shaderEffect";

export default class BloomEffect extends Effect {
    getProgram(gl) {
        if (!this.programBright) {
            this.programBright = new Program(gl, {
                vertexShader: ShaderEffect.common_vert,
                fragmentShader: ShaderEffect.bloom_bright_frag,
            });
        }

        if (!this.programBloom) {
            this.programBloom = new Program(gl, {
                vertexShader: ShaderEffect.common_vert,
                fragmentShader: ShaderEffect.bloom_bloom_frag,
            });
        }

        if (!this.programResult) {
            this.programResult = new Program(gl, {
                vertexShader: ShaderEffect.common_vert,
                fragmentShader: ShaderEffect.bloom_result_frag,
            });
        }

        return {
            programBright: this.programBright,
            programBloom: this.programBloom,
            programResult: this.programResult,
        };
    }

    onResize(gl) {
        this.collectBrightBuffer = new FrameBufferObject(gl);
        this.bloomBuffer = new FrameBufferObject(gl);
    }

    getExtraFbo(gl) {
        if (!this.collectBrightBuffer) {
            this.collectBrightBuffer = new FrameBufferObject(gl);
        }
        if (!this.bloomBuffer) {
            this.bloomBuffer = new FrameBufferObject(gl);
        }

        return {
            collectBrightBuffer: this.collectBrightBuffer.framebuffer,
            bloomBuffer: this.bloomBuffer.framebuffer,
        };
    }

    getVaos() {
        if (!this.vaos) {
            this.vaos = {
                brightVao: new VertexArrayObject(),
                bloomVao: new VertexArrayObject(),
                resultVao: new VertexArrayObject(),
            };
        }

        return this.vaos;
    }

    getVertexBuffers(gl) {
        if (!this.buffers) {
            this.buffers = [
                new VertexBuffer({
                    gl,
                    data: new Float32Array(this.vertex),
                    attributes: [
                        {
                            name: "aPos",
                            size: 3,
                        },
                    ],
                }),
                new VertexBuffer({
                    gl,
                    data: new Float32Array(this.sampleCoord),
                    attributes: [
                        {
                            name: "aTextureCoord",
                            size: 2,
                        },
                    ],
                }),
            ];
        }

        return this.buffers;
    }

    render(renderOptions) {
        const gl = renderOptions.gl,
            texture = renderOptions.texture,
            fbo = renderOptions.fbo,
            options = this.getOptions();

        gl.clearCanvas();

        const programs = this.getProgram(gl),
            programBright = programs.programBright,
            programBloom = programs.programBloom,
            programResult = programs.programResult;

        const fbos = this.getExtraFbo(gl),
            collectBrightBuffer = fbos.collectBrightBuffer,
            bloomBuffer = fbos.bloomBuffer;

        const vaos = this.getVaos(),
            brightVao = vaos.brightVao,
            bloomVao = vaos.bloomVao,
            resultVao = vaos.resultVao;

        const vertexBuffers = this.getVertexBuffers(gl);

        // 变亮
        programBright.use(gl);
        gl.bindFramebuffer(gl.FRAMEBUFFER, collectBrightBuffer);
        gl.clearCanvas();
        brightVao.bind({
            gl,
            program: programBright,
            vertexBuffers: vertexBuffers,
        });
        programBright.setUniforms({
            uSampler: texture,
            threshold: options.threshold || 0,
        });
        gl.drawArrays(gl.TRIANGLES, 0, this.vertex.length / 3);

        // 晕光
        programBloom.use(gl);
        gl.bindFramebuffer(gl.FRAMEBUFFER, bloomBuffer);
        gl.clearCanvas();
        bloomVao.bind({
            gl,
            program: programBloom,
            vertexBuffers: vertexBuffers,
        });
        programBloom.setUniforms({
            uSampler: collectBrightBuffer.texture,
            isVertical: true,
            blurSize: options.blurSize || 2,
            devicePixelRatio: window.devicePixelRatio,
            canvasSize: [gl.canvas.width, gl.canvas.height],
        });
        gl.drawArrays(gl.TRIANGLES, 0, this.vertex.length / 3);

        programBloom.use(gl);
        gl.bindFramebuffer(gl.FRAMEBUFFER, collectBrightBuffer);
        gl.clearCanvas();
        bloomVao.bind({
            gl,
            program: programBloom,
            vertexBuffers: vertexBuffers,
        });
        programBloom.setUniforms({
            uSampler: bloomBuffer.texture,
            isVertical: false,
            blurSize: options.blurSize || 2,
            devicePixelRatio: window.devicePixelRatio,
            canvasSize: [gl.canvas.width, gl.canvas.height],
        });
        gl.drawArrays(gl.TRIANGLES, 0, this.vertex.length / 3);

        // 结果处理
        programResult.use(gl);
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.clearCanvas();
        resultVao.bind({
            gl,
            program: programResult,
            vertexBuffers: vertexBuffers,
        });
        programResult.setUniforms({
            originalTexture: texture,
            bloomTexture: collectBrightBuffer.texture,
        });
        gl.drawArrays(gl.TRIANGLES, 0, this.vertex.length / 3);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.useProgram(null);
    }
}
