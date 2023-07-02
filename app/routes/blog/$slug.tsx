import { useLoaderData, useRouteError } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import type { Params } from "@remix-run/react";
import type { LoaderFunction, V2_MetaFunction } from "@remix-run/cloudflare";
import dayjs from "dayjs";
import { gql } from "urql";
import Post from "~/components/templates/blog/Post";
import Error from "~/components/templates/error/Error";
import { client } from "~/lib/graphql/client.server";
import { V2_ErrorBoundaryComponent } from "@remix-run/react/dist/routeModules";

const errorInternal = "internal_error";
const errorPostNotFound = "post_not_found";

type BlogPostData = {
  post: {
    title: string;
    description: string;
    thumbnailUrl: string | null;
    createdAt: string;
    blobs: {
      uuid: string;
      type: "markdown";
      text: string;
    }[];
    tags: {
      slug: string;
      name: string;
    }[];
  };
};

const query = gql<BlogPostData>`
  query($slug: String!) {
    post(site: "lynlab.co.kr", namespace: "blog", slug: $slug) {
      title
      description
      thumbnailUrl
      createdAt
      blobs {
        uuid
        type
        ... on MarkdownBlob { text }
      }
      tags { slug name }
    }
  }
`;

export function links() {
  return [
    { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/monokai.min.css" },
  ];
}

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  const { data, error } = await client.query<BlogPostData>(query, { slug }).toPromise();
  if (error) {
    throw json({ error: errorInternal }, { status: 500 });
  } else if (!data?.post) {
    throw json({ error: errorPostNotFound }, { status: 404 });
  }
  return json(data);
};

export const meta: V2_MetaFunction = ({ data, params } : { data: BlogPostData, params: Params<string> }) => {
  if (!data) {
    return [];
  }

  return [
    { title: `${data.post.title} | LYnLab` },
    { name: "description", content: data.post.description },
    { name: "og:title", content: data.post.title },
    { name: "og:image", content: data.post.thumbnailUrl },
    { name: "og:description", content: data.post.description },
    { name: "og:url", content: `https://lynlab.co.kr/blog/${params.slug}` },
    { name: "twitter:title", content: data.post.title },
    { name: "twitter:description", content: data.post.description },
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
  const { post } = useLoaderData<BlogPostData>();
  return (
    <Post
      title={post.title}
      description={post.description}
      blobs={post.blobs}
      thumbnailUrl={post.thumbnailUrl}
      createdAt={dayjs(post.createdAt).toDate()}
      tags={post.tags}
    />
  );
}
