var gulp = require('gulp');
var _ = require('lodash');
var args = require('yargs').argv;
var del = require('del');
var spawn = require('child_process').spawn;
var webpack = require("webpack-stream");

var $ = require('gulp-load-plugins')({lazy: true});
var config = require('./gulp.config')();

var _log = function(msg) {
  $.util.log($.util.colors.blue(msg));
};

gulp.task('vet', function() {
  _log('Linting javascript files...');
  return gulp
    .src(config.allJs)
    .pipe($.if(args.verbose,$.print()))
    .pipe($.eslint({
      quiet: true // ignore warnings
    }))
    .pipe($.eslint.format('stylish')) // try 'stylish', 'junit', 'compact', 'table', 'tap', 'unix'
    .pipe($.eslint.failAfterError());
});

gulp.task('clean', function() {
  _log('Cleaning client files...');
  var files = config.dist + '**/*';
  return del(files);
});

gulp.task('autobuild:dev', ['webpack:build-dev'], function() {
  gulp.watch(['client/**/*'], ["webpack:build-dev"]);
});

// Production build
gulp.task("build", ["webpack:build"]);

gulp.task("webpack:build", function(callback) {
  return gulp.src(config.client+'app.js')
    .pipe(webpack( require('./webpack-production.config.js') ))
    .pipe(gulp.dest(config.dist));
});

gulp.task("webpack:build-dev", function(callback) {
  return gulp.src(config.client+'app.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest(config.dist));
});
gulp.task('run:dev', function() {
  var bunyan;
  var stream = $.nodemon({
    script: config.main,
    delayTime: 1,
    env: {
      PORT: 5000,
      NODE_ENV: 'development'
    },
    watch: config.serverFiles,
    stdout:   false,
    readable: false
  });
  return stream
    .on('restart', function () {
      _log('*** Server restarted')
    })
    .on('crash', function () {
      _log('*** Server crashed!\n')
      //stream.emit('restart', 10)  // restart the server in 10 seconds
    })
    .on('readable', function() {

      // free memory
      bunyan && bunyan.kill();

      bunyan = spawn('./node_modules/bunyan/bin/bunyan', [
        '--output', 'short',
        '--color'
      ]);

      bunyan.stdout.pipe(process.stdout)
      bunyan.stderr.pipe(process.stderr)

      this.stdout.pipe(bunyan.stdin)
      this.stderr.pipe(bunyan.stdin)
    });
});
