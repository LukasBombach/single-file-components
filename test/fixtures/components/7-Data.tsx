import * as React from "react";

export default class Data extends React.Component {
  state = {
    greeting: "Hello"
  };

  render() {
    return (
      <div>
        <p>{this.state.greeting} World!</p>
      </div>
    );
  }
}
