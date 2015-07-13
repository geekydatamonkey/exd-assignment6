/* jshint newcap: false */

'use strict';

import $ from 'jquery';
//import _ from 'lodash';
import p5 from 'p5';
import Plant from './Plant';
import getRandomInt from './getRandomInt';

//const π = Math.PI;

let config = { parent: '.canvas-wrapper' };
let $canvasWrapper = $(config.parent);
let plants = [];

let startingRules = [
  'FF+[++F-F-F]-[-F+F]',
  'FF+[+F-F-F]-[-F+F+F]',
  'FF-[+FF-FF]+[-FF+FF]',
  'FF[-F][+F]'
];


function sketch(s) {

  s.setup = function() {

    s.createCanvas(
      $canvasWrapper.innerWidth(),
      $canvasWrapper.innerHeight()
    ).parent($canvasWrapper[0]);

    s.colorMode(s.HSB);

    for (let i = 0; i < 10; i++ ) {

      let randomRules = startingRules[getRandomInt(0,startingRules.length)];

      let conf = {
        rules: {
          'F': randomRules
        },
        color: [getRandomInt(0,255),255,255,200],
        length: getRandomInt(50, 200),
        root: {
          x: getRandomInt(-s.width/2, s.width/2),
          y: getRandomInt(10, s.height/2)
        },
        sketch: s,
      };
      plants.push(new Plant(conf));
    }

    s.frameRate(30);
  };

  s.draw = function() {
    s.background(255);
    plants.forEach((plant) => {
      plant.update().render();
    });
  };

  s.windowResized = function() {
    s.resizeCanvas( $canvasWrapper.innerWidth(), $canvasWrapper.innerHeight() );
    s.setup();
  };

}

function init() {
  return new p5(sketch);
}

module.exports = { init };