# runnel [![Build Status](https://secure.travis-ci.org/thlorenz/runnel.png)](http://travis-ci.org/thlorenz/runnel)

**run·nel/ˈrənl/** -  *A narrow channel in the ground for liquid to flow through.*

Simple and small (~60 loc) flow control library to execute async functions in sequence.

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

runnel(
    uno
  , dos
  , tres 
  , function (err, resuno, resdos, restres) {
      if (err) 
        console.error('Error: ', err);
      else
        console.log('Success: uno: %s, dos: %s, tres: %s', resuno, resdos, restres);
    }
);

// Outputs: Success: uno: eins, dos: zwei, tres: drei

```

## Features

- intuitive argument passing
- [fails early](#early-failure)
- **no magic**
  - no special (ab)uses of `this`
  - no context passing
  - no error supression
- adheres to known nodejs pattern i.e., callbacks are expected to be of the form `function (err[,res]*) { ... }`
- super small
- browser support
- AMD compliant (i.e., shimlessly works with [requirejs](https://github.com/jrburke/requirejs))

## Early failure

In order to avoid surprises runnel aborts the entire call chain once any function calls back with an error.

In that case the last function in the chain is called with the error in order to provide feedback that something went wrong.

## Why another flow control library

runnel was designed for very simple flow control to help avoid callback nesting or
functions calling others from somewhere inside which makes for hard to follow code.

From my experience this simple sequential flow control is what's needed in 90% of the cases.

It should also help in avoiding repetitive `if (err) { cb(err); return; } ...` occurences in your code.

## More Examples

Looky here: [examples](https://github.com/thlorenz/runnel/tree/master/examples) or consult the [tests](https://github.com/thlorenz/runnel/tree/master/test).

## Similar libraries with larger feature set 

- [async](https://github.com/caolan/async)
- [asyncjs](https://github.com/fjakobs/async.js)
- [step](https://github.com/creationix/step) 
- [q](https://github.com/kriskowal/q) (promises library)
