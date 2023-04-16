import { FetcherWithComponents, Link } from "@remix-run/react";

export type Recommend = {
  slug: string;
  title: string;
  description: string;
};

export function DictRecommends(
  { fetcher }: { fetcher: FetcherWithComponents<Recommend[]> },
) {
  if (fetcher.data === undefined) {
    return null;
  }

  return (
    <div className="my-4 bg-white border border-gray-300 rounded-xl shadow-lg shadow-gray-200">
      {(fetcher.state === "loading" || fetcher.state === "submitting") && (
        <p className="px-4 py-2 text-center text-gray-500">검색중...</p>
      )}
      {(fetcher.state === "idle" && fetcher.data.length === 0) && (
        <p className="px-4 py-2 text-center text-gray-500">검색 결과가 없어요</p>
      )}
      {(fetcher.state === "idle") && fetcher.data.map((recommend) => (
        <Link key={recommend.slug} to={`/dict/${recommend.slug}`} className="">
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition rounded-xl">
            <p>{recommend.title}</p>
            <p className="text-xs text-gray-500 line-clamp-2">
              {recommend.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
