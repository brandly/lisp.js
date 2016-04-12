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

    it('can negate', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(- 10)');

      assert.equal(result, -10);
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

    it('can get absolute value', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(abs -3.4)');

      assert.equal(result, 3.4);
    });

    it('can round', function () {
      var lisp = new Lisp();

      var low = lisp.exec('(round 1.3)');
      var high = lisp.exec('(round 1.6)');

      assert.equal(low, 1);
      assert.equal(high, 2);
    });

    it('can sin', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(sin 0)');

      assert.equal(result, 0);
    });

    it('can cos', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(cos 0)');

      assert.equal(result, 1);
    });

    it('can tan', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(tan 0)');

      assert.equal(result, 0);
    });

    it('can asin', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(asin 1)');

      assert.equal(result, 1.5707963267948965);
    });

    it('can acos', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(acos 0)');

      assert.equal(result, 1.5707963267948965);
    });

    it('can atan', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(atan 1)');

      assert.equal(result, 0.7853981633974483);
    });

    it('can sinh', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(sinh 0)');

      assert.equal(result, 0);
    });

    it('can cosh', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(cosh 0)');

      assert.equal(result, 1);
    });

    it('can tanh', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(tanh 1)');

      assert.equal(result, 0.7615941559557649);
    });

    it('can asinh', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(asinh 0)');

      assert.equal(result, 0);
    });

    it('can acosh', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(acosh 1)');

      assert.equal(result, 0);
    });

    it('can atanh', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(atanh 0)');

      assert.equal(result, 0);
    });

    it('can raise to a power with expt', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(expt 2 10)');

      assert.equal(result, 1024);
    });

    it('can sqrt', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(sqrt 9)');

      assert.equal(result, 3);
    });

    it('can raise e to a power with exp', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(exp 2)');

      assert.equal(result, 7.3890560989306495);
    });

    it('can log', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(log 7.389056)');

      assert.equal(result, 1.9999999866111924);
    });
  });

  describe('lists', function () {
    it('can be created', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(list 1 2 3)');

      assert.deepEqual(result, [1, 2, 3]);
    });

    it('can append', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(append (list 1 2 3) (list 4 5 6))');

      assert.deepEqual(result, [1, 2, 3, 4, 5, 6]);
    });

    it('can begin', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(begin 1 2 3)');

      assert.equal(result, 3);
    });

    it('can car', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(car (list 1 2 3))');

      assert.equal(result, 1);
    });

    it('can cdr', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(cdr (list 1 2 3))');

      assert.deepEqual(result, [2, 3]);
    });

    it('can cons', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(cons 0 (list 1 2 3))');

      assert.deepEqual(result, [0, 1, 2, 3]);
    });

    it('have length', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(length (list 1 2 3))');

      assert.equal(result, 3);
    });

    it('can be mapped', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(map number? (list 1 length 3))');

      assert.deepEqual(result, [true, false, true]);
    });

    it('can be filtered', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(filter number? (list 1 length 3))');

      assert.deepEqual(result, [1, 3]);
    });

    it('can be reduced', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(reduce (lambda (a b) (+ a b)) (list 1 2 3))');

      assert.deepEqual(result, 6);
    });

    it('can be reduced with an initial value', function () {
      var lisp = new Lisp();

      var result = lisp.exec('(reduce (lambda (a b) (+ a b)) (list 1 2 3) 6)');

      assert.deepEqual(result, 12);
    });

    it('can find the max', function () {
      var lisp = new Lisp();

      var theMax = lisp.exec('(max (list 1 23 4 5))');

      assert.equal(theMax, 23);
    });

    it('can find the min', function () {
      var lisp = new Lisp();

      var theMin = lisp.exec('(min (list 1 23 4 5))');

      assert.equal(theMin, 1);
    });

    it('can apply', function () {
      var lisp = new Lisp();

      lisp.exec('(define x (list 1 2 3))');
      var result = lisp.exec('(apply + 1 2 3 x)');

      assert.equal(result, 12);
    });
  });

  describe('types', function () {
    it('can recognize lists', function () {
      var lisp = new Lisp();

      var isList = lisp.exec('(list? (list 1 2 3))');
      var isNotList = lisp.exec('(list? 23)');

      assert.equal(isList, true);
      assert.equal(isNotList, false);
    });

    it('can recognize null', function () {
      var lisp = new Lisp();

      var isNull = lisp.exec('(null? (list))');
      var isNotNull = lisp.exec('(null? (list 1 2 3))');

      assert.equal(isNull, true);
      assert.equal(isNotNull, false);
    });

    it('can recognize numbers', function () {
      var lisp = new Lisp();

      var isNumber = lisp.exec('(number? 12345)');
      var isNotNumber = lisp.exec('(number? (list 1 2 3))');

      assert.equal(isNumber, true);
      assert.equal(isNotNumber, false);
    });

    it('can recognize procedures', function () {
      var lisp = new Lisp();

      var isProcedure = lisp.exec('(procedure? length)');
      var isNotProcedure = lisp.exec('(procedure? (list 1 2 3))');

      assert.equal(isProcedure, true);
      assert.equal(isNotProcedure, false);
    });

    it('can negate booleans', function () {
      var lisp = new Lisp();

      var falsey = lisp.exec('(not (procedure? length))');

      assert.equal(falsey, false);
    });

    // TODO: does this even work in norvig's lispy?
    // it('can recognize symbols', function () {

    // });
  });

  describe('comparisons', function () {
    it('can check >', function () {
      var lisp = new Lisp();

      var truthy = lisp.exec('(> 23 10)');
      var falsey = lisp.exec('(> 10 23)');

      assert.equal(truthy, true);
      assert.equal(falsey, false);
    });

    it('can check <', function () {
      var lisp = new Lisp();

      var truthy = lisp.exec('(< 10 23)');
      var falsey = lisp.exec('(< 23 10)');

      assert.equal(truthy, true);
      assert.equal(falsey, false);
    });

    it('can check >=', function () {
      var lisp = new Lisp();

      var truthy = lisp.exec('(>= 23 10)');
      var falsey = lisp.exec('(>= 10 23)');
      var exactly = lisp.exec('(>= 23 23)')

      assert.equal(truthy, true);
      assert.equal(falsey, false);
      assert.equal(exactly, true);
    });

    it('can check <=', function () {
      var lisp = new Lisp();

      var truthy = lisp.exec('(<= 10 23)');
      var falsey = lisp.exec('(<= 23 10)');
      var exactly = lisp.exec('(<= 23 23)')

      assert.equal(truthy, true);
      assert.equal(falsey, false);
      assert.equal(exactly, true);
    });

    it('can check =', function () {
      var lisp = new Lisp();

      var truthy = lisp.exec('(= 23 23)');
      var falsey = lisp.exec('(= 23 10)');

      assert.equal(truthy, true);
      assert.equal(falsey, false);
    });

    it('can check and', function () {
      var lisp = new Lisp();

      var truthyCode = '(= 23 23)';
      var falseyCode = '(= 23 10)';

      var truthy = lisp.exec('(and ' + truthyCode + ' ' + truthyCode + ')');
      var falsey = lisp.exec('(and ' + truthyCode + ' ' + falseyCode + ')');

      assert.equal(truthy, true);
      assert.equal(falsey, false);
    });

    it('can check or', function () {
      var lisp = new Lisp();

      var truthyCode = '(= 23 23)';
      var falseyCode = '(= 23 10)';

      var truthy = lisp.exec('(or ' + truthyCode + ' ' + falseyCode + ')');
      var falsey = lisp.exec('(or ' + falseyCode + ' ' + falseyCode + ')');

      assert.equal(truthy, true);
      assert.equal(falsey, false);
    });
  });
});
