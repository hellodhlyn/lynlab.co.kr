import { gql } from "urql";
import { Feed } from "feed";
import { client } from "~/lib/graphql/client.server";

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

const query = gql<FeedData>`
  query {
    site(slug: "lynlab.co.kr") {
      namespace(slug: "blog") {
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
  const { data } = await client.query<FeedData>(query, {}).toPromise();
  if (!data) {
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

  data.site.namespace.posts.nodes.reverse().forEach((post) => {
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
