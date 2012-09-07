var test = require('tap').test
  , runnelExport = require('..')
  , runnelkey = require.resolve('..')
  ;

function setup() {
  // remove runnel from require cache to force re-require for each test
  delete require.cache[runnelkey];
}

test('no window or define exist', function (t) {
  t.plan(1);
  setup();  
  var runnel = require('..');
   
  t.equal(runnel.toString(), runnelExport.toString(), 'runnel is exported');

  t.end();
});

test('window exists', function (t) {
  t.plan(2);

  setup();  
  window = { };

  var runnel = require('..');
   
  t.equal(window.runnel.toString(), runnelExport.toString(), 'runnel is attached to window');
  t.notEqual(runnel.toString(), runnelExport.toString(), 'runnel is not exported');

  t.end();
});

test('define and window exist', function (t) {
  t.plan(3);

  setup();  
  window = { };

  var defineCb;
  define = function (cb) { defineCb = cb; };
  define.amd = true;

  var runnel = require('..')
    , definedRunnel = defineCb();

   
  t.equal(window.runnel, undefined, 'runnel is not attached to window');
  t.notEqual(runnel.toString(), runnelExport.toString(), 'runnel is not exported');
  t.equal(definedRunnel.toString(), runnelExport.toString(), 'runnel is defined');

  t.end();
});
