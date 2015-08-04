var webpack = require('webpack');
var config  = require('./webpack.config.js');

config.entry.app = [
  'mocha-loader!./tests/index.js',
  'webpack/hot/dev-server'
];
config.devServer = {hot:false, inline:true};
config.devtool   = 'source-map';

module.exports = config;
