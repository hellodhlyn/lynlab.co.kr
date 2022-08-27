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
import { setAccessKey } from "~/lib/auth/session";

export const loader: LoaderFunction = async ({ request }) => {
  const urlParams = new URL(request.url).searchParams;
  const accessKey = urlParams.get("accessKey");
  if (accessKey) {
    return redirect("/dash", {
      headers: {
        "Set-Cookie": await setAccessKey(request, accessKey),
      },
    });
  }

  return json({});
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
