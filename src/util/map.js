function getMapBoxGLMap(map) {
    const transform = map.projection.getTransform();

    return {
        mapType: "mapboxgl",
        // 必要的实践
        onResize(handler) {
            map.on("resize", function () {
                handler();
            });
        },
        onUpdate(handler) {
            map.on("render", function () {
                handler();
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
        getMatirx() {
            return map.transform.customLayerMatrix();
        },
    };
}

export default {
    getMapBoxGLMap,
};
