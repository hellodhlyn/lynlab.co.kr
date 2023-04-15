import { LoaderFunction } from "react-router";
import { authenticator } from "~/lib/auth/authenticator.server";

export const loader: LoaderFunction = async ({ request }) => {
  return authenticator.authenticate("github", request, {
    successRedirect: "/dash",
    failureRedirect: "/auth/signin?result=failed",
  });
}
