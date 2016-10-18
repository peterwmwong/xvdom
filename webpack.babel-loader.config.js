module.exports = {
  test   : /\.jsx?$/,
  loader : 'babel-loader',
  query: {
    plugins: [
      'syntax-jsx',
      'xvdom',
      'transform-object-rest-spread',
      'transform-member-expression-literals',
      'transform-node-env-inline'
    ],
    presets: [ require.resolve('./es2015-custom-preset') ]
  }
};
