import { gql } from "urql";

type DictRecommendationData = {
  site: {
    namespace: {
      posts: {
        nodes: {
          slug: string;
          title: string;
          description: string;
        }[];
      };
    };
  };
};

type DictRecommendationVariables = {
  titleQuery: string;
};

export const recommendationQuery = gql<DictRecommendationData, DictRecommendationVariables>`
  query($titleQuery: String!) {
    site(slug: "lynlab.co.kr") {
      namespace(slug: "dict") {
        posts(first: 10, filter: { title: { startWith: $titleQuery } }) {
          nodes {
            slug title description
          }
        }
      }
    }
  }
`;
