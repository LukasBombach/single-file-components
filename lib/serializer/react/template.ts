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

  private serialize(el: ElementDescriptor): string {
    if (el.type === "text") return this.serializeString(el.text);
    return this.serializeElementDescriptor(el);
  }

  private serializeString(str: string): string {
    const variables = /\{\{\s*(\S+?)\s*\}\}/g;
    return `\`${str}\``.replace(variables, "${template.$1}");
  }

  private serializeElementDescriptor(el: ElementDescriptor): string {
    const reactEl = this.getElement(el.name);
    const props = this.getProps(el.attrs);
    const children = this.getChildren(el.children);
    return `React.createElement(${reactEl}, ${props}, ${children})`;
  }

  private getElement(name) {
    const comp = this.getComponentForTagName(name);
    return comp ? new ReactSerializer().serialize(comp) : `"${name}"`;
  }

  private getProps(attrs: AttrsDescriptor): string {
    return ReactAttrsSerializer.getProps(this.comp, attrs);
  }

  private getChildren(children: (ElementDescriptor)[]): string {
    if (!children) return "undefined";
    if (children.length === 1) return this.serialize(children[0]);
    return `[${children.map(c => this.serialize(c)).join(",")}]`;
  }

  private getComponentForTagName(name): ComponentDescriptor {
    if (!this.comp.script) return null;
    if (!this.comp.script.components[name]) return null;
    return this.comp.script.components[name];
  }
}
