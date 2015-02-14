var Lisp = require('../');
var assert = require('assert');

describe('stdlib', function () {

  describe('math', function () {
    it('can add', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(+ 1 2 3)');

      assert.equal(result, 1 + 2 + 3);
    });

    it('can subtract', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(- 10 1 2 3)');

      assert.equal(result, 10 - 1 - 2 - 3);
    });

    it('can multiply', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(* 2 3 4)');

      assert.equal(result, 2 * 3 * 4);
    });

    it('can divide', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(/ 20 2 2)');

      assert.equal(result, 20 / 2 / 2);
    });

    it('can get remainder', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(mod 25 4)');

      assert.equal(result, 25 % 4);
    });
  });
});
