import { Link } from "@remix-run/react";
import Container from "~/components/atoms/Container";

type NavigationProps = {
  showDashboard?: boolean;
};

export default function Navigation({ showDashboard }: NavigationProps) {
  return (
    <Container className="my-16 text-neutral-900">
      <img className="mx-auto md:-mx-4 size-20 md:size-24" src="/images/logo-black.png" alt="LYnLab 로고" />
      <p className="text-center md:text-left text-lg md:text-xl font-bold">
        <Link to="/">
          <span className="px-2 md:pl-0 hover:opacity-50 transition-opacity">홈</span>
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
