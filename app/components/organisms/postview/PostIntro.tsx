import { Link } from "@remix-run/react";
import dayjs from "dayjs";
import { Divider } from "~/components/atoms/Divider";

type PostIntroProps = {
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  createdAt: Date;
  tags: {
    slug: string;
    name: string;
  }[];
};

export function PostIntro(
  { title, description, thumbnailUrl, createdAt, tags }: PostIntroProps,
) {
  const isOldPost = dayjs(createdAt).isBefore(dayjs().subtract(1, "year"));
  return (
    <>
      {thumbnailUrl ?
        <img className="h-48 md:h-96 w-full object-cover" src={thumbnailUrl} alt="게시물의 썸네일 이미지" /> :
        null
      }
      <p className="my-8 text-3xl md:text-5xl md:leading-tight font-black" style={{ wordBreak: "keep-all" }}>{title}</p>
      <p className="text-lg">{description}</p>
      <p className="mt-4 text-sm text-gray-500">
        <span className="pr-2 border-r border-gray-300">{dayjs(createdAt).format("YYYY-MM-DD")}</span>
        {tags.map((tag) => (
          <Link to={`/blog?tag=${tag.slug}`} key={`tag-${tag.slug}`} className="ml-2">
            <span className="text-gray-700 cursor-pointer hover:underline">#{tag.name}</span>
          </Link>
        ))}
      </p>
      <Divider />
      {isOldPost ? (
        <div className="my-4 p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded text-gray-100 shadow-xl shadow-gray-100">
          <p>💡 이 글은 작성된지 1년 이상 지났습니다. 정보글의 경우 최신 내용이 아닐 수 있음에 유의해주세요.</p>
        </div>
      ) : null}
    </>
  );
}
