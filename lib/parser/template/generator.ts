import { TemplateDescriptor, Props } from "../../model/template";

export interface ElementDescriptor {
  tagName: string;
  props: Props;
}

export default class Generator {
  private rootNode: TemplateDescriptor;
  private currentNode: TemplateDescriptor;

  constructor() {
    const tagName = null;
    const props = {};
    const children = [];
    const parent = null;
    this.rootNode = { tagName, props, children, parent };
    this.currentNode = this.rootNode;
  }

  getRoot(): TemplateDescriptor | string {
    return this.rootNode.children[0];
  }

  addChildAndMoveIn({ tagName, props }: ElementDescriptor): Generator {
    const children = [];
    const parent = this.currentNode;
    const child = { tagName, props, children, parent };
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
