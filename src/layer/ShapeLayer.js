import Layer from "./Layer";

import { IndexBuffer, VertexBuffer } from "../core/Buffer";
import VertexArrayObject from "../core/VertexArrayObject";
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

        this.vao = new VertexArrayObject();
    }

    updateBuffer(dataMgr) {
        const gl = this.gl;

        const {
            vertex,
            color,
            height,
            texture,
            index,
            pickColorVertex,
        } = dataMgr.outBuilding3d;

        this.vertexBuffers = [
            // point
            new VertexBuffer({
                gl: gl,
                data: vertex,
                attributes: [
                    {
                        name: "a_pos",
                        size: 4,
                    },
                    {
                        name: "a_normal",
                        size: 3,
                    },
                ],
            }),
            // color
            new VertexBuffer({
                gl: gl,
                data: color,
                attributes: [
                    {
                        name: "a_color",
                        size: 4,
                    },
                    {
                        name: "a_pre_color",
                        size: 4,
                    },
                ],
            }),
            // height
            new VertexBuffer({
                gl: gl,
                data: height,
                attributes: [
                    {
                        name: "a_height",
                        size: 1,
                    },
                    {
                        name: "a_pre_height",
                        size: 1,
                    },
                ],
            }),
            // texure
            new VertexBuffer({
                gl: gl,
                data: texture,
                attributes: [
                    {
                        name: "a_texture_coord",
                        size: 2,
                    },
                ],
            }),
            // pick
            ...this.getCommonBuffers({ pickData: pickColorVertex }),
        ];

        this.indexBuffer = new IndexBuffer({
            gl: gl,
            data: index,
        });
    }

    onChanged(options, dataArray) {
        if (this.gl) {
            this.loadTextureTime && clearTimeout(this.loadTextureTime);

            this.loadTextureTime = setTimeout(() => {
                this.loadTexture(() => {
                    this.dataMgr.parseData(dataArray);
                    this.updateBuffer(this.dataMgr);

                    this.dataTime = new Date();
                    this.webglLayer.render();
                });
            }, 0);
        }
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix;

        if (this.indexBuffer && this.indexBuffer.numberOfIndices > 0) {
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

                this.vao.bind({
                    gl,
                    program,
                    vertexBuffers: this.vertexBuffers,
                    indexBuffer: this.indexBuffer,
                });

                gl.drawElements(
                    gl.TRIANGLES,
                    this.indexBuffer.numberOfIndices,
                    this.indexBuffer.indexDatatype,
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
