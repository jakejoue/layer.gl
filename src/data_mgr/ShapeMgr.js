import earcut from "earcut";
import { vec3 } from "gl-matrix";

export default class ShapeMgr {
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
            const baseHeight = +this.shapeLayer.getValue("baseHeight", data) || 0;
            const height = +this.shapeLayer.getValue("height", data) || 0;
            const color = this.shapeLayer.normizedColor(this.shapeLayer.getValue("color", data));

            // 选中的颜色
            let pickColor;
            options.enablePicked && (pickColor = this.shapeLayer.indexToRgb(i));

            // 开始自增高的高度和颜色
            let preHeight, preColor;
            if (options.riseTime) {
                preHeight = +this.shapeLayer.getValue("preHeight", data) || 0;
                preColor = this.shapeLayer.normizedColor(this.shapeLayer.getValue("preColor", data));
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
                    const coord = coords[j].map((cc) =>
                        cc.map((b) => this.shapeLayer.normizedPoint(b))
                    );
                    const data = earcut.flatten(coord);

                    // 高度转换
                    const point = coords[j][0][0];
                    const _baseHeight = this.shapeLayer.normizedHeight(baseHeight, point),
                        _height = this.shapeLayer.normizedHeight(height, point),
                        _preHeight = this.shapeLayer.normizedHeight(preHeight, point);

                    this.parseBuilding3d(
                        data,
                        _preHeight,
                        _baseHeight,
                        _height,
                        preColor,
                        color,
                        pickColor,
                        this.outBuilding3d
                    );
                }
            }
        }
    }

    getBounds(vertices) {
        let minX = vertices[0],
            minY = vertices[1],
            maxX = vertices[0],
            maxY = vertices[1];
        for (let i = 0; i < vertices.length; i += 3) {
            minX = Math.min(vertices[i], minX);
            minY = Math.min(vertices[i + 1], minY);
            maxX = Math.max(vertices[i], maxX);
            maxY = Math.max(vertices[i + 1], maxY);
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

    parseBuilding3d(data, preHeight, baseHeight, height, preColor, color, pickColor, h) {
        preHeight = preHeight !== undefined ? preHeight : height;
        preColor = preColor !== undefined ? preColor : color;

        const options = this.shapeLayer.getOptions(),
            isUseTexture = this.shapeLayer.isUseTexture,
            vertexArray = h.vertex,
            textureArray = h.texture,
            colorArray = h.color,
            heightArray = h.height,
            pickColorVertexArray = h.pickColorVertex,
            indexArray = h.index;

        const isTextureFull = options.isTextureFull;

        let t_w = 0,
            t_h = 0,
            top_t_w = 0,
            top_t_h = 0;

        const gl = this.shapeLayer.gl;

        const glTexture = gl.textureManager.get(options.texture);
        const topGlTexture = gl.textureManager.get(options.topTexture);

        if (glTexture && !isTextureFull) {
            t_w = this.shapeLayer.normizedHeight(
                glTexture.width * options.textureScale
            );
            t_h = this.shapeLayer.normizedHeight(
                glTexture.height * options.textureScale
            );
        }

        if (topGlTexture && !isTextureFull) {
            top_t_w = this.shapeLayer.normizedHeight(
                topGlTexture.width * options.textureScale
            );
            top_t_h = this.shapeLayer.normizedHeight(
                topGlTexture.height * options.textureScale
            );
        } else {
            top_t_w = t_w;
            top_t_h = t_h;
        }

        const { vertices, holes } = data;

        // 房顶
        if ("gradual" !== options.style) {
            const indices = earcut(vertices, holes, 3);

            const index1 = indices[0],
                index2 = indices[1],
                index3 = indices[2];

            const p1 = [vertices[3 * index1], vertices[3 * index1 + 1], 1];
            const p2 = [vertices[3 * index2], vertices[3 * index2 + 1], 1];
            const p3 = [vertices[3 * index3], vertices[3 * index3 + 1], 1];

            const normal = vec3.normalize(
                [],
                vec3.cross([], vec3.sub([], p3, p2), vec3.sub([], p1, p2))
            );

            let bound;
            if (isUseTexture) {
                bound = this.getBounds(vertices);
            }

            // 当前开始的索引
            const startIndex = vertexArray.length / 7;

            // 存入顶点信息
            for (let i = 0; i < vertices.length; i += 3) {
                vertexArray.push(
                    vertices[i],
                    vertices[i + 1],
                    vertices[i + 2],
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
                heightArray.push(baseHeight, height, preHeight);

                if (isUseTexture) {
                    if (isTextureFull) {
                        textureArray.push((vertices[i] - bound.minX) / bound.width);
                        textureArray.push((vertices[i + 1] - bound.minY) / bound.height);
                    } else {
                        textureArray.push((vertices[i] - bound.minX) / top_t_w);
                        textureArray.push((vertices[i + 1] - bound.minY) / top_t_h);
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

        // 无效高度（负值高度）
        if (height === preHeight && height <= 0) {
            return;
        }

        // 墙面
        for (let i = 0; i < vertices.length; i += 3) {
            // 开始的顶点位置
            const startIndex = vertexArray.length / 7;

            // 当前顶点坐标
            const x = vertices[i],
                y = vertices[i + 1],
                z = vertices[i + 2];
            // 顶点坐标和底部坐标
            const p = [x, y, z, 0],
                t_p = [x, y, z, 1];

            // 下个顶点的坐标
            const j = i + 3;
            const holeIndex = holes.indexOf(j / 3);
            if (holeIndex !== -1) {
                continue;
            }

            const n_x = vertices[j],
                n_y = vertices[j + 1],
                n_z = vertices[j + 2];
            const n_p = [n_x, n_y, n_z, 0],
                n_t_p = [n_x, n_y, n_z, 1];

            const ll = Math.sqrt(Math.pow(n_x - x, 2), Math.pow(n_y - y, 2));

            let normal = vec3.normalize(
                [],
                vec3.cross([], vec3.sub([], n_p, p), vec3.sub([], t_p, p))
            );
            // 如果是无方向向量
            if (normal[0] === 0 && normal[1] === 0 && normal[1] === 0) {
                normal = vec3.normalize([], vec3.sub([], n_p, p));
                normal = [normal[1], -normal[0], 0];
            }

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
            colorArray.push(preColor[0], preColor[1], preColor[2], preColor[3]);
            colorArray.push(color[0], color[1], color[2], color[3]);
            colorArray.push(preColor[0], preColor[1], preColor[2], preColor[3]);
            colorArray.push(color[0], color[1], color[2], color[3]);
            colorArray.push(preColor[0], preColor[1], preColor[2], preColor[3]);
            colorArray.push(color[0], color[1], color[2], color[3]);
            colorArray.push(preColor[0], preColor[1], preColor[2], preColor[3]);

            // 高度
            heightArray.push(baseHeight, height, preHeight);
            heightArray.push(baseHeight, height, preHeight);
            heightArray.push(baseHeight, height, preHeight);
            heightArray.push(baseHeight, height, preHeight);

            // 纹理
            if (isUseTexture) {
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
