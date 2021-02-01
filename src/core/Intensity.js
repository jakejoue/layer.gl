import { getCanvas2D } from "../helper/cavans";

class Intensity {
    constructor(options = {}) {
        this.gradient = options.gradient || {
            0.25: "rgba(0, 0, 255, 1)",
            0.55: "rgba(0, 255, 0, 1)",
            0.85: "rgba(255, 255, 0, 1)",
            1: "rgba(255, 0, 0, 1)",
        };
        this.maxSize = undefined === options.maxSize ? 35 : options.maxSize;
        this.minSize = options.minSize || 0;
        this.max = options.max || 100;
        this.min = options.min || 0;
        this.initPalette();
    }

    setMax(val) {
        this.max = val || 100;
    }

    setMin(val) {
        this.min = val || 0;
    }

    setMaxSize(val) {
        this.maxSize = val || 35;
    }

    setMinSize(val) {
        this.minSize = val || 0;
    }

    initPalette() {
        const { ctx } = getCanvas2D(256, 1);
        this.paletteCtx = ctx;

        const gradient = this.gradient,
            canvasGradient = ctx.createLinearGradient(0, 0, 256, 1);

        Object.keys(gradient).forEach(function (d) {
            canvasGradient.addColorStop(parseFloat(d), gradient[d]);
        });

        ctx.fillStyle = canvasGradient;
        ctx.fillRect(0, 0, 256, 1);
        ctx.imageData = ctx.getImageData(0, 0, 256, 1).data;
    }

    getColor(size) {
        const imageData = this.getImageData(size);
        return (
            "rgba(" +
            imageData[0] +
            ", " +
            imageData[1] +
            ", " +
            imageData[2] +
            ", " +
            imageData[3] / 256 +
            ")"
        );
    }

    getImageData(size) {
        const imageData = this.paletteCtx.imageData;
        if (undefined === size) return imageData;

        const max = this.max,
            min = this.min;
        size > max && (size = max);
        size < min && (size = min);
        size = 4 * Math.floor(((size - min) / (max - min)) * 255);
        return [
            imageData[size],
            imageData[size + 1],
            imageData[size + 2],
            imageData[size + 3],
        ];
    }

    getSize(size) {
        const max = this.max,
            min = this.min,
            maxSize = this.maxSize,
            minSize = this.minSize;
        size > max && (size = max);
        size < min && (size = min);
        return minSize + ((size - min) / (max - min)) * (maxSize - minSize);
    }
}

export default Intensity;
