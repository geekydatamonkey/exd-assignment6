/* jshint newcap: false */

'use strict';

import $ from 'jquery';
import _ from 'lodash';
import p5 from 'p5';
import Plant from './Plant';
import getRandomInt from './getRandomInt';

//const π = Math.PI;

let config = { 
  parent: '.canvas-wrapper',
  backgroundColor: [0.92, 0.1, 0.8].map(p => Math.floor(p*255)),
  bottomColor: [0.76, 0.2, 0.5].map(p => Math.floor(p*255)),
};

let $canvasWrapper = $(config.parent);
let plants = [];
let startingRules = [
  'FF+[++F-F-F]-[-F+F]',
  'FF+[+F-F-F]-[-F+F+F]',
  'FF-[+F-F+F]+[-F+++F--F]',
  'F[F-F+F][+FF][F-F]'
];
let t = 0;

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
        color: [getRandomInt(0,255),200,220,200],
        length: getRandomInt(50, 200),
        root: {
          x: getRandomInt(-s.width/2 + 100, s.width/2 - 100),
          y: getRandomInt(0, s.height/2)
        },
        strokeWeight: getRandomInt(2,4),
        sketch: s,
      };
      plants.push(new Plant(conf));
    }

    s.frameRate(30);
  };

  s.draw = function() {

    // rotate background color slightly
    let bgColor = config.backgroundColor.slice(0);
    bgColor[0] +=  -5 * Math.sin(t/10);
    s.background(bgColor);

    s.push();
    s.noStroke();
    s.fill(config.bottomColor);
    s.rect(0, s.height/2, s.width,s.height/2);
    s.pop();

    _.forEach(plants, (plant) => {
      plant.update().render();
    });

    t += 1;
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