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
        edges: {
          cursor: string;
          node: {
            slug: string;
            title: string;
            description: string;
            thumbnailUrl: string | null;
            createdAt: string;
          };
        }[];
        pageInfo: {
          hasPreviousPage: boolean;
          hasNextPage: boolean;
          startCursor: string | null;
          endCursor: string | null;
        };
      };
    };
  };
};

const query = gql<IndexData>`
  query($before: String, $after: String, $first: Int, $last: Int) {
    site(slug: "lynlab.co.kr") {
      namespace(slug: "blog") {
        posts(before: $before, after: $after, first: $first, last: $last) {
          edges {
            cursor
            node {
              slug title description thumbnailUrl createdAt
            }
          }
          pageInfo {
            hasPreviousPage hasNextPage startCursor endCursor
          }
        }
      }
    }
  }
`;

export const meta: MetaFunction = () => ({
  title: "블로그 | LYnLab",
});

export const loader: LoaderFunction = async ({ request }) => {
  const urlParams = new URL(request.url).searchParams;
  const queryParams: { before?: string, after?: string, first?: number, last?: number } = {};
  const pageSize = 12;
  if (urlParams.has("before")) {
    queryParams.before = urlParams.get("before") as string;
    queryParams.last = pageSize;
  } else if (urlParams.has("after")) {
    queryParams.after = urlParams.get("after") as string;
    queryParams.first = pageSize;
  } else {
    queryParams.last = pageSize;
  }

  const { data, error } = await client.query<IndexData>(query, queryParams).toPromise();
  if (error) {
    throw json(null, { status: 500 });
  }
  return json(data);
};

export default function index() {
  const { edges, pageInfo } = useLoaderData<IndexData>().site.namespace.posts;
  return <Index
    posts={edges.reverse().map((edge) => edge.node)}
    pageInfo={pageInfo}
  />;
}
