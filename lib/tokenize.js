
module.exports = function tokenize(str) {
  return str.replace(/\(/g, ' ( ')
            .replace(/\)/g, ' ) ')
            .split(' ')
            .filter(hasLength);
}

function hasLength(str) {
  return str.length > 0;
}
