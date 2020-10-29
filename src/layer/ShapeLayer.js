import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

import { loadTextureImage } from "../helper/texture";

import earcut from "earcut";
import { vec3, mat4 } from "gl-matrix";

// 数据管理类
class DataMgr {
    constructor(shapeLayer, gl) {
        this.shapeLayer = shapeLayer;
        this.gl = gl;
        this.initData();
    }

    initData() {
        this.outBuilding3d = {
            pickColorVertex: [],
            vertex: [],
            texture: [],
            color: [],
            height: [],
            index: [],
        };
    }

    getData() {
        return this.outBuilding3d;
    }

    parseData(dataArray) {
        this.initData();
        const options = this.shapeLayer.getOptions();

        for (let i = 0; i < dataArray.length; i++) {
            const data = dataArray[i];

            // 高度和颜色
            const height = +this.shapeLayer.getValue("height", data) || 0;
            const color = this.shapeLayer.normizedColor(
                this.shapeLayer.getValue("color", data)
            );

            // 选中的颜色
            let pickColor;
            options.enablePicked && (pickColor = this.shapeLayer.indexToRgb(i));

            // 开始自增高的高度和颜色
            let preHeight, preColor;
            if (options.riseTime) {
                preHeight = +this.shapeLayer.getValue("preHeight", data) || 0;
                preColor = this.shapeLayer.normizedColor(
                    this.shapeLayer.getValue("preColor", data)
                );
            }

            let coords = data.geometry.coordinates;
            if (coords) {
                if ("MultiPolygon" === data.geometry.type) {
                    // do nothing
                } else {
                    coords = [coords];
                }

                // 为多边形构建面数据
                for (let j = 0; j < coords.length; j++) {
                    const xy_s = [],
                        z_s = [];

                    coords[j][0].forEach((b) => {
                        b = this.shapeLayer.normizedPoint(b);
                        xy_s.push(b[0], b[1]);
                        z_s.push(b[2]);
                    });

                    // 高度转换
                    const coord = coords[j][0][0];
                    const _height = this.shapeLayer.normizedHeight(
                            height,
                            coord
                        ),
                        _preHeight = this.shapeLayer.normizedHeight(
                            preHeight,
                            coord
                        );

                    this.parseBuilding3d(
                        xy_s,
                        z_s,
                        _preHeight,
                        _height,
                        preColor,
                        color,
                        pickColor,
                        this.outBuilding3d
                    );
                }
            }
        }

        this.shapeLayer.vertexBuffer.updateData(
            new Float32Array(this.outBuilding3d.vertex)
        );
        this.shapeLayer.colorBuffer.updateData(
            new Float32Array(this.outBuilding3d.color)
        );
        this.shapeLayer.heightBuffer.updateData(
            new Float32Array(this.outBuilding3d.height)
        );
        this.shapeLayer.textureBuffer.updateData(
            new Float32Array(this.outBuilding3d.texture)
        );
        this.shapeLayer.indexBuffer.updateData(
            new Uint32Array(this.outBuilding3d.index)
        );
        if (options.enablePicked) {
            this.shapeLayer.pickBuffer.updateData(
                new Float32Array(this.outBuilding3d.pickColorVertex)
            );
        }
    }

    getBounds(c) {
        let minX = c[0],
            minY = c[1],
            maxX = c[0],
            maxY = c[1];
        for (let i = 0; i < c.length; i += 2) {
            minX = Math.min(c[i], minX);
            minY = Math.min(c[i + 1], minY);
            maxX = Math.max(c[i], maxX);
            maxY = Math.max(c[i + 1], maxY);
        }
        return {
            minX: minX,
            minY: minY,
            maxX: maxX,
            maxY: maxY,
            width: maxX - minX,
            height: maxY - minY,
        };
    }

