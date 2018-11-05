import { ComponentDescriptor } from "../../model/component";
import { AttrsDescriptor } from "../../model/template";

interface Props {
  [name: string]: any;
}

export default class ReactAttrsSerializer {
  static getProps(comp: ComponentDescriptor, attrs: AttrsDescriptor): string {
    const attrsArray = ReactAttrsSerializer.getArray(attrs);
    const transformedAttrs = ReactAttrsSerializer.transformAttrs(comp, attrsArray);
    const props = ReactAttrsSerializer.getObject(transformedAttrs);
    return JSON.stringify(props);
  }

  private static getArray(attrs: AttrsDescriptor): [string, string][] {
    return Object.entries(attrs);
  }

  private static transformAttrs(comp: ComponentDescriptor, attrs: [string, string][]): [string, any][] {
    return attrs.map(attr => ReactAttrsSerializer.transformAttr(comp, attr));
  }

  private static transformAttr(comp: ComponentDescriptor, [key, val]: [string, string]): [string, any] {
    if (key.charAt(0) === ":") return ReactAttrsSerializer.transformBind(comp, key, val);
    return [key, val];
  }

  private static transformBind(comp, key, val): [string, any] {
    const name = key.substring(1);
    if (comp.script && comp.script.props[name]) return [name, comp.script.props[name]];
    if (comp.script && comp.script.data[name]) return [name, comp.script.data[name]];
    return [name, undefined];
  }

  private static getObject(attrs: [string, any][]): Props {
    return attrs.reduce((accum, [k, v]) => {
      accum[k] = v;
      return accum;
    }, {});
  }
}
