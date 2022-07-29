import dayjs from "dayjs";

type PostIntroProps = {
  title: string;
  description: string;
  thumbnailUrl: string | null;
  createdAt: Date;
  tags: {
    slug: string;
    name: string;
  }[];
};

export default function PostIntro(
  { title, description, thumbnailUrl, createdAt, tags }: PostIntroProps,
) {
  return (
    <>
      {thumbnailUrl ?
        <img className="h-48 md:h-96 w-full object-cover" src={thumbnailUrl} alt="게시물의 썸네일 이미지" /> :
        null
      }
      <p className="my-8 text-4xl md:text-5xl font-black" style={{ wordBreak: "keep-all" }}>{title}</p>
      <p className="text-xl">{description}</p>
      <p className="mt-4 text-gray-500">
        {tags.map((tag) => (
          <span key={`tag-${tag.slug}`} className="mr-2">#{tag.name}</span>
        ))}
        <span className="pl-2 border-l border-gray-300">{dayjs(createdAt).format("YYYY-MM-DD")}</span>
      </p>
      <div className="w-32 my-16 mx-auto border-t border-gray-300"></div>
    </>
  );
}
