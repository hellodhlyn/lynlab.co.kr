import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { authenticator } from "~/lib/auth/authenticator.server";

export const loader = async () => {
  return redirect("/auth/signin");
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  return authenticator(context.cloudflare.env).authenticate("github", request, {
    successRedirect: "/dash",
    failureRedirect: "/auth/signin?state=signin_failed",
  });
};
