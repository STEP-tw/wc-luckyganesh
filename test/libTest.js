/* eslint-env mocha */

const assert = require('assert');
const {
  wc
} = require('../src/lib.js');

const createFileSystem = function (files) {
  return {
    readFile: function (fileName,buffer,func) {
      let err = !(Object.keys(files).includes(fileName))?true:null;
      return func(err , files[fileName]);
    }
  };
};

const files = {
  emptyFile: '',
  file: 'some text',
  lines: 'line1\nline2',
  numbers: '1\n2\n3\n4\n5\n6\n7\n8'
};
const fs = createFileSystem(files);

describe('wc', function () {
  const console = {
    stdout:'',
    log:function(x){this.stdout = x;}
  };
  beforeEach(() => console.stdout='');
  it('should returm all options for single file of single line', function () {
    wc(['file'], fs, console);
    const expected = '       0       2       9 file';

    assert.equal(console.stdout, expected);
  });

  it('should return all options as 0 for single empty file', function () {
    wc(['emptyFile'], fs, console);
    const expected = '       0       0       0 emptyFile';

    assert.equal(console.stdout, expected);
  });
  it('should return all options for single file of multiple lines', function () {
    wc(['lines'], fs,console);
    const expected = '       1       2      11 lines';

    assert.deepEqual(console.stdout, expected);
  });
  it('should return only no of lines for a single file', function () {
    wc(['-l', 'numbers'], fs,console);
    const expected = '       7 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should return only no of words for a single file', function () {
    wc(['-w', 'numbers'], fs , console);
    const expected = '       8 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should return only no of words for a single file', function () {
    wc(['-c', 'numbers'], fs , console);
    const expected = '      15 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should return the no of words and no of characters for a single file', function () {
    wc(['-wc', 'numbers'], fs , console);
    const expected = '       8      15 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should return the no of lines and no of words for a single file', function () {
    wc(['-lw', 'numbers'], fs , console);
    const expected = '       7       8 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should return all options when given for a single file', function () {
    wc(['-lwc', 'numbers'], fs , console);
    const expected = '       7       8      15 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should return no of lines and no of words when option given by space', () => {
    wc(['-l', '-w', 'numbers'], fs , console);
    const expected = '       7       8 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should return all options when options given by space', () => {
    wc(['-l', '-wc', 'numbers'], fs , console);
    const expected = '       7       8      15 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should count lines and words when -wl is specified', () => {
    wc(['-wl', 'numbers'], fs , console);
    const expected = '       7       8 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should count lines and bytes when -cl is specified', () => {
    wc(['-cl', 'numbers'], fs , console);
    const expected = '       7      15 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should count words and bytes when -cw is specified', () => {
    wc(['-cw', 'numbers'], fs , console);
    const expected = '       8      15 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should count words, lines and bytes when -lcw is specified', () => {
    wc(['-lcw', 'numbers'], fs , console);
    const expected = '       7       8      15 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should count words, lines and bytes when -clw is specified', () => {
    wc(['-clw', 'numbers'], fs , console);
    const expected = '       7       8      15 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should count words, lines and bytes when -cwl is specified', () => {
    wc(['-cwl', 'numbers'], fs , console);
    const expected = '       7       8      15 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should count words, lines and bytes when -wlc is specified', () => {
    wc(['-wlc', 'numbers'], fs , console);
    const expected = '       7       8      15 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should count words, lines and bytes when -wcl is specified', () => {
    wc(['-wcl', 'numbers'], fs , console);
    const expected = '       7       8      15 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should count lines and words when -w -l is specified', () => {
    wc(['-w', '-l', 'numbers'], fs , console);
    const expected = '       7       8 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should count lines and bytes when -c -l is specified', () => {
    wc(['-c', '-l', 'numbers'], fs , console);
    const expected = '       7      15 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should count words and bytes when -c -w is specified', () => {
    wc(['-c', '-w', 'numbers'], fs , console);
    const expected = '       8      15 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should count words, lines and bytes when -l -c -w is specified', () => {
    wc(['-l', '-c', '-w', 'numbers'], fs , console);
    const expected = '       7       8      15 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should count words, lines and bytes when -c -l -w is specified', () => {
    wc(['-l', '-c', '-w', 'numbers'], fs , console);
    const expected = '       7       8      15 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should count words, lines and bytes when -c -w -l is specified', () => {
    wc(['-l', '-c', '-w', 'numbers'], fs , console);
    const expected = '       7       8      15 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should count words, lines and bytes when -w -l -c is specified', () => {
    wc(['-l', '-c', '-w', 'numbers'], fs , console);
    const expected = '       7       8      15 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('should count words, lines and bytes when -w -c -l is specified', () => {
    wc(['-l', '-c', '-w', 'numbers'], fs , console);
    const expected = '       7       8      15 numbers';

    assert.deepEqual(console.stdout, expected);
  });
  it('without arguments provides line, word and byte count and a total for multiple files', () => {
    wc(['numbers', 'file'], fs , console);
    let expected = '       7       8      15 numbers\n';
    expected += '       0       2       9 file\n';
    expected += '       7      10      24 total';

    assert.deepEqual(console.stdout, expected);
  });
  it('with arguments provides line, word and byte count and a total for multiple files', () => {
    wc(['-l', '-w', '-c', 'numbers', 'file'], fs , console);
    let expected = '       7       8      15 numbers\n';
    expected += '       0       2       9 file\n';
    expected += '       7      10      24 total';

    assert.deepEqual(console.stdout, expected);
  });
  it('with arguments provides line counts and a total for multiple files', () => {
    wc(['-l', 'numbers', 'file'], fs , console);
    let expected = '       7 numbers\n';
    expected += '       0 file\n';
    expected += '       7 total';

    assert.deepEqual(console.stdout, expected);
  });
  it('with arguments provides word counts and a total for multiple files', () => {
    wc(['-w', 'numbers', 'file'], fs , console);
    let expected = '       8 numbers\n';
    expected += '       2 file\n';
    expected += '      10 total';

    assert.deepEqual(console.stdout, expected);
  });
  it('with arguments provides byte counts and a total for multiple files', () => {
    wc(['-c', 'numbers', 'file'], fs , console);
    let expected = '      15 numbers\n';
    expected += '       9 file\n';
    expected += '      24 total';

    assert.deepEqual(console.stdout, expected);
  });
  it('should return invalid option error', () => {
    wc(['-p', 'numbers'], fs , console);
    let expected = 'wc: illegal option -- p\n';
    expected += 'usage: wc [-clmw] [file ...]';

    assert.equal(console.stdout, expected);
  });
  it('should return invalid file error msg for single file', () => {
    wc(['-l', 'temp'], fs , console);
    const expected = 'wc: temp: open: No such file or directory';

    assert.equal(console.stdout, expected);
  });
});