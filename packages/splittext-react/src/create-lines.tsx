import { createElement } from './create-element';
import React from 'react';
import { getStyleObjectFromString } from './utils';
import { SplitModesOptions } from './types';

const cloneElement = (node: HTMLElement, key: string, splitByChar: boolean, options?: SplitModesOptions) => {
  //const content = node.getAttribute !== undefined && node.getAttribute('data-str-data');
  const contentTwo = node.textContent;
  if (!contentTwo) return null;

  const styles = getStyleObjectFromString(node.attributes.getNamedItem('style')?.value!);

  const attributesObject = Array.from(node.attributes).reduce((acc: Record<string, string>, attr) => {
    if (attr.name === 'style' || attr.name === 'class') return acc;
    acc[attr.name] = attr.value;
    return acc;
  }, {});

  return createElement(node.tagName.toLowerCase(), contentTwo, {
    key,
    splitByChar,
    props: {
      ...attributesObject,
      style: {
        ...styles,
      },
      className: node.className || undefined,
    },
    splitModeOptions: options,
  });
};

export const createLines: any = (
  container: HTMLDivElement,
  splitByChar: boolean,
  isSplit: boolean,
  componentId: string,
  options?: SplitModesOptions,
) => {
  if (!container) return [];

  const childNodes = isSplit ? container.querySelectorAll('[data-str-component]') : container.childNodes;

  if (childNodes.length === 0) return [];

  // get whitespace width - TODO: while this works, it's not ideal
  const spaceDiv = document.createElement('span');
  const newContent = document.createTextNode('\xa0');
  spaceDiv.appendChild(newContent);
  container.parentElement?.insertAdjacentElement('beforeend', spaceDiv);

  const maxWidth = container.scrollWidth * 0.99;
  const elements: Array<React.ReactElement[] | React.ReactElement> = [];
  let currentLineWidth = 0;
  let currentLineNo = 0;
  let currentLine: React.ReactElement[] = [];

  for (let i = 0; i < childNodes.length; i++) {
    const node = childNodes[i] as HTMLElement;
    const content = node.getAttribute !== undefined && node.getAttribute('data-str-data');

    // skip comments
    if (node.nodeType === 8) continue;

    // if element is a line break, push current line to split elements and reset current line
    if (node.tagName === 'BR') {
      const element = React.createElement('br', { key: `word-${componentId}-${i}`, 'data-str-component': '' }, null);
      currentLineWidth = 0;
      currentLineNo++;
      currentLine.push(element);
      elements.push(currentLine);
      currentLine = [];
      continue;
    }

    // use offsetWidth if available, otherwise use spaceDiv width as fallback
    //const nodeWidth = node.offsetWidth ? node.offsetWidth : spaceDiv.offsetWidth || 0;
    const nodeWidth = node.textContent?.match(/(\s+)/g) ? spaceDiv.offsetWidth || 0 : node.offsetWidth || 0;
    currentLineWidth += nodeWidth;

    const nextNode = (node.nextSibling as HTMLElement) || childNodes[i + 1];
    const nextNodeContent =
      (nextNode && nextNode.getAttribute !== undefined && nextNode.getAttribute('data-str-data')) || '';

    // check if next node is punctuation and if so, check if it fits in current line with current node and if not, push current line to split elements and reset current line
    if (content && nextNode && nextNodeContent.match(/(\p{P})/gu)) {
      const nextNodeWidth = nextNode.offsetWidth;

      // check if current and next node fit in current line
      if (currentLineWidth + nextNodeWidth > maxWidth) {
        // current and next node don't fit in current line, push current line to split elements and reset current line
        elements.push(currentLine);
        currentLineNo++;
        currentLineWidth = nodeWidth + nextNodeWidth;

        currentLine = [
          cloneElement(node, `${componentId}-${currentLineNo}-${i}`, splitByChar, options),
          cloneElement(nextNode, `${componentId}-${currentLineNo}-${i + 1}`, splitByChar, options),
        ];

        i++;
        continue;
      }
    }

    // check if current line width is greater than max width and if so, push current line to split elements and reset current line
    if (currentLineWidth > maxWidth) {
      currentLineWidth = nodeWidth;
      currentLineNo++;
      elements.push(currentLine);
      currentLine = [];
    }

    // explicity check if element is whitespace or sequences of whitespace, push it to the current line
    if (node.textContent?.match(/(\s+)/g)) {
      const test = React.createElement(
        'span',
        {
          key: `word-${componentId}-${i}`,
          'data-str-component': '',
        },
        node.textContent,
      );
      currentLine.push(test);
      continue;
    }

    const element = cloneElement(node, `${componentId}-${currentLineNo}-${i}`, splitByChar, options);
    currentLine.push(element);
  }

  // clean up whitespace width
  container.parentElement?.removeChild(spaceDiv);

  elements.push(currentLine);

  // create line elements
  return elements.map((line, index) => {
    const baseComponent = React.createElement(
      'div',
      {
        key: `str-line-${componentId}-${index}`,
        className: `str-line ${options?.line?.className || ''}`,
        style: {
          ...options?.line?.style,
          display: 'block',
          position: 'relative',
          '--str-line-index': index,
        },
        'data-str-type': 'line',
        'aria-hidden': true,
      },
      line,
    );

    return options?.line?.wrapper || options?.line?.wrapperProps?.className || options?.line?.wrapperProps?.style
      ? React.createElement(
          'div',
          {
            key: `str-wrapper-line-${componentId}-${index}`,
            className: options?.line?.wrapperProps?.className,
            style: {
              overflow: 'hidden',
              verticalAlign: 'top',
              ...options?.line?.wrapperProps?.style,
              display: 'block',
              position: 'relative',
            },
          },
          baseComponent,
        )
      : baseComponent;
  });
};
