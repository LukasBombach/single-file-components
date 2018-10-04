export interface ElementJson {
  tagName: string;
  props: Prop[];
  children: Array<ElementJson|string>;
  parent: ElementJson;
}

export interface Prop {
  name: string;
  value: string;
}

export interface NodeDescriptor {
  tagName: string;
  props: Prop[]
}

export default class Json {

  rootNode: ElementJson = { tagName: null, props:[], children: [], parent: null };
  currentNode: ElementJson = this.rootNode;

  getJson(): ElementJson|string {
    return this.rootNode.children[0];
  }

  addChildAndMoveIn({ tagName, props }: NodeDescriptor): Json {
    const children = [];
    const parent = this.currentNode;
    const child = { tagName, props, children, parent };
    this.currentNode.children.push(child);
    this.currentNode = child;
    return this;
  }

  addTextToCurrent(text: string): Json {
    this.currentNode.children.push(text);
    return this;
  }

  closeCurrentAndMoveUp(): Json {
    this.currentNode = this.currentNode.parent;
    return this;
  }

}