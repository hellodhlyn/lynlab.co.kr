import Navigation from "~/components/organisms/Navigation";
import PostList from "~/components/organisms/blog/PostList";
import Footer from "~/components/organisms/Footer";

type IndexProps = {
  posts: {
    slug: string;
    title: string;
    description: string;
    thumbnailUrl: string | null;
  }[];
};

export default function Index({ posts }: IndexProps) {
  return (
    <>
      <Navigation/>
      <PostList posts={posts} />
      <Footer />
    </>
  );
}
