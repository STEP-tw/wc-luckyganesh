const { wcOptions ,filecounts } = require('./constants.js');

const getErr = function(options){
  const errOptions = options.filter(option => !wcOptions.includes(option));
  let err = showError(errOptions[0]);
  if(errOptions.length === 0){
    err = "";
  }
  return err;
}

const wcUsage = "usage: wc [-clmw] [file ...]";

const showError = function(option){
  return ("wc: illegal option -- "+option+"\n"+wcUsage);
}


const orderoptions = function(options) {
  return wcOptions.filter(x => options.includes(x));
};

const isNotStartsWithHyphen = function(string){
  return !string.startsWith('-');
}

const removefirstElem = function(x){
  return x.slice(1);
}
const parseInputs = function(userArgs) {
  let index = userArgs.findIndex(isNotStartsWithHyphen);
  let options = userArgs.slice(0,index).map(removefirstElem).join("").split("");
  if (index == 0) {
    options = wcOptions;
  }
  const err = getErr(options);
  let fileNames = userArgs.slice(index);
  options = orderoptions(options);
  options = options.map((option) => filecounts[option]);
  return { fileNames, options ,err };
};

module.exports = {
  parseInputs
};
