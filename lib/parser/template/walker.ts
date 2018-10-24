export interface Next {
  type: NextType;
  tagName: string;
  text: string;
}

export enum NextType {
  start = "start",
  end = "end",
  chars = "chars",
  comment = "comment"
}

export default class Walker {
  private source: string;
  private pointer: number;

  constructor(source) {
    this.source = source;
    this.pointer = 0;
  }

  public done(): boolean {
    return this.pointer === this.source.length;
  }

  public next(): Next {
    if (this.pointerIs("<!--")) return this.nextComment();
    else if (this.pointerIs("</")) return this.nextEnd();
    else if (this.pointerIs("<")) return this.nextStart();
  }

  private nextComment(): Next {
    const end = this.source.indexOf("-->", this.pointer);
    const textStart = this.pointer + 4;
    const textEnd = end - textStart;
    const type = NextType.comment;
    const tagName = null;
    const text = this.source.substr(textStart, textEnd);
    const next = { type, tagName, text };
    this.pointer = end + 3;
    return next;
  }

  private nextEnd() {
    const end = this.source.indexOf(">", this.pointer);
    const tagStart = this.pointer + 4;
    const tagEnd = end - tagStart;
    const type = NextType.end;
    const tagName = this.source.substr(tagStart, tagEnd);
    const text = null;
    const next = { type, tagName, text };
    this.pointer = end + 1;
    return next;
  }

  private nextStart() {
    const startTag = /^<([-A-Za-z0-9_]+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
    const match = this.source.match(startTag);
    this.pointer += match[0].length;

    match[0].replace(startTag, parseStartTag);
  }

  private pointerIs(str) {
    return this.source.substr(this.pointer, str.length) === str;
  }
}
