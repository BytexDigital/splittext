import React from 'react';
import { createElement } from './create-element';
import type { SplitModesOptions } from './types';

export const parseChildren = (
  children: React.ReactNode,
  splitLine: boolean,
  splitChar: boolean,
  componentId: string,
  options?: SplitModesOptions,
  count?: { current: number },
): React.ReactElement[] => {
  const wordCount = count ?? { current: 0 };

  return React.Children.toArray(children).flatMap((child, index) => {
    // Check if this child is a nested react element, and if so, recurse into it
    if (React.isValidElement(child)) {
      if (splitLine && child.props.children && typeof child.props.children === 'string') {
        return child.props.children
          .split(/(\n|\r|\p{P}|\s|\w+)/gu)
          .filter(Boolean)
          .map((word: string, wordIndex: number) => {
            console.log('word', word, wordIndex, wordCount.current++);
            return React.createElement(
              child.type,
              {
                ...child.props,
                key: `${componentId}-${child.type}-${index}-${wordIndex}`,
                'data-str-emb': '',
                'data-str-component': '',
              },
              parseChildren(word, splitLine, splitChar, componentId, options, wordCount),
            );
          });
      }

      return React.createElement(
        child.type,
        {
          ...child.props,
          key: `${componentId}-${child.type} + ${index}`,
          'data-str-emb': splitLine ? '' : undefined,
          'data-str-component': '',
        },
        child.props.children ? parseChildren(child.props.children, splitLine, splitChar, componentId, options, wordCount) : null,
      );
    }

    // If it's a string, split it into words, whitespaces and punctuation and wrap each in a div
    if (typeof child === 'string') {
      return child
        .split(/(\n|\r|\p{P}|\s|\w+)/gu)
        .filter(Boolean)
        .map((word, wordIndex) => {
          if (word === '\n' || word === '\r') {
            return <br key={`${componentId}-${index}-${wordIndex}`} data-str-component="" />;
          }

          // match whitespace, if user wants to split by line, return an element with a non-breaking space instead
          if (word.match(/(\s+)/g)) {
            return splitLine ? (
              <span key={`${componentId}-${index}-${wordIndex}`} data-str-component="">
                {word}
              </span>
            ) : (
              word
            );
          }

          const element = createElement(
            options?.word?.tag || 'div',
            word,
            {
              key: `${componentId}-${index}-${wordIndex}`,
              splitByChar: splitChar,
              splitModeOptions: options,
            },
            {
              style: {
                '--str-word-index': wordCount.current,
              },
            },
          );

          wordCount.current++;
          return element;
        });
    }

    // Return null if it's not a string or a valid React element
    return null;
  });
};
