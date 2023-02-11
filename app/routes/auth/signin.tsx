import { useEffect } from "react";
import { gql } from "urql";
import type { ActionFunction } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { useFetcher, useSearchParams } from "@remix-run/react";
import { get, parseRequestOptionsFromJSON } from "@github/webauthn-json/browser-ponyfill";
import Header from "~/components/atoms/Header";
import SignInInputs from "~/components/organisms/auth/SignInInputs";
import { runMutation } from "~/lib/graphql/client.server";
import { setKeys } from "~/lib/auth/session";

type CreateApiTokenData = {
  createApiToken: {
    accessKey: string;
    refreshKey: string;
  };
};

const createApiTokenMutation = gql<CreateApiTokenData>`
  mutation($input: CreateApiTokenInput!) {
    createApiToken(input: $input) {
      accessKey
      refreshKey
    }
  }
`;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const credential = formData.get("credential");

  const signInInput = { webAuthn: { username, credential } };
  const { data } = await runMutation<CreateApiTokenData>(createApiTokenMutation, { input: signInInput });
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

export default function SignIn() {
  const challenge = useFetcher();
  const signIn = useFetcher();

  const registered = useSearchParams()[0].get("registered") === "true";

  useEffect(() => {
    if (challenge.type === "done" && signIn.state === "idle" && challenge.data.options) {
      const { username, options } = challenge.data;
      const registerOptions = parseRequestOptionsFromJSON({ publicKey: JSON.parse(options) });
      get(registerOptions).then((credential) => {
        signIn.submit(
          { username, credential: JSON.stringify(credential) },
          { method: "post" },
        );
      });
    }
  }, [challenge]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <Header text="LYnLab에 로그인" />
        {registered && <p>등록에 성공했습니다. 등록한 계정으로 로그인해주세요.</p>}
        <challenge.Form method="post" action="/auth/webauthn/signin_challenge">
          <SignInInputs />
        </challenge.Form>
      </div>
    </div>
  );
}
