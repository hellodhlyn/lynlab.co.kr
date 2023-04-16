import { FetcherWithComponents, Link, useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import Container from "~/components/atoms/Container";

type Recommend = {
  slug: string;
  title: string;
  description: string;
};

function DictRecommends(
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

export default function DictIndex() {
  const fetcher = useFetcher<Recommend[]>();
  const [titleQuery, setTitleQuery] = useState("");

  useEffect(() => {
    if (fetcher.state === "idle" && titleQuery.length > 1) {
      fetcher.load(`/dict/_recommends?title=${titleQuery}`)
    }
  }, [titleQuery]);

  return (
    <Container>
      <h1 className="my-16 text-5xl font-bold text-center">개발자 사전</h1>

      <div className="w-96 mx-auto my-16">
        <input
          type="text"
          className="w-full px-4 py-3 bg-white mx-auto text-lg border border-gray-300 rounded-xl shadow-lg shadow-gray-200"
          placeholder="검색어를 입력"
          onChange={(e) => setTitleQuery(e.target.value)}
        />

        <DictRecommends fetcher={fetcher} />
      </div>
    </Container>
  );
}
