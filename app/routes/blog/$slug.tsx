import type { LoaderFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { gql } from "urql";
import Post from "~/components/templates/blog/Post";
import { client } from "~/lib/graphql/client.server";
import { json } from "@remix-run/cloudflare";
import dayjs from "dayjs";

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
  };
};

const query = gql<BlogPostData>`
  query($slug: String!) {
    post(site: "lynlab.co.kr", namespace: "blog", slug: $slug) {
      title description thumbnailUrl createdAt
      blobs {
        uuid type content
      }
    }
  }
`;

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  const { data, error } = await client.query<BlogPostData>(query, { slug }).toPromise();
  if (error) {
    throw json(error, { status: 500 });
  }
  return json(data);
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
    />
  );
}
