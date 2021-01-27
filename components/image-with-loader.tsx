import { useEffect, useRef, useState } from 'react';

const ImageWithLoader = ({ src, alt }: { src: string, alt?: string }): JSX.Element => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const image = useRef<HTMLImageElement>();

  useEffect(() => {
    if (image.current.complete) {
      setLoaded(true);
    }
  });

  return (
    <div className="w-full h-full relative flex justify-center items-center">
      <img className={`w-full h-full absolute object-cover ${loaded ? '' : 'opacity-0'} transition-opacity duration-300`}
           ref={image} src={src} onLoad={() => setLoaded(true)} alt={alt} />
      {!loaded ? <i className="animate-pulse text-4xl bi-hourglass-split" /> : null}
    </div>
  );
};

export default ImageWithLoader;
