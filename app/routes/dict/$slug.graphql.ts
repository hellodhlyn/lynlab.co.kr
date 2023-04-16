import { gql } from "urql";

export type DictViewData = {
  post: {
    title: string;
    description: string;
    blobs: {
      type: "markdown";
      text: string;
    }[];
  } | null;
};

export type DictViewVariables = {
  site: string;
  namespace: string;
  slug: string;
};

export const dictViewQuery = gql<DictViewData, DictViewVariables>`
  query ($site: String!, $namespace: String!, $slug: String!) {
    post(site: $site, namespace: $namespace, slug: $slug) {
      title
      description
      blobs {
        type
        ... on MarkdownBlob { text }
      }
    }
  }
`;
