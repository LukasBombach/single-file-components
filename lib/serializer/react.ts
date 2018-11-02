import { ElementDescriptor } from "../model/template";
import { ComponentDescriptor } from "../model/component";

export default class ReactSerializer {
  private template = new ReactTemplateSerializer();

  public serialize(comp: ComponentDescriptor) {
    const name = comp.fileName;
    const initalState = JSON.stringify(comp.script ? comp.script.data : {});
    const template = this.template.serialize(comp.template.root);
    return this.render(name, initalState, template);
  }

  private render(name, initalState, template) {
    return `
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
  }
}

class ReactTemplateSerializer {
  public serialize(el: ElementDescriptor | string): string {
    if (typeof el === "string") return this.serializeString(el as string);
    return this.serializeTemplateDescriptor(el as ElementDescriptor);
  }

  private serializeString(str: string): string {
    const variables = /\{\{\s*(\S+?)\s*\}\}/g;
    return `\`${str}\``.replace(variables, "${template.$1}");
  }

  private serializeTemplateDescriptor(el: ElementDescriptor): string {
    const tagName = el.name;
    const props = JSON.stringify(el.attrs);
    const children = this.getChildren(el.children);
    return `React.createElement("${tagName}", ${props}, ${children})`;
  }

  private getChildren(children) {
    if (children.length === 1) return this.serialize(children[0]);
    return `[${children.map(c => this.serialize(c)).join(",")}]`;
  }
}
