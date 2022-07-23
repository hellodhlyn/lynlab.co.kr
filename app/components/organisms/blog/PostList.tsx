import { Link } from "@remix-run/react";
import PostListItem from "~/components/molecules/blog/PostListItem";
import Header from "~/components/atoms/Header";

type PostListProps = {
  posts: {
    slug: string;
    title: string;
    description: string;
    thumbnailUrl: string | null;
  }[];
};

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="max-w-6xl px-8 mx-auto">
      <Header text="최근 글" />
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
        {posts.map((post) => (
          <Link key={`post-${post.slug}`} to={`/blog/${post.slug}`}>
            <PostListItem title={post.title} description={post.description} thumbnailUrl={post.thumbnailUrl} />
          </Link>
        ))}
      </div>
    </div>
  );
}