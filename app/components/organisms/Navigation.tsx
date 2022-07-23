import { Link } from "@remix-run/react";

export default function Navigation() {
  return (
    <div className="max-w-6xl px-8 py-8 md:py-16 mx-auto">
      <p className="text-4xl md:text-6xl font-black">LYnLab</p>
      <p className="py-8 text-xl font-bold">
        <Link to="/blog">
          <span className="pr-2 hover:opacity-50 transition-opacity">블로그</span>
        </Link>
      </p>
    </div>
  );
}
