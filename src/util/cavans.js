function getCanvas2D() {
    const f = document.createElement("canvas");
    f.width = f.height = 32;
    const c = f.getContext("2d");
    return {
        canvas: f,
        ctx: c,
    };
}

export function road(options = {}) {
    const color = options.color,
        c = getCanvas2D(),
        canvas = c.canvas,
        ctx = c.ctx;
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

    const c = getCanvas2D(),
        canvas = c.canvas;
    const ctx = c.ctx;
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
