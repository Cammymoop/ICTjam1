'use strict';

var gulp = require('gulp');


var src = './src/index.html',
  dist = './release';

function index() {
  return gulp.src(src)
    .pipe(gulp.dest(dist));
}


gulp.task('build-index', index);