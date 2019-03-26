import { Element, Props } from "../../model/template";
// import Component from "../../model/component";
import Template from "../../model/template";
import text from "./fragments/text";
// import component from "./fragments/component";
import vFor from "./fragments/v-for";
import htmlElement from "./fragments/htmlElement";

export interface Fragments {
  [key: string]: (...args: any[]) => string;
}

export interface FragmentApi {
  serialize: (el: Element) => string;
}

export default class VDom {
  public template: Template;
  public api: FragmentApi;
  private fragments: Fragments = {
    text,
    //component,
    vFor,
    htmlElement
  };

  constructor(template: Template) {
    const serialize = (el: Element) => this.serialize(el);
    this.template = template;
    this.api = { serialize };
  }

  public toString(): string {
    return this.serialize(this.template.root);
  }

  private serialize(el: Element): string {
    if (this.isText(el)) return this.fragment("text", el);
    //if (this.isComponent(el)) return this.fragment("component", el);
    if (this.hasVFor(el)) return this.fragment("vFor", el);
    return this.fragment("htmlElement", el);
  }

  private fragment(name: string, ...args: any[]): string {
    return this.fragments[name](...args, this.api);
  }

  private isText(el: Element): boolean {
    return el.type === "text";
  }

  /* private isComponent(el: Element): boolean {
    return !!this.comp.script && this.comp.script.components && !!this.comp.script.components[el.name];
  } */

  private hasVFor(el: Element): boolean {
    return el.props && "v-for" in el.props;
  }
}
