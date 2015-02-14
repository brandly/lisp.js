var parse = require('./lib/parse');
var eval = require('./lib/eval');
var Context = require('./lib/context');
var stdlib = require('./lib/stdlib');

module.exports = Lisp;

function Lisp(context) {
  this.globalContext = context || new Context(stdlib);
};

Lisp.prototype.exec = function exec(str) {
  return eval(parse(str), this.globalContext);
};
