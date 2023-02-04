import Header from "~/components/atoms/Header";
import Navigation from "~/components/organisms/Navigation";
import Container from "~/components/atoms/Container";
import { useInput } from "~/components/atoms/Input";
import type { User } from "~/lib/auth/client";
import TextButton from "~/components/atoms/TextButton";

type UpdateProfileProps = {
  currentUser: User;
};

export function UpdateProfile({ currentUser }: UpdateProfileProps) {
  const [, , setDisplayName] = useInput({
    name: "displayName",
    type: "text",
    placeholder: "닉네임",
    defaultValue: currentUser.displayName,
  });
  const [profileImage, , setProfileImage] = useInput({
    name: "profileImage",
    type: "url",
    placeholder: "프로필 사진 URL",
    defaultValue: currentUser.profileImageUrl,
  });

  return (
    <>
      <Navigation />
      <Container>
        <Header text="계정 정보 바꾸기" />

        <p className="py-4 font-bold">닉네임</p>
        {setDisplayName}

        <p className="py-4 font-bold">프로필 사진</p>
        <div className="flex items-end">
          <div className="pr-2">
            <img className="w-12 h-12 rounded-full" src={profileImage} alt="프로필 사진 미리보기" />
          </div>
          <div className="flex-grow">
            {setProfileImage}
          </div>
        </div>

        <div className="my-8">
          <TextButton type="submit" text="바꾸기" />
        </div>
      </Container>
    </>
  );
}
