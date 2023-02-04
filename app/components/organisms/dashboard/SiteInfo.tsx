import { Link } from "@remix-run/react";
import Container from "~/components/atoms/Container";
import Header from "~/components/atoms/Header";

type SiteInfoProps = {
  slug: string;
  namespaces: {
    name: string;
    slug: string;
  }[];
};

export function SiteInfo({ slug, namespaces }: SiteInfoProps) {
  return (
    <Container>
      <Header text="글 목록" />
      {namespaces.map((namespace) => (
        <Link to={`/dash/posts/${slug}/${namespace.slug}`} key={namespace.slug}>
          <p className="py-1 underline cursor-pointer hover:opacity-50 transition-opacity">
            {namespace.name} ({slug} / {namespace.slug})
          </p>
        </Link>
      ))}
    </Container>
  );
}
