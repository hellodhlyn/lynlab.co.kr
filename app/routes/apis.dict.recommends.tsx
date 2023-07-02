import { LoaderFunction, json } from "@remix-run/cloudflare";
import { gql } from "urql";
import { runQuery } from "~/lib/graphql/client.server";

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

const recommendationQuery = gql<DictRecommendationData, DictRecommendationVariables>`
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

export const loader: LoaderFunction = async ({ request }) => {
  const titleQuery = new URL(request.url).searchParams.get("title");
  if (titleQuery === null || titleQuery.length === 0) {
    return json([]);
  }

  const { data, error } = await runQuery(recommendationQuery, { titleQuery });
  if (error || !data) {
    return json([]);
  }
  return json(data.site.namespace.posts.nodes, {
    headers: {
      "Cache-Control": "public, max-age=600, s-maxage=600",
    },
  });
};
