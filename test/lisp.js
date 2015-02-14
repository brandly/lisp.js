var Lisp = require('../');
var assert = require('assert');

describe('lisp', function () {
  it('can execute a small program', function () {
    var lisp = new Lisp();

    lisp.exec('(define r 10)');
    var result = lisp.exec('(* pi (* r r))');
    assert.equal(result, 314.1592653589793);
  });
});
