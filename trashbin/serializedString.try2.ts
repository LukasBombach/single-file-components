interface State {
  [key: string]: any;
}

export default (name: string, props: string[], state: State, template: string): string => `
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
}
