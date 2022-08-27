import Navigation from "~/components/organisms/Navigation";
import { UserInfo } from "~/components/organisms/dashboard/UserInfo";
import type { User } from "~/lib/auth/client";

type IndexProps = {
  currentUser: User;
  onSignOut: Function;
};

export function Index({ currentUser, onSignOut }: IndexProps) {
  return (
    <>
      <Navigation />
      <UserInfo currentUser={currentUser} onSignOut={onSignOut} />
    </>
  );
}
