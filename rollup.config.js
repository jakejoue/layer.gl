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
        globals: {
            mapboxgl: "mapboxgl",
            openlayers: "ol",
            leaflet: "L",
            maptalks: "maptalks",
            three: "THREE",
        },
    },
    external: ["mapboxgl", "maptalks", "openlayers", "leaflet", "three"],
    plugins: [
        commonResolve(),
        nodeResolve(),
        babel({ babelHelpers: "bundled" }),
    ],
};
