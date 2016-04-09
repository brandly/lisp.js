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
