import * as React from "react";
import * as requireFromString from "require-from-string";

// const createReactClass = require('create-react-class');
// const { useState } = React;

export default function stringToReact(reactClass: string): typeof React.Component {
  const code = `const React = require('react');
  module.exports = ${reactClass}`;
  console.log(code);
  return requireFromString(code, "test.js");
}
