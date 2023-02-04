import { useEffect, useState } from "react";
import { Input, useInput } from "~/components/atoms/Input";
import { Textarea } from "~/components/atoms/Textarea";
import { Select } from "~/components/atoms/Select";

type PostEditProps = {
  site: {
    slug: string;
    namespace: {
      slug: string;
      tags: {
        slug: string;
        name: string;
      }[];
    };
  };
  post?: {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string | null;
    blobs: {
      id: string;
      content: string;
    }[];
    tags: {
      slug: string;
      name: string;
    }[];
    visibility: "public" | "private";
  };
};

const visibilityOptions = [
  { value: "public", label: "공개" },
  { value: "private", label: "비공개" },
];

export function PostEdit({ site, post }: PostEditProps) {
  const newPost = !post;
  const [tags, setTags, tagInput] = useInput({
    name: "tags", type: "text", label: "태그",
    defaultValue: post ? post.tags.map((tag) => `#${tag.slug}`).join(" ") : undefined,
  });

  const [tagRecommends, setTagRecommends] = useState<string[]>([]);
  useEffect(() => {
    const splits = tags.split(" ").map((tag) => tag.replace("#", "")).filter((tag) => tag.length > 0);
    if (tags[tags.length - 1] === " " || splits.length === 0) {
      setTagRecommends([]);
      return;
    }

    const last = splits[splits.length - 1];
    if (last.length === 0) {
      setTagRecommends([]);
      return;
    }

    setTagRecommends(site.namespace.tags.filter((tag) => tag.slug.includes(last)).map((tag) => tag.slug));
  }, [site.namespace.tags, tags]);

  return (
    <div className="py-4">
      {newPost && (
        <>
          <p className="py-4 font-bold">글 주소</p>
          <div className="w-full flex items-center">
            <p className="whitespace-nowrap mr-2 text-lg font-light flex-grow">
              {`${site.slug} / ${site.namespace.slug} /`}
            </p>
            <Input name="slug" type="text" />
          </div>
        </>
      )}
      {newPost || (
        <>
          <input name="postId" type="hidden" value={post!!.id} />
          <input name="blobId" type="hidden" value={post!!.blobs[0].id} />
        </>
      )}

      <div className="flex">
        <div className="w-3/4 pr-2">
          <Input name="title" type="text" label="제목" defaultValue={post?.title} />
        </div>
        <div className="w-1/4 pl-2">
          <Select name="visibility" label="공개 범위" options={visibilityOptions} defaultValue={post?.visibility || "private"} />
        </div>
      </div>
      <Textarea name="description" label="요약" rows={3} defaultValue={post?.description} />
      <Input name="thumbnailUrl" type="url" label="미리보기" defaultValue={post?.thumbnailUrl || undefined} />
      <Textarea name="content" label="내용" rows={20} defaultValue={post ? post.blobs[0].content : undefined} />

      {tagInput}
      <p className="py-2 text-sm">
        <span>추천 태그</span>
        {
          (tagRecommends.length > 0) && (
            <>
              <span> : </span>
              {tagRecommends.map((r) => (
                <span
                  key={`recommend-${r}`}
                  className="mr-1 cursor-pointer hover:underline hover:opacity-50 transition-opacity"
                  onClick={() => {
                    setTags((prev) => {
                      const splits = prev.split(" ");
                      splits[splits.length - 1] = `#${r}`;
                      return splits.join(" ") + " ";
                    });
                  }}>
                #{r}
                </span>
              ))}
            </>
          )
        }
      </p>
    </div>
  );
}