    parseBuilding3d(
        xy_s,
        z_s,
        preHeight,
        height,
        preColor,
        color,
        pickColor,
        h
    ) {
        preHeight = preHeight !== undefined ? preHeight : height;
        preColor = preColor !== undefined ? preColor : color;

        const options = this.shapeLayer.getOptions(),
            vertexArray = h.vertex,
            textureArray = h.texture,
            colorArray = h.color,
            heightArray = h.height,
            pickColorVertexArray = h.pickColorVertex,
            indexArray = h.index;

        const isTextureFull = options.isTextureFull;

        let t_w = 0,
            t_h = 0;
        if (this.shapeLayer.image) {
            t_w = this.shapeLayer.normizedHeight(
                this.shapeLayer.image.width * options.textureScale
            );
            t_h = this.shapeLayer.normizedHeight(
                this.shapeLayer.image.height * options.textureScale
            );
        }

        // 房顶
        if ("gradual" !== options.style) {
            const indices = earcut(xy_s);

            const index1 = indices[0],
                index2 = indices[1],
                index3 = indices[2];

            const p1 = [xy_s[2 * index1], xy_s[2 * index1 + 1], 1];
            const p2 = [xy_s[2 * index2], xy_s[2 * index2 + 1], 1];
            const p3 = [xy_s[2 * index3], xy_s[2 * index3 + 1], 1];

            const normal = [];
            vec3.cross(
                normal,
                [p3[0] - p2[0], p3[1] - p2[1], p3[2] - p2[2]],
                [p1[0] - p2[0], p1[1] - p2[1], p1[2] - p2[2]]
            );

            let bound;
            if (options.texture) {
                bound = this.getBounds(xy_s);
            }

            // 当前开始的索引
            const startIndex = vertexArray.length / 7;

            // 存入顶点信息
            for (let i = 0; i < xy_s.length; i += 2) {
                vertexArray.push(
                    xy_s[i],
                    xy_s[i + 1],
                    z_s[i / 2],
                    1,
                    normal[0],
                    normal[1],
                    normal[2]
                );
                colorArray.push(
                    color[0],
                    color[1],
                    color[2],
                    color[3],
                    preColor[0],
                    preColor[1],
                    preColor[2],
                    preColor[3]
                );
                heightArray.push(height, preHeight);

                if (options.texture) {
                    if (isTextureFull) {
                        textureArray.push((xy_s[i] - bound.minX) / bound.width);
                        textureArray.push(
                            (xy_s[i + 1] - bound.minY) / bound.height
                        );
                    } else {
                        textureArray.push((xy_s[i] - bound.minX) / t_w);
                        textureArray.push((xy_s[i + 1] - bound.minY) / t_h);
                    }
                }
                if (pickColor) {
                    pickColorVertexArray.push(
                        pickColor[0] / 255,
                        pickColor[1] / 255,
                        pickColor[2] / 255
                    );
                }
            }

            // 存入多边形索引信息
            for (let i = 0; i < indices.length; i++) {
                indexArray.push(indices[i] + startIndex);
            }
        }

        // 墙面
        if (!(height === preHeight && 0 >= height)) {
            for (let i = 0; i < xy_s.length; i += 2) {
                // 开始的顶点位置
                const startIndex = vertexArray.length / 7;

                // 当前顶点坐标
                const x = xy_s[i],
                    y = xy_s[i + 1];
                // 顶点坐标和底部坐标
                const p = [x, y, z_s[i / 2], 0],
                    t_p = [x, y, z_s[i / 2], 1];

                // 下个顶点的坐标
                let j = i + 2;
                // 如果到了最后的点，取得第一个点坐标
                if (i === xy_s.length - 2) j = 0;
                const n_x = xy_s[j],
                    n_y = xy_s[j + 1];
                const n_p = (y = [n_x, n_y, z_s[i / 2], 0]),
                    n_t_p = [n_x, n_y, z_s[i / 2], 1];

                const ll = Math.sqrt(
                    Math.pow(n_x - x, 2),
                    Math.pow(n_y - y, 2)
                );

                const normal = [];
                vec3.cross(
                    normal,
                    [n_p[0] - p[0], n_p[1] - p[1], n_p[2] - p[2]],
                    [t_p[0] - p[0], t_p[1] - p[1], t_p[2] - p[2]]
                );

                // 顶点
                vertexArray.push(p[0], p[1], p[2], p[3]);
                vertexArray.push(normal[0], normal[1], normal[2]);
                vertexArray.push(t_p[0], t_p[1], t_p[2], t_p[3]);
                vertexArray.push(normal[0], normal[1], normal[2]);
                vertexArray.push(n_p[0], n_p[1], n_p[2], n_p[3]);
                vertexArray.push(normal[0], normal[1], normal[2]);
                vertexArray.push(n_t_p[0], n_t_p[1], n_t_p[2], n_t_p[3]);
                vertexArray.push(normal[0], normal[1], normal[2]);

                // 颜色
                colorArray.push(color[0], color[1], color[2], color[3]);
                colorArray.push(
                    preColor[0],
                    preColor[1],
                    preColor[2],
                    preColor[3]
                );
                colorArray.push(color[0], color[1], color[2], color[3]);
                colorArray.push(
                    preColor[0],
                    preColor[1],
                    preColor[2],
                    preColor[3]
                );
                colorArray.push(color[0], color[1], color[2], color[3]);
                colorArray.push(
                    preColor[0],
                    preColor[1],
                    preColor[2],
                    preColor[3]
                );
                colorArray.push(color[0], color[1], color[2], color[3]);
                colorArray.push(
                    preColor[0],
                    preColor[1],
                    preColor[2],
                    preColor[3]
                );

                // 高度
                heightArray.push(height);
                heightArray.push(preHeight);
                heightArray.push(height);
                heightArray.push(preHeight);
                heightArray.push(height);
                heightArray.push(preHeight);
                heightArray.push(height);
                heightArray.push(preHeight);

                // 纹理
                if (options.texture) {
                    if (isTextureFull) {
                        textureArray.push(0, 0);
                        textureArray.push(0, 1);
                        textureArray.push(1, 0);
                        textureArray.push(1, 1);
                    } else {
                        textureArray.push(0, 0);
                        textureArray.push(0, height / t_h);
                        textureArray.push(ll / t_w, 0);
                        textureArray.push(ll / t_w, height / t_h);
                    }
                }

                // pick用颜色
                if (pickColor) {
                    pickColorVertexArray.push(
                        pickColor[0] / 255,
                        pickColor[1] / 255,
                        pickColor[2] / 255
                    );
                    pickColorVertexArray.push(
                        pickColor[0] / 255,
                        pickColor[1] / 255,
                        pickColor[2] / 255
                    );
                    pickColorVertexArray.push(
                        pickColor[0] / 255,
                        pickColor[1] / 255,
                        pickColor[2] / 255
                    );
                    pickColorVertexArray.push(
                        pickColor[0] / 255,
                        pickColor[1] / 255,
                        pickColor[2] / 255
                    );
                }

                // 多边形索引
                // 1 --- 3
                // |     |
                // 0 --- 2
                indexArray.push(
                    startIndex,
                    startIndex + 2,
                    startIndex + 3,
                    startIndex,
                    startIndex + 3,
                    startIndex + 1
                );
            }
        }
    }
}

