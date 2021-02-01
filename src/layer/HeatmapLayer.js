import Layer from "./Layer";

import { VertexBuffer, IndexBuffer } from "../core/Buffer";
import VertexArrayObject from "../core/VertexArrayObject";
import FrameBufferObject from "../core/FrameBufferObject";
import Intensity from "../core/Intensity";
import Program from "../core/Program";

import { createTexture } from "../helper/texture";
import { circle } from "../helper/cavans";

import { mat4 } from "gl-matrix";

class HeatmapLayer extends Layer {
    constructor(options) {
        super(options);
        this.bufferData = [];
    }

    getDefaultOptions() {
        return {
            size: 13,
            unit: "px",
            height: 0,
            max: 100,
            min: 0,
        };
    }

    initialize(gl) {
        const { gradient } = this.getOptions();

        // fbo
        this.frameBuffer = new FrameBufferObject(gl);
        this.webglLayer.map.onResize(() => {
            this.frameBuffer = new FrameBufferObject(gl);
        });

        // init texture
        this.circle = circle(64);
        this.circleTexture = createTexture(gl, this.circle, {
            TEXTURE_WRAP_S: "CLAMP_TO_EDGE",
            TEXTURE_WRAP_T: "CLAMP_TO_EDGE",
        });
        this.intensity = new Intensity({ gradient });
        this.paletteTexture = createTexture(
            gl,
            this.intensity.paletteCtx.canvas,
            {
                TEXTURE_WRAP_S: "CLAMP_TO_EDGE",
                TEXTURE_WRAP_T: "CLAMP_TO_EDGE",
            }
        );

        // init program
        this.offlineProgram = new Program(
            this.gl,
            {
                vertexShader: `uniform mat4 u_matrix;uniform mat4 pointToPixelMatrix;uniform mat4 pixelToViewMatrix;uniform mat4 projectionMatrix;uniform int unit;uniform float size;uniform float max;uniform float min;attribute vec3 aPos;attribute vec2 aOffset;attribute float aCount;varying vec2 vOffset;varying float vCount;varying vec3 vPosition;void main(){vOffset=aOffset;vCount=(aCount-min)/(max-min);if(unit==1){vec2 pos=(pointToPixelMatrix*vec4(aPos.xy,0.0,1.0)).xy+aOffset.xy*size/2.0;gl_Position=projectionMatrix*pixelToViewMatrix*vec4(pos,0.0,1.0);}else{vec2 pos=aPos.xy+aOffset.xy*size;gl_Position=u_matrix*vec4(pos,0.0,1.0);}vPosition=vec3(gl_Position.z/gl_Position.w);}`,
                fragmentShader: `varying vec2 vOffset;varying float vCount;varying vec3 vPosition;uniform sampler2D uCircle;void main(){vec4 circle=texture2D(uCircle,(vOffset+1.0)/2.0);float intensity=circle.a*vCount;if(intensity<=0.0){discard;}gl_FragColor=vec4(vPosition,intensity);}`,
            },
            this
        );
        this.offlineBuffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.offlineIndexBuffer = new Buffer({
            gl: gl,
            target: "ELEMENT_ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.offlineVertexArray = new VertexArray({
            gl: gl,
            program: this.offlineProgram,
            attributes: [
                {
                    stride: 24,
                    name: "aPos",
                    buffer: this.offlineBuffer,
                    size: 3,
                    type: "FLOAT",
                    offset: 0,
                },
                {
                    stride: 24,
                    name: "aOffset",
                    buffer: this.offlineBuffer,
                    size: 2,
                    type: "FLOAT",
                    offset: 12,
                },
                {
                    stride: 24,
                    name: "aCount",
                    buffer: this.offlineBuffer,
                    size: 1,
                    type: "FLOAT",
                    offset: 20,
                },
            ],
        });

        this.program = new Program(
            this.gl,
            {
                vertexShader: `attribute vec2 aPos;varying vec2 vPos;uniform float uHeight;uniform mat4 pixelToViewMatrix;uniform mat4 projectionMatrix;uniform sampler2D u_sampler;uniform mat4 inverseMatrix;void main(){vPos=aPos;if(uHeight<=0.0){gl_Position=vec4(aPos,0.0,1.0);}else{vec4 gray=texture2D(u_sampler,(aPos+1.0)/2.0);vec4 m0=inverseMatrix*vec4(aPos.xy,0.0,1.0);vec4 m1=inverseMatrix*vec4(aPos.xy,1.0,1.0);m0/=m0.w;m1/=m1.w;vec4 pixel=m0+(-m0.z/(m1.z-m0.z))*(m1-m0);pixel.z=uHeight*gray.a;gl_Position=projectionMatrix*pixelToViewMatrix*vec4(pixel.xyz,1.0);}}`,
                fragmentShader: `uniform sampler2D u_sampler;uniform sampler2D u_samplerPalette;uniform float uHeight;varying vec2 vPos;void main(){vec4 gray=texture2D(u_sampler,(vPos+1.0)/2.0);float grayAlpha=gray.a;if(grayAlpha<=0.0){discard;}vec4 color=texture2D(u_samplerPalette,vec2(grayAlpha,1.0));gl_FragColor=vec4(color.rgb,grayAlpha);}`,
            },
            this
        );
        this.indexBuffer = new Buffer({
            gl: gl,
            target: "ELEMENT_ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.buffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.vertexArray = new VertexArray({
            gl: gl,
            program: this.program,
            attributes: [
                {
                    stride: 8,
                    name: "aPos",
                    buffer: this.buffer,
                    size: 2,
                    type: "FLOAT",
                    offset: 0,
                },
            ],
        });

        const bufferData = [],
            indexData = [],
            g = Math.floor(gl.canvas.width / 4),
            h = Math.floor(gl.canvas.height / 4),
            m = g + 1;

        for (let p = 0; p <= h; p++) {
            for (let n = 0; n <= g; n++) {
                bufferData.push((2 * n) / g - 1, (2 * p) / h - 1);

                if (n < g && p < h) {
                    const l = m * p + n,
                        r = m * (p + 1) + n;

                    indexData.push(l, l + 1, r + 1);
                    indexData.push(l, r + 1, r);
                }
            }
        }
        this.bufferData = bufferData;
        this.buffer.updateData(new Float32Array(bufferData));
        this.indexData = indexData;
        this.indexBuffer.updateData(new Uint32Array(indexData));
    }

