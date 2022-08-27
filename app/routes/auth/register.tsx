import type { NavigateFunction } from "@remix-run/react";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { create } from "@github/webauthn-json/browser-ponyfill";
import {
  getRegistrationChallenge,
  registerCredential,
} from "~/lib/auth/client";
import Register from "~/components/templates/auth/Register";

async function onRegister(navigate: NavigateFunction, username: string) {
  const challenge = await getRegistrationChallenge(username);
  const credential = await create(challenge);
  await registerCredential(username, credential);
  navigate("/auth/signin?registered=true");
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultUsername = searchParams.get("username");

  return (
    <Register
      defaultUsername={defaultUsername || undefined}
      onRegister={(username) => onRegister(navigate, username)}
    />
  );
}
