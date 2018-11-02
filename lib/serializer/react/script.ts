import { ComponentDescriptor } from "../../model/component";

export default class ReactScriptSerializer {
  private comp: ComponentDescriptor;

  constructor(comp: ComponentDescriptor) {
    this.comp = comp;
  }

  public getData(): string {
    return JSON.stringify(this.comp.script ? this.comp.script.data : {});
  }
}
