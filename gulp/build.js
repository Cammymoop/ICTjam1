var gulp = require('gulp');


require('./build/scripts');
require('./build/index');
require('./build/img');
require('./build/map');
require('./build/sound');


gulp.task('build', ['build-scripts', 'build-index', 'build-img', 'build-sound', 'build-map']);
