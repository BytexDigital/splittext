import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import React from 'react';
import { SplitText } from '../src';

describe('SplitText', () => {
  describe('SplitText -> Split By Char', () => {
    it('should render without errors', () => {
      const container = render(<SplitText mode={'char'}>Lorem ipsum dolor sit amet</SplitText>);
      expect(container).not.toBeNull();
    });

    it('should split into 26 characters', () => {
      const container = render(<SplitText mode={'char'}>Lorem ipsum dolor sit amet</SplitText>);
      const chars = container.container.querySelectorAll('[data-str-type=char]');
      expect(chars.length).toBe(22);
    });

    it('should apply classes to each character', () => {
      const container = render(
        <SplitText mode={'char'} options={{ char: { className: 'test' } }}>
          Lorem ipsum dolor sit amet
        </SplitText>,
      );

      const chars = container.container.querySelectorAll('[data-str-type=char]');
      chars.forEach((char) => {
        expect(char.classList.contains('test')).toBeTruthy();
      });
    });

    it('should apply styles to each character', () => {
      const container = render(
        <SplitText mode={'char'} options={{ char: { style: { color: 'red' } } }}>
          Lorem ipsum dolor sit amet
        </SplitText>,
      );

      const chars = container.container.querySelectorAll('[data-str-type=char]') as NodeListOf<HTMLElement>;
      chars.forEach((char) => {
        expect(char.style.color).toBe('red');
      });
    });

    it('should by default render each character element as a div', () => {
      const container = render(<SplitText mode={'char'}>Lorem ipsum dolor sit amet</SplitText>);

      const chars = container.container.querySelectorAll('[data-str-type=char]') as NodeListOf<HTMLElement>;
      chars.forEach((char) => {
        expect(char.tagName).toBe('DIV');
      });
    });

    it('should render each character element as span', () => {
      const container = render(
        <SplitText mode={'char'} options={{ char: { tag: 'span' } }}>
          Lorem ipsum dolor sit amet
        </SplitText>,
      );

      const chars = container.container.querySelectorAll('[data-str-type=char]') as NodeListOf<HTMLElement>;
      chars.forEach((char) => {
        expect(char.tagName).toBe('SPAN');
      });
    });

    it('should render a wrapper element around each character', () => {
      const container = render(
        <SplitText mode={'char'} options={{ char: { wrapper: true } }}>
          Lorem ipsum dolor sit amet
        </SplitText>,
      );

      const chars = container.container.querySelectorAll('[data-str-type=char]') as NodeListOf<HTMLElement>;
      chars.forEach((char) => {
        expect(char.parentElement?.tagName).toBe('DIV');
      });
    });

    it('should render a wrapper element around each character with a className & inline style', () => {
      const container = render(
        <SplitText
          mode={'char'}
          options={{ char: { wrapper: true, wrapperProps: { className: 'test', style: { color: 'red' } } } }}
        >
          Lorem ipsum dolor sit amet
        </SplitText>,
      );

      const chars = container.container.querySelectorAll('[data-str-type=char]') as NodeListOf<HTMLElement>;
      chars.forEach((char) => {
        expect(char.parentElement?.classList.contains('test')).toBeTruthy();
        expect(char.parentElement?.style.color).toBe('red');
      });
    });
  });
});
