import type { LoaderFunction } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { getAccessKey } from "~/lib/auth/session";
import type { User } from "~/lib/auth/client";
import { whoAmI } from "~/lib/auth/client";
import { Outlet, useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  const accessKey = await getAccessKey(request);
  if (!accessKey) {
    return redirect("/auth/signin");
  }

  const user = await whoAmI(accessKey);
  return user ? json(user) : redirect("/auth/signin");
};

export default function Dashboard() {
  const currentUser = useLoaderData<User>();
  return (
    <Outlet context={currentUser} />
  );
}
