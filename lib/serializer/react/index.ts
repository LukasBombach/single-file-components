import { ComponentDescriptor } from "../../model/component";
import ReactTemplateSerializer from "./template";
import reactClass from "./reactClass";

export default class ReactSerializer {
  private template: ReactTemplateSerializer = new ReactTemplateSerializer();

  public serialize(comp: ComponentDescriptor): string {
    const className = this.getClassName(comp);
    const initalState = this.getInitalState(comp);
    const template = this.getTemplate(comp);
    return reactClass(className, initalState, template);
  }

  private getClassName(comp: ComponentDescriptor): string {
    return comp.fileName;
  }

  private getInitalState(comp: ComponentDescriptor): string {
    return JSON.stringify(comp.script ? comp.script.data : {});
  }

  private getTemplate(comp: ComponentDescriptor): string {
    return this.template.serialize(comp.template.root);
  }
}
