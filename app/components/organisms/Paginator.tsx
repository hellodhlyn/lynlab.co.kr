import LinkButton from "~/components/atoms/LinkButton";

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
  const previousCursor = reversed ? `?after=${pageInfo.endCursor}` : `?before=${pageInfo.startCursor}`;
  const nextCursor = reversed ? `?before=${pageInfo.startCursor}` : `?after=${pageInfo.endCursor}`;
  return (
    <div className="w-fit mx-auto py-16 text-lg">
      {hasPrevious ? <LinkButton link={previousCursor} text={"← 이전 글"} /> : null}
      {hasPrevious && hasNext ? <span className="border-r border-gray-500" /> : null}
      {hasNext ? <LinkButton link={nextCursor} text={"다음 글 →"} /> : null}
    </div>
  );
}
