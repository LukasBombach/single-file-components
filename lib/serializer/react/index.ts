import Component from "../../model/component";
import Template from "./template";

interface State {
  [key: string]: any;
}

export default class ReactSerializer {
  private comp: Component;
  private state: State;
  private props: string[];

  constructor(comp: Component) {
    this.comp = comp;
  }

  toString(): string {
    const name = this.getName();
    const props = this.getPropsAsParams();
    const stateHooks = this.getStateHooks();
    const template = this.getTemplate();

    return `
    function ${name} (${props}) {
      ${stateHooks}
      return ${template};
    }
    `;
  }

  private getName(): string {
    return this.comp.fileName;
  }

  private getPropsAsParams(): string {
    return this.props.join(", ");
  }

  private getStateHooks(): string {
    const entries = Object.entries(this.state);
    const stateHooks = entries.map(([v, i]) => `const [${v}, set${v}] = useState(${i});`);
    return stateHooks.join("\n");
  }

  private getTemplate(): string {
    return new Template(this.comp).getReactElement();
  }
}
