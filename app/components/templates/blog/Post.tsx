import Container from "~/components/atoms/Container";
import Navigation from "~/components/organisms/Navigation";
import Footer from "~/components/organisms/Footer";
import PostContent from "~/components/organisms/blog/PostContent";
import PostIntro from "~/components/organisms/blog/PostIntro";
import PostComment from "~/components/organisms/blog/PostComment";

type PostProps = {
  title: string;
  description: string;
  thumbnailUrl: string | null;
  blobs: {
    uuid: string;
    type: "markdown";
    text: string;
  }[];
  tags: {
    slug: string;
    name: string;
  }[];
  createdAt: Date;
};

export default function Post(
  { title, description, thumbnailUrl, blobs, createdAt, tags }: PostProps,
) {
  return (
    <>
      <Navigation />
      <Container className="max-w-4xl py-8">
        <PostIntro
          title={title}
          description={description}
          thumbnailUrl={thumbnailUrl}
          createdAt={createdAt}
          tags={tags}
        />
        <PostContent blobs={blobs} />
        <PostComment />
      </Container>
      <Footer />
    </>
  );
}
