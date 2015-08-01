

var boot = require('./states/boot');
var preloader = require('./states/preloader');
var gameState = require('./states/gameState');



game.state.add('boot', boot);
game.state.add('preloader', preloader);
game.state.add('gameState', gameState);
