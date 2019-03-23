import Component from "../model/component";
import TemplateParser from "./template";
import Script from "./script";

export default class Parser {
  private source: string;

  constructor(source: string) {
    this.source = source;
  }

  public getComponent(): Component {
    const fileName = "notYetImplemented";
    const template = new TemplateParser().parse(this.source);
    const script = new Script().parse(this.source);
    const style = { contents: [] };
    return { fileName, template, script, style };
  }
}
