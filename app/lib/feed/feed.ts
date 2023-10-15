import { Feed } from "feed";
import { runQuery } from "~/lib/graphql/client.server";
import { graphql } from "~/graphql";

const feedQuery = graphql(`
  query Feed ($namespace: String!) {
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
`);

export async function getFeed(): Promise<Feed | null> {
  const fetches = await Promise.all(["blog", "dict"].map((namespace) => runQuery(feedQuery, { namespace })));
  const posts = fetches
    .filter((fetch) => fetch.data?.site?.namespace?.posts !== undefined)
    .flatMap((fetch) => fetch.data!.site!.namespace!.posts.nodes);
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
      description: post.description ?? undefined,
      date: new Date(post.updatedAt),
      author: [me],
      contributor: [me],
    });
  });

  return feed;
}
