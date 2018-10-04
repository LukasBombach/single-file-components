import { inspect } from 'util';
import { ResigWalker } from './temporaryResigWalker';
import TemplateJsonGenerator from './template/templateJsonGenerator';

export default class TemplateParser {

  static getJson(source: string) {

    const templateJsonGenerator = new TemplateJsonGenerator();

    ResigWalker(source, {
      start: (tagName, attrs, unary) => {
        templateJsonGenerator.addChildAndMoveIn({ tagName });
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

    console.log(inspect(templateJsonGenerator.getJson().children, { depth: 10 }))

    /* ResigWalker(source, {
      start: (tag, attrs, unary) => console.log(`start   <${tag}>`),
      end: (tag) => console.log(`end     </${tag}>`),
      chars: (text) => console.log(`chars   ${/\S/.test(text) ? text : '(empty)'}`),
      comment: (text) => console.log(`comment // ${text}`),
    }); */

    /* const walker = new ResigWalker(source);
    const templateJsonGenerator = new TemplateJsonGenerator();

    while (!walker.done()) {
      const next = walker.next();
      if (next.type === 'start') templateJsonGenerator.addChildAndMoveIn(next);
      if (next.type === 'chars') templateJsonGenerator.addTextToCurrent(next);
      if (next.type === 'end') templateJsonGenerator.closeCurrentAndMoveUp();
    } */

    //const html = TemplateParser.getTemplateHtmlFromSource(source);
    //return TemplateParser.getJsonFromHtml(html)[0];
  }

  /* // [1] matches template tags and its contents: <template>anything</template>
  private static getTemplateHtmlFromSource(source: string): string | null {
    const templateRegex = /<template>([\s\S]*?)<\/template>/i; // [1]
    const template = source.match(templateRegex);
    return template ? template[1] : null;
  }

  private static getJsonFromHtml(html: string): ElementJson[] | string {
    const tagsRegex = /(<\w+)>)([\w\W]*?)<\/\1>/;
    const matches = html.match(tagsRegex);
    return !matches ? html : matches
      .map(match => TemplateParser.getElementJson(match))
      .map(({ tagName, innerHtml }) => ({ tagName, children: TemplateParser.getJsonFromHtml(innerHtml) }));
  }


  // [1] matches opening and corresponding closing tags and its contents: <tagname>contents</tagname>
  private static getJsonFromHtmlOld(html: string): ElementJson[] | string {
    const tagsRegex = /<(\w+)>[\w\W]*<\/\1>/g; // [1]
    const matches = html.match(tagsRegex);
    return !matches ? html : matches
      .map(match => TemplateParser.getElementJson(match))
      .map(({ tagName, innerHtml }) => ({ tagName, children: TemplateParser.getJsonFromHtml(innerHtml) }));

  }

  // [1] matches the tagname and its contents of a single tag: <tagname>contents</tagname>
  private static getElementJson(tagHtml: string): { tagName: string, innerHtml: string } {
    const tagRegex = /<(\w+)>([\w\W]*)<\/\1>/; // [1]
    const [, tagName, innerHtml] = tagHtml.match(tagRegex);
    return { tagName, innerHtml };
  } */

}