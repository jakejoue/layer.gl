import Layer from "./Layer";

import { VertexBuffer, IndexBuffer } from "../core/Buffer";
import VertexArrayObject from "../core/VertexArrayObject";
import FrameBufferObject from "../core/FrameBufferObject";
import Intensity from "../core/Intensity";
import Program from "../core/Program";

import { createTexture } from "../helper/texture";
import { circle } from "../helper/cavans";

import { mat4 } from "gl-matrix";

/**
 * @classdesc
 * 
 * 3D热力图，继承自 Layer
 * 
 * @extends Layer
 * 
 * @param {Object} options
 * @param {Number | Function=} [options.size=13] 单个点绘制大小
 * @param {String=} [options.unit='px'] 单位，m:米，px: 像素
 * @param {Number=} [options.height=0] 最大高度，默认为0
 * @param {Number=} [options.max=100] 最大阈值
 * @param {Number=} [options.min=5] 最小阈值
 * @param {Number | Function=} [options.count=1] 权重信息，配合阈值确定颜色值
 * @param {Object=} [options.gradient={0.0: 'rgb(50, 50, 256)', 0.1: 'rgb(50, 250, 56)', 0.5: 'rgb(250, 250, 56)',1.0: 'rgb(250, 50, 56)'}] 渐变色
 */
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
            { shaderId: "heatmap_offline" },
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
        this.program = new Program(gl, { shaderId: "heatmap" }, this);

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
            pixelToViewMatrix = transferOptions.pixelToViewMatrix,
            projectionMatrix = transferOptions.projectionMatrix;

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

            gl.enable(gl.DEPTH_TEST);
            gl.depthMask(true);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

            this.program.use(gl);
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
