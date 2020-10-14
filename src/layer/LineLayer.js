import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

import { loadTextureImage } from "../util/texture";
import { road, arrow } from "../util/cavans";

import { vec2 } from "gl-matrix";

const LineStyles = {
    normal: null,
    road: road,
    arrow: arrow,
};

function subNormalize(f, c, a) {
    vec2.sub(f, c, a);
    vec2.normalize(f, f);
    return f;
}

function revertSet(f, c) {
    return vec2.set(f, -c[1], c[0]);
}

class DataMgr {
    constructor(options) {
        this.join = options.join || "miter";
        this.cap = options.cap || "butt";
        this.thickness = options.thickness || 4;
        this.miterLimit = options.miterLimit || 2 * this.thickness;
        this.dash = options.dash || false;
        this.complex = {
            positions: [],
            indices: [],
            normals: [],
            colors: [],
            uvs: [],
            startIndex: 0,
            maxDistance: 0,
        };
        this._lastFlip = -1;
        this._started = false;
        this._normal = null;
        this._totalDistance = 0;
    }

    extrude(line, color) {
        const complex = this.complex;
        if (1 >= line.length) return complex;

        this._lastFlip = -1;
        this._started = false;
        this._normal = null;
        this._totalDistance = 0;

        const length = line.length;
        let start = complex.startIndex;

        for (let i = 1; i < length; i++) {
            const k = this._segment(
                complex,
                start,
                line[i - 1],
                line[i],
                i < length - 1 ? line[i + 1] : null,
                color
            );
            if (-1 !== k) {
                start += k;
            }
        }
        if (this.dash) {
            complex.maxDistance = Math.max(
                this._totalDistance,
                complex.maxDistance
            );
        }
        complex.startIndex = complex.positions.length / 6;

        return complex;
    }

