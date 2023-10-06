'use client';

import { SplitText } from '@splittext/react';
import { useSplitText } from '@splittext/react/hooks';
import { useEffect, useRef } from 'react';
import styles from './fade-in-slide-in-line.module.css';

const FadeInSlideInLine = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scope, getScopedElements, key } = useSplitText();

  useEffect(() => {
    const { lines } = getScopedElements();
    if (lines.length === 0) return;

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
    <div className={`text-[#1d1d1d] text-center min-w-full ${styles.line}`}>
      <SplitText ref={scope} mode={['line', 'word']}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna ligula, lobortis at faucibus eu, interdum
        ut quam. Donec ut elit sit amet massa ullamcorper elementum. Nam sagittis nisl quis mauris convallis auctor. Ut
        sit amet tempor est. Suspendisse et elit sed arcu ullamcorper elementum non id urna.
      </SplitText>
    </div>
  );
};

export default FadeInSlideInLine;
