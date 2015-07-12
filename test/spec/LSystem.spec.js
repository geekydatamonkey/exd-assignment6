/* global describe, it */
import LSystem from '../../app/scripts/LSystem.js';

// needed since PhantomJS has no Function.prototype.bind()
import _ from 'lodash';

(function() {

  'use strict';

  describe('LSystem', () => {

    let lsys;

    beforeEach(() => {
      let rules = {
        'A': 'AB',
        'B': 'A'
      };

      lsys = new LSystem('A',rules);
    });

    it('create a new L-System', () => {
      expect(lsys).to.be.instanceOf(LSystem);
    });

    it('should get output for a given char', () => {
      expect(lsys._getOutputForChar('A')).to.equal('AB');
    });

    it('should generate one generation', () => {
      lsys.generate();
      expect(lsys.getCurrent()).to.equal('AB');
    });

    it('should generate output for a given number of generations', () => {
      let expected = 'ABAABABA';
      lsys.generate(4);
      expect(lsys.getCurrent()).to.equal(expected);
    });

    it('if char doesnt match a rule, it should continue to next generation', () => {
        lsys = new LSystem('A', {
          'A' : 'ABC'
        });
        lsys.generate();
        expect(lsys.getCurrent()).to.equal('ABC');
        lsys.generate();
        expect(lsys.getCurrent()).to.equal('ABCBC');
        lsys.generate();
        expect(lsys.getCurrent()).to.equal('ABCBCBC');
    });


  });

})();