import Component from "../../model/component";
import Template from "./template";

interface State {
  [key: string]: any;
}

interface TemplateVars {
  name: string;
  props: string;
  stateHooks: string;
  template: string;
}

const render = ({ name, props, stateHooks, template }: TemplateVars): string => `
function ${name} (${props}) {
  ${stateHooks}
  return ${template};
}
`;

export default class ReactSerializer {
  private comp: Component;
  private state: State;
  private props: string[];

  constructor(comp: Component) {
    this.comp = comp;
  }

  toString(): string {
    return render(this.getTemplateVars());
  }

  private getTemplateVars(): TemplateVars {
    const name = this.getName();
    const props = this.getPropsAsParams();
    const stateHooks = this.getStateHooks();
    const template = this.getTemplate();
    return { name, props, stateHooks, template };
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
