import type { ReactNode } from "react";

type HrefProps = {
  link: string;
  children: ReactNode[] | ReactNode;
};

export default function Href({ link, children }: HrefProps) {
  return (
    <a className="underline hover:cursor-pointer hover:opacity-50 transition-opacity"
       href={link} target="_blank" rel="noreferrer"
    >
      {children}
    </a>
  );
}
