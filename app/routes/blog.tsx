import { Outlet } from "react-router";
import Footer from "~/components/organisms/Footer";
import Navigation from "~/components/organisms/Navigation";

export default function Blog() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}
