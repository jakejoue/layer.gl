/* eslint-disable no-var */
import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

export default class FanLayer extends Layer {
    constructor(options) {
        super(options);
        this.bufferData = [];
    }

    getDefaultOptions() {
        return {
            color: [1, 0.02, 0.02, 1],
            size: 50,
            step: 0.1,
        };
    }

    initialize(gl) {
        this.gl = gl;
        // 构造program
        this.program = new Program(
            this.gl,
            {
                vertexShader: `
            attribute vec3 aPos;
            attribute vec4 aColor;
            attribute float aSize;
            uniform mat4 uMatrix;
            varying vec4 vColor;

            varying vec4 vFragColor;
            varying vec4 vPosition;
            uniform float radius;
            uniform float totalRadian;
            uniform float periodRatio;
            uniform vec3 glowColor;
            void main() {
                float radian = radians(360.0 * periodRatio);
                float s = sin(radian);
                float c = cos(radian);
                vec2 rotatedPostion = vec2(position.x*s + position.y*c, position.y*s - position.x*c);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(rotatedPostion, 0, 1.0);
                vFragColor = vec4(glowColor, pow(position.z, 1.3));
            }
            
            void main() {
            }`,
                fragmentShader: `
                varying vec4 vColor;

                void main() {
                    gl_FragColor = vColor;
                }
                `,
            },
            this
        );
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
                size: 3,
                type: "FLOAT",
                offset: 0,
            },
            {
                name: "aColor",
                buffer: this.buffer,
                size: 4,
                type: "FLOAT",
                offset: 12,
            },
            {
                name: "aSize",
                buffer: this.buffer,
                size: 1,
                type: "FLOAT",
                offset: 28,
            },
        ];
        this.vertexArray = new VertexArray({
            gl: gl,
            program: this.program,
            attributes: attributes,
        });
    }

    onChanged(options, dataArray) {
        if (this.gl) {
            const arrayData = [];

            for (let i = 0; i < dataArray.length; i++) {
                const data = dataArray[i];
                const point = this.normizedPoint(data.geometry.coordinates);

                let color = this.getValue("color", data);
                color = this.normizedColor(color);
                const size = +this.getValue("size", data);

                const points = this.addMultipleCoords(point);
                for (let j = 0; j < points.length; j++) {
                    const p = points[j];
                    arrayData.push(p[0], p[1], +(p[2] || 0));
                    arrayData.push(color[0], color[1], color[2], color[3]);
                    arrayData.push(size * window.devicePixelRatio);
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

        const uniforms = { uMatrix: matrix };
        this.program.setUniforms(uniforms);

        gl.drawArrays(gl.POINTS, 0, this.bufferData.length / 8);
    }
}

var dt = function(a) {
    function b(a) {
        ta(this, b);
        a = oc(this, (b.__proto__ || nc(b)).call(this, a));
        a.time = 0;
        a.autoUpdate = !0;
        return a
    }
    pc(b, a);
    kb(b, [{
        key: "getDefaultOptions",
        value: function() {
            return {
                totalRadian: Math.PI,
                color: 16711680,
                radius: 50,
                step: .1
            }
        }
    }, {
        key: "initialize",
        value: function(a) {
            this.threeLayer = a;
            this.addOverlay()
        }
    }, {
        key: "onChanged",
        value: function(a, b) {
            this.threeLayer && (this.removeOverlay(),
            this.addOverlay())
        }
    }, {
        key: "onDestroy",
        value: function() {
            this.removeOverlay()
        }
    }, {
        key: "render",
        value: function() {
            this.time += this.options.step / 10;
            1 < this.time && (this.time = 0);
            for (var a = this.shapeMarker.children, b = 0; b < a.length; b++)
                a[b].material.uniforms.periodRatio.value = this.time
        }
    }, {
        key: "removeOverlay",
        value: function() {
            this.threeLayer.remove(this.shapeMarker)
        }
    }, {
        key: "addOverlay",
        value: function() {
            this.shapeMarker = new la.Group;
            for (var a = this.threeLayer, b = this.getData(), e = 0; e < b.length; e++) {
                var g = a.normizedPoint(b[e].geometry.coordinates);
                g = this.create3dCanvasRipple({
                    originalData: b[e],
                    normizedData: g
                });
                this.shapeMarker.add(g)
            }
            a.add(this.shapeMarker)
        }
    }, {
        key: "create3dCanvasRipple",
        value: function(a) {
            var b = this.options
              , c = b.totalRadian
              , g = b.color;
            b = b.size;
            var k = a.originalData;
            a = a.normizedData;
            "[object Function]" === Object.prototype.toString.call(g) && (g = g(k));
            b = "[object Function]" === Object.prototype.toString.call(b) ? b(k) : Number(b);
            k = {
                totalRadian: {
                    type: "f",
                    value: c
                },
                glowColor: {
                    type: "c",
                    value: new la.Color(g)
                },
                radius: {
                    type: "f",
                    value: b
                },
                periodRatio: {
                    type: "f",
                    value: 0
                }
            };
            g = new la.Geometry;
            for (var l = c / (b / 2), m = l; m <= c; m += l) {
                var n = b * Math.sin(m)
                  , p = b * Math.cos(m);
                g.vertices.push(new la.Vector3(0,0,m / c));
                g.vertices.push(new la.Vector3(p,n,m / c))
            }
            c = 0;
            for (b = g.vertices.length; c < b - 2; ++c)
                g.faces.push(new la.Face3(c,c + 1,c + 3));
            c = new la.ShaderMaterial({
                uniforms: k,
                vertexShader: "varying vec4 vFragColor;varying vec4 vPosition;uniform float radius;uniform float totalRadian;uniform float periodRatio;uniform vec3 glowColor;void main(){float radian=radians(360.0*periodRatio);float s=sin(radian);float c=cos(radian);vec2 rotatedPostion=vec2(position.x*s+position.y*c,position.y*s-position.x*c);gl_Position=projectionMatrix*modelViewMatrix*vec4(rotatedPostion,0,1.0);vFragColor=vec4(glowColor,pow(position.z,1.3));}",
                fragmentShader: "varying vec4 vFragColor;void main(){gl_FragColor=vFragColor;}",
                blending: la.NormalBlending,
                transparent: !0,
                depthWrite: !1
            });
            c = new la.Mesh(g,c);
            c.position.set(a[0], a[1], a[2] || 0);
            return c
        }
    }]);
    return b
}(Nl)