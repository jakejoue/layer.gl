function getMapBoxGLMap(map) {
    let transform = map.projection.getTransform();

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
                handler(evt.originalEvent);
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
                    handler(evt.originalEvent);
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
        // 渲染相关
        normizedPoint(coord) {
            const x = transform.mercatorXfromLng(coord[0]);
            const y = transform.mercatorYfromLat(coord[1]);
            const z = transform.mercatorZfromAltitude(coord[2] || 0, coord[1]);

            return [x, y, z];
        },
        worldSize() {
            return 1;
        },
        getMatirx() {
            return map.transform.customLayerMatrix();
        },
        // 销毁方法
        destroy() {
            listeners.forEach((l) => {
                map.off(l.type, l.handler);
            });
            map = transform = listen = listeners = null;
        },
    };
}

export default {
    getMapBoxGLMap,
};
