import { Snippet } from '@nextui-org/snippet';

const QuickInstall = () => {
  return (
    <section className="max-w-md mx-auto text-[#1d1d1d]">
      <h3>Quick Install</h3>
      <Snippet
        tooltipProps={{
          className: 'text-[#1d1d1d]',
        }}
        className="w-full mt-2"
      >
        pnpm add @splittext/react
      </Snippet>
    </section>
  );
};

export default QuickInstall;
