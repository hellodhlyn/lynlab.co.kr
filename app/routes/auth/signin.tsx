import type { LoaderFunction } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import type { NavigateFunction } from "@remix-run/react";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { get } from "@github/webauthn-json/browser-ponyfill";
import SignIn from "~/components/templates/auth/SignIn";
import {
  assertCredential,
  AssertionError,
  getAssertionChallenge,
} from "~/lib/auth/client";
import { setKeys } from "~/lib/auth/session";
import { client } from "~/lib/graphql/client.server";
import { gql } from "urql";

type CreateApiTokenData = {
  createApiToken: {
    accessKey: string;
    refreshKey: string;
  };
};

const createApiTokenMutation = gql<CreateApiTokenData>`
  mutation CreateApiToken($input: CreateApiTokenInput!) {
    createApiToken(input: $input) {
      accessKey
      refreshKey
    }
  }
`;

export const loader: LoaderFunction = async ({ request }) => {
  const urlParams = new URL(request.url).searchParams;
  const authAccessKey = urlParams.get("accessKey");
  if (!authAccessKey) {
    return json({});
  }

  const { data } = await client.mutation<CreateApiTokenData>(createApiTokenMutation, {
    input: {
      provider: "lynlab",
      token: authAccessKey,
    },
  }).toPromise();
  if (!data) {
    return json({});
  }

  const { accessKey, refreshKey } = data.createApiToken;
  return redirect("/dash", {
    headers: {
      "Set-Cookie": await setKeys(request, accessKey, refreshKey),
    },
  });
};

async function onSignIn(navigate: NavigateFunction, username: string) {
  let challenge: CredentialRequestOptions;
  try {
    challenge = await getAssertionChallenge(username);
  } catch (e) {
    if (e instanceof AssertionError && e.userNotFound) {
      navigate(`/auth/register?username=${username}`);
      return;
    }
    throw e;
  }

  const credential = await get(challenge);
  const token = await assertCredential(username, credential);
  navigate(`?accessKey=${token.accessKey}`);
}

export default function SignInPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const registered = searchParams.get("registered") === "true";

  return <SignIn registered={registered} onSignIn={(username) => onSignIn(navigate, username)} />;
}
