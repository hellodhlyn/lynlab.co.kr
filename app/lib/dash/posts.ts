import { BlobInput, BlobTypeEnum } from "~/graphql/graphql";

export function stringOrUndefinedFunc(body: FormData) {
  return (key: string): string | undefined => {
    const value = body.get(key);
    if (typeof value === "string") {
      return value;
    }
    return undefined;
  };
}

export function parseTags(body: FormData): string[] {
  const stringOrUndefined = stringOrUndefinedFunc(body);
  const key = "tags";

  const tagInput = stringOrUndefined(key);
  if (!tagInput || typeof tagInput !== "string") {
    return [];
  }
  return tagInput.split(" ").map((tag) => tag.replace("#", "")).filter((tag) => tag.length > 0);
}

export function getBlobsFromInput(body: FormData): BlobInput[] {
  const stringOrUndefined = stringOrUndefinedFunc(body);

  const blobs: BlobInput[] = [];
  let blobIndex = 0;
  while (body.has(`blobs.${blobIndex}.type`)) {
    const blob: BlobInput = {
      id: stringOrUndefined(`blobs.${blobIndex}.id`),
      type: BlobTypeEnum.Markdown,
    };

    const blobTypeString = stringOrUndefined(`blobs.${blobIndex}.type`);
    if (blobTypeString === "markdown") {
      blob.type = BlobTypeEnum.Markdown;
      blob.markdown = { text: stringOrUndefined(`blobs.${blobIndex}.text`) || "" };
    } else if (blobTypeString === "image") {
      blob.type = BlobTypeEnum.Image;
      blob.image = {
        url: stringOrUndefined(`blobs.${blobIndex}.url`) || "",
        previewUrl: stringOrUndefined(`blobs.${blobIndex}.previewUrl`),
        caption: stringOrUndefined(`blobs.${blobIndex}.caption`),
        blurhash: stringOrUndefined(`blobs.${blobIndex}.blurhash`),
      };
    } else {
      throw new Error(`Unexpected blob type: ${blobTypeString}`);
    }

    blobs.push(blob);
    blobIndex += 1;
  }

  return blobs;
}