// 渲染类型
const LayerStyles = {
    window: 1,
    windowAnimation: 2,
    gradual: 3,
    ripple: 4,
    water: 6,
};

export default class ShapeLayer extends Layer {
    constructor(options) {
        super(options);

        this._isShow = true;
        options = this.getOptions();
        if (
            "windowAnimation" === options.style ||
            "ripple" === options.style ||
            0 < options.riseTime
        ) {
            this.autoUpdate = true;
        }
        this.selectedColor = [-1, -1, -1];
        this.textureCache = {};
    }

    getDefaultOptions() {
        return {
            color: "rgba(50, 50, 230, 1.0)",
            opacity: 0.8,
            isTextureFull: false,
            topColor: "rgba(76, 76, 76, 76)",
            textureScale: 1,
            useLight: true,
            riseTime: 0,
        };
    }

    initialize(gl) {
        this.gl = gl;
        const options = this.getOptions();

        this.dataMgr = new DataMgr(this, this.gl);
        this.texture = null;
        this.isUseTexture = false;

        const defines = [];
        options.enablePicked && defines.push("PICK");
        options.texture && defines.push("USE_TEXTURE");
        this.program = new Program(
            this.gl,
            {
                vertexShader: `precision highp float;
                attribute vec4 a_pos;
                attribute vec3 a_normal;
                attribute vec4 a_color;
                attribute vec4 a_pre_color;
                attribute float a_height;
                attribute float a_pre_height;
                
                #if defined(USE_TEXTURE)
                attribute vec2 a_texture_coord;
                #endif
                
                uniform vec4 uSelectedColor;
                uniform mat4 u_proj_matrix;
                uniform mat4 u_mv_matrix;
                uniform mat4 u_normal_matrix;
                uniform vec3 u_side_light_dir;
                uniform bool u_use_lighting;
                uniform bool u_use_texture;
                uniform vec3 u_ripple_center;
                uniform float u_radius;
                uniform float style;
                uniform float alpha;
                uniform float time;
                uniform float dataTime;
                uniform float riseTime;

                varying float v_height;
                varying vec4 v_color;
                varying vec3 v_position;
                varying vec2 v_texture_coord;

                const vec3 point_color = vec3(0.06, 0.06, 0.06);
                const vec3 light_color = vec3(0.53, 0.53, 0.53);
                const vec3 light_color_2 = vec3(0.4, 0.4, 0.4);
                const vec3 uAmbientColor = vec3(0.8, 0.8, 0.8);
                const vec3 uLightingDirection = vec3(0.0, 1.0, 1.0);
                const vec3 uDirectionalColor = vec3(1.0, 1.0, 1.0);

                float getTransitionValue(float pre_value, float to_value, float dataTime, float riseTime) {
                    float result = 0.0;
                    if(pre_value == to_value) {
                        result = to_value;
                    } else {
                        if(riseTime > 0.0 && dataTime < riseTime) {
                            result = (pre_value + (to_value - pre_value) * (dataTime / riseTime));
                        } else {
                            result = to_value;
                        }
                    }
                    return result;
                }
                
                void main() {
                    vec4 pos = a_pos;
                    pos.z = pos.z + pos.w * getTransitionValue(a_pre_height, a_height, dataTime, riseTime);
                    gl_Position = u_proj_matrix * u_mv_matrix * vec4(pos.xyz, 1.0);

                    // varing变量赋值
                    v_position = pos.xyz;
                    v_height = a_height;

                    #if defined(USE_TEXTURE)
                    if(u_use_texture) {
                        v_texture_coord = a_texture_coord;
                    }
                    #endif

                    // 后面开始颜色计算
                    vec4 icolor = a_color;
                    #if defined(PICK)
                    if(mapvIsPicked()) {
                        icolor = uSelectedColor;
                    }
                    #endif
                    
                    // 如果使用光照
                    if(u_use_lighting) {
                        vec3 N = normalize(vec3(u_normal_matrix * vec4(a_normal, 1.0)));
                        vec4 point_dir = u_mv_matrix * vec4(0, 1, 0, 0);
                        vec3 L_point = normalize(point_dir.xyz);
                        float lambert_point = max(0.0, dot(N, -L_point));
                        vec4 light_dir = u_mv_matrix * vec4(u_side_light_dir, 0);
                        vec3 L = normalize(light_dir.xyz);
                        float lambert = max(0.0, dot(N, -L));
                        if(pos.z < 5.0) {
                            float deepGradientColor = (5.0 - pos.z) / 8.0;
                            lambert = lambert - deepGradientColor;
                        }
                        vec4 light_dir_2 = u_mv_matrix * vec4(0, 0, -1, 0);
                        vec3 L2 = normalize(light_dir_2.xyz);
                        float lambert_2 = max(0.0, dot(N, -L2));

                        // 如果顶部颜色和初始颜色相同
                        if(a_pre_color.r == a_color.r && a_pre_color.g == a_color.g && a_pre_color.b == a_color.b) {

                        } else {
                            if(riseTime > 0.0 && dataTime < riseTime) {
                                icolor.r = a_pre_color.r + (a_color.r - a_pre_color.r) * (dataTime / riseTime);
                                icolor.g = a_pre_color.g + (a_color.g - a_pre_color.g) * (dataTime / riseTime);
                                icolor.b = a_pre_color.b + (a_color.b - a_pre_color.b) * (dataTime / riseTime);
                            }
                        }

                        // 计算加入光照后的颜色
                        v_color.rgb = icolor.rgb + icolor.rgb * light_color * lambert + icolor.rgb * light_color_2 * lambert_2 + icolor.rgb * point_color * lambert_point;
                        v_color.a = icolor.a;

                        // 如果是贴图模式
                        if(u_use_texture) {
                            mat3 normalMatrix = mat3(u_normal_matrix);
                            vec3 transformedNormal = normalMatrix * a_normal;
                            vec3 dir = uLightingDirection;
                            dir = vec3(normalMatrix * vec3(0.0, -1.0, 2.0));
                            float directionalLightWeighting = max(dot(normalize(transformedNormal), normalize(dir)), 0.0);
                            vec4 vLightWeighting;
                            vLightWeighting = vec4(uAmbientColor + uDirectionalColor * directionalLightWeighting, 1.0);
                            v_color = vLightWeighting;
                        }
                    } else {
                        v_color = icolor;
                    }
                }`,
                fragmentShader: `precision highp float;
                varying vec4 v_color;
                varying vec3 v_position;
                varying float v_height;
                varying vec2 v_texture_coord;
                
                uniform vec3 u_ripple_center;
                uniform vec4 top_color;
                uniform float u_radius;
                uniform float style;
                uniform float alpha;
                uniform float time;
                uniform sampler2D u_sampler;
                uniform bool u_use_lighting;
                uniform bool u_use_texture;
                
                void main() {
                    vec4 color = vec4(v_color);
                    vec4 textureColor = vec4(1.0, 1.0, 1.0, 1.0);
                    
                    // 使用纹理
                    if(u_use_texture) {
                        // water 特效
                        if(style == 6.0) {
                            float x = v_texture_coord.s;
                            float y = v_texture_coord.t;
                            vec2 cPos = -1.0 + 2.0 * gl_FragCoord.xy / MAPV_resolution;
                            float cLength = length(cPos);
                            vec2 uv = gl_FragCoord.xy / MAPV_resolution + (cPos / cLength) * cos(cLength * 12.0 - time / 1000.0 * 4.0) * 0.03;
                            textureColor = texture2D(u_sampler, uv / 2.0 + vec2(x,y));
                        } else {
                            textureColor = texture2D(u_sampler, vec2(v_texture_coord.s, v_texture_coord.t));
                        }
                        // 光照
                        if(u_use_lighting) {
                            color = vec4(textureColor * v_color * 1.1);
                        } else {
                            color = textureColor;
                        }
                    }
                    // window 和 windowAnimation
                    if(style == 1.0 || style == 2.0) {
                        float t = time / 1000.0;
                        float diffDistance = 5.0;
                        float modX = mod(v_position.x, diffDistance * 2.0);
                        float modZ = mod(v_position.z, diffDistance * 2.0);
                        // 窗户判断
                        if (modX < diffDistance && modZ < diffDistance && v_position.z < v_height) {
                            color *= 1.05;
                            // 动画特效
                            if(time > 0.0 && style == 2.0) {
                                float iX = ceil(v_position.x / diffDistance);
                                float iZ = ceil(v_position.z / diffDistance);
                                float timeDistance = 8.0;
                                t += tan(sin(iZ));
                                color *= (1.0 + mod(t, timeDistance) / timeDistance);
                            }
                        }
                        color.a = alpha;
                    }
                    // 渐变色
                    else if(style == 3.0) {
                        color.a = 1.0 - pow(v_position.z / v_height, 0.3);
                    }
                    // 波纹
                    else if(style == 4.0) {
                        float dis = distance(u_ripple_center, v_position);
                        float rSize = 400.0;
                        if(v_position.z >= v_height) {
                            color = top_color;
                        }
                        if(dis > u_radius - rSize && dis < u_radius + rSize) {
                            color *= (1.0 - abs(dis-u_radius) / rSize) * 2.0 + 1.0;
                        }
                    }
                    // 未知
                    else if(style == 5.0) {
                        float t = time / 1000.0;
                        float diffDistance = 10.0;
                        float modZ = mod(v_position.z - t * 40.0, diffDistance * 2.0);
                        color.a = 1.0 - pow(v_position.z / v_height, 0.5);
                        if(v_position.z / v_height < 0.3) {
                            color.r += 0.2;
                            color.g += 0.2;
                            color.b += 0.2;
                        }
                        if(modZ < diffDistance * 2.0 - 4.0) {
                            discard;
                        }
                    } else if(style == 6.0) {

                    }
                    gl_FragColor = color;
                }`,
                defines: defines,
            },
            this
        );

        this.vertexBuffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.colorBuffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.heightBuffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.textureBuffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.indexBuffer = new Buffer({
            gl: gl,
            target: "ELEMENT_ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        let attributes = [
            {
                name: "a_pos",
                buffer: this.vertexBuffer,
                stride: 28,
                size: 4,
                type: "FLOAT",
                offset: 0,
            },
            {
                name: "a_normal",
                buffer: this.vertexBuffer,
                size: 3,
                stride: 28,
                type: "FLOAT",
                offset: 16,
            },
            {
                name: "a_color",
                buffer: this.colorBuffer,
                size: 4,
                stride: 32,
                type: "FLOAT",
                offset: 0,
            },
            {
                name: "a_pre_color",
                buffer: this.colorBuffer,
                size: 4,
                stride: 32,
                type: "FLOAT",
                offset: 16,
            },
            {
                name: "a_height",
                buffer: this.heightBuffer,
                size: 1,
                stride: 8,
                type: "FLOAT",
                offset: 0,
            },
            {
                name: "a_pre_height",
                buffer: this.heightBuffer,
                size: 1,
                stride: 8,
                type: "FLOAT",
                offset: 4,
            },
        ];
        if (options.texture) {
            attributes.push({
                name: "a_texture_coord",
                buffer: this.textureBuffer,
                size: 2,
                stride: 8,
                type: "FLOAT",
                offset: 0,
            });
        }
        attributes = attributes.concat(this.getCommonAttributes());
        this.vertexArray = new VertexArray({
            gl: gl,
            program: this.program,
            attributes: attributes,
        });
        this.initializeTime = new Date();
        this.normalMatrix = mat4.create();
    }

    onChanged(options, dataArray) {
        if (this.gl) {
            this.loadTextureTime && clearTimeout(this.loadTextureTime);

            this.loadTextureTime = setTimeout(() => {
                this.loadTexture(() => {
                    this.dataMgr.parseData(dataArray);
                    this.dataTime = new Date();
                    this.webglLayer.render();
                });
            }, 0);
        }
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            projectionMatrix = transferOptions.projectionMatrix,
            viewMatrix = transferOptions.viewMatrix;

        if (this._isShow) {
            const data = this.getData();
            if (data && !(0 >= data.length)) {
                const options = this.getOptions();

                const program = this.program;
                program.use(gl);

                if (!options.texture || this.texture) {
                    gl.disable(gl.CULL_FACE);

                    if (options.blend) {
                        gl.enable(gl.BLEND);
                        gl.blendFunc(gl.ONE, gl.ONE);
                        gl.blendEquation(gl.FUNC_ADD);
                    }

                    if (0 === options.height) {
                        gl.enable(gl.BLEND);
                        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                    }

                    const style = LayerStyles[options.style] || 0;
                    if ("gradual" === options.style) {
                        gl.depthMask(false);
                        gl.enable(gl.BLEND);
                        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                    } else {
                        gl.depthMask(true);
                    }

                    // 顶部颜色
                    const topColor = this.normizedColor(options.topColor);

                    // 波纹图层
                    if (
                        "ripple" === options.style &&
                        options.rippleLayer &&
                        options.rippleLayer.data &&
                        options.rippleLayer.data[0]
                    ) {
                        const center = this.normizedPoint(
                            options.rippleLayer.data[0].geometry.coordinates
                        );
                        program.setUniforms({
                            u_ripple_center: [center[0], center[1], 0],
                            u_radius:
                                options.rippleLayer.options.size *
                                options.rippleLayer.currentScale,
                        });
                    }
                    // 光照
                    let light_dir = vec3.fromValues(0.5, 0.5, 0.5);
                    if (options.lightDir) {
                        light_dir = vec3.fromValues(
                            options.lightDir[0],
                            options.lightDir[1],
                            options.lightDir[2]
                        );
                    }
                    const m = this.normalMatrix;
                    mat4.invert(m, viewMatrix);
                    mat4.transpose(m, m);

                    program.setUniforms(
                        Object.assign(this.getCommonUniforms(transferOptions), {
                            u_normal_matrix: m,
                            u_sampler: this.texture,
                            u_proj_matrix: projectionMatrix,
                            u_mv_matrix: viewMatrix,
                            style: style,
                            top_color: topColor,
                            u_use_lighting: options.useLight,
                            u_use_texture: this.isUseTexture,
                            alpha: parseFloat(options.opacity),
                            time: new Date() - this.initializeTime,
                            dataTime: new Date() - this.dataTime,
                            riseTime: options.riseTime,
                            u_side_light_dir: light_dir,
                        })
                    );
                    const dataMgrData = this.dataMgr.getData();
                    if (dataMgrData.vertex.length > 0) {
                        this.vertexArray.bind();
                        this.indexBuffer.bind();

                        gl.drawElements(
                            gl.TRIANGLES,
                            dataMgrData.index.length,
                            gl.UNSIGNED_INT,
                            0
                        );
                    }
                }
            }
        } else this.webglLayer.clear();
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
