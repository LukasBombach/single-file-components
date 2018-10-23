import { ResigWalker } from "./temporaryResigWalker";
import TemplateModel from "../../model/template";

export default class TemplateParser {
  static parseTemplate(source: string): TemplateModel {
    const walker = new ResigWalker(source);
    const templateGenerator = new TemplateGenerator();

    while (!walker.done()) {
      const { type, tagName, text } = walker.next();
      if (type === "start") templateGenerator.addChildAndMoveIn({ tagName });
      if (type === "chars") templateGenerator.addTextToCurrent(text);
      if (type === "end") templateGenerator.closeCurrentAndMoveUp();
    }

    return templateGenerator.getElements();
  }
}
