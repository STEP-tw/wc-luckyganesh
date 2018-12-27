const { wcOptions } = require('./constants.js');

const parseInputs = function(userArgs) {
  let options = [];
  let index = 0;
  while (userArgs[index].startsWith("-")) {
    options = options.concat(userArgs[index].slice(1).split(""));
    index++;
  }
  if (options.length == 0) {
    options = wcOptions;
  }
  let fileNames = userArgs.slice(index);
  return { fileNames, options };
};

module.exports = {
  parseInputs
};
