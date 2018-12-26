const parseInputs = function(userArgs){
  let basicOptions = ['l','w','c']
  let options = [];
  let index = 0;
  while(userArgs[index].startsWith('-')){
    options = options.concat(userArgs[index].slice(1).split(''));
    index++;
  }
  if(options.length == 0 ){
    options = basicOptions;
  }
  fileName = userArgs[index];
  return { fileName , options };
};

module.exports = {
  parseInputs
}