import { AbstractScript } from "../../model/script";
import FileParser from "../file";
import { requireFromString } from "./requireFromString";

export default class ScriptParser {
  public parse(source: string): AbstractScript[] {
    const scripts = FileParser.scripts(source);
    return scripts.map(contents => ScriptParser.parseScript(contents));
  }

  private static parseScript(contents: string): AbstractScript {
    const exports = requireFromString(contents, "Test.vue");
    const { data, props } = exports;
    return { data, props };
  }
}
