import { Link } from "@remix-run/react";
import Container from "~/components/atoms/Container";
import Href from "~/components/atoms/Href";

type NavigationProps = {
  showDashboard?: boolean;
};

export default function Navigation({ showDashboard }: NavigationProps) {
  return (
    <Container className="my-16 text-neutral-900">
      <p className="text-5xl md:text-6xl font-black">LYnLab</p>
      <p className="my-4 md:my-8 text-xl font-bold">
        <Href link="https://hello.dhlyn.me" underline={false}>
          <span className="pr-2 hover:opacity-50 transition-opacity">소개</span>
        </Href>
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
