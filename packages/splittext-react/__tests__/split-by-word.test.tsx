import { expect, it, describe } from 'vitest';
import { render } from '@testing-library/react';

import React from 'react';
import { SplitText } from '../src';

describe('SplitText', () => {
  describe('SplitText -> Split By Word', () => {
    it('should split into 5 words', () => {
      const container = render(<SplitText>Lorem ipsum dolor sit amet</SplitText>);

      const words = container.container.querySelectorAll('[data-str-type=word]');
      expect(words.length).toBe(5);
    });

    it('should apply classes to each word', () => {
      const container = render(
        <SplitText options={{ word: { className: 'test' } }}>Lorem ipsum dolor sit amet</SplitText>,
      );

      const words = container.container.querySelectorAll('[data-str-type=word]');
      words.forEach((word) => {
        expect(word.classList.contains('test')).toBeTruthy();
      });
    });

    it('should apply styles to each word', () => {
      const container = render(
        <SplitText options={{ word: { style: { color: 'red' } } }}>Lorem ipsum dolor sit amet</SplitText>,
      );

      const words = container.container.querySelectorAll('[data-str-type=word]') as NodeListOf<HTMLElement>;
      words.forEach((word) => {
        expect(word.style.color).toBe('red');
      });
    });

    it('should by default render each word element as a div', () => {
      const container = render(<SplitText>Lorem ipsum dolor sit amet</SplitText>);

      const words = container.container.querySelectorAll('[data-str-type=word]') as NodeListOf<HTMLElement>;
      words.forEach((word) => {
        expect(word.tagName).toBe('DIV');
      });
    });

    it('should render each word element as span', () => {
      const container = render(<SplitText options={{ word: { tag: 'span' } }}>Lorem ipsum dolor sit amet</SplitText>);

      const words = container.container.querySelectorAll('[data-str-type=word]') as NodeListOf<HTMLElement>;
      words.forEach((word) => {
        expect(word.tagName).toBe('SPAN');
      });
    });

    it('should render a wrapper element around each word', () => {
      const container = render(<SplitText options={{ word: { wrapper: true } }}>Lorem ipsum dolor sit amet</SplitText>);

      const words = container.container.querySelectorAll('[data-str-type=word]') as NodeListOf<HTMLElement>;
      words.forEach((word) => {
        expect(word.parentElement?.tagName).toBe('DIV');
      });
    });

    it('should render a wrapper element around each word with a className & inline style', () => {
      const container = render(
        <SplitText options={{ word: { wrapper: true, wrapperProps: { className: 'test', style: { color: 'red' } } } }}>
          Lorem ipsum dolor sit amet
        </SplitText>,
      );

      const words = container.container.querySelectorAll('[data-str-type=word]') as NodeListOf<HTMLElement>;
      words.forEach((word) => {
        expect(word.parentElement?.classList.contains('test')).toBeTruthy();
        expect(word.parentElement?.style.color).toBe('red');
      });
    });

    it('should render an anchor tag when specified', () => {
      const container = render(
        <SplitText>
          Lorem ipsum
          <a href="https://splittext.pages.dev" className="test" style={{ color: 'red' }}>
            dolor
          </a>
          sit amet
        </SplitText>,
      );

      const words = container.container.querySelectorAll('[data-str-type=word]') as NodeListOf<HTMLElement>;

      expect(words[2].parentElement?.tagName).toBe('A');
      expect(words[2].parentElement?.classList.contains('test')).toBeTruthy();
      expect(words[2].parentElement?.style.color).toBe('red');
    });
  });
});
