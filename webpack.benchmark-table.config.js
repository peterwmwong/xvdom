var webpack = require('webpack');

module.exports = {
  entry: {
    app: ['./benchmarks/table/app.jsx']
  },
  output: {
    path    : './benchmarks/table',
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
