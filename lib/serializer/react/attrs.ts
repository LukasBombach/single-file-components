import { ComponentDescriptor } from "../../model/component";

export default class ReactAttrsSerializer {
  private comp: ComponentDescriptor;

  constructor(comp: ComponentDescriptor) {
    this.comp = comp;
  }

  public getTransformedAttrs(attrs) {
    if (!this.comp.script) return {};
    //this.comp.;
  }

  private parseEntry(key: string, val: string): any {
    if (key.charAt(0) === ":") return this.parseBind(key, val);
    return val;
  }

  parseBind(key: string, val: string): any {
    const name = key.substring(1);
    if (this.comp.script && this.comp.script.props[name]) return this.comp.script.props[name];
    if (this.comp.script && this.comp.script.data[name]) return this.comp.script.data[name];
    return undefined;
  }
}
