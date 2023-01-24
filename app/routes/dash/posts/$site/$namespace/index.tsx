import { Link } from "@remix-run/react";
import TextButton from "~/components/atoms/TextButton";
import Container from "~/components/atoms/Container";

export default function PostList() {
  return (
    <Container>
      <div className="py-4">
        <Link to="./new">
          <TextButton text="새 글 쓰기" />
        </Link>
      </div>
    </Container>
  );
}
