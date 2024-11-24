import { Link } from "@remix-run/react";
import Container from "~/components/atoms/Container";

type NavigationProps = {
  showDashboard?: boolean;
};

export default function Navigation({ showDashboard }: NavigationProps) {
  return (
    <Container className="my-16 text-neutral-900">
      <p className="text-5xl md:text-6xl font-black">LYnLab</p>
      <p className="my-4 md:my-8 text-xl font-bold">
        <Link to="/">
          <span className="pr-2 hover:opacity-50 transition-opacity">홈</span>
        </Link>
        <Link to="/blog">
          <span className="px-2 hover:opacity-50 transition-opacity">블로그</span>
        </Link>
        <Link to="/hobby">
          <span className="px-2 hover:opacity-50 transition-opacity">취미로그</span>
        </Link>
        {showDashboard && (
          <Link to="/dash">
            <span className="px-2 hover:opacity-50 transition-opacity">대시보드</span>
          </Link>
        )}
      </p>
    </Container>
  );
}
