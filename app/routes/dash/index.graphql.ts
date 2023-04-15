import { gql } from "urql";

export type IndexData = {
  viewer: {
    posts: {
      nodes: {
        site: { slug: string };
        namespace: { slug: string };
        title: string;
        slug: string;
        visibility: "public" | "private";
        createdAt: string;
      }[];
    };
  };
};

export const indexQuery = gql<IndexData>`
  query {
    viewer {
      posts(last: 9999) {
        nodes {
          site { slug }
          namespace { slug }
          title slug visibility createdAt
        }
      }
    }
  }
`;
