import { Outlet } from "react-router";
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
