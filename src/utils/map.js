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
        /* *********** 事件同步 ************** */
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
        /* **************** 渲染相关 ***************** */
        /**
         * 坐标转换
         * @param {Array} coord
         */
        normizedPoint(coord) {
            // 转为墨卡托坐标
            const mCoords = mapboxgl.MercatorCoordinate.fromLngLat(
                coord,
                coord[2] || 0,
                transform.projection
            );
            return [mCoords.x, mCoords.y, mCoords.z];
        },
        // 地图范围（矩阵范围）用于repeat
        worldSize() {
            return 1;
        },
        // 当前zoom范围下图幅像素范围
        getZoomUnits() {
            return 1 / transform.worldSize;
        },
        // 获取zoom
        getZoom() {
            return map.getZoom();
        },
        // 视图矩阵
        getProjectionMatrix() {
            return mat4.perspective(
                [],
                transform._fov,
                transform.width / transform.height,
                1,
                4e3
            );
        },
        // 可视化矩阵
        getViewMatrix() {
            // 中心点
            const point = transform.point;
            const x = point.x,
                y = point.y;

            const cameraToCenterDistance =
                (0.5 / Math.tan(transform._fov / 2)) * transform.height;

            const m = mat4.create();
            mat4.scale(m, m, [1, -1, 1]);
            mat4.translate(m, m, [0, 0, -cameraToCenterDistance]);
            mat4.rotateX(m, m, transform._pitch);
            mat4.rotateZ(m, m, transform.angle);
            mat4.translate(m, m, [-x, -y, 0]);

            return mat4.scale([], m, [
                transform.worldSize,
                transform.worldSize,
                transform.worldSize,
            ]);
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
