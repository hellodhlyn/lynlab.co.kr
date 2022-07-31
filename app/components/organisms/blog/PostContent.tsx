import Markdown from "~/components/atoms/blobs/Markdown";

type PostContentBlobs = {
  blobs: {
    type: "markdown";
    uuid: string;
    content: string;
  }[];
};

export default function PostContent({ blobs }: PostContentBlobs) {
  return (
    <>
      {blobs.map((blob) => (
        <Markdown key={`post-blob-${blob.uuid}`} text={blob.content} />
      ))}
    </>
  );
}
