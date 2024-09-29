import { LoaderFunctionArgs, json, redirect } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";
import { Navigation } from "~/components/organisms/layout";
import { authenticator } from "~/lib/auth/authenticator.server";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const { env } = context.cloudflare;
  const user = await authenticator(env).isAuthenticated(request);
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
