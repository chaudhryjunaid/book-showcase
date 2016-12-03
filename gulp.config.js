module.exports = function() {
  var tmp = './tmp/';
  var client = './client/';
  var build = './public/';
  return {
    allJs: [
      '**/*.js',
      '!node_modules/**',
      '!client/bower_components/**'
    ],
    vendorCss: '',
    appCss: client + 'app.css',
    build: build
  };
};
