'use strict';
/*jshint asi: true */

var test = require('tape')
var runnel = require('..')

test('\nseeding one value ', function (t) {
  runnel(runnel.seed(1), function (err, val) {
    t.notOk(err, 'no error')
    t.equal(val, 1, 'passes seed as value to next function in chain')
    t.end()
  })
})

test('\nseeding three values', function (t) {
  runnel(runnel.seed(1, 2, 3), function (err, uno, dos, tres) {
    t.notOk(err, 'no error')
    t.equal(uno, 1, 'passes first')
    t.equal(dos, 2, 'passes second')
    t.equal(tres, 3, 'passes third')
    t.end()
  })
})
