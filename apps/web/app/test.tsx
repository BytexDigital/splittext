import React, { useEffect } from 'react';

type Merge<P1 = {}, P2 = {}> = Omit<P1, keyof P2> & P2;

type MergeProps<E, P = {}> = P & Merge<E extends React.ElementType ? React.ComponentPropsWithRef<E> : never, P>;

interface ForwardRefComponent<IntrinsicElementString, OwnProps = {}>
  extends React.ForwardRefExoticComponent<
    MergeProps<IntrinsicElementString, OwnProps & { as?: IntrinsicElementString }>
  > {
  <As extends keyof JSX.IntrinsicElements>(props: MergeProps<As, OwnProps & { as: As }>): React.ReactElement | null;
  <
    As extends React.ElementType<any>,
    _AsWithProps = As extends React.ElementType<infer P> ? React.ElementType<P> : never,
  >(
    props: MergeProps<_AsWithProps, OwnProps & { as: _AsWithProps }>,
  ): React.ReactElement | null;
}

type SplitTextWithProps = ForwardRefComponent<
  'div',
  {
    children: React.ReactNode;
  }
>;

export const SplitText = React.forwardRef(({ as: Component = 'div', ...props }, forwardedRef) => {
  const ref = React.useRef<React.ElementRef<typeof Component>>(null);

  // expose container ref to forwarded ref
  //@ts-ignore
  React.useImperativeHandle(forwardedRef, () => ref.current);

  return (
    <Component {...props} ref={ref}>
      <span className="sr-only">{props.children}</span>
      {props.children}
    </Component>
  );
}) as SplitTextWithProps;

SplitText.displayName = 'SplitText';
