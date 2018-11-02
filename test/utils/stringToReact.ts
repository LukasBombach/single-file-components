import * as React from "react";
import * as requireFromString from "require-from-string";

export default function stringToReact(reactClass: string): typeof React.Component {
  const code = `const React = require('react'); module.exports = ${reactClass}`;
  return requireFromString(code, "test.js");
}
