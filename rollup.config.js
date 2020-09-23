import babel from "@rollup/plugin-babel";
import commonResolve from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";

export default {
    input: "index.js",
    output: {
        name: "layergl",
        file: "build/layergl.js",
        format: "umd",
        sourcemap: true,
    },
    external: ["maptalks", "openlayers", "leaflet", "three"],
    globals: {
        openlayers: "ol",
        leaflet: "L",
        maptalks: "maptalks",
        Three: "Three",
    },
    plugins: [
        commonResolve(),
        nodeResolve(),
        babel({ babelHelpers: "bundled" }),
    ],
};
