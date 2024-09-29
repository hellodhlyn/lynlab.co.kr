import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { authenticator } from "~/lib/auth/authenticator.server";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  return await authenticator(context.cloudflare.env).logout(request, {
    redirectTo: "/auth/signin",
  });
};
