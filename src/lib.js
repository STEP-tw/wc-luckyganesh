const {
  formatOuput
} = require('./formatOutput.js');

const {
  EMPTY
} = require('./constants.js');

const {
  parseInputs
} = require('./parser.js');

const countNoOfLines = function (content) {
  return content.toLocaleString().split('\n').length-1;
};

const isNotEmpty = function (elem) {
  return elem !== EMPTY;
};

const countNoOfWords = function (content) {
  const words = content
    .split(/\n| |\t/)
    .filter(isNotEmpty);
  return words.length;
};

const countNoOfCharacters = function (content) {
  return content.length;
};

const getDetails = function (fs, fileName) {
  const isExists = fs.existsSync(fileName);
  let content = new Buffer.from('');
  if (isExists) {
    content = fs.readFileSync(fileName);
  }
  const lineCount = countNoOfLines(content);
  const wordCount = countNoOfWords(content.toLocaleString());
  const characterCount = countNoOfCharacters(content);
  return {
    fileName,
    isExists,
    lineCount,
    wordCount,
    characterCount
  };
};

const wc = function (userArgs, fs) {
  let {
    fileNames,
    options,
    err
  } = parseInputs(userArgs);
  if (err) {
    return err;
  }
  const files = fileNames.map(getDetails.bind(null, fs));
  return formatOuput(files, options);
};

module.exports = {
  wc
};