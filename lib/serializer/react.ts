import { TemplateDescriptor } from "../model/template";
import { FileDescriptor } from "../model/file";

const react = (name, initalState, template) => `
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

export default class ReactSerializer {
  private template = new ReactTemplateSerializer();

  serialize(file: FileDescriptor) {
    const name = file.name;
    const initalState = JSON.stringify(file.script ? file.script.data : {});
    const template = this.template.serialize(file.template);
    return react(name, initalState, template);
  }
}

class ReactTemplateSerializer {
  public serialize(json: TemplateDescriptor | string): string | any {
    if (typeof json === "string") return this.serializeString(json as string);
    return this.serializeTemplateDescriptor(json as TemplateDescriptor);
  }

  private serializeString(str: string): string | any {
    const variables = /\{\{\s*(\S+?)\s*\}\}/g;
    return `\`${str}\``.replace(variables, "${template.$1}");
  }

  private serializeTemplateDescriptor(json: TemplateDescriptor): string | any {
    const tagName = json.tagName;
    const props = JSON.stringify(json.props);
    const children = this.getChildren(json.children);
    return `React.createElement("${tagName}", ${props}, ${children})`;
  }

  private getChildren(children) {
    if (children.length === 1) return this.serialize(children[0]);
    return `[${children.map(c => this.serialize(c)).join(",")}]`;
  }
}
