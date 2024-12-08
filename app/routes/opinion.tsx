import { Outlet } from "@remix-run/react";
import { Footer, Navigation } from "~/components/organisms/layout";

export default function Opinion() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}
