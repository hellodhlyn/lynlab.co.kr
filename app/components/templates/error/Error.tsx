import ErrorMessage from "~/components/organisms/ErrorMessage";
import Container from "~/components/atoms/Container";

type ErrorProps = {
  emoji?: string;
  message: string;
};

export default function Error({ emoji, message }: ErrorProps) {
  return (
    <>
      <Container className="max-w-4xl py-8">
        <ErrorMessage emoji={emoji} message={message} />
      </Container>
    </>
  );
}
