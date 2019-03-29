import * as React from "react";

interface Props {
  greeting: string;
}

export default ({ greeting }: Props): JSX.Element => (
  <div>
    <p>{greeting} World!</p>
  </div>
);
