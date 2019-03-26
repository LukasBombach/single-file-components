import { Element, Props } from "../../model/template";
// import Component from "../../model/component";
import Template from "../../model/template";
import text from "./fragments/text";
// import component from "./fragments/component";
import vFor from "./fragments/v-for";
import htmlElement from "./fragments/htmlElement";

export interface Fragments {
  [key: string]: (...args: any[]) => string;
}

export interface FragmentApi {
  serialize: (el: Element) => string;
}

// prettier-ignore
const htmlTags = ["a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdi", "bdo", "bgsound", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dir", "div", "dl", "dt", "element", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "link", "listing", "main", "map", "mark", "marquee", "menu", "menuitem", "meta", "meter", "nav", "nobr", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "plaintext", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr", "xmp"];

export default class VDom {
  public template: Template;
  public api: FragmentApi;
  private fragments: Fragments = {
    text,
    // component,
    vFor,
    htmlElement
  };

  constructor(template: Template) {
    const serialize = (el: Element) => this.serialize(el);
    this.template = template;
    this.api = { serialize };
  }

  public toString(): string {
    const x = `const vDom = function (templateVars) {
      Object.entries(templateVars).forEach(([key, value]) => {
        console.log("defineProperty", key, { value })
        Object.defineProperty(vDom, key, { value });
      });
      return ${this.serialize(this.template.root)};
    }
    export default vDom;
    `;
    return x;
  }

  private serialize(el: Element): string {
    if (this.isText(el)) return this.fragment("text", el);
    //if (this.isComponent(el)) return this.fragment("component", el);
    if (this.hasVFor(el)) return this.fragment("vFor", el);
    return this.fragment("htmlElement", el);
  }

  private fragment(name: string, ...args: any[]): string {
    return this.fragments[name](...args, this.api);
  }

  private isText(el: Element): boolean {
    return el.type === "text";
  }

  // private isComponent(el: Element): boolean {
  //   return htmlTags.indexOf(el.name) === -1;
  // }

  private hasVFor(el: Element): boolean {
    return el.props && "v-for" in el.props;
  }
}
