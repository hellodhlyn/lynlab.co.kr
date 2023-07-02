import PostList from "~/components/organisms/blog/PostList";
import Footer from "~/components/organisms/Footer";
import Paginator from "~/components/organisms/Paginator";

type IndexProps = {
  posts: {
    slug: string;
    title: string;
    description: string;
    thumbnailUrl: string | null;
    thumbnailBlurhash: string | null;
    tags: {
      slug: string;
      name: string;
    }[];
  }[];
  pageInfo: {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
  };
  filter?: {
    tags?: {
      slug: string;
      name: string;
    }[];
  };
};

export default function Index({ posts, filter, pageInfo }: IndexProps) {
  return (
    <>
      <PostList posts={posts} filter={filter} />
      <Paginator pageInfo={pageInfo} reversed={true} />
      <Footer />
    </>
  );
}
