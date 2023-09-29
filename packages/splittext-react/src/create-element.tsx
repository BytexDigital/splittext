import React from 'react';
import { SplitModesOptions } from './types';

interface CustomProps<T> extends React.HTMLAttributes<T> {
  [key: string]: any;
}

const defaultProps: CustomProps<HTMLElement> = {
  style: {
    display: 'inline-block',
    position: 'relative',
  },
};

export const createElement: any = (
  type: string,
  children: string | null = null,
  options: {
    key: string;
    splitByChar?: boolean;
    props?: CustomProps<HTMLElement>;
    splitModeOptions?: SplitModesOptions;
  },
  overrides?: Record<string, any>,
) => {
  // create base word component
  const baseComponent = React.createElement(
    type,
    {
      ...options?.props,
      style: {
        ...options?.props?.style,
        ...options?.splitModeOptions?.word?.style,
        ...defaultProps?.style,
        ...overrides?.style,
      },
      key: `str-word-${options.key}`,
      className: `str-word ${options?.props?.className?.replace('str-word', '') || ''} ${
        options?.splitModeOptions?.word?.className || ''
      }`,
      'data-str-type': 'word',
      'data-str-component': '',
      'data-str-data': children,
    },
    // check if user wants to split word by char
    options?.splitByChar
      ? children?.split('').map((char, charIndex) => {
          const baseChild = React.createElement(
            options?.splitModeOptions?.char?.tag || 'div',
            {
              key: `str-char-${options.key}-${charIndex}-${char}`,
              'data-str-type': 'char',
              'data-str-data': char,
              style: {
                ...options?.splitModeOptions?.char?.style,
                ...defaultProps.style,
                '--str-char-index': charIndex,
              } as React.CSSProperties,
              className: `str-char ${options?.splitModeOptions?.char?.className || ''}`,
            },
            char,
          );

          // check if user wants to wrap each char in a div
          return options?.splitModeOptions?.char?.wrapper ||
            options?.splitModeOptions?.char?.wrapperProps?.className ||
            options?.splitModeOptions?.char?.wrapperProps?.style
            ? React.createElement(
                'div',
                {
                  key: `str-wrapper-char-${options.key}-${charIndex}`,
                  'data-str-data': char,
                  className: options?.splitModeOptions?.char?.wrapperProps?.className,
                  style: {
                    overflow: 'hidden',
                    verticalAlign: 'top',
                    ...options?.splitModeOptions?.char?.wrapperProps?.style,
                    display: 'inline-block',
                  },
                },
                baseChild,
              )
            : baseChild;
        })
      : children,
  );

  // check if user wants to wrap each word in a div
  return options?.splitModeOptions?.word?.wrapper ||
    options?.splitModeOptions?.word?.wrapperProps?.className ||
    options?.splitModeOptions?.word?.wrapperProps?.style
    ? React.createElement(
        'div',
        {
          key: `str-wrapper-word-${options.key}`,
          'data-str-data': children,
          className: options?.splitModeOptions?.word?.wrapperProps?.className,
          style: {
            overflow: 'hidden',
            verticalAlign: 'top',
            ...options?.splitModeOptions?.word?.wrapperProps?.style,
            display: 'inline-block',
          },
        },
        baseComponent,
      )
    : baseComponent;
};
