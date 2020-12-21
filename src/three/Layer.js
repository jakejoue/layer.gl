import CommonLayer from "../layer/CommonLayer";
import ThreeLayer from "./ThreeLayer";
import * as THREE from "three";

class LayerGroup {
    constructor() {
        this.pointOffset = [0, 0, 0];

        this.threeLayer = null;
        this.group = new THREE.Group();
        this.group.isGeoGroup = true;
    }

    onAdd(threeLayer) {
        if (this.threeLayer) {
            this.onRemove(this.threeLayer);
        }
        this.threeLayer = threeLayer;
        this.threeLayer.add(this.group);
    }

    onRemove(threeLayer) {
        threeLayer = threeLayer || this.threeLayer;
        threeLayer.remove(this.group);
        this.threeLayer = null;
    }

    // 设置偏移
    offset(centerPoint) {}

    add(...rest) {
        this.group.add(...rest);
        return this;
    }

    remove(...rest) {
        this.group.remove(...rest);
        return this;
    }

    clear() {
        this.group.remove(...this.group.children);
        return this;
    }
}

export default class Layer extends CommonLayer {
    constructor(options) {
        super(options);
        this.layerType = "threeLayer";
        this.group = new LayerGroup();
    }

    commonInitialize() {
        // 添加当前group
        this.group.onAdd(this.threeLayer);
    }

    setWebglLayer(webglLayer) {
        if (!webglLayer.threeLayer) {
            webglLayer.threeLayer = new ThreeLayer({
                webglLayer: webglLayer,
            });
        }
        this.threeLayer = webglLayer.threeLayer;
    }

    getThreeLayer() {
        return this.threeLayer;
    }

    destroy() {
        super.destroy();
        // 移除当前group
        this.group.onRemove(this.threeLayer);
        this.threeLayer = this.group = null;
    }

    /* ************** 通用方法接口 ************** */

    getPointOffset() {
        return [0, 0, 0];
    }

    normizedPoint(point) {
        if (!point || isNaN(+point[0]) || isNaN(+point[1])) return [0, 0, 0];
        const pointOffset = this.getPointOffset();
        const nPoint = this.map.normizedPoint(point);
        return [
            nPoint[0] - pointOffset[0],
            nPoint[1] - pointOffset[1],
            nPoint[2],
        ];
    }

    normizedHeight(height, point = [0, 0]) {
        if (!height || height <= 0) return 0;
        return this.map.normizedPoint([point[0], point[1], height])[2];
    }
}
