'use strict';

var gulp = require('gulp');


var src = './src/img/*.*',
  dist = './dist/img';

function index() {
  return gulp.src(src)
    .pipe(gulp.dest(dist));
}


gulp.task('build-index', index);
