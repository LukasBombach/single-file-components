import { FileDescriptor } from "../../model/file";

export default class FileParser {
  static templates(source: string): string[] {
    return FileParser.getTags("template", source);
  }

  static scripts(source: string): string[] {
    return FileParser.getTags("script", source);
  }

  static styles(source: string): string[] {
    return FileParser.getTags("style", source);
  }

  static parse(source: string): FileDescriptor {
    const templates = FileParser.getTags("template", source);
    const scripts = FileParser.getTags("script", source);
    const styles = FileParser.getTags("style", source);
    return { templates, scripts, styles };
  }

  private static getTags(tagName: string, source: string): string[] {
    const matcher = `<${tagName}>([\\s\\S]*?)</${tagName}>`;
    const tagsRegExp = new RegExp(matcher, "g");
    const contentRegExp = new RegExp(matcher);
    const tags = source.match(tagsRegExp) || [];
    return tags.map(tag => tag.match(contentRegExp)[1]);
  }
}
