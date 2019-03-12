import { ComponentDescriptor } from "../../model/component";
import ReactTemplateSerializer from "./template";
import ReactScriptSerializer from "./script";
import reactClass from "./reactClass";

export default class ReactSerializer {
  public serialize(comp: ComponentDescriptor): string {
    const className = this.getClassName(comp);
    const initalState = this.getInitalState(comp);
    const template = this.getTemplate(comp);
    const templateVars = this.getTemplateVars(comp);
    const serializedString = reactClass(className, initalState, template, templateVars);
    // console.log(serializedString);
    return serializedString;
  }

  private getClassName(comp: ComponentDescriptor): string {
    return comp.fileName;
  }

  private getInitalState(comp: ComponentDescriptor): string {
    return new ReactScriptSerializer(comp).getData();
  }

  private getTemplate(comp: ComponentDescriptor): string {
    return new ReactTemplateSerializer(comp).getReactElement();
  }

  private getTemplateVars(comp: ComponentDescriptor): string[] {
    if (!comp.script) return [];
    const dataVars = Object.keys(comp.script.data);
    const propsVars = Object.keys(comp.script.props);
    return Array.from(new Set<string>([...dataVars, ...propsVars]));
  }
}
