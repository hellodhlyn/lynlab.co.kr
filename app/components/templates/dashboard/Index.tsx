import Navigation from "~/components/organisms/Navigation";
import { ProfileInfo } from "~/components/organisms/dashboard/ProfileInfo";
import type { User } from "~/lib/auth/client";
import Alert from "~/components/atoms/blobs/Alert";
import Container from "~/components/atoms/Container";

type IndexProps = {
  currentUser: User;
  alertProfileUpdated?: boolean;
};

export function Index({ currentUser, alertProfileUpdated }: IndexProps) {
  return (
    <>
      <Navigation />
      <Container>
        {alertProfileUpdated && <Alert color="green" icon="✅" content="계정 정보를 바꿨습니다." />}
      </Container>
      <ProfileInfo currentUser={currentUser} />
    </>
  );
}
