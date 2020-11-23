import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

import { road } from "../helper/cavans";

import {
    length,
    toOneArr,
    perp,
    shiftArray,
    buildIndexArr,
} from "../helper/vertex";
import { loadTextureImage } from "../helper/texture";

const LineStyle = {
    normal: null,
    road: road(),
};

export default class LineLayer3D extends Layer {
    constructor(options) {
        super(options);
        this.initData();
    }

    getDefaultOptions() {
        return {
            color: "rgba(25, 25, 250, 1)",
            blend: "normal",
            width: 4,
            isFlat: true,
            antialias: false,
            lineJoin: "miter",
            lineCap: "butt",
            style: "normal",
            dashArray: [0, 0],
            dashOffset: 0,
        };
    }

    initData() {
        this.dataMgr = {
            position: [],
            prev: [],
            next: [],
            direction: [],
            color: [],
            index: [],
            counter: [],
            uv: [],
        };
    }

    initialize(gl) {
        this.gl = gl;

        const options = this.getOptions(),
            defines = [];

        options.enablePicked && defines.push("PICK");
        if (LineStyle[options.style]) {
            this.isUseTexture = true;
            defines.push("USE_TEXTURE");
        }

        this.program = new Program(
            this.gl,
            {
                shaderId: "line_3d",
                defines: defines,
            },
            this
        );

        this.prevBuffer = Buffer.createVertexBuffer({
            gl: gl,
        });
        this.currentBuffer = Buffer.createVertexBuffer({
            gl: gl,
        });
        this.nextBuffer = Buffer.createVertexBuffer({
            gl: gl,
        });
        this.directionBuffer = Buffer.createVertexBuffer({
            gl: gl,
        });
        this.colorBuffer = Buffer.createVertexBuffer({
            gl: gl,
        });
        this.counterBuffer = Buffer.createVertexBuffer({
            gl: gl,
        });
        this.uvBuffer = Buffer.createVertexBuffer({
            gl: gl,
        });
        this.indexBuffer = Buffer.createIndexBuffer({
            gl: gl,
        });

        let attributes = [
            {
                name: "previous",
                buffer: this.prevBuffer,
                size: 3,
            },
            {
                name: "position",
                buffer: this.currentBuffer,
                size: 3,
            },
            {
                name: "next",
                buffer: this.nextBuffer,
                size: 3,
            },
            {
                name: "direction",
                buffer: this.directionBuffer,
                size: 1,
            },
            {
                name: "aColor",
                buffer: this.colorBuffer,
                size: 4,
            },
            {
                name: "aDistance",
                buffer: this.counterBuffer,
                size: 1,
            },
            {
                name: "aTotalDistance",
                buffer: this.counterBuffer,
                size: 1,
            },
        ];
        attributes = attributes.concat(this.getCommonAttributes());

        if (LineStyle[options.style]) {
            attributes.push({
                name: "uv",
                buffer: this.uvBuffer,
                size: 2,
            });
            this.setOptions({
                texture: LineStyle[options.style],
            });
            this.loadTexture();
        }

        this.vertexArray = new VertexArray({
            gl: gl,
            program: this.program,
            attributes: attributes,
            indexBuffer: this.indexBuffer,
        });
    }

