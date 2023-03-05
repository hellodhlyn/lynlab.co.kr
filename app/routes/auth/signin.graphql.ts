import { gql } from "urql";

export type CreateApiTokenData = {
  createApiToken: {
    apiToken: {
      accessKey: string;
      refreshKey: string;
    };
  };
};

export type CreateApiTokenVariables = {
  input: {
    webAuthn: {
      username: string;
      credential: string;
    };
  };
};

export const createApiTokenMutation = gql<CreateApiTokenData, CreateApiTokenVariables>`
  mutation($input: CreateApiTokenInput!) {
    createApiToken(input: $input) {
      apiToken {
        accessKey
        refreshKey
      }
    }
  }
`;
