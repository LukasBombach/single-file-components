import { AbstractScript } from "../../model/script";
import FileParser from "../file";
import { requireFromString } from "./requireFromString";

export default class ScriptParser {
  public parse(source: string): AbstractScript {
    const script = FileParser.script(source);
    return ScriptParser.parseScript(script);
  }

  private static parseScript(contents: string): AbstractScript {
    const exports = requireFromString(contents, "Test.vue");
    const { data, props } = exports;
    return { data, props };
  }
}
