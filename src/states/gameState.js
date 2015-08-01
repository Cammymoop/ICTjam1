'use strict';

var game = require('../game'),
  Phaser = require('phaser').Phaser;

var sprite;

function createGameState() {
  sprite = game.add.sprite(200, 200, 'test1');
  sprite.anchor.setTo(0.5, 0.5);
  sprite.scale.setTo(4, 4);
}

function updateGameState() {
    sprite.angle += 2;
}

var gameState = {
  create: createGameState,
  update: updateGameState
};

module.exports = gameState;