    _segment(complex, start, prePoint, point, nextPoint, color) {
        let pointSize = 0;

        const avgNormal = vec2.create(),
            tempNormal = vec2.create(),
            preNormal = vec2.create(),
            nextNormal = vec2.create();

        const indices = complex.indices,
            positions = complex.positions,
            normals = complex.normals,
            colors = complex.colors,
            uvs = complex.uvs;

        const isSquareCap = "square" === this.cap,
            isRoundCap = "round" === this.cap,
            xy = [point[0], point[1]],
            preXy = [prePoint[0], prePoint[1]];
        let isBevelJoin = "bevel" === this.join,
            isRoundJoin = "round" === this.join;

        subNormalize(preNormal, xy, preXy);

        let dis = 0;
        if (this.dash) {
            dis = this._calcDistance(xy, preXy);
            this._totalDistance += dis;
        }

        // 对应的90度方向的向量
        if (!this._normal) {
            this._normal = vec2.create();
            revertSet(this._normal, preNormal);
        }

        // 头部点
        if (!this._started) {
            this._started = true;

            // 方头
            if (isSquareCap) {
                const normal0 = vec2.create();
                const normal1 = vec2.create();

                vec2.add(normal0, this._normal, preNormal);
                vec2.sub(normal1, this._normal, preNormal);
                normals.push(normal1[0], normal1[1], 0);
                normals.push(normal0[0], normal0[1], 0);

                positions.push(
                    prePoint[0],
                    prePoint[1],
                    prePoint[2],
                    this._totalDistance - dis,
                    this.thickness,
                    0
                );
                positions.push(
                    prePoint[0],
                    prePoint[1],
                    prePoint[2],
                    this._totalDistance - dis,
                    -this.thickness,
                    0
                );
                uvs.push(
                    this._totalDistance - dis,
                    0,
                    this._totalDistance - dis,
                    1
                );
                colors.push(color[0], color[1], color[2], color[3]);
                colors.push(color[0], color[1], color[2], color[3]);
            }
            // 圆角头
            else if (isRoundCap) {
                const normal0 = vec2.fromValues(-preNormal[0], -preNormal[1]);

                const normal1 = vec2.create();
                vec2.sub(normal1, this._normal, preNormal);
                vec2.normalize(normal1, normal1);

                const normal2 = vec2.create();
                vec2.add(normal2, this._normal, preNormal);
                vec2.normalize(normal2, normal2);

                const normal3 = vec2.fromValues(
                        this._normal[0],
                        this._normal[1]
                    ),
                    normal4 = vec2.fromValues(
                        -this._normal[0],
                        -this._normal[1]
                    );

                normals.push(normal0[0], normal0[1], 0);
                normals.push(normal1[0], normal1[1], 0);
                normals.push(-normal2[0], -normal2[1], 0);
                normals.push(normal3[0], normal3[1], 0);
                normals.push(normal4[0], normal4[1], 0);

                for (let k = 0; 5 > k; k++) {
                    positions.push(
                        prePoint[0],
                        prePoint[1],
                        prePoint[2],
                        this._totalDistance - dis,
                        this.thickness,
                        0
                    );
                    uvs.push(this._totalDistance - dis, 0);
                    colors.push(color[0], color[1], color[2], color[3]);
                }

                /**
                 *   1 - 3
                 * 0       
                 *   2 - 4
                 */
                indices.push(
                    start + 0,
                    start + 2,
                    start + 1,
                    start + 1,
                    start + 2,
                    start + 3,
                    start + 3,
                    start + 2,
                    start + 4
                );
                pointSize += 3;
                start += 3;
            }
            // 平头（即没有突出部分）
            else {
                this._extrusions(
                    positions,
                    normals,
                    uvs,
                    colors,
                    prePoint,
                    this._normal,
                    this.thickness,
                    this._totalDistance - dis,
                    color
                );
            }
        }

        // 存入第一个多边形索引
        indices.push(
            ...(-1 === this._lastFlip
                ? [start + 0, start + 1, start + 2]
                : [start + 1, start + 0, start + 2])
        );

        // 如果存在下个点
        if (nextPoint) {
            // 如果到了最末尾
            if (
                point[0] === nextPoint[0] &&
                point[1] === nextPoint[1] &&
                point[2] === nextPoint[2]
            ) {
                return -1;
            }

            // 计算下个点的方向
            subNormalize(nextNormal, [nextPoint[0], nextPoint[1]], xy);

            const thickness = this.thickness;
            vec2.add(avgNormal, preNormal, nextNormal);
            vec2.normalize(avgNormal, avgNormal);

            // 计算相交向量
            const normal = vec2.fromValues(-avgNormal[1], avgNormal[0]);
            const normal2 = vec2.fromValues(-preNormal[1], preNormal[0]);

            dis = thickness / vec2.dot(normal, normal2);

            // 判断是否要转成斜转角
            if (!isBevelJoin && "miter" === this.join) {
                if (Math.abs(dis) > this.miterLimit) {
                    isBevelJoin = true;
                }
            }

            // 判断是上顶点还是下顶点
            let lastFlip = 0 < vec2.dot(avgNormal, this._normal) ? -1 : 1;

            // 斜边
            if (isBevelJoin) {
                const thickness = Math.min(2 * this.thickness, Math.abs(dis));
                normals.push(this._normal[0], this._normal[1], 0);
                normals.push(normal[0], normal[1], 0);
                positions.push(
                    point[0],
                    point[1],
                    point[2],
                    this._totalDistance,
                    this.thickness * lastFlip,
                    0
                );
                positions.push(
                    point[0],
                    point[1],
                    point[2],
                    this._totalDistance,
                    -thickness * lastFlip,
                    0
                );
                indices.push(
                    ...(this._lastFlip === -lastFlip
                        ? [start + 2, start + 1, start + 3]
                        : [start + 0, start + 2, start + 3])
                );
                revertSet(tempNormal, nextNormal);
                vec2.copy(this._normal, tempNormal);
                normals.push(this._normal[0], this._normal[1], 0);
                positions.push(
                    point[0],
                    point[1],
                    point[2],
                    this._totalDistance,
                    this.thickness * lastFlip,
                    0
                );
                indices.push(
                    ...(1 === lastFlip
                        ? [start + 2, start + 3, start + 4]
                        : [start + 3, start + 2, start + 4])
                );
                this._flipedUV(uvs, this._totalDistance, lastFlip, true);
                colors.push(color[0], color[1], color[2], color[3]);
                colors.push(color[0], color[1], color[2], color[3]);
                colors.push(color[0], color[1], color[2], color[3]);
                pointSize += 3;
            }
            // 圆角
            else if (isRoundJoin) {
                isRoundJoin = Math.min(2 * this.thickness, Math.abs(dis));
                normals.push(this._normal[0], this._normal[1], 0);
                normals.push(normal[0], normal[1], 0);
                normals.push(normal[0], normal[1], 0);
                positions.push(
                    point[0],
                    point[1],
                    point[2],
                    this._totalDistance,
                    this.thickness * lastFlip,
                    0
                );
                positions.push(
                    point[0],
                    point[1],
                    point[2],
                    this._totalDistance,
                    this.thickness * lastFlip,
                    0
                );
                positions.push(
                    point[0],
                    point[1],
                    point[2],
                    this._totalDistance,
                    -isRoundJoin * lastFlip,
                    0
                );
                indices.push(
                    ...(this._lastFlip === -lastFlip
                        ? [
                              start + 2,
                              start + 1,
                              start + 4,
                              start + 2,
                              start + 4,
                              start + 3,
                          ]
                        : [
                              start + 0,
                              start + 2,
                              start + 4,
                              start + 2,
                              start + 3,
                              start + 4,
                          ])
                );
                revertSet(tempNormal, nextNormal);
                vec2.copy(this._normal, tempNormal);
                normals.push(this._normal[0], this._normal[1], 0);
                positions.push(
                    point[0],
                    point[1],
                    point[2],
                    this._totalDistance,
                    this.thickness * lastFlip,
                    0
                );
                indices.push(
                    ...(1 === lastFlip
                        ? [start + 4, start + 3, start + 5]
                        : [start + 3, start + 4, start + 5])
                );
                this._flipedUV(uvs, this._totalDistance, lastFlip, false);
                colors.push(color[0], color[1], color[2], color[3]);
                colors.push(color[0], color[1], color[2], color[3]);
                colors.push(color[0], color[1], color[2], color[3]);
                colors.push(color[0], color[1], color[2], color[3]);
                pointSize += 4;
            }
            // 默认模式
            else {
                this._extrusions(
                    positions,
                    normals,
                    uvs,
                    colors,
                    point,
                    normal,
                    dis,
                    this._totalDistance,
                    color
                );
                indices.push(
                    ...(-1 === this._lastFlip
                        ? [start + 2, start + 1, start + 3]
                        : [start + 2, start + 0, start + 3])
                );
                lastFlip = -1;
                vec2.copy(this._normal, normal);
                pointSize += 2;
            }
            this._lastFlip = lastFlip;
        }
        // 末尾的点
        else {
            revertSet(this._normal, preNormal);
            // 方头
            if (isSquareCap) {
                const normal0 = vec2.create();
                const normal1 = vec2.create();

                vec2.add(normal0, preNormal, this._normal);
                vec2.sub(normal1, preNormal, this._normal);
                normals.push(normal0[0], normal0[1], 0);
                normals.push(normal1[0], normal1[1], 0);

                positions.push(
                    point[0],
                    point[1],
                    point[2],
                    this._totalDistance,
                    this.thickness,
                    0
                );
                positions.push(
                    point[0],
                    point[1],
                    point[2],
                    this._totalDistance,
                    this.thickness,
                    0
                );
                uvs.push(this._totalDistance, 0, this._totalDistance, 1);
                colors.push(color[0], color[1], color[2], color[3]);
                colors.push(color[0], color[1], color[2], color[3]);
            }
            // 没有头
            else {
                this._extrusions(
                    positions,
                    normals,
                    uvs,
                    colors,
                    point,
                    this._normal,
                    this.thickness,
                    this._totalDistance,
                    color
                );
            }
            indices.push(
                ...(-1 === this._lastFlip
                    ? [start + 2, start + 1, start + 3]
                    : [start + 2, start + 0, start + 3])
            );
            pointSize += 2;

            // 圆头
            if (isRoundCap) {
                const normal0 = vec2.create();
                vec2.add(normal0, preNormal, this._normal);
                vec2.normalize(normal0, normal0);

                const normal1 = vec2.create();
                vec2.sub(normal1, preNormal, this._normal);
                vec2.normalize(normal1, normal1);

                const normal2 = vec2.fromValues(preNormal[0], preNormal[1]);

                normals.push(normal0[0], normal0[1], 0);
                normals.push(normal1[0], normal1[1], 0);
                normals.push(normal2[0], normal2[1], 0);

                for (let i = 0; 3 > i; i++) {
                    positions.push(
                        point[0],
                        point[1],
                        point[2],
                        this._totalDistance - dis,
                        this.thickness,
                        0
                    );
                    uvs.push(this._totalDistance - dis, 0);
                    colors.push(color[0], color[1], color[2], color[3]);
                }

                /**
                 * 2 - 4
                 *       6
                 * 3 - 5
                 */
                indices.push(
                    start + 2,
                    start + 3,
                    start + 4,
                    start + 4,
                    start + 3,
                    start + 5,
                    start + 4,
                    start + 5,
                    start + 6
                );
                pointSize += 3;
            }
        }
        return pointSize;
    }

