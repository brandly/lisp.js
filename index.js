var parse = require('./lib/parse');
var eval = require('./lib/eval');
var Context = require('./lib/context');
var stdlib = require('./lib/stdlib');

module.exports = Lisp;

function Lisp(context) {
  this.globalContext = context || new Context(stdlib);
};

Lisp.prototype.exec = function exec(str) {
  const results = parse(str).map((statement) => eval(statement, this.globalContext));
  return results[results.length - 1];
};
