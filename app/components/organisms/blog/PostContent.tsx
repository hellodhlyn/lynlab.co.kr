import { useEffect } from "react";
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
  onTocReady?: (toc: TableOfContents) => void;
};

type TableOfContents = {
  text: string;
  slug: string;
  level: number;
}[];

export default function PostContent({ blobs, onTocReady }: PostContentProps) {
  useEffect(() => {
    if (!onTocReady) {
      return;
    }

    const postContents = document.getElementById("post-contents");
    if (!postContents) {
      return;
    }

    const headings: NodeListOf<HTMLHeadingElement> = postContents.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const toc: TableOfContents = [];
    for (const heading of headings) {
      const level = parseInt(heading.tagName[1]);
      const slug = encodeURIComponent(heading.innerText);
      heading.id = slug;
      toc.push({ text: heading.innerText, slug, level });
    }

    onTocReady(toc);
  }, [blobs, onTocReady]);

  return (
    <div id="post-contents">
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
    </div>
  );
}
