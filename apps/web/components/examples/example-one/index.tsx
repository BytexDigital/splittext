import { SplitText } from '@splittext/react';
import styles from './split-char-rotation.module.css';

const SplitCharRotation = () => {
  return (
    <button className={`relative text-[#1d1d1d] ${styles.example_item}`}>
      <SplitText mode={'char'}>Test</SplitText>
      <SplitText className="absolute top-0 left-0" mode={'char'}>
        Test
      </SplitText>
    </button>
  );
};

export default SplitCharRotation;
