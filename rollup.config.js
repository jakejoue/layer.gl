import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
    entry: "index.js",
    sourceMap: true,
    format: "umd",
    moduleName: "layergl",
    external: ["maptalks", "openlayers", "leaflet"],
    globals: {
        openlayers: "ol",
        leaflet: "L",
        maptalks: "maptalks",
    },
    plugins: [
        babel({
            runtimeHelpers: true,
        }),
        resolve(),
        commonjs(),
    ],
    dest: "build/layergl.js",
};
