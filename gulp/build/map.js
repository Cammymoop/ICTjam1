'use strict';

var gulp = require('gulp');


var src = './src/map/*.json',
  dist = './dist/map';

function index() {
  return gulp.src(src)
    .pipe(gulp.dest(dist));
}


gulp.task('build-map', index);
