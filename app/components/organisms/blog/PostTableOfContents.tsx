export type TableOfContents = {
  text: string;
  slug: string;
  level: number;
}[];

type PostTableOfContentsProps = {
  toc: TableOfContents;
};

export default function PostTableOfContents({ toc }: PostTableOfContentsProps) {
  const minumumLevel = Math.min(...toc.map((toc) => toc.level));
  const indentClassNames: { [_: number]: string } = {
    1: "ml-0",
    2: "ml-4",
    3: "ml-8",
  };

  return (
    <div className="p-4 m-4 sticky top-0 border-l border-neutral-200">
      <p className="mb-4 font-bold">목차</p>
      {toc.map((tocItem) => {
        return (
          <p
            key={tocItem.slug}
            className={`${indentClassNames[tocItem.level - minumumLevel + 1] ?? "ml-8"} my-2 text-neutral-500 text-sm hover:underline cursor-pointer`}
            onClick={() => { document.getElementById(tocItem.slug)?.scrollIntoView({ behavior: "smooth" }); }}
          >
            {tocItem.text}
          </p>
        );
      })}
    </div>
  );
}
