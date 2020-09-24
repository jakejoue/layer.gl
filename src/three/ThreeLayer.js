import Layer from "../layer/Layer";
import * as THREE from "three";

export default class ThreeLayer extends Layer {
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

    updatePoint(threeObj, lnglat) {
        for (
            let children = this.world.children, i = 0;
            i < children.length;
            i++
        )
            if (children[i].isGeoGroup && children[i].object === threeObj) {
                const k = children[i];
                k.position.x = lnglat.lng;
                k.position.y = lnglat.lat;
                k.position.z = threeObj.position.z;
            }
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
                this.camera.projectionMatrix.elements = matrix;
                this.camera.projectionMatrix = m.multiply(m);

                this.renderer.state.reset();
                this.postProcessing
                    ? this.postProcessing.render()
                    : this.renderer.render(this.scene, this.camera);
            }
        } else this.update();
    }
}
