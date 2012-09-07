# runnel [![Build Status](https://secure.travis-ci.org/thlorenz/runnel.png)](http://travis-ci.org/thlorenz/runnel)

**run·nel/ˈrənl/** -  *A narrow channel in the ground for liquid to flow through.*

Simple and small (~30 loc) flow control library to execute async functions in sequence.

## Installation

    npm install runnel

## Example

```javascript
var runnel = require('runnel');

function uno (cb) {
  setTimeout(function () { cb(null, 'eins'); } , 100);
}

function dos (resuno, cb) {
  setTimeout(function () { cb(null, resuno, 'zwei'); } , 100);
}

function tres (resuno, resdos, cb) {
  setTimeout(function () { cb(null, resuno, resdos, 'drei'); } , 100);
}

runnel([ uno , dos , tres ]
  , function (err, uno, dos, tres) {
      if (err) 
        console.error('Error: ', err);
      else
        console.log('Success: uno: %s, dos: %s, tres: %s', uno, dos, tres);
    }
);

// Outputs: Success: uno: eins, dos: zwei, tres: drei

```

## Features

- passes arbitrary number of arguments down the chain
- fails early
- *no magic*
  - no special uses of `this`
  - no context passing
  - no error supression
- adheres to known nodejs pattern i.e., callbacks are expected to be of the form `function (err[,res]*) { ... }`

## Why another flow control library

runnel was designed for super simple flow control in order to avoid nesting or
functions calling others from inside which makes code hard to follow.

It should also help avoiding repetitive `if (err) { cb(err); return; } ...` occurences in your code.

I tried lots of others like [async](https://github.com/caolan/async), [step](https://github.com/creationix/step) and [asyncjs](https://github.com/fjakobs/async.js).

They may be preferable in lots of cases, but for what I needed 90% of the time,
a simple sequential (i.e., I don't need parallel execution that often -
really), they didn't fit the bill for one or more of the following:

- too much magic around passing arguments
- errors being swallowed (have fun debugging)
- too large since lots of extra functionality that's not needed in most cases is baked in

## More Examples

Looky here: [examples](https://github.com/thlorenz/runnel/tree/master/examples) or consult the [tests](https://github.com/thlorenz/runnel/tree/master/tests).
