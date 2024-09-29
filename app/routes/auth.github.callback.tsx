import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { authenticator } from "~/lib/auth/authenticator.server";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  return authenticator(context.cloudflare.env).authenticate("github", request, {
    successRedirect: "/dash",
    failureRedirect: "/auth/signin?result=failed",
  });
}
