
module.exports = Context;

function Context(scope, parent) {
  this.scope = scope || {};
  this.parent = parent || null;
};

Context.prototype.get = function get(identifier) {
  if (identifier in this.scope) {
    return this.scope[identifier];
  } else if (this.parent !== null) {
    return this.parent.get(identifier);
  } else {
    throw 'Undefined identifier: ' + identifier;
  }
};

Context.prototype.set = function set(identifier, value) {
  this.scope[identifier] = value;
};
