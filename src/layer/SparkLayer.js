import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

export default class SparkLayer extends Layer {
    constructor(options) {
        super(options);

        this.autoUpdate = true;
        this.bufferData = [];

        this.startTime = Number(this.options.startTime) || 0;
        this.endTime = Number(this.options.endTime) || 10;
        this.time = this.startTime;
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

        // 顶点相关数据
        this.buffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        const attributes = [
            {
                name: "aPos",
                buffer: this.buffer,
                size: 4,
                type: "FLOAT",
                offset: 0,
            },
        ];
        this.vertexArray = new VertexArray({
            gl: gl,
            program: this.program,
            attributes: attributes,
        });
    }

    onChanged(options, data) {
        const gl = this.gl;
        if (gl) {
            const arrayData = [],
                getH = options.height,
                segs = Number(options.segs) || 10;

            for (let i = 0; i < data.length; i++) {
                const coord = data[i].geometry.coordinates;
                const point = this.normizedPoint([
                    coord[0],
                    coord[1],
                    typeof getH === "function" ? getH(data[i]) : Number(getH),
                ]);

                for (let h = 0, j = 0; j < segs; j++) {
                    arrayData.push(point[0], point[1], h, j);

                    h += point[2] / segs;
                    arrayData.push(point[0], point[1], h, j + 1);
                }
            }

            this.bufferData = arrayData;
            this.buffer.updateData(new Float32Array(arrayData));
        }
    }

    destroy() {
        this.gl = this.program = this.buffer = this.vertexArray = this.bufferData = null;
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix;

        if (this.bufferData.length <= 0) return;

        this.program.use(gl);
        this.vertexArray.bind();

        const uniforms = {
            u_matrix: matrix,
            uFragColor: this.normizedColor(this.options.color),
            currentTime: this.time,
            trailLength: this.options.trailLength,
        };
        this.program.setUniforms(uniforms);

        gl.enable(gl.BLEND);
        gl.polygonOffset(2, 1);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.blendEquation(gl.FUNC_ADD);
        gl.drawArrays(gl.LINES, 0, this.bufferData.length / 4);

        this.time += Number(this.options.step);
        this.time > 1.5 * this.endTime && (this.time = this.startTime);
    }
}
