import Layer from "./Layer";

import Buffer from "../core/Buffer";
import VertexArray from "../core/VertexArray";
import Program from "../core/Program";

import { length, toOneArr, perp } from "../util/line";

const LineStyle = {
    normal: null,
    road: (function () {
        const c = document.createElement("canvas");
        c.width = c.height = 32;
        const a = c.getContext("2d");
        a.save();
        a.moveTo(0, 0);
        a.lineTo(20, 0);
        a.lineTo(32, 16);
        a.lineTo(20, 32);
        a.lineTo(0, 32);
        a.lineTo(10, 16);
        a.fillStyle = "#fff";
        a.fill();
        a.restore();
        return c;
    })(),
};

export default class LineLayer extends Layer {
    constructor(options) {
        super(options);
        this.initData();
    }

    getDefaultOptions() {
        return {
            color: "rgba(25, 25, 250, 1)",
            blend: "normal",
            width: 4,
            isFlat: true,
            antialias: false,
            lineJoin: "miter",
            lineCap: "butt",
            style: "normal",
            dashArray: [0, 0],
            dashOffset: 0,
        };
    }

    initData() {
        this.dataMgr = {
            position: [],
            prev: [],
            next: [],
            direction: [],
            color: [],
            index: [],
            counter: [],
            uv: [],
        };
    }

