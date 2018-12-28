const { wcOptions ,filecounts } = require('./constants.js');

const getErrOptions = function(options){
  const errOptions = options.filter(option => !wcOptions.includes(option));
  return errOptions;
}

const wcUsage = "usage: wc [-clmw] [file ...]";

const showError = function(option){
  return ("wc: illegal option -- "+option+"\n"+wcUsage);
}


const orderoptions = function(options) {
  return wcOptions.filter(x => options.includes(x));
};

const parseInputs = function(userArgs) {
  let options = [];
  let index = 0;
  while (index < userArgs.length && userArgs[index].startsWith("-")) {
    options = options.concat(userArgs[index].slice(1).split(""));
    index++;
  }
  if (index == 0) {
    options = wcOptions;
  }
  let fileNames = userArgs.slice(index);
  let err = getErrOptions(options);
  if(err.length){
    return { err : showError(err[0]) };
  }
  options = orderoptions(options);
  options = options.map((option) => filecounts[option]);
  return { fileNames, options };
};

module.exports = {
  parseInputs
};
