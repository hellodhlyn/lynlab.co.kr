import { type LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { authenticator } from "~/lib/auth/authenticator.server";
import { getSessionStorage } from "~/lib/auth/session.server";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const user = await authenticator(context.cloudflare.env).authenticate("github", request);
  if (!user) {
    return redirect("/auth/signin?result=failed");
  }

  const sessionStorage = getSessionStorage(context.cloudflare.env);
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  session.set("user", user);

  return redirect("/dash", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  })
};
