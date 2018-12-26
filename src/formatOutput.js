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

const formatOuput = function(fileDetails,option){
  const options = { 
    l : 'lineCount',
    w : 'wordCount',
    c : 'characterCount' 
  }
  msg = option.split(EMPTY).map((x) => justifier(fileDetails[options[x]])).join(EMPTY);
  return msg + SPACE + fileDetails.fileName; 
}

module.exports = {
  formatOuput
}