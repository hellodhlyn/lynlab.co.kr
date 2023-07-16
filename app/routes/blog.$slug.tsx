import { useLoaderData, useRouteError } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import type { Params } from "@remix-run/react";
import type { LoaderFunction, V2_MetaFunction } from "@remix-run/cloudflare";
import Error from "~/components/templates/error/Error";
import { client } from "~/lib/graphql/client.server";
import { V2_ErrorBoundaryComponent } from "@remix-run/react/dist/routeModules";
import { graphql } from "~/graphql";
import { PostViewQuery } from "~/graphql/graphql";
import Container from "~/components/atoms/Container";
import { PostComment, PostContent, PostIntro } from "~/components/organisms/postview";

const errorInternal = "internal_error";
const errorPostNotFound = "post_not_found";

const query = graphql(`
  query PostView($slug: String!) {
    post(site: "lynlab.co.kr", namespace: "blog", slug: $slug) {
      title
      description
      thumbnailUrl
      createdAt
      blobs {
        uuid type
        ... on MarkdownBlob { text }
        ... on ImageBlob { url previewUrl caption }
      }
      tags { slug name }
    }
  }
`);

export function links() {
  return [
    { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/monokai.min.css" },
  ];
}

export const loader: LoaderFunction = async ({ params }) => {
  const slug = params.slug!;
  const { data, error } = await client.query(query, { slug }).toPromise();
  if (error) {
    throw json({ error: errorInternal }, { status: 500 });
  } else if (!data?.post) {
    throw json({ error: errorPostNotFound }, { status: 404 });
  }
  return json(data);
};

export const meta: V2_MetaFunction = ({ data, params } : { data: PostViewQuery, params: Params<string> }) => {
  if (!data?.post) {
    return [];
  }

  const { post } = data;
  return [
    { title: `${post.title} | LYnLab` },
    { name: "description", content: post.description },
    { name: "og:title", content: post.title },
    { name: "og:image", content: post.thumbnailUrl },
    { name: "og:description", content: post.description },
    { name: "og:url", content: `https://lynlab.co.kr/blog/${params.slug}` },
    { name: "twitter:title", content: post.title },
    { name: "twitter:description", content: post.description },
    { name: "twitter:card", content: "summary_large_image" },
  ];
};

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

export default function BlogPost() {
  const data = useLoaderData() as PostViewQuery;
  const post = data.post!;

  return (
    <Container className="max-w-4xl py-8">
      <PostIntro
        title={post.title}
        description={post.description || null}
        thumbnailUrl={post.thumbnailUrl || null}
        createdAt={post.createdAt}
        tags={post.tags}
      />
      <PostContent blobs={post.blobs} />
      <PostComment />
    </Container>
  );
}
