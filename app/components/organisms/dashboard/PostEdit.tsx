import { useEffect, useState } from "react";
import { Input, useInput, Textarea, Select } from "~/components/atoms/inputs";
import { Blob, PostContentEditor } from "~/components/molecules/editors/PostContentEditor";
import { BlobTypeEnum } from "~/graphql/graphql";

type PostEditProps = {
  site: {
    slug: string;
    namespace?: {
      slug: string;
      tags: {
        slug: string;
        name: string;
      }[];
    } | null;
  };
  post?: {
    id: string;
    title: string;
    description?: string | null;
    thumbnailUrl?: string | null;
    blobs: {
      id: string;
      uuid: string;
      type: BlobTypeEnum;
      text?: string;
      url?: string;
      previewUrl?: string | null;
      caption?: string | null;
      blurhash?: string | null;
    }[];
    tags: {
      slug: string;
      name: string;
    }[];
    visibility: "public" | "private";
  } | null;
};

const visibilityOptions = [
  { value: "public", label: "공개" },
  { value: "private", label: "비공개" },
];

export default function PostEdit({ site, post }: PostEditProps) {
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

    setTagRecommends(site.namespace!.tags.filter((tag) => tag.slug.includes(last)).map((tag) => tag.slug));
  }, [site.namespace!.tags, tags]);

  const [blobs] = useState<Blob[]>(post ? post.blobs.map((blobInput) => {
    const blob: Blob = { id: blobInput.id, type: blobInput.type };
    if (blobInput.type === BlobTypeEnum.Markdown) {
      blob.markdown = { text: blobInput.text! };
    } else if (blobInput.type === BlobTypeEnum.Image) {
      blob.image = {
        url: blobInput.url!,
        previewUrl: blobInput.previewUrl || null,
        caption: blobInput.caption || null,
        blurhash: blobInput.blurhash || null,
      };
    } else {
      throw new Error(`Unexpected blob type: ${blobInput.type}`);
    }

    return blob;
  }) : []);

  return (
    <div className="py-4">
      {newPost && (
        <>
          <p className="py-4 font-bold">글 주소</p>
          <div className="w-full flex items-center">
            <p className="whitespace-nowrap mr-2 text-lg font-light flex-grow">
              {`${site.slug} / ${site.namespace!.slug} /`}
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
      <Textarea name="description" label="요약" rows={3} defaultValue={post?.description || undefined} />
      <Input name="thumbnailUrl" type="url" label="썸네일 주소" defaultValue={post?.thumbnailUrl || undefined} />

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

      <PostContentEditor initialBlobs={blobs} />
    </div>
  );
}
