import { ResigWalker } from './temporaryResigWalker';
import TemplateJsonGenerator from './template/templateJsonGenerator';

export default class TemplateParser {

  static getJson(source: string) {

    const template = TemplateParser.getTemplate(source)
    const templateJsonGenerator = new TemplateJsonGenerator();

    ResigWalker(template, {
      start: (tagName, attrs, unary) => {
        if (attrs.length) console.log(attrs);
        const props = attrs.map(({ name, value}) => ({ name, value}));
        templateJsonGenerator.addChildAndMoveIn({ tagName, props });
      },
      end: (tag) => {
        templateJsonGenerator.closeCurrentAndMoveUp();
      },
      chars: (text) => {
        templateJsonGenerator.addTextToCurrent(text);
      },
      comment: (text) => {
        console.log('Found comment in template, ignoring.')
      },
    });

    return templateJsonGenerator.getJson();

    // const { inspect } = require('util');
    // console.log(inspect(templateJsonGenerator.getJson().children, { depth: 10 }))

    /* const walker = new ResigWalker(source);
    const templateJsonGenerator = new TemplateJsonGenerator();

    while (!walker.done()) {
      const { type, tagName, text } = walker.next();
      if (type === 'start') templateJsonGenerator.addChildAndMoveIn({ tagName });
      if (type === 'chars') templateJsonGenerator.addTextToCurrent(text);
      if (type === 'end') templateJsonGenerator.closeCurrentAndMoveUp();
    } */
  }

  private static getTemplate(source): string {
    const templateRegex = /<template>([\s\S]*?)<\/template>/i;
    const template = source.match(templateRegex);
    return template ? template[1] : null;
  }

}