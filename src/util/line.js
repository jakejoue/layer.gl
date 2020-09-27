export function length(...coords) {
    let length = 0;
    const lengthArr = [];

    for (let i = 0; i < coords.length; i++) {
        const coord = coords[i];
        if (i > 0) {
            const preCoord = coords[i - 1];
            length += Math.sqrt(
                Math.pow(coord[0] - preCoord[0], 2) +
                    Math.pow(coord[1] - preCoord[1], 2)
            );
        }
        lengthArr.push(length);
    }
    return {
        arr: lengthArr,
        total: length,
    };
}

export function toOneArr(arr) {
    if (!arr[0] || !arr[0].length) return arr;

    const length = arr[0].length,
        line = [];
    for (let b = 0, i = 0; i < arr.length; i++) {
        for (let j = 0; j < length; j++) {
            line[b++] = arr[i][j];
        }
    }
    return line;
}

export function perp(f, c) {
    const a = [];
    f.forEach(function (b) {
        a.push(c ? -b : b, b);
    });
    return a;
}

function rc(f) {
    return function (value, index, array) {
        value = index + f;
        index = array.length - 1;
        return array[
            0 < index
                ? 0 > value
                    ? 0
                    : value > index
                    ? index
                    : value
                : value < index
                ? index
                : 0 < value
                ? 0
                : value
        ];
    };
}
