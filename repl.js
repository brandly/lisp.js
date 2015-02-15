var Lisp = require('./');
var readline = require('readline');
var lisp = new Lisp();
var package = require('./package');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function(line){
  try {
    var result = lisp.exec(line);
    handleResult(result);
  } catch (e) {
    write(e.toString() + '\n');
  }

  writePrompt();
});

function write(message) {
  process.stdout.write(message);
}

function writePrompt() {
  write('>> ');
}

function handleResult(result) {
  if (typeof result !== 'undefined') {
    write(result.toString() + '\n');
  }
}

write(package.name + ' v' + package.version + '\n');
writePrompt();
