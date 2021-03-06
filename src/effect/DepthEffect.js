import Effect from "./Effect";
import Program from "../core/Program";
import { VertexBuffer } from "../core/Buffer";
import VertexArrayObject from "../core/VertexArrayObject";

import ShaderEffect from "../shaders/shaderEffect";

/**
 * @classdesc
 * 景深后处理特效
 */
class DepthEffect extends Effect {
    init(gl) {
        if (!this.program) {
            this.program = new Program(gl, {
                vertexShader: ShaderEffect.common_vert,
                fragmentShader: ShaderEffect.depth_frag,
            });

            this.vertexBuffers = [
                new VertexBuffer({
                    gl: gl,
                    data: new Float32Array(this.vertex),
                    attributes: [
                        {
                            name: "aPos",
                            size: 3,
                        },
                    ],
                }),
                new VertexBuffer({
                    gl: gl,
                    data: new Float32Array(this.sampleCoord),
                    attributes: [
                        {
                            name: "aTextureCoord",
                            size: 2,
                        },
                    ],
                }),
            ];

            this.vao = new VertexArrayObject();
        }
    }

    render(renderOptions) {
        const gl = renderOptions.gl,
            texture = renderOptions.texture;

        gl.clearCanvas();

        this.init(gl);
        this.program.use(gl);

        this.vao.bind({
            gl,
            program: this.program,
            vertexBuffers: this.vertexBuffers,
        });
        this.program.setUniforms({
            uSampler: texture,
            canvasSize: [gl.canvas.width, gl.canvas.height],
        });

        gl.drawArrays(gl.TRIANGLES, 0, this.vertex.length / 3);
    }
}

export default DepthEffect;
