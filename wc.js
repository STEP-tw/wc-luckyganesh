const fs = require('fs');
const { wc } = require('./src/lib');

const main = function(){
  console.log(wc(process.argv[2],fs));
}

main();