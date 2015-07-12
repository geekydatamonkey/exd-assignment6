/* global describe, it */
import LRule from '../../app/scripts/LRule.js';

// needed since PhantomJS has no Function.prototype.bind()
import _ from 'lodash';

(function() {

  'use strict';

  describe('LRule', () => {

    let rule;

    beforeEach(() => {
      rule = new LRule('A', 'AB');
    })

    it('create a new rule', () => {
      expect(rule).to.be.instanceOf(LRule);
    });

    it('should return output, given input', () => {
      expect(rule.getOutput('A')).to.equal('AB');
    });

    it('should determine if a given input matches current rule', () => {
      expect(rule.matches('A')).to.be.true;
      expect(rule.matches('C')).to.be.false;
    });

    it('should throw error, given invalid input', () => {
      expect(_.bind(rule.getOutput,rule,'Z')).to.throw(Error);
    });

  });

})();