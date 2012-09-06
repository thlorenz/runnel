module.exports = function (funcs, done) {
  var func = funcs.shift();

  function handler (err) {
    var args;

    // Bail if any of the funcs encounters a problem
    if (err) {
      args = Array.prototype.slice.call(arguments);
      done.apply(this, args);
      return;
    }

    func = funcs.shift();

    if (func) {
      // get args without err
      args = Array.prototype.slice.call(arguments, 1);

      // this handler becomes the callback for the current func we are calling
      args.push(handler);

      func.apply(this, args);
    } else {
      args = Array.prototype.slice.call(arguments);
      done.apply(this, args);
    }
  }
}