    initialize(gl) {
        this.gl = gl;

        const options = this.getOptions(),
            defines = [];

        options.enablePicked && defines.push("PICK");
        if (LineStyle[options.style]) {
            this.isUseTexture = true;
            defines.push("USE_TEXTURE");
        }

        this.program = new Program(
            this.gl,
            {
                vertexShader: `precision highp float;
                uniform vec4 uSelectedColor;
                uniform mat4 uMatrix;
                uniform bool uFlat;
                uniform vec2 uDashArray;
                uniform float thickness;
                uniform float zoomUnits;
                uniform float devicePixelRatio;
                uniform int miter;

                attribute vec3 position;
                attribute vec3 next;
                attribute vec3 previous;
                attribute float direction;
                attribute vec4 aColor;
                attribute float aDistance;
                attribute float aTotalDistance;

                #if defined(USE_TEXTURE)
                attribute vec2 uv;
                #endif

                varying vec4 vColor;
                varying vec2 vNormal;
                varying vec2 vUV;
                varying vec2 vDashArray;
                varying float vTotalDistance;
                varying float vCounter;

                vec2 project(vec4 coord) {
                    vec3 screen = coord.xyz / coord.w;
                    vec2 clip = (screen.xy + 1.0)/2.0;
                    return clip * MAPV_resolution;
                }
                vec4 unproject(vec2 projected, float z, float w) {
                    vec2 clip = projected / MAPV_resolution;
                    vec2 screen = clip * 2.0 - 1.0;
                    return vec4(screen * w, z, w);
                }
                vec3 getNormalAndWidth(vec2 currentScreen, vec2 previousScreen, vec2 nextScreen, float thickness) {
                    vec2 dir = vec2(0.0);
                    if(currentScreen == previousScreen) {
                        dir = normalize(nextScreen - currentScreen);
                    } else if(currentScreen == nextScreen) {
                        dir = normalize(currentScreen - previousScreen);
                    } else {
                        vec2 dirA = normalize((currentScreen - previousScreen));
                        if(miter == 1) {
                            vec2 dirB = normalize((nextScreen - currentScreen));
                            vec2 tangent = normalize(dirA + dirB);
                            vec2 perp = vec2(-dirA.y, dirA.x);
                            vec2 miter = vec2(-tangent.y, tangent.x);
                            dir = tangent;
                            float angle = 40.0;
                            if(dot(dirA,dirB) > cos(radians(angle))) {
                                thickness = thickness/dot(miter,perp);
                            }
                        } else {
                            dir=dirA;
                        }
                    }
                    vec2 normal = vec2(-dir.y, dir.x);
                    return vec3(normal, thickness);
                }
                
                void main() {
                    vColor = aColor;
                    vCounter = aDistance / aTotalDistance;
                    vDashArray = zoomUnits * uDashArray / aTotalDistance;
                    vTotalDistance = aTotalDistance;
                    
                    #if defined(USE_TEXTURE)
                    vUV=uv;
                    #endif
                    
                    #if defined(PICK)
                    if(mapvIsPicked()) {
                        vColor = uSelectedColor;
                    }
                    #endif
                    
                    if(uFlat) {
                        float width = thickness * zoomUnits;
                        vec3 nw = getNormalAndWidth(position.xy, previous.xy, next.xy, width);
                        width = nw.z;
                        vec2 normal = nw.xy;
                        vNormal = normal * direction;
                        normal *= width/2.0;

                        gl_Position = uMatrix * vec4(position.xy + normal * direction, position.z, 1.0);
                    } else {
                        vec4 previousProjected = uMatrix * vec4(previous, 1.0);
                        vec4 currentProjected = uMatrix * vec4(position, 1.0);
                        vec4 nextProjected = uMatrix * vec4(next, 1.0);
                        vec2 currentScreen = project(currentProjected);
                        vec2 previousScreen = project(previousProjected);
                        vec2 nextScreen = project(nextProjected);
                        float width = thickness * devicePixelRatio;
                        vec3 nw = getNormalAndWidth(currentScreen, previousScreen, nextScreen, width);
                        width = nw.z;
                        vec2 normal = nw.xy;
                        vNormal = normal * direction;
                        normal *= width / 2.0;
                        vec2 pos = currentScreen + normal * direction;
                        vec4 finalPos = unproject(pos, currentProjected.z, currentProjected.w);
                        gl_Position = finalPos;
                    }
                }`,
                fragmentShader: `precision highp float;
                varying vec4 vColor;
                varying vec2 vNormal;
                varying vec2 vUV;
                varying vec2 vDashArray;
                varying float vCounter;
                varying float vTotalDistance;
                uniform bool uAntialias;
                uniform float uDashOffset;
                uniform float zoomUnits;
                uniform float thickness;
                
                #if defined(USE_TEXTURE)
                uniform float uTextureMargin;
                uniform sampler2D textureImage;
                #endif
                
                void main() {
                    vec4 color = vColor;
                    if(uAntialias) {
                        float blur = 1.0;
                        blur = 1.0 - smoothstep(0.8, 1.0, length(vNormal));
                        color.a *= blur;
                    }
                    
                    #if defined(USE_TEXTURE)
                    float segLen = uTextureMargin * zoomUnits;
                    float textureLen = thickness * zoomUnits;
                    float deltaX = mod(vUV.x, segLen);
                    float middle = segLen / 2.0;
                    if(deltaX >= middle && deltaX <= middle + textureLen) {
                        float uvx = (deltaX - middle) / textureLen;
                        vec4 texture = texture2D(textureImage, vec2(uvx, vUV.y));
                        color = texture.a >= 0.5 ? texture : color;
                    }
                    #endif
                    
                    if(vDashArray.y > 0.0) {
                        float offset = uDashOffset * zoomUnits / vTotalDistance;
                        color.a *= (1.0 - step(vDashArray.x, mod(vCounter + offset, vDashArray.x + vDashArray.y)));
                    }
                    gl_FragColor = color;
                }`,
                defines: defines,
            },
            this
        );

        this.prevBuffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.currentBuffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.nextBuffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.directionBuffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.colorBuffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.counterBuffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.uvBuffer = new Buffer({
            gl: gl,
            target: "ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });
        this.indexBuffer = new Buffer({
            gl: gl,
            target: "ELEMENT_ARRAY_BUFFER",
            usage: "STATIC_DRAW",
        });

        const attributes = [
            {
                stride: 12,
                name: "previous",
                buffer: this.prevBuffer,
                size: 3,
                type: "FLOAT",
                offset: 0,
            },
            {
                stride: 12,
                name: "position",
                buffer: this.currentBuffer,
                size: 3,
                type: "FLOAT",
                offset: 0,
            },
            {
                stride: 12,
                name: "next",
                buffer: this.nextBuffer,
                size: 3,
                type: "FLOAT",
                offset: 0,
            },
            {
                stride: 4,
                name: "direction",
                buffer: this.directionBuffer,
                size: 1,
                type: "FLOAT",
                offset: 0,
            },
            {
                stride: 16,
                name: "aColor",
                buffer: this.colorBuffer,
                size: 4,
                type: "FLOAT",
                offset: 0,
            },
            {
                stride: 8,
                name: "aDistance",
                buffer: this.counterBuffer,
                size: 1,
                type: "FLOAT",
                offset: 0,
            },
            {
                stride: 8,
                name: "aTotalDistance",
                buffer: this.counterBuffer,
                size: 1,
                type: "FLOAT",
                offset: 4,
            },
        ];
        attributes = attributes.concat(this.getCommonAttributes());

        if (LineStyle[options.style]) {
            attributes.push({
                stride: 8,
                name: "uv",
                buffer: this.uvBuffer,
                size: 2,
                type: "FLOAT",
                offset: 0,
            });
            this.setOptions({
                texture: LineStyle[options.style],
            });
            this.loadTexture();
        }

        this.vertexArray = new VertexArray({
            gl: gl,
            program: this.program,
            attributes: attributes,
        });
    }

    onChanged(options, data) {
        if (this.gl) {
            this.initData();
            const colorDataArray = [];

            for (let i = 0; i < data.length; i++) {
                // 坐标转换
                let line = [];
                const coords = data[i].geometry.coordinates;
                if (coords && coords.length > 0) {
                    line =
                        "Polygon" === data[i].geometry.type
                            ? coords[0].map(this.normizedPoint)
                            : coords.map(this.normizedPoint);
                }

                const color = this.normizedColor(
                    this.getValue("color", data[i])
                );
                const lines = this.addMultipleCoords(line);

                for (let m = 0; m < lines.length; m++) {
                    this.processData(this.dataMgr, lines[m], color);
                }

                if (options.enablePicked) {
                    for (let p = 0; p < line.length; p++) {
                        const color = this.indexToRgb(i);
                        colorDataArray.push(
                            color[0] / 255,
                            color[1] / 255,
                            color[2] / 255
                        );
                        colorDataArray.push(
                            color[0] / 255,
                            color[1] / 255,
                            color[2] / 255
                        );
                        if (options.repeat) {
                            colorDataArray.push(
                                color[0] / 255,
                                color[1] / 255,
                                color[2] / 255
                            );
                            colorDataArray.push(
                                color[0] / 255,
                                color[1] / 255,
                                color[2] / 255
                            );
                            colorDataArray.push(
                                color[0] / 255,
                                color[1] / 255,
                                color[2] / 255
                            );
                            colorDataArray.push(
                                color[0] / 255,
                                color[1] / 255,
                                color[2] / 255
                            );
                        }
                    }
                }
            }

            this.counterBuffer.updateData(
                new Float32Array(this.dataMgr.counter)
            );
            this.currentBuffer.updateData(
                new Float32Array(this.dataMgr.position)
            );
            this.prevBuffer.updateData(new Float32Array(this.dataMgr.prev));
            this.nextBuffer.updateData(new Float32Array(this.dataMgr.next));
            this.directionBuffer.updateData(
                new Float32Array(this.dataMgr.direction)
            );
            this.colorBuffer.updateData(new Float32Array(this.dataMgr.color));
            this.indexBuffer.updateData(new Uint32Array(this.dataMgr.index));

            this.isUseTexture &&
                this.uvBuffer.updateData(new Float32Array(this.dataMgr.uv));

            options.enablePicked &&
                this.pickBuffer.updateData(new Float32Array(colorDataArray));
        }
    }

    processData(dataMgr, line, color) {
        let r = line.length,
            u = dataMgr.position.length / 6,
            y = length(line),
            t = y.arr,
            z = y.total;
        y = perp(
            t.map(function (a) {
                return [a, z];
            })
        );
        t = t.map(function (a) {
            return [a, 0, a, 1];
        });
        const v = perp(
                line.map(function (a) {
                    return -1;
                }),
                true
            ),
            B = perp(line),
            A = perp(line.map(rc(-1))),
            D = perp(line.map(rc(1)));
        line = perp(
            line.map(function (a) {
                return color;
            })
        );
        r = Be(r, u);

        dataMgr.uv.push(W(toOneArr(t)));
        dataMgr.counter.push(W(toOneArr(y)));
        dataMgr.position.push(W(toOneArr(B)));
        dataMgr.prev.push(W(toOneArr(A)));
        dataMgr.next.push(W(toOneArr(D)));
        dataMgr.direction.push(W(v));
        dataMgr.color.push(W(toOneArr(line)));
        dataMgr.index.push(W(r));
    }

    render(transferOptions) {
        const gl = transferOptions.gl,
            matrix = transferOptions.matrix,
            dataMgr = this.dataMgr;

        if (dataMgr && !(0 >= dataMgr.index.length) && this.map) {
            const options = this.getOptions(),
                program = this.program;

            program.use(gl);

            let uniforms = Object.assign(
                this.getCommonUniforms(transferOptions),
                {
                    uMatrix: matrix,
                    uFlat: options.isFlat,
                    zoomUnits: this.map.getZoomUnits(),
                    devicePixelRatio: window.devicePixelRatio,
                    miter: 1,
                    thickness: options.width,
                    uDashArray: options.dashArray,
                    uDashOffset: options.dashOffset,
                    uAntialias: options.antialias,
                }
            );
            if (this.isUseTexture) {
                uniforms = Object.assign(uniforms, {
                    uTextureMargin: 140,
                    textureImage: this.texture,
                });
            }

            program.setUniforms(uniforms);

            gl.enable(gl.BLEND);
            gl.blendEquation(gl.FUNC_ADD);

            options.blend && "lighter" === options.blend
                ? gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
                : gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

            this.indexBuffer.bind();
            this.vertexArray.bind();

            gl.drawElements(
                gl.TRIANGLES,
                dataMgr.index.length,
                gl.UNSIGNED_INT,
                0
            );
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            gl.disable(gl.BLEND);
        }
    }

    loadTexture(a) {
        const b = this,
            c = this.getOptions();
        c.texture
            ? loadTextureImage(this.gl, c.texture, function (c, d) {
                  b.image = d;
                  b.texture = c;
                  a && a();
                  b.webglLayer.render();
              })
            : ((this.image = this.texture = null), a && a());
    }
}
