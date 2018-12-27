const assert = require("assert");

const {
  formatOuput,
  format,
  addCounts,
  justifier,
  repeatSpaces
} = require("../src/formatOutput.js");

describe("repeatSpaces", () => {
  it("should return empty string for length of zero", () => {
    const actual = repeatSpaces(0);
    const expected = "";

    assert.equal(actual, expected);
  });
  it("should return single space for length of one", () => {
    const actual = repeatSpaces(1);
    const expected = " ";

    assert.equal(actual, expected);
  });
  it("should return multi space for length of more than one", () => {
    const actual = repeatSpaces(4);
    const expected = "    ";

    assert.equal(actual, expected);
  });
});

describe("justifier", function() {
  it("should return 8 spaces for empty string as input", () => {
    const actual = justifier("");
    const expected = "        ";

    assert.equal(actual, expected);
  });
  it("should return length of spaces for empty string as input", () => {
    const actual = justifier("", 4);
    const expected = "    ";

    assert.equal(actual, expected);
  });
  it("should give justified output with default length of 8", () => {
    const actual = justifier("hi");
    const expected = "      hi";

    assert.equal(actual, expected);
  });
  it("should give justified output with the length given", () => {
    const actual = justifier("hi", 3);
    const expected = " hi";

    assert.equal(actual, expected);
  });
});

describe("addCounts", function() {
  it("should calculate the total counts as zero for input files does not contain anything", function() {
    const file1 = {
      lineCount: 0,
      wordCount: 0,
      characterCount: 0
    };
    const file2 = {
      lineCount: 0,
      wordCount: 0,
      characterCount: 0
    };
    const actual = addCounts(file1, file2);
    const expected = {
      lineCount: 0,
      wordCount: 0,
      characterCount: 0
    };

    assert.deepEqual(actual, expected);
  });
  it("should calculate the total counts for input files contain some counts", function() {
    const file1 = {
      lineCount: 1,
      wordCount: 2,
      characterCount: 3
    };
    const file2 = {
      lineCount: 4,
      wordCount: 5,
      characterCount: 6
    };
    const actual = addCounts(file1, file2);
    const expected = {
      lineCount: 5,
      wordCount: 7,
      characterCount: 9
    };

    assert.deepEqual(actual, expected);
  });
});

describe("format", function() {
  const file = {
    fileName: "file",
    lineCount: 1,
    wordCount: 2,
    characterCount: 3
  };
  it("should return the format of all counts and fileName", function() {
    const actual = format(["l", "w", "c"], file);
    const expected = "       1       2       3 file";

    assert.deepEqual(actual, expected);
  });
  it("should return the format of line counts and fileName when option is only l", function() {
    const actual = format(["l"], file);
    const expected = "       1 file";

    assert.deepEqual(actual, expected);
  });
  it("should return the format of word counts and fileName when option is only w", function() {
    const actual = format(["w"], file);
    const expected = "       2 file";

    assert.deepEqual(actual, expected);
  });
  it("should return the format of character counts and fileName when option is only c", function() {
    const actual = format(["c"], file);
    const expected = "       3 file";

    assert.deepEqual(actual, expected);
  });
  it("should return the format of line & character counts and fileName when option is only c", function() {
    const actual = format(["l", "c"], file);
    const expected = "       1       3 file";

    assert.deepEqual(actual, expected);
  });
});

describe("formatOutput", function() {
  describe("singleFile", () => {
    const file = {
      fileName: "file",
      isExists:true,
      lineCount: 1,
      wordCount: 2,
      characterCount: 3
    };
    const files = [file];
    it("should return the format of all counts and fileName", function() {
      const actual = formatOuput(files, ["l", "w", "c"]);
      const expected = "       1       2       3 file";

      assert.deepEqual(actual, expected);
    });
    it("should return the format of line counts and fileName when option is only l", function() {
      const actual = formatOuput(files, ["l"]);
      const expected = "       1 file";

      assert.deepEqual(actual, expected);
    });
    it("should return the format of word counts and fileName when option is only w", function() {
      const actual = formatOuput(files, ["w"]);
      const expected = "       2 file";

      assert.deepEqual(actual, expected);
    });
    it("should return the format of character counts and fileName when option is only c", function() {
      const actual = formatOuput(files, ["c"]);
      const expected = "       3 file";

      assert.deepEqual(actual, expected);
    });
    it("should return the format of line & character counts and fileName when option is only c", function() {
      const actual = formatOuput(files, ["l", "c"]);
      const expected = "       1       3 file";

      assert.deepEqual(actual, expected);
    });
  });
  describe("multiple files", () => {
    const file1 = {
      fileName: "file1",
      isExists:true,
      lineCount: 1,
      wordCount: 2,
      characterCount: 3
    };
    const file2 = {
      fileName:"file2",
      isExists:true,
      lineCount : 4,
      wordCount: 5,
      characterCount : 6
    }
    const files = [file1,file2];
    it("should return the format of all counts and fileNames and total", function() {
      const actual = formatOuput(files, ["l", "w", "c"]);
      let expected = "       1       2       3 file1\n";
          expected+= "       4       5       6 file2\n";
          expected+= "       5       7       9 total";

      assert.deepEqual(actual, expected);
    });
    it("should return the format of line counts and fileName when option is only l", function() {
      const actual = formatOuput(files, ["l"]);
      let expected = "       1 file1\n";
          expected+= "       4 file2\n";
          expected+= "       5 total";

      assert.deepEqual(actual, expected);
    });
    it("should return the format of word counts and fileName when option is only w", function() {
      const actual = formatOuput(files, ["w"]);
      let expected = "       2 file1\n";
          expected+= "       5 file2\n";
          expected+= "       7 total";

      assert.deepEqual(actual, expected);
    });
    it("should return the format of character counts and fileName when option is only c", function() {
      const actual = formatOuput(files, ["c"]);
      let expected = "       3 file1\n";
          expected+= "       6 file2\n";
          expected+= "       9 total";
      assert.deepEqual(actual, expected);
    });
    it("should return the format of line & character counts and fileName when option is only c", function() {
      const actual = formatOuput(files, ["l", "c"]);
      let expected = "       1       3 file1\n";
          expected+= "       4       6 file2\n";
          expected+= "       5       9 total";

      assert.deepEqual(actual, expected);
    });
  });
});
