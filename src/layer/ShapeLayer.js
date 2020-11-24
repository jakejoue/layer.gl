import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

import { loadTextureImage } from "../helper/texture";
import ShapeMgr from "../data_mgr/ShapeMgr";

// 渲染类型
const LayerStyles = {
    window: 1,
    windowAnimation: 2,
    gradual: 3,
    water: 6,
};

export default class ShapeLayer extends Layer {
    constructor(options) {
        super(options);

        options = this.getOptions();
        if ("windowAnimation" === options.style || 0 < options.riseTime) {
            this.autoUpdate = true;
        }
        this.selectedColor = [-1, -1, -1];
        this.textureCache = {};
    }

    getDefaultOptions() {
        return {
            color: "rgba(50, 50, 230, 1.0)",
            opacity: 1.0,
            isTextureFull: false,
            textureScale: 1,
            topColor: "rgba(76, 76, 76, 76)",
            useLight: true,
            riseTime: 0,
        };
    }

    initialize(gl) {
        const options = this.getOptions();

        this.dataMgr = new ShapeMgr(this, gl);
        this.texture = null;
        this.isUseTexture = false;

        // defines
        const defines = [];
        options.enablePicked && defines.push("PICK");

        this.program = new Program(
            gl,
            {
                shaderId: "shape",
                defines: defines,
            },
            this
        );

        this.initializeTime = new Date();
    }

    updateVao(dataMgr, dataDirty) {
        const gl = this.gl;

        const {
            vertex,
            color,
            height,
            texture,
            index,
            pickColorVertex,
        } = dataMgr.outBuilding3d;

        // 如果数据没有更新，且已经存在vao
        if (!dataDirty && this.vao) {
            this.vertexBuffer.updateData(vertex);
            this.colorBuffer.updateData(color);
            this.heightBuffer.updateData(height);
            this.textureBuffer.updateData(texture);
            this.indexBuffer.updateData(index);

            if (this.options.enablePicked) {
                this.pickBuffer.updateData(pickColorVertex);
            }

            return;
        }

        // 销毁旧的vao
        if (this.vao) {
            this.vao.destroy();
            this.vao = null;
        }

        // 生成新的缓冲区和vao
        this.vertexBuffer = Buffer.createVertexBuffer({
            gl: gl,
            data: vertex,
        });
        this.colorBuffer = Buffer.createVertexBuffer({
            gl: gl,
            data: color,
        });
        this.heightBuffer = Buffer.createVertexBuffer({
            gl: gl,
            data: height,
        });
        this.textureBuffer = Buffer.createVertexBuffer({
            gl: gl,
            data: texture,
        });
        this.indexBuffer = Buffer.createIndexBuffer({
            gl: gl,
            data: index,
        });

        const attributes = [
            {
                name: "a_pos",
                buffer: this.vertexBuffer,
                size: 4,
            },
            {
                name: "a_normal",
                buffer: this.vertexBuffer,
                size: 3,
            },
            {
                name: "a_color",
                buffer: this.colorBuffer,
                size: 4,
            },
            {
                name: "a_pre_color",
                buffer: this.colorBuffer,
                size: 4,
            },
            {
                name: "a_height",
                buffer: this.heightBuffer,
                size: 1,
            },
            {
                name: "a_pre_height",
                buffer: this.heightBuffer,
                size: 1,
            },
            {
                name: "a_texture_coord",
                buffer: this.textureBuffer,
                size: 2,
            },
        ];

        this.vao = new VertexArray({
            gl: gl,
            program: this.program,
            attributes: attributes.concat(
                this.getCommonAttributes({
                    pickData: pickColorVertex,
                })
            ),
            indexBuffer: this.indexBuffer,
        });
    }

    onChanged(options, dataArray) {
        if (this.gl) {
            this.loadTextureTime && clearTimeout(this.loadTextureTime);

            const dataDirty = this._dataDirty;

            this.loadTextureTime = setTimeout(() => {
                this.loadTexture(() => {
                    this.dataMgr.parseData(dataArray);
                    this.updateVao(this.dataMgr, dataDirty);

                    this.dataTime = new Date();
                    this.webglLayer.render();
                });
            }, 0);
        }
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix;

        if (this.vao && this.vao.numberOfIndices > 0) {
            const options = this.getOptions();

            const program = this.program;
            program.use(gl);

            if (!this.isUseTexture || this.texture) {
                // 渲染类型
                const style = LayerStyles[options.style] || 0;

                // 顶部颜色
                const topColor = this.normizedColor(options.topColor);

                // 光照相关参数
                let light_dir = [0, -1, 2];
                if (options.lightDir) {
                    light_dir = [
                        options.lightDir[0] || 0,
                        options.lightDir[1] || 0,
                        options.lightDir[2] || 0,
                    ];
                }

                // 禁用背面切除
                gl.disable(gl.CULL_FACE);

                // 混合模式
                if (options.blend) {
                    gl.enable(gl.BLEND);
                    gl.blendFunc(gl.ONE, gl.ONE);
                    gl.blendEquation(gl.FUNC_ADD);
                }

                // 如果高度为 0
                if (0 === options.height) {
                    gl.enable(gl.BLEND);
                    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                }

                // 如果是渐变墙体模式
                if (3 === style) {
                    gl.depthMask(false);
                    gl.enable(gl.BLEND);
                    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                } else {
                    gl.depthMask(true);
                }

                // 设置uniforms
                program.setUniforms(
                    Object.assign(this.getCommonUniforms(transferOptions), {
                        u_matrix: matrix,
                        u_zoom_unit: this.normizedHeight(
                            1,
                            this.map.getCenter()
                        ),
                        u_style: style,
                        u_alpha: parseFloat(options.opacity),

                        // 纹理相关
                        u_use_texture: this.isUseTexture,
                        u_sampler: this.texture,
                        // 顶部相关（贴图模式下生效）
                        // u_top_color: topColor,

                        // 光照相关
                        u_use_lighting: options.useLight,
                        u_side_light_dir: light_dir,

                        // 时间相关
                        u_time: new Date() - this.initializeTime,
                        u_dataTime: new Date() - this.dataTime,
                        u_riseTime: options.riseTime,
                    })
                );

                this.vao.bind();

                gl.drawElements(
                    gl.TRIANGLES,
                    this.vao.numberOfIndices,
                    this.vao.indexDatatype,
                    0
                );
            }
        }
    }

    loadTexture(callBack) {
        const options = this.getOptions();

        if (options.texture) {
            this.isUseTexture = true;

            loadTextureImage(this.gl, options.texture, (texture, image) => {
                this.image = image;
                this.texture = texture;
                callBack && callBack();
                this.webglLayer.render();
            });
        } else {
            this.isUseTexture = false;
            this.image = this.texture = null;
            callBack && callBack();
        }
    }
}
