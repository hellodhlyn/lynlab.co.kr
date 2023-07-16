import { Link } from "@remix-run/react";
import Header from "~/components/atoms/Header";

type RelatedPostsProps = {
  posts: {
    title: string;
    slug: string;
    description: string | null;
    thumbnailUrl: string | null;
  }[];
};

const defaultThumbnailUrl = "https://imagedelivery.net/ow37D_OHIRrKbNlwamdRUg/4dffcf46-5563-4b04-5a93-6cfaf368ca00/thumbnail";

export function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <>
      <Header text="관련된 글" />
      {posts.map((post) => (
        <Link to={`/blog/${post.slug}`}>
          <div className="flex my-4 h-24 md:h-32 bg-white rounded-xl shadow-lg shadow-gray-200 hover:opacity-50 cursor-pointer transition-opacity">
            <img className="h-full w-24 md:w-48 rounded-l-xl object-cover" src={post.thumbnailUrl || defaultThumbnailUrl} />
            <div className="p-4">
              <p className="text-sm md:text-xl font-bold line-clamp-1">{post.title}</p>
              <p className="my-1 md:my-2 text-sm md:text-base line-clamp-2">{post.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};
