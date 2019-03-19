import * as React from "react";

export default function stringToReact(reactClass: string): typeof React.Component {
  return eval(`(() => {return ${reactClass};})()`);
}
