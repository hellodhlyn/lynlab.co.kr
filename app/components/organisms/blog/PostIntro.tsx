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
  const isOldPost = dayjs(createdAt).isBefore(dayjs().subtract(1, "year"));
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
      {isOldPost ? (
        <div className="my-4 p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded text-gray-100 shadow-xl shadow-gray-100">
          <p><span className="tossface">💡</span> 이 글은 작성된지 1년 이상 지났습니다. 정보글의 경우 최신 내용이 아닐 수 있음에 유의해주세요.</p>
        </div>
      ) : null}
    </>
  );
}
