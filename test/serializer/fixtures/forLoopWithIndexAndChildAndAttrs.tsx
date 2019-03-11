import * as React from "react";
import { ComponentDescriptor } from "../../../lib/model/component";

export const compDescriptor: ComponentDescriptor = {
  fileName: "ExpectedClass",
  template: {
    root: {
      type: "element",
      name: "ul",
      children: [
        {
          type: "element",
          name: "li",
          attrs: {
            "v-for": "(image, index) in images",
            ":key": "index"
          },
          children: [
            {
              type: "element",
              name: "img",
              attrs: {
                ":src": "image.src",
                ":alt": "image.name"
              }
            }
          ]
        }
      ]
    }
  },
  script: {
    components: {},
    data: {
      images: [{ src: "foo.jpg", name: "foo" }, { src: "bar.jpg", name: "bar" }]
    },
    props: {}
  }
};

export class ExpectedClass extends React.Component {
  state = { images: [{ src: "foo.jpg", name: "foo" }, { src: "bar.jpg", name: "bar" }] };

  render() {
    return (
      <ul>
        {this.state.images.map((image, index) => {
          return (
            <li key={index}>
              <img src={image.src} alt={image.name} />
            </li>
          );
        })}
      </ul>
    );
  }
}
