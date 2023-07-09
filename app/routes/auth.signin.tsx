import type { ActionFunction } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { Form, useSearchParams } from "@remix-run/react";
import Header from "~/components/atoms/Header";
import { runMutation } from "~/lib/graphql/client.server";
import { setKeys } from "~/lib/auth/session.server";
import { graphql } from "~/graphql";

const createApiTokenMutation = graphql(`
  mutation CreateApiToken($input: CreateApiTokenInput!) {
    createApiToken(input: $input) {
      apiToken {
        accessKey
        refreshKey
      }
    }
  }
`);

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username")!.toString();
  const credential = formData.get("credential")!.toString();

  const input = { webAuthn: { username, credential } };
  const { data } = await runMutation(createApiTokenMutation, { input });
  if (!data) {
    return json({});
  }

  const { accessKey, refreshKey } = data.createApiToken!.apiToken;
  return redirect("/dash", {
    headers: {
      "Set-Cookie": await setKeys(request, accessKey, refreshKey),
    },
  });
};

export default function SignIn() {
  const registered = useSearchParams()[0].get("registered") === "true";
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-96">
        <Header text="LYnLab에 로그인" />
        {registered && <p>등록에 성공했습니다. 등록한 계정으로 로그인해주세요.</p>}
        <Form action="/auth/github" method="post">
          <button className="w-full my-1 p-4 bg-gray-900 hover:bg-gray-800 text-gray-50 rounded-xl transition">
            GitHub 계정으로 로그인
          </button>
        </Form>
      </div>
    </div>
  );
}
