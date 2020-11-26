import Layer from "./Layer";

import { IndexBuffer, VertexBuffer } from "../core/Buffer";
import VertexArrayObject from "../core/VertexArrayObject";
import Program from "../core/Program";

import { road } from "../helper/cavans";
import { loadTextureImage } from "../helper/texture";

function length(coords) {
    let length = 0;
    const lengthArr = [];

    for (let i = 0; i < coords.length; i++) {
        const coord = coords[i];
        if (i > 0) {
            const preCoord = coords[i - 1];
            length += Math.sqrt(
                Math.pow(coord[0] - preCoord[0], 2) +
                    Math.pow(coord[1] - preCoord[1], 2)
            );
        }
        lengthArr.push(length);
    }
    return {
        arr: lengthArr,
        total: length,
    };
}

function toOneArr(arr) {
    if (!arr[0] || !arr[0].length) return arr;

    const length = arr[0].length,
        line = [];
    for (let b = 0, i = 0; i < arr.length; i++) {
        for (let j = 0; j < length; j++) {
            line[b++] = arr[i][j];
        }
    }
    return line;
}

function perp(array, reverse) {
    const retArr = [];
    array.forEach(function (b) {
        retArr.push(reverse ? -b : b, b);
    });
    return retArr;
}

function shiftArray(shiftIndex) {
    return function (value, index, array) {
        value = index + shiftIndex;
        index = array.length - 1;
        return array[
            0 < index
                ? 0 > value
                    ? 0
                    : value > index
                    ? index
                    : value
                : value < index
                ? index
                : 0 < value
                ? 0
                : value
        ];
    };
}

function buildIndexArr(coordLength, offset = 0) {
    const indexArr = [];

    for (let b = 0; b < coordLength - 1; b++) {
        const d = 2 * (b + offset);
        indexArr.push(d, d + 1, d + 2);
        indexArr.push(d + 2, d + 1, d + 3);
    }
    return indexArr;
}

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
        const options = this.getOptions(),
            defines = [];

        options.enablePicked && defines.push("PICK");

        if (LineStyle[options.style]) {
            this.isUseTexture = true;
            defines.push("USE_TEXTURE");

            this.setOptions({
                texture: LineStyle[options.style],
            });
            this.loadTexture();
        }

        this.program = new Program(
            gl,
            {
                shaderId: "line_3d",
                defines: defines,
            },
            this
        );

        this.vao = new VertexArrayObject();
    }

    onChanged(options, data) {
        if (this.gl) {
            this.initData();
            const pickData = [];

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
                        pickData.push(k[0] / 255, k[1] / 255, k[2] / 255);
                        pickData.push(k[0] / 255, k[1] / 255, k[2] / 255);
                        if (options.repeat) {
                            pickData.push(k[0] / 255, k[1] / 255, k[2] / 255);
                            pickData.push(k[0] / 255, k[1] / 255, k[2] / 255);
                            pickData.push(k[0] / 255, k[1] / 255, k[2] / 255);
                            pickData.push(k[0] / 255, k[1] / 255, k[2] / 255);
                        }
                    }
                }
            }

            this.updateBuffer(this.dataMgr, pickData);
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

    updateBuffer(dataMgr, pickData) {
        const gl = this.gl;

        const {
            counter,
            position,
            prev,
            next,
            direction,
            color,
            uv,
            index,
        } = dataMgr;

        this.vertexBuffers = [
            new VertexBuffer({
                gl: gl,
                data: counter,
                attributes: [
                    {
                        name: "aDistance",
                        size: 1,
                    },
                    {
                        name: "aTotalDistance",
                        size: 1,
                    },
                ],
            }),
            new VertexBuffer({
                gl: gl,
                data: position,
                attributes: [
                    {
                        name: "position",
                        size: 3,
                    },
                ],
            }),
            new VertexBuffer({
                gl: gl,
                data: prev,
                attributes: [
                    {
                        name: "previous",
                        size: 3,
                    },
                ],
            }),
            new VertexBuffer({
                gl: gl,
                data: next,
                attributes: [
                    {
                        name: "next",
                        size: 3,
                    },
                ],
            }),
            new VertexBuffer({
                gl: gl,
                data: direction,
                attributes: [
                    {
                        name: "direction",
                        size: 1,
                    },
                ],
            }),
            new VertexBuffer({
                gl: gl,
                data: color,
                attributes: [{ name: "aColor", size: 4 }],
            }),
            ...this.getCommonBuffers({ pickData }),
        ];

        if (this.isUseTexture) {
            this.vertexBuffers.push(
                new VertexBuffer({
                    gl,
                    data: uv,
                    attributes: [
                        {
                            name: "uv",
                            size: 2,
                        },
                    ],
                })
            );
        }

        this.indexBuffer = new IndexBuffer({
            gl: gl,
            data: index,
        });
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix,
            isPickRender = transferOptions.isPickRender;

        if (!this.indexBuffer || this.indexBuffer.numberOfIndices === 0) return;

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
        this.vao.bind({
            gl,
            program,
            vertexBuffers: this.vertexBuffers,
            indexBuffer: this.indexBuffer,
        });

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
