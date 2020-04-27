import path from "path";
import webpack from "webpack";

export default {
  debug: true, // enables debug information
  devtool: "source-map", // source-map, longer build but better for debuggin in browser
  noInfo: false, // webpack will list of files its bundling, usually off==false bc it has a lot of noise
  entry: [path.resolve(__dirname, "src/index")], // THIS IS THE APP ENTRY POINT
  target: "web", // we target the web or Node if Node needs to work with it instead of the web
  output: {
    path: path.resolve(__dirname, "dist"), // dist = distribution folder
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [
    // Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),
    // Minify JS
    new webpack.optimize.UglifyJsPlugin(),
  ],
  module: {
    // telling webpack what files to consider
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ["babel"] }, // handle JS files
      { test: /\.css$/, loaders: ["style", "css"] }, // handle CSS files
    ],
  },
};