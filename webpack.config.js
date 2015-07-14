var webpack = require("webpack");

module.exports = {
  entry: "./mypage-to-ics/index.js",

  output: {
    path: __dirname,
    filename: "mypage-to-ics.min.js"
  },

  resolve: {
    modulesDirectories: ["node_modules", "./mypage-to-ics"],
    extensions: ["", ".js"]
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader?stage=0"}
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      mangle: true
    })
  ]
};