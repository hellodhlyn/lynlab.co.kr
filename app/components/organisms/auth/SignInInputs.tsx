import { Input } from "~/components/atoms/inputs";
import TextButton from "~/components/atoms/TextButton";

export default function SignInInputs() {
  return (
    <div>
      <p className="my-4">
        <Input type="text" name="username" placeholder="아이디" />
      </p>
      <p className="my-4">
        <TextButton
          type="submit" fullWidth={true} text="WebAuthn / PassKeys로 로그인"
        />
      </p>
    </div>
  );
}
