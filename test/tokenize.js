var tokenize = require('../lib/tokenize');
var assert = require('assert');

describe('tokenize', function () {
  it('handles basic tokenizing', function () {
    var program = '(begin (define r 10) (* pi (* r r)))';
    var tokens = ['(', 'begin', '(', 'define', 'r', '10', ')', '(', '*', 'pi', '(', '*', 'r', 'r', ')', ')', ')'];

    assert.deepEqual(tokenize(program), tokens);
  });

  it('strips comments', function () {
    var program = '(+ 2 2) ; check out this sick comment';
    var tokens = ['(', '+', '2', '2', ')'];

    assert.deepEqual(tokenize(program), tokens);
  });

  it('strips comments followed by newline', function () {
    var program = '(+ 2 2) ; another one\n (* 2 2)';
    var tokens = ['(', '+', '2', '2', ')', '(', '*', '2', '2', ')'];

    assert.deepEqual(tokenize(program), tokens);
  });
});
