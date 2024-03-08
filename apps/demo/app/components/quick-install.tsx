import { Snippet } from '@nextui-org/snippet';

export const QuickInstall = () => {
  return (
    <section className="max-w-md mx-auto px-2">
      <h3>Quick Install</h3>
      <Snippet
        tooltipProps={{
          className: 'text-sand-12 bg-sand-6',
        }}
        className="w-full mt-2 bg-sand-3 text-sand-12"
      >
        pnpm add @splittext/react
      </Snippet>
    </section>
  );
};