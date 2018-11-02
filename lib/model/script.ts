import { ComponentDescriptor } from "./component";

export interface ScriptDescriptor {
  components: ComponentsDescriptor;
  data: DataDescriptor;
  props: PropsDescriptor;
}

export interface ComponentsDescriptor {
  [key: string]: ComponentDescriptor;
}

export interface DataDescriptor {
  [key: string]: any;
}

export interface PropsDescriptor {
  [key: string]: PropDescriptor;
}

export interface PropDescriptor {
  type: any;
  required?: boolean;
  default?: any;
}
