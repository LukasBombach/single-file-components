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
    const serializeChild = child => this.template(child);
    const tagName = json.tagName;
    const props = JSON.stringify(json.props);
    const children = json.children.map(serializeChild).join(",");
    return `React.createElement("${tagName}", ${props}, [${children}])`;
  }
}
