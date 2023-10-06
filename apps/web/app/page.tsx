import Demo from '@/components/demo/demo';
import ExampleContainer from '@/components/examples/example-container';
import SplitCharRotation from '@/components/examples/example-one';
import FadeInByWords from '@/components/examples/example-two';
import QuickInstall from '@/components/landing/quick-install';
import React from 'react';

export default function Home() {
  return (
    <main className="min-h-[100dvh] py-14 px-4 sm:py-20 sm:px-6 lg:p-24 bg-[#f5f6f7]">
      <div className="relative mx-auto max-w-xs">
        <div className="relative bg-[#182333] grid w-28 h-28 mx-auto p-2 z-0">
          <div className="absolute w-10/12 h-[10%] -top-[10%] -z-10 bg-[#455266] -translate-x-1/2 left-1/2"></div>
          <div className="absolute w-8/12 h-[10%] -top-[20%] -z-10 bg-[#909fb5] -translate-x-1/2 left-1/2"> </div>
          <h1 className="mt-auto text-end font-medium text-2xl align-bottom self-end">
            <span className="block">Split</span>
            <span className="block">Text</span>
          </h1>
        </div>
        <h2 className="text-center text-[#1d1d1d] my-12 text-lg">
          A React Package For Splitting Text Into Characters, Words And Lines.
        </h2>
      </div>
      <QuickInstall />
      <Demo />
      <ExampleContainer
        link={'https://github.com/BytexDigital/splittext/tree/main/apps/web/components/examples/example-one'}
        title="Split and Rotate By Char"
      >
        <SplitCharRotation />
      </ExampleContainer>
      <ExampleContainer
        link={'https://github.com/BytexDigital/splittext/tree/main/apps/web/components/examples/example-two'}
        title="Fade In By Word"
      >
        <FadeInByWords />
      </ExampleContainer>
    </main>
  );
}

//#2f2f2f
//#222222
//#1f1f1f
