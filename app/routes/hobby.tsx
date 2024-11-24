import { Outlet } from "@remix-run/react";
import { Footer, Navigation } from "~/components/organisms/layout";

export default function Hobby() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}
