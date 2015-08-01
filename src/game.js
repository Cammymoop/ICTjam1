global.PIXI = require('pixi.js');
global.p2 = require('p2');
global.Phaser = require('phaser')

game = new Phaser.Game(1000, 600, Phaser.AUTO, 'phaser_game');

module.exports = game;
