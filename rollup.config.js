import babel from "rollup-plugin-babel";

export default {
  entry: "index.js",
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
  ],
  dest: "build/layergl.js",
};
