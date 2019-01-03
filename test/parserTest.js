/* eslint-env mocha */

const assert = require('assert');
const { parseInputs } = require('../src/parser.js');

describe('parseInput', function() {
  it('["-lineCount","file1"]', function() {
    let userInput = ['-l', 'file1'];
    let expectedOutput = { err : '' ,fileNames: ['file1'], options: ['lineCount']};
    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });

  it('["-w","file1"]', function() {
    let userInput = ['-w', 'file1'];
    let expectedOutput = { err : '',fileNames: ['file1'], options: ['wordCount']};
    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });

  it('["-c","file1"]', function() {
    let userInput = ['-c', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: ['characterCount']};
    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });

  it('["file1"]', function() {
    let userInput = ['file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: ['lineCount', 'wordCount', 'characterCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });
  it('["file1","file2"]', function() {
    let userInput = ['file1', 'file2'];
    let expectedOutput = {err:'', fileNames: ['file1', 'file2'], options: ['lineCount', 'wordCount', 'characterCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });
  it('["-lw","file1"]', function() {
    let userInput = ['-lw', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: ['lineCount', 'wordCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });

  it('["-wl","file1"]', function() {
    let userInput = ['-wl', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: [ 'lineCount', 'wordCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });

  it('["-cl","file1"]', function() {
    let userInput = ['-cl', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: [ 'lineCount' , 'characterCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });
  it('["-lc","file1"]', function() {
    let userInput = ['-lc', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: ['lineCount', 'characterCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });

  it('["-wc","file1"]', function() {
    let userInput = ['-wc', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: ['wordCount', 'characterCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });

  it('["-cw","file1"]', function() {
    let userInput = ['-cw', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: [ 'wordCount', 'characterCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });
  it('["-lcw","file1"]', function() {
    let userInput = ['-lcw', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: ['lineCount',  'wordCount' ,'characterCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });

  it('["-lwc","file1"]', function() {
    let userInput = ['-lwc', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: ['lineCount', 'wordCount', 'characterCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });

  it('["-wcc","file1"]', function() {
    let userInput = ['-wcc', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: ['wordCount', 'characterCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });
  it('["-wlc","file1"]', function() {
    let userInput = ['-wlc', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: [ 'lineCount', 'wordCount','characterCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });

  it('["-wll","file1"]', function() {
    let userInput = ['-wll', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: [ 'lineCount' , 'wordCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });

  it('["-cw","file1"]', function() {
    let userInput = ['-cw', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: [ 'wordCount', 'characterCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });
  it('["-l","-w",file1"]', function() {
    let userInput = ['-l', '-w', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: ['lineCount', 'wordCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });

  it('["-l","-c",file1"]', function() {
    let userInput = ['-l', '-c', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: ['lineCount', 'characterCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });

  it('["-w","-c","file1"]', function() {
    let userInput = ['-w', '-c', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: ['wordCount', 'characterCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });

  it('["-w","-l",file1"]', function() {
    let userInput = ['-w', '-l', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: ['lineCount', 'wordCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });
  it('["-c","-l","file1"]', function() {
    let userInput = ['-c', '-l', 'file1'];

    let expectedOutput = {err:'', fileNames: ['file1'], options: ['lineCount', 'characterCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });
  it('["-c","-w","file1"]', function() {
    let userInput = ['-c', '-w', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: [ 'wordCount' ,'characterCount' ]};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });

  it('["-l","-c","-w","file1"]', function() {
    let userInput = ['-l', '-c', '-w', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: ['lineCount', 'wordCount' ,'characterCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });

  it('["-l","-w","-c","file1"]', function() {
    let userInput = ['-l', '-w', '-c', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: ['lineCount', 'wordCount', 'characterCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });
  it('["-w","-l","-c","file1"]', function() {
    let userInput = ['-w', '-l', '-c', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: ['lineCount','wordCount',  'characterCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });

  it('["-w","-c","-l","file1"]', function() {
    let userInput = ['-w', '-c', '-l', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: [ 'lineCount' , 'wordCount', 'characterCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });

  it('["-c","-w","-l","file1"]', function() {
    let userInput = ['-c', '-w', '-l', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: [ 'lineCount','wordCount','characterCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });
  it('["-c","-l","-w","file1"]', function() {
    let userInput = ['-c', '-l', '-w', 'file1'];
    let expectedOutput = {err:'', fileNames: ['file1'], options: [ 'lineCount', 'wordCount' ,'characterCount']};

    assert.deepEqual(parseInputs(userInput), expectedOutput);
  });
});
