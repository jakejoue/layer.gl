import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

import LineMgr from "../data_mgr/LineMgr";
import { loadTextureImage } from "../helper/texture";
import { road, arrow } from "../helper/cavans";

const LineStyles = {
    normal: null,
    road: road,
    arrow: arrow,
};

export default class LineLayer extends Layer {
    constructor(options) {
        super(options);
    }

    getDefaultOptions() {
        return {
            style: "normal",
            styleOptions: {},
            color: "rgba(25, 25, 250, 1)",
            blend: "normal",
            lineJoin: "miter",
            lineCap: "butt",
            width: 4,
            offset: 0,
            antialias: false,
            dashArray: [0, 0],
            dashOffset: 0,
            animation: false,
            interval: 0.1,
            duration: 2,
            trailLength: 0.5,
            minZoom: 4,
            maxZoom: 21,
        };
    }

    initialize(gl) {
        this.gl = gl;
        const options = this.getOptions(),
            defines = [];

        // pick
        options.enablePicked && defines.push("PICK");
        // texture
        if (LineStyles[options.style]) {
            this.isUseTexture = true;
            defines.push("USE_TEXTURE");
        }

        // animate
        if (options.animation === true) {
            this.isAnimateLine = true;
            this.date = new Date();
            this.autoUpdate = true;
            defines.push("USE_LINE_ANIMATION");
        }

        this.program = new Program(
            this.gl,
            {
                shaderId: "line",
                defines: defines,
            },
            this
        );

        this.positionBuffer = Buffer.createVertexBuffer({
            gl: gl,
        });
        this.colorBuffer = Buffer.createVertexBuffer({
            gl: gl,
        });
        this.normalBuffer = Buffer.createVertexBuffer({
            gl: gl,
        });
        this.indexBuffer = Buffer.createIndexBuffer({
            gl: gl,
        });
        let attributes = [
            {
                name: "a_position",
                buffer: this.positionBuffer,
                size: 3,
            },
            {
                name: "a_distance",
                buffer: this.positionBuffer,
                size: 1,
            },
            {
                name: "a_width",
                buffer: this.positionBuffer,
                size: 1,
            },
            {
                name: "a_total_distance",
                buffer: this.positionBuffer,
                size: 1,
            },
            {
                name: "a_normal",
                buffer: this.normalBuffer,
                size: 3,
            },
            {
                name: "a_color",
                buffer: this.colorBuffer,
                size: 4,
            },
        ];
        attributes = attributes.concat(this.getCommonAttributes());

        if (this.isUseTexture) {
            this.uvBuffer = Buffer.createVertexBuffer({
                gl: gl,
            });
            attributes.push({
                name: "uv",
                buffer: this.uvBuffer,
                type: "FLOAT",
            });
            const texture = LineStyles[options.style](options.styleOptions);
            this.setOptions({ texture: texture });
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
        const self = this;
        if (this.gl) {
            let dashArray = options.dashArray;
            dashArray =
                !!this.isUseTexture || !!dashArray[1] || !!this.isAnimateLine;

            const dataMgr = new LineMgr({
                    dash: dashArray,
                    cap: options.lineCap,
                    join: options.lineJoin,
                    miterLimit: options.miterLimit,
                    thickness: options.width,
                }),
                pickColors = [];

            for (let i = 0; i < data.length; i++) {
                let coords = data[i].geometry.coordinates;
                if (coords && 0 < coords.length) {
                    if (
                        "Polygon" !== data[i].geometry.type &&
                        "MultiLineString" !== data[i].geometry.type
                    ) {
                        coords = [coords];
                    }
                    coords = coords.map((a) =>
                        a.map((point) => this.normizedPoint(point))
                    );
                }

                // 起点位置
                const preStartIndex = dataMgr.complex.startIndex;

                const color = this.normizedColor(
                    this.getValue("color", data[i])
                );
                coords = this.addMultipleCoords(coords);
                for (let j = 0; j < coords.length; j++) {
                    coords[j].forEach(function (line) {
                        dataMgr.extrude(line, color);
                    });
                }

                // pick
                if (options.enablePicked) {
                    const pColor = self.indexToRgb(i);
                    for (
                        let j = preStartIndex;
                        j < dataMgr.complex.startIndex;
                        j++
                    ) {
                        pickColors.push(
                            pColor[0] / 255,
                            pColor[1] / 255,
                            pColor[2] / 255
                        );
                        if (options.repeat) {
                            pickColors.push(
                                pColor[0] / 255,
                                pColor[1] / 255,
                                pColor[2] / 255
                            );
                            pickColors.push(
                                pColor[0] / 255,
                                pColor[1] / 255,
                                pColor[2] / 255
                            );
                        }
                    }
                }
            }

            const complexData = dataMgr.complex;
            if (dashArray) {
                for (let p = 0; p < complexData.positions.length / 6; p++) {
                    complexData.positions[6 * p + 5] = complexData.maxDistance;
                }
            }

            this.positionBuffer.updateData(complexData.positions);
            this.normalBuffer.updateData(complexData.normals);
            this.colorBuffer.updateData(complexData.colors);
            this.indexBuffer.updateData(complexData.indices);
            this.isUseTexture && this.uvBuffer.updateData(complexData.uvs);
            options.enablePicked && this.pickBuffer.updateData(pickColors);
        }
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix;

        if (this.indexBuffer.numberOfIndices === 0) return;

        const options = this.getOptions(),
            program = this.program;

        program.use(gl);

        let uniforms = Object.assign(this.getCommonUniforms(transferOptions), {
            u_matrix: matrix,
            u_zoom_units: this.map.getZoomUnits(),
            u_dash_array: options.dashArray,
            u_dash_offset: options.dashOffset,
            u_antialias: options.antialias,
            u_offset: options.offset,
        });
        // 纹理模式
        if (this.isUseTexture) {
            uniforms = Object.assign(uniforms, {
                u_texture_width: options.width,
                u_texture_margin: 140,
                u_sampler: this.texture,
            });
        }
        // 动画模式
        if (this.isAnimateLine) {
            const zoom = this.map.getZoom();
            uniforms = Object.assign(uniforms, {
                u_time: (new Date() - this.date) / 1e3,
                u_animate:
                    zoom >= options.minZoom &&
                    zoom <= options.maxZoom &&
                    this.autoUpdate
                        ? true
                        : false,
                u_duration: options.duration,
                u_interval: options.interval,
                u_trail_length: options.trailLength,
            });
        }
        program.setUniforms(uniforms);

        // 混合模式
        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        if (options.blend && "lighter" === options.blend) {
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        } else {
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        }

        // 绑定顶点并绘制
        this.vertexArray.bind();

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
