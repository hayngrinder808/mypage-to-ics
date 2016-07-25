const webpack = require('webpack')
const path = require('path')

module.exports = {
  devtool: 'source-map',

  entry: path.join(__dirname, 'src', 'index.js'),

  output: {
    path: 'dist',
    filename: 'mypage-to-ics.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel'
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: true,
      output: {
        comments: false
      }
    })
  ]
}
