import { Element } from "../../model/template";
import Component from "../../model/component";
import text from "./template/text";
import htmlElement from "./template/htmlElement";
import component from "./template/component";
import vFor from "./template/v-for";

export interface Handlers {
  [key: string]: (...args: any[]) => string;
}

export default class Template {
  public compDesc: Component;
  private handlers: Handlers = {
    text,
    htmlElement,
    component,
    vFor
  };

  constructor(compDesc: Component) {
    this.compDesc = compDesc;
  }

  public getReactElement(): string {
    return this.serialize(this.compDesc.template.root);
  }

  public serialize(el: Element): string {
    if (this.isText(el)) return this.handler("text", el);
    if (this.isComponent(el)) return this.handler("component", el);
    if (this.hasVFor(el)) return this.handler("vFor", el);
    return this.handler("htmlElement", el);
  }

  private handler(name: string, ...args: any[]): string {
    return this.handlers[name](...args, this);
  }

  private isComponent(el: Element): boolean {
    return !!this.compDesc.script && !!this.compDesc.script.components[el.name];
  }

  private isText(el: Element): boolean {
    return el.type === "text";
  }

  private hasVFor(el: Element): boolean {
    return el.props && "v-for" in el.props;
  }
}
