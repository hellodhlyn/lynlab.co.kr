import { Outlet } from "@remix-run/react";
import Navigation from "~/components/organisms/Navigation";

export default function Dashboard() {
  return (
    <>
      <Navigation showDashboard={true} />
      <Outlet />
    </>
  );
}
