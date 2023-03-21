import { Link, useSearchParams } from "@remix-run/react";
import { AdjustmentsHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import PostListItem from "~/components/molecules/blog/PostListItem";
import Header from "~/components/atoms/Header";
import Container from "~/components/atoms/Container";

type PostListProps = {
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
  filter?: {
    tags?: {
      slug: string;
      name: string;
    }[];
  };
};

function deleteSearchParamWithValue(searchParams: URLSearchParams, key: string, value: string): URLSearchParams {
  const tags = searchParams.getAll(key);
  const filteredTags = tags.filter((t) => t !== value);
  searchParams.delete(key);
  filteredTags.forEach((t) => searchParams.append(key, t));
  return searchParams;
}

export default function PostList({ posts, filter }: PostListProps) {
  const [, setSearchParams] = useSearchParams();
  return (
    <Container>
      <Header text="최근 글" />
      {filter && filter.tags && (
        <div className="py-4 flex items-center">
          <AdjustmentsHorizontalIcon className="h-6 w-6 mr-2 text-gray-700" />
          {filter.tags.map((tag) => (
            <div
              key={`filter-tag-${tag.slug}`}
              className="flex bg-white py-2 px-4 hover:bg-gray-200 border rounded-full shadow-lg shadow-gray-200 transition cursor-pointer items-center"
              onClick={() => { setSearchParams((prev) => deleteSearchParamWithValue(prev, "tag", tag.slug)); }}
            >
              <span>#{tag.name}</span>
              <XMarkIcon className="h-4 w-4 ml-1" />
            </div>
          ))}
        </div>
      )}
      <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link key={`post-${post.slug}`} to={`/blog/${post.slug}`}>
            <PostListItem
              title={post.title}
              description={post.description}
              thumbnailUrl={post.thumbnailUrl}
              thumbnailBlurhash={post.thumbnailBlurhash}
              tags={post.tags}
            />
          </Link>
        ))}
      </div>
   </Container>
  );
}