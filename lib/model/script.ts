import Component from "./component";

export default interface Script {
  name?: string;
  components?: Components;
  data?: () => Data;
  props?: Props;
}

export interface Components {
  [key: string]: Component;
}

export interface Data {
  [key: string]: any;
}

export interface Props {
  [key: string]: Prop;
}

export interface Prop {
  type: any;
  required?: boolean;
  default?: any;
}
