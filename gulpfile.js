var gulp = require('gulp');
var _ = require('lodash');
var args = require('yargs').argv;
var del = require('del');

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

gulp.task('compile:css', ['clean:css'], function() {
  return gulp
    .src(config.allCss)
    .pipe($.plumber())
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(config.build));
});

gulp.task('clean:css', function() {
  _log('Cleaning all css...');
  var files = config.build + '**/*.css';
  return del(files);
});

gulp.task('autocompile:css', function(){
  return gulp.watch([config.allCss], ['compile:css']);
});
