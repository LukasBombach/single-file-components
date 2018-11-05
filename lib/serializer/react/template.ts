import { ElementDescriptor, AttrsDescriptor } from "../../model/template";
import { ComponentDescriptor } from "../../model/component";
import ReactSerializer from ".";
// import ReactAttrsSerializer from "./attrs";

export default class ReactTemplateSerializer {
  private comp: ComponentDescriptor;
  // private attrsSerializer: ReactAttrsSerializer;

  constructor(comp: ComponentDescriptor) {
    // this.attrsSerializer = new ReactAttrsSerializer(comp);
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
    const tagName = el.tagName;
    const props = this.getProps(el.attrs);
    const children = this.getChildren(el.children);
    const comp = this.getComponentForTagName(el.tagName);
    const reactEl = comp ? new ReactSerializer().serialize(comp) : `"${tagName}"`;
    return `React.createElement(${reactEl}, ${props}, ${children})`;
  }

  private getProps(attrs: AttrsDescriptor): string {
    const props = Object.entries(attrs)
      .map(([key, val]) => {
        if (key.charAt(0) === ":") {
          const name = key.substring(1);
          if (this.comp.script && this.comp.script.props[name]) return [name, this.comp.script.props[name]];
          if (this.comp.script && this.comp.script.data[name]) return [name, this.comp.script.data[name]];
          return [name, undefined];
        }
        return [key, val];
      })
      .reduce((accum, [k, v]) => {
        accum[k] = v;
        return accum;
      }, {});

    return JSON.stringify(props);
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
