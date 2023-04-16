import { useEffect, useState } from "react";
import { LoaderFunction, MetaFunction, json } from "@remix-run/cloudflare";
import { useCatch, useFetcher, useLoaderData } from "@remix-run/react";
import { runQuery } from "~/lib/graphql/client.server";
import Error from "~/components/templates/error/Error";
import { DictViewData, dictViewQuery } from "./$slug.graphql";
import Container from "~/components/atoms/Container";
import Markdown from "~/components/atoms/blobs/Markdown";
import { DictRecommends, Recommend } from "~/components/organisms/dict/DictRecommends";

export const loader: LoaderFunction = async ({ params }) => {
  const slug = params.slug as string;
  const vars = { site: "lynlab.co.kr", namespace: "dict", slug };
  const { data, error } = await runQuery(dictViewQuery, vars);
  if (error || !data) {
    throw json({}, { status: 500 });
  } else if (data.post === null) {
    throw json({}, { status: 404 });
  }
  return json(data);
};

export const meta: MetaFunction = ({ data }: { data: DictViewData }) => {
  if (!data || !data.post) {
    return {};
  }

  const { title, description } = data.post;
  return {
    title: `${title} | LYnLab 개발자 사전`,
    description: description,
    "og:title": title,
    "og:description": description,
    "twitter:title": title,
    "twitter:description": description,
  };
};

export function CatchBoundary() {
  const { status } = useCatch();
  let message: string;
  if (status === 404) {
    message = "해당하는 글을 찾을 수 없어요 :(";
  } else {
    message = "알 수 없는 오류가 발생했어요 :(";
  }

  return (
    <Error message={message} />
  );
}

export default function DictView() {
  const post = useLoaderData<DictViewData>().post!;

  const fetcher = useFetcher<Recommend[]>();
  const [titleQuery, setTitleQuery] = useState("");

  useEffect(() => {
    if (fetcher.state === "idle" && titleQuery.length > 0) {
      fetcher.load(`/dict/_recommends?title=${titleQuery}`)
    }
  }, [titleQuery]);

  return (
    <Container className="mx-2 mb-32 max-w-4xl">
      <h1 className="my-2 text-5xl font-bold">{post.title}</h1>
      <p className="text-gray-500">{post.description}</p>
      <div className="w-32 my-16 mx-auto border-t border-gray-300"></div>
      <Markdown text={post.blobs[0].text} />

      <div className="w-32 my-16 mx-auto border-t border-gray-300"></div>
      <div className="mt-16">
        <input
          type="text"
          className="w-full px-4 py-2 bg-white mx-auto border border-gray-300 rounded-xl shadow-lg shadow-gray-200"
          placeholder="다른 글 검색..."
          onChange={(e) => setTitleQuery(e.target.value)}
        />
        <DictRecommends fetcher={fetcher} />
      </div>
    </Container>
  );
}
