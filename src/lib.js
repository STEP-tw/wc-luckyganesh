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
    data = '';
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

const fileFormat = function(options,console,files){
  files = files.map(details);
  console.log(formatOuput(files,options));
};

const filesProcessor = function( fileFormatter ,fs, fileNames, files){
  if(fileNames.length === 0){
    return fileFormatter(files);
  }
  const fileToWorkOn = fileNames[0];
  return fs.readFile(fileToWorkOn,'utf8',(err,data) => {
    let isExists = !err;
    files.push({name : fileToWorkOn , data , isExists});
    return filesProcessor(fileFormatter,fs,fileNames.slice(1),files);
  });
};

const printDetails = function(fs,fileNames,fileFormatter){
  const files = [];
  return filesProcessor(fileFormatter,fs,fileNames,files);
};

const wc = function (userArgs, fs,console) {
  let {
    fileNames,
    options,
    err
  } = parseInputs(userArgs);
  if (err) {
    console.log(err);
    return ;
  }
  const fileFormatter = fileFormat.bind(null,options,console);
  return printDetails(fs , fileNames,fileFormatter);
};

module.exports = {
  wc
};