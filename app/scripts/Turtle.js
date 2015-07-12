/**
* Makes a Turtle-like graphics system
* (aka LOGO)
*
* F: Draw a line and move forward
* G: Move forward (without drawing a line)
* +: Turn right
* -: Turn left
* [: Save current location
* ]: Restore previous location
*
*/

'use strict';
import _ from 'lodash';

const π = Math.PI;

export default class Turtle {

  /**
  * constructor
  */
  constructor(config) {
    let defaults = {
      instructions: '',
      length: 10,
      turnAngle: π/2,
      sketch: null,
      color: [0]
    };

    config = _.assign({}, defaults, config);

    _.each(config, (value, key) => {
      this[key] = value;
    });
  }

  /**
  * setLength
  */
  setLength(l) {
    this.length = l;
    return this;
  }

  /**
  * scales the current length by a given scaleFactor
  */
  scaleLength(scaleFactor) {
    this.length *= scaleFactor;
    return this;
  }

  /**
  * setAngle
  */
  setTurnAngle(theta) {
    this.turnAngle = theta;
    return this;
  }

  /**
  * setSketch
  */
  setSketch(s) {
    this.sketch = s;
    return this;
  }

  /**
  * setInstructions
  */
  setInstructions(instructions) {
    this.instructions = instructions;
    return this;
  }

  _getAction(actionKey) {
    let s = this.sketch;

    let actions = {

      // draw line and move forward
      'F' : () => {
        s.stroke(this.color);
        s.line(0, 0, this.length, 0);
        
        // put the turtle at the head of the line
        // so that the next action will be relative to this
        s.translate(this.length, 0);
      },

      // move forward (without drawing any line)
      'G': () => {
        s.translate(this.length, 0);
      },

      // turn right
      '+': () => {
        s.rotate(this.turnAngle);
      },

      // turn left
      '-': () => {
        s.rotate(-this.turnAngle);
      },

      // save current location
      '[': () => {
        s.push();
      },

      // restore previous location
      ']': () => {
        s.pop();
      }
    };

    return actions[actionKey];
  }

  /**
  * render
  */
  render() {
    if (!this.sketch) {
      throw new Error('Cannot render. No sketch is set for this turtle.');
    }

    let lengthOfInstructions = this.instructions.length;

    for (let i = 0; i < lengthOfInstructions; i++) {
      let currentChar = this.instructions.charAr(i);

      // look up the action corresponding to this char
      let actionFn = this._getAction(currentChar);

      // execute the action
      actionFn();
    }

  }

}