type ImageBlobProps = {
  url: string;
  previewUrl: string | null;
  caption: string | null;
};

export function ImageBlob({ url, previewUrl, caption }: ImageBlobProps) {
  return (
    <div className="w-full my-2">
      <div className="mx-auto w-fit max-w-full relative">
        <img className="rounded-lg" src={previewUrl ?? url} alt={caption ?? ""} />
        <div className="absolute right-0 bottom-0 m-2 bg-black rounded
                        opacity-75 hover:opacity-100 transition-all cursor-pointer">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <span className="mx-2 my-1 text-gray-50 text-sm">원본 보기</span>
          </a>
        </div>
      </div>
      {caption && <p className="my-2 text-center text-gray-700">{caption}</p>}
    </div>
  );
}
