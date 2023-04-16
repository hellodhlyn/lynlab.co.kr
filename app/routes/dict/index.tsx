import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import Container from "~/components/atoms/Container";
import { DictRecommends, Recommend } from "~/components/organisms/dict/DictRecommends";

export default function DictIndex() {
  const fetcher = useFetcher<Recommend[]>();
  const [titleQuery, setTitleQuery] = useState("");

  useEffect(() => {
    if (fetcher.state === "idle" && titleQuery.length > 0) {
      fetcher.load(`/dict/_recommends?title=${titleQuery}`)
    }
  }, [titleQuery]);

  return (
    <Container>
      <h1 className="my-16 text-center">
        <span className="text-5xl font-bold mr-2">개발자 사전</span>
        <span className="text-2xl">베타</span>
      </h1>
      <div className="w-96 h-96 max-w-full mx-auto my-16">
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
