import { useSearchParams } from "@remix-run/react";
import { useOutletContext } from "react-router";
import type { User } from "~/lib/auth/client";
import { Index } from "~/components/templates/dashboard/Index";

export default function DashboardIndex() {
  const [searchParams] = useSearchParams();
  const redirectedFrom = searchParams.get("from");
  const redirectedResult = searchParams.get("result");

  const currentUser = useOutletContext<User>();
  return (
    <Index
      currentUser={currentUser}
      alertProfileUpdated={redirectedFrom === "/dash/profile/update" && redirectedResult === "succeed"}
    />
  );
}
