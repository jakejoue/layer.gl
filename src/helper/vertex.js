export function length(coords) {
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

export function perp(array, reverse) {
    const retArr = [];
    array.forEach(function (b) {
        retArr.push(reverse ? -b : b, b);
    });
    return retArr;
}

export function shiftArray(shiftIndex) {
    return function (value, index, array) {
        value = index + shiftIndex;
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

export function buildIndexArr(coordLength, offset = 0) {
    const indexArr = [];

    for (let b = 0; b < coordLength - 1; b++) {
        const d = 2 * (b + offset);
        indexArr.push(d, d + 1, d + 2);
        indexArr.push(d + 2, d + 1, d + 3);
    }
    return indexArr;
}
