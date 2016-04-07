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
