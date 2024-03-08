import { SplitText } from '@splittext/react';
import { useSplitText } from '@splittext/react/hooks';
import { useEffect } from 'react';
import styles from './example-three.module.css';

export const ExampleThree = () => {
  const { scope, getScopedElements, key } = useSplitText();

  useEffect(() => {
    const { lines } = getScopedElements();

    if (!lines || lines.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-animated', 'true');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 1.0,
        rootMargin: '0px 0px -25px 0px',
      },
    );

    Array.from(lines).map((line) => {
      observer.observe(line);
    });

    return () => {
      observer.disconnect();
    };
  }, [key]);

  return (
    <div className={`text-sand-12 text-center min-w-full ${styles.line}`}>
      <SplitText ref={scope} mode={['line']}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna ligula, lobortis at faucibus eu, interdum
        ut quam. Donec ut elit sit amet massa ullamcorper elementum. Nam sagittis nisl quis mauris convallis auctor. Ut
        sit amet tempor est. Suspendisse et elit sed arcu ullamcorper elementum non id urna.
      </SplitText>
    </div>
  );
};