import CommonLayer from "../layer/CommonLayer";
import * as THREE from "three";

class ThreeLayer extends CommonLayer {
    constructor(options) {
        super(options);
        this.layerType = "ThreeLayer";
    }

    initialize(gl) {
        const map = this.webglLayer.map;
        if (map.mapType === "three") {
            this.camera = map.map.camera;
            this.scene = map.map.scene;
        } else {
            this.camera = new THREE.Camera();
            this.scene = new THREE.Scene();

            // const axes = new THREE.AxisHelper(20);
            // this.scene.add(axes);
        }

        this.world = new THREE.Group();
        this.scene.add(this.world);

        if (map.mapType !== "three") {
            this.camera.matrixAutoUpdate = false;
            this.world.matrixAutoUpdate = false;
            this.renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
                canvas: gl.canvas,
                context: gl,
            });
            this.renderer.autoClear = false;
        }
    }

    add(threeObj) {
        this.world.add(threeObj);
        this.update();
    }

    update() {
        this.webglLayer.render();
    }

    getCamera() {
        return this.camera;
    }

    getScene() {
        return this.scene;
    }

    getRenderer() {
        return this.renderer;
    }

    getWorld() {
        return this.world;
    }

    remove(threeObj) {
        this.world.remove(threeObj);
        this.update();
    }

    render(transferOptions) {
        if (transferOptions) {
            if (this.webglLayer.map.mapType !== "three") {
                const matrix = transferOptions.matrix;

                const m = new THREE.Matrix4().fromArray(matrix);
                const l = new THREE.Matrix4().scale(
                    new THREE.Vector3(1.0, -1.0, 1.0)
                );

                this.camera.projectionMatrix = m.multiply(l);
                this.world.matrix = l;

                this.renderer.state.reset();
                this.postProcessing
                    ? this.postProcessing.render()
                    : this.renderer.render(this.scene, this.camera);
            }
        } else this.update();
    }
}

export default ThreeLayer;
