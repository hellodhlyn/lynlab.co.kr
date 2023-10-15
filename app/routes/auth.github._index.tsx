import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { Env } from "~/env";
import { authenticator } from "~/lib/auth/authenticator.server";

export const loader: LoaderFunction = async () => {
  return redirect("/auth/signin");
};

export const action: ActionFunction = async ({ request, context }) => {
  return authenticator(context.env as Env).authenticate("github", request, {
    successRedirect: "/dash",
    failureRedirect: "/auth/signin?state=signin_failed",
  });
};
