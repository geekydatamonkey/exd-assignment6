/* jshint newcap: false */

'use strict';

// const _ = require('lodash');
import $ from 'jquery';
import p5 from 'p5';

const config = {
  parent: '.canvas-wrapper',
};

// cache canvasWrapper
let $canvasWrapper = $(config.parent);

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