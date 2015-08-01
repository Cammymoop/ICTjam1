'use strict';

var game = require('../game'),
  Phaser = require('phaser').Phaser;

function createPreloader() {
}

function loadStuff() {
        "use strict";
        this.game.load.image('test1', 'img/testPNG.png');

}

function updatePreloader() {
    game.state.start("gameState");
}

var preloader = {
  create: createPreloader,
  update: updatePreloader,
  preload: loadStuff
};

module.exports = preloader;
