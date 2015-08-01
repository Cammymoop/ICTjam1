var gulp = require('gulp');


require('./build/scripts');
require('./build/index');
require('./build/img');
require('./build/map');


gulp.task('build', ['build-scripts', 'build-index', 'build-img', 'build-map']);
