import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Env } from "~/env";
import { authenticator } from "~/lib/auth/authenticator.server";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  return authenticator(context.env as Env).authenticate("github", request, {
    successRedirect: "/dash",
    failureRedirect: "/auth/signin?result=failed",
  });
}
