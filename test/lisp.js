var Lisp = require('../');
var assert = require('assert');

describe('lisp', function () {
  it('can execute a small program', function () {
    var lisp = new Lisp();

    var result = lisp.exec('(define r 10)\n\n(* pi (* r r))');
    assert.equal(result, 314.1592653589793);
  });

  it('can execute a program with extraneous whitespace', function () {
    var lisp = new Lisp();

    var program = [
      '(define factorial (lambda (n)',
      '',
      '',
      '  (if (<= n 1)',
      '',
      '',
      '    n',
      '    (* n (factorial (- n 1))))))',
      '',
      '(factorial 5)',
      ''
    ].join('\n')
    var result = lisp.exec(program);
    assert.equal(result, 120);
  });

  it('can handle cond statements', function () {
    var lisp = new Lisp();

    var result = lisp.exec('(cond ((> 2 5) 1) ((> 5 2) 2) ((= 5 2) 3))');
    assert.equal(result, 2);
  });

  it('can handle else statements within cond statements', function () {
    var lisp = new Lisp();

    var result = lisp.exec('(cond ((> 1 5) 1) ((> 2 5) 2) (else 3))');
    assert.equal(result, 3);
  });

  it('can handle if statements', function () {
    var lisp = new Lisp();

    var result = lisp.exec('(if (> 2 1) 123 456)');
    assert.equal(result, 123);
  });

  it('can handle lambdas', function () {
    var lisp = new Lisp();

    lisp.exec('(define circle-area (lambda (r) (* pi (* r r))))');
    var result = lisp.exec('(circle-area 3)');

    assert.equal(result, 28.274333882308138);
  });

  it('can handle lets', function () {
    var lisp = new Lisp();

    var result = lisp.exec('(let ((x 2) (y 4)) (* x y))');

    assert.equal(result, 8);
  });
});
