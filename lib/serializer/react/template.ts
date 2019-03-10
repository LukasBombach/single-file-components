import { ElementDescriptor, AttrsDescriptor } from "../../model/template";
import { ComponentDescriptor } from "../../model/component";
import text from "./template/text";
import htmlElement from "./template/htmlElement";
import component from "./template/component";
//import vFor from "./template/v-for";

export interface Handlers {
  [key: string]: (...args: any[]) => string;
}

export default class ReactTemplateSerializer {
  private compDesc: ComponentDescriptor;
  private handlers: Handlers = {
    text,
    htmlElement,
    component
  };

  constructor(compDesc: ComponentDescriptor) {
    this.compDesc = compDesc;
  }

  public getReactElement(): string {
    return this.serialize(this.compDesc.template.root);
  }

  public serialize(el: ElementDescriptor): string {
    if (this.isText(el)) return this.handler("text", el, "template");
    if (this.isComponent(el)) return this.handler("component", el);
    return this.handler("htmlElement", el);
  }

  private handler(name: string, ...args: any[]): string {
    return this.handlers[name].call(this, ...args);
  }

  private isComponent(el: ElementDescriptor): boolean {
    return !!this.compDesc.script && !!this.compDesc.script.components[el.name];
  }

  private isText(el: ElementDescriptor): boolean {
    return el.type === "text";
  }
}
