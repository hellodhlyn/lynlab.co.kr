import { useCatch, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import type { Params } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import dayjs from "dayjs";
import { gql } from "urql";
import Post from "~/components/templates/blog/Post";
import Error from "~/components/templates/error/Error";
import { client } from "~/lib/graphql/client.server";
import monokai from "highlight.js/styles/monokai.css";

type BlogPostData = {
  post: {
    title: string;
    description: string;
    thumbnailUrl: string | null;
    createdAt: string;
    blobs: {
      uuid: string;
      type: "markdown";
      content: string;
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
      blobs { uuid type content }
      tags { slug name }
    }
  }
`;

export function links() {
  return [
    { rel: "stylesheet", href: monokai },
  ];
}

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  const { data, error } = await client.query<BlogPostData>(query, { slug }).toPromise();
  if (error) {
    throw json(error, { status: 500 });
  } else if (!data?.post) {
    throw json({}, { status: 404 });
  }
  return json(data);
};

export const meta: MetaFunction = ({ data, params } : { data: BlogPostData, params: Params<string> }) => {
  if (!data) {
    return {};
  }

  return {
    title: `${data.post.title} | LYnLab`,
    description: data.post.description,
    "og:title": data.post.title,
    "og:image": data.post.thumbnailUrl,
    "og:description": data.post.description,
    "og:url": `https://lynlab.co.kr/blog/${params.slug}`,
    "twitter:title": data.post.title,
    "twitter:description": data.post.description,
    "twitter:card": "summary_large_image",
  };
};

export function CatchBoundary() {
  const { status } = useCatch();
  let message: string;
  if (status === 404) {
    message = "작성된 글을 찾을 수 없어요 :(";
  } else {
    message = "알 수 없는 오류가 발생했어요 :("
  }

  return (
    <Error message={message} />
  );
}

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
