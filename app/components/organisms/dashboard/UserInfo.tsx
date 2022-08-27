import type { User } from "~/lib/auth/client";
import Container from "~/components/atoms/Container";
import Header from "~/components/atoms/Header";
import TextButton from "~/components/atoms/TextButton";

type UserInfoProps = {
  currentUser: User;
  onSignOut: Function;
};

export function UserInfo({ currentUser, onSignOut }: UserInfoProps) {
  return (
    <Container>
      <Header text="계정 정보" />
      <div className="flex">
        <div className="px-2">
          <img
            className="h-12 w-12 rounded-full"
            src={currentUser.profileImage}
            alt={`${currentUser.name}의 프로필 사진`}
          />
        </div>
        <div className="flex-grow">
          <p className="text-xl font-bold">{currentUser.displayName}</p>
          <p className="text-sm text-gray-700">@{currentUser.name}</p>
        </div>
        <div>
          <TextButton type="button" text="로그아웃" onClick={onSignOut} />
        </div>
      </div>
    </Container>
  );
}
