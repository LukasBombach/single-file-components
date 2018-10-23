import { AbstractElement } from "../../model/template";
import { ResigWalker } from "./temporaryResigWalker";
import Generator from "./generator";

export default class TemplateParser {
  static parse(source: string): (AbstractElement | string)[] {
    const templates = TemplateParser.getTemplates(source);
    return templates.map(TemplateParser.parseTemplate);
  }

  private static getTemplates(source): string[] {
    const templates = /<template>([\s\S]*?)<\/template>/g;
    const matches = source.match(templates);
    return matches ? matches.map(TemplateParser.getContent) : null;
  }

  private static getContent(template): string {
    const content = /<template>([\s\S]*?)<\/template>/;
    const match = template.match(content);
    return match ? match[1] : null;
  }

  private static parseTemplate(content: string): AbstractElement | string {
    const generator = new Generator();
    ResigWalker(content, {
      start: (t, a, u) => TemplateParser.handleStartTag(generator, t, a, u),
      end: t => TemplateParser.handleEndag(generator, t),
      chars: t => TemplateParser.handleChars(generator, t),
      comment: t => TemplateParser.handleChars(generator, t)
    });
    return generator.getRoot();
  }

  private static handleStartTag(generator, tagName, attrs, unary): void {
    const r = (props, { name, value }) => ({ ...props, [name]: value });
    const props = attrs.reduce(r, {});
    generator.addChildAndMoveIn({ tagName, props });
  }

  private static handleEndag(generator, tag): void {
    generator.closeCurrentAndMoveUp();
  }

  private static handleChars(generator, text): void {
    generator.addTextToCurrent(text);
  }

  private static handleComment(generator, text): void {
    console.log("Found comment in template, ignoring.");
  }
}
