import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import type { LoaderFunction, V2_MetaFunction } from "@remix-run/cloudflare";
import Index from "~/components/templates/blog/Index";
import { client } from "~/lib/graphql/client.server";
import { gql } from "urql";

type BlogIndexData = {
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
            thumbnailBlurhash: string | null;
            createdAt: string;
            tags: {
              slug: string;
              name: string;
            }[];
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

type BlogIndexVariables = {
  before?: string;
  after?: string;
  first?: number;
  last?: number;
  filter?: {
    tags?: string[];
  };
};

const blogIndexQuery = gql<BlogIndexData, BlogIndexVariables>`
  query($before: String, $after: String, $first: Int, $last: Int, $filter: PostFilter) {
    site(slug: "lynlab.co.kr") {
      namespace(slug: "blog") {
        posts(before: $before, after: $after, first: $first, last: $last, filter: $filter) {
          edges {
            cursor
            node {
              slug
              title
              description
              thumbnailUrl
              thumbnailBlurhash
              createdAt
              tags { slug name }
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

type LoaderData = BlogIndexData & {
  filter?: {
    tags?: {
      slug: string;
      name: string;
    }[];
  };
};

export const meta: V2_MetaFunction = () => ([
  { title: "블로그 | LYnLab" },
]);

export const loader: LoaderFunction = async ({ request }) => {
  const variables: BlogIndexVariables = {};

  // Filters
  const urlParams = new URL(request.url).searchParams;
  if (urlParams.has("tag")) {
    variables.filter = { tags: [urlParams.get("tag")!] };
  }

  // Pagination
  const pageSize = 12;
  if (urlParams.has("before")) {
    variables.before = urlParams.get("before")!;
    variables.last = pageSize;
  } else if (urlParams.has("after")) {
    variables.after = urlParams.get("after")!;
    variables.first = pageSize;
  } else {
    variables.last = pageSize;
  }

  const { data, error } = await client.query(blogIndexQuery, variables).toPromise();
  if (error || !data) {
    throw json(null, { status: 500 });
  }

  const pageData: LoaderData = data;
  if (urlParams.has("tag") && data.site.namespace.posts.edges.length > 0) {
    const filteredTag = data.site.namespace.posts.edges[0].node.tags.filter((tag) => tag.slug === urlParams.get("tag"));
    pageData.filter = { tags: filteredTag };
  }
  return json(pageData);
};

export default function index() {
  const pageData = useLoaderData<LoaderData>();
  const { edges, pageInfo } = pageData.site.namespace.posts;
  const posts = edges.map((edge) => edge.node).sort((a, b) => (Date.parse(b.createdAt) - Date.parse(a.createdAt)));
  return (
    <Index
      posts={posts}
      pageInfo={pageInfo}
      filter={pageData.filter}
    />
  );
}
