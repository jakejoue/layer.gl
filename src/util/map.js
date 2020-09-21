export function getMapBoxGLMap(map) {
    return {
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
        getContainer() {
            return map.getContainer();
        },
        getSize() {
            return {
                width: map.transform.width,
                height: map.transform.height,
            };
        },
        // 墨卡托
        getMatirx() {
            return map.transform.customLayerMatrix();
        },
    };
}
