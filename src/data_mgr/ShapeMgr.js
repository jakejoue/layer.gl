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

        // this.shapeLayer.vertexBuffer.updateData(this.outBuilding3d.vertex);
        // this.shapeLayer.colorBuffer.updateData(this.outBuilding3d.color);
        // this.shapeLayer.heightBuffer.updateData(this.outBuilding3d.height);
        // this.shapeLayer.textureBuffer.updateData(this.outBuilding3d.texture);
        // this.shapeLayer.indexBuffer.updateData(this.outBuilding3d.index);
        // if (options.enablePicked) {
        //     this.shapeLayer.pickBuffer.updateData(
        //         this.outBuilding3d.pickColorVertex
        //     );
        // }
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
            isUseTexture = this.shapeLayer.isUseTexture,
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

            const normal = vec3.normalize(
                [],
                vec3.cross([], vec3.sub([], p3, p2), vec3.sub([], p1, p2))
            );

            let bound;
            if (isUseTexture) {
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

                if (isUseTexture) {
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
}
