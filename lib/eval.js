
module.exports = function eval(x, ctx) {
  if (ctx === undefined) {
    return eval(x, new Context({}));

  } else if (x.constructor === String) { // variable reference
    return ctx.get(x);

  } else if (x.constructor !== Array) {  // constant literal
    return x;

  } else if (x[0] === 'quote') {         // (quote exp)
    return x[1];

  } else if (x[0] === 'if') {            // (if test conseq alt)
    var test = x[1],
        conseq = x[2],
        alt = x[3];

    var exp = eval(test, ctx) ? conseq : alt;
    return eval(exp, ctx);

  } else if (x[0] === 'define') {        // (define var exp)
    var key = x[1],
        val = x[2];

    ctx.set(key, eval(val, ctx));

  } else if (x[0] === 'set!') {          // (set! var exp)
    var key = x[1],
        val = x[2];

    ctx.findContextWithIdentifier(key).set(key, eval(val, ctx));

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
