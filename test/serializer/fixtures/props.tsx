import * as React from "react";
import { ComponentDescriptor } from "../../../lib/model/component";

const ChildComponent: ComponentDescriptor = {
  fileName: "ChildElement",
  template: {
    root: {
      tagName: "p",
      attrs: {},
      children: ["{{ greeting }}"]
    }
  }
};

export const compDescriptor: ComponentDescriptor = {
  fileName: "ExpectedClass",
  template: {
    root: {
      tagName: "div",
      attrs: {},
      children: [
        {
          tagName: "ChildComponent",
          attrs: {
            ":greeting": "greeting"
          },
          children: []
        }
      ]
    }
  },
  script: {
    components: {
      ChildComponent
    },
    data: {
      greeting: "hello world"
    },
    props: {}
  }
};

interface childProps {
  greeting: string;
}

class ChildElement extends React.Component<childProps> {
  render() {
    return <p>{this.props.greeting}</p>;
  }
}

export class ExpectedClass extends React.Component {
  state = { greeting: "hello world" };

  render() {
    return (
      <div>
        <ChildElement greeting={this.state.greeting} />
      </div>
    );
  }
}
