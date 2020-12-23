export default class Effect {
    constructor(options) {
        this.options = {};
        Object.assign(this.options, options);
        this.vertex = [ - 1, 1, 0, -1, -1, 0, 1, 1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0];
        this.sampleCoord = [0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0]
    }

    getOptions() {
        return this.options
    }

    onResize(gl) {}

    render(options) {
        const gl = options.gl,
            texture = options.texture;

        const programSample = this.programSample;
        gl.useProgram(programSample.program);

        // 图片坐标（整个屏幕gl坐标）
        const posBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        const bufferData = [- 1, -1, 0, -1, 1, 0, 1, 1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferData), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(programSample.attributes.aPos);
        gl.vertexAttribPointer(programSample.attributes.aPos, 3, gl.FLOAT, false, 0, 0);

        // 纹理贴图坐标（固定值）
        const textCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(programSample.attributes.aTextureCoord);
        gl.vertexAttribPointer(programSample.attributes.aTextureCoord, 2, gl.FLOAT, false, 0, 0);

        // 绑定纹理贴图
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(programSample.uniforms.uSampler, 0);

        // 绘制
        gl.drawArrays(gl.TRIANGLES, 0, bufferData.length / 3);
    }
}
