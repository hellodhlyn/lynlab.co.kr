import { useSearchParams } from "@remix-run/react";

type PageButton = {
  text: string;
  cursor: Record<string, string>;
}

function PageButton({ text, cursor }: PageButton) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <span
      className="px-4 py-2 text-xl hover:opacity-75 transition-opacity cursor-pointer"
      onClick={() => { setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        Object.entries(cursor).forEach(([key, value]) => {
          newParams.set(key, value);
        });
        return newParams;
      }); }}
    >
      {text}
    </span>
  );
}

type PaginatorProps = {
  reversed?: boolean;
  pageInfo: {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
  };
};

export default function Paginator({ reversed, pageInfo }: PaginatorProps) {
  const hasPrevious = reversed ? pageInfo.hasNextPage : pageInfo.hasPreviousPage;
  const hasNext = reversed ? pageInfo.hasPreviousPage : pageInfo.hasNextPage;

  type cursorType = { after: string } | { before: string };
  const previousCursor: cursorType = reversed ? { after: pageInfo.endCursor! } : { before: pageInfo.startCursor! };
  const nextCursor: cursorType = reversed ? { before: pageInfo.startCursor! } : { after: pageInfo.endCursor! };
  return (
    <div className="w-fit mx-auto py-16 text-lg">
      {hasPrevious ? <PageButton cursor={previousCursor} text="← 이전 글" /> : null}
      {hasPrevious && hasNext ? <span className="border-r border-gray-500" /> : null}
      {hasNext ? <PageButton cursor={nextCursor} text="다음 글 →" /> : null}
    </div>
  );
}
