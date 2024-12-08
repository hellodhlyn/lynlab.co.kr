import { Authenticator } from "remix-auth";
import type { User } from "./user";
import { Env } from "~/env";
import { graphql } from "~/graphql";
import { runMutation } from "../graphql/client.server";
import { GitHubStrategy } from "remix-auth-github";

let _authenticator: Authenticator<User>;

const signInWithGitHubMutation = graphql(`
  mutation SignInWithGitHub ($github: GithubAuthentication!) {
    createApiToken(input: { github: $github }) {
      apiToken { accessKey refreshKey }
      user { name displayName profileImageUrl }
    }
  }
`);

export function authenticator(env: Env): Authenticator<User> {
  if (_authenticator) {
    return _authenticator;
  }

  const authenticator = new Authenticator<User>();
  authenticator.use(new GitHubStrategy({
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    redirectURI: `${env.SITE_HOST || "https://lynlab.co.kr"}/auth/github/callback`,
  }, async ({ tokens }) => {
    const { data, error } = await runMutation(signInWithGitHubMutation, { github: { accessToken: tokens.data.access_token } });
    if (!data?.createApiToken || error) {
      console.error(error || `Authentication failed: ${data}`);
      throw new Error("Authentication failed");
    }

    const { apiToken, user } = data.createApiToken;
    return {
      name: user.name,
      displayName: user.displayName,
      profileImageUrl: user.profileImageUrl ?? null,
      apiToken,
    };
  }));

  _authenticator = authenticator;
  return _authenticator;
}
