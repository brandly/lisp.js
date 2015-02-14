var tokenize = require('../lib/tokenize');
var assert = require('assert');

describe('tokenize', function () {
  it('handles basic tokenizing', function () {
    var program = '(begin (define r 10) (* pi (* r r)))';
    var tokens = ['(', 'begin', '(', 'define', 'r', '10', ')', '(', '*', 'pi', '(', '*', 'r', 'r', ')', ')', ')'];

    assert.deepEqual(tokenize(program), tokens);
  });
});
