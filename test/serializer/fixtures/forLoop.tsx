import * as React from "react";
import { Component } from "../../../lib/model/component";

export const compDescriptor: Component = {
  fileName: "ExpectedClass",
  template: {
    root: {
      name: "ul",
      children: [
        {
          name: "li",
          attrs: { "v-for": "item in items" },
          children: [{ type: "text", text: "{{item}}" }]
        }
      ],
      attrs: {}
    }
  },
  script: {
    components: {},
    data: {
      items: ["Foo", "Bar"]
    },
    props: {}
  }
};

export class ExpectedClass extends React.Component {
  state = { items: ["Foo", "Bar"] };

  render() {
    return (
      <ul>
        {this.state.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }
}
