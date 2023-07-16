import { useState } from "react";
import { AddBlobButton, BlobEditor } from "~/components/atoms/editors";
import { Input, Textarea, useInput } from "~/components/atoms/inputs";
import { BlobTypeEnum } from "~/graphql/graphql";

type MarkdownContent = {
  text: string;
};

export type Blob = {
  id: string | null;
  localId?: string; // for new blobs
  type: BlobTypeEnum;
  markdown?: MarkdownContent;
  image?: {
    url: string;
    previewUrl: string | null;
    caption: string | null;
    blurhash: string | null;
  };
}

function inputName(index: number, field: string) {
  return `blobs.${index}.${field}`;
}

type BlobEditorCommonProps = {
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
}

function MarkdownBlob({ index, blob, onUp, onDown, onRemove }: { index: number, blob?: Blob } & BlobEditorCommonProps) {
  return (
    <BlobEditor label="글 문단" onUp={onUp} onDown={onDown} onRemove={onRemove}>
      <input type="hidden" name={inputName(index, "type")} value={BlobTypeEnum.Markdown} />
      {blob?.id && <input type="hidden" name={inputName(index, "id")} value={blob.id} /> }
      <Textarea name={inputName(index, "text")} rows={15} defaultValue={blob?.markdown?.text || ""} />
    </BlobEditor>
  );
}

function ImageBlob({ index, blob, onUp, onDown, onRemove }: { index: number, blob?: Blob } & BlobEditorCommonProps) {
  const [url, _, UrlInput] = useInput({
    name: inputName(index, "url"),
    placeholder: "원본 주소",
    defaultValue: blob?.image?.url || "",
  });

  return (
    <BlobEditor label="사진" onUp={onUp} onDown={onDown} onRemove={onRemove}>
      <input type="hidden" name={inputName(index, "type")} value={BlobTypeEnum.Image} />
      {blob?.id && <input type="hidden" name={inputName(index, "id")} value={blob.id} /> }
      {UrlInput}
      <Input
        name={inputName(index, "previewUrl")} placeholder="미리보기 주소"
        defaultValue={blob?.image?.previewUrl || undefined} 
      />
      <Input
        name={inputName(index, "caption")} placeholder="설명 글"
        defaultValue={blob?.image?.caption || undefined} 
      />
      {url && <img className="w-96 max-w-full my-2" src={url} alt="사진 미리보기" />}
    </BlobEditor>
  );
}

type PostContentEditorProps = {
  initialBlobs?: Blob[];
};

export function PostContentEditor({ initialBlobs }: PostContentEditorProps) {
  const [blobs, setBlobs] = useState<Blob[]>(initialBlobs || []);

  const swapBlobs = (index1: number, index2: number) => {
    const newBlobs = [...blobs];
    const temp = newBlobs[index1];
    newBlobs[index1] = newBlobs[index2];
    newBlobs[index2] = temp;
    setBlobs(newBlobs);
  };

  const removeBlob = (index: number) => {
    const newBlobs = [...blobs];
    newBlobs.splice(index, 1);
    setBlobs(newBlobs);
  };

  const addBlob = (type: BlobTypeEnum) => {
    const blob: Blob = { id: null, localId: (Math.random() + 1).toString(36).substring(7), type };
    if (type === BlobTypeEnum.Markdown) {
      blob.markdown = { text: "" };
    } else if (type === BlobTypeEnum.Image) {
      blob.image = {
        url: "",
        previewUrl: null,
        caption: null,
        blurhash: null,
      };
    } else {
      throw new Error(`Unexpected blob type: ${type}`);
    }

    setBlobs([...blobs, blob]);
  };

  return (
    <>
      <p className="mt-8 mb-4 text-2xl font-bold">내용</p>
      {blobs.map((blob, index) => {
        const onUp = () => {
          if (index !== 0) { swapBlobs(index, index - 1); }
        };
        const onDown = () => {
          if (index !== blobs.length - 1) { swapBlobs(index, index + 1); }
        };
        const onRemove = () => {
          removeBlob(index);
        };

        if (blob.type === "markdown") {
          return (
            <MarkdownBlob
              key={blob.id || blob.localId} index={index} blob={blob}
              onUp={onUp} onDown={onDown} onRemove={onRemove}
            />
          );
        } else if (blob.type === "image") {
          return (
            <ImageBlob
              key={blob.id || blob.localId} index={index} blob={blob}
              onUp={onUp} onDown={onDown} onRemove={onRemove}
            />
          );
        }
      })}

      <div className="flex">
        <AddBlobButton text="글 문단 추가" onClick={() => { addBlob(BlobTypeEnum.Markdown); }} />
        <AddBlobButton text="사진 추가" onClick={() => { addBlob(BlobTypeEnum.Image); }} />
      </div>
    </>
  );
}
