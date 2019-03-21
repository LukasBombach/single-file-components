import { xml2js } from "xml-js";
import Component from "./component";
import TemplateModel, { Element } from "../model/template";

export default class Template {
  parse(source: string): TemplateModel | string {
    const template = Component.template(source);
    const options = { compact: false, attributesKey: "props", elementsKey: "children" };
    const element = xml2js(template, options) as Element;
    const root = element.children[0];
    return { root };
  }
}
