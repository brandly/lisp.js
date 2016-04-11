!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Lisp=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var parse = require('./lib/parse');
var eval = require('./lib/eval');
var Context = require('./lib/context');
var stdlib = require('./lib/stdlib');

module.exports = Lisp;

function Lisp(context) {
  this.globalContext = context || new Context(stdlib);
};

Lisp.prototype.exec = function exec(str) {
  var that = this

  var results = parse(str).map(function (statement) {
    return eval(statement, that.globalContext)
  });

  return results[results.length - 1];
};

},{"./lib/context":2,"./lib/eval":3,"./lib/parse":4,"./lib/stdlib":5}],2:[function(require,module,exports){

module.exports = Context;

function Context(scope, parent) {
  this.scope = scope || {};
  this.parent = parent || null;
};

Context.prototype.get = function get(identifier) {
  var ctx = this.findContextWithIdentifier(identifier);

  if (ctx) {
    return ctx.scope[identifier];
  } else {
    throw 'undefined identifier: ' + identifier;
  }
};

Context.prototype.set = function set(identifier, value) {
  this.scope[identifier] = value;
};

Context.prototype.findContextWithIdentifier = function (identifier) {
  if (identifier in this.scope) {
    return this;
  } else if (this.parent !== null) {
    return this.parent.findContextWithIdentifier(identifier);
  }
};

},{}],3:[function(require,module,exports){
var Context = require('./context');

module.exports = function eval(x, ctx) {
  if (ctx === undefined) {
    return eval(x, new Context({}));

  } else if (x.constructor === String) { // variable reference
    return ctx.get(x);

  } else if (x.constructor !== Array) {  // constant literal
    return x;

  } else if (x[0] === 'quote') {         // (quote exp)
    return x[1];

  } else if (x[0] === 'cond') {
    var conditionals = x.slice(1);
    var lastIndex = conditionals.length - 1;

    for (var i = 0; i < conditionals.length; i++) {
      var cond = conditionals[i],
          test = cond[0],
          conseq = cond[1];

      if ((i === lastIndex && test === 'else') || eval(test, ctx) === true) {
        return eval(conseq, ctx);
      }
    }
  } else if (x[0] === 'if') {            // (if test conseq alt)
    var test = x[1],
        conseq = x[2],
        alt = x[3];

    var exp = eval(test, ctx) ? conseq : alt;
    return eval(exp, ctx);

  } else if (x[0] === 'define') {        // (define key val)
    var key = x[1],
        val = x[2];

    ctx.set(key, eval(val, ctx));

  } else if (x[0] === 'set!') {          // (set! key val)
    var key = x[1],
        val = x[2];

    ctx.findContextWithIdentifier(key).set(key, eval(val, ctx));

  } else if (x[0] === 'lambda') {        // (lambda (params...) body)
    var params = x[1],
        body = x[2];

    return function () {
      var args = Array.prototype.slice.call(arguments);
      var lambdaCtx = new Context({}, ctx);

      params.forEach(function (param, i) {
        lambdaCtx.set(param, args[i]);
      });

      return eval(body, lambdaCtx);
    };

  } else {                               // (procedure args...)
    // Evaluate the procedure and all the args
    var procedure = eval(x[0], ctx);
    var args = x.slice(1).map(function (arg) {
      return eval(arg, ctx);
    });

    // before calling the procedure with those args
    return procedure.apply(null, args);
  }
};

},{"./context":2}],4:[function(require,module,exports){
var tokenize = require('./tokenize');

module.exports = function parse(str) {
  return parenthesize(tokenize(str)).filter(Array.isArray);
};

function parenthesize(tokens) {
  var depth = 0;
  var index = 0;
  var statements = [];

  while (tokens && index < tokens.length) {
    var token = tokens[index];

    if (token === '(') {
      depth += 1;
    } else if (token === ')') {
      depth -= 1;
    }

    if (depth < 0) {
      throw new Error('Unbalanced parentheses: unopened ")"')
    }

    if (depth === 0) {
      statements.push(tokens.splice(0, index + 1));
      index = 0;
    } else {
      index += 1;
    }
  }

  if (tokens.length) {
    throw new Error('Unbalanced parentheses: unclosed "("')
  }

  return statements.map(parenthesizeStatement)
}

function parenthesizeStatement(tokens) {
  if (!tokens.length) {
    throw 'unexpected EOF while reading';
  }

  var token = tokens.shift();

  if (token === '(') {
    // Handle inner-expressions
    var list = [];
    while (tokens[0] !== ')') {
      list.push(parenthesizeStatement(tokens));
    }

    // Pop off ')'
    tokens.shift();
    return list.filter(stringsWithLength);

  } else if (token === ')') {
    throw 'unexpected )';
  } else {
    return atom(token);
  }
}

function atom(token) {
  var number = parseFloat(token, 10);

  if (Number.isNaN(number)) {
    // It's a symbol!
    return token.trim();
  } else {
    return number;
  }
}

// Empty strings will confuse the evaluator
function stringsWithLength(thing) {
  if (typeof thing === 'string') {
    return !!thing.length
  } else {
    return true
  }
}

},{"./tokenize":6}],5:[function(require,module,exports){

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
  atan: Math.atan,

  sinh: Math.sinh,
  cosh: Math.cosh,
  tanh: Math.tanh,
  asinh: Math.asinh,
  acosh: Math.acosh,
  atanh: Math.atanh,

  expt: Math.pow,
  sqrt: Math.sqrt,

  exp: Math.exp,
  log: Math.log
};

function reduceArguments(fn) {
  return function () {
    return Array.prototype.reduce.call(arguments, fn);
  }
}

function toArray(nonArray) {
  return Array.prototype.slice.call(nonArray);
}

},{}],6:[function(require,module,exports){
var comments = /\;(.*)(\n?)/g

module.exports = function tokenize(str) {
  return str.replace(comments, '')
            .replace(/\(/g, ' ( ')
            .replace(/\)/g, ' ) ')
            .split(' ')
            .filter(hasLength);
}

function hasLength(str) {
  return str.length > 0;
}

},{}]},{},[1])(1)
});