import type { ActionFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { gql } from "urql";
import { runMutation } from "~/lib/graphql/client.server";

type ChallengeData = {
  challengeWebAuthnAuthentication: {
    options: string;
  };
};

const challengeMutation = gql<ChallengeData>`
  mutation($input: ChallengeWebAuthnAuthenticationInput!) {
    challengeWebAuthnAuthentication(input: $input) {
      options
    }
  }
`;

export const action: ActionFunction = async ({ request }) => {
  const username = (await request.formData()).get("username");
  const challengeInput = { input: { username } };
  const challengeResult = await runMutation(challengeMutation, challengeInput);
  if (!challengeResult.data) {
    console.error(challengeResult.error);
    return;
  }
  return json({
    username,
    options: challengeResult.data.challengeWebAuthnAuthentication.options,
  });
};
