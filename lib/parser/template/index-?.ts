import { AbstractElement } from "../../model/template";
import { ResigWalker } from "./walker";
import Generator from "./generator";

export default class TemplateParser {
  static parse(source: string): (AbstractElement | string)[] {
    const templates = TemplateParser.getTemplates(source);
    return templates.map(TemplateParser.parseTemplate);
  }

  private static getTemplates(source): string[] {
    const templates = /<template>([\s\S]*?)<\/template>/g;
    const content = /<template>([\s\S]*?)<\/template>/;
    const matches = source.match(templates);
    return matches ? matches.map(m => m.match(content)[1]) : null;
  }

  static parseTemplate(content: string): AbstractElement | string {
    const generator = new Generator();
    ResigWalker(content, {
      start: (tagName, attrs, unary) => {
        const r = (props, { name, value }) => ({ ...props, [name]: value });
        const props = attrs.reduce(r, {});
        generator.addChildAndMoveIn({ tagName, props });
      },
      end: tag => {
        generator.closeCurrentAndMoveUp();
      },
      chars: text => {
        generator.addTextToCurrent(text);
      },
      comment: text => {
        console.log("Found comment in template, ignoring.");
      }
    });
    return generator.getRoot();
  }
}
