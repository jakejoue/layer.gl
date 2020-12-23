import Effect from "./Effect";
import Program from "../core/Program";
import { VertexBuffer } from "../core/Buffer";
import VertexArrayObject from "../core/VertexArrayObject";
import FrameBufferObject from "../core/FrameBufferObject";

export default class BloomEffect extends Effect {
    getProgram(gl) {
        if (!this.programBright) {
            this.programBright = new Program(gl, {
                vertexShader: `
                attribute vec3 aPos;
                attribute vec2 aTextureCoord;
                
                varying vec2 vTextureCoord;
                
                void main() {
                    vTextureCoord = aTextureCoord;
                    gl_Position = vec4(aPos, 1.0);
                }`,
                fragmentShader: `
                precision mediump float;

                uniform sampler2D uSampler;
                uniform float threshold;

                varying vec2 vTextureCoord;
                
                void main() {
                    vec4 color = texture2D(uSampler, vTextureCoord);
                    vec4 lightColor = max(vec4(0.0), (color - (1.0 - threshold) / 5.0));
                    float brightness = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
                    
                    if (brightness > threshold) {
                        color = lightColor;
                    } else {
                        color = vec4(0.0);
                    }
                    gl_FragColor = color;
                }`,
            });
        }

        if (!this.programBloom) {
            this.programBloom = new Program(gl, {
                vertexShader: `
                attribute vec3 aPos;
                attribute vec2 aTextureCoord;

                varying vec2 vTextureCoord;

                void main() {
                    vTextureCoord = aTextureCoord;
                    gl_Position = vec4(aPos, 1.0);
                }`,
                fragmentShader: `
                precision mediump float;
                
                uniform sampler2D uSampler;
                
                uniform bool isVertical;
                uniform vec2 canvasSize;
                uniform float blurSize;
                uniform float devicePixelRatio;
                
                varying vec2 vTextureCoord;
                
                void main() {
                    float weight[10];
                    weight[0] = 0.2270270270;
                    weight[1] = 0.1945945946;
                    weight[2] = 0.1216216216;
                    weight[3] = 0.1135135135;
                    weight[4] = 0.0972972973;
                    weight[5] = 0.0608108108;
                    weight[6] = 0.0540540541;
                    weight[7] = 0.0270270270;
                    weight[8] = 0.0162162162;
                    weight[9] = 0.0081081081;
                    
                    vec2 offset = vec2(blurSize / canvasSize.x, blurSize / canvasSize.y) * devicePixelRatio;
                    vec4 result = texture2D(uSampler, vTextureCoord) * weight[0];
                    
                    if (isVertical) {
                        for (int i = 1; i < 10; ++i) {
                            result += texture2D(uSampler, vTextureCoord + vec2(0.0, offset.y * float(i))) * weight[i];
                            result += texture2D(uSampler, vTextureCoord - vec2(0.0,offset.y * float(i))) * weight[i];
                        }
                    } else {
                        for(int i = 1; i < 10; ++i) {
                            result += texture2D(uSampler, vTextureCoord + vec2(offset.x * float(i), 0.0)) * weight[i];
                            result += texture2D(uSampler, vTextureCoord - vec2(offset.x * float(i), 0.0)) * weight[i];
                        }
                    }

                    gl_FragColor = result;
                }`,
            });
        }

        if (!this.programResult) {
            this.programResult = new Program(gl, {
                vertexShader: `
                attribute vec3 aPos;
                attribute vec2 aTextureCoord;

                varying vec2 vTextureCoord;
                
                void main() { 
                    vTextureCoord = aTextureCoord;
                    gl_Position = vec4(aPos, 1.0);
                }`,
                fragmentShader: `
                precision mediump float;
                
                uniform sampler2D originalTexture;
                uniform sampler2D bloomTexture;
                
                varying vec2 vTextureCoord;
                
                void main() { 
                    vec4 color = texture2D(originalTexture, vTextureCoord);
                    vec4 bloomColor = texture2D(bloomTexture, vTextureCoord);

                    color += bloomColor;
                    gl_FragColor = color;
                }`,
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
