const { formatOuput } = require("./formatOutput.js");

const { NEWLINE, EMPTY, SPACE, ENCODINGFORMAT, wcOptions } = require("./constants.js");

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

const orderoptions = function(options) {
  return wcOptions.filter(x => options.includes(x));
};

const getErrOptions = function(options){
  const errOptions = options.filter(option => !wcOptions.includes(option));
  return errOptions;
}

const wcUsage = "usage: wc [-clmw] [file ...]";

const showError = function(option){
  return ("wc: illegal option -- "+option+"\n"+wcUsage);
}

const wc = function(userArgs, fs) {
  let { fileNames, options } = parseInputs(userArgs);
  let errOptions = getErrOptions(options);
  if(errOptions.length){
    return showError(errOptions[0]);
  }
  options = orderoptions(options);
  const files = fileNames.map(getDetails.bind(null, fs));
  return formatOuput(files, options);
};

module.exports = {
  wc
};
