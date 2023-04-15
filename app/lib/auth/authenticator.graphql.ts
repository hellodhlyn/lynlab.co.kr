import { gql } from "urql";

export type AuthenticationData = {
  createApiToken: {
    apiToken: {
      accessKey: string;
      refreshKey: string;
    };
    user: {
      name: string;
      displayName: string;
      profileImageUrl: string | null;
    };
  };
};

type CreateApiTokenWithGithubVariables = {
  github: {
    accessToken: string;
  };
};

export const createApiTokenWithGithubMutation = gql<AuthenticationData, CreateApiTokenWithGithubVariables>`
  mutation($github: GithubAuthentication!) {
    createApiToken(input: { github: $github }) {
      apiToken { accessKey refreshKey }
      user { name displayName profileImageUrl }
    }
  }
`;
