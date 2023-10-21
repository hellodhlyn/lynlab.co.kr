import { MarkdownBlob } from "~/components/molecules/blobviews";
import { ImageBlob } from "~/components/molecules/blobviews/ImageBlob";
import { BlobTypeEnum } from "~/graphql/graphql";

export type PostContentBlob = {
  type: BlobTypeEnum;
  uuid: string;
  text?: string;
  url?: string;
  previewUrl?: string | null;
  caption?: string | null;
};

type PostContentProps = {
  blobs: PostContentBlob[];
};

export default function PostContent({ blobs }: PostContentProps) {
  return (
    <>
      {blobs.map((blob) => {
        if (blob.type === BlobTypeEnum.Markdown) {
          return <MarkdownBlob key={blob.uuid} text={blob.text!} />;
        } else if (blob.type === BlobTypeEnum.Image) {
          return (
            <ImageBlob
              key={blob.uuid} url={blob.url!}
              previewUrl={blob.previewUrl || null} caption={blob.caption || null}
            />
          );
        }
      })}
    </>
  );
}
