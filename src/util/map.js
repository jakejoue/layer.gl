import { mat4 } from "gl-matrix";

function getMapBoxGLMap(map) {
    const transform = map.projection.getTransform();

    // 坐标偏移（相对于中心点）
    const point = map.transform.point,
        worldSize = map.transform.worldSize;
    const pointOffset = [point.x / worldSize, point.y / worldSize];

    // 所有监听的事件
    let listeners = [];
    function listen(type, handler) {
        listeners.push({ type, handler });
        map.on(type, handler);
    }

    return {
        mapType: "mapboxgl",
        // 必要的实践
        onResize(handler) {
            listen("resize", handler);
        },
        onUpdate(handler) {
            listen("render", handler);
        },
        onClick(handler) {
            listen("click", function (evt) {
                handler(evt.point);
            });
        },
        onDblClick(handler) {
            listen("dblclick", function (evt) {
                handler(evt.point);
            });
        },
        onRightClick(handler) {
            listen("contextmenu", function (evt) {
                handler(evt.point);
            });
        },
        onMousemove(handler) {
            listen("mousemove", function (evt) {
                if (!map.isMoving()) {
                    handler(evt.point);
                }
            });
        },
        // 容器更新相关
        getContainer() {
            return map.getCanvasContainer();
        },
        getSize() {
            return {
                width: map.transform.width,
                height: map.transform.height,
            };
        },
        /* **************** 渲染相关 ***************** */
        // 坐标转换
        normizedPoint(coord) {
            const x = transform.mercatorXfromLng(coord[0]) - pointOffset[0];
            const y = transform.mercatorYfromLat(coord[1]) - pointOffset[1];
            const z = transform.mercatorZfromAltitude(coord[2] || 0, coord[1]);

            return [x, y, z];
        },
        // 地图范围（矩阵范围）用于repeat
        worldSize() {
            return 1;
        },
        // 当前zoom范围下图幅像素范围
        getZoomUnits() {
            return 1 / map.transform.worldSize;
        },
        // 坐标系矩阵
        getProjectionMatrix() {
            const m = map.transform.mercatorMatrix.slice();
            mat4.translate(m, m, [pointOffset[0], pointOffset[1], 0]);

            return m;
        },
        // 可视化矩阵
        getViewMatrix() {
            return mat4.create();
        },
        /* **************** 渲染相关 ***************** */
        // 销毁方法
        destroy() {
            listeners.forEach((l) => {
                map.off(l.type, l.handler);
            });
            map = listen = listeners = null;
        },
    };
}

export default {
    getMapBoxGLMap,
};
