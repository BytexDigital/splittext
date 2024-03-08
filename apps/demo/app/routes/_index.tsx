import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import { Demo } from "~/components/demo";
import { ExampleOne } from "~/components/example-one";
import { ExampleThree } from "~/components/example-three";
import { ExampleTwo } from "~/components/example-two";
import { QuickInstall } from "~/components/quick-install";
import { ExampleContainer } from "~/components/shared/example-container";

export const meta: MetaFunction = () => {
  return [
    { title: "Split Text" },
    {
      name: "description",
      content: "A React Package For Splitting Text Into Characters, Words And Lines.",
    },
  ];
};

export default function Index() {
  return (
    <>
      <header className="relative mx-auto max-w-xs pt-14 px-4 sm:pt-20">
        <div className="relative bg-sand-11 grid w-28 h-28 mx-auto p-2 z-0">
          <div className="absolute w-10/12 h-[10%] -top-[10%] -z-10 bg-sand-10 -translate-x-1/2 left-1/2"></div>
          <div className="absolute w-8/12 h-[10%] -top-[20%] -z-10 bg-sand-8 -translate-x-1/2 left-1/2"> </div>
          <h1 className="mt-auto text-end font-medium text-2xl align-bottom self-end text-sand-1">
            <span className="sr-only">Split Text</span>
            <span className="block" aria-hidden>
              Split
            </span>
            <span className="block" aria-hidden>
              Text
            </span>
          </h1>
        </div>
        <p className="text-center text-[#1d1d1d] my-12 text-lg">
          A React Package For Splitting Text Into Characters, Words And Lines.
        </p>
      </header>
      <main>
        <QuickInstall />
        <Demo />
        <section className="max-w-md mx-auto px-2 mt-12">
          <ul className="flex flex-col gap-10">
            <ExampleContainer link={'https://github.com/BytexDigital/splittext/tree/main/apps/web/components/examples/example-one'}
              title="Split/Rotate By Char">
              <ExampleOne />
            </ExampleContainer>
            <ExampleContainer link={'https://github.com/BytexDigital/splittext/tree/main/apps/web/components/examples/example-one'}
              title="Fade In by Words">
              <ExampleTwo />
            </ExampleContainer>
            <ExampleContainer link={'https://github.com/BytexDigital/splittext/tree/main/apps/web/components/examples/example-one'}
              title="Fade In by Line">
              <ExampleThree />
            </ExampleContainer>
          </ul>
        </section>
      </main>
      <footer className="flex items-center justify-center md:justify-between max-w-md px-4 mx-auto pt-20 pb-10 gap-8">
        <h3 className="text-sand-10">V0.6.0</h3>
        <Link to={'https://github.com/BytexDigital/splittext'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sand-10 hover:text-sand-12 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path d="M10 15a3.72 3.72 0 0 0-1 2.58V21m5-6a3.72 3.72 0 0 1 1 2.58V21m-6-1.95a5.7 5.7 0 0 1-2.82.36c-1.52-.52-1.12-1.9-1.9-2.47A2.37 2.37 0 0 0 3 16.5m16-6.75c0 3-1.95 5.25-7 5.25s-7-2.25-7-5.25a6.3 6.3 0 0 1 .68-3c-.34-1.47-.21-3.28.52-3.64.73-.36 2.27.3 3.54 1.15a12.86 12.86 0 0 1 2.26-.2 12.86 12.86 0 0 1 2.26.18c1.27-.85 2.88-1.48 3.54-1.15.66.33.86 2.17.52 3.64A6.3 6.3 0 0 1 19 9.75Z" />
          </svg>
        </Link>
      </footer>
    </>
  );
}
