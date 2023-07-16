import { ArrowDown, ArrowUp, Iconoir, Trash } from "iconoir-react";
import { MouseEventHandler } from "react";

type BlobEditorProps = {
  label: string;
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
  children?: React.ReactNode | React.ReactNode[];
}

function ActionIcon({ Icon, onClick }: { Icon: typeof Iconoir, onClick?: MouseEventHandler }) {
  return (
    <Icon
      className="h-4 w-4 ml-2 cursor-pointer hover:opacity-50 cursor-pointer"
      strokeWidth="2.0"
      onClick={onClick}
    />
  );
}

export function BlobEditor({ label, onUp, onDown, onRemove, children }: BlobEditorProps) {
  return (
    <>
      <div className="flex my-2 font-bold">
        <span>{label}</span>
        <div className="flex-grow" />
        <ActionIcon Icon={ArrowUp} onClick={onUp} />
        <ActionIcon Icon={ArrowDown} onClick={onDown} />
        <ActionIcon Icon={Trash} onClick={onRemove} />
      </div>
      {children}
    </>
  );
};
