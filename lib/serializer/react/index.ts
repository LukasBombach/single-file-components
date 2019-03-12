import { ComponentDescriptor } from "../../model/component";
import ReactTemplateSerializer from "./template";
import ReactScriptSerializer from "./script";
import reactClass from "./reactClass";

export default class ReactSerializer {
  public serialize(comp: ComponentDescriptor): string {
    const className = this.getClassName(comp);
    const initalState = this.getInitalState(comp);
    const template = this.getTemplate(comp);
    const serializedString = reactClass(className, initalState, template);
    console.log(serializedString);
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
}
