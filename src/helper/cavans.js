export function getCanvas2D(width = 32, height = 32) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    return { canvas, ctx };
}

export function road(options = {}) {
    const color = options.color,
        canvas2d = getCanvas2D(),
        canvas = canvas2d.canvas,
        ctx = canvas2d.ctx;
    ctx.save();
    ctx.moveTo(0, 0);
    ctx.lineTo(20, 0);
    ctx.lineTo(32, 16);
    ctx.lineTo(20, 32);
    ctx.lineTo(0, 32);
    ctx.lineTo(10, 16);
    ctx.fillStyle = color || "#fff";
    ctx.fill();
    ctx.restore();
    return canvas;
}

export function arrow(options = {}) {
    const width = options.width,
        color = options.color;

    const canvas2d = getCanvas2D(),
        canvas = canvas2d.canvas,
        ctx = canvas2d.ctx;
    ctx.save();
    ctx.moveTo(5, 0);
    ctx.lineTo(32, 16);
    ctx.lineTo(5, 32);
    ctx.strokeStyle = color || "#fff";
    ctx.lineWidth = width || 8;
    ctx.stroke();
    ctx.restore();
    return canvas;
}

export function circle(diameter) {
    const radius = diameter / 2,
        a = diameter + radius,
        canvas2d = getCanvas2D(2 * a, 2 * a),
        ctx = canvas2d.ctx;

    ctx.shadowBlur = radius;
    ctx.shadowColor = "black";
    ctx.shadowOffsetX = ctx.shadowOffsetY = 1e4;
    ctx.beginPath();
    ctx.arc(a - 1e4, a - 1e4, diameter, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();

    return canvas2d.canvas;
}
