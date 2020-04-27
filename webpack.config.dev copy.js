import path from "path";

export default {
  debug: true, // enables debug information
  devtool: "inline-source-map", // many devtools trade-off quality vs. time/speed
  noInfo: false, // webpack will list of files its bundling, usually off==false bc it has a lot of noise
  entry: [path.resolve(__dirname, "src/index")], // THIS IS THE APP ENTRY POINT
  target: "web", // we target the web or Node if Node needs to work with it instead of the web
  output: {
    path: path.resolve(__dirname, "src"),
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [], // e.g. hot reloading
  module: {
    // telling webpack what files to consider
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ["babel"] }, // handle JS files
      { test: /\.css$/, loaders: ["style", "css"] }, // handle CSS files
    ],
  },
};
