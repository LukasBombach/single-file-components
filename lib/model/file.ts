import { TemplateElement } from "./template";

export interface FileDescriptor {
  name: string;
  template?: TemplateElement;
  script?: string[];
  style?: string[];
}
