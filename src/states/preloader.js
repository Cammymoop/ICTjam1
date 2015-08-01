'use strict';

var game = require('../game'),
  Phaser = require('phaser').Phaser;

function createPreloader() {
}

function loadStuff() {
        "use strict";
        this.game.load.image('test1', 'img/testPNG.png');

        this.game.load.image('testTiles', 'img/tilemaptest.png');
        this.game.load.image('testTiles', 'img/tilemaptest.png');
        this.game.load.tilemap('testMap', 'map/mapTestOne.json', null, Phaser.Tilemap.TILED_JSON);
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
