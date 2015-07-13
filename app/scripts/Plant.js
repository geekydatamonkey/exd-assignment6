/**
* Plant
*
*/
'use strict';

import _ from 'lodash';
import LSystem from './LSystem';
import Turtle from './Turtle';

const π = Math.PI;

export default class Plant {

  /**
  * constructor
  */
  constructor(config) {
    let defaults = {
      angle: 20/360 * 2 * π,
      axiom: 'F',
      breeze: true,
      breezeFactor: 0.05,
      clickHandler: null,
      color: [0,255,255,200],
      colorChangeRate: 1/20,
      generations: 3,
      gustFactor: 0.1,
      length: 200,
      // root is at origin
      // turtle begins pointing up
      root: { x: 0, y: 0},
      rules: {
        'F': 'FF+[+F-F-F]-[-F+F+F]'
      },
      sketch: null,
      strokeWeight: 1,
      scaleFactor: 0.5,
      time: 0,
    };

    config = _.assign({}, defaults, config);

    Object.keys(config).forEach((key) => {
      this[key] = config[key];
    });

    // setup lsys
    this.lsys = new LSystem(this.axiom, this.rules);
    this.lsys.generate(this.generations);
    console.log(this.lsys.getCurrent());

    // setup turtle
    this.turtle = new Turtle({
      instructions: this.lsys.getCurrent(),
      color: this.color,
      colorChangeRate: this.colorChangeRate,
      length: this.length * Math.pow(this.scaleFactor, this.generations),
      //length: this.length,
      sketch: this.sketch,
      strokeWeight: this.strokeWeight,
      turnAngle: this.angle,
    });

    this.turtle.render();

  }

  update() {
    this.turtle.setTurnAngle(this._getAngle());
    return this;
  }

  render() {
    let s = this.sketch;

    s.push();

    s.scale(1,-1);
    s.translate(
        s.width/2, 
        -s.height
    );
    s.rotate(π/2);
    s.translate(this.root.y, -this.root.x);

    this.turtle.render();
    this.time += 1;
    s.pop();
  }

  _getAngle() {
    let angle = this.angle;
    if (this.breeze) {
      angle += this.breezeFactor * Math.sin(this.time/(8*2*π));
    }
    return angle;
  }

}