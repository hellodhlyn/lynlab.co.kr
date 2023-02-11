import Header from "~/components/atoms/Header";
import Container from "~/components/atoms/Container";
import TextButton from "~/components/atoms/TextButton";
import { Link } from "@remix-run/react";

export default function Profile() {
  return (
    <Container>
      <Header text="보안 / 인증" />
      <Link to="/auth/register">
        <TextButton text="WebAuthn / PassKey 등록" />
      </Link>
    </Container>
  );
}
