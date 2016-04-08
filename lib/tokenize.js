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
