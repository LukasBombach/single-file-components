import { ElementDescriptor } from "../../model/template";

export default class Generator {
  private rootNode: ElementDescriptor;
  private currentNode: ElementDescriptor;

  constructor() {
    const tagName = null;
    const attrs = {};
    const children = [];
    const parent = null;
    this.rootNode = { tagName, attrs, children, parent };
    this.currentNode = this.rootNode;
  }

  getRoot(): ElementDescriptor | string {
    return this.rootNode.children[0];
  }

  addChildAndMoveIn({ tagName, attrs }: ElementDescriptor): Generator {
    const children = [];
    const parent = this.currentNode;
    const child = { tagName, attrs, children, parent };
    this.currentNode.children.push(child);
    this.currentNode = child;
    return this;
  }

  addTextToCurrent(text: string): Generator {
    this.currentNode.children.push(text);
    return this;
  }

  closeCurrentAndMoveUp(): Generator {
    this.currentNode = this.currentNode.parent;
    return this;
  }
}
