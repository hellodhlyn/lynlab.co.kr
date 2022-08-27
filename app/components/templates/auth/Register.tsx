import Header from "~/components/atoms/Header";
import { useInput } from "~/components/atoms/Input";
import TextButton from "~/components/atoms/TextButton";

type RegisterPageProps = {
  defaultUsername?: string;
  onRegister: (username: string) => {};
};

export default function Register({ defaultUsername, onRegister }: RegisterPageProps) {
  const [username, setUsername] = useInput({
    type: "text",
    placeholder: "아이디",
    defaultValue: defaultUsername,
    onEnter: () => { onRegister(username); },
  });

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <Header text="LYnLab 계정 만들기" />
        {defaultUsername ? <p className="mb-4">계속하려면 계정을 만들어야합니다.</p> : null}
        <p className="my-2">{setUsername}</p>
        <p className="my-2">
          <TextButton type="button" text="계정 만들기" onClick={() => { onRegister(username); }} />
        </p>
        <input type="hidden" name="username" value={username} />
      </div>
    </div>
  );
}
