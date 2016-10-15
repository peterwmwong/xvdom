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
        loader : 'babel-loader',
        query: {
          plugins: [
            'syntax-jsx',
            'xvdom',
            'transform-object-rest-spread',
            'transform-member-expression-literals',
            'transform-node-env-inline'
          ],
          presets: ['../es2015-custom-preset']
        }
      }
    ]
  }
};
