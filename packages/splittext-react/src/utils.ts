import { useRef } from 'react';

export function immediateDebounce<T extends (...args: any[]) => any>(func: T, delay: number) {
  let timeout: NodeJS.Timeout | null = null;
  let isFirstCall = true;

  return (...args: Parameters<T>) => {
    // Clear any existing timeouts
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    if (isFirstCall) {
      func(...args);
      isFirstCall = false;
      return;
    }

    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

type Init<T> = () => T;

export function useConstant<T>(init: Init<T>) {
  const ref = useRef<T | null>(null);

  if (ref.current === null) {
    ref.current = init();
  }

  return ref.current;
}

export const formatStringToCamelCase = (str: string) => {
  if (!str) return '';

  // handle css variables
  if (str.startsWith('--')) return str;

  const splitted = str.split('-');
  if (splitted.length === 1) return splitted[0];

  return (
    splitted[0] +
    splitted
      .slice(1)
      .map((word) => (word && word[0] ? word[0].toUpperCase() + word.slice(1) : ''))
      .join('')
  );
};

export const getStyleObjectFromString = (str: string) => {
  if (!str) return {};

  const style: Record<string, string> = {};
  str.split(';').forEach((el) => {
    const [property, value] = el.split(':');
    if (!property || !value) return;

    const formattedProperty = formatStringToCamelCase(property.trim());
    if (formattedProperty) {
      style[formattedProperty] = value.trim();
    }
  });

  return style;
};
