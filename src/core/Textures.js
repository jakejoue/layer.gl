export default class Textures {
    constructor(gl) {
        this.textureUnits = 0;
        this.maxTextures = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
    }

    allocateTextureUnit() {
        const textureUnits = this.textureUnits;

        if (textureUnits >= this.maxTextures) {
            console.warn(
                "THREE.WebGLTextures: Trying to use " +
                    textureUnits +
                    " texture units while this GPU supports only " +
                    this.maxTextures
            );
        }

        this.textureUnits += 1;

        return textureUnits;
    }

    resetTextureUnits() {
        this.textureUnits = 0;
    }

    setTexture2D(gl, texture, slot) {
        gl.activeTexture(gl["TEXTURE" + slot]);
        gl.bindTexture(gl.TEXTURE_2D, texture);
    }
}
