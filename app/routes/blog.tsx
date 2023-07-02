import { Outlet } from "react-router";
import Navigation from "~/components/organisms/Navigation";

export default function Blog() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
