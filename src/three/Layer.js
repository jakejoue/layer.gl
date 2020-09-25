import CommonLayer from "../layer/CommonLayer";
import ThreeLayer from "./ThreeLayer";

export default class Layer extends CommonLayer {
    constructor(options) {
        super(options);
        this.layerType = "threeLayer";
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
}
