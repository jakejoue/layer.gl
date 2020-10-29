export function toRadian(f) {
    return (f * Math.PI) / 180;
}

export function toAngle(f) {
    return (f / Math.PI) * 180;
}

export function ceilPowerOfTwo(f) {
    return Math.pow(2, Math.ceil(Math.log(f) / Math.LN2));
}

export function floorPowerOfTwo(f) {
    return Math.pow(2, Math.floor(Math.log(f) / Math.LN2));
}

export function approximatelyEqual(f, c) {
    return 1e-8 > Math.abs(f - c);
}
