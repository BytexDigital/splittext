import { CheckboxGroup, Checkbox } from '@nextui-org/checkbox';
import { useState } from 'react';
import { type SplitMode, SplitText } from '@splittext/react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './shared/resizable-panels';

export const Demo = () => {
  const [selected, setSelected] = useState(['word']);

  return (
    <section className="max-w-md mx-auto text-sand-12 mt-12 px-2">
      <h3>Demo</h3>
      <div className="bg-sand-3 p-4 mt-2 rounded-xl">
        <ResizablePanelGroup direction="horizontal" className='max-w-md !overflow-visible'>
          <ResizablePanel className='!overflow-visible'>
            <SplitText
              key={selected.join('*')}
              mode={selected as SplitMode[]}
              options={{
                line: { className: 'outline outline-1 outline-[#1d1d1d]' },
                word: { className: 'outline outline-1 outline-[#1d1d1d]' },
                char: { className: 'outline outline-1 outline-[#1d1d1d]' },
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis lorem in nisl hendrerit egestas. Donec
              malesuada convallis magna. <span className="text-orange-500 text-xl">Quisque cursus dapibus.</span> Praesent
              consequat metus a nisi ullamcorper, non pulvinar orci fermentum. <span className='text-blue-800 text-xs'>Orci varius natoque</span> penatibus et magnis dis
              parturient montes, nascetur ridiculus mus.
            </SplitText>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel maxSize={50} defaultSize={0} />
        </ResizablePanelGroup>
        <div className="my-4">
          <CheckboxGroup
            label="Split Mode"
            orientation="horizontal"
            color="primary"
            value={selected}
            onValueChange={setSelected}
          >
            <Checkbox value="line" classNames={{ wrapper: 'after:bg-sand-5', "icon": "text-sand-12" }} >
              Lines
            </Checkbox>
            <Checkbox value="word" isDisabled classNames={{ wrapper: 'after:bg-sand-5', "icon": "text-sand-12" }}>
              Words
            </Checkbox>
            <Checkbox value="char" classNames={{ wrapper: 'after:bg-sand-5', "icon": "text-sand-12" }}>
              Characters
            </Checkbox>
          </CheckboxGroup>
        </div>
        <div></div>
      </div>
    </section>
  );
};