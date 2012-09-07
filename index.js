var slice = Array.prototype.slice;

function isFunction (obj) {
  return Object.prototype.toString.call(obj) == '[object Function]';
}

function validate (funcs) {
  if (funcs.length < 2)
    throw new Error('Give runnel at least 2 functions to do any work.');

  for (var i = 0; i < funcs.length; i++) {
    if (!isFunction(funcs[i]))
      throw new Error('All arguments passed to runnel need to be a function. Argument at (zero based) position ' + i + ' is not.');
  }
}

function runnel () {
  var funcs = slice.call(arguments);
  validate(funcs);

  var done = funcs.pop()
    , func = funcs.shift();

  function handler (err) {
    var args;

    // Bail if any of the funcs encounters a problem
    if (err) {
      args = slice.call(arguments);
      done.apply(this, args);
      return;
    }

    func = funcs.shift();

    if (func) {
      // get args without err
      args = slice.call(arguments, 1);

      // this handler becomes the callback for the current func we are calling
      args.push(handler);

      func.apply(this, args);
    } else {
      args = slice.call(arguments);
      done.apply(this, args);
    }
  }
  
  func.call(this, handler);
}


// AMD support
try {
  if (typeof define === 'function' && define.amd) {
    define(function () { return runnel; });
    return;
  }
} catch (e) {}

// If no AMD and we are in the browser, attach to window
try {
  if (window) 
    window.runnel = runnel;
    return;
} catch (e) {}

// Server side, just export
if (module && typeof module.exports === 'object') 
  module.exports = runnel;

