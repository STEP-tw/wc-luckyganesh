const { formatOuput } = require("./formatOutput.js");

const { NEWLINE, EMPTY, SPACE, ENCODINGFORMAT  } = require("./constants.js");

const { parseInputs } = require("./parser.js");

const countNoOfLines = function(content) {
  return content.split(NEWLINE).length - 1;
};

const isNotEmpty = function(elem) {
  return elem !== EMPTY;
};

const countNoOfWords = function(content) {
  const words = content
    .split(NEWLINE)
    .join(SPACE)
    .split(SPACE)
    .filter(isNotEmpty);
  return words.length;
};

const countNoOfCharacters = function(content) {
  return content.length;
};

const getDetails = function(fs, fileName) {
  const isExists = fs.existsSync(fileName);
  let content = "";
  if(isExists){
   content = fs.readFileSync(fileName, ENCODINGFORMAT);
  }
  const lineCount = countNoOfLines(content);
  const wordCount = countNoOfWords(content);
  const characterCount = countNoOfCharacters(content);
  return {
    fileName,
    isExists,
    lineCount,
    wordCount,
    characterCount
  };
};

const wc = function(userArgs, fs) {
  let { fileNames, options , err } = parseInputs(userArgs);
  if( err ){
    return err;
  }
  const files = fileNames.map(getDetails.bind(null, fs));
  return formatOuput(files, options);
};

module.exports = {
  wc
};
