import ComponentParser from "./component";
import Template, { Element } from "../model/template";
import { ResigWalker } from "./walker";
import Generator from "./generator";
import { ElementType, Props } from "../model/template";

export default class TemplateParser {
  private generator: Generator;

  constructor() {
    this.generator = new Generator();
  }

  parse(source: string): Template {
    const template = ComponentParser.template(source);
    const root = this.parseContents(template);
    return { root };
  }

  private parseContents(content: string): Element {
    const start = (tag, attrs, unary) => this.handleStartTag(tag, attrs, unary);
    const end = tag => this.handleEndag(tag);
    const chars = text => this.handleChars(text);
    const comment = text => this.handleComment(text);
    ResigWalker(content, { start, end, chars, comment });
    return this.generator.getRoot();
  }

  private handleStartTag(name: string, domAttrs, unary): void {
    const props = domAttrs.reduce((props, { name, value }) => ({ ...props, [name]: value }), {}) as Props;
    const type = ElementType.Element;
    this.generator.addChildAndMoveIn({ name, type, props });
  }

  private handleEndag(tag): void {
    this.generator.closeCurrentAndMoveUp();
  }

  private handleChars(text): void {
    this.generator.addTextToCurrent(text);
  }

  private handleComment(text): void {
    console.log("Found comment in template, ignoring.");
  }
}
