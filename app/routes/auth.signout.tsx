import type { LoaderFunction } from "@remix-run/cloudflare";
import { Env } from "~/env";
import { authenticator } from "~/lib/auth/authenticator.server";

export const loader: LoaderFunction = async ({ request, context }) => {
  return await authenticator(context.env as Env).logout(request, {
    redirectTo: "/auth/signin",
  });
};
