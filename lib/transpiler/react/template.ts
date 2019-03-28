import Transpiler from "./transpiler";
import TemplateParser from "../../parser/template";
import VDom from "../../serializer/react/vdom";

export default class TemplateTranspiler extends Transpiler {
  public async toString(): Promise<string> {
    const template = new TemplateParser().parse(this.source);
    const vdom = new VDom(template).toString();
    return vdom;
  }
}
