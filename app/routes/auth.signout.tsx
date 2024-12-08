import { redirect, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { getSessionStorage } from "~/lib/auth/session.server";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const sessionStorage = getSessionStorage(context.cloudflare.env);
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  return redirect("/auth/signin", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
};
