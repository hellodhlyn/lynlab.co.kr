import type { ActionFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { gql } from "urql";
import { runMutation } from "~/lib/graphql/client.server";

type ChallengeData = {
  challengeWebAuthnRegister: {
    options: string;
  };
};

const challengeMutation = gql<ChallengeData>`
  mutation($input: ChallengeWebAuthnRegisterInput!) {
    challengeWebAuthnRegister(input: $input) {
      options
    } 
  }
`;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const input = {
    username: formData.get("username"),
    displayName: formData.get("displayName"),
    email: formData.get("email"),
  };

  const challengeInput = { input };
  const challengeResult = await runMutation(challengeMutation, challengeInput);
  if (!challengeResult.data) {
    console.error(challengeResult.error);
    return { error: challengeResult.error };
  }
  return json({
    username: input.username,
    options: challengeResult.data.challengeWebAuthnRegister.options,
  });
};