    onChanged(options, data) {
        if (this.gl) {
            this.initData();
            const colorDataArray = [];

            for (let i = 0; i < data.length; i++) {
                // 坐标转换
                let line = [];
                const coords = data[i].geometry.coordinates;
                if (coords && coords.length > 0) {
                    line =
                        "Polygon" === data[i].geometry.type
                            ? coords[0].map((p) => this.normizedPoint(p))
                            : coords.map((p) => this.normizedPoint(p));
                }

                const color = this.normizedColor(
                    this.getValue("color", data[i])
                );
                const lines = this.addMultipleCoords(line);

                for (let j = 0; j < lines.length; j++) {
                    this.processData(this.dataMgr, lines[j], color);
                }

                if (options.enablePicked) {
                    const k = this.indexToRgb(i);
                    for (let p = 0; p < line.length; p++) {
                        colorDataArray.push(k[0] / 255, k[1] / 255, k[2] / 255);
                        colorDataArray.push(k[0] / 255, k[1] / 255, k[2] / 255);
                        if (options.repeat) {
                            colorDataArray.push(
                                k[0] / 255,
                                k[1] / 255,
                                k[2] / 255
                            );
                            colorDataArray.push(
                                k[0] / 255,
                                k[1] / 255,
                                k[2] / 255
                            );
                            colorDataArray.push(
                                k[0] / 255,
                                k[1] / 255,
                                k[2] / 255
                            );
                            colorDataArray.push(
                                k[0] / 255,
                                k[1] / 255,
                                k[2] / 255
                            );
                        }
                    }
                }
            }

            this.counterBuffer.updateData(this.dataMgr.counter);
            this.currentBuffer.updateData(this.dataMgr.position);
            this.prevBuffer.updateData(this.dataMgr.prev);
            this.nextBuffer.updateData(this.dataMgr.next);
            this.directionBuffer.updateData(this.dataMgr.direction);
            this.colorBuffer.updateData(this.dataMgr.color);
            this.indexBuffer.updateData(this.dataMgr.index);

            this.isUseTexture && this.uvBuffer.updateData(this.dataMgr.uv);
            options.enablePicked && this.pickBuffer.updateData(colorDataArray);
        }
    }

    processData(dataMgr, line, color) {
        const count = line.length,
            u = dataMgr.position.length / 6;
        const { arr, total } = length(line);

        // uv贴图
        const uv = arr.map((l) => [l, 0, l, 1]);
        const counter = perp(arr.map((l) => [l, total]));

        // 点集合
        const postion = perp(line);
        const prevV = perp(line.map(shiftArray(-1)));
        const nextV = perp(line.map(shiftArray(1)));

        // 方位
        const direction = perp(
            line.map(() => -1),
            true
        );

        // 颜色
        const colors = perp(line.map(() => color));

        // 顶点索引
        const indexArr = buildIndexArr(count, u);

        dataMgr.uv.push(...toOneArr(uv));
        dataMgr.counter.push(...toOneArr(counter));
        dataMgr.position.push(...toOneArr(postion));
        dataMgr.prev.push(...toOneArr(prevV));
        dataMgr.next.push(...toOneArr(nextV));
        dataMgr.direction.push(...direction);
        dataMgr.color.push(...toOneArr(colors));
        dataMgr.index.push(...indexArr);
    }

    onDestroy() {
        this.gl = this.program = this.dataMgr = this.prevBuffer = this.currentBuffer = this.nextBuffer = this.directionBuffer = this.colorBuffer = this.counterBuffer = this.uvBuffer = this.indexBuffer = null;
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix,
            isPickRender = transferOptions.isPickRender;

        if (this.indexBuffer.numberOfIndices === 0) return;

        const options = this.getOptions(),
            program = this.program;

        program.use(gl);

        let uniforms = Object.assign(this.getCommonUniforms(transferOptions), {
            uMatrix: matrix,
            uFlat: options.isFlat,
            zoomUnits: this.map.getZoomUnits(),
            devicePixelRatio: window.devicePixelRatio,
            miter: +(options.lineJoin === "miter"),
            thickness: options.width,
            uDashArray: options.dashArray,
            uDashOffset: options.dashOffset,
            uAntialias: options.antialias,
        });
        if (this.isUseTexture) {
            uniforms = Object.assign(uniforms, {
                uTextureMargin: 140,
                textureImage: this.texture,
            });
        }

        program.setUniforms(uniforms);
        this.vertexArray.bind();

        if (isPickRender) {
            gl.disable(gl.BLEND);
        } else {
            gl.enable(gl.BLEND);
            gl.blendEquation(gl.FUNC_ADD);

            if (options.blend && "lighter" === options.blend) {
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            } else {
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            }
        }

        gl.drawElements(
            gl.TRIANGLES,
            this.indexBuffer.numberOfIndices,
            this.indexBuffer.indexDatatype,
            0
        );
    }

    loadTexture(callback) {
        const options = this.getOptions();
        options.texture
            ? loadTextureImage(this.gl, options.texture, (texture, img) => {
                  this.image = img;
                  this.texture = texture;
                  callback && callback();
                  this.webglLayer.render();
              })
            : ((this.image = this.texture = null), callback && callback());
    }
}
