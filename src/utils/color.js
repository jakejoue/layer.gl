import { clamp } from "../helper/math";

export function tmpKelvinToRGB(tmpKelvin) {
    tmpKelvin = clamp(tmpKelvin, 1000, 40000);

    tmpKelvin /= 100;

    let r, g, b, tmpCalc;

    // r
    if (tmpKelvin <= 66) {
        r = 255;
    } else {
        tmpCalc = tmpKelvin - 60;
        tmpCalc = 329.698727446 * Math.pow(tmpCalc, -0.1332047592);
        r = clamp(tmpCalc, 0, 255);
    }

    // g
    if (tmpKelvin <= 66) {
        tmpCalc = tmpKelvin;
        tmpCalc = 99.4708025861 * Math.log(tmpCalc) - 161.1195681661;
        g = clamp(tmpCalc, 0, 255);
    } else {
        tmpCalc = tmpKelvin - 60;
        tmpCalc = 288.1221695283 * Math.pow(tmpCalc, -0.0755148492);
        g = clamp(tmpCalc, 0, 255);
    }

    // b
    if (tmpKelvin >= 66) {
        b = 255;
    } else if (tmpKelvin <= 19) {
        b = 0;
    } else {
        tmpCalc = tmpKelvin - 10;
        tmpCalc = 138.5177312231 * Math.log(tmpCalc) - 305.0447927307;
        b = clamp(tmpCalc, 0, 255);
    }

    return [r, g, b];
}
