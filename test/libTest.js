const assert = require("assert");
const { wc } = require("../src/lib.js");

const createFileSystem = function(files){
  return {
    readFileSync : function(filename, encoding){
        if(encoding === 'utf8'){
            return files[filename];
        }
    }
  };
}

const files = {
    'emptyFile': '',
    'file':'some text',
    'lines':'line1\nline2'
};
const fs = createFileSystem(files);

describe("wc", function() {
  it("should returm all options for single file of single line", function() {
    const actual = wc('file', fs);
    const expected = "       0       2       9 file";

    assert.equal(actual, expected);
  });

  it("should return all options as 0 for single empty file", function(){
    const actual = wc('emptyFile', fs);
    const expected = "       0       0       0 emptyFile";

    assert.equal(actual, expected);
  });
  it('should return all options for single file of multiple lines', function() {
    const actual = wc('lines',fs);
    const expected = '       1       2      11 lines';

    assert.deepEqual(actual,expected);
  });
});
