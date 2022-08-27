import Header from "~/components/atoms/Header";
import { useInput } from "~/components/atoms/Input";
import TextButton from "~/components/atoms/TextButton";

type SignInProps = {
  registered?: boolean;
  onSignIn: (username: string) => {};
};

export default function SignIn({ registered, onSignIn }: SignInProps) {
  const [username, setUsername] = useInput({
    type: "text",
    placeholder: "아이디",
    onEnter: () => { onSignIn(username); },
  });

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <Header text="LYnLab에 로그인" />
        {registered ? <p className="mb-4">등록에 성공하였습니다. 등록한 정보로 로그인해주세요.</p> : null}
        <p className="my-2">{setUsername}</p>
        <p className="my-2">
          <TextButton type="submit" text="로그인" onClick={() => { onSignIn(username); }} />
        </p>
        <input type="hidden" name="username" value={username} />
      </div>
    </div>
  );
}
