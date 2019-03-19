import * as React from "react";
import Component from "../../../lib/model/component";
import { ElementType } from "../../../lib/model/template";

const ChildComponent: Component = {
  fileName: "ChildElement",
  template: {
    root: {
      name: "p",
      type: ElementType.Element,
      props: {},
      children: [{ type: ElementType.Text, text: "{{ greeting }}" }]
    }
  }
};

export const compDescriptor: Component = {
  fileName: "ExpectedClass",
  template: {
    root: {
      name: "div",
      type: ElementType.Element,
      props: {},
      children: [
        {
          name: "ChildComponent",
          type: ElementType.Element,
          props: {
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
    data() {
      return {
        greeting: "hello world"
      };
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
