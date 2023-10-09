import { expect, it, describe } from 'vitest';
import { render } from '@testing-library/react';

import React from 'react';
import { SplitText } from '../src';

describe('SplitText', () => {
  describe('SplitText -> Split By Word', () => {
    it('should render without errors', () => {
      const container = render(<SplitText>Lorem ipsum dolor sit amet</SplitText>);

      expect(container).not.toBeNull();
    });

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

      expect(words.length).toBe(5);

      words.forEach((word) => {
        expect(word.classList.contains('test')).toBeTruthy();
      });
    });

    it('should apply styles to each word', () => {
      const container = render(
        <SplitText options={{ word: { style: { color: 'red' } } }}>Lorem ipsum dolor sit amet</SplitText>,
      );

      const words = container.container.querySelectorAll('[data-str-type=word]') as NodeListOf<HTMLElement>;

      expect(words.length).toBe(5);

      words.forEach((word) => {
        expect(word.style.color).toBe('red');
      });
    });
  });
});
