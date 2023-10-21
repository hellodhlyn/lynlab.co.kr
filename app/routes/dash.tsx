import { LoaderFunction, json, redirect } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";
import { Navigation } from "~/components/organisms/layout";
import { Env } from "~/env";
import { authenticator } from "~/lib/auth/authenticator.server";

export const loader: LoaderFunction = async ({ request, context }) => {
  const user = await authenticator(context.env as Env).isAuthenticated(request);
  if (!user) {
    return redirect("/auth/signin");
  }
  return json(null);
};

export default function Dashboard() {
  return (
    <>
      <Navigation showDashboard={true} />
      <Outlet />
    </>
  );
}
