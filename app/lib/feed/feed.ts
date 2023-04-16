import { gql } from "urql";
import { Feed } from "feed";
import { client, runQuery } from "~/lib/graphql/client.server";

type FeedData = {
  site: {
    namespace: {
      posts: {
        nodes: {
          title: string;
          slug: string;
          description: string;
          updatedAt: string;
          thumbnailUrl: string | null;
        }[];
      };
    };
  };
};

type FeedVariables = {
  namespace: string;
};

const query = gql<FeedData, FeedVariables>`
  query($namespace: String!) {
    site(slug: "lynlab.co.kr") {
      namespace(slug: $namespace) {
        posts(last: 1000) {
          nodes {
            title
            slug
            description
            updatedAt
            thumbnailUrl
          }
        }
      }
    }
  }
`;

export async function getFeed(): Promise<Feed | null> {
  const fetches = await Promise.all(["blog", "dict"].map((namespace) => runQuery(query, { namespace })));
  const posts = fetches
    .filter((fetch) => fetch.data !== undefined)
    .flatMap((fetch) => fetch.data!.site.namespace.posts.nodes);
  if (!posts) {
    return null;
  }

  const me = {
    name: "Hoerin Doh",
    email: "lyn@lynlab.co.kr",
    link: "https://lynlab.co.kr",
  };

  const feed = new Feed({
    title: "LYnLab",
    description: "My personal blog",
    link: "https://lynlab.co.kr",
    language: "ko",
    id: "https://lynlab.co.kr",
    favicon: "https://lynlab.co.kr/favicon.ico",
    copyright: `© 2011 - ${(new Date()).getFullYear()} Hoerin Doh, All rights reserved.`,
    author: me,
  });

  posts.reverse().forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `https://lynlab.co.kr/blog/${post.slug}`,
      link: `https://lynlab.co.kr/blog/${post.slug}`,
      description: post.description,
      date: new Date(post.updatedAt),
      author: [me],
      contributor: [me],
    });
  });

  return feed;
}
