import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { gql } from "urql";
import TextButton from "~/components/atoms/TextButton";
import Container from "~/components/atoms/Container";
import { runQuery } from "~/lib/graphql/client.server";

type Viewer = {
  viewer: {
    posts: {
      nodes: {
        title: string;
        slug: string;
        visibility: "public" | "private";
        createdAt: string;
      }[];
    };
  };
};

const query = gql<Viewer>`
  query {
    viewer {
      posts(last: 9999) {
        nodes {
          title slug visibility createdAt
        }
      }
    }
  }
`;

export const loader: LoaderFunction = async ({ request, params }) => {
  const vars = {
    site: params.site,
    namespace: params.namespace,
  };

  const { data } = await runQuery<Viewer>(query, vars, request);
  if (!data) {
    throw new Error("Failed to fetch data");
  }
  return json<Viewer>(data);
};

export default function PostList() {
  const data = useLoaderData<Viewer>();
  const posts = data.viewer.posts.nodes
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return (
    <Container>
      <div className="py-4">
        <Link to="./new">
          <TextButton text="새 글 쓰기" />
        </Link>
      </div>
      <div className="py-4">
        {posts.map((post) => (
          <Link to={`./${post.slug}`} key={post.slug} className="hover:underline hover:opacity-50 transition-opacity">
            <p className="my-2">{post.title}</p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
