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
        } catch (d) {}
    return ctx;
}

export function createTexture(gl, texture, param) {
    param = Object.assign(
        {
            TEXTURE_MAG_FILTER: "LINEAR",
            TEXTURE_MIN_FILTER: "LINEAR",
            TEXTURE_WRAP_S: "REPEAT",
            TEXTURE_WRAP_T: "REPEAT",
        },
        param
    );
    const webglTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, webglTexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        texture
    );
    for (const key in param) {
        gl.texParameteri(gl.TEXTURE_2D, gl[key], gl[param[key]]);
    }
    gl.bindTexture(gl.TEXTURE_2D, null);
    return webglTexture;
}

export function loadTextureImage(gl, texture, callback, param) {
    if (typeof texture === "object") {
        texture = createTexture(gl, texture, param);
        callback(texture, null);
    } else {
        let img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = function () {
            const width = floorPowerOfTwo(img.width),
                height = floorPowerOfTwo(img.height),
                canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            canvas.getContext("2d").drawImage(img, 0, 0, width, height);
            img = canvas;

            const webglTexture = createTexture(gl, img, param);
            callback(webglTexture, img);
        };
        img.src = texture;
    }
}
