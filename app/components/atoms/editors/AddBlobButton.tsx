import { Plus } from "iconoir-react";
import type { MouseEventHandler } from "react";

export function AddBlobButton({ text, onClick }: { text: string, onClick: MouseEventHandler }) {
  return (
    <div
      className="flex w-fit p-1 pr-2 mr-1 items-center hover:bg-gray-200 rounded-lg cursor-pointer transition-all"
      onClick={onClick}
    >
      <Plus />
      <span>{text}</span>
    </div>
  );
}
