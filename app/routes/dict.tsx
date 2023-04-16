import { Outlet } from "@remix-run/react";
import Footer from "~/components/organisms/Footer";
import Navigation from "~/components/organisms/Navigation";

export default function Dict() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  )
}
