import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { authenticator } from "~/lib/auth/authenticator.server";

export const loader: LoaderFunction = async () => {
  return redirect("/auth/signin");
};

export const action: ActionFunction = async ({ request }) => {
  return authenticator.authenticate("github", request);
};
