import { Link } from "@remix-run/react";
import Container from "~/components/atoms/Container";

export default function Navigation() {
  return (
    <Container className="pt-16 pb-8">
      <p className="text-5xl md:text-6xl font-black">LYnLab</p>
      <p className="py-8 text-xl font-bold">
        <Link to="/blog">
          <span className="pr-2 hover:opacity-50 transition-opacity">블로그</span>
        </Link>
      </p>
    </Container>
  );
}
