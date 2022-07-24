import type { ReactNode } from "react";

type ContainerProps = {
  className?: string;
  children: ReactNode[] | ReactNode;
};

export default function Container({ className, children }: ContainerProps) {
  return (
    <div className={`max-w-6xl px-4 md:px-8 mx-auto ${className || ""}`}>
      {children}
    </div>
  );
}
