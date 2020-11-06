import { vec2 } from "gl-matrix";

function subNormalize(f, c, a) {
    vec2.sub(f, c, a);
    vec2.normalize(f, f);
    return f;
}

function revertSet(f, c) {
    return vec2.set(f, -c[1], c[0]);
}

export default class LineMgr {
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
