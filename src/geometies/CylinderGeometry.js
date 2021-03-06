import TruncatedConeGeometry from "./TruncatedConeGeometry";
import { uid } from "../helper/util";

export default class CylinderGeometry extends TruncatedConeGeometry {
    constructor(props = {}) {
        const { id = uid("cylinder-geometry"), radius = 1 } = props;
        super({
            ...props,
            id,
            bottomRadius: radius,
            topRadius: radius,
        });
    }
}
