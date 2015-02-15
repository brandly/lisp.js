# lisp.js

with inspiration from [@maryrosecook](https://github.com/maryrosecook)'s [little lisp interpreter](http://maryrosecook.com/blog/post/little-lisp-interpreter) and norvig's [lispy](http://norvig.com/lispy.html)

don't use this for anything that matters pls

### usage

```js
var Lisp = require('./');

var lisp = new Lisp();
console.log(lisp.exec('(+ 2 2)'));
//  => 4
```

or you can use it more interactively

```shell
$ node repl
lisp.js v0.0.1
>> (+ 2 2)
4
>> (define dude (+ 2 2))
>> dude
4
>> (* 2 dude)
8
>> (define fact (lambda (n) (if (<= n 1) 1 (* n (fact (- n 1))))))
>> (fact 10)
3628800
>>
```

### testing

```shell
$ npm install
$ npm test
```
