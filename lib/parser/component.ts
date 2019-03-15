export default class Component {
  static template(source: string): string {
    return Component.getTags("template", source)[0];
  }

  static script(source: string): string {
    return Component.getTags("script", source)[0];
  }

  static style(source: string): string {
    return Component.getTags("style", source)[0];
  }

  private static getTags(tagName: string, source: string): string[] {
    const matcher = `<${tagName}>([\\s\\S]*?)</${tagName}>`;
    const tagsRegExp = new RegExp(matcher, "g");
    const contentRegExp = new RegExp(matcher);
    const tags = source.match(tagsRegExp) || [];
    return tags.map(tag => tag.match(contentRegExp)[1]);
  }
}