    _extrusions(
        positions,
        normals,
        uvs,
        colors,
        point,
        normal,
        thickness,
        totalDis,
        color
    ) {
        normals.push(normal[0], normal[1], 0);
        normals.push(normal[0], normal[1], 0);

        positions.push(point[0], point[1], point[2], totalDis, thickness, 0);
        positions.push(point[0], point[1], point[2], totalDis, -thickness, 0);

        uvs.push(totalDis, 0, totalDis, 1);

        colors.push(color[0], color[1], color[2], color[3]);
        colors.push(color[0], color[1], color[2], color[3]);
    }

    _calcDistance(point1, point2) {
        return Math.sqrt(
            Math.pow(point1[0] - point2[0], 2) +
                Math.pow(point1[1] - point2[1], 2)
        );
    }

    _flipedUV(uvs, totalDis, dir, isBevel) {
        if (isBevel) {
            -1 === dir
                ? uvs.push(totalDis, 0, totalDis, 1, totalDis, 0)
                : uvs.push(totalDis, 1, totalDis, 0, totalDis, 1);
        } else {
            -1 === dir
                ? uvs.push(totalDis, 0, totalDis, 0, totalDis, 1, totalDis, 0)
                : uvs.push(totalDis, 1, totalDis, 1, totalDis, 0, totalDis, 1);
        }
    }
}

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
                vertexShader: `precision highp float;
                uniform vec4 uSelectedColor;
                uniform mat4 u_matrix;
                uniform vec2 u_dash_array;
                uniform float u_zoom_units;
                uniform float u_offset;

                attribute vec4 a_color;
                attribute vec3 a_position;
                attribute vec3 a_normal;
                attribute float a_distance;
                attribute float a_total_distance;
                attribute float a_width;

                #if defined(USE_TEXTURE)
                attribute vec2 uv;
                #endif
                
                varying vec4 v_color;
                varying vec2 v_normal;
                varying vec2 v_uv;
                varying vec2 v_dash_array;
                varying float v_total_distance;
                varying float v_counter;
                varying float v_width;

                void main() {
                    v_width = a_width;
                    v_color = a_color;
                    v_counter = a_distance / a_total_distance;
                    v_dash_array = u_zoom_units * u_dash_array / a_total_distance;
                    v_total_distance = a_total_distance;
                    v_normal = vec2(normalize(a_normal.xy) * sign(a_width));
                    
                    #if defined(USE_TEXTURE)
                    v_uv=uv;
                    #endif
                    
                    #if defined(PICK)
                    if(mapvIsPicked()) {
                        v_color=uSelectedColor;
                    }
                    #endif
                    
                    vec2 extrude = a_normal.xy * a_width / 2.0 * u_zoom_units;
                    vec2 offsetXY = a_normal.xy * u_offset;
                    float offsetZ = u_offset * u_zoom_units / 100.0;

                    gl_Position = u_matrix * vec4(a_position.xy + extrude + offsetXY, a_position.z + offsetZ, 1.0);
                }`,
                fragmentShader: `precision highp float;
                varying vec4 v_color;
                varying vec2 v_normal;
                varying vec2 v_uv;
                varying vec2 v_dash_array;
                varying float v_counter;
                varying float v_total_distance;
                varying float v_width;
                
                uniform bool u_antialias;
                uniform float u_dash_offset;
                uniform float u_zoom_units;
                
                #if defined(USE_LINE_ANIMATION)
                uniform bool u_animate;
                uniform float u_time;
                uniform float u_duration;
                uniform float u_interval;
                uniform float u_trail_length;
                #endif
                
                #if defined(USE_TEXTURE)
                uniform float u_texture_width;
                uniform float u_texture_margin;
                uniform sampler2D u_sampler;
                #endif
                
                void main() {
                    vec4 color = v_color;

                    if(u_antialias) {
                        float blur = 1.0;
                        blur = 1.0 - smoothstep(0.9, 1.0, length(v_normal));
                        color.a *= blur;
                    }
                    
                    #if defined(USE_LINE_ANIMATION)
                    if(u_animate) {
                        float alpha = 1.0 - fract(mod(1.0 - v_counter, u_interval) * (1.0 / u_interval) + u_time / u_duration);
                        alpha = (alpha + u_trail_length - 1.0) / u_trail_length;
                        color.a *= alpha;
                        gl_FragColor = color;
                        return;
                    }
                    #endif
                    
                    #if defined(USE_TEXTURE)
                    float margin_width = u_texture_margin * u_zoom_units;
                    float margin_width_half = margin_width / 2.0;
                    float texture_width = u_texture_width * u_zoom_units;
                    float delta = mod(v_uv.x, texture_width + margin_width);
                    if(delta >= margin_width_half && delta <= margin_width_half + texture_width) {
                        float uvx = (delta - margin_width_half) / texture_width;
                        vec4 texture = texture2D(u_sampler, vec2(uvx, v_uv.y));
                        color = texture.a >= 0.5 ? texture : color;
                    }
                    #endif
                    
                    if(v_dash_array.y > 0.0) {
                        float offset = u_dash_offset * u_zoom_units / v_total_distance;
                        color.a *= (1.0 - step(v_dash_array.x, mod(v_counter + offset, v_dash_array.x + v_dash_array.y)));
                    }
                    gl_FragColor = color;
                }`,
                defines: defines,
            },
            this
        );
        this.positionBuffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.colorBuffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.normalBuffer = new Buffer({
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
                stride: 24,
                name: "a_position",
                buffer: this.positionBuffer,
                size: 3,
                type: "FLOAT",
                offset: 0,
            },
            {
                stride: 24,
                name: "a_distance",
                buffer: this.positionBuffer,
                size: 1,
                type: "FLOAT",
                offset: 12,
            },
            {
                stride: 24,
                name: "a_width",
                buffer: this.positionBuffer,
                size: 1,
                type: "FLOAT",
                offset: 16,
            },
            {
                stride: 24,
                name: "a_total_distance",
                buffer: this.positionBuffer,
                size: 1,
                type: "FLOAT",
                offset: 20,
            },
            {
                stride: 12,
                name: "a_normal",
                buffer: this.normalBuffer,
                size: 3,
                type: "FLOAT",
                offset: 0,
            },
            {
                stride: 16,
                name: "a_color",
                buffer: this.colorBuffer,
                size: 4,
                type: "FLOAT",
                offset: 0,
            },
        ];
        attributes = attributes.concat(this.getCommonAttributes());
        if (this.isUseTexture) {
            this.uvBuffer = new Buffer({
                gl: gl,
                target: "ARRAY_BUFFER",
                usage: "STATIC_DRAW",
            });
            attributes.push({
                stride: 8,
                name: "uv",
                buffer: this.uvBuffer,
                size: 2,
                type: "FLOAT",
                offset: 0,
            });
            const texture = LineStyles[options.style](options.styleOptions);
            this.setOptions({ texture: texture });
            this.loadTexture();
        }
        this.vertexArray = new VertexArray({
            gl: gl,
            program: this.program,
            attributes: attributes,
        });
    }

    onChanged(options, data) {
        const self = this;
        if (this.gl) {
            let dashArray = options.dashArray;
            dashArray =
                !!this.isUseTexture || !!dashArray[1] || !!this.isAnimateLine;

            const dataMgr = new DataMgr({
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

            this.lineData = complexData;
            this.positionBuffer.updateData(
                new Float32Array(complexData.positions)
            );
            this.normalBuffer.updateData(new Float32Array(complexData.normals));
            this.colorBuffer.updateData(new Float32Array(complexData.colors));
            this.indexBuffer.updateData(new Uint32Array(complexData.indices));
            this.isUseTexture &&
                this.uvBuffer.updateData(new Float32Array(complexData.uvs));
            options.enablePicked &&
                this.pickBuffer.updateData(new Float32Array(pickColors));
        }
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix,
            lineData = this.lineData;

        if (lineData && !(0 >= lineData.indices.length) && this.map) {
            const options = this.getOptions(),
                program = this.program;

            program.use(gl);

            let uniforms = Object.assign(
                this.getCommonUniforms(transferOptions),
                {
                    u_matrix: matrix,
                    u_zoom_units: this.map.getZoomUnits(),
                    u_dash_array: options.dashArray,
                    u_dash_offset: options.dashOffset,
                    u_antialias: options.antialias,
                    u_offset: options.offset,
                }
            );
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
            this.indexBuffer.bind();
            this.vertexArray.bind();
            gl.drawElements(
                gl.TRIANGLES,
                lineData.indices.length,
                gl.UNSIGNED_INT,
                0
            );
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            gl.disable(gl.BLEND);
        }
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
