const { describe, it } = require("mocha");
const { expect } = require("chai");
const { evaluateRegex, InvalidRegexError } = require("./../src/util");

describe("Util", () => {
  it("#evaluateRegex should throw an error using unsafe regex", () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/;
    expect(() => evaluateRegex(unsafeRegex)).to.throw(
      InvalidRegexError,
      `This ${unsafeRegex} is unsafe dude!`
    );
  });

  it("#evaluateRegex should not throw an error using safe regex", () => {
    const safeRegex = /^([a-z])$/;
    expect(() => evaluateRegex(safeRegex)).to.not.throw;
    expect(evaluateRegex(safeRegex)).to.ok;
  });
});
