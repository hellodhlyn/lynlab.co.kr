import { Link } from "@remix-run/react";
import { FastArrowLeft, FastArrowRight } from "iconoir-react";
import { useRef, useState } from "react";
import type { PostListItemProps } from "~/components/molecules/blog";
import { PostListItem } from "~/components/molecules/blog";

type PostListProps = {
  posts: (PostListItemProps & {
    link: string;
    slug: string;
  })[];
};

export default function PostList({ posts }: PostListProps) {
  const [buttonsVisible, setButtonsVisible] = useState([false, true]);

  const positionRef = useRef<HTMLDivElement>(null);
  const scrollPosition = (diff: number) => {
    const { current } = positionRef;
    if (!current) {
      return;
    }

    const unitWidth = 20.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    const maxPosition = Math.ceil(posts.length - (current.clientWidth / unitWidth));

    const position = parseInt(current.getAttribute("position") ?? "0") + diff;
    if (position < 0 || position > maxPosition) {
      return;
    }

    setButtonsVisible([position > 0, position < maxPosition]);

    current.setAttribute("position", position.toString());
    current.scrollTo({
      left: unitWidth * position,
      behavior: "smooth",
    });
  };

  return (
    <div className="h-fit w-full relative">
      <div className="w-full px-4 md:px-8 pt-4 pb-8 flex gap-4 overflow-auto no-scrollbar" ref={positionRef}>
        {posts.map((post) => (
          <div key={`post-${post.slug}`} className="flex-none w-80 rounded-lg">
            <Link to={post.link}>
              <PostListItem {...post} />
            </Link>
          </div>
        ))}
      </div>

      {buttonsVisible[0] && (
        <div className="absolute left-0 top-0 h-full flex items-center bg-gradient-to-r md:from-10% from-neutral-100">
          <div
            className="hidden md:block m-4 p-3 bg-white bg-opacity-95 hover:bg-opacity-90 border border-neutral-200 rounded-full cursor-pointer transition"
            onClick={() => scrollPosition(-1)}
          >
            <FastArrowLeft className="h-6 w-6" strokeWidth={2} />
          </div>
        </div>
      )}
      {buttonsVisible[1] && (
        <div className="absolute right-0 top-0 h-full w-4 md:w-fit flex items-center bg-gradient-to-l md:from-10% from-neutral-100">
          <div
            className="hidden md:block m-4 p-3 bg-white bg-opacity-95 hover:bg-opacity-90 border border-neutral-200 rounded-full cursor-pointer transition"
            onClick={() => scrollPosition(1)}
          >
            <FastArrowRight className="h-6 w-6" strokeWidth={2} />
          </div>
        </div>
      )}
    </div>
  );
}
