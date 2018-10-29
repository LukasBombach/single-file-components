import { TemplateDescriptor } from "./template";
import { ScriptDescriptor } from "./script";

export interface FileDescriptor {
  name: string;
  template?: TemplateDescriptor;
  script?: ScriptDescriptor;
  style?: string[];
}
