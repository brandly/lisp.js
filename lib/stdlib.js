
// TODO: comparison operators

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

  abs: Math.abs,

  append: function (a, b) {
    return a.concat(b);
  },

  // apply: apply

  begin: function () {
    return arguments[arguments.length - 1];
  },

  car: function (list) {
    return list[0];
  },

  cdr: function (list) {
    return list.slice(1);
  },

  cons: function (a, list) {
    return [a].concat(list);
  },

  // 'eq?':     op.is_,
  // 'equal?':  op.eq,

  length: function (list) {
    return list.length;
  },

  list: function () {
    return Array.prototype.slice.call(arguments);
  },

  'list?': function (thing) {
    return thing instanceof Array;
  },

  map: function (fn, list) {
    return list.map(fn);
  },

  max: function (list) {
    return Math.max.apply(null, list);
  },

  min: function (list) {
    return Math.min.apply(null, list);
  },

  mod: function (a, b) {
    return a % b;
  },

  not: function (statement) {
    return !statement;
  },

  'null?': function (thing) {
    return thing instanceof Array && !thing.length;
  },

  'number?': function (thing) {
    return typeof thing === 'number';
  },

  'procedure?': function (thing) {
    return typeof thing === 'function';
  },

  round: Math.round,

  'symbol?': function (thing) {
    return typeof thing === 'string';
  }
};

function reduceArguments(fn) {
  return function () {
    return Array.prototype.reduce.call(arguments, fn);
  }
}
