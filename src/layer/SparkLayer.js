import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

export default class SparkLayer extends Layer {
    constructor(options) {
        super(options);

        this.bufferData = [];
        this.startTime = Number(this.options.startTime) || 0;
        this.endTime = Number(this.options.endTime);
        this.time = this.startTime;
        this.segs = Number(this.options.segs) || 10;
        this.autoUpdate = true;
    }

    getDefaultOptions() {
        return {
            color: [0.9, 0.1, 0.1, 1],
            trailLength: 3,
            height: 100,
            step: 0.1,
            segs: 10,
        };
    }

    setTime(time) {
        this.time = time;
    }

    initialize(gl) {
        this.gl = gl;
        this.program = new Program(this.gl, {
            vertexShader: `precision mediump float;
                attribute vec4 aPos;
                uniform mat4 u_matrix;
                uniform float currentTime;
                uniform float trailLength;
                varying float vTime;
                void main() {
                    gl_Position = u_matrix * vec4(aPos.xyz, 1.0);
                    vTime = 1.0 - ((currentTime - aPos.w) / trailLength);
                }`,
            fragmentShader: `precision mediump float;
                uniform vec3 uFragColor;
                varying float vTime;
                void main() {
                    if(vTime > 1.0 || vTime < 0.0) {
                        discard;
                    }
                    gl_FragColor = vec4(uFragColor, 1.0 * vTime);
                }`,
        });
        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    }

    onChanged(options, data) {
        const gl = this.gl;
        if (gl) {
            this.buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

            const arrayData = [],
                geth = options.height;
            for (let i = 0; i < data.length; i++) {
                const coord = data[i].geometry.coordinates;
                const point = this.normizedPoint([
                    coord[0],
                    coord[1],
                    typeof geth === "function" ? geth(data[i]) : Number(geth),
                ]);

                for (let p = 0, m = 0; m < this.segs; m++) {
                    arrayData.push(point[0], point[1], p);
                    void 0 === coord[2]
                        ? arrayData.push(m)
                        : arrayData.push(Number(coord[2]));

                    p += point[2] / this.segs;
                    arrayData.push(point[0], point[1], p);
                    void 0 === coord[2]
                        ? arrayData.push(m + 1)
                        : arrayData.push(Number(coord[2]));
                }
            }
            void 0 === options.endTime && (this.endTime = this.segs);
            this.bufferData = arrayData;
            gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array(arrayData),
                gl.STATIC_DRAW
            );
            this.webglLayer && this.webglLayer.render();
        }
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix,
            program = this.program;

        gl.useProgram(program.program);
        gl.uniformMatrix4fv(program.uniforms.u_matrix, false, matrix);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.enableVertexAttribArray(program.attributes.aPos);
        gl.vertexAttribPointer(
            program.attributes.aPos,
            4,
            gl.FLOAT,
            false,
            0,
            0
        );
        const color = this.normizedColor(this.options.color);
        gl.uniform3f(program.uniforms.uFragColor, color[0], color[1], color[2]);
        gl.uniform1f(program.uniforms.currentTime, this.time);
        gl.uniform1f(program.uniforms.trailLength, this.options.trailLength);
        gl.enable(gl.BLEND);
        gl.polygonOffset(2, 1);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.blendEquation(gl.FUNC_ADD);
        gl.drawArrays(gl.LINES, 0, this.bufferData.length / 4);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.disable(gl.BLEND);
        this.time += Number(this.options.step);
        this.time > 1.5 * this.endTime && (this.time = this.startTime);
        gl.useProgram(null);
    }
}
