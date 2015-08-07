var webpack = require('webpack');

module.exports = {
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path    : 'dist',
    filename: 'xvdom.js'
  },
  module: {
    loaders: [
      {
        test   : /\.js?$/,
        exclude: /node_modules/,
        loader : 'babel-loader'
      }
    ]
  }
};