    onOptionsChanged(newOptions, oldOptions) {
        const gl = this.gl;

        if (gl && newOptions.gradient !== oldOptions.gradient) {
            this.intensity = new Intensity({
                gradient: newOptions.gradient,
            });

            this.paletteTexture = createTexture(
                gl,
                this.intensity.paletteCtx.canvas,
                {
                    TEXTURE_WRAP_S: "CLAMP_TO_EDGE",
                    TEXTURE_WRAP_T: "CLAMP_TO_EDGE",
                }
            );
        }
    }

    onDataChanged(data) {
        if (this.gl) {
            const b = [],
                c = [];

            for (let d = 0; d < data.length; d++) {
                let g = data[d],
                    h = this.normizedPoint(data[d].geometry.coordinates),
                    m = void 0 === g.count ? 1 : g.count;
                "properties" in g &&
                    "count" in g.properties &&
                    (m = g.properties.count);
                b.push(h[0], h[1], h[2]);
                b.push(-1, -1);
                b.push(m);
                b.push(h[0], h[1], h[2]);
                b.push(-1, 1);
                b.push(m);
                b.push(h[0], h[1], h[2]);
                b.push(1, 1);
                b.push(m);
                b.push(h[0], h[1], h[2]);
                b.push(1, -1);
                b.push(m);
                g = 4 * d;
                c.push(g + 0, g + 2, g + 1);
                c.push(g + 0, g + 3, g + 2);
            }
            this.offlineBufferData = b;
            this.offlineIndexData = c;
            this.offlineBuffer.updateData(new Float32Array(b));
            this.offlineIndexBuffer.updateData(new Uint32Array(c));
        }
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix,
            pointToPixelMatrix = transferOptions.pointToPixelMatrix,
            pixelToViewMatrix = transferOptions.pixelToViewMatrix,
            projectionMatrix = transferOptions.projectionMatrix;

        if (this.offlineBufferData && !(0 >= this.offlineBufferData.length)) {
            const options = this.getOptions();

            gl.enable(gl.BLEND);
            gl.disable(gl.DEPTH_TEST);
            gl.blendFunc(gl.ONE, gl.ONE);
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer.framebuffer);

            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            this.offlineProgram.use(gl);
            this.offlineProgram.setUniforms({
                u_matrix: matrix,
                pointToPixelMatrix: pointToPixelMatrix,
                pixelToViewMatrix: pixelToViewMatrix,
                projectionMatrix: projectionMatrix,
                uCircle: this.circleTexture,
                unit: "px" === options.unit ? 1 : 0,
                size: options.size,
                max: options.max,
                min: options.min,
            });
            this.offlineVertexArray.bind();
            this.offlineIndexBuffer.bind();
            gl.drawElements(
                gl.TRIANGLES,
                this.offlineIndexData.length,
                gl.UNSIGNED_INT,
                0
            );
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);

            this.program.use(gl);
            gl.enable(gl.DEPTH_TEST);
            gl.disable(gl.BLEND);
            const inverseMatrix = mat4.create();
            mat4.multiply(inverseMatrix, projectionMatrix, pixelToViewMatrix);
            mat4.invert(inverseMatrix, inverseMatrix);
            this.program.setUniforms({
                u_sampler: this.frameBuffer.framebuffer.texture,
                u_samplerPalette: this.paletteTexture,
                uHeight: options.height,
                pixelToViewMatrix: pixelToViewMatrix,
                inverseMatrix: inverseMatrix,
                projectionMatrix: projectionMatrix,
            });
            this.vertexArray.bind();
            this.indexBuffer.bind();
            gl.drawElements(
                gl.TRIANGLES,
                this.indexData.length,
                gl.UNSIGNED_INT,
                0
            );
        }
    }
}

export default HeatmapLayer;
