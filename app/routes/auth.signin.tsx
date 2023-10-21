import { Form } from "@remix-run/react";
import { Title } from "~/components/atoms/typography";

export default function SignIn() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-96">
        <Title text="LYnLab에 로그인" />
        <Form action="/auth/github" method="post">
          <button className="w-full my-1 p-4 bg-gray-900 hover:bg-gray-800 text-gray-50 rounded-xl transition">
            GitHub 계정으로 로그인
          </button>
        </Form>
      </div>
    </div>
  );
}
