import { Input } from "~/components/atoms/Input";
import TextButton from "~/components/atoms/TextButton";

type RegisterInputsProps = {
  showInputs: boolean;
};

export default function RegisterInputs({ showInputs }: RegisterInputsProps) {
  return (
    <div>
      {showInputs && (
        <>
          <p className="my-4">
            <Input type="text" name="username" placeholder="아이디" />
          </p>
          <p className="my-4">
            <Input type="text" name="displayName" placeholder="프로필 이름" />
          </p>
          <p className="my-4">
            <Input type="email" name="email" placeholder="이메일" />
          </p>
        </>
      )}
      <p className="my-4">
        <TextButton type="submit" fullWidth={true} text="WebAuthn / PassKeys 등록" />
      </p>
    </div>
  );
}
