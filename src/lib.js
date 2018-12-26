const { formatOuput } = require('./formatOutput.js')

const {
    NEWLINE,
    EMPTY,
    SPACE,
    ENCODINGFORMAT
  }  = require('./constants.js');

const countNoOfLines = function(content){
    return content.split(NEWLINE).length-1;
}

const isNotEmpty = function(elem){
    return elem !== EMPTY;
}

const countNoOfWords = function(content){
    let words = content.split(NEWLINE).join(SPACE).split(SPACE).filter(isNotEmpty);
    return words.length;
}

const countNoOfCharacters = function(content){
    return content.split(EMPTY).length;
}

const getDetails = function(fileName,fs){
    let content = fs.readFileSync(fileName,ENCODINGFORMAT);
    let lineCount = countNoOfLines(content);
    let wordCount = countNoOfWords(content);
    let characterCount = countNoOfCharacters(content);
    return {
        fileName,
        lineCount,
        wordCount,
        characterCount
    }
}

const parseInputs = function(userArgs){
    let fileName = userArgs[0];
    let options = 'lwc';
    let firstArg = userArgs[0];
    if(firstArg.startsWith('-')){
        fileName = userArgs[1];
        options = firstArg.slice(1);
    }
    return { fileName , options };
};

const wc = function(userArgs,fs){
    let { fileName , options } = parseInputs(userArgs);
    let fileDetails = getDetails(fileName,fs); 
    return formatOuput(fileDetails,options);
}

module.exports = {
    wc
}