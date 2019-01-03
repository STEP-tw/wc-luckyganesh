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

const fileFormat = function(files,options,console){
  files = files.map(details);
  console.log(formatOuput(files,options));
};

const reader = function(fs ,console , files, filesDetails ,options ){
  if(files.length === 0){
    return fileFormat(filesDetails,options,console);
  }
  return fs.readFile(files[0],'utf8',(err,data) => {
    let isExists = !err;
    filesDetails.push({name : files[0] , data , isExists});
    return reader(fs, console, files.slice(1),filesDetails, options);
  });
};

const getDetails = function(fs,fileNames,options,console){
  const filesDetails = [];
  return reader(fs,console,  fileNames,  filesDetails ,options );
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
  return getDetails(fs , fileNames,options,console);
};

module.exports = {
  wc
};