import type { CSSProperties } from 'react';

export type SplitMode = 'char' | 'word' | 'line';

export type SplitElements<C extends Element = Element, W extends Element = Element, L extends Element = Element> = {
  chars: NodeListOf<C> | undefined;
  words: NodeListOf<W> | undefined;
  lines: NodeListOf<L> | undefined;
};

export interface SplitModeOption {
  tag?: 'div' | 'span';
  className?: string;
  style?: CSSProperties;
  wrapper?: boolean;
  wrapperProps?: {
    className?: string;
    style?: CSSProperties;
  };
}

export interface SplitModesOptions {
  line?: SplitModeOption;
  word?: SplitModeOption;
  char?: SplitModeOption;
}
