var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, '/client'), // use absolute path to avoid errors
  entry: ['./app.js'],
  output: {
    path: path.join(__dirname,'client','dist'),
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
        exclude: [],
        loader: 'style-loader!css-loader!autoprefixer-loader'
      },
      {
        test: [/\.styl$/],
        exclude: [],
        loader: 'style-loader!css-loader!autoprefixer-loader!stylus-loader'
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
        test: /\.(woff2?|png|jpg|jpeg|ttf|eot|svg)$/,
        exclude: [],
        loader: "url-loader?limit=10000"
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })
  ],
  resolve: {
    extensions: ['', '.js', '.es6', '.css', '.html']
  }
};
