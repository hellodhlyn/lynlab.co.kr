import { useEffect, useState } from "react";
import { LoaderFunction, V2_MetaFunction, json } from "@remix-run/cloudflare";
import { useFetcher, useLoaderData, useRouteError } from "@remix-run/react";
import { runQuery } from "~/lib/graphql/client.server";
import Error from "~/components/templates/error/Error";
import Container from "~/components/atoms/Container";
import { DictRecommends, Recommend } from "~/components/organisms/dict/DictRecommends";
import { V2_ErrorBoundaryComponent } from "@remix-run/react/dist/routeModules";
import { gql } from "urql";
import { MarkdownBlob } from "~/components/molecules/blobviews";

type DictViewData = {
  post: {
    title: string;
    description: string;
    blobs: {
      type: "markdown";
      text: string;
    }[];
  } | null;
};

type DictViewVariables = {
  site: string;
  namespace: string;
  slug: string;
};

const dictViewQuery = gql<DictViewData, DictViewVariables>`
  query DictView ($site: String!, $namespace: String!, $slug: String!) {
    post(site: $site, namespace: $namespace, slug: $slug) {
      title
      description
      blobs {
        type
        ... on MarkdownBlob { text }
      }
    }
  }
`;

const errorInternal = "internal_error";
const errorPostNotFound = "post_not_found";

export const loader: LoaderFunction = async ({ params }) => {
  const slug = params.slug as string;
  const vars = { site: "lynlab.co.kr", namespace: "dict", slug };
  const { data, error } = await runQuery(dictViewQuery, vars);
  if (error || !data) {
    throw json({ error: errorInternal }, { status: 500 });
  } else if (data.post === null) {
    throw json({ error: errorPostNotFound }, { status: 404 });
  }
  return json(data);
};

export const meta: V2_MetaFunction = ({ data }: { data: DictViewData }) => {
  if (!data || !data.post) {
    return [];
  }

  const { title, description } = data.post;
  return [
    { title: `${title} | LYnLab 개발자 사전` },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
};

export function links() {
  return [
    { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/monokai.min.css" },
  ];
}

export const ErrorBoundary: V2_ErrorBoundaryComponent = () => {
  const error: { data: any } = useRouteError() as any;
  let errorMessage = "";
  if (error?.data?.error === errorPostNotFound) {
    errorMessage = "작성된 글을 찾을 수 없어요 :(";
  } else {
    errorMessage = "알 수 없는 문제가 발생했어요 :(";
  }

  return <Error message={errorMessage} />;
};

export default function DictView() {
  const post = useLoaderData<DictViewData>().post!;

  const fetcher = useFetcher<Recommend[]>();
  const [titleQuery, setTitleQuery] = useState("");

  useEffect(() => {
    if (fetcher.state === "idle" && titleQuery.length > 0) {
      fetcher.load(`/apis/dict/recommends?title=${titleQuery}`)
    }
  }, [titleQuery]);

  return (
    <Container className="mx-2 my-16 max-w-4xl">
      <h1 className="my-2 text-4xl md:text-5xl font-bold">{post.title}</h1>
      <p className="text-gray-500">{post.description}</p>
      <div className="w-32 my-16 mx-auto border-t border-gray-300"></div>
      <MarkdownBlob text={post.blobs[0].text} />

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
