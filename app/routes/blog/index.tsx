import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { gql } from "urql";
import Index from "~/components/templates/blog/Index";
import { client } from "~/lib/graphql/client.server";

type IndexData = {
  site: {
    namespace: {
      posts: {
        nodes: {
          slug: string;
          title: string;
          description: string;
          thumbnailUrl: string | null;
          createdAt: string;
        }[];
      };
    };
  };
};

const query = gql<IndexData>`
  query {
    site(slug: "lynlab.co.kr") {
      namespace(slug: "blog") {
        posts(last: 12) {
          nodes {
            slug title description thumbnailUrl createdAt
          }
        }
      }
    }
  }
`;

export const meta: MetaFunction = () => ({
  title: "블로그 | LYnLab",
});

export const loader: LoaderFunction = async () => {
  const { data, error } = await client.query<IndexData>(query).toPromise();
  if (error) {
    throw json(null, { status: 500 });
  }
  return json(data);
};

export default function index() {
  const data = useLoaderData<IndexData>();
  return <Index
    posts={data.site.namespace.posts.nodes.reverse()}
  />;
}
