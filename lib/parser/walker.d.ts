export interface Attr {
  name: string;
  value: string;
  escaped: string;
}

export interface HTMLParserOptions {
  start: (tag: string, attrs: Attr[], unary: boolean) => void;
  end: (tag: string) => void;
  chars: (text: string) => void;
  comment: (text: string) => void;
}

export function ResigWalker(html: string, options: HTMLParserOptions): void;
