import { Outlet } from "@remix-run/react";
import { Footer, Navigation } from "~/components/organisms/layout";

export default function Blog() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}
