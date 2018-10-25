import { AbstractElement } from "../../model/template";
import { ResigWalker } from "./walker";
import Generator from "./generator";

export default class TemplateParser {
  private generator: Generator;

  constructor() {
    this.generator = new Generator();
  }

  parse(source: string): (AbstractElement | string)[] {
    const templates = this.getTemplates(source);
    return templates.map(template => this.parseTemplate(template));
  }

  private getTemplates(source): string[] {
    const templates = /<template>([\s\S]*?)<\/template>/g;
    const matches = source.match(templates);
    return matches ? matches.map(this.getContent) : null;
  }

  private getContent(template): string {
    const content = /<template>([\s\S]*?)<\/template>/;
    const match = template.match(content);
    return match ? match[1] : null;
  }

  private parseTemplate(content: string): AbstractElement | string {
    ResigWalker(content, {
      start: (t, a, u) => this.handleStartTag(t, a, u),
      end: t => this.handleEndag(t),
      chars: t => this.handleChars(t),
      comment: t => this.handleChars(t)
    });
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
