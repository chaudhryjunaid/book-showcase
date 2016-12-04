var path = require('path');

module.exports = {
  entry: ['./app.js'],
  output: {
    path: path.resolve('./dist/'),
    publicPath: 'dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.es6$/,
        exclude: [/node_modules/, /bower_components/],
        loader: 'babel-loader'
      },
      {
        test: [/\.css$/],
        exclude: [/node_modules/],
        loader: 'style-loader!css-loader!autoprefixer-loader'
      },
      {
        test: /\/bower_components\/html5-boilerplate\/dist\/js\/vendor\/modernizr.*\.js$/,
        loader: "imports?this=>window!exports?window.Modernizr"
      },
      {
        test: /\.html$/,
        exclude: [/node_modules/],
        loader: "raw-loader"
      },
      {
        test: /\.(png|jpg|jpeg|ttf|eot)$/,
        exclude: [/node_modules/],
        loader: "url-loader?limit=8192"
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.es6', '.css']
  }
};
