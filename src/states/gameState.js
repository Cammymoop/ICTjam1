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
var emitter;
var emitterXvelocity;
var emitterXvelecoityMoving;

function createGameState() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    testMap = game.add.tilemap('testMap');
    testMap.addTilesetImage('all_small', 'all_small');
    layer = testMap.createLayer('Tile Layer 1');
    grassyLayer = testMap.createLayer('Grass On Top');

    emitter = game.add.emitter(0, 0, 1);
    sprite = game.add.sprite(200, 200, 'test1');
    sprite.anchor.setTo(0.5, 0.5);
    sprite.scale.setTo(0.5, 0.5);
    sprite.facing = 1;

    game.physics.arcade.enable(sprite);
    //sprite.body.collideWorldBounds = true;
    game.physics.arcade.gravity.y = 300;

    game.physics.arcade.collide(sprite, layer);
    testMap.setCollisionBetween(7, 10, true, layer);
    testMap.setCollisionBetween(12, 16, true, layer);
    testMap.setCollisionBetween(18, 22, true, layer);
    testMap.setCollisionBetween(25, 28, true, layer);

    sprite.body.maxVelocity.x = 400;
    sprite.body.drag.x = 370;
    sprite.body.drag.y = 370;
    sprite.running = false;
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.gravity.y = 1000;

    game.camera.follow(sprite);
    layer.resizeWorld();


    emitter.makeParticles('veggies', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], 200, true, true);

    // Attach the emitter to the sprite
    //sprite.addChild(emitter);

    //position the emitter relative to the sprite's anchor location
    emitter.y = 100;
    emitter.x = -250;

    //emitter.maxParticleSpeed = new Phaser.Point(500,0);
    //emitter.minParticleSpeed = new Phaser.Point(180,0);
    emitterXvelocity = 500;
    emitterXvelecoityMoving = emitterXvelocity;
    emitter.minParticleSpeed.setTo(emitterXvelocity, 0);
    emitter.maxParticleSpeed.setTo(emitterXvelocity / 2, 0);

    emitter.gravity = 1;
    emitter.bounce.setTo(0.5, 0.5);
    emitter.angularDrag = 0;

    controls.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    controls.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    controls.run = game.input.keyboard.addKey(Phaser.Keyboard.X);
    controls.jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function updateGameState() {
    game.physics.arcade.collide(sprite, layer);
    game.physics.arcade.collide(emitter, layer);

    if (!sprite.running && controls.run.isDown) {
        sprite.running = true;
        sprite.body.maxVelocity.x = 700;
        sprite.body.drag.x = 470;
    }
    if (!controls.run.isDown && sprite.running) {
        sprite.running = false;
        sprite.body.maxVelocity.x = 400;
        sprite.body.drag.x = 370;
        emitterXvelecoityMoving = emitterXvelocity;
        emitter.minParticleSpeed.setTo(emitterXvelocity, 0);
    }

    if (controls.left.isDown) {
        sprite.body.velocity.x -= 50;
        if (sprite.facing === 1) {
            sprite.scale.x = -0.5;
            sprite.facing = -1;
        }
    }
    if (controls.right.isDown) {
        sprite.body.velocity.x += 50;
        if (sprite.facing === -1) {
            sprite.scale.x = 0.5;
            sprite.facing = 1;
        }
        emitterXvelecoityMoving+=10;
        emitter.minParticleSpeed.setTo(emitterXvelecoityMoving, 0);
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

    emitter.emitParticle();
    //emitter.x += 10;
    //emitter.position = sprite.position;
    emitter.x = sprite.x+10;
    emitter.y = sprite.y+70;
}
function puke(){
     puker = 1;
     if(ability == 0){
        var bullet = game.add.sprite(sprite.x, sprite.y + 30, 'test2');
        game.physics.arcade.enable(bullet);
        bullet.update = bulletColide;
        bullet.facing = sprite.facing;
        bullet.body.allowGravity = false;
        game.time.events.add(5000, bulletDeath, bullet);
     }
}

function bulletDeath(){
    this.kill();
}

function bulletColide(){
    this.body.velocity.x = 600 * this.facing;
    game.physics.arcade.collide(this, layer);

    if (!this.body.touching.none) {
        this.facing = this.facing * -1
    }
}

var gameState = {
    create: createGameState,
    update: updateGameState
};

module.exports = gameState;
