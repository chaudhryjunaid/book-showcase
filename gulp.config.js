module.exports = function() {
  var public = './public/';
  var client = './client/';
  var build = './build/';
  return {
    allJs: [
      '**/*.js',
      '!node_modules/**',
      '!client/bower_components/**'
    ],
    allCss: client + 'app.css',
    build: build,
    public: public,
    client: client
  };
};
