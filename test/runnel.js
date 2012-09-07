var test = require('tap').test
  , runnel = require('..')
  , unofails
  , dosfails
  , tresfails
  , unocalled
  , doscalled
  , trescalled
  ;

function uno (cb) {
  unocalled = true;
  setTimeout( 
      function () { 
        if (unofails) cb(new Error('uno failed')); 
        else cb(null, 'eins'); 
      } 
    , 10);
}

function dos (resuno, cb) {
  doscalled = true;
  setTimeout( 
      function () { 
        if (dosfails) cb(new Error('dos failed')); 
        else cb(null, resuno, 'zwei'); 
      } 
    , 10);
}

function tres (resuno, resdos, cb) {
  trescalled = true;
  setTimeout( 
      function () { 
        if (tresfails) cb(new Error('tres failed')); 
        else cb(null, resuno, resdos, 'drei'); 
      } 
    , 10);
}

function setup () {
  unofails = dosfails = tresfails = false;
  unocalled = doscalled = trescalled = false;
}

test('parameter passing', function (t) {
  t.plan(4);

  setup();

  runnel(uno, dos, tres, function (err, resuno, resdos, restres) {
    t.equal(err, null, 'no error');    
    t.equal(resuno, 'eins', 'passes first param');
    t.equal(resdos, 'zwei', 'passes second param');
    t.equal(restres, 'drei', 'passes third param');
    t.end();
  });
});

test('error handling: last in chain (tres) fails', function (t) {

  setup();
  tresfails = true;

  runnel(uno, dos, tres, function (err, resuno, resdos, restres) {
    t.plan(7);

    t.equal(err.message, 'tres failed', 'passed error');
    t.ok(unocalled, 'called uno');
    t.ok(doscalled, 'called dos');
    t.ok(trescalled, 'called tres');

    t.equal(resuno, undefined, 'no resuno');
    t.equal(resdos, undefined, 'no resdos');
    t.equal(restres, undefined, 'no restres');

    t.end();
  });
});

test('error handling: first in chain (uno) fails', function (t) {

  setup();
  unofails = true;

  runnel(uno, dos, tres, function (err, resuno, resdos, restres) {
    t.plan(7);

    t.equal(err.message, 'uno failed', 'passed error');
    t.ok(unocalled, 'called uno');
    t.notOk(doscalled, 'not called dos');
    t.notOk(trescalled, 'not called tres');

    t.equal(resuno, undefined, 'no resuno');
    t.equal(resdos, undefined, 'no resdos');
    t.equal(restres, undefined, 'no restres');

    t.end();
  });
});

test('0 arguments', function (t) {
  setup();
  t.plan(1);
  t.throws(function () { runnel(); }, { name: 'Error', message: 'Give runnel at least 2 functions to do any work.' });
});

test('1 argument', function (t) {
  setup();
  t.plan(1);
  t.throws(function () { runnel(); }, { name: 'Error', message: 'Give runnel at least 2 functions to do any work.' });
});

test('3rd argument not a function', function (t) {
  setup();
  t.plan(1);
  function f () {}
  t.throws(function () { runnel(f, f, "duh"); }, { name: 'Error', message: 'All arguments passed to runnel need to be a function. Argument at (zero based) position 2 is not.' });
});
