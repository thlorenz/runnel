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


