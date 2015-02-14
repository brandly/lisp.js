
module.exports = function Context(scope, parent) {
  this.scope = scope || {};
  this.parent = parent || null;

  this.get = function(identifier) {
    if (identifier in this.scope) {
      return this.scope[identifier];
    } else if (this.parent !== null) {
      return this.parent.get(identifier);
    } else {
      throw 'Undefined identifier: ' + identifier;
    }
  };

  this.set = function(identifier, value) {
    this.scope[identifier] = value;
  };
};
