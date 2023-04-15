import type { LoaderFunction } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";
import Navigation from "~/components/organisms/Navigation";
import { authenticator } from "~/lib/auth/authenticator.server";
import { User } from "~/lib/auth/user";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect("/auth/signin");
  }
  return json<User>(user);
};

export default function Dashboard() {
  const currentUser = useLoaderData<User>();
  return (
    <>
      <Navigation showDashboard={true} />
      <Outlet context={currentUser} />
    </>
  );
}
