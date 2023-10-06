'use client';

import { SplitText } from '@splittext/react';
import { useCallback, useState } from 'react';
import styles from './fade-in-word.module.css';

const FadeInByWords = () => {
  const [isVisible, setVisible] = useState(false);

  const observeRefCallback = useCallback((node: HTMLDivElement) => {
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(entry.isIntersecting);
          observer.unobserve(node);
        }
      });
    });
    observer.observe(node);
  }, []);

  return (
    <div
      ref={observeRefCallback}
      className={`text-[#1d1d1d] text-center ${styles.fade_in_item} ${isVisible ? styles.fade_in_visible : ''}`}
    >
      <SplitText options={{ word: { wrapper: true } }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget.
      </SplitText>
    </div>
  );
};

export default FadeInByWords;