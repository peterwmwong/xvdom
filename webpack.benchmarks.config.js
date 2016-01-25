var webpack = require('webpack');

module.exports = {
  entry: {
    app: ['./benchmarks/dbmonster/app.jsx']
  },
  output: {
    path    : './benchmarks/dbmonster',
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
