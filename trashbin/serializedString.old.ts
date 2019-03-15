interface State {
  [key: string]: any;
}

/* export default (name: string, props: string[], state: State, template: string): string => `
function ${name}(${propsAsParams(props)}) {

  ${stateHooks(state)}
  
  return ${template};
}
`;

function propsAsParams(props: string[]): string {
  return props.join(", ");
}

function stateHooks(state: State): string {
  return Object.entries(state)
    .map(([v, i]) => `const [${v}, set${v}] = useState(${i});`)
    .join("\n");
} */

function deconstructedTemplateVars(templateVars: string[]): string {
  if (!templateVars.length) return "";
  const joinedTemplateVars = templateVars.join(", ");
  return `const { ${joinedTemplateVars} } = Object.assign({}, this.state, this.props);`;
}

export default (name: string, initalState: string, template: string, templateVars: string[]): string => `
class ${name} extends React.Component {

  constructor(props) {
    super(props);
    this.state = ${initalState};
  }

  render() {
    ${deconstructedTemplateVars(templateVars)}
    return ${template};
  }
}
`;
