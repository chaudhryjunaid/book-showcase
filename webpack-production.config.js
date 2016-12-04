var devConfig = require('./webpack.config.js');
var WebpackStrip = require('strip-loader');

var stripLoader = {
  test: [/\.js$/, /\.es6$/],
  exclude: [/node_modules/, /bower_components/],
  loader: WebpackStrip.loader('console.log')
};

devConfig.module.loaders.push(stripLoader);

module.exports = devConfig
