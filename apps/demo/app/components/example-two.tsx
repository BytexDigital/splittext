import { SplitText } from '@splittext/react';
import { useCallback, useState } from 'react';
import styles from './example-two.module.css';

export const ExampleTwo = () => {
  const [isVisible, setVisible] = useState(false);

  const observeRefCallback = useCallback((node: HTMLDivElement) => {
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(entry.isIntersecting);
            observer.unobserve(node);
          }
        });
      },
      {
        threshold: 1.0,
        rootMargin: '0px 0px -50px 0px',
      },
    );
    observer.observe(node);
  }, []);

  return (
    <div
      ref={observeRefCallback}
      className={`text-sand-12 text-center ${styles.item} ${isVisible ? styles.fade_in_visible : ''}`}
    >
      <SplitText options={{ word: { wrapper: true } }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget.
      </SplitText>
    </div>
  );
};
