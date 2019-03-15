import { Component } from "../../model/component";
import Template from "./template";
import Script from "./script";
import reactClass from "./serializedString";

export default class ReactSerializer {
  public serialize(comp: Component): string {
    const className = this.getClassName(comp);
    const initalState = this.getInitalState(comp);
    const template = this.getTemplate(comp);
    const templateVars = this.getTemplateVars(comp);
    const serializedString = reactClass(className, initalState, template, templateVars);
    // console.log(serializedString);
    return serializedString;
  }

  private getClassName(comp: Component): string {
    return comp.fileName;
  }

  private getInitalState(comp: Component): string {
    return new Script(comp).getData();
  }

  private getTemplate(comp: Component): string {
    return new Template(comp).getReactElement();
  }

  private getTemplateVars(comp: Component): string[] {
    if (!comp.script) return [];
    const dataVars = Object.keys(comp.script.data);
    const propsVars = Object.keys(comp.script.props);
    return Array.from(new Set<string>([...dataVars, ...propsVars]));
  }
}
