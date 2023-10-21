import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { client } from "~/lib/graphql/client.server";
import { graphql } from "~/graphql";
import { BlogIndexQuery, BlogIndexQueryVariables } from "~/graphql/graphql";
import Paginator from "~/components/organisms/Paginator";
import { PostList } from "~/components/organisms/blog";

const blogIndexQuery = graphql(`
  query BlogIndex ($before: String, $after: String, $first: Int, $last: Int, $filter: PostFilter) {
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
`);

type LoaderData = {
  postPage: Exclude<Exclude<Exclude<BlogIndexQuery["site"], null>["namespace"], null>["posts"], null>;
  filter?: {
    tags: {
      slug: string;
      name: string;
    }[];
  };
};

export const meta: MetaFunction = () => ([
  { title: "블로그 | LYnLab" },
]);

export const loader: LoaderFunction = async ({ request }) => {
  const variables: BlogIndexQueryVariables = {};

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
  if (error || !data?.site?.namespace?.posts) {
    throw json(null, { status: 500 });
  }

  const postPage = data.site.namespace.posts;
  const loaderData: LoaderData = { postPage };
  if (urlParams.has("tag") && postPage.edges.length > 0) {
    const filteredTag = postPage.edges[0].node!.tags.filter((tag) => tag.slug === urlParams.get("tag"));
    loaderData.filter = { tags: filteredTag };
  }
  return json(loaderData);
};

export default function index() {
  const { postPage, filter } = useLoaderData<LoaderData>();

  const { edges, pageInfo } = postPage;
  const posts = edges.map((edge) => edge.node!).sort((a, b) => (Date.parse(b.createdAt) - Date.parse(a.createdAt)));
  return (
    <>
      <PostList posts={posts} filter={filter} />
      <Paginator pageInfo={pageInfo} reversed={true} />
    </>
  );
}
