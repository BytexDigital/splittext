import { SplitText } from '@splittext/react';
import styles from './example-one.module.css';

export const ExampleOne = () => {
  return (
    <button className={`relative text-[#1d1d1d] ${styles.example_item}`}>
      <SplitText mode={'char'}>Test</SplitText>
      <SplitText className="absolute top-0 left-0" mode={'char'}>
        Test
      </SplitText>
    </button>
  );
};
