import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";
import { loadTextureImage } from "../helper/texture";

import { mat4 } from "gl-matrix";

export default class ImageCircleLayer extends Layer {
    constructor(options) {
        super(options);

        this.autoUpdate = true;
        this.group = [];
        this.time = 0;
    }

    getDefaultOptions() {
        return {
            totalRadian: Math.PI,
            color: [1, 1, 1, 1],
            radius: 50,
            step: 0.1,
        };
    }

    initialize(gl) {
        this.gl = gl;
        // 构造program
        this.program = new Program(
            this.gl,
            {
                vertexShader: `
                attribute vec3 aPos;
                uniform mat4 uMatrix;
                uniform mat4 uObjMatrix;
                varying vec3 vPos;
                
                void main() {
                    gl_Position = uMatrix * uObjMatrix * vec4(aPos.xyz, 1.0);
                    vPos = aPos;
                }`,
                fragmentShader: `
                uniform sampler2D uSampler;
                uniform vec4 glowColor;
                varying vec3 vPos;

                void main() {
                    if (length(vPos.xy) > 1.0) {
                        discard;
                    }
                    vec4 color = texture2D(uSampler, (vPos.xy + 1.0) / 2.0);
                    gl_FragColor = color * glowColor;
                }`,
            },
            this
        );
        // 顶点相关数据
        this.buffer = Buffer.createVertexBuffer({
            gl: gl,
        });
        const attributes = [
            {
                name: "aPos",
                buffer: this.buffer,
                size: 3,
            },
        ];
        this.vertexArray = new VertexArray({
            gl: gl,
            program: this.program,
            attributes: attributes,
        });
    }

    onChanged(options, dataArray) {
        this.group = [];
        this.textureMap = new Map();

        if (this.gl) {
            for (let i = 0; i < dataArray.length; i++) {
                const data = dataArray[i];

                const textureUrl = this.getValue("texture", data);
                if (!textureUrl) continue;

                const coord = data.geometry.coordinates;
                const radius = +this.getValue("radius", data);
                const point = this.normizedPoint([coord[0], coord[1], radius]);

                const bufferData = this.createCircle();

                // 存入多边形
                this.group.push({
                    bufferData,
                    texture: textureUrl,
                    color: this.normizedColor(
                        this.getValue("color", data) || [1, 1, 1, 1]
                    ),
                    point: [point[0], point[1], 0],
                    scale: point[2],
                });

                this.loadTexture(textureUrl);
            }
        }
    }

    createCircle() {
        // 所有顶点
        const vertices = [
            [-1, 1, 0],
            [1, 1, 0],
            [-1, -1, 0],
            [1, -1, 0],
        ];

        // 两个三角形
        const arrayData = [
            ...vertices[0],
            ...vertices[1],
            ...vertices[2],
            ...vertices[1],
            ...vertices[3],
            ...vertices[2],
        ];

        return arrayData;
    }

    onDestroy() {
        this.gl = this.program = this.buffer = this.vertexArray = this.group = this.textureMap = null;
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix;

        if (this.group.length <= 0) return;

        this.program.use(gl);

        for (let i = 0; i < this.group.length; i++) {
            // 绑定顶点数据
            const { bufferData, point, scale, texture, color } = this.group[i];
            if (!this.textureMap.has(texture)) continue;

            this.buffer.updateData(bufferData);
            this.vertexArray.bind();

            const m = mat4.create();
            mat4.translate(m, m, point);
            mat4.scale(m, m, [-scale, scale, 1]);
            mat4.rotateZ(m, m, 2 * Math.PI * this.time);

            const uniforms = {
                uMatrix: matrix,
                uObjMatrix: m,
                uSampler: this.textureMap.get(texture),
                glowColor: color,
            };
            this.program.setUniforms(uniforms);

            gl.depthMask(false);
            gl.enable(gl.BLEND);
            gl.blendEquation(gl.FUNC_ADD);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.drawArrays(gl.TRIANGLES, 0, this.buffer.numberOfVertices);
        }

        this.time += this.options.step / 10;
        1 < this.time && (this.time = 0);
    }

    loadTexture(textureUrl) {
        loadTextureImage(this.gl, textureUrl, (texture) => {
            if (this.textureMap && !this.textureMap.has(textureUrl)) {
                this.textureMap.set(textureUrl, texture);
                this.webglLayer && this.webglLayer.render();
            }
        });
    }
}
