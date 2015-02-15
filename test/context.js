var Context = require('../lib/context');
var assert = require('assert');

describe('contexts', function () {
  it('should get a reference', function () {
    var ctx = new Context({key: 'value'});
    assert.equal(ctx.get('key'), 'value');
  });

  it('should get a reference from parent context', function () {
    var parent = new Context({key: 'value'});
    var ctx = new Context({}, parent);

    assert.equal(ctx.get('key'), 'value');
  });

  it('should overwrite a reference from parent context', function () {
    var parent = new Context({key: 'value'});
    var ctx = new Context({key: 'other value'}, parent);

    assert.equal(parent.get('key'), 'value');
    assert.equal(ctx.get('key'), 'other value');
  });

  it('should find the parent with a given key', function () {
    var parent = new Context({key: 'value'});
    var ctx = new Context({}, parent);

    assert.equal(ctx.findContextWithIdentifier('key'), parent);
  });
});
