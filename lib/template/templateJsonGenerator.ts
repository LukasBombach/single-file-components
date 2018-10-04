export interface ElementJson {
  tagName: string;
  children: Array<ElementJson|string>;
  parent: ElementJson;
}

export interface NodeDescriptor {
  tagName: string;
}

export default class TemplateJsonGenerator {

  rootNode: ElementJson = { tagName: null, children: [], parent: null };
  currentNode: ElementJson = this.rootNode;

  getJson(): ElementJson {
    return this.rootNode;
  }

  addChildAndMoveIn({ tagName }: NodeDescriptor): TemplateJsonGenerator {
    const children = [];
    const parent = this.currentNode;
    const child = { tagName, children, parent };
    this.currentNode.children.push(child);
    this.currentNode = child;
    return this;
  }

  addTextToCurrent(text: string): TemplateJsonGenerator {
    this.currentNode.children.push(text);
    return this;
  }

  closeCurrentAndMoveUp(): TemplateJsonGenerator {
    this.currentNode = this.currentNode.parent;
    return this;
  }

}