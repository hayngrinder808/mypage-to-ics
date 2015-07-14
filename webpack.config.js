var webpack = require("webpack");

module.exports = {
  devtool: 'sourcemap',

  entry: "./mypage-to-ics/index.js",

  output: {
    path: __dirname,
    filename: "mypage-to-ics.js"
  },

  resolve: {
    modulesDirectories: ["node_modules", "./mypage-to-ics"],
    extensions: ["", ".js"]
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader?stage=0"},
      { test: /node_modules\/ics-js\/.*\.js$/, loader: "babel-loader?stage=0"}
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      mangle: true
    })
  ]
};
