import Layer from "./Layer";

export default class GeometryLayer extends Layer {
    constructor(options) {
        super(options);
    }

    onChanged(options) {
        const geometies = options.geometies || [];
        this.group.add(...geometies);
    }
}
