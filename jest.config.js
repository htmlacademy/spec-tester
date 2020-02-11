const merge = require("merge");
const tsPreset = require("ts-jest/jest-preset");
const puppeteerPreset = require("jest-puppeteer/jest-preset");

module.exports = merge.recursive(tsPreset, puppeteerPreset, {
  setupFilesAfterEnv: ["jest-extended"],
  globals: {
    "ts-jest": {
      diagnostics: false
    }
  },
  testTimeout: 10000
});
