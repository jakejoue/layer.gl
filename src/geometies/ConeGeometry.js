import TruncatedConeGeometry from "./TruncatedConeGeometry";
import { uid } from "../helper/util";

export default class ConeGeometry extends TruncatedConeGeometry {
    constructor(props = {}) {
        const { id = uid("cone-geometry"), radius = 1, cap = true } = props;
        super({
            ...props,
            id,
            topRadius: 0,
            topCap: Boolean(cap),
            bottomCap: Boolean(cap),
            bottomRadius: radius,
        });
    }
}
