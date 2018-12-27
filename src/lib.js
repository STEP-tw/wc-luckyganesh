const { formatOuput } = require('./formatOutput.js')

const {
    NEWLINE,
    EMPTY,
    SPACE,
    ENCODINGFORMAT
}  = require('./constants.js');

const { parseInputs } = require('./parser.js');

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
    return content.length;
}

const getDetails = function(fs,fileName){
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

const orderoptions = function(options){
    let order = ['l','w','c'];
    return order.filter((x) => options.includes(x));
}
  
const wc = function(userArgs,fs){
    let { fileNames , options } = parseInputs(userArgs);
    options = orderoptions(options);
    let fileDetails = fileNames.map(getDetails.bind(null,fs));
    return formatOuput(fileDetails,options);
}

module.exports = {
    wc
}