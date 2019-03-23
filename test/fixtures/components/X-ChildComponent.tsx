import * as React from "react";

export default ({ greeting = "hello" }): JSX.Element => (
  <div>
    <p>{greeting} Child Component!</p>
  </div>
);
