var gulp = require('gulp');


require('./build/scripts');
require('./build/index');
require('./build/img');


gulp.task('build', ['build-scripts', 'build-index']);
