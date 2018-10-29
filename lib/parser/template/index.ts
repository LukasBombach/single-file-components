import FileParser from "../file";
import { TemplateDescriptor } from "../../model/template";
import { ResigWalker } from "./walker";
import Generator from "./generator";

export default class TemplateParser {
  private generator: Generator;

  constructor() {
    this.generator = new Generator();
  }

  parse(source: string): TemplateDescriptor | string {
    const template = FileParser.template(source);
    return this.parseTemplate(template);
  }

  private parseTemplate(content: string): TemplateDescriptor | string {
    const start = (tag, attrs, unary) => this.handleStartTag(tag, attrs, unary);
    const end = tag => this.handleEndag(tag);
    const chars = text => this.handleChars(text);
    const comment = text => this.handleChars(text);
    ResigWalker(content, { start, end, chars, comment });
    return this.generator.getRoot();
  }

  private handleStartTag(tagName, attrs, unary): void {
    const r = (props, { name, value }) => ({ ...props, [name]: value });
    const props = attrs.reduce(r, {});
    this.generator.addChildAndMoveIn({ tagName, props });
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
