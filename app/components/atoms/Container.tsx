import type { ReactNode } from "react";

type ContainerProps = {
  className?: string;
  children: ReactNode[] | ReactNode;
};

export default function Container({ className, children }: ContainerProps) {
  if (!className?.includes("max-w-")) {
    className = `max-w-6xl ${className || ""}`;
  }

  return (
    <div className={`px-3 md:px-8 mx-auto ${className || ""}`}>
      {children}
    </div>
  );
}
