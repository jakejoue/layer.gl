import Layer from "./Layer";

import { IndexBuffer, VertexBuffer } from "../core/Buffer";
import VertexArrayObject from "../core/VertexArrayObject";
import Program from "../core/Program";

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

        // 判断是否需要自动更新
        if (
            "windowAnimation" === this.options.style ||
            0 < this.options.riseTime
        ) {
            this.autoUpdate = true;
        }
        this.textureLoaded = false;
    }

    getDefaultOptions() {
        return {
            color: "rgba(50, 50, 230, 1.0)",
            opacity: 1.0,
            isTextureFull: false,
            textureScale: 1,
            useLight: true,
            riseTime: 0,
        };
    }

    initialize(gl) {
        this.dataMgr = new ShapeMgr(this, gl);
        this.isUseTexture = false;

        // program
        this.program = new Program(
            gl,
            {
                shaderId: "shape",
                defines: this.options.enablePicked ? ["PICK"] : [],
            },
            this
        );
        // vao
        this.vao = new VertexArrayObject();
        // init Time
        this.initializeTime = new Date();
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

            this.textureLoaded = false;
            this.loadTextureTime = setTimeout(() => {
                this.loadTexture(() => {
                    this.textureLoaded = true;

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

            if (!this.isUseTexture || this.textureLoaded) {
                // 渲染类型
                const style = LayerStyles[options.style] || 0;

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
                        // defines
                        defines: {
                            useLight: options.useLight,
                            useTexture: this.isUseTexture,
                            useTopTexture: !!options.topTexture,
                            useTopColor: !!options.topColor,
                        },

                        // 渲染模式和通用渲染颜色
                        u_style: style,
                        u_alpha: parseFloat(options.opacity),

                        // 纹理相关
                        u_sampler: this.gl.textureManager.get(options.texture),
                        u_top_sampler: this.gl.textureManager.get(
                            options.topTexture
                        ),
                        u_top_color: this.normizedColor(options.topColor),

                        // 光照相关
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

        if (options.texture || options.topTexture) {
            this.isUseTexture = true;

            this.gl.textureManager.loadAndAdd(
                () => {
                    callBack && callBack();
                },
                options.texture,
                options.topTexture
            );
        } else {
            this.isUseTexture = false;
            callBack && callBack();
        }
    }
}
