# lisp.js

[![Build Status](https://travis-ci.org/brandly/lisp.js.svg?branch=master)](https://travis-ci.org/brandly/lisp.js)

with inspiration from [@maryrosecook](https://github.com/maryrosecook)'s [little lisp interpreter](http://maryrosecook.com/blog/post/little-lisp-interpreter) and norvig's [lispy](http://norvig.com/lispy.html)

don't use this for anything that matters pls

```shell
$ npm install --save brandly-lisp
```

### usage

use it with node

```js
var Lisp = require('brandly-lisp');

var lisp = new Lisp();
console.log(lisp.exec('(+ 2 2)'));
//  => 4
```

or you can use it in a browser

```html
<script src="dist/lisp.js">
<script>
  var lisp = new Lisp();
  console.log(lisp.exec('(+ 2 2)'));
  //  => 4
</script>
```

or you can [try it out online](http://brandly.github.io/lisp-repl/)

or [install the cli](https://github.com/brandly/lisp-cli#readme)

### development

```shell
$ npm install
$ npm test
```

to build a standalone file for the browser

```shell
$ npm run browser
```
