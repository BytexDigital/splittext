'use client';

import React from 'react';
import { useConstant } from '../utils';
import { SplitElements } from '../types';

interface SplitTextScope<T extends Element> {
  readonly current: T;
  _trigger: () => void;
}

const createScopedElements = <
  ScopeCurrentElementType extends Element = Element,
  C extends Element = HTMLDivElement,
  W extends Element = HTMLDivElement,
  L extends Element = HTMLDivElement,
>(
  scope: SplitTextScope<ScopeCurrentElementType>,
) => {
  return (): SplitElements<C, W, L> => {
    const { current } = scope;
    return {
      chars: current?.querySelectorAll('[data-str-type=char]'),
      words: current?.querySelectorAll('[data-str-type=word]'),
      lines: current?.querySelectorAll('[data-str-type=line]'),
    };
  };
};

export function useSplitText<T extends Element = any>() {
  const [key, setKey] = React.useState(0);

  const triggerRender = () => setKey((prev) => prev + 1);

  const scope: SplitTextScope<T> = useConstant(() => ({
    current: null!,
    _trigger: triggerRender,
  }));

  const getScopedElements = useConstant(() => createScopedElements(scope));

  return {
    scope,
    key,
    getScopedElements,
  };
}
