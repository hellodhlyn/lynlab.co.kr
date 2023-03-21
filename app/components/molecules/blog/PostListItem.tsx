import { Link } from "@remix-run/react";
import { BlurHashImage } from "~/components/atoms/BlurHashImage";

const defaultThumbnailUrl = "https://imagedelivery.net/ow37D_OHIRrKbNlwamdRUg/4dffcf46-5563-4b04-5a93-6cfaf368ca00/thumbnail";
const defaultThumbnailHash = "VSEfA_IU0KkDxZ~WIUIoWBjsxtM{%3oIIoxuM|jsxtRj";

type PostListItemProps = {
  title: string;
  description: string;
  thumbnailUrl: string | null;
  thumbnailBlurhash: string | null;
  tags: {
    slug: string;
    name: string;
  }[];
};

export default function PostListItem(
  { title, description, thumbnailUrl, thumbnailBlurhash, tags }: PostListItemProps,
) {
  return (
    <div className="rounded-xl bg-white shadow-xl shadow-gray-200">
      <div className="hover:opacity-75 transition">
        <BlurHashImage
          className="h-48 w-full object-cover rounded-t-xl"
          src={thumbnailUrl || defaultThumbnailUrl}
          hash={thumbnailBlurhash || defaultThumbnailHash}
          alt={`${title} 게시물의 썸네일 이미지`}
        />
        <div className="h-48 p-6">
          <p className="pb-2 line-clamp-2 text-xl font-bold">{title}</p>
          <p className="line-clamp-4">{description}</p>
        </div>
      </div>

      <div className="p-4 flex flex-wrap text-sm text-gray-500 z-10">
        {tags.map((tag) => (
          <Link to={`?tag=${tag.slug}`} key={tag.slug}>
            <div className="mt-1 mr-1 py-1 px-2 w-content border rounded-lg hover:bg-gray-200 transition">
              #{tag.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
