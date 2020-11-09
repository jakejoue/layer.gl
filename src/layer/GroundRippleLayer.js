import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

import { mat4 } from "gl-matrix";

export default class GroundRippleLayer extends Layer {
    constructor(options) {
        super(options);
        this.opacity = 1;
        this.currentScale = 1;

        this.group = [];
        this.autoUpdate = true;
    }

    getDefaultOptions() {
        return {
            color: [0.1, 0.1, 0.9, 1],
            size: 5,
            segs: 36,
            scale: 2,
            step: 0.1,
        };
    }

    initialize(gl) {
        this.gl = gl;
        this.program = new Program(this.gl, {
            vertexShader: `
            uniform mat4 u_projectionMatrix;
            uniform mat4 u_modelViewMatrix;
            uniform mat4 u_modelMatrix;
            uniform float u_opacity;

            attribute vec4 aPos;
            attribute vec4 aColor;

            varying vec4 vColor;
            
            void main() {
                vColor = aColor;
                vColor.a = u_opacity;
                
                gl_Position = u_projectionMatrix * u_modelViewMatrix * u_modelMatrix * vec4(aPos.xyz, 1.0);
            }`,
            fragmentShader: `
            precision highp float;
            varying vec4 vColor;

            void main() {
                if(vColor.a == 0.0) {
                    discard;
                }
                gl_FragColor = vColor;
            }`,
        });

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
        const attributes = [
            {
                name: "aPos",
                buffer: this.buffer,
                size: 3,
                type: "FLOAT",
                offset: 0,
            },
            {
                name: "aColor",
                buffer: this.buffer,
                size: 4,
                type: "FLOAT",
                offset: 12,
            },
        ];
        this.vertexArray = new VertexArray({
            gl: gl,
            program: this.program,
            attributes: attributes,
        });
    }

    onChanged(options, dataArray) {
        const gl = this.gl;
        this.group = [];
        this.currentScale = this.opacity = 1;
        if (gl) {
            for (let i = 0; i < dataArray.length; i++) {
                const data = dataArray[i];

                // 尺寸 和 颜色
                const segs = this.getValue("segs", data),
                    size = +this.getValue("size", data),
                    color = this.normizedColor(this.getValue("color", data));

                // 每份儿的角度
                const perSegAngle = 360 / segs;
                const bufferData = [],
                    indexData = [];

                const coord = this.normizedPoint(data.geometry.coordinates);
                const _size = this.normizedHeight(
                    size,
                    data.geometry.coordinates
                );

                // 中心点
                const x = coord[0],
                    y = coord[1];
                bufferData.push(0, 0, 0);
                bufferData.push(color[0], color[1], color[2], 0);

                // 周边点
                for (
                    let v = 1, angle = 0;
                    v <= segs;
                    v++, angle += perSegAngle
                ) {
                    bufferData.push(
                        coord[0] -
                            x +
                            Math.cos((Math.PI / 180) * angle) * _size,
                        coord[1] -
                            y +
                            Math.sin((Math.PI / 180) * angle) * _size,
                        0
                    );
                    bufferData.push(color[0], color[1], color[2], this.opacity);
                    v === segs
                        ? indexData.push(0, 0 + v, 1)
                        : indexData.push(0, 0 + v, 0 + v + 1);
                }

                // 存入group
                this.group[i] = {
                    position: coord,
                    indexData: new Uint16Array(indexData),
                    bufferData: new Float32Array(bufferData),
                };
            }
        }
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            projectionMatrix = transferOptions.projectionMatrix,
            viewMatrix = transferOptions.viewMatrix;

        if (!this.group.length) return;

        this.program.use(gl);
        this.program.setUniforms({
            u_projectionMatrix: projectionMatrix,
            u_modelViewMatrix: viewMatrix,
            u_opacity: this.options.opacity || this.opacity,
        });

        // blend
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
        gl.blendEquation(gl.FUNC_ADD);

        for (let i = 0; i < this.group.length; i++) {
            const obj = this.group[i];
            this.buffer.updateData(obj.bufferData);
            this.indexBuffer.updateData(obj.indexData);
            this.vertexArray.bind();

            const modelMatrix = mat4.create();
            mat4.translate(modelMatrix, modelMatrix, [
                viewMatrix[0],
                viewMatrix[1],
                obj.position,
            ]);
            mat4.scale(modelMatrix, modelMatrix, [
                this.currentScale,
                this.currentScale,
                this.currentScale,
            ]);
            this.program.setUniform("u_modelMatrix", modelMatrix);

            gl.drawElements(
                gl.TRIANGLES,
                obj.indexData.length,
                gl.UNSIGNED_SHORT,
                0
            );
        }

        // 更新scale
        const scale = this.options.scale,
            step = this.options.step;
        this.currentScale += step;

        this.currentScale >= scale && (this.currentScale = 1);
    }
}
