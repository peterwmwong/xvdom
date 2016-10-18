const webpack = require('webpack');
const babelLoader = require('../../webpack.babel-loader.config');

module.exports = {
  entry: {
    app: [
      './app.jsx'
    ]
  },
  output: {
    path    : './',
    filename: 'app-built.js'
  },
  module: {
    loaders: [ babelLoader ]
  }
};
