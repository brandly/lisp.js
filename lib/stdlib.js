
module.exports = {
  'pi': Math.PI,

  '+': reduceArguments(function (a, b) {
    return a + b;
  }),

  '-': function () {
    if (arguments.length === 1) {
      return -arguments[0]
    } else {
      return reduceArguments(function (a, b) {
        return a - b;
      }).apply(null, arguments);
    }
  },

  '*': reduceArguments(function (a, b) {
    return a * b;
  }),

  '/': reduceArguments(function (a, b) {
    return a / b;
  }),

  '>': function (a, b) {
    return a > b;
  },

  '<': function (a, b) {
    return a < b;
  },

  '>=': function (a, b) {
    return a >= b;
  },

  '<=': function (a, b) {
    return a <= b;
  },

  '=': function (a, b) {
    return a === b;
  },

  abs: Math.abs,

  append: function (a, b) {
    return a.concat(b);
  },

  apply: function () {
    var args = toArray(arguments),
        procedure = args[0],
        list = args[args.length - 1];

    var argsWithList = args.slice(1, args.length - 1).concat(list);
    return procedure.apply(null, argsWithList);
  },

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

  'eq?': function (a, b) {
    return a === b;
  },

  'equal?':  function (a, b) {
    return a == b;
  },

  length: function (list) {
    return list.length;
  },

  list: function () {
    return toArray(arguments);
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

  and: reduceArguments(function (a, b) {
    return a && b
  }),

  or: reduceArguments(function (a, b) {
    return a || b
  }),

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
  },

  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan
};

function reduceArguments(fn) {
  return function () {
    return Array.prototype.reduce.call(arguments, fn);
  }
}

function toArray(nonArray) {
  return Array.prototype.slice.call(nonArray);
}
