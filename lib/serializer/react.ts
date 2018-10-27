import { TemplateElement } from "../model/template";
import { FileDescriptor } from "../model/file";

const react = (name, template) => `
class ${name} extends React.Component {
  render() {
    return ${template};
  }
}
`;

export default class ReactSerializer {
  serialize(file: FileDescriptor) {
    const name = file.name;
    const template = this.template(file.template);
    return react(name, template);
  }

  private template(json: TemplateElement | string): string | any {
    if (typeof json === "string") return `"${json}"`;
    const tagName = json.tagName;
    const props = JSON.stringify(json.props);
    const children = this.getChildren(json.children);
    return `React.createElement("${tagName}", ${props}, ${children})`;
  }

  private getChildren(children) {
    if (children.length === 1) return this.template(children[0]);
    return `[${children.map(c => this.template(c)).join(",")}]`;
  }
}
