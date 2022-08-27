import { useSearchParams } from "@remix-run/react";
import { get } from "@github/webauthn-json/browser-ponyfill";
import SignIn from "~/components/templates/auth/SignIn";
import {
  assertCredential,
  AssertionError,
  getAssertionChallenge,
} from "~/lib/auth/client";

async function onSignIn(username: string) {
  let challenge: CredentialRequestOptions;
  try {
    challenge = await getAssertionChallenge(username);
  } catch (e) {
    if (e instanceof AssertionError && e.userNotFound) {
      window.location.replace(`/auth/register?username=${username}`);
      return;
    }
    throw e;
  }

  const credential = await get(challenge);
  await assertCredential(username, credential);
  window.location.replace("/admin");
}

export default function SignInPage() {
  const [searchParams] = useSearchParams();
  const registered = searchParams.get("registered") === "true";

  return <SignIn registered={registered} onSignIn={onSignIn} />;
}
