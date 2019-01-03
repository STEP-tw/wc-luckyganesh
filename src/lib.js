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

const details = function (file) {
  let { name , data ,isExists } = file;
  if(!isExists){
    data = "";
  }
  let lineCount = countNoOfLines(data);
  let wordCount = countNoOfWords(data.toLocaleString());
  let characterCount = countNoOfCharacters(data);
  return {
    name,
    isExists,
    lineCount,
    wordCount,
    characterCount
  };
};

const fileFormat = function(files,options,print){
  files = files.map(details);
  return print(formatOuput(files,options));
}

const getDetails = function(fs,fileNames,options,print){
  const filesDetails = [];
  const reader = function(files){
    if(files.length === 0){
      return fileFormat(filesDetails,options, print);
    }
    return fs.readFile(files[0],'utf8',(err,data) => {
      let isExists = true;
      if(err){
        isExists = false;
      }
      filesDetails.push({name : files[0] , data , isExists});
      return reader(files.slice(1));
    });
  }
  return reader(fileNames);
};

const wc = function (userArgs, fs, print) {
  let {
    fileNames,
    options,
    err
  } = parseInputs(userArgs);
  if (err) {
    return err;
  }
  return getDetails(fs , fileNames,options,print);
  // const files = fileNames.map(getDetails.bind(null, fs));
  // return formatOuput(files, options);
};

module.exports = {
  wc
};