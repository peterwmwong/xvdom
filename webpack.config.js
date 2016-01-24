var webpack = require('webpack');

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
    loaders: [
      {
        test   : /\.jsx?$/,
        exclude: /node_modules/,
        loader : 'babel-loader'
      }
    ]
  }
};
