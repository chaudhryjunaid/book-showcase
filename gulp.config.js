module.exports = function() {
  var client = './client/';
  var dist = './client/dist/';
  return {
    allJs: [
      '**/*.js',
      '!node_modules/**',
      '!client/bower_components/**/*',
      '!client/node_modules/**/*',
      '!client/dist/**/*'
    ],
    main: 'index.js',
    serverFiles: [
      'app/**/*.js',
      'config/**/*.js',
      'db/**/*.js',
      'index.js'
    ],
    clientFiles: [
      client + '**/*'
    ],
    client: client,
    dist: dist
  };
};
