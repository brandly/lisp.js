# lisp.js

with inspiration from @maryrosecook's [little lisp interpreter](http://maryrosecook.com/blog/post/little-lisp-interpreter) and norvig's [lispy](http://norvig.com/lispy.html)

don't use this for anything that matters pls

### usage

```js
var Lisp = require('./');

var lisp = new Lisp();
console.log(lisp.execute('(+ 2 2)'));
```

### testing

```shell
$ npm install
$ npm test
```
