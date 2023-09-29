export type SplitMode = 'char' | 'word' | 'line';

export type SplitElements = {
  chars: Element[];
  words: Element[];
  lines: Element[];
};

export interface SplitModeOption {
  tag?: 'span' | 'div';
  className?: string;
  style?: React.CSSProperties;
  wrapper?: boolean;
  wrapperProps?: {
    className?: string;
    style?: React.CSSProperties;
  };
}

export interface SplitModesOptions {
  line?: SplitModeOption;
  word?: SplitModeOption;
  char?: SplitModeOption;
}
