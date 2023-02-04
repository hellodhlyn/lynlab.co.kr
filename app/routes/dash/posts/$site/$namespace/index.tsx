import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { gql } from "urql";
import TextButton from "~/components/atoms/TextButton";
import Container from "~/components/atoms/Container";
import { runQuery } from "~/lib/graphql/client.server";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";

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
        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="p-4 text-left">제목</th>
              <th className="p-4">상태</th>
            </tr>
          </thead>
          <tbody>
          {posts.map((post) => (
            <tr key={post.slug} className="border-b border-gray-200">
              <td className="p-4">
                <Link to={`./${post.slug}`} className="hover:underline hover:opacity-50 transition-opacity">
                  {post.title}
                </Link>
              </td>
              <td className="p-4">
                {post.visibility === "public" ?
                  <LockOpenIcon className="h-6 w-6 mx-auto" /> :
                  <LockClosedIcon className="h-6 w-6 mx-auto" />}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
