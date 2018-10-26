const Module = require("module");

module.exports.requireFromString = function(code, filename) {
  const module = new Module();
  module._compile(code, filename);
  return module.exports;
};
