const React = require("react");
module.exports = function ExpectedClass() {
  const [greeting, setgreeting] = React.useState("World");
  return React.createElement("div", {}, [`Hello ${greeting}`]);
};
