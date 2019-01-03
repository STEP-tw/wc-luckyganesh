const fs = require('fs');
const { wc } = require('./src/lib');

const main = function(){
  wc(process.argv.slice(2),fs,console);
};

main();