import { useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { create, parseCreationOptionsFromJSON } from "@github/webauthn-json/browser-ponyfill";
import { gql } from "urql";
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

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const credential = formData.get("credential");

  const registerInput = { username, credential };
  const { data } = await runMutation<RegisterData>(registerMutation, { input: registerInput });
  if (!data) {
    return json({});
  }

  return redirect("/auth/signin?registered=true");
};

export default function Register() {
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
        <Header text="LYnLab 계정 만들기" />
        <challenge.Form method="post" action="/auth/webauthn/register_challenge">
          <RegisterInputs />
        </challenge.Form>
      </div>
    </div>
  );
}
