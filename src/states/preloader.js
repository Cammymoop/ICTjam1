'use strict';

var game = require('../game'),
  Phaser = require('phaser').Phaser;

function createPreloader() {
}

function loadStuff() {
        "use strict";
        game.load.spritesheet('player', 'img/walk_cycle.png', 122, 180);
        game.load.image('aSprite', 'img/a.png');
        game.load.image('test2', 'img/testPNG.png');
        game.load.spritesheet('vomit', 'img/Emitter.png', 32, 32);

        game.load.image('all_small', 'img/all_small.png');
        //this.game.load.image('testTiles', 'img/tilemaptest.png');
        game.load.tilemap('testMap', 'map/mapTestOne.json', null, Phaser.Tilemap.TILED_JSON);

        this.loadingBar = this.add.sprite(104, 280, 'loadBar');
        this.loadingBar = this.add.sprite(93, 193, 'loadImage');

        game.load.setPreloadSprite(this.loadingBar);
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
