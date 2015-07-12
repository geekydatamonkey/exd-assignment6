/* jshint newcap: false */

'use strict';

// const _ = require('lodash');
import $ from 'jquery';
import p5 from 'p5';
import LSystem from './LSystem';
import Turtle from './Turtle';

const π = Math.PI;

let config = {
  parent: '.canvas-wrapper',
  rootX: 0.5,
  rootY: 1,
  axiom: 'F',
  rules: {
    'F' : 'FF+[+F-F-F]-[-F+F+F]',
    // 'F' : 'F+F-',
    // '-' : '+G',
    // 'G' : 'F--',
  },
  length: 200,
  turnAngle: 20/180 * π,
  scaleFactor: 0.5,
  generations: 3,
  breezeFactor: 0.01,
  gustFactor: 1,
};

let $canvasWrapper = $(config.parent);
let lsys;
let turtle;
let t = 0;
let clickedTime = 0;
let distMidToCorner;
let clickedX = 100;
let clickedY = 100;

function sketch(s) {

  s.setup = function() {

    s.createCanvas(
      $canvasWrapper.innerWidth(),
      $canvasWrapper.innerHeight()
    ).parent($canvasWrapper[0]);


    let maxDx = s.width/2;
    let maxDy = s.height/2;
    distMidToCorner = Math.sqrt(maxDx * maxDx + maxDy + maxDy);

    // setup L-System
    lsys = new LSystem(config.axiom, config.rules);

    // setup turtle
    turtle = new Turtle({
      length: config.length,
      turnAngle: config.turnAngle,
      sketch: s,
      instructions: lsys.getCurrent()
    });
    s.translate(
      config.rootX * s.width, 
      config.rootY * s.height
    );
    s.rotate(-π/2);

    //
    lsys.generate(config.generations);
    turtle.setInstructions(lsys.getCurrent());
    let scale = Math.pow(config.scaleFactor, config.generations);
    turtle.scaleLength(scale);

  };

  s.draw = function() {
    s.background(255);
    turtle.setTurnAngle(getAngle());
    turtle.render();
    t += 1;
    clickedTime += 1;
  };

  s.mousePressed = function() {

    clickedTime = 0;
    clickedX = s.mouseX;
    clickedY = s.mouseY;
  };

  s.windowResized = function() {
    s.resizeCanvas( $canvasWrapper.innerWidth(), $canvasWrapper.innerHeight() );
    s.setup();
  };

  function getAngle() {

    let angle = config.turnAngle;
    
    // add a light breeze for some gentle movement
    angle += config.breezeFactor * Math.sin(t/(8*2*π));

    // if there was a click, bounce a bit
    // this is based on the dampening wave
    // equation
    if (clickedTime > 0) {

      let distanceFromMiddle = s.dist(
        clickedX,
        clickedY,
        s.width/2,
        s.height/2
      );

      let gust = config.gustFactor - s.map(
        distanceFromMiddle,
        0,
        distMidToCorner,
        0,
        config.gustFactor
      );

      angle += gust * 
      Math.exp(-(clickedTime/10)) *
      Math.cos(π *clickedTime/10);
    }


    return angle;
  }

}

function init() {
  return new p5(sketch);
}

module.exports = { init };