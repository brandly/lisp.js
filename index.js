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
