var runnel = require('..');

function uno (cb) {
  cb(null, 'uno');
}

function dos (uno, cb) {
  cb(null, uno, 'dos');
}

function tres (uno, dos, cb) {
  cb(null, uno, dos, 'tres');
}

runnel(
    [ uno
    , dos
    , tres
    ]
  , function (err, uno, dos, tres) {
      if (err) 
        console.error('Error: ', err);
      else
        console.log('Success: uno: %s, dos: %s, tres: %s', uno, dos, tres);
    }
);
