export default (name: string, initalState: string, template: string, templateVars: string[]): string => `
class ${name} extends React.Component {

  constructor(props) {
    super(props);
    this.state = ${initalState};
  }

  render() {
    ${templateVars.length ? `const { ${templateVars.join(", ")} } = Object.assign({}, this.state, this.props);` : ""}
    return ${template};
  }
}
`;

/* export function hookedFunction(name: string, initalState: string, template: string): string {
  return `
  function ${name}(...props) {
  
    constructor(props) {
      super(props);
      this.state = ${initalState};
    }
  
    render() {
      const template = Object.assign({}, this.state, this.props);
      return ${template};
    }
  }
  `;
} */
