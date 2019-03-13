import { AttrsDescriptor } from "../../model/template";

export default class ReactAttrsSerializer {
  static getProps(attrs: AttrsDescriptor): string {
    return !attrs ? "{}" : `{ ${ReactAttrsSerializer.serializedAttrs(attrs)} }`;
  }

  private static serializedAttrs(attrs: AttrsDescriptor): string {
    return Object.entries(attrs)
      .map(([key, val]) => ReactAttrsSerializer.serializePair(key, val))
      .join(", ");
  }

  private static serializePair(key: string, val: string): string {
    return key.charAt(0) === ":" ? `"${key.substring(1)}": ${val}` : `"${key}": "${val}"`;
  }
}
