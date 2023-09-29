'use client';

import React from 'react';
import { useConstant } from '../utils';
import { SplitElements } from '../types';

interface SplitTextScope<T = any> {
  readonly current: T;
  _trigger: () => void;
}

const createScopedElements = (scope: SplitTextScope) => {
  function scopedElements(): SplitElements {
    return {
      chars: scope.current?.querySelectorAll('[data-str-type=char]') || [],
      words: scope.current?.querySelectorAll('[data-str-type=word]') || [],
      lines: scope.current?.querySelectorAll('[data-str-type=line]') || [],
    };
  }

  return scopedElements;
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
