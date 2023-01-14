import { Link } from "@remix-run/react";
import TextButton from "~/components/atoms/TextButton";

type ErrorMessageProps = {
  emoji?: string;
  message: string;
};

export default function ErrorMessage({ emoji, message }: ErrorMessageProps) {
  return (
    <div className="p-4 text-center border rounded-xl">
      <p className="p-8 text-8xl">{emoji || "🤔"}</p>
      <p className="p-4 text-2xl font-bold">{message}</p>

      <div className="p-4">
        <Link to="/">
          <TextButton type="button" text="첫 화면으로 돌아가기" />
        </Link>
      </div>
    </div>
  );
}
