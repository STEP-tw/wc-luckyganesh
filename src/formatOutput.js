const { NEWLINE, EMPTY, SPACE, filecounts, TOTAL } = require("./constants.js");

const repeatSpaces = function(count) {
  return new Array(count).fill(SPACE).join(EMPTY);
};

const justifier = function(string, length = 8) {
  const spacesRequired = length - (EMPTY + string).length;
  return repeatSpaces(spacesRequired) + string;
};

const format = function(options, fileDetails) {
  const counts = options
    .map(option => justifier(fileDetails[filecounts[option]]))
    .join(EMPTY);
  return counts + SPACE + fileDetails.fileName;
};

const addCounts = function(file1, file2) {
  return {
    lineCount: file1.lineCount + file2.lineCount,
    wordCount: file1.wordCount + file2.wordCount,
    characterCount: file1.characterCount + file2.characterCount
  };
};

const formatOuput = function(files, options) {
  let totalCounts = { lineCount: 0, wordCount: 0, characterCount: 0 };
  let contentToShow = files.map(file => {
    totalCounts = addCounts(totalCounts, file);
    return format(options, file);
  });
  if (files.length > 1) {
    totalCounts.fileName = TOTAL;
    contentToShow.push(format(options, totalCounts));
  }
  return contentToShow.join(NEWLINE);
};

module.exports = {
  formatOuput
};
