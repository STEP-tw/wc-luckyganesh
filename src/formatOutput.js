const {
  NEWLINE,
  EMPTY,
  SPACE,
  ENCODINGFORMAT
} = require('./constants.js')

const repeatSpaces = function(count){
  return new Array(count).fill(SPACE).join(EMPTY);
}

const justifier = function(string,length = 8){
  const spacesRequired = length - (EMPTY+string).length;
  return repeatSpaces(spacesRequired)+string;
}

const orderoptions = function(options){
  let order = ['l','w','c'];
  return order.filter((x) => options.includes(x));
}

const formatOuput = function(fileDetails,inputOptions){
  let options = orderoptions(inputOptions);
  const filecounts = { 
    l : 'lineCount',
    w : 'wordCount',
    c : 'characterCount' 
  };
  let counts = options.map((option) => justifier(fileDetails[filecounts[option]])).join(EMPTY);
  return counts + SPACE + fileDetails.fileName; 
}

module.exports = {
  formatOuput
}