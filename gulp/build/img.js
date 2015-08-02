'use strict';

var gulp = require('gulp');


var src = './src/img/*.png',
  dist = './dist/img';

function index() {
  return gulp.src(src)
    .pipe(gulp.dest(dist));
}


gulp.task('build-img', index);
