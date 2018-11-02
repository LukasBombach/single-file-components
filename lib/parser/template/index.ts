import ComponentParser from "../component";
import { TemplateDescriptor, ElementDescriptor } from "../../model/template";
import { ResigWalker } from "./walker";
import Generator from "./generator";

export default class TemplateParser {
  private generator: Generator;

  constructor() {
    this.generator = new Generator();
  }

  parse(source: string): TemplateDescriptor | string {
    const template = ComponentParser.template(source);
    const root = this.parseContents(template);
    return { root };
  }

  private parseContents(content: string): ElementDescriptor | string {
    const start = (tag, attrs, unary) => this.handleStartTag(tag, attrs, unary);
    const end = tag => this.handleEndag(tag);
    const chars = text => this.handleChars(text);
    const comment = text => this.handleComment(text);
    ResigWalker(content, { start, end, chars, comment });
    return this.generator.getRoot();
  }

  private handleStartTag(tagName, domAttrs, unary): void {
    const attrs = domAttrs.reduce((props, { name, value }) => ({ ...props, [name]: value }), {});
    const children = [];
    this.generator.addChildAndMoveIn({ tagName, attrs, children });
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
