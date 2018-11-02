import { ElementDescriptor, AttrsDescriptor } from "../../model/template";

export default class ReactTemplateSerializer {
  public serialize(el: ElementDescriptor | string): string {
    if (typeof el === "string") return this.serializeString(el);
    return this.serializeTemplateDescriptor(el);
  }

  private serializeString(str: string): string {
    const variables = /\{\{\s*(\S+?)\s*\}\}/g;
    return `\`${str}\``.replace(variables, "${template.$1}");
  }

  private serializeTemplateDescriptor(el: ElementDescriptor): string {
    const tagName = el.tagName;
    const props = this.getProps(el.attrs);
    const children = this.getChildren(el.children);
    return `React.createElement("${tagName}", ${props}, ${children})`;
  }

  private getProps(attrs: AttrsDescriptor): string {
    return JSON.stringify(attrs);
  }

  private getChildren(children: (string | ElementDescriptor)[]): string {
    if (children.length === 1) return this.serialize(children[0]);
    return `[${children.map(c => this.serialize(c)).join(",")}]`;
  }
}
