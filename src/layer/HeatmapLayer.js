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
        this.circleTexture = createTexture(gl, circle(64), {
            TEXTURE_WRAP_S: "CLAMP_TO_EDGE",
            TEXTURE_WRAP_T: "CLAMP_TO_EDGE",
        });
        this.paletteTexture = createTexture(
            gl,
            new Intensity({ gradient }).paletteCtx.canvas,
            {
                TEXTURE_WRAP_S: "CLAMP_TO_EDGE",
                TEXTURE_WRAP_T: "CLAMP_TO_EDGE",
            }
        );

        // init program
        this.offlineProgram = new Program(
            gl,
            {
                vertexShader: `
                uniform mat4 uMatrix;
                uniform float uMax;
                uniform float uMin;
                uniform float uZoomUnits;
                
                attribute vec3 aPos;
                attribute vec2 aOffset;
                attribute float aCount;
                attribute float aSize;

                varying vec2 vOffset;
                varying float vCount;
                varying vec3 vPosition;
                
                void main() {
                    vOffset = aOffset;
                    vCount = (aCount - uMin) / (uMax - uMin);
                    
                    vec2 pos = aPos.xy + aOffset.xy * aSize * uZoomUnits / 2.0;
                    gl_Position = uMatrix * vec4(pos, 0.0, 1.0);
                    
                    vPosition = vec3(gl_Position.z / gl_Position.w);
                }`,
                fragmentShader: `
                varying vec2 vOffset;
                varying float vCount;
                varying vec3 vPosition;
                
                uniform sampler2D uCircle;
                
                void main() {
                    vec4 circle = texture2D(uCircle, (vOffset + 1.0) / 2.0);
                    float intensity = circle.a * vCount;

                    if (intensity <= 0.0) {
                        discard;
                    }

                    gl_FragColor = vec4(vPosition, intensity);
                }`,
            },
            this
        );

        this.offlineBuffer = new VertexBuffer({
            gl,
            attributes: [
                {
                    name: "aPos",
                    size: 3,
                },
                {
                    name: "aOffset",
                    size: 2,
                },
                {
                    name: "aCount",
                    size: 1,
                },
                {
                    name: "aSize",
                    size: 1,
                },
            ],
        });
        this.offlineIndexBuffer = new IndexBuffer({ gl });
        this.offlineVAO = new VertexArrayObject();

        // init program2
        this.program = new Program(
            gl,
            {
                vertexShader: `
                attribute vec2 aPos;
                
                varying vec2 vPos;

                uniform float uHeight;
                uniform mat4 pixelToViewMatrix;
                uniform mat4 projectionMatrix;
                uniform mat4 inverseMatrix;
                uniform sampler2D uSampler;
                
                void main() {
                    vPos = aPos;
                    
                    if (uHeight <= 0.0) {
                        gl_Position = vec4(aPos, 0.0, 1.0);
                    } else {
                        vec4 gray = texture2D(uSampler, (aPos + 1.0) / 2.0);
                        vec4 m0 = inverseMatrix * vec4(aPos.xy, 0.0, 1.0);
                        vec4 m1 = inverseMatrix * vec4(aPos.xy, 1.0, 1.0);
                        m0 /= m0.w;
                        m1 /= m1.w;
                        vec4 pixel = m0 + (-m0.z / (m1.z - m0.z)) * (m1 - m0);
                        pixel.z = uHeight * gray.a;
                        gl_Position = projectionMatrix * pixelToViewMatrix * vec4(pixel.xyz, 1.0);
                    }
                }`,
                fragmentShader: `
                uniform sampler2D uSampler;
                uniform sampler2D uSamplerPalette;
                uniform float uHeight;
                
                varying vec2 vPos;
                
                void main() {
                    vec4 gray = texture2D(uSampler, (vPos + 1.0) / 2.0);
                    float grayAlpha = gray.a;
                    
                    if (grayAlpha <= 0.0) {
                        discard;
                    }
                    
                    vec4 color = texture2D(uSamplerPalette, vec2(grayAlpha, 1.0));
                    gl_FragColor = vec4(color.rgb, grayAlpha);
                }`,
            },
            this
        );

        // 构建三角网
        const bufferData = [],
            indexData = [],
            g = Math.floor(gl.canvas.width / 4),
            h = Math.floor(gl.canvas.height / 4),
            m = g + 1;
        for (let i = 0; i <= h; i++) {
            for (let j = 0; j <= g; j++) {
                bufferData.push((2 * j) / g - 1, (2 * i) / h - 1);

                if (j < g && i < h) {
                    const l = m * i + j,
                        r = m * (i + 1) + j;

                    indexData.push(l, l + 1, r + 1);
                    indexData.push(l, r + 1, r);
                }
            }
        }

        this.buffer = new VertexBuffer({
            gl,
            data: bufferData,
            attributes: [{ name: "aPos", size: 2 }],
        });
        this.indexBuffer = new IndexBuffer({
            gl,
            data: indexData,
        });
        this.vao = new VertexArrayObject();
    }

    onOptionsChanged(newOptions, oldOptions) {
        const gl = this.gl;

        if (gl && newOptions.gradient !== oldOptions.gradient) {
            const intensity = new Intensity({ gradient: newOptions.gradient });

            this.paletteTexture = createTexture(
                gl,
                intensity.paletteCtx.canvas,
                {
                    TEXTURE_WRAP_S: "CLAMP_TO_EDGE",
                    TEXTURE_WRAP_T: "CLAMP_TO_EDGE",
                }
            );
        }
    }

    onDataChanged(data) {
        if (this.gl) {
            const bufferData = [],
                indexData = [];

            for (let i = 0; i < data.length; i++) {
                const point = data[i],
                    coord = this.normizedPoint(data[i].geometry.coordinates);

                let count = this.getValue("count", point);
                count = count === undefined ? 1 : count;
                const size = this.getValue("size", point);

                bufferData.push(coord[0], coord[1], coord[2]);
                bufferData.push(-1, -1);
                bufferData.push(count);
                bufferData.push(size);
                bufferData.push(coord[0], coord[1], coord[2]);
                bufferData.push(-1, 1);
                bufferData.push(count);
                bufferData.push(size);
                bufferData.push(coord[0], coord[1], coord[2]);
                bufferData.push(1, 1);
                bufferData.push(count);
                bufferData.push(size);
                bufferData.push(coord[0], coord[1], coord[2]);
                bufferData.push(1, -1);
                bufferData.push(count);
                bufferData.push(size);

                const index = 4 * i;
                indexData.push(index + 0, index + 2, index + 1);
                indexData.push(index + 0, index + 3, index + 2);
            }
            this.offlineBufferData = bufferData;
            this.offlineIndexData = indexData;
            this.offlineBuffer.setData(bufferData);
            this.offlineIndexBuffer.setData(indexData);
        }
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix,
            pixelToViewMatrix =
                transferOptions.pixelToViewMatrix || mat4.create(),
            projectionMatrix =
                transferOptions.projectionMatrix || mat4.create();

        if (this.offlineBufferData && !(0 >= this.offlineBufferData.length)) {
            const options = this.getOptions();

            // 绑定缓冲区，进行离屛渲染
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer.framebuffer);
            
            gl.clearCanvas();

            gl.enable(gl.BLEND);
            gl.disable(gl.DEPTH_TEST);
            gl.blendFunc(gl.ONE, gl.ONE);

            this.offlineProgram.use(gl);
            this.offlineProgram.setUniforms({
                uMatrix: matrix,
                uCircle: this.circleTexture,
                uMax: options.max,
                uMin: options.min,
                uZoomUnits:
                    "m" === this.options.unit
                        ? this.normizedHeight(1, this.map.getCenter())
                        : this.map.getZoomUnits(),
            });
            this.offlineVAO.bind({
                gl,
                program: this.offlineProgram,
                vertexBuffer: this.offlineBuffer,
                indexBuffer: this.offlineIndexBuffer,
            });
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
                uSampler: this.frameBuffer.framebuffer.texture,
                uSamplerPalette: this.paletteTexture,
                uHeight: options.height,
                pixelToViewMatrix: pixelToViewMatrix,
                inverseMatrix: inverseMatrix,
                projectionMatrix: projectionMatrix,
            });
            this.vao.bind({
                gl,
                program: this.program,
                indexBuffer: this.indexBuffer,
                vertexBuffer: this.buffer,
            });
            gl.drawElements(
                gl.TRIANGLES,
                this.indexBuffer.numberOfIndices,
                gl.UNSIGNED_INT,
                0
            );
        }
    }
}

export default HeatmapLayer;
