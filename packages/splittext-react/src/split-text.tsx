'use client';

import { parseChildren } from './parse-children';
import { createLines } from './create-lines';
import React from 'react';
import ReactDOM from 'react-dom';
import { immediateDebounce } from './utils';
import type { SplitMode, SplitModesOptions } from './types';
import type { SplitElements, SplitTextScope } from './hooks/use-split-text';

type SplitTextProps<T extends React.ElementType> = Omit<React.ComponentProps<T>, 'as' | "mode" | "resizeDebounce" | "options" | "onComplete" | "onResize"> & {
  children: React.ReactNode;
  as?: T;
  mode?: SplitMode | SplitMode[];
  resizeDebounce?: number;
  options?: SplitModesOptions;
  onComplete?: (elements: SplitElements) => void;
  onResize?: (elements: SplitElements) => void;
};

function internalForwardRef<T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode
): (props: P & React.RefAttributes<T>) => React.ReactNode {
  return React.forwardRef(render) as any;
}

const InternalSplitText = <T extends React.ElementType = 'div'>(
  { children, as, options, onComplete, onResize, mode = 'word', resizeDebounce = 500, ...props }: SplitTextProps<T>,
  ref: React.ForwardedRef<T>,
) => {
  const Component = as || 'div';
  const id = React.useId();

  // container refs
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const internalRef = React.useRef<React.ElementRef<typeof Component> | null>(null);

  // resize observer
  const resizeObserver = React.useRef<ResizeObserver | null>(null);
  const resizeObserverContentRect = React.useRef<DOMRectReadOnly | undefined>(undefined);

  // track if text has been split
  const isSplit = React.useRef(false);

  // track if onComplete callback has been called
  const hasOnCompleteBeenCalled = React.useRef(false);

  // state to hold the split text elements (lines, words, chars) and make it easy to trigger rerender
  const [elements, setElements] = React.useState<Array<React.ReactElement>>([]);

  // modes to split the text into
  const modes = Array.isArray(mode) ? mode : [mode];
  const splitByLine = modes.includes('line');
  const splitByChar = modes.includes('char');

  React.useImperativeHandle(ref as React.Ref<T>, () => internalRef.current as T, []);

  const handleNodeRef = React.useCallback((node: HTMLDivElement | null) => {
    containerRef.current = node;

    // only run if split by line mode is not selected and onComplete callback is provided
    if (node && !splitByLine && !hasOnCompleteBeenCalled.current && onComplete) {
      const elements = {
        chars: (splitByChar && (internalRef.current as unknown as Element).querySelectorAll("[data-str-type='char']")) || undefined,
        words: (internalRef.current as unknown as Element).querySelectorAll("[data-str-type='word']"),
        lines: undefined,
      } satisfies SplitElements;

      onComplete?.(elements);
    }

    // setup resize observer to split text by lines on container parent resize if user has line mode enabled
    if (splitByLine && node) {
      const split = (e: ResizeObserverEntry[]) => {
        if (!containerRef.current) return;

        // check if resizeobserverentry contentRect has changed since last resize observer event and exit if not to prevent unnecessary rerenders
        if (!resizeObserverContentRect.current) {
          resizeObserverContentRect.current = e[0]?.contentRect;
        } else {
          if (
            resizeObserverContentRect.current.width === e[0]?.contentRect.width
            //resizeObserverContentRect.current.height === e[0]?.contentRect.height
          ) {
            return;
          }

          resizeObserverContentRect.current = e[0]?.contentRect;
        }

        // split text into lines
        const splitElements = createLines(internalRef.current, splitByChar, isSplit.current, id, options);

        if (!isSplit.current) {
          isSplit.current = true;
        }

        ReactDOM.flushSync(() => {
          setElements(splitElements);

          queueMicrotask(() => {
            const elements = {
              chars: (splitByChar && (internalRef.current as unknown as Element).querySelectorAll("[data-str-type='char']")) || undefined,
              words: (internalRef.current as unknown as Element).querySelectorAll("[data-str-type='word']"),
              lines: (splitByLine && (internalRef.current as unknown as Element).querySelectorAll("[data-str-type='line']")) || undefined,
            } satisfies SplitElements;

            // if onComplete or onResize callback is provided, call them with the split elements as arguments
            if (!hasOnCompleteBeenCalled.current) {
              hasOnCompleteBeenCalled.current = true;
              onComplete?.(elements);
            } else {
              onResize?.(elements);
            }

            // if trigger method is available, call it to trigger scope update
            if (splitByLine && ref && '_trigger' in ref) {
              (ref as SplitTextScope<T>)._trigger?.();
            }
          });
        });
      };

      // debounce resize handler
      const debouncedSplit = immediateDebounce(split, resizeDebounce);

      //resize observer to split text on container parent resize
      resizeObserver.current = new ResizeObserver(debouncedSplit);
      resizeObserver.current.observe(containerRef.current!);
    }

    // disconnect resize observer when component is unmounted
    if (!node) {
      resizeObserver.current?.disconnect();
    }
  }, []);

  return (
    <div data-str-wrapper='' ref={handleNodeRef} style={{ position: "relative" }}>
      <span style={{
        position: "absolute",
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: 0,
      }}>{children}</span>
      {React.createElement(Component, { ...props, 'data-str-root': '', "aria-hidden": true, ref: internalRef }, elements.length > 0 ? elements : parseChildren(children, splitByLine, splitByChar, id, options))}
    </div>
  )
};

export const SplitText = internalForwardRef(InternalSplitText);
