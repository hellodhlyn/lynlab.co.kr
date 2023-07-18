import { ShareIos } from "iconoir-react";

export function ActivityButtons() {
  return (
    <div className="absolute fixed w-screen bottom-0">
      <div className="mx-auto w-fit p-4 m-4 md:m-8 bg-white rounded-full shadow-lg shadow-gray-50">
        <ShareIos className="w-6 h-6 md:w-8 md:h-8 hover:opacity-50 transition-opacity cursor-pointer" strokeWidth="2.0" />
      </div>
    </div>
  );
}
