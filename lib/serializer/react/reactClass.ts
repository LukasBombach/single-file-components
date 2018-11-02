export default (name: string, initalState: string, template: string): string => `
class ${name} extends React.Component {

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
