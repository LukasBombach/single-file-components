import { xml2js } from "xml-js";
import ComponentParser from "./component";
import { Template, Element } from "../model/template";

export default class TemplateParser {
  parse(source: string): Template | string {
    const template = ComponentParser.template(source);
    const options = { compact: false, attributesKey: "attrs", elementsKey: "children" };
    const element = xml2js(template, options) as Element;
    const root = element.children[0];
    return { root };
  }
}
