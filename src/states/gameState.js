'use strict';

var game = require('../game'),
    Phaser = require('phaser').Phaser;

var sprite;
var pukeAbilitySprite;
var pukeAbility = 0;
var controls = {};
var testMap;
var puker = 1;
var jumper = 0;
var layer;
var grassyLayer;
var ability = 0;//0 = vomit, 1 = hover. THis is checked in puke() which is general perpose
var aCounter = 0;//this keeps track of how close we are to triggering an ability.
var emitter;
var emitting = false;
var emitterXvelocity;
var emitterXvelecoityMoving;
var baddies = [];

function createGameState() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#999999';

    testMap = game.add.tilemap('testMap');
    testMap.addTilesetImage('all_small', 'all_small');
    layer = testMap.createLayer('Tile Layer 1');
    grassyLayer = testMap.createLayer('Grass On Top');

    emitter = game.add.emitter(0, 0, 1);
    sprite = game.add.sprite(200, 200, 'player');
    sprite.anchor.setTo(0.65, 0.5);
    sprite.facing = 1;

    sprite.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]);
    sprite.animations.add('stand', [6]);

    sprite.animations.play('walk', 60, true);


    game.physics.arcade.enable(sprite);
    sprite.body.setSize(40, 144, 6, 14);
    game.physics.arcade.gravity.y = 300;

    game.physics.arcade.collide(sprite, layer);
    testMap.setCollisionBetween(8, 11, true, layer);
    testMap.setCollisionBetween(13, 17, true, layer);
    testMap.setCollisionBetween(19, 23, true, layer);
    testMap.setCollisionBetween(26, 29, true, layer);

    sprite.body.maxVelocity.x = 400;
    sprite.body.drag.x = 370;
    sprite.body.drag.y = 370;
    sprite.running = false;
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.gravity.y = 1000;

    game.camera.follow(sprite);
    layer.resizeWorld();


    emitter.makeParticles('vomit', [0,1,2,3], 200, true, true);

    // Attach the emitter to the sprite
    //sprite.addChild(emitter);

    //position the emitter relative to the sprite's anchor location
    emitter.y = 100;
    emitter.x = -250;

    emitterXvelocity = 700;
    emitter.minParticleSpeed.setTo(emitterXvelocity, 100);
    emitter.maxParticleSpeed.setTo(emitterXvelocity / 2, 600);

    emitter.gravity = 1;
    emitter.bounce.setTo(0.5, 0.5);
    emitter.angularDrag = 0;

    controls.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    controls.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    controls.run = game.input.keyboard.addKey(Phaser.Keyboard.X);
    controls.jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    populateBaddies();
    makeTokens();
}

function updateGameState() {
    game.physics.arcade.collide(sprite, layer);
    game.physics.arcade.collide(emitter, layer);
    game.physics.arcade.overlap(sprite, pukeAbilitySprite, handleA);

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

    var moving = false;
    if (controls.left.isDown) {
        moving = true;
        sprite.body.velocity.x -= 50;
        if (sprite.facing === 1) {
            sprite.scale.x = -1;
            sprite.facing = -1;
        }
        if (emitting) {
            emitter.maxParticleSpeed.x = (emitterXvelocity * sprite.facing) + sprite.body.velocity.x;
            emitter.minParticleSpeed.x = ((emitterXvelocity * sprite.facing)/2) + sprite.body.velocity.x;
        }
    }
    if (controls.right.isDown) {
        moving = true;
        sprite.body.velocity.x += 50;
        if (sprite.facing === -1) {
            sprite.scale.x = 1;
            sprite.facing = 1;
        }
        if (emitting) {
            emitter.maxParticleSpeed.x = (emitterXvelocity * sprite.facing) + sprite.body.velocity.x;
            emitter.minParticleSpeed.x = ((emitterXvelocity * sprite.facing)/2) + sprite.body.velocity.x;
        }
    }
    if (!moving) {
        if (sprite.animations.currentAnim.name !== 'stand') {
            sprite.animations.play('stand');
        }
    } else {
        if (sprite.animations.currentAnim.name !== 'walk') {
            sprite.animations.play('walk', 60, true);
        }
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
    //if(puker % 4 == 0){
    if(pukeAbility > 70) {
       puke();
    }

    if (emitting) {
        emitter.emitParticle();
        //emitter.x += 10;
        //emitter.position = sprite.position;
        emitter.x = sprite.x+10;
        emitter.y = sprite.y;
    }

    pukeAbility -= 1;
    if (pukeAbility < 0) {
        pukeAbility = 0
    }

 if(sprite.body.y > 700){gameOver();}
}

function gameOver(){
//TODO you fail
    game.time.events.add(1000, reset);
    sprite.kill();
}
function reset(){
    game.state.start("gameState");
}

function handleA(){
    pukeAbility += 5;
    if (pukeAbility > 100) {
        pukeAbility = 100;
    }
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
    }else if (ability == 1){
        sprite.body.gravity.y = 0;
        sprite.body.velocity.y = 0;
        sprite.body.y = sprite.body.y - 10;
        game.time.events.add(1500, endHover, sprite);
    }
    emitting = true;
    game.time.events.add(1000, function() {emitting = false;});
}
function endHover(){
    this.body.gravity.y = 1000;
}

function makeTokens() {
    pukeAbilitySprite = game.add.sprite(1000, 400, 'pukeAbilitySprite');
    pukeAbilitySprite.scale.setTo(0.5, 0.5);
    game.physics.arcade.enable(pukeAbilitySprite);
    //baddy.update = baddyColide;
    pukeAbilitySprite.body.allowGravity = false;
}

function bulletDeath(){
    this.kill();
}
function populateBaddies(){

    var baddy = game.add.sprite(500, 345, 'test2');
        game.physics.arcade.enable(baddy);
        baddy.update = baddyColide;
        baddy.body.allowGravity = false;
baddies.push(baddy);
}
function baddyColide(){

    if(game.physics.arcade.collide(this, sprite)){gameOver();}
    game.physics.arcade.collide(this, layer);
}

function killBaddy(a){
baddies[a].kill();
}

function bulletColide(){
    this.body.velocity.x = 600 * this.facing;
    game.physics.arcade.collide(this, layer);
    if(game.physics.arcade.collide(this, baddies[0])){console.log('QAZ'); killBaddy(0);}

    if (!this.body.touching.none) {
        this.facing = this.facing * -1;
    }
}

var gameState = {
    create: createGameState,
    update: updateGameState
};

module.exports = gameState;
