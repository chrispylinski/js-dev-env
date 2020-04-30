import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WebpackMd5Hash from "webpack-md5-hash"; // used for Cache Busting
import ExtractTextPlugin from "extract-text-webpack-plugin";

export default {
  debug: true, // enables debug information
  devtool: "source-map", // source-map, longer build but better for debuggin in browser
  noInfo: false, // webpack will list of files its bundling, usually off==false bc it has a lot of noise
  entry: {
    vendor: path.resolve(__dirname, "src/vendor"),
    main: path.resolve(__dirname, "src/index"),
  }, // THIS IS THE APP ENTRY POINT
  target: "web", // we target the web or Node if Node needs to work with it instead of the web
  output: {
    path: path.resolve(__dirname, "dist"), // dist = distribution folder
    publicPath: "/",
    filename: "[name].[chunkhash].js", // this helps that webpack creates a main.3452345.js and a vendor.34534js
  },
  plugins: [
    // Generate an external css file with a hash in the filename
    new ExtractTextPlugin("[name].[contenthash].css"),

    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),

    // Use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so taht they're cached separately.
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor", // corresponds with entry point above! Webpack calls them Chunk but it's the same as Bundle, so Bundle == Chunk
    }),

    // Create HTML file that includes reference to bundled JS.
    // so don't have to do this manually <script> src="bundle.js </script>
    new HtmlWebpackPlugin({
      template: "src/index.html",
      // this will help also minify HTML
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true, // tells webpack to add scripts
      // Properties that are defined here are available in index.html
      // using htmlWebpackPlugin.options.varName
      trackJSToken: "fae6a9d62ab346b58f336553fe266953",
    }),
    // Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),
    // Minify JS
    new webpack.optimize.UglifyJsPlugin(),
  ],
  module: {
    // telling webpack what files to consider
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ["babel"] }, // handle JS files
      { test: /\.css$/, loader: ExtractTextPlugin.extract("css?sourceMap") }, // handle CSS files
    ],
  },
};
