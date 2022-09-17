import { useEffect, useRef, useState } from "react";
import { BlurhashCanvas } from "react-blurhash";

type BlurHashImageProps = {
  className?: string;
  src: string;
  hash: string;
  alt: string;
};

export function BlurHashImage({ className, src, hash, alt }: BlurHashImageProps) {
  const [loaded, setLoaded] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);

  function onLoad() {
    setLoaded(true);
  }

  useEffect(() => {
    if (imageRef.current?.complete) {
      onLoad();
    }
  }, []);

  return (
    <div className={`${className} relative flex`}>
      <BlurhashCanvas
        className={`${className} absolute`}
        hash={hash}
      />
      <img
        className={`${className} ${loaded ? "" : "opacity-0"} absolute transition-opacity duration-300`}
        src={src}
        alt={alt}
        ref={imageRef}
        onLoad={() => { onLoad(); }}
      />
    </div>
  );
}
