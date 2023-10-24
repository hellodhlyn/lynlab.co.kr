import { Outlet } from "react-router";
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
