import type {
  AuthenticationPublicKeyCredential,
  RegistrationPublicKeyCredential,
} from "@github/webauthn-json/browser-ponyfill";
import {
  parseCreationOptionsFromJSON,
  parseRequestOptionsFromJSON,
} from "@github/webauthn-json/browser-ponyfill";

const host = "https://auth.lynlab.co.kr";

export class AssertionError {
  public userNotFound: boolean = false;
}

export type User = {
  name: string;
  displayName: string;
  profileImageUrl: string;
};

type AssertionResult = {
  accessKey: string;
};

export async function getRegistrationChallenge(username: string): Promise<CredentialCreationOptions> {
  const url = `${host}/registration/${username}`;
  const res = await fetch(url);
  return parseCreationOptionsFromJSON(await res.json());
}

export async function registerCredential(username: string, credential: RegistrationPublicKeyCredential) {
  const url = `${host}/registration/${username}`;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  });
}

export async function getAssertionChallenge(username: string): Promise<CredentialRequestOptions> {
  const url = `${host}/assertion/${username}`;
  const res = await fetch(url);
  if (res.status === 400) {
    const body = await res.json<{ error: string }>();
    if (body.error.includes("not found")) {
      const error = new AssertionError();
      error.userNotFound = true;
      throw error;
    }
  }

  return parseRequestOptionsFromJSON(await res.json());
}

export async function assertCredential(username: string, credential: AuthenticationPublicKeyCredential): Promise<AssertionResult> {
  const url = `${host}/assertion/${username}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  });
  return res.json<AssertionResult>();
}
