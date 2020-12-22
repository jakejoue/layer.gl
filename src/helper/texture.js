import { floorPowerOfTwo } from "./math";

export function getContext(gl) {
    const c = ["webgl2", "experimental-webgl2", "webgl", "experimental-webgl"];
    let ctx;
    for (let b = 0; b < c.length; b++)
        try {
            ctx = gl.getContext(c[b], {
                premultipliedAlpha: false,
            });
            if (ctx) break;
            // eslint-disable-next-line no-empty
        } catch (d) {}
    return ctx;
}

export function createTexture(gl, image, param) {
    param = {
        TEXTURE_MAG_FILTER: "LINEAR",
        TEXTURE_MIN_FILTER: "LINEAR",
        TEXTURE_WRAP_S: "REPEAT",
        TEXTURE_WRAP_T: "REPEAT",

        ...param,
    };

    const glTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, glTexture);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    for (const key in param) {
        gl.texParameteri(gl.TEXTURE_2D, gl[key], gl[param[key]]);
    }

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.bindTexture(gl.TEXTURE_2D, null);

    glTexture.width = image.width;
    glTexture.height = image.height;
    return glTexture;
}

export function loadTextureImage(gl, texture, callback, param) {
    if (typeof texture === "object") {
        texture = createTexture(gl, texture, param);
        callback(texture, null);
    } else {
        let image = new Image();
        image.crossOrigin = "anonymous";
        image.onload = function () {
            const width = floorPowerOfTwo(image.width),
                height = floorPowerOfTwo(image.height),
                canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            canvas.getContext("2d").drawImage(image, 0, 0, width, height);
            image = canvas;

            const glTexture = createTexture(gl, image, param);
            callback(glTexture, image);
        };
        image.src = texture;
    }
}
