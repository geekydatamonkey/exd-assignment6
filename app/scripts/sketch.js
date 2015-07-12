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
  axiom: 'F',
  rules: {
    'F' : 'FF+[+F-F-F]-[-F+F+F]',
  },
  length: 200,
  turnAngle: 25/180 * π,
  scaleFactor: 0.5,

};

let $canvasWrapper = $(config.parent);
let lsys;
let turtle;

function sketch(s) {

  s.setup = function() {

    s.createCanvas(
      $canvasWrapper.innerWidth(),
      $canvasWrapper.innerHeight()
    ).parent($canvasWrapper[0]);

    // setup L-System
    lsys = new LSystem(config.axiom, config.rules);

    // setup turtle
    turtle = new Turtle({
      length: config.length,
      turnAngle: config.turnAngle,
      sketch: s,
      instructions: lsys.getCurrent()
    });
    s.noLoop();
  };

  s.draw = function() {
    s.translate(s.width/2, s.height);
    s.rotate(-90);
    turtle.render();
  };


  s.mousePressed = function() {
    s.clear();
    s.push();
    lsys.generate();
    let instructions = lsys.getCurrent();
    console.log(`instructions: ${instructions}`);
    turtle.setInstructions(instructions);
    turtle.scaleLength(config.scaleFactor);
    s.pop();
    s.redraw();
  };

  s.windowResized = function() {
    s.resizeCanvas( $canvasWrapper.innerWidth(), $canvasWrapper.innerHeight() );
  };

}

function init() {
  return new p5(sketch);
}

module.exports = { init };