'use strict';

var game = require('../game'),
  Phaser = require('phaser').Phaser;

function createPreloader() {
}

function loadStuff() {
        "use strict";
        game.load.spritesheet('player', 'img/walk_cycle.png', 122, 180);
        game.load.image('pukeAbilitySprite', 'img/a.png');
        game.load.image('hoverAbilitySprite', 'img/a.png');
        game.load.image('test2', 'img/testPNG.png');
        game.load.image('abilityBar', 'img/abilityBar.png');
        game.load.spritesheet('enemy', 'img/enemy.png', 830, 678);
        game.load.spritesheet('vomit', 'img/Emitter.png', 32, 32);
        game.load.spritesheet('squid', 'img/squid.png', 533, 242);

        game.load.image('gameOver1', 'img/youFailONE.png');
        game.load.image('gameOver2', 'img/youFailTWO.png');

        game.load.image('bg', 'img/background.png');
        game.load.image('bgParallax', 'img/backgroundFront.png');

        game.load.image('all_small', 'img/all_small.png');
        game.load.tilemap('testMap', 'map/mapTestOne.json', null, Phaser.Tilemap.TILED_JSON);

        this.loadingBar = this.add.sprite(104, 280, 'loadBar');
        this.add.sprite(93, 193, 'loadImage');

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
