const NEWLINE = '\n';
const EMPTY = '';
const SPACE = ' ';
const ENCODINGFORMAT = 'utf8'

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

const repeatSpaces = function(count){
    return new Array(count).fill(SPACE).join(EMPTY);
}

const justifier = function(string,length = 8){
    const spacesRequired = length - (EMPTY+string).length;
    return repeatSpaces(spacesRequired)+string;
}

const formatOuput = function(fileDetails){
    const { fileName , lineCount , wordCount , characterCount } = fileDetails;
    return justifier(lineCount)+justifier(wordCount)+justifier(characterCount)+ " " +fileName;
}

const wc = function(fileName,fs){
    let fileDetails = getDetails(fileName,fs); 
    return formatOuput(fileDetails);
}

module.exports = {
    wc
}