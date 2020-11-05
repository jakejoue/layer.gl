import { mat4 } from "gl-matrix";

function getMapBoxGLMap(map) {
    const transform = map.transform;

    // 所有监听的事件
    let listeners = [];
    function listen(type, handler) {
        listeners.push({ type, handler });
        map.on(type, handler);
    }

    return {
        mapType: "mapboxgl",
        /* *********** 事件同步相关 ************** */
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
        /* *************** 容器相关 **************** */
        getContainer() {
            return map.getCanvasContainer();
        },
        getSize() {
            return {
                width: transform.width,
                height: transform.height,
            };
        },
        /* ************** 地图参数相关 ************** */
        getCenter() {
            return map.getCenter().toArray();
        },
        getZoom() {
            return map.getZoom();
        },
        // 地图范围（矩阵范围）用于repeat
        worldSize() {
            return 1;
        },
        // 当前zoom范围下图幅像素范围
        getZoomUnits() {
            return 1 / transform.worldSize;
        },
        /* *********** 矩阵和坐标转换相关 ************ */
        // 坐标转换
        normizedPoint(coord) {
            // 转为墨卡托坐标
            const mCoords = mapboxgl.MercatorCoordinate.fromLngLat(
                coord.slice(0, 3),
                coord[2] || 0,
                transform.projection
            );
            return [mCoords.x, mCoords.y, mCoords.z];
        },
        // 视图矩阵
        getProjectionMatrix() {
            return mat4.create();
        },
        // 可视化矩阵
        getViewMatrix() {
            return transform.mercatorMatrix.slice();
        },
        /* **************** 销毁接口 ***************** */
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