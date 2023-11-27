import { Link } from "@remix-run/react";
import { Title } from "~/components/atoms/typography";

type RelatedPostsProps = {
  posts: {
    title: string;
    slug: string;
    description: string | null;
    thumbnailUrl: string | null;
  }[];
};

const defaultThumbnailUrl = "https://imagedelivery.net/ow37D_OHIRrKbNlwamdRUg/4dffcf46-5563-4b04-5a93-6cfaf368ca00/thumbnail";

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <>
      <Title text="관련된 글" />
      {posts.map((post) => (
        <Link to={`/blog/${post.slug}`} key={`related-posts-${post.slug}`}>
          <div className="flex my-4 h-24 md:h-36 bg-white rounded-xl shadow-lg shadow-neutral-200 hover:opacity-75 cursor-pointer transition-opacity">
            <img className="h-full w-24 md:w-48 rounded-l-xl object-cover" src={post.thumbnailUrl || defaultThumbnailUrl} />
            <div className="p-4 md:p-6">
              <p className="text-sm md:text-xl font-bold line-clamp-1">{post.title}</p>
              <p className="my-1 md:my-2 text-sm md:text-base line-clamp-2">{post.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};
