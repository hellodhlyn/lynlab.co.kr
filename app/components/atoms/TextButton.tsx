import { Link } from "@remix-run/react";

type LinkButtonProps = {
  link: string;
  text: string;
};

export default function LinkButton({ link, text }: LinkButtonProps) {
  return (
    <Link className="px-4 py-2 text-xl hover:opacity-50 transition-opacity" to={link}>
      {text}
    </Link>
  );
}
