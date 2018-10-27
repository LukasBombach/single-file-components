import * as React from "react";
import { FileDescriptor } from "../../../lib/model/file";

const childElement = {
  tagName: "p",
  children: ["contents"],
  props: {},
  parent: null
};

class ChildElement extends React.Component {
  render() {
    return <p>contents</p>;
  }
}

export const fileDescriptor: FileDescriptor = {
  name: "ExpectedClass",
  template: {
    tagName: "div",
    children: [childElement],
    props: {},
    parent: null
  }
};

export class ExpectedClass extends React.Component {
  render() {
    return (
      <div>
        <ChildElement />
      </div>
    );
  }
}
