import { TemplateDescriptor } from "./template";
import { ScriptDescriptor } from "./script";

export interface ComponentDescriptor {
  fileName?: string;
  template?: TemplateDescriptor;
  script?: ScriptDescriptor;
  style?: string[];
}
