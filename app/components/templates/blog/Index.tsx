import Navigation from "~/components/organisms/Navigation";
import PostList from "~/components/organisms/blog/PostList";
import Footer from "~/components/organisms/Footer";
import Paginator from "~/components/organisms/Paginator";

type IndexProps = {
  posts: {
    slug: string;
    title: string;
    description: string;
    thumbnailUrl: string | null;
  }[];
  pageInfo: {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
  }
};

export default function Index({ posts, pageInfo }: IndexProps) {
  return (
    <>
      <Navigation/>
      <PostList posts={posts} />
      <Paginator pageInfo={pageInfo} reversed={true} />
      <Footer />
    </>
  );
}
