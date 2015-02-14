var tokenize = require('./tokenize');

module.exports = function parse(str) {
  return parenthesize(tokenize(str));
};

function parenthesize(tokens) {
  if (!tokens.length) {
    throw 'unexpected EOF while reading';
  }

  var token = tokens.shift();

  if (token === '(') {
    // Handle inner-expressions
    var list = [];
    while (tokens[0] !== ')') {
      list.push(parenthesize(tokens));
    }

    // Pop off ')'
    tokens.shift();
    return list;

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
    return token;
  } else {
    return number;
  }
}
