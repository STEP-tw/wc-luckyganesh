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
    'lines':'line1\nline2',
    'numbers': '1\n2\n3\n4\n5\n6\n7\n8'
};
const fs = createFileSystem(files);

describe("wc", function() {
  it("should returm all options for single file of single line", function() {
    const actual = wc(['file'], fs);
    const expected = "       0       2       9 file";

    assert.equal(actual, expected);
  });

  it("should return all options as 0 for single empty file", function(){
    const actual = wc(['emptyFile'], fs);
    const expected = "       0       0       0 emptyFile";

    assert.equal(actual, expected);
  });
  it('should return all options for single file of multiple lines', function() {
    const actual = wc(['lines'],fs);
    const expected = '       1       2      11 lines';

    assert.deepEqual(actual,expected);
  });
  it('should return only no of lines for a single file', function() {
      const actual = wc(['-l','numbers'],fs);
      const expected = '       7 numbers';

      assert.deepEqual(actual,expected);
  });
  it('should return only no of words for a single file', function() {
    const actual = wc(['-w','numbers'],fs);
    const expected = '       8 numbers';

    assert.deepEqual(actual,expected);
  });
  it('should return only no of words for a single file', function() {
    const actual = wc(['-c','numbers'],fs);
    const expected = '      15 numbers';

    assert.deepEqual(actual,expected);
  });
  it('should return the no of words and no of characters for a single file', function() {
    const actual = wc(['-wc','numbers'],fs);
    const expected = '       8      15 numbers';

    assert.deepEqual(actual,expected);
  });
  it('should return the no of lines and no of words for a single file', function() {
    const actual = wc(['-lw','numbers'],fs);
    const expected = '       7       8 numbers';

    assert.deepEqual(actual,expected);
  });
  it('should return all options when given for a single file', function() {
    const actual = wc(['-lwc','numbers'],fs);
    const expected = '       7       8      15 numbers';

    assert.deepEqual(actual,expected);
  });
  it('should return no of lines and no of words when option given by space',() => {
      const actual = wc(['-l','-w','numbers'],fs);
      const expected = '       7       8 numbers';

      assert.deepEqual(actual,expected);
  });
  it('should return all options when options given by space', () => {
      const actual = wc(['-l','-wc','numbers'],fs);
      const expected = '       7       8      15 numbers';

      assert.deepEqual(actual,expected);
  })
});
