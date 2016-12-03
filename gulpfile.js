var gulp = require('gulp');
var _ = require('lodash');
var args = require('yargs').argv;

var $ = require('gulp-load-plugins')({lazy: true});
var config = require('./gulp.config')();

var _log = function(msg) {
  $.util.log($.util.colors.blue(msg));
};

gulp.task('vet', function() {
  _log('Linting javascript files...');
  return gulp
    .src(config.alljs)
    .pipe($.if(args.verbose,$.print()))
    .pipe($.eslint({
      quiet: true // ignore warnings
    }))
    .pipe($.eslint.format('stylish')) // try 'stylish', 'junit', 'compact', 'table', 'tap', 'unix'
    .pipe($.eslint.failAfterError());
});

