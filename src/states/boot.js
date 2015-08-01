var game = require('../game'),
  Phaser = require('phaser').Phaser;

function loadStuff() {
    "use strict";
    game.load.image('loadBar', 'img/loadingStatusBar-01.png');
    game.load.image('loadImage', 'img/loading.png');
}

function start() {
    game.state.start("preloader");
}

var boot = {
  preload: loadStuff,
  create: start
};

module.exports = boot;
