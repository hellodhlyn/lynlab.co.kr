import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { deleteAccessKey } from "~/lib/auth/session";

export const loader: LoaderFunction = async ({ request }) => {
  return redirect("/dash", {
    headers: {
      "Set-Cookie": await deleteAccessKey(request),
    },
  });
};
