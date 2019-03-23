import Component from "../../model/component";
import VDom from "./vdom";

interface TemplateVars {
  name: string;
  props: string;
  stateHooks: string;
  vdom: string;
}

export default class ReactSerializer {
  private comp: Component;

  constructor(comp: Component) {
    this.comp = comp;
  }

  public toString(): string {
    const { name, props, stateHooks, vdom } = this.getTemplateVars();
    const component = `function ${name} (${props}) {
      ${stateHooks}
      return ${vdom};
    }`;
    return component;
  }

  private getTemplateVars(): TemplateVars {
    const name = this.getName();
    const props = this.getProps();
    const stateHooks = this.getStateHooks();
    const vdom = this.getVDom();
    return { name, props, stateHooks, vdom };
  }

  private getName(): string {
    return this.comp.fileName;
  }

  private getProps(): string {
    if (!this.comp.script || !this.comp.script.props) return "";
    const keys = Object.keys(this.comp.script.props);
    return `{ ${keys.join(", ")} }`;
  }

  private getStateHooks(): string {
    if (!this.comp.script || !this.comp.script.data) return "";
    const entries = Object.entries(this.comp.script.data());
    const stateHooks = entries.map(([key, val]) => `const [${key}, set${key}] = React.useState(${JSON.stringify(val)});`);
    return stateHooks.join("\n");
  }

  private getVDom(): string {
    return new VDom(this.comp).toString();
  }
}
