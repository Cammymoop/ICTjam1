'use strict';

var game = require('../game'),
    Phaser = require('phaser').Phaser;

var sprite;
var controls = {};
var testMap;
var puker = 1;
var jumper = 0;
var layer;
var grassyLayer;
var ability = 0;//0 = vomit, 1 = hover. THis is checked in puke() which is general perpose
var aCounter = 0;//this keeps track of how close we are to triggering an ability. 

function createGameState() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    testMap = game.add.tilemap('testMap');
    testMap.addTilesetImage('all_small', 'all_small');
    layer = testMap.createLayer('Tile Layer 1');
    grassyLayer = testMap.createLayer('Grass On Top');

    sprite = game.add.sprite(200, 200, 'test1');
    sprite.anchor.setTo(0.5, 0.5);
    sprite.scale.setTo(0.5, 0.5);

    game.physics.arcade.enable(sprite);
    //sprite.body.collideWorldBounds = true;
    game.physics.arcade.gravity.y = 300;

    game.physics.arcade.collide(sprite, layer);
    testMap.setCollisionBetween(0, 35, true, layer);

    sprite.body.maxVelocity.x = 400;
    sprite.body.drag.x = 370;
    sprite.body.drag.y = 370;
    sprite.running = false;
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.gravity.y = 1000;

    game.camera.follow(sprite);
    layer.resizeWorld();




    controls.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    controls.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    controls.run = game.input.keyboard.addKey(Phaser.Keyboard.X);
    controls.jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function updateGameState() {
    game.physics.arcade.collide(sprite, layer);

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
    if(jumper > 0) {jumper--;}
    if(sprite.body.onFloor() && controls.jump.isDown && jumper == 0){
       jumper = 20;
       sprite.body.velocity.y = -500;
       if(sprite.running){
           sprite.body.velocity.y -= 100;
       }
       puker++;
    }
    else if (controls.jump.isDown && sprite.body.velocity.y < -300){
        sprite.body.velocity.y -= 20;
    }
    if(puker % 3 == 0){
       puke();
    }
}
function puke(){
     //sprite.body.velocity.y = 0;
     puker = 1;
     if(ability == 0){
var bullet = game.add.sprite(sprite.body.x, sprite.body.y, 'test2');
        game.physics.arcade.enable(bullet);
        bullet.update = bulletColide;
        bullet.body.allowGravity = false;
     }
}

function bulletColide(){
    this.body.velocity.x = 1000;
    game.physics.arcade.collide(this, layer);
}

var gameState = {
    create: createGameState,
    update: updateGameState
};

module.exports = gameState;
