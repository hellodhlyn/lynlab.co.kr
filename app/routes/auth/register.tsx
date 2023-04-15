import { useEffect } from "react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { create, parseCreationOptionsFromJSON } from "@github/webauthn-json/browser-ponyfill";
import { gql } from "urql";
import { hasAccessKey } from "~/lib/auth/session.server";
import { runMutation } from "~/lib/graphql/client.server";
import RegisterInputs from "~/components/organisms/auth/RegisterInputs";
import Header from "~/components/atoms/Header";

type RegisterData = {
  createWebAuthnAuthentication: {
    success: boolean;
  };
};

const registerMutation = gql<RegisterData>`
  mutation($input: CreateWebAuthnAuthenticationInput!) {
    createWebAuthnAuthentication(input: $input) {
      success
    }
  }
`;

export const loader: LoaderFunction = async ({ request }) => {
  return json({ signedIn: await hasAccessKey(request) });
};

export const action: ActionFunction = async ({ request }) => {
  const signedIn = await hasAccessKey(request);
  const formData = await request.formData();
  const registerInput = {
    username: signedIn ? null : formData.get("username"),
    credential: formData.get("credential"),
  };

  const { data } = await runMutation<RegisterData>(
    registerMutation,
    { input: registerInput },
    signedIn ? request : undefined,
  );
  if (!data) {
    return json({});
  }

  return redirect(encodeURI(
    signedIn ?
      "/dash?result=succeed&message=새로운 인증키를 등록했어요." :
      "/auth/signin?registered=true",
  ));
};

export default function Register() {
  const { signedIn } = useLoaderData<{ signedIn: boolean }>();

  const challenge = useFetcher();
  const register = useFetcher();

  useEffect(() => {
    if (challenge.type === "done" && register.state === "idle" && !challenge.data.error) {
      const { username, options } = challenge.data;
      const registerOptions = parseCreationOptionsFromJSON({ publicKey: JSON.parse(options) });
      create(registerOptions).then((credential) => {
        register.submit(
          { username, credential: JSON.stringify(credential) },
          { method: "post" },
        );
      });
    }
  }, [challenge]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <Header text={signedIn ? "인증키 등록" : "LYnLab 계정 만들기"} />
        <challenge.Form method="post" action="/auth/webauthn/register_challenge">
          <RegisterInputs showInputs={!signedIn} />
        </challenge.Form>
      </div>
    </div>
  );
}
