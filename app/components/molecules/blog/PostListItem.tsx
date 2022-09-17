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
    <div className="rounded-xl bg-white hover:opacity-75 shadow-xl shadow-gray-100 transition-opacity">
      <BlurHashImage
        className="h-48 w-full object-cover rounded-t-xl"
        src={thumbnailUrl || defaultThumbnailUrl}
        hash={thumbnailBlurhash || defaultThumbnailHash}
        alt={`${title} 게시물의 썸네일 이미지`}
      />
      <div className="p-6 h-48">
        <p className="pb-2 line-clamp-2 text-xl font-bold">{title}</p>
        <p className="line-clamp-4">{description}</p>
      </div>
      <p className="p-6 text-sm text-gray-500">
        {tags.map((tag) => (
          <span key={`tag-${tag.slug}`} className="mr-2">#{tag.name}</span>
        ))}
      </p>
    </div>
  );
}
