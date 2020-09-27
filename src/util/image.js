/**
 * 构造 image 相关参数
 * @param {Array} map map对象
 */
function Ee(map) {
    let c = 0,
        a = 0,
        b = true,
        d = false,
        e = void 0;

    for (const item of map) {
        const h = item.value;
        c += h.w * h.h;
        a = Math.max(a, h.w);
    }

    map.sort(function (a, b) {
        return b.h - a.h;
    });

    a = [
        {
            x: 0,
            y: 0,
            w: Math.max(Math.ceil(Math.sqrt(c / 0.95)), a),
            h: Infinity,
        },
    ];
    d = b = 0;
    e = true;
    g = false;
    k = void 0;

    for (const item of map) {
        for (let p = item.value, m = a.length - 1; 0 <= m; m--) {
            const q = a[m];
            if (!(p.w > q.w || p.h > q.h)) {
                p.x = q.x;
                p.y = q.y;
                d = Math.max(d, p.y + p.h);
                b = Math.max(b, p.x + p.w);
                if (p.w === q.w && p.h === q.h) {
                    const r = a.pop();
                    m < a.length && (a[m] = r);
                } else
                    p.h === q.h
                        ? ((q.x += p.w), (q.w -= p.w))
                        : (p.w !== q.w &&
                              a.push({
                                  x: q.x + p.w,
                                  y: q.y,
                                  w: q.w - p.w,
                                  h: p.h,
                              }),
                          (q.y += p.h),
                          (q.h -= p.h));
                break;
            }
        }
    }
    return {
        w: b,
        h: d,
        fill: c / (b * d) || 0,
    };
}
