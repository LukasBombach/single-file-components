import * as React from "react";
import * as requireFromString from "require-from-string";

export default function stringToReact(reactClass: string): typeof React.Component {
  const code = `
  const React = require('react');
  const createReactClass = require('create-react-class');
  module.exports = ${reactClass}`;
  return requireFromString(code, "test.js");
}
