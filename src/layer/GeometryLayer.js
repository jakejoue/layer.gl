import Layer from "./Layer";

export default class GeometryLayer extends Layer {
    constructor(options) {
        super(options);

        this.group = [];
        this.segs = [];
    }
}
