'use strict';

var gulp = require('gulp'),
  ghPages = require('gulp-gh-pages');

function deploy() {
  return gulp
    .src('./release/**/*')
    .pipe(ghPages());
}

gulp.task('deploy', deploy);