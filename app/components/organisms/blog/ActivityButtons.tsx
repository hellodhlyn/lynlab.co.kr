import { Link } from "@remix-run/react";
import { MessageText, NavArrowLeft, ShareAndroid } from "iconoir-react";

type ActivityButtonsProps = {
  url: string;
  title: string;
};

function scrollTo(element: string) {
  document.querySelector(element)?.scrollIntoView({ behavior: "smooth" });
};

export default function ActivityButtons({ url, title }: ActivityButtonsProps) {
  const sharingText = `${title} | LYnLab`;
  const share = async () => {
    await navigator.share({ url, title: "LYnLab", text: sharingText });
  };

  return (
    <div className="fixed w-fit bottom-0 right-0">
      <div className="flex bg-white m-4 md:m-8 px-1 rounded-full shadow-lg shadow-gray-200 opacity-90">
        {
          <Link to="/blog">
            <div className="px-4 py-2 md:py-4 hover:opacity-50 transition cursor-pointer">
              <NavArrowLeft className="w-6 h-6" strokeWidth="2.0" />
            </div>
          </Link>
        }
        {
          <div className="px-4 py-2 md:py-4 hover:opacity-50 transition cursor-pointer border-l border-gray-200" onClick={() => { scrollTo("#comments"); }}>
            <MessageText className="w-6 h-6" strokeWidth="2.0" />
          </div>
        }
        {navigator.share && (
          <div className="px-4 py-2 md:py-4 hover:opacity-50 transition cursor-pointer border-l border-gray-200" onClick={share}>
            <ShareAndroid className="w-6 h-6" strokeWidth="2.0" />
          </div>
        )}
      </div>
    </div>
  );
}
