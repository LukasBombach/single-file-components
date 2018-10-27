const requireFromString = require("require-from-string");

function stringToReact(reactClass) {
  const code = `const React = require('react'); module.exports = ${reactClass};`;
  return requireFromString(code, "test.js");
}

module.exports.stringToReact = stringToReact;
