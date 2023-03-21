import { gql } from "urql";

export type BlogIndexData = {
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

export type BlogIndexVariables = {
  before?: string;
  after?: string;
  first?: number;
  last?: number;
  filter?: {
    tags?: string[];
  };
};

export const blogIndexQuery = gql<BlogIndexData, BlogIndexVariables>`
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
