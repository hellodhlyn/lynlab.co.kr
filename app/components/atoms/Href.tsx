import type { ReactNode } from "react";

type HrefProps = {
  link: string;
  underline?: boolean;
  children: ReactNode[] | ReactNode;
};

export default function Href({ link, children, underline }: HrefProps) {
  return (
    <a className={`${underline === false ? "" : "underline"} hover:cursor-pointer hover:opacity-50 transition-opacity`}
       href={link} target="_blank" rel="noreferrer"
    >
      {children}
    </a>
  );
}
