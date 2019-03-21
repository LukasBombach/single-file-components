import { Element, ElementType } from "../model/template";

export default class Generator {
  private rootNode: Element;
  private currentNode: Element;
  private parentStack: Element[];

  constructor() {
    const name = null;
    const props = {};
    const children = [];
    const type = ElementType.Element;
    this.rootNode = { name, type, props, children };
    this.currentNode = this.rootNode;
    this.parentStack = [this.rootNode];
  }

  getRoot(): Element {
    return this.rootNode.children[0];
  }

  addChildAndMoveIn({ name, props }: Element): Generator {
    const children = [];
    const type = ElementType.Element;
    const child = { name, type, props, children };
    this.parentStack.push(this.currentNode);
    this.currentNode.children.push(child);
    this.currentNode = child;
    return this;
  }

  addTextToCurrent(text: string): Generator {
    const type = ElementType.Text;

    this.currentNode.children.push({ type, text });
    return this;
  }

  closeCurrentAndMoveUp(): Generator {
    this.currentNode = this.parentStack.pop();
    return this;
  }
}
