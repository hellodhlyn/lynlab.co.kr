type PostListItemProps = {
  title: string;
  description: string;
  thumbnailUrl: string | null;
  tags: {
    slug: string;
    name: string;
  }[];
};

export default function PostListItem({ title, description, thumbnailUrl, tags }: PostListItemProps) {
  return (
    <div className="rounded-xl bg-white hover:opacity-75 shadow-xl shadow-gray-100 transition-opacity">
      <img className="h-48 w-full object-cover rounded-t-xl"
           src={thumbnailUrl || "https://storage.lynlab.co.kr/20191103-bg-q50.jpg"} alt={`${title} 게시물의 썸네일 이미지`}
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
