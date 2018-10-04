import { ResigWalker } from './temporaryResigWalker';
import Json from './json';

export default class Parser {

  /*
  // const { inspect } = require('util');
  // console.log(inspect(templateJsonGenerator.getJson().children, { depth: 10 }))

  const walker = new ResigWalker(source);
  const templateJsonGenerator = new TemplateJsonGenerator();

  while (!walker.done()) {
    const { type, tagName, text } = walker.next();
    if (type === 'start') templateJsonGenerator.addChildAndMoveIn({ tagName });
    if (type === 'chars') templateJsonGenerator.addTextToCurrent(text);
    if (type === 'end') templateJsonGenerator.closeCurrentAndMoveUp();
  } */
  static getJson(source: string) {
    const template = Parser.getTemplate(source);
    const json = new Json();

    ResigWalker(template, {
      start: (tagName, attrs, unary) => {
        const props = attrs.map(({ name, value }) => ({ name, value }));
        json.addChildAndMoveIn({ tagName, props });
      },
      end: (tag) => {
        json.closeCurrentAndMoveUp();
      },
      chars: (text) => {
        json.addTextToCurrent(text);
      },
      comment: (text) => {
        console.log('Found comment in template, ignoring.')
      },
    });

    return json.getJson();
  }

  private static getTemplate(source): string {
    const templateRegex = /<template>([\s\S]*?)<\/template>/i;
    const template = source.match(templateRegex);
    return template ? template[1] : null;
  }

}