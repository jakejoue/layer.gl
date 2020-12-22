import { loadTextureImage } from "../helper/texture";

export default class TextureManager {
    constructor(gl) {
        this.gl = gl;
        this.images = {};
    }

    add(name, texture) {
        if (this.images[name]) return;
        this.images[name] = texture;
    }

    remove(...names) {
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            delete this.images[name];
        }
    }

    get(name) {
        return this.images[name];
    }

    load(any, cb, param = {}) {
        loadTextureImage(this.gl, any, cb, param);
    }

    loadAndAdd(cb, ...anys) {
        const allNum = anys.length;
        let loadNum = 0;

        while (anys.length) {
            const any = anys.shift();

            if (!any || this.images[any]) {
                loadNum++;

                if (loadNum === allNum) {
                    cb && cb();
                }

                continue;
            }

            loadTextureImage(this.gl, any, (texture) => {
                this.images[any] = texture;
                loadNum++;

                if (loadNum === allNum) {
                    cb && cb();
                }
            });
        }
    }
}
