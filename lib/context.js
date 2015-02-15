
module.exports = Context;

function Context(scope, parent) {
  this.scope = scope || {};
  this.parent = parent || null;
};

Context.prototype.get = function get(identifier) {
  var ctx = this.findContextWithIdentifier(identifier);

  if (ctx) {
    return ctx.scope[identifier];
  } else {
    throw 'undefined identifier: ' + identifier;
  }
};

Context.prototype.set = function set(identifier, value) {
  this.scope[identifier] = value;
};

Context.prototype.findContextWithIdentifier = function (identifier) {
  if (identifier in this.scope) {
    return this;
  } else if (this.parent !== null) {
    return this.parent.findContextWithIdentifier(identifier);
  }
};
