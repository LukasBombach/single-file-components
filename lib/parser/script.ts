import * as requireFromString from "require-from-string";
import { Script } from "../model/script";
import ComponentParser from "./component";

export default class ScriptParser {
  public parse(source: string): Script {
    const script = ComponentParser.script(source);
    return ScriptParser.parseContents(script);
  }

  private static parseContents(contents: string): Script {
    const exports = ScriptParser.requireFromString(contents);
    const { components, data, props } = exports;
    return { components, data, props };
  }

  private static requireFromString(code: string, fileName = "requireFromString.vue"): any {
    return requireFromString(`module.exports = ${code}`, fileName);
  }
}
