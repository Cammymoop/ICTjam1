'use strict';

var game = require('../game'),
    Phaser = require('phaser').Phaser;

var sprite;
var controls = {};

function createGameState() {
    sprite = game.add.sprite(200, 200, 'test1');
    sprite.anchor.setTo(0.5, 0.5);
    sprite.scale.setTo(2, 4);

    game.physics.arcade.enable(sprite);
    sprite.body.maxVelocity.x = 400;
    sprite.body.drag.x = 370;
    sprite.running = false;

    controls.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    controls.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    controls.run = game.input.keyboard.addKey(Phaser.Keyboard.X);
}

function updateGameState() {
    if (!sprite.running && controls.run.isDown) {
        sprite.running = true;
        sprite.body.maxVelocity.x = 700;
        sprite.body.drag.x = 470;
    }
    if (!controls.run.isDown && sprite.running) {
        sprite.running = false;
        sprite.body.maxVelocity.x = 400;
        sprite.body.drag.x = 370;
    }

    if (controls.left.isDown) {
        sprite.body.velocity.x -= 50;
    }
    if (controls.right.isDown) {
        sprite.body.velocity.x += 50;
    }
}

var gameState = {
    create: createGameState,
    update: updateGameState
};

module.exports = gameState;
