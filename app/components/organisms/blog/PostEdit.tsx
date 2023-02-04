import { Input } from "~/components/atoms/Input";
import { Textarea } from "~/components/atoms/Textarea";

type PostEditProps = {
  site: {
    slug: string;
    namespace: {
      slug: string;
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
  };
};

export function PostEdit({ site, post }: PostEditProps) {
  const newPost = !post;
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

      <Input name="title" type="text" label="제목" defaultValue={post?.title} />
      <Textarea name="description" label="요약" rows={3} defaultValue={post?.description} />
      <Input name="thumbnailUrl" type="url" label="미리보기" defaultValue={post?.thumbnailUrl || undefined} />
      <Textarea name="content" label="내용" rows={20} defaultValue={post ? post.blobs[0].content : undefined} />
    </div>
  );
}
