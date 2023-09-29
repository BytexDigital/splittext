'use client';

import { parseChildren } from './parse-children';
import { createLines } from './create-lines';
import React, { useId } from 'react';
import ReactDOM from 'react-dom';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';
import { immediateDebounce } from './utils';
import './styles.css';
import { SplitElements, SplitMode, SplitModesOptions } from './types';

type Merge<P1 = {}, P2 = {}> = Omit<P1, keyof P2> & P2;

type MergeProps<E, P = {}> = P & Merge<E extends React.ElementType ? React.ComponentPropsWithRef<E> : never, P>;

interface ForwardRefComponent<IntrinsicElementString, OwnProps = {}>
  extends React.ForwardRefExoticComponent<
    MergeProps<
      IntrinsicElementString,
      OwnProps & {
        as?: IntrinsicElementString;
      }
    >
  > {
  <As extends keyof JSX.IntrinsicElements>(props: MergeProps<As, OwnProps & { as: As }>): React.ReactElement | null;
  <
    As extends React.ElementType<any>,
    _AsWithProps = As extends React.ElementType<infer P> ? React.ElementType<P> : never,
  >(
    props: MergeProps<_AsWithProps, OwnProps & { as: _AsWithProps }>,
  ): React.ReactElement | null;
}

type SplitTextProps = ForwardRefComponent<
  'div',
  {
    children: React.ReactNode;
    mode?: SplitMode | SplitMode[];
    options?: SplitModesOptions;
    onComplete?: (elements: SplitElements) => void;
    onResize?: (elements: SplitElements) => void;
  }
>;

export const SplitText = React.forwardRef(
  ({ as: Component = 'div', mode = 'word', options, onComplete, onResize, ...props }, forwardedRef) => {
    const id = useId();

    const ref = React.useRef<React.ElementRef<typeof Component>>(null);

    // resize observer
    const resizeObserver = React.useRef<ResizeObserver | null>(null);

    // has text been split
    const isSplit = React.useRef(false);

    // initial render
    const initialRender = React.useRef(true);

    // has onComplete Callback been called
    const onCompleteCalled = React.useRef(false);

    // state to hold the split text elements (lines, words, chars) and make it easy to trigger rerender
    const [elements, setElements] = React.useState<Array<React.ReactElement>>([]);

    // modes to split the text into
    const modes = Array.isArray(mode) ? mode : [mode];
    const hasLineMode = modes.includes('line');
    const hasCharMode = modes.includes('char');

    // expose container ref to forwarded ref
    //@ts-ignore
    React.useImperativeHandle(forwardedRef, () => ref.current);

    useIsomorphicLayoutEffect(() => {
      if (!ref.current) return;

      // split text into lines only if user has specified line mode
      if (hasLineMode) {
        const split = (e?: any) => {
          if (!ref.current) return;

          const splitElements = createLines(ref.current, hasCharMode, isSplit.current, id, options);

          if (!isSplit.current) {
            isSplit.current = true;
          }

          ReactDOM.flushSync(() => {
            setElements(splitElements);
          });
        };

        // debounce resize handler
        const debouncedSplit = immediateDebounce(split, 500);

        //resize observer to split text on container parent resize
        resizeObserver.current = new ResizeObserver(debouncedSplit);
        resizeObserver.current.observe(ref.current?.parentElement!);
      }

      return () => {
        if (!ref.current) return;
        if (!resizeObserver.current) return;
        resizeObserver.current?.disconnect();
      };
    }, []);

    React.useEffect(() => {
      if (!ref.current) return;

      if (initialRender.current && hasLineMode) {
        initialRender.current = false;
        return;
      }

      if (onComplete !== undefined || onResize !== undefined) {
        const elements = {
          chars: (hasCharMode && Array.from(ref.current.querySelectorAll("[data-str-type='char']") || [])) || [],
          words: Array.from(ref.current.querySelectorAll("[data-str-type='word']") || []),
          lines: (hasLineMode && Array.from(ref.current.querySelectorAll("[data-str-type='line']") || [])) || [],
        } satisfies SplitElements;

        if (!onCompleteCalled.current) {
          onCompleteCalled.current = true;
          onComplete?.(elements);
        }

        if (hasLineMode) {
          onResize?.(elements);
        }
      }

      if (hasLineMode && forwardedRef && '_trigger' in forwardedRef) {
        //(forwardedRef as { _trigger?: () => void })._trigger?.();
      }
    }, [elements]);

    return (
      <Component {...props} ref={ref}>
        {/* <span className="sr-only">{props.children}</span> */}
        {elements.length > 0 ? elements : parseChildren(props.children, hasLineMode, hasCharMode, id, options)}
      </Component>
    );
  },
) as SplitTextProps;

SplitText.displayName = 'SplitText';
