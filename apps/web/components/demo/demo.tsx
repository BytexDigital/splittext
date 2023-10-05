'use client';

import { CheckboxGroup, Checkbox } from '@nextui-org/checkbox';
import { useEffect, useState } from 'react';
import { SplitText, SplitMode } from '@splittext/react';
import { useSplitText } from '@splittext/react/hooks';

const Demo = () => {
  const [selected, setSelected] = useState(['word']);

  const { scope, getScopedElements, key } = useSplitText();

  useEffect(() => {
    const elements = getScopedElements();
    console.log('elements', elements);
  }, [key]);

  return (
    <section className="max-w-md mx-auto text-[#1d1d1d] mt-12">
      <h3>Demo</h3>
      <div className="bg-white p-4 mt-2 rounded-xl">
        <div className="relative resize-x max-w-full min-w-[50%] overflow-hidden">
          <SplitText
            ref={scope}
            key={selected.join('*')}
            mode={selected as SplitMode[]}
            options={{
              line: { className: 'border border-[#1d1d1d]' },
              word: { className: 'border border-[#1d1d1d]' },
              char: { className: 'border border-[#1d1d1d]' },
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis lorem in nisl hendrerit egestas. Donec
            malesuada convallis magna. <span className="text-orange-500">Quisque cursus dapibus.</span> Praesent
            consequat metus a nisi ullamcorper, non pulvinar orci fermentum. Orci varius natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus.
          </SplitText>
        </div>
        <div className="my-4">
          <CheckboxGroup
            label="Split Mode"
            orientation="horizontal"
            color="primary"
            value={selected}
            onValueChange={setSelected}
          >
            <Checkbox value="line" classNames={{ wrapper: 'after:bg-[#182333]' }}>
              Lines
            </Checkbox>
            <Checkbox value="word" isDisabled classNames={{ wrapper: 'after:bg-[#182333]' }}>
              Words
            </Checkbox>
            <Checkbox value="char" classNames={{ wrapper: 'after:bg-[#182333]' }}>
              Characters
            </Checkbox>
          </CheckboxGroup>
        </div>
        <div></div>
      </div>
    </section>
  );
};

// Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis lorem in nisl hendrerit egestas. Donec malesuada convallis magna. Quisque cursus dapibus pulvinar. Praesent consequat metus a nisi ullamcorper, non pulvinar orci fermentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

export default Demo;
