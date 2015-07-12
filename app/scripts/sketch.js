/* jshint newcap: false */

'use strict';

// const _ = require('lodash');
import $ from 'jquery';
import p5 from 'p5';
import LSystem from './LSystem';
import Turtle from './Turtle';

const config = {
  parent: '.canvas-wrapper',
  axiom: 'F',
  rules: {
    'F': 'FF+[+F-F-F]-[-F+F+F]'
  },
};

// cache canvasWrapper
let $canvasWrapper = $(config.parent);
let lsys = new LSystem(config.axiom, config.rules);

function sketch(s) {

  s.setup = function() {

    s.createCanvas(
      $canvasWrapper.innerWidth(),
      $canvasWrapper.innerHeight()
    ).parent($canvasWrapper[0]);

  };

  s.draw = function() {
    s.ellipse(100,100,100,100);
  };

  s.windowResized = function() {
    s.resizeCanvas( $canvasWrapper.innerWidth(), $canvasWrapper.innerHeight() );
  };

}

function init() {
  return new p5(sketch);
}

module.exports = { init };