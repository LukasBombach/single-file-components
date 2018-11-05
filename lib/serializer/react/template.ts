import { ElementDescriptor, AttrsDescriptor } from "../../model/template";
import { ComponentDescriptor } from "../../model/component";
import ReactSerializer from ".";
import ReactAttrsSerializer from "./attrs";

export default class ReactTemplateSerializer {
  private comp: ComponentDescriptor;

  constructor(comp: ComponentDescriptor) {
    this.comp = comp;
  }

  public getReactElement(): string {
    return this.serialize(this.comp.template.root);
  }

  private serialize(el: ElementDescriptor | string): string {
    if (typeof el === "string") return this.serializeString(el);
    return this.serializeElementDescriptor(el);
  }

  private serializeString(str: string): string {
    const variables = /\{\{\s*(\S+?)\s*\}\}/g;
    return `\`${str}\``.replace(variables, "${template.$1}");
  }

  private serializeElementDescriptor(el: ElementDescriptor): string {
    const reactEl = this.getElement(el.tagName);
    const props = this.getProps(el.attrs);
    const children = this.getChildren(el.children);
    return `React.createElement(${reactEl}, ${props}, ${children})`;
  }

  private getElement(tagName) {
    const comp = this.getComponentForTagName(tagName);
    return comp ? new ReactSerializer().serialize(comp) : `"${tagName}"`;
  }

  private getProps(attrs: AttrsDescriptor): string {
    return ReactAttrsSerializer.getProps(this.comp, attrs);
  }

  private getChildren(children: (string | ElementDescriptor)[]): string {
    if (children.length === 1) return this.serialize(children[0]);
    return `[${children.map(c => this.serialize(c)).join(",")}]`;
  }

  private getComponentForTagName(tagName): ComponentDescriptor {
    if (!this.comp.script) return null;
    if (!this.comp.script.components[tagName]) return null;
    return this.comp.script.components[tagName];
  }
}
