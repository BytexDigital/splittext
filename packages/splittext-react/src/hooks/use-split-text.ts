'use client';

import React from 'react';
import { useConstant } from '../utils';

export interface SplitTextScope<T extends React.ElementRef<any> = React.ElementRef<'div'>> extends React.RefObject<T> {
  _trigger: () => void;
}

export type SplitElements = ReturnType<ReturnType<typeof createScopedElements>>;

const createScopedElements = <
  C extends Element = HTMLDivElement,
  W extends Element = HTMLDivElement,
  L extends Element = HTMLDivElement
>(
  scope: SplitTextScope,
) => {
  return () => {
    const { current } = scope;
    return {
      chars: current?.querySelectorAll<C>('[data-str-type=char]'),
      words: current?.querySelectorAll<W>('[data-str-type=word]'),
      lines: current?.querySelectorAll<L>('[data-str-type=line]'),
    };
  };
};

export function useSplitText() {
  const [key, setKey] = React.useState(0);

  const triggerRender = () => setKey((prev) => prev + 1);

  const scope = useConstant(() => ({
    current: null,
    _trigger: triggerRender,
  }));

  const getScopedElements = useConstant(() => createScopedElements(scope));

  return {
    scope,
    key,
    getScopedElements,
  };
}
