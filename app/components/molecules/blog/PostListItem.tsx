import { BlurHashImage } from "~/components/atoms/BlurHashImage";

const defaultThumbnailUrl = "https://storage.lynlab.co.kr/default-thumbnail.jpg";
const defaultThumbnailHash = "VSEfA_IU0KkDxZ~WIUIoWBjsxtM{%3oIIoxuM|jsxtRj";

export type PostListItemProps = {
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  thumbnailBlurhash: string | null;
  tags?: {
    slug: string;
    name: string;
  }[];

  onPostClick?: () => void;
  onTagClick?: (slug: string) => void;
};

export default function PostListItem(
  { title, description, thumbnailUrl, thumbnailBlurhash, tags, onPostClick, onTagClick }: PostListItemProps,
) {
  return (
    <div className="rounded-xl bg-white shadow-xl shadow-neutral-200">
      <div className="hover:opacity-75 transition cursor-pointer" onClick={onPostClick}>
        <BlurHashImage
          className="h-48 w-full object-cover rounded-t-xl"
          src={thumbnailUrl || defaultThumbnailUrl}
          hash={thumbnailBlurhash || defaultThumbnailHash}
          alt={`${title} 게시물의 썸네일 이미지`}
        />
        <div className="h-48 p-6">
          <p className="pb-2 line-clamp-2 text-xl font-bold">{title}</p>
          <p className="line-clamp-3">{description}</p>
        </div>
      </div>

      {tags && (
        <div className="p-4 flex flex-wrap text-sm text-neutral-500 z-10">
          {tags.map((tag) => (
            <div
              key={`tag-${tag.slug}`}
              className="mt-1 mr-1 py-1 px-2 w-content border rounded-lg hover:bg-neutral-200 transition cursor-pointer"
              onClick={() => { onTagClick && onTagClick(tag.slug); }}
            >
              #{tag.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
