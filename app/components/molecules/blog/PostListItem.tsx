type PostListItemProps = {
  title: string;
  description: string;
  thumbnailUrl: string | null;
};

export default function PostListItem({ title, description, thumbnailUrl }: PostListItemProps) {
  return (
    <div className="rounded-xl bg-white hover:opacity-75 shadow-xl transition-opacity">
      <img className="h-48 w-full object-cover rounded-t-xl"
           src={thumbnailUrl || "https://storage.lynlab.co.kr/20191103-bg-q50.jpg"} alt={`${title} 게시물의 썸네일 이미지`}
      />
      <div className="p-6 h-56">
        <p className="pb-2 line-clamp-2 text-xl font-bold">{title}</p>
        <p className="line-clamp-4">{description}</p>
      </div>
    </div>
  );
}
