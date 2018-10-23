import { AbstractElement, Props } from "../../model/template";

export interface ElementDescriptor {
  tagName: string;
  props: Props;
}

const tagName = null;
const props = {};
const children = [];
const parent = null;

export default class Generator {
  rootNode: AbstractElement = { tagName, props, children, parent };
  currentNode: AbstractElement = this.rootNode;

  getRoot(): AbstractElement | string {
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
