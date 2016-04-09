var parse = require('../lib/parse');
var assert = require('assert');

describe('parsing', function () {
  it('handles basic parsing', function () {
    var program = '(define r 10) (* pi (* r r))';
    var parsedProgram = [['define', 'r', 10], ['*', 'pi', ['*', 'r', 'r']]];

    assert.deepEqual(parse(program), parsedProgram);
  });
});
