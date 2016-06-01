var webpack = require('webpack');

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
    loaders: [
      {
        test   : /\.jsx?$/,
        loader : 'babel-loader'
      }
    ]
  }
};
