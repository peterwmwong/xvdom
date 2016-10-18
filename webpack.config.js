const webpack = require('webpack');
const babelLoader = require('./webpack.babel-loader.config');

module.exports = {
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path    : 'dist',
    filename: 'xvdom.js',
    library: 'xvdom',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [ babelLoader ]
  }
};
