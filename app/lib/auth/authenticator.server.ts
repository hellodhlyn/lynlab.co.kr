import { GitHubStrategy } from "remix-auth-github";
import { Authenticator } from "remix-auth";
import type { User } from "./user";
import { sessionStorage } from "./session.server";
import { createApiTokenWithGithubMutation } from "./authenticator.graphql";
import { runMutation } from "../graphql/client.server";

export const authenticator = new Authenticator<User>(sessionStorage);

if (GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET) {
  const githubStrategy = new GitHubStrategy<User>({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: `${SITE_HOST || "https://lynlab.co.kr"}/auth/github/callback`,
  }, async ({ accessToken }) => {
    const { data, error } = await runMutation(createApiTokenWithGithubMutation, { github: { accessToken } });
    if (!data || error) {
      console.error(error || `Authentication failed: ${data}`);
      throw new Error("Authentication failed");
    }

    const { apiToken, user } = data.createApiToken;
    return { ...user, apiToken };
  });

  authenticator.use(githubStrategy);
}
