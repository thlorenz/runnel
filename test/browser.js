var test = require('tape').test
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
