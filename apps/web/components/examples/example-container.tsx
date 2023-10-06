import Link from 'next/link';

interface ExampleContainerProps {
  children: React.ReactNode;
  title: string;
  link: string;
  description?: string;
}

const ExampleContainer = (props: ExampleContainerProps) => {
  return (
    <section className="max-w-md mx-auto rounded-xl mt-12">
      <div className="flex w-full justify-between items-center text-[#1d1d1d]">
        <h3>{props.title}</h3>
        <Link
          href={props.link}
          className="inline-flex gap-px items-center justify-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source Code
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
      <div className="relative px-2 py-4 border rounded-xl border-[#f5f6f7] mt-2 bg-white grid place-items-center">
        {props.children}
      </div>
    </section>
  );
};

export default ExampleContainer;
