import * as React from "react";
import ChildComponent from "./X-ChildComponent";

export default class HtmlWithChildComponentAndProps extends React.Component {
  state = {
    greeting: "Aloha"
  };

  render() {
    return (
      <div>
        <ChildComponent greeting={this.state.greeting} />
      </div>
    );
  }
}
