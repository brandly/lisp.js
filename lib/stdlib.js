
module.exports = {
  'pi': Math.PI,
  '+': reduceArguments(function (a, b) {
    return a + b;
  }),
  '-': reduceArguments(function (a, b) {
    return a - b;
  }),
  '*': reduceArguments(function (a, b) {
    return a * b;
  }),
  '/': reduceArguments(function (a, b) {
    return a / b;
  }),
  'mod': function (a, b) {
    return a % b;
  },
};

function reduceArguments(fn) {
  return function () {
    return Array.prototype.reduce.call(arguments, fn);
  }
}
