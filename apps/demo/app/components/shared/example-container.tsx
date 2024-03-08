import { Link } from "@remix-run/react";

interface Props {
  children: React.ReactNode;
  title: string;
  link: string;
  description?: string;
}

export const ExampleContainer = ({ children, title, link }: Props) => {
  return (
    <li>
      <div className="flex w-full justify-between items-center text-sand-12">
        <h3>{title}</h3>
        <Link
          to={link}
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
      <div className="relative px-2 py-4 border rounded-xl mt-2 bg-sand-3 grid place-items-center">
        {children}
      </div>
    </li>
  )
}