import { useOutletContext } from "react-router";
import type { User } from "~/lib/auth/client";
import { Index } from "~/components/templates/dashboard/Index";

export default function DashboardIndex() {
  const currentUser = useOutletContext<User>();
  return (
    <Index
      currentUser={currentUser}
      onSignOut={() => { window.location.replace("/auth/signout"); }}
    />
  );
}
